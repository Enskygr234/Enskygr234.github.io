// Oyun motoru: hikaye betiğini okur, sahneyi kurar, defter sayfasına yazar, seçimleri yönetir.
(() => {
  const $ = id => document.getElementById(id);
  const AYLAR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  const HIZ = { yavas: 28, normal: 55, hizli: 120, aninda: Infinity };
  const IC = ['bakkal', 'oda', 'mutfak', 'defne'];
  const YIKIK = ['son_mac', 'mektup', 'yalniz'];

  // ================= betik ayrıştırıcı =================
  const DUGUM = {};
  function secimAyristir(s) {
    let kosul = null, etki = null, hedef = null;
    const h = s.match(/\s*->\s*(\S+)\s*$/); if (h) { hedef = h[1]; s = s.slice(0, h.index); }
    let bayraklar = '';
    const b = s.match(/((?:\s+#[\wçğıöşü]+)+)\s*$/); if (b) { bayraklar = b[1]; s = s.slice(0, b.index); }
    const e = s.match(/\s*\{([^}]*)\}\s*$/); if (e) { etki = e[1]; s = s.slice(0, e.index); }
    if (bayraklar) etki = ((etki || '') + ' ' + bayraklar).trim();
    const k = s.match(/^\[([^\]]*)\]\s*/); if (k) { kosul = k[1]; s = s.slice(k[0].length); }
    return { metin: s.trim(), kosul, etki, hedef };
  }
  function komut(s) {
    const parca = s.slice(1).split(/\s+/), c = parca[0], r = parca.slice(1), arg = s.slice(1 + c.length).trim();
    switch (c) {
      case 'yer': return { t: 'yer', yer: r[0], zaman: r[1] || 'ogle', hava: r[2] || null };
      case 'bolum': return { t: 'bolum', n: +r[0] };
      case 'isim': return { t: 'isim' };
      case 'eger': { const [k, h] = arg.split('->'); return { t: 'eger', kosul: k.trim(), hedef: h.trim() }; }
      case 'etki': return { t: 'etki', etki: arg };
      case 'bayrak': return { t: 'etki', etki: '#' + arg };
      case 'ani': return { t: 'ani', id: r[0] };
      case 'not': return { t: 'not', metin: arg };
      case 'son': return { t: 'son', id: r[0] };
      case 'bitir': return { t: 'bitir' };
    }
    console.warn('Bilinmeyen komut', s);
    return { t: 'yok' };
  }
  const KONUSMA = /^([A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?: [A-ZÇĞİÖŞÜ][a-zçğıöşü]+)?):\s+(.+)$/;
  function ayristir() {
    for (const metin of HIKAYE) {
      let liste = null;
      for (const ham of metin.split('\n')) {
        const s = ham.trim();
        if (!s) continue;
        if (s.startsWith('=== ')) { liste = DUGUM[s.slice(4).trim()] = []; continue; }
        if (!liste) continue;
        if (s.startsWith('* ')) {
          const son = liste[liste.length - 1], sc = secimAyristir(s.slice(2));
          if (son && son.t === 'secim') son.liste.push(sc); else liste.push({ t: 'secim', liste: [sc] });
          continue;
        }
        if (s.startsWith('-> ')) { liste.push({ t: 'git', hedef: s.slice(3).trim() }); continue; }
        if (s.startsWith('@')) { liste.push(komut(s)); continue; }
        const m = s.match(KONUSMA);
        if (m) liste.push({ t: 'konus', kim: m[1], metin: m[2] });
        else liste.push({ t: 'anlat', metin: s });
      }
    }
  }

  // ================= durum ve kayıt =================
  let D = null;
  const yeniDurum = () => ({ dugum: 'basla', i: 0, stat: {}, bayrak: {}, ad: '', bolum: 0, yer: null, zaman: null, hava: null, sayfa: [], gecmis: [], anilar: [], bitis: null, bekleyen: null, secimIdx: null });
  let meta = { anilar: {}, sonlar: {}, ayar: { hiz: 'normal', boyut: 'normal', ses: true, ortam: .6 } };

  const depo = {
    al(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    koy(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } },
    sil(k) { try { localStorage.removeItem(k); } catch (e) { } },
  };
  function metaYukle() { const m = depo.al('mahalle.meta'); if (m) meta = { ...meta, ...m, ayar: { ...meta.ayar, ...(m.ayar || {}) } }; }
  const metaKaydet = () => depo.koy('mahalle.meta', meta);
  const kaydet = () => { if (D) depo.koy('mahalle.kayit', D); };

  // ================= koşullar ve etkiler =================
  function kosulDogru(k) {
    if (!k) return true;
    return k.split(/[&\s]+/).filter(Boolean).every(tok => {
      if (tok.startsWith('!#')) return !D.bayrak[tok.slice(2)];
      if (tok.startsWith('#')) return !!D.bayrak[tok.slice(1)];
      const m = tok.match(/^([a-zçğıöşü_]+)(>=|<=|>|<|==)(-?\d+)$/);
      if (!m) { console.warn('Anlaşılmayan koşul', tok); return false; }
      const v = D.stat[m[1]] || 0, n = +m[3];
      return { '>=': v >= n, '<=': v <= n, '>': v > n, '<': v < n, '==': v === n }[m[2]];
    });
  }
  function etkiUygula(e) {
    if (!e) return;
    for (const tok of e.split(/\s+/).filter(Boolean)) {
      if (tok.startsWith('#')) { D.bayrak[tok.slice(1)] = true; continue; }
      if (tok.startsWith('!#')) { delete D.bayrak[tok.slice(2)]; continue; }
      const m = tok.match(/^([a-zçğıöşü_]+)([+-]\d+)$/);
      if (m) D.stat[m[1]] = (D.stat[m[1]] || 0) + +m[2];
      else console.warn('Anlaşılmayan etki', tok);
    }
  }
  const yerlestir = s => s.replace(/\{ad\}/g, D.ad || 'Sen');

  // ================= sahne =================
  let sonSahne = '';
  function sahneSecenek() {
    const b = D.bolum;
    const gunduz = D.zaman !== 'gece';
    return {
      bolum: b === 7 ? 5 : b, hava: D.hava, bitis: D.bitis,
      tabela: !!D.bayrak.tabela && !D.bitis,
      kermes: b === 5 && D.yer === 'arsa' && gunduz && !D.bitis,
      sergi: b === 5 && D.yer === 'arsa' && gunduz && !!D.bayrak.sergi,
      kurdele: b === 5,
      karanlik: !!D.bayrak.elektrik_yok && !IC.includes(D.yer),
    };
  }
  function sahneCiz(zorla) {
    if (!D.yer) return;
    const o = sahneSecenek();
    const anahtar = JSON.stringify([D.yer, D.zaman, o]);
    if (anahtar === sonSahne && !zorla) return;
    sonSahne = anahtar;
    const kap = $('sahne'), yeni = document.createElement('div');
    yeni.innerHTML = Sahne.ciz(D.yer, D.zaman, o);
    yeni.classList.add('giden');
    kap.appendChild(yeni);
    requestAnimationFrame(() => requestAnimationFrame(() => yeni.classList.remove('giden')));
    const eskiler = [...kap.children].slice(0, -1);
    setTimeout(() => eskiler.forEach(e => e.remove()), 800);
    // ortam sesi
    let ortam = 'kus';
    if (D.hava === 'yagmur') ortam = 'yagmur';
    else if (D.yer === 'defne') ortam = 'karanlik';
    else if (D.zaman === 'gece' || D.zaman === 'aksam' && D.bolum >= 3) ortam = 'circir';
    else if (IC.includes(D.yer)) ortam = 'ic';
    Ses.ortamCal(ortam);
  }

  // ================= defter sayfası =================
  let yaziyor = null; // { bitir() }
  function tarihYaz() {
    const b = BOLUMLER[D.bolum];
    $('tarih').textContent = b ? `${String(b.gun).padStart(2, '0')}.${String(AYLAR.indexOf(b.ay) + 1).padStart(2, '0')}.${b.yil}` : '';
  }
  function satirEl(s) {
    const p = document.createElement('p');
    p.className = 'satir ' + s.tur;
    if (s.tur === 'konusma') {
      const k = document.createElement('span'); k.className = 'kim'; k.textContent = s.kim;
      k.style.color = (KARAKTERLER[s.kim] || {}).renk || 'var(--murekkep)';
      p.appendChild(k);
    }
    const m = document.createElement('span'); m.className = 'icerik';
    p.appendChild(m);
    return { p, m };
  }
  function sayfaTemizle(ses = true) {
    $('metin').innerHTML = ''; D.sayfa = [];
    if (ses) Ses.efekt('sayfa');
  }
  function sayfaYukle() {
    $('metin').innerHTML = '';
    D.sayfa.forEach((s, i) => {
      const { p, m } = satirEl(s); m.textContent = yerlestir(s.metin);
      if (i < D.sayfa.length - 1) p.classList.add('eski');
      $('metin').appendChild(p);
    });
    const son = D.sayfa[D.sayfa.length - 1];
    portreGoster(son && son.tur === 'konusma' ? son.kim : null);
    asagiKaydir();
  }
  function asagiKaydir() { const s = $('kaydir'); s.scrollTop = s.scrollHeight; }

  function portreGoster(kim) {
    const k = kim && KARAKTERLER[kim];
    const pr = $('portre');
    if (k && k.id && Portre.var(k.id)) {
      if (pr.dataset.id !== k.id) { $('portreFoto').innerHTML = Portre.ciz(k.id); pr.dataset.id = k.id; }
      pr.hidden = false;
    } else { pr.hidden = true; pr.dataset.id = ''; }
  }

  function satirEkle(c) {
    const s = c.t === 'konus' ? { tur: 'konusma', kim: (KARAKTERLER[c.kim] || {}).takma || c.kim, metin: c.metin } : { tur: c.tur || 'anlati', metin: c.metin };
    if (c.t === 'konus') s.anahtar = c.kim;
    D.sayfa.push(s); if (D.sayfa.length > 30) D.sayfa.shift();
    D.gecmis.push(s); if (D.gecmis.length > 400) D.gecmis.shift();
    [...$('metin').children].forEach(e => e.classList.add('eski'));
    while ($('metin').children.length > 30) $('metin').firstChild.remove();
    const { p, m } = satirEl(s);
    $('metin').appendChild(p);
    portreGoster(c.t === 'konus' ? c.kim : null);
    yaz(m, yerlestir(s.metin));
  }

  function yaz(el, metin) {
    const hiz = HIZ[meta.ayar.hiz] || 55;
    const sayfa = $('sayfa');
    sayfa.classList.add('yaziyor'); sayfa.classList.remove('bekliyor');
    if (hiz === Infinity) { el.textContent = metin; bitti(); return; }
    let basla = null, son = 0, iptal = false;
    function bitti() { yaziyor = null; sayfa.classList.remove('yaziyor'); sayfa.classList.add('bekliyor'); asagiKaydir(); }
    function kare(z) {
      if (iptal) return;
      if (basla === null) basla = z;
      const n = Math.min(metin.length, Math.floor((z - basla) / 1000 * hiz));
      if (n !== son) { el.textContent = metin.slice(0, n); son = n; asagiKaydir(); }
      if (n >= metin.length) return bitti();
      requestAnimationFrame(kare);
    }
    yaziyor = { bitir() { iptal = true; el.textContent = metin; bitti(); } };
    requestAnimationFrame(kare);
  }

  // ================= seçimler =================
  function secimGoster(idx) {
    D.bekleyen = 'secim'; D.secimIdx = idx;
    const c = DUGUM[D.dugum][idx];
    const kap = $('secimler'); kap.innerHTML = ''; kap.classList.remove('bitti');
    $('sayfa').classList.remove('bekliyor');
    const gecerli = c.liste.filter(s => kosulDogru(s.kosul));
    gecerli.forEach((s, i) => {
      const b = document.createElement('button');
      b.className = 'secim'; b.setAttribute('role', 'listitem');
      b.innerHTML = `<svg viewBox="0 0 26 26" aria-hidden="true"><path d="M4 5.5 q 8 -1.2 17.5 .3 q .8 8 -.4 16 q -8.5 1 -17 -.2 q -.9 -8 -.1 -16.1z"/><path class="tik" d="M7 13 l 4.5 5 l 10 -14"/></svg><span></span>`;
      b.querySelector('span').textContent = yerlestir(s.metin);
      b.addEventListener('click', e => { e.stopPropagation(); sec(s, b); });
      b.dataset.n = i + 1;
      kap.appendChild(b);
    });
    asagiKaydir();
    setTimeout(asagiKaydir, 400);
  }
  let seciliyor = false;
  function sec(s, b) {
    if (seciliyor) return;
    seciliyor = true;
    b.classList.add('secildi'); $('secimler').classList.add('bitti');
    Ses.efekt('kalem');
    setTimeout(() => {
      $('secimler').innerHTML = '';
      seciliyor = false;
      etkiUygula(s.etki);
      const kisa = { tur: 'sen', metin: s.metin };
      D.sayfa.push(kisa); D.gecmis.push(kisa);
      [...$('metin').children].forEach(e => e.classList.add('eski'));
      const { p, m } = satirEl(kisa); m.textContent = yerlestir(s.metin); $('metin').appendChild(p);
      D.secimIdx = null;
      if (s.hedef) { D.dugum = s.hedef; D.i = 0; }
      ilerle();
    }, 520);
  }

  // ================= ana döngü =================
  function git(h) { if (!DUGUM[h]) console.error('Böyle bir düğüm yok:', h); D.dugum = h; D.i = 0; }

  function ilerle() {
    D.bekleyen = null;
    for (let koruma = 0; koruma < 1000; koruma++) {
      const liste = DUGUM[D.dugum];
      if (!liste) { console.error('Düğüm bulunamadı', D.dugum); return; }
      if (D.i >= liste.length) { console.error('Düğüm bitti ama gidecek yer yok', D.dugum); return; }
      const c = liste[D.i++];
      switch (c.t) {
        case 'git': git(c.hedef); break;
        case 'eger': if (kosulDogru(c.kosul)) git(c.hedef); break;
        case 'etki': etkiUygula(c.etki); if (D.yer) sahneCiz(); break;
        case 'yer': {
          const yeniYer = c.yer !== D.yer;
          D.yer = c.yer; D.zaman = c.zaman; D.hava = c.hava;
          if (yeniYer && D.sayfa.length) sayfaTemizle();
          sahneCiz();
          break;
        }
        case 'ani': aniAc(c.id); break;
        case 'not': notGoster(c.metin); break;
        case 'son': D.bitis = c.id; meta.sonlar[c.id] = Date.now(); metaKaydet(); sahneCiz(); break;
        case 'anlat': case 'konus': satirEkle(c); D.bekleyen = 'satir'; kaydet(); return;
        case 'secim': secimGoster(D.i - 1); kaydet(); return;
        case 'bolum': D.bolum = c.n; D.bekleyen = 'takvim'; kaydet(); takvimGoster(); return;
        case 'isim': D.bekleyen = 'isim'; kaydet(); isimGoster(); return;
        case 'bitir': sonGoster(); return;
      }
    }
    console.error('Sonsuz döngü?', D.dugum);
  }

  function dokun() {
    if (!D || !$('oyun').classList.contains('aktif')) return;
    if (!$('panel').hidden || !$('takvim').hidden || !$('etiket').hidden || !$('sonEkran').hidden) return;
    Ses.baslat();
    if (yaziyor) { yaziyor.bitir(); return; }
    if (D.bekleyen === 'satir') ilerle();
  }

  // ================= takvim yaprağı, isim, notlar =================
  function takvimGoster() {
    const b = BOLUMLER[D.bolum];
    sayfaTemizle(false); portreGoster(null); tarihYaz();
    $('tkAy').textContent = b.ay; $('tkYil').textContent = b.yil;
    $('tkGun').textContent = b.gun; $('tkGun').classList.toggle('kirmizi', b.haftagunu === 'Pazar');
    $('tkHafta').textContent = b.haftagunu;
    $('tkBolum').textContent = D.bolum === 7 ? 'Son söz' : `${D.bolum}. bölüm`;
    $('tkAd').textContent = b.ad; $('tkSoz').textContent = b.soz;
    const y = $('takvimYaprak'); y.classList.remove('kopuyor'); y.classList.remove('geliyor'); void y.offsetWidth; y.classList.add('geliyor');
    $('takvim').hidden = false;
    setTimeout(() => $('tkBtn').focus(), 50);
  }
  $('tkBtn').addEventListener('click', () => {
    const y = $('takvimYaprak');
    if (y.classList.contains('kopuyor')) return;
    Ses.baslat(); Ses.efekt('yirt');
    y.classList.add('kopuyor');
    setTimeout(() => { $('takvim').hidden = true; ilerle(); }, 760);
  });

  function isimGoster() {
    $('etiket').hidden = false; $('adInput').value = D.ad || '';
    setTimeout(() => $('adInput').focus(), 60);
  }
  $('etiketForm').addEventListener('submit', e => {
    e.preventDefault();
    let ad = $('adInput').value.trim().replace(/\s+/g, ' ');
    if (!ad) return;
    ad = ad.charAt(0).toLocaleUpperCase('tr') + ad.slice(1);
    D.ad = ad; $('etiket').hidden = true; Ses.efekt('kalem');
    ilerle();
  });

  const IKON_FOTO = '<svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';
  function notGoster(metin, tur = '') {
    const n = document.createElement('div'); n.className = 'not ' + tur;
    n.innerHTML = tur === 'ani' ? IKON_FOTO : '';
    n.appendChild(document.createTextNode(yerlestir(metin)));
    $('notlar').appendChild(n);
    Ses.efekt(tur === 'ani' ? 'flas' : 'not');
    setTimeout(() => n.remove(), 3800);
  }
  function aniAc(id) {
    if (!ANILAR[id]) { console.warn('Anı yok', id); return; }
    if (!D.anilar.includes(id)) D.anilar.push(id);
    const yeni = !meta.anilar[id];
    meta.anilar[id] = 1; metaKaydet();
    notGoster((yeni ? 'Yeni anı: ' : 'Anı: ') + ANILAR[id].baslik, 'ani');
  }

  // ================= son =================
  function sonGoster() {
    const s = SONLAR[D.bitis] || { ad: 'Son' };
    $('sonAd').textContent = s.ad;
    const acik = Object.keys(meta.sonlar).length;
    $('sonOzet').textContent = `Bu yaz ${D.anilar.length} anı biriktirdin. ${Object.keys(SONLAR).length} sondan ${acik} tanesini gördün.` + (acik < Object.keys(SONLAR).length ? ' Başka seçimler, başka bir yaz demek.' : ' Akasya Sokağı\'nın bütün hikayelerini biliyorsun artık.');
    $('sonEkran').hidden = false;
    depo.sil('mahalle.kayit');
    Ses.ortamCal(null); Ses.muzikCal();
    setTimeout(() => $('sonMenu').focus(), 100);
  }
  $('sonMenu').addEventListener('click', () => { $('sonEkran').hidden = true; giriseDon(); });
  $('sonAnilar').addEventListener('click', () => { $('sonEkran').hidden = true; panelAc('anilar', () => { $('sonEkran').hidden = false; }); });

  // ================= paneller =================
  let panelGeri = null;
  function panelAc(tur, geri = null) {
    panelGeri = geri;
    const ic = $('panelIcerik'); ic.innerHTML = '';
    const baslik = { anilar: 'Anı defteri', sonlar: 'Sonlar', ayar: 'Ayarlar', menu: 'Durakla', gecmis: 'Geçmiş' }[tur];
    $('panelBaslik').textContent = baslik;
    PANEL[tur](ic);
    if ($('panel').hidden) history.pushState({ panel: 1 }, '');
    $('panel').hidden = false;
    setTimeout(() => $('panelKapat').focus(), 30);
  }
  function panelKapat(geriDon = true) {
    if ($('panel').hidden) return;
    $('panel').hidden = true;
    if (geriDon && history.state && history.state.panel) history.back();
    if (panelGeri) { const g = panelGeri; panelGeri = null; g(); }
  }
  $('panelKapat').addEventListener('click', () => panelKapat());
  $('panel').addEventListener('click', e => { if (e.target === $('panel')) panelKapat(); });

  const PANEL = {
    anilar(ic) {
      const ids = Object.keys(ANILAR), acik = ids.filter(i => meta.anilar[i]).length;
      ic.innerHTML = `<p class="panel-not">${ids.length} fotoğraftan ${acik} tanesi defterde. Kilitliler başka seçimlerde saklı.</p><div class="album"></div>`;
      const al = ic.querySelector('.album');
      ids.forEach(id => {
        const a = ANILAR[id], f = document.createElement('div');
        if (meta.anilar[id]) {
          f.className = 'foto';
          f.innerHTML = `<button aria-label="${a.baslik}"><div class="kare"></div><span class="damga">${a.tarih}</span><span class="alt"></span></button>`;
          f.querySelector('.kare').innerHTML = aniSahne(a);
          f.querySelector('.alt').textContent = a.baslik;
          f.querySelector('button').addEventListener('click', () => aniBuyut(ic, id));
        } else {
          f.className = 'foto kilitli';
          f.innerHTML = `<div class="kare">?</div><span class="alt">henüz yok</span>`;
        }
        al.appendChild(f);
      });
    },
    sonlar(ic) {
      const ul = document.createElement('ul'); ul.className = 'sonlar';
      for (const [id, s] of Object.entries(SONLAR)) {
        const acik = !!meta.sonlar[id], li = document.createElement('li');
        if (!acik) li.className = 'kilitli';
        li.innerHTML = `<span class="kutu">${acik ? '✓' : ''}</span><div><b></b><span></span></div>`;
        li.querySelector('b').textContent = acik ? s.ad : 'Kilitli son';
        li.querySelector('div span').textContent = s.ipucu;
        ul.appendChild(li);
      }
      ic.appendChild(ul);
    },
    ayar(ic) {
      const grup = (etiket, anahtar, secenekler, uygula) => {
        const d = document.createElement('div'); d.className = 'ayar';
        d.innerHTML = `<span>${etiket}</span><div class="ayar-secenek"></div>`;
        const kap = d.querySelector('.ayar-secenek');
        secenekler.forEach(([deger, ad]) => {
          const b = document.createElement('button'); b.textContent = ad;
          b.setAttribute('aria-pressed', String(meta.ayar[anahtar] === deger));
          b.addEventListener('click', () => {
            meta.ayar[anahtar] = deger; metaKaydet(); uygula && uygula(deger);
            kap.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
          });
          kap.appendChild(b);
        });
        ic.appendChild(d);
      };
      grup('Yazı hızı', 'hiz', [['yavas', 'Yavaş'], ['normal', 'Normal'], ['hizli', 'Hızlı'], ['aninda', 'Anında']]);
      grup('Yazı boyutu', 'boyut', [['normal', 'Normal'], ['buyuk', 'Büyük']], ayarUygula);
      grup('Ses', 'ses', [[true, 'Açık'], [false, 'Kapalı']], ayarUygula);
      grup('Ortam sesleri', 'ortam', [[.25, 'Kısık'], [.6, 'Orta'], [1, 'Yüksek']], ayarUygula);
      const d = document.createElement('div'); d.className = 'ayar';
      d.innerHTML = `<span>Anı defteri ve sonlar</span><div class="ayar-secenek"><button>Hepsini sıfırla</button></div>`;
      const b = d.querySelector('button');
      b.addEventListener('click', () => {
        if (!b.dataset.emin) { b.dataset.emin = 1; b.textContent = 'Emin misin? Bir daha dokun'; return; }
        meta.anilar = {}; meta.sonlar = {}; metaKaydet(); b.textContent = 'Sıfırlandı'; b.disabled = true;
      });
      ic.appendChild(d);
    },
    menu(ic) {
      ic.innerHTML = `<div class="menu-liste"><button data-k="devam">Devam et</button><button data-k="gecmis">Geçmiş</button><button data-k="anilar">Anı defteri</button><button data-k="sonlar">Sonlar</button><button data-k="ayar">Ayarlar</button><button data-k="cik" class="tehlike">Ana menüye dön</button></div><p class="panel-not" style="margin-top:14px">Oyun her adımda kendiliğinden kaydedilir.</p>`;
      ic.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
        const k = b.dataset.k;
        if (k === 'devam') return panelKapat();
        if (k === 'cik') { panelKapat(); return giriseDon(); }
        panelAc(k, () => panelAc('menu'));
      }));
    },
    gecmis(ic) {
      const d = document.createElement('div'); d.className = 'gecmis';
      D.gecmis.slice(-150).forEach(s => {
        const p = document.createElement('p');
        if (s.tur === 'konusma') { const k = document.createElement('span'); k.className = 'kim'; k.textContent = s.kim + ' '; p.appendChild(k); }
        if (s.tur === 'sen') { const k = document.createElement('span'); k.className = 'sen'; k.textContent = '✓ ' + yerlestir(s.metin); p.appendChild(k); }
        else p.appendChild(document.createTextNode(yerlestir(s.metin)));
        d.appendChild(p);
      });
      ic.appendChild(d);
      setTimeout(() => { ic.scrollTop = ic.scrollHeight; }, 0);
    },
  };

  function aniSahne(a) {
    const [yil, ay] = a.tarih.split(' ');
    const bolum = yil === "'97" ? 2 : Math.max(1, Math.min(6, +ay - 5));
    return Sahne.ciz(a.yer, a.zaman, { bolum, tabela: a.tabela, kermes: a.kermes, hava: a.hava, bitis: a.park ? 'park' : a.apartman ? 'dut' : null });
  }
  function aniBuyut(ic, id) {
    const a = ANILAR[id];
    ic.innerHTML = `<div class="foto-buyuk"><div class="foto"><div class="kare"></div><span class="damga">${a.tarih}</span></div><h3></h3><p></p><div class="menu-liste"><button>Albüme dön</button></div></div>`;
    ic.querySelector('.kare').innerHTML = aniSahne(a);
    ic.querySelector('h3').textContent = a.baslik;
    ic.querySelector('p').textContent = a.yazi;
    ic.querySelector('button').addEventListener('click', () => PANEL_YENILE('anilar'));
  }
  function PANEL_YENILE(tur) { $('panelIcerik').innerHTML = ''; PANEL[tur]($('panelIcerik')); }

  function ayarUygula() {
    document.documentElement.classList.toggle('buyuk', meta.ayar.boyut === 'buyuk');
    Ses.ayarla({ ses: meta.ayar.ses, ortam: meta.ayar.ortam });
  }

  // ================= ekranlar =================
  function ekran(id) {
    document.querySelectorAll('.ekran').forEach(e => e.classList.toggle('aktif', e.id === id));
  }
  function girisHazirla() {
    $('girisSahne').innerHTML = Sahne.ciz('sokak', 'aksam', { bolum: 1 });
    const k = depo.al('mahalle.kayit');
    $('btnDevam').hidden = !(k && k.dugum);
    $('btnYeni').textContent = 'Yeni oyun'; delete $('btnYeni').dataset.emin;
  }
  function giriseDon() {
    kaydet(); D = null;
    Ses.ortamCal(null);
    girisHazirla(); ekran('giris');
  }

  function oyunuAc(kayit) {
    Ses.baslat(); Ses.muzikDur();
    D = kayit || yeniDurum();
    sonSahne = ''; $('sahne').innerHTML = ''; $('secimler').innerHTML = ''; $('notlar').innerHTML = '';
    ekran('oyun');
    history.pushState({ oyun: 1 }, '');
    if (!kayit) { ilerle(); return; }
    // kayıttan devam
    tarihYaz(); sahneCiz(true); sayfaYukle();
    if (D.bekleyen === 'secim' && D.secimIdx !== null) secimGoster(D.secimIdx);
    else if (D.bekleyen === 'takvim') takvimGoster();
    else if (D.bekleyen === 'isim') isimGoster();
    else if (D.bekleyen === 'satir') $('sayfa').classList.add('bekliyor');
    else ilerle();
  }

  $('btnYeni').addEventListener('click', () => {
    const k = depo.al('mahalle.kayit');
    if (k && k.dugum && !$('btnYeni').dataset.emin) { $('btnYeni').dataset.emin = 1; $('btnYeni').textContent = 'Kayıtlı oyun silinecek, emin misin?'; return; }
    depo.sil('mahalle.kayit');
    oyunuAc(null);
  });
  $('btnDevam').addEventListener('click', () => oyunuAc(depo.al('mahalle.kayit')));
  $('btnAnilar').addEventListener('click', () => panelAc('anilar'));
  $('btnSonlar').addEventListener('click', () => panelAc('sonlar'));
  $('btnAyar').addEventListener('click', () => panelAc('ayar'));
  $('btnMenu').addEventListener('click', e => { e.stopPropagation(); panelAc('menu'); });
  $('btnGecmis').addEventListener('click', e => { e.stopPropagation(); panelAc('gecmis'); });
  $('sayfa').addEventListener('click', dokun);
  $('sahne').addEventListener('click', dokun);
  $('giris').addEventListener('pointerdown', () => { if (meta.ayar.ses) Ses.muzikCal(); }, { once: true });

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'Escape') {
      if (!$('panel').hidden) return panelKapat();
      if ($('oyun').classList.contains('aktif') && $('takvim').hidden && $('etiket').hidden) return panelAc('menu');
    }
    if (!$('panel').hidden) return;
    if ((e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') && !(e.target.tagName === 'BUTTON' && e.key !== 'ArrowRight')) { e.preventDefault(); dokun(); }
    if (/^[1-4]$/.test(e.key)) { const b = $('secimler').querySelector(`[data-n="${e.key}"]`); if (b) b.click(); }
  });

  // Android geri tuşu / tarayıcı geri
  window.addEventListener('popstate', () => {
    if (!$('panel').hidden) { panelKapat(false); return; }
    if ($('oyun').classList.contains('aktif') && D) { history.pushState({ oyun: 1 }, ''); panelAc('menu'); }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { kaydet(); Ses.ortamCal(null); Ses.muzikDur(); } else if (D && $('oyun').classList.contains('aktif')) sahneCiz(true); });

  // ================= başlat =================
  ayristir();
  metaYukle(); ayarUygula();
  girisHazirla();
  // hata ayıklama için
  window.Mahalle = { DUGUM, durum: () => D, kosulDogru };
})();
