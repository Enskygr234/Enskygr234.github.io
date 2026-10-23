// Son Tren — ana oyun: sahne, kamera, dokunma, diyalog, bölümler, sonlar, kayıt.
import * as THREE from '../lib/three.module.js';
import { treniKur, Disari, KORIDOR_Z, SINIR } from './dunya.js';
import { Kisi, Kedi } from './karakter.js';
import { Ses } from './ses.js';
import { KISILER, BOLUMLER, ANILAR, ESYALAR, FOTOGRAFLAR, DIYALOG, SONLAR } from './hikaye.js';
import { Toplayici, yaziDokusu } from './yardimci.js';

const $ = s => document.querySelector(s);
const KAYIT = 'son-tren.v1', SON_KAYIT = 'son-tren.sonlar';
const sinirla = (v, a, b) => Math.max(a, Math.min(b, v));

// ---------------------------------------------------------------- ek diyaloglar
Object.assign(DIYALOG, {
  husnu_sonra: [{ k: 'husnu', m: 'Bir sonraki durakta ineceğim. Saati iyi taşı evladım; zorlama, kendi zamanında yürür.' }],
  murat_sonra: [{ k: 'murat', m: 'Mektup sende. Akasya Sokağı, üç numara. Unutma, olur mu?' }],
  elif_sonra: [{ k: 'elif', m: 'Duman seni sevdi. Kimseyi sevmez ama seni sevdi.' }],
  kedi_sardalyasiz: [{ m: 'Koltuğun altından bir hırıltı geliyor. İki sarı göz parlıyor, sonra kayboluyor.' }, { m: 'Duman yabancılara gelmez. Belki bir şeyle kandırabilirsin.' }],
  kedi_erken: [{ m: 'Koltuğun altı karanlık. Toz ve unutulmuş bir şemsiye.' }],
  duman: [{ m: 'Duman gözlerini kısıp mırlıyor. Kuyruğunun beyaz ucu bir sağa bir sola.' }],
  kondukter_bufe: [{ k: 'kondukter', m: 'Çay demlenmedi daha. Bu trende çay hiç demlenmez zaten; ama kokusu güzel.' }],
  foto_yok: [{ m: 'Burada başka bir şey yok.' }],
});
const KAZA = {
  baslik: '04:17',
  metin: [
    'Karlı bir yol. Gece yarısını çoktan geçmiş. Eve dönüyorsun, çok yorgunsun.',
    'Telefonda annenin mesajı: "Geç kaldın, merak ettik. Elif seni beklerken uyuyakaldı."',
    'Silecekler bir sağa bir sola. Gözlerin bir anlığına kapanıyor.',
    'Sonra iki far. Çok uzun bir fren sesi.',
    'Ve beyazlık.',
  ],
};
const IKON = { bilet: '🎫', cark: '⚙️', saat: '🕰️', kalem: '✏️', pul: '📮', mektup: '✉️', sardalya: '🐟', resim: '🖍️' };
const KOLTUK = { husnu: 'w1_2_sol', murat: 'w1_3_sag', elif: 'w2_0_sol' };
const BOLUM_KISI = { 1: 'husnu', 2: 'murat', 3: 'elif' };
const KEDI_YER = 'koltukalti_4_sol', KEDI_X = 6.75;
const BUFE_K = { x: 29.9, z: -.3 };

// ---------------------------------------------------------------- render
const tuval = $('#sahne');
const renderer = new THREE.WebGLRenderer({ canvas: tuval, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
const sahne = new THREE.Scene();
const kamera = new THREE.PerspectiveCamera(38, 1, .1, 420);
let aktifSahne = sahne, aktifKamera = kamera;

function boyutla() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false);
  for (const k of [kamera, hastane && hastane.kamera].filter(Boolean)) {
    k.aspect = w / h;
    // en az ~11 birimlik yatay alan görünsün
    const yatay = 2 * Math.atan(5.6 / 8.6);
    k.fov = sinirla(THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(yatay / 2) / k.aspect)), 34, 70);
    k.updateProjectionMatrix();
  }
}

// ---------------------------------------------------------------- dünya
const tren = treniKur(sahne);
const disari = new Disari(sahne);
disari.hiz = 14;
// karakterlerin yüzü kameraya dönük; önden yumuşak bir dolgu ışığı
const dolgu = new THREE.DirectionalLight('#ffe2b8', .7); dolgu.position.set(0, 4, 12); sahne.add(dolgu); sahne.add(dolgu.target);
const oyuncu = new Kisi('sen', sahne);
const K = { kondukter: new Kisi('kondukter', sahne), husnu: new Kisi('husnu', sahne), murat: new Kisi('murat', sahne), elif: new Kisi('elif', sahne) };
oyuncu.hiz = 3.6;
const kedi = new Kedi(sahne);
const ses = new Ses();
const etk = Object.fromEntries(tren.etkilesim.map(e => [e.id, e]));

// hedef işareti
const isaret = new THREE.Mesh(new THREE.OctahedronGeometry(.09, 0), new THREE.MeshBasicMaterial({ color: '#ffd27a', transparent: true, opacity: .9 }));
isaret.scale.y = 1.6; sahne.add(isaret);
// miyav yazısı ve kedi gözleri
const miyavDoku = yaziDokusu((c, w, h) => { c.font = 'italic 600 52px Literata, Georgia, serif'; c.fillStyle = '#ffe9b8'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.shadowColor = '#000'; c.shadowBlur = 8; c.fillText('miyav~', w / 2, h / 2); }, 256, 96);
const miyav = new THREE.Sprite(new THREE.SpriteMaterial({ map: miyavDoku, transparent: true, opacity: 0, depthTest: false }));
miyav.scale.set(.9, .34, 1); miyav.position.set(KEDI_X, .85, -.3); sahne.add(miyav);
const gozler = new THREE.Group();
for (const dz of [-.06, .06]) { const g = new THREE.Mesh(new THREE.SphereGeometry(.025, 8, 6), new THREE.MeshBasicMaterial({ color: '#f5d24a' })); g.position.set(0, 0, dz); gozler.add(g); }
gozler.position.set(KEDI_X + .15, .14, -.42); gozler.rotation.y = Math.PI / 2; gozler.visible = false; sahne.add(gozler);

// ---------------------------------------------------------------- durum
let D;
const yeniDurum = () => ({ bolum: 0, bayrak: {}, env: [], anilar: {}, fotolar: [], oyuncuX: -2.8 });
let kilit = 0, diyalogAcik = false, duraklat = false, oyunda = false, olcek = 1, zaman = 0;
let kameraOdak = null, konusan = null, sonrakiler = [], bekleyenAnilar = [];
const zamanlayicilar = [];
const zamanla = (s, f) => zamanlayicilar.push({ s, f });
const bekle = s => new Promise(c => zamanla(s, c));
let hizHedef = 14, fren = 0;

function kaydet() {
  if (!oyunda || kilit > 0 || D.son) return;
  try { localStorage.setItem(KAYIT, JSON.stringify({ ...D, oyuncuX: oyuncu.x })); } catch (e) { /* gizli sekme */ }
}
function kayitOku() { try { const k = JSON.parse(localStorage.getItem(KAYIT)); return k && typeof k.bolum === 'number' ? k : null; } catch (e) { return null; } }
function kayitSil() { try { localStorage.removeItem(KAYIT); } catch (e) { /* yok */ } }
function sonlarOku() { try { return JSON.parse(localStorage.getItem(SON_KAYIT)) || []; } catch (e) { return []; } }

// ---------------------------------------------------------------- arayüz
const ui = {
  kutu: $('#diyalog'), kim: $('#diyalog .kim'), metin: $('#diyalog .metin'), secim: $('#diyalog .secimler'),
  ipucu: $('#ipucu'), env: $('#envanter'), perde: $('#perde'),
};
let ilerle = null, yazici = null;

function satirGoster(n) {
  return new Promise(coz => {
    const kisi = n.k ? KISILER[n.k] : null;
    ui.kutu.hidden = false; ui.kutu.classList.toggle('anlati', !kisi); ui.kutu.classList.remove('bitti');
    ui.kim.textContent = kisi ? kisi.ad : ''; ui.kim.style.color = kisi ? kisi.renk : '';
    ui.secim.innerHTML = '';
    konusanAyarla(n.k);
    const metin = n.m; let i = 0, bitti = false;
    ui.metin.textContent = '';
    yazici = dt => {
      i += dt * 85; ui.metin.textContent = metin.slice(0, Math.floor(i));
      if (i >= metin.length) tamam();
    };
    const tamam = () => { yazici = null; ui.metin.textContent = metin; bitti = true; ui.kutu.classList.add('bitti'); if (konusan) konusan.konusuyor = false; };
    ilerle = () => {
      if (!bitti) { tamam(); return; }
      ilerle = null; ses.blip(520); coz();
    };
  });
}
function secimGoster(secenekler) {
  return new Promise(coz => {
    ui.kutu.classList.add('bitti'); ui.kutu.classList.remove('anlati');
    ui.secim.innerHTML = '';
    if (konusan) konusan.konusuyor = false;
    ilerle = null;
    secenekler.forEach((s, i) => {
      const b = document.createElement('button'); b.textContent = s.m; b.style.animationDelay = i * .08 + 's';
      b.onclick = e => { e.stopPropagation(); ui.secim.innerHTML = ''; ses.blip(780); secimSec = null; coz(s); };
      ui.secim.appendChild(b);
    });
    secimSec = i => { const b = ui.secim.children[i]; b && b.click(); };
  });
}
let secimSec = null, kameraKisi = null;
function konusanAyarla(k) {
  for (const kisi of [oyuncu, ...Object.values(K)]) kisi.konusuyor = false;
  konusan = k && k !== 'sen' ? K[k] : (k === 'sen' ? oyuncu : null);
  if (konusan && konusan !== oyuncu) kameraKisi = konusan;
  if (konusan) { konusan.konusuyor = true; konusan.bakX = oyuncu.x; oyuncu.bakX = konusan.x; }
}
ui.kutu.addEventListener('pointerdown', e => { e.stopPropagation(); ilerle && ilerle(); });

async function konus(id) {
  diyalogAcik = true; kilit++;
  let liste = DIYALOG[id], i = 0;
  while (liste && i < liste.length) {
    const n = liste[i++];
    if (n.olay) { const r = await OLAY[n.olay]?.(); if (typeof r === 'string') { liste = DIYALOG[r]; i = 0; } continue; }
    if (n.git) { liste = DIYALOG[n.git]; i = 0; continue; }
    if (n.secim) {
      const s = await secimGoster(n.secim);
      for (const [a, v] of Object.entries(s.e || {})) {
        if (a === 'ani') { D.anilar[v] = true; bekleyenAnilar.push(v); }
        else if (a === 'satir') D.bayrak.mektup_satir = v;
        else D.bayrak[a] = v;
      }
      liste = DIYALOG[s.git]; i = 0; continue;
    }
    await satirGoster(n);
  }
  ui.kutu.hidden = true; ilerle = null;
  konusanAyarla(null); oyuncu.bakX = null; kameraKisi = null;
  for (const k of Object.values(K)) k.bakX = null;
  while (bekleyenAnilar.length) { const a = bekleyenAnilar.shift(); await aniGoster(ANILAR[a]); }
  diyalogAcik = false; kilit--;
  ipucuGuncelle(); envanterCiz();
  const s = sonrakiler.splice(0); for (const f of s) f();
  kaydet();
}
const sonra = f => sonrakiler.push(f);
const kutuGizle = () => { ui.kutu.hidden = true; };

// anı ekranı
function aniGoster(a, kaza = false) {
  return new Promise(coz => {
    const el = $('#ani'); el.hidden = false; el.classList.toggle('kaza', kaza);
    el.querySelector('small').textContent = kaza ? 'HATIRLIYORSUN' : 'BİR ANI';
    el.querySelector('h2').textContent = a.baslik;
    const kap = el.querySelector('.satirlar'); kap.innerHTML = '';
    ses.muzik(true); if (kaza) ses.kalp();
    let i = 0;
    const sonraki = () => {
      if (i >= a.metin.length) { el.hidden = true; el.onpointerdown = null; ses.muzik(false); aniIlerle = null; coz(); return; }
      if (kap.children.length >= 3) kap.removeChild(kap.firstChild);
      const p = document.createElement('p'); p.textContent = a.metin[i++]; kap.appendChild(p); ses.blip(440);
    };
    el.onpointerdown = e => { e.stopPropagation(); sonraki(); };
    aniIlerle = sonraki;
    sonraki();
  });
}
let aniIlerle = null;

function incele(baslik, metin, tur = 'EŞYA') {
  const el = $('#incele'); el.hidden = false;
  el.querySelector('.tur').textContent = tur; el.querySelector('h3').textContent = baslik; el.querySelector('p').textContent = metin;
  duraklat = true;
  return new Promise(c => { const kapa = () => { el.hidden = true; duraklat = false; c(); }; el.querySelector('button').onclick = kapa; el.onpointerdown = e => { if (e.target === el) kapa(); }; });
}

function envanterCiz(yeni) {
  ui.env.innerHTML = '';
  for (const id of D.env) {
    const b = document.createElement('button'); b.className = 'esya' + (id === yeni ? ' yeni' : '');
    b.innerHTML = `<i>${IKON[id] || '•'}</i>`; b.append(ESYALAR[id].ad);
    b.onclick = e => { e.stopPropagation(); ses.blip(); incele(ESYALAR[id].ad, esyaAciklama(id)); };
    ui.env.appendChild(b);
    if (id === yeni) setTimeout(() => b.classList.remove('yeni'), 2500);
  }
  if (D.fotolar.length) {
    const b = document.createElement('button'); b.className = 'esya';
    b.innerHTML = `<i>📷</i>`; b.append(`Fotoğraflar ${D.fotolar.length}/3`);
    b.onclick = e => { e.stopPropagation(); incele('Fotoğraflar', D.fotolar.map(f => FOTOGRAFLAR[f]).join('\n\n'), 'BULUNANLAR'); };
    ui.env.appendChild(b);
  }
}
function esyaAciklama(id) {
  if (id === 'mektup' && D.bayrak.mektup_satir) return ESYALAR.mektup.aciklama + ` Son satırı biliyorsun: "${D.bayrak.mektup_satir}"`;
  return ESYALAR[id].aciklama;
}
function esyaEkle(id) { if (!D.env.includes(id)) D.env.push(id); ses.esya(); envanterCiz(id); }
function esyaSil(id) { D.env = D.env.filter(e => e !== id); envanterCiz(); }

let perdeOp = 1, perdeHedef = 1, perdeHiz = 1;
function perde(acik, renk = 'siyah', sure = 1.2) {
  ui.perde.classList.toggle('beyaz', renk === 'beyaz');
  perdeHedef = acik ? 1 : 0; perdeHiz = 1 / Math.max(.01, sure);
  return bekle(sure);
}

function tabelaGoster(b) {
  const el = $('#tabela'); el.hidden = false; el.classList.remove('cik');
  el.querySelector('b').textContent = b.durak; el.querySelector('.saat').textContent = b.saat; el.querySelector('.bolum').textContent = b.ad;
  // levha animasyonunu yeniden başlat
  const l = el.querySelector('.levha'); l.style.animation = 'none'; void l.offsetWidth; l.style.animation = '';
  return bekle(2.6).then(() => { el.classList.add('cik'); return bekle(1); }).then(() => { el.hidden = true; });
}

// ---------------------------------------------------------------- ipucu ve işaret
function ipucuMetni() {
  if (!D) return '';
  const B = D.bayrak, n = D.bolum, var_ = id => D.env.includes(id);
  if (n === 0) {
    if (!var_('bilet')) return 'Karşı koltuktaki kâğıda dokun.';
    return 'Tren bir sonraki durağa yaklaşıyor…';
  }
  if (B['b' + n]) return 'Tren bir sonraki durağa ilerliyor…';
  if (n === 1) {
    if (!B.husnu_konustu) return 'Yeni yolcuyla konuş.';
    if (!var_('cark')) return 'Yemekli vagondaki şekerliğe bak.';
    return 'Çarkı Hüsnü Usta\'ya götür.';
  }
  if (n === 2) {
    if (!B.murat_konustu) return 'Yeni yolcuyla konuş.';
    if (!var_('kalem') || !var_('pul')) return `Bavuldan kalemi al${var_('kalem') ? ' ✓' : ''}, kondüktörden pul iste${var_('pul') ? ' ✓' : ''}.`;
    return 'Kalemi ve pulu Murat\'a götür.';
  }
  if (n === 3) {
    if (!B.elif_konustu) return 'Yeni yolcuyla konuş.';
    if (!B.kedi_bulundu && !var_('sardalya')) return 'Büfeden sardalya al.';
    if (!B.kedi_bulundu) return 'Miyavlamayı dinle. Doğru koltuğun altına bak.';
    return 'Elif\'le konuş.';
  }
  return '';
}
function ipucuGuncelle() { ui.ipucu.textContent = kilit > 0 && !diyalogAcik ? '' : ipucuMetni(); }

function isaretHedef() {
  if (!D || kilit > 0) return null;
  const B = D.bayrak, n = D.bolum, var_ = id => D.env.includes(id);
  const kisiUst = k => new THREE.Vector3(k.x, (k.mod === 'otur' ? 1.55 : 2.05) * k.s, k.z);
  const nesne = id => etk[id].nesne.position.clone().add(new THREE.Vector3(0, .35, 0));
  if (n === 0) return !var_('bilet') ? nesne('bilet') : null;
  if (B['b' + n]) return null;
  if (n === 1) return !B.husnu_konustu || var_('cark') ? kisiUst(K.husnu) : nesne('sekerlik');
  if (n === 2) { if (!B.murat_konustu || (var_('kalem') && var_('pul'))) return kisiUst(K.murat); return !var_('kalem') ? nesne('bavul') : kisiUst(K.kondukter); }
  if (n === 3) { if (!B.elif_konustu || B.kedi_bulundu) return kisiUst(K.elif); return !var_('sardalya') ? new THREE.Vector3(29.3, 2.1, -1.2) : null; }
  return null;
}

// ---------------------------------------------------------------- olaylar
const OLAY = {
  ipucu_bilet() { },
  async kondukter_gelir() {
    kutuGizle();
    const k = K.kondukter; k.gorunur = true; k.hemenDur(11.6);
    kameraOdak = () => (k.x + oyuncu.x) / 2;
    await bekle(.6); ses.kapi();
    await k.git(oyuncu.x + 1.05);
    kameraOdak = null;
    return 'kondukter_ilk';
  },
  kondukter_gider() {
    D.bayrak.kondukter_konustu = true;
    sonra(() => { kondukterBufeye(); zamanla(9, () => durakGel(1)); });
  },
  gorev_cark() { D.bayrak.husnu_konustu = true; D.bayrak.gorev_cark = true; },
  esya_cark() { esyaEkle('cark'); },
  esya_saat() { esyaSil('cark'); esyaEkle('saat'); ses.tiktak(); },
  bolum_bitti() { D.bayrak['b' + D.bolum] = true; const n = D.bolum; sonra(() => zamanla(5, () => durakGel(n + 1))); },
  gorev_mektup() { D.bayrak.murat_konustu = true; D.bayrak.gorev_mektup = true; },
  esya_kalem() { esyaEkle('kalem'); },
  esya_pul() { esyaEkle('pul'); },
  esya_mektup() { esyaSil('kalem'); esyaSil('pul'); esyaEkle('mektup'); },
  gorev_kedi() { D.bayrak.elif_konustu = true; D.bayrak.gorev_kedi = true; },
  esya_sardalya() { esyaEkle('sardalya'); },
  async kedi_cikar() {
    kutuGizle(); esyaSil('sardalya'); D.bayrak.kedi_bulundu = true;
    kedi.g.visible = true; kedi.kucakta = null; kedi.yerlestir(KEDI_X, -.75); gozler.visible = false;
    kameraOdak = () => (K.elif.x + oyuncu.x) / 2;
    await kedi.git(KEDI_X - .35, .35);
    ses.miyav(0, .8);
    await K.elif.git(KEDI_X - 1.1);
    kedi.kucakta = K.elif; ses.miyav(0, .6);
    kameraOdak = null;
    return 'elif_kedi';
  },
  esya_resim() { esyaEkle('resim'); },
  async son_hatirla() { kutuGizle(); await aniGoster(KAZA, true); return 'son_secim'; },
  async bilet_yazi() { kutuGizle(); await biletGoster(); },
  son_in() { D.son = Object.keys(D.anilar).length >= 3 ? 'uyanis' : 'yarim'; sonra(sonaGit); },
  son_kal() { D.son = 'kal'; sonra(sonaGit); },
  esya_foto() {
    const f = sonFoto; if (!f || D.fotolar.includes(f)) return;
    D.fotolar.push(f); etk['foto_' + f].nesne.visible = false; ses.esya(); envanterCiz();
    sonra(() => incele('Bir fotoğraf', FOTOGRAFLAR[f], `FOTOĞRAF ${D.fotolar.length}/3`));
  },
};
let sonFoto = null;

function biletGoster() {
  return new Promise(c => {
    const el = $('#bilet'); el.hidden = false; el.classList.remove('damgali');
    const n = Object.keys(D.anilar).length, v = el.querySelector('.varis');
    v.textContent = n >= 3 ? 'EV' : n === 2 ? 'E ·' : n === 1 ? '· ·' : '—';
    v.classList.toggle('silik', n < 3);
    el.querySelector('.damga').innerHTML = n >= 3 ? 'GEÇERLİ<br>DÖNÜŞ' : 'YARIM';
    el.querySelector('.not').textContent = n >= 3 ? 'Mürekkep taze. Harfler senin el yazınla.' : 'Harfler silik; bazıları hiç yazılmamış. Hatırladıkların kadar.';
    setTimeout(() => el.classList.add('damgali'), 50);
    ses.blip(330);
    const kapa = () => { el.hidden = true; el.onpointerdown = null; biletKapa = null; c(); };
    biletKapa = kapa;
    setTimeout(() => { el.onpointerdown = kapa; }, 700);
  });
}
let biletKapa = null;

function kondukterBufeye() {
  const k = K.kondukter;
  k.git(BUFE_K.x).then(() => { if (D.bolum < 4) { k.yerlestir(BUFE_K.x, KORIDOR_Z); k.isler.push({ tip: 'z', z: BUFE_K.z }); } });
}

// ---------------------------------------------------------------- etkileşim
function aktifMi(id) {
  const B = D.bayrak;
  if (id === 'bilet') return !D.env.includes('bilet') && D.bolum === 0;
  if (id.startsWith('koltukalti')) return D.bolum === 3 && B.gorev_kedi && !B.kedi_bulundu;
  if (id.startsWith('foto_')) return !D.fotolar.includes(id.slice(5));
  return true;
}

function etkiles(id) {
  const B = D.bayrak, var_ = e => D.env.includes(e), n = D.bolum;
  if (id === 'bilet') { esyaEkle('bilet'); etk.bilet.nesne.visible = false; D.bayrak.bilet_alindi = true; return konus('bilet_bul'); }
  if (id === 'sekerlik') return konus(n === 1 && B.gorev_cark && !var_('cark') && !B.b1 ? 'cark_bul' : 'sekerlik_bos');
  if (id === 'bavul') return konus(n === 2 && B.gorev_mektup && !var_('kalem') && !var_('mektup') ? 'bavul_kalem' : 'bavul_bos');
  if (id === 'bufe') return konus(n === 3 && B.gorev_kedi && !var_('sardalya') && !B.kedi_bulundu ? 'bufe_sardalya' : 'bufe_bos');
  if (id.startsWith('koltukalti')) {
    if (id !== KEDI_YER) return konus('kedi_yanlis');
    return konus(var_('sardalya') ? 'kedi_bul' : 'kedi_sardalyasiz');
  }
  if (id.startsWith('kapi_')) return konus('kapi_kilitli');
  if (id.startsWith('foto_')) { sonFoto = id.slice(5); return konus('foto_bul'); }
}

function kisiyleKonus(id) {
  const B = D.bayrak, var_ = e => D.env.includes(e), n = D.bolum;
  if (id === 'duman') return konus('duman');
  if (id === 'kondukter') {
    if (n === 2 && B.gorev_mektup && !var_('pul') && !var_('mektup')) return konus('kondukter_pul');
    return konus(n === 0 ? 'kondukter_sonra' : 'kondukter_bufe');
  }
  if (id === 'husnu') { if (B.b1) return konus('husnu_sonra'); if (!B.husnu_konustu) return konus('husnu_ilk'); return konus(var_('cark') ? 'husnu_cark' : 'husnu_bekle'); }
  if (id === 'murat') { if (B.b2) return konus('murat_sonra'); if (!B.murat_konustu) return konus('murat_ilk'); return konus(var_('kalem') && var_('pul') ? 'murat_yaz' : 'murat_bekle'); }
  if (id === 'elif') { if (B.b3) return konus('elif_sonra'); if (!B.elif_konustu) return konus('elif_ilk'); return konus(B.kedi_bulundu ? 'elif_kedi' : 'elif_bekle'); }
}

let yuruToken = 0;
async function yuruVe(x, f) {
  const t = ++yuruToken;
  oyuncu.isler = oyuncu.isler.filter(i => i.tip !== 'x');
  await oyuncu.git(sinirla(x, SINIR.min, SINIR.max));
  if (t !== yuruToken || kilit > 0) return;
  f && f();
}
function kisiDurX(k) { const yon = oyuncu.x < k.x ? -1 : 1; return k.x + yon * (k.mod === 'otur' ? 1.0 : .95); }

const isin = new THREE.Raycaster(), fare = new THREE.Vector2();
tuval.addEventListener('pointerdown', e => {
  if (!oyunda || duraklat) return;
  if (diyalogAcik) { ilerle && ilerle(); return; }
  if (kilit > 0) return;
  ses.baslat();
  fare.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  isin.setFromCamera(fare, kamera);
  const adaylar = [];
  for (const k of Object.values(K)) if (k.gorunur) adaylar.push(k.vurus);
  if (kedi.g.visible) adaylar.push(kedi.vurus);
  for (const e2 of tren.etkilesim) if ((e2.nesne.visible || e2.nesne.material?.visible === false) && aktifMi(e2.id)) adaylar.push(e2.nesne);
  const vur = isin.intersectObjects(adaylar, true)[0];
  if (vur) {
    let o = vur.object; while (o && !o.userData.kisi && !o.userData.etkilesim) o = o.parent;
    if (o && o.userData.kisi) {
      const id = o.userData.kisi, k = id === 'duman' ? kedi : K[id];
      ses.blip(600);
      return yuruVe(id === 'duman' ? k.x + (oyuncu.x < k.x ? -.8 : .8) : kisiDurX(k), () => kisiyleKonus(id));
    }
    if (o && o.userData.etkilesim) { const e2 = etk[o.userData.etkilesim]; ses.blip(600); return yuruVe(e2.durX, () => etkiles(e2.id)); }
  }
  // boş yere: koridor düzleminde x
  const r = isin.ray; const t = (KORIDOR_Z - r.origin.z) / r.direction.z;
  const x = r.origin.x + r.direction.x * (t > 0 ? t : 8);
  yuruVe(x);
  dokunmaHalkasi(x);
});

// küçük dokunma halkası
const halka = new THREE.Mesh(new THREE.RingGeometry(.12, .17, 24), new THREE.MeshBasicMaterial({ color: '#ffe2a8', transparent: true, opacity: 0, depthWrite: false }));
halka.rotation.x = -Math.PI / 2; halka.position.y = .04; sahne.add(halka);
let halkaT = 1;
function dokunmaHalkasi(x) { halka.position.set(sinirla(x, SINIR.min, SINIR.max), .04, KORIDOR_Z); halkaT = 0; }

// ---------------------------------------------------------------- bölüm kurulumu
function sahneKur() {
  const n = D.bolum, B = D.bayrak;
  disari.havaAyarla(BOLUMLER[n].hava, true); ses.hava = BOLUMLER[n].hava;
  disari.istasyonKaldir(); disari.hiz = hizHedef = 14; fren = 0;
  tren.damlaMat.opacity = BOLUMLER[n].hava === 'yagmur' ? .6 : 0;
  for (const k of Object.values(K)) { k.gorunur = false; k.isler = []; k.bakX = null; }
  kedi.g.visible = false; kedi.kucakta = null; gozler.visible = false;
  for (const k of Object.keys(tren.kapilar)) tren.kapilar[k].hedef = 0;
  etk.bilet.nesne.visible = !D.env.includes('bilet');
  for (const f of ['f1', 'f2', 'f3']) etk['foto_' + f].nesne.visible = !D.fotolar.includes(f);
  // kondüktör
  if ((n === 0 && B.kondukter_konustu) || (n > 0 && n < 4)) { K.kondukter.gorunur = true; K.kondukter.hemenDur(BUFE_K.x); K.kondukter.yerlestir(BUFE_K.x, BUFE_K.z); }
  // bölüm yolcusu
  const kid = BOLUM_KISI[n];
  if (kid) { const k = K[kid]; k.gorunur = true; k.hemenOtur(tren.oturak[KOLTUK[kid]]); }
  if (n === 3 && B.kedi_bulundu) { kedi.g.visible = true; kedi.kucakta = K.elif; }
  // oyuncu
  if (n === 0 && !B.bilet_alindi) oyuncu.hemenOtur(tren.oturak.w1_1_sag);
  else oyuncu.hemenDur(sinirla(D.oyuncuX ?? -2.8, SINIR.min, SINIR.max));
  kamX = oyuncu.x;
  envanterCiz(); ipucuGuncelle();
}

async function oyunuBaslat(kayit) {
  D = kayit || yeniDurum();
  ui.kutu.hidden = true; ilerle = null; yazici = null; secimSec = null; aniIlerle = null; biletKapa = null;
  for (const id of ['#ani', '#bilet', '#incele', '#tabela']) $(id).hidden = true;
  oyunda = true; kilit = 1; diyalogAcik = false; sonrakiler = []; bekleyenAnilar = []; zamanlayicilar.length = 0;
  aktifSahne = sahne; aktifKamera = kamera;
  $('#son').hidden = true; $('#son').classList.remove('kunyede');
  if (oyuncu.kasket) { oyuncu.bas.remove(oyuncu.kasket); oyuncu.kasket = null; }
  if (oyuncu.fener) { oyuncu.fener.parent.remove(oyuncu.fener); oyuncu.fener = null; oyuncu.fenerCam = null; }
  if (K.kondukter.fener) K.kondukter.fener.visible = true;
  if (K.kondukter.fenerCam) K.kondukter.fenerCam.material = new THREE.MeshBasicMaterial({ color: '#ffd27a' });
  sahneKur();
  $('#baslik').classList.add('git'); $('#ust').hidden = false;
  ses.baslat(); ses.muzik(false);
  await perde(0, 'siyah', 1.8);
  kilit = 0;
  const n = D.bolum, B = D.bayrak;
  if (n === 0 && !B.bilet_alindi) { kilit++; await bekle(.6); kilit--; konus('uyanis'); }
  else if (n === 0 && !B.kondukter_konustu) { kilit++; const r = await OLAY.kondukter_gelir(); kilit--; konus(r); }
  else if (n === 0) zamanla(3, () => durakGel(1));
  else if (n === 4) sonBolum();
  else if (B['b' + n]) zamanla(3, () => durakGel(n + 1));
}

// istasyona varış: hava değişir, eski yolcu iner, yenisi biner
async function durakGel(n) {
  if (D.bolum >= n) return;
  kilit++; ipucuGuncelle();
  await perde(1, 'siyah', 1.2);
  const tabela = tabelaGoster(BOLUMLER[n]);
  ses.zil();
  const eskiId = BOLUM_KISI[D.bolum], eski = eskiId ? K[eskiId] : null;
  D.bolum = n; D.oyuncuX = oyuncu.x;
  disari.havaAyarla(BOLUMLER[n].hava, true); ses.hava = BOLUMLER[n].hava;
  tren.damlaMat.opacity = BOLUMLER[n].hava === 'yagmur' ? .6 : 0;
  // fren: 9 birim/sn hızla gel, istasyon tabelası kameranın önünde dursun
  disari.hiz = hizHedef = 9; const yol = 34; fren = 9 * 9 / (2 * yol);
  const durX = sinirla(oyuncu.x, -5.5, 26.5);
  disari.istasyonGetir(BOLUMLER[n].durak, durX + yol + 4 + 9 * (1 / 60) / 2);
  await bekle(1.5);
  perde(0, 'siyah', 1.6);
  await tabela;
  while (disari.hiz > 0) await bekle(.1);
  ses.zil();
  await bekle(.8);
  if (eski) {
    kameraOdak = () => eski.x;
    await konus(eskiId + '_veda');
    kameraOdak = () => Math.max(eski.x, -5.5);
    await eski.git(-9.5);
    tren.kapilar.w1sol.hedef = 1; ses.kapi();
    await eski.git(-11.2); eski.gorunur = false; eski.hemenDur(-11.2); eski.gorunur = false;
    if (eskiId === 'elif') kedi.g.visible = false;
    tren.kapilar.w1sol.hedef = 0;
    await bekle(.6);
  }
  if (n === 4) { kameraOdak = null; kilit--; return sonBolum(); }
  const yeniId = BOLUM_KISI[n], yeni = K[yeniId];
  kameraOdak = () => Math.max(yeni.x, -5.5);
  yeni.gorunur = true; yeni.hemenDur(-11.2); yeni.hiz = yeniId === 'elif' ? 2.4 : yeniId === 'husnu' ? 1.8 : 3;
  tren.kapilar.w1sol.hedef = 1; ses.kapi();
  await yeni.git(-9.2);
  tren.kapilar.w1sol.hedef = 0;
  await yeni.otur(tren.oturak[KOLTUK[yeniId]]);
  kameraOdak = null;
  await bekle(.5);
  ses.zil();
  fren = 0; hizHedef = 14;
  kilit--;
  ipucuGuncelle(); kaydet();
}

// son bölüm: kondüktör karşına oturur
async function sonBolum() {
  kilit++;
  await perde(1, 'siyah', 1);
  D.bolum = 4;
  disari.havaAyarla('safak', true); ses.hava = 'safak'; tren.damlaMat.opacity = 0;
  disari.istasyonGetir('SON DURAK', -4 + 4); disari.hiz = hizHedef = 0; fren = 0;
  for (const k of Object.values(K)) k.gorunur = false;
  kedi.g.visible = false;
  const k = K.kondukter; k.gorunur = true; k.hemenOtur(tren.oturak.w1_1_sol); k.fenerSondur();
  oyuncu.hemenOtur(tren.oturak.w1_1_sag);
  kameraOdak = () => -4; kamX = -4;
  envanterCiz(); ipucuGuncelle();
  await perde(0, 'siyah', 2);
  kilit--;
  await konus('son_kondukter');
}

// ---------------------------------------------------------------- sonlar
async function sonaGit() {
  kilit++;
  const son = D.son;
  const sonlar = sonlarOku(); if (!sonlar.includes(son)) sonlar.push(son);
  try { localStorage.setItem(SON_KAYIT, JSON.stringify(sonlar)); } catch (e) { /* yok */ }
  kayitSil();
  $('#ust').hidden = true;
  let metin = [...SONLAR[son].metin];
  if (son === 'uyanis' && D.fotolar.length === 3) metin.splice(5, 0, 'Komodinin üstünde bir de fotoğraf var: bir sahilde dört kişi ve bir kedi. Hep birlikte.');
  if (son === 'kal') {
    const k = K.kondukter;
    oyuncu.isler = []; k.isler = [];
    await oyuncu.git(-2.6); oyuncu.bakX = -5;
    await k.git(-3.8); k.bakX = oyuncu.x;
    await bekle(.6);
    oyuncu.kasketTak(); k.fener.visible = false; oyuncu.fenerEkle(oyuncu.kSag); ses.esya();
    await bekle(1.2);
    k.bakX = null;
    kameraOdak = () => Math.max(k.x, -5.5);
    await k.git(-9.5); tren.kapilar.w1sol.hedef = 1; ses.kapi();
    await k.git(-11.2); k.gorunur = false; tren.kapilar.w1sol.hedef = 0;
    await perde(1, 'siyah', 1.6);
    disari.havaAyarla('kar', true); ses.hava = 'kar'; disari.istasyonKaldir();
    oyuncu.hemenDur(-6.5); kameraOdak = () => -6.5; hizHedef = 14; fren = 0; disari.hiz = 4;
    await perde(0, 'siyah', 2);
    await sonMetni(metin);
  } else {
    await perde(1, 'beyaz', 2.4);
    hastaneKur(son);
    aktifSahne = hastane.sahne; aktifKamera = hastane.kamera; boyutla();
    ses.hava = 'yok'; hizHedef = 0; disari.hiz = 0; ses.kalp();
    await perde(0, 'beyaz', 3);
    await sonMetni(metin);
  }
  kunye(son);
  kilit--;
}

function sonMetni(satirlar) {
  return new Promise(c => {
    const el = $('#son'); el.hidden = false; el.classList.remove('kunyede');
    el.querySelector('.kunye').hidden = true;
    const kap = el.querySelector('.satirlar'); kap.innerHTML = '';
    let i = 0, z;
    const sonraki = () => {
      clearTimeout(z);
      if (i >= satirlar.length) { el.onpointerdown = null; sonIlerle = null; c(); return; }
      kap.innerHTML = ''; const p = document.createElement('p'); p.textContent = satirlar[i++]; kap.appendChild(p);
      z = setTimeout(sonraki, (5500 + satirlar[i - 1].length * 25) / olcek);
    };
    el.onpointerdown = sonraki; sonIlerle = sonraki;
    sonraki();
  });
}
let sonIlerle = null;

function kunye(son) {
  const el = $('#son'); el.classList.add('kunyede');
  el.querySelector('.satirlar').innerHTML = '';
  const k = el.querySelector('.kunye'); k.hidden = false;
  k.querySelector('h2').textContent = SONLAR[son].ad;
  k.querySelector('.istat').textContent = `Hatıralar ${Object.keys(D.anilar).length}/3 · Fotoğraflar ${D.fotolar.length}/3`;
  const acilan = sonlarOku();
  k.querySelector('.sonlar').textContent = `Açılan sonlar ${acilan.length}/3: ` + ['uyanis', 'yarim', 'kal'].map(s => acilan.includes(s) ? SONLAR[s].ad : '???').join(' · ');
  ses.muzik(true);
}
$('#son').addEventListener('click', e => {
  const is = e.target.dataset?.is; if (!is) return;
  e.stopPropagation(); ses.muzik(false);
  if (is === 'yeniden') { kayitSil(); perde(1, 'siyah', .8).then(() => oyunuBaslat(null)); }
  else if (is === 'ana') anaMenu();
});

// hastane odası (uyanış sonları)
let hastane = null;
function hastaneKur(son) {
  const s = new THREE.Scene(); s.background = new THREE.Color('#f4e6d0');
  const t = new Toplayici();
  t.kutu(10, .1, 8, 0, -.05, 0, '#cfc6b8');            // zemin
  t.kutu(10, 4, .1, 0, 2, -2.5, '#efe6d6');              // arka duvar
  t.kutu(.1, 4, 8, -4, 2, 0, '#e6dccb');                  // sol duvar
  t.kutu(2.6, .1, 1.7, 1.6, 2.6, -2.44, '#d8cdb8');      // pencere çerçeveleri
  t.kutu(2.6, .1, .2, 1.6, .95, -2.4, '#d8cdb8');
  t.kutu(.1, 1.75, .2, .3, 1.78, -2.4, '#d8cdb8'); t.kutu(.1, 1.75, .2, 2.9, 1.78, -2.4, '#d8cdb8'); t.kutu(.06, 1.75, .12, 1.6, 1.78, -2.4, '#d8cdb8');
  // yatak
  t.kutu(2.3, .45, 1.1, -1, .45, -1, '#b9c2c8'); t.kutu(2.2, .2, 1.05, -1, .75, -1, '#f6f4ef');
  t.kutu(.1, .9, 1.15, -2.15, .7, -1, '#9aa4ac'); t.kutu(.1, .6, 1.15, .15, .55, -1, '#9aa4ac');
  t.kutu(.5, .14, .7, -1.8, .92, -1, '#ffffff');          // yastık
  t.kutu(1.5, .1, 1.08, -.5, .9, -1, '#a8c4d8');          // battaniye
  t.kure(.15, -1.75, 1.05, -1, '#e8bf98', 12); t.kure(.155, -1.82, 1.08, -1.02, '#3a2a20', 12, 1, .9, 1);
  // komodin ve eşyalar
  t.kutu(.6, .65, .5, .8, .33, -1.9, '#8a6a4a'); t.kutu(.62, .04, .52, .8, .67, -1.9, '#6e5238');
  t.silindir(.07, .07, .025, .65, .7, -1.85, '#c8ccd0', 16);  // saat
  t.kutu(.22, .01, .14, .95, .695, -1.95, '#f4efe2', 0, 0, .05); // mektup
  // monitör ve serum
  t.kutu(.5, .4, .3, -2.6, 1.6, -2.2, '#2a2e33'); t.silindir(.02, .02, 2, -2.9, 1, -1.6, '#9aa4ac', 6);
  t.kutu(.18, .28, .06, -2.9, 1.9, -1.6, '#dfeef5');
  // sandalye
  t.kutu(.6, .08, .55, -.9, .5, -2.05, '#7a5a3a'); t.kutu(.6, .7, .08, -.9, .85, -2.32, '#7a5a3a');
  for (const [x, z] of [[-1.15, -2.28], [-.65, -2.28], [-1.15, -1.82], [-.65, -1.82]]) t.kutu(.05, .5, .05, x, .25, z, '#5a3e28');
  s.add(t.mesh());
  // pencere: şafak
  const gok = yaziDokusu((c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#8fb0d8'); g.addColorStop(.55, '#ffc890'); g.addColorStop(1, '#ff9e6a'); c.fillStyle = g; c.fillRect(0, 0, w, h); c.fillStyle = '#fff4d0'; c.beginPath(); c.arc(w * .6, h * .78, 22, 0, 7); c.fill(); c.fillStyle = '#6a7a9a'; for (let i = 0; i < 9; i++) c.fillRect(i * 30, h * .82 - (i * 37 % 40), 26, 80); }, 256, 160);
  const pen = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.6), new THREE.MeshBasicMaterial({ map: gok })); pen.position.set(1.6, 1.78, -2.46); s.add(pen);
  // Elif'in resmi
  const res = yaziDokusu((c, w, h) => { c.fillStyle = '#fbf7ee'; c.fillRect(0, 0, w, h); c.font = '900 40px "Big Shoulders", sans-serif'; c.fillStyle = '#d0402a'; c.textAlign = 'center'; c.fillText('UYAN', w / 2, 46); c.strokeStyle = '#3a6ad0'; c.lineWidth = 4; c.strokeRect(40, 80, 90, 34); c.fillStyle = '#7e848c'; c.beginPath(); c.ellipse(190, 100, 20, 12, 0, 0, 7); c.fill(); for (const x of [150, 175, 210]) { c.strokeStyle = '#2a2a2a'; c.beginPath(); c.arc(x, 70, 7, 0, 7); c.moveTo(x, 77); c.lineTo(x, 95); c.stroke(); } }, 256, 128);
  const resim = new THREE.Mesh(new THREE.PlaneGeometry(.6, .3), new THREE.MeshBasicMaterial({ map: res })); resim.position.set(-.3, 1.5, -2.44); resim.rotation.z = .04; s.add(resim);
  // monitör çizgisi
  const ekran = new THREE.Mesh(new THREE.PlaneGeometry(.42, .3), new THREE.MeshBasicMaterial({ color: '#0d2a1a' })); ekran.position.set(-2.6, 1.6, -2.04); s.add(ekran);
  const nabiz = new THREE.Mesh(new THREE.PlaneGeometry(.06, .06), new THREE.MeshBasicMaterial({ color: '#5aff8a' })); nabiz.position.set(-2.6, 1.6, -2.03); s.add(nabiz);
  // ışık
  s.add(new THREE.HemisphereLight('#fff1dc', '#b8a890', son === 'uyanis' ? 1.3 : .8));
  const gun = new THREE.DirectionalLight('#ffc890', son === 'uyanis' ? 2.2 : .9); gun.position.set(3, 3, -4); s.add(gun);
  // anne
  const anne = new Kisi('anne', s); anne.hemenOtur({ x: -.9, z: -2.0, yon: 1 }); anne.yerlestir(-.9, -2.0);
  anne.hedefAci = anne.aci = 0; anne.g.rotation.y = 0; anne.kSol.rotation.x = -1.1;
  const kam = new THREE.PerspectiveCamera(45, 1, .1, 50);
  hastane = { sahne: s, kamera: kam, anne, nabiz, t: 0 };
}

// ---------------------------------------------------------------- kamera ve döngü
let kamX = -2.8, kamZ = 8.6, bakY = 1.3;
function kameraGuncelle(dt) {
  let hedef = oyuncu.x, uzak = 8.6;
  if (kameraOdak) hedef = kameraOdak();
  else if (diyalogAcik && kameraKisi && kameraKisi.gorunur) { hedef = (oyuncu.x + kameraKisi.x) / 2; uzak = 7.2; }
  else if (diyalogAcik) uzak = 7.6;
  hedef = sinirla(hedef, -5.5, 26.5);
  kamX += (hedef - kamX) * Math.min(1, dt * 2.4);
  kamZ += (uzak - kamZ) * Math.min(1, dt * 1.5);
  bakY += ((diyalogAcik && !ui.kutu.hidden ? .72 : 1.3) - bakY) * Math.min(1, dt * 2);
  const v = disari.hiz / 14;
  kamera.position.set(kamX + Math.sin(zaman * .7) * .03, 2.35 + Math.sin(zaman * 8.3) * .006 * v, kamZ);
  kamera.lookAt(kamX, bakY, -.3);
}

function kapilarGuncelle(dt) {
  for (const [ad, kp] of Object.entries(tren.kapilar)) {
    if (ad === 'w1sag' || ad === 'w2sol') {
      let yakin = false;
      for (const k of [oyuncu, ...Object.values(K)]) if (k.gorunur && Math.abs(k.x - kp.x) < 1.4 && k.z > .3) yakin = true;
      if (yakin && kp.hedef === 0 && oyunda) ses.kapi();
      kp.hedef = yakin ? 1 : 0;
    }
    kp.acik += (kp.hedef - kp.acik) * Math.min(1, dt * 6);
    kp.g.position.z = KORIDOR_Z - kp.acik * .86;
  }
}

let miyavZaman = 3, son = performance.now(), fpsOlc = 0, fpsSay = 0, fpsT = 0;
let manuel = false, sanalSimdi = 0;
function dongu(simdi) {
  requestAnimationFrame(dongu);
  const gercek = Math.min(.05, (simdi - son) / 1000);
  fpsSay++; fpsT += (simdi - son) / 1000; if (fpsT > 1) { fpsOlc = Math.round(fpsSay / fpsT); fpsSay = 0; fpsT = 0; }
  son = simdi;
  if (!manuel) kare(gercek, simdi);
}
function kare(gercek, simdi) {
  const dt = duraklat ? 0 : gercek * olcek;
  zaman += dt;
  if (yazici) yazici(gercek * olcek);
  if (perdeOp !== perdeHedef) {
    perdeOp = perdeHedef > perdeOp ? Math.min(perdeHedef, perdeOp + gercek * olcek * perdeHiz) : Math.max(perdeHedef, perdeOp - gercek * olcek * perdeHiz);
    ui.perde.style.opacity = perdeOp * perdeOp * (3 - 2 * perdeOp);
  }
  // zamanlayıcılar
  for (let i = zamanlayicilar.length - 1; i >= 0; i--) { const z = zamanlayicilar[i]; z.s -= dt; if (z.s <= 0) { zamanlayicilar.splice(i, 1); z.f(); } }
  // tren hızı
  if (fren > 0) { disari.hiz = Math.max(0, disari.hiz - fren * dt); }
  else disari.hiz += (hizHedef - disari.hiz) * Math.min(1, dt * .35);
  if (aktifSahne === sahne) {
    disari.guncelle(dt, kamX, zaman);
    for (const tk of tren.anim.tekerler) tk.rotation.z -= disari.hiz * dt / .36;
    oyuncu.guncelle(dt, zaman);
    for (const k of Object.values(K)) if (k.gorunur) k.guncelle(dt, zaman);
    if (kedi.g.visible) kedi.guncelle(dt, zaman);
    kapilarGuncelle(dt);
    tren.damlaMat.map.offset.y += dt * .05;
    // lambaların hafif titremesi
    for (let i = 0; i < tren.isiklar.length; i++) tren.isiklar[i].intensity = 9 + Math.sin(zaman * 13 + i * 2) * .25 * (disari.hiz / 14);
    // ipucu ve işaret
    if (oyunda && Math.floor(zaman * 3) !== Math.floor((zaman - dt) * 3)) { const m = ipucuMetni(); const g = kilit > 0 && !diyalogAcik ? '' : m; if (ui.ipucu.textContent !== g) ui.ipucu.textContent = g; }
    const h = oyunda ? isaretHedef() : null;
    isaret.visible = !!h && !diyalogAcik;
    if (h) { isaret.position.copy(h).add(new THREE.Vector3(0, Math.sin(zaman * 3) * .06, 0)); isaret.rotation.y += dt * 2; }
    // dokunma halkası
    if (halkaT < 1) { halkaT += dt * 2.5; halka.material.opacity = (1 - halkaT) * .8; halka.scale.setScalar(1 + halkaT * 1.5); }
    // kedi araması: miyav sesi ve yazısı
    if (oyunda && D && D.bolum === 3 && D.bayrak.gorev_kedi && !D.bayrak.kedi_bulundu && kilit === 0) {
      miyavZaman -= dt;
      if (miyavZaman < 0) {
        miyavZaman = 3.5 + Math.random() * 2.5;
        const uz = Math.abs(KEDI_X - oyuncu.x);
        ses.miyav((KEDI_X - kamX) / 7, sinirla(1.2 - uz / 25, .3, 1));
        miyav.material.opacity = sinirla(1.3 - uz / 14, .25, 1); miyav.userData.t = 0;
      }
      gozler.visible = Math.abs(KEDI_X - oyuncu.x) < 4.5 && Math.sin(zaman * 1.3) > -.2;
    } else gozler.visible = false;
    if (miyav.material.opacity > 0) { miyav.userData.t = (miyav.userData.t || 0) + dt; miyav.position.y = .85 + miyav.userData.t * .25; miyav.material.opacity = Math.max(0, miyav.material.opacity - dt * .45); }
    kameraGuncelle(gercek);
    if (!oyunda) { kamX = -2 + Math.sin(simdi / 9000) * 4; kamera.position.set(kamX, 2.4, 9.4); kamera.lookAt(kamX, 1.3, -.3); }
  } else if (hastane) {
    hastane.t += dt;
    hastane.anne.guncelle(dt, zaman);
    const k = Math.min(1, hastane.t / 40);
    hastane.kamera.position.set(1.5 - k * .5, 1.8 - k * .2, 2.6 - k * .9);
    hastane.kamera.lookAt(-.9, .95, -1.3);
    const f = (hastane.t * 1.2) % 1; hastane.nabiz.position.x = -2.78 + f * .36; hastane.nabiz.position.y = 1.6 + (f > .45 && f < .55 ? .08 : 0);
  }
  ses.guncelle(dt, aktifSahne === sahne ? disari.hiz : 0, zaman);
  renderer.render(aktifSahne, aktifKamera);
}

// ---------------------------------------------------------------- menüler
function anaMenu() {
  oyunda = false; kilit = 0; diyalogAcik = false; zamanlayicilar.length = 0; duraklat = false;
  $('#menu').hidden = true; $('#son').hidden = true; $('#ust').hidden = true; ui.kutu.hidden = true;
  for (const id of ['#ani', '#bilet', '#incele', '#tabela']) $(id).hidden = true;
  aktifSahne = sahne; aktifKamera = kamera;
  D = yeniDurum(); sahneKur(); D = null;
  for (const k of Object.values(K)) k.gorunur = false;
  oyuncu.hemenOtur(tren.oturak.w1_1_sag);
  baslikHazirla();
  $('#baslik').classList.remove('git');
  perde(0, 'siyah', 1);
  ses.muzik(true);
}
function baslikHazirla() {
  const k = kayitOku();
  $('#devamBtn').hidden = !k;
  $('#basBtn').textContent = k ? 'Yeni yolculuk' : 'Yolculuğa başla';
  $('#basBtn').classList.toggle('ikincil', !!k);
}
function sesYaz() { const t = 'Ses: ' + (ses.acik ? 'açık' : 'kapalı'); $('#sesBtn').textContent = t; $('#menu [data-is=ses]').textContent = t; }
function sesDegis() { ses.sesAc(!ses.acik); try { localStorage.setItem('son-tren.ses', ses.acik ? '1' : '0'); } catch (e) { /* yok */ } sesYaz(); }

$('#basBtn').addEventListener('click', async () => { ses.baslat(); ses.muzik(false); kayitSil(); await perde(1, 'siyah', .9); oyunuBaslat(null); tamEkran(); });
$('#devamBtn').addEventListener('click', async () => { ses.baslat(); ses.muzik(false); const k = kayitOku(); await perde(1, 'siyah', .9); oyunuBaslat(k); tamEkran(); });
$('#sesBtn').addEventListener('click', () => { ses.baslat(); sesDegis(); });
$('#menuBtn').addEventListener('click', e => { e.stopPropagation(); $('#menu').hidden = false; duraklat = true; ses.blip(); });
$('#menu').addEventListener('click', e => {
  const is = e.target.dataset?.is;
  if (is === 'devam' || e.target.id === 'menu') { $('#menu').hidden = true; duraklat = false; }
  else if (is === 'ses') sesDegis();
  else if (is === 'ana') { kaydet(); anaMenu(); }
});
function tamEkran() {
  const d = document.documentElement;
  if (matchMedia('(pointer: coarse)').matches && d.requestFullscreen && !document.fullscreenElement) d.requestFullscreen().then(() => screen.orientation?.lock?.('landscape').catch(() => { })).catch(() => { });
}
document.addEventListener('visibilitychange', () => { if (document.hidden) kaydet(); });
addEventListener('keydown', e => {
  if (e.key === ' ' || e.key === 'Enter') { if (aniIlerle) aniIlerle(); else if (biletKapa) biletKapa(); else if (ilerle) ilerle(); }
  if (e.key >= '1' && e.key <= '3' && secimSec) secimSec(+e.key - 1);
  if (e.key === 'Escape' && oyunda) { const m = $('#menu'); m.hidden = !m.hidden; duraklat = !m.hidden; }
});

// ---------------------------------------------------------------- başlat
try { if (localStorage.getItem('son-tren.ses') === '0') ses.acik = false; } catch (e) { /* yok */ }
sesYaz();
addEventListener('resize', boyutla); boyutla();
D = yeniDurum(); sahneKur(); D = null;
for (const k of Object.values(K)) k.gorunur = false;
baslikHazirla();
requestAnimationFrame(dongu);
Promise.all([document.fonts?.load('700 64px "Big Shoulders"'), document.fonts?.load('italic 600 52px Literata')]).then(() => {
  const c = miyavDoku.image.getContext('2d'); c.clearRect(0, 0, 256, 96);
  c.font = 'italic 600 52px Literata, Georgia, serif'; c.fillStyle = '#ffe9b8'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.shadowColor = '#000'; c.shadowBlur = 8; c.fillText('miyav~', 128, 48);
  miyavDoku.needsUpdate = true;
}).catch(() => { });
perde(0, 'siyah', 2);
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => { });

// test ve tanıtım kancası
window.SonTren = {
  get durum() { return D; }, get kilit() { return kilit; }, get diyalog() { return diyalogAcik; },
  get oyuncuX() { return oyuncu.x; }, get hiz() { return disari.hiz; },
  set olcek(v) { olcek = v; }, get olcek() { return olcek; },
  ilerle: () => { if (aniIlerle) aniIlerle(); else if (biletKapa) biletKapa(); else if (sonIlerle) sonIlerle(); else if (ilerle) ilerle(); },
  sec: i => secimSec && secimSec(i),
  get secimVar() { return !!secimSec && ui.secim.children.length > 0; },
  etkiles: id => yuruVe(etk[id].durX, () => etkiles(id)),
  kisi: id => { const k = id === 'duman' ? kedi : K[id]; return yuruVe(kisiDurX(k), () => kisiyleKonus(id)); },
  yuru: x => yuruVe(x),
  isinla: x => { oyuncu.hemenDur(sinirla(x, SINIR.min, SINIR.max)); kamX = oyuncu.x; },
  get fps() { return fpsOlc; },
  get zaman() { return zaman; }, get zamanlayici() { return zamanlayicilar.map(z => z.s.toFixed(2)); },
  incelemeKapat: () => { const el = $('#incele'); if (!el.hidden) el.querySelector('button').click(); },
  kamera, disari, K, oyuncu,
  // tanıtım videosu için
  manuel: v => { manuel = v; }, perde: (a, s) => perde(a, 'siyah', s),
  adim: dt => { sanalSimdi += dt * 1000; kare(dt, sanalSimdi); },
  yukle: k => oyunuBaslat(k), durakGel: n => durakGel(n), aniGoster: id => aniGoster(ANILAR[id]),
  ekranXY(hedef) {
    let p;
    if (hedef === 'oyuncu') p = new THREE.Vector3(oyuncu.x, 1.1, oyuncu.z);
    else if (K[hedef]) p = new THREE.Vector3(K[hedef].x, (K[hedef].mod === 'otur' ? .9 : 1.2) * K[hedef].s, K[hedef].z);
    else if (etk[hedef]) p = etk[hedef].nesne.getWorldPosition(new THREE.Vector3());
    else p = new THREE.Vector3(hedef, .3, KORIDOR_Z);
    p.project(kamera);
    return { x: (p.x + 1) / 2, y: (1 - p.y) / 2 };
  },
};
