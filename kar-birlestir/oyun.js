/*! Kar Birleştir — 2048 tarzı kış bulmacası. MIT © Winterdeveloper */
(function () {
  "use strict";

  // Her aşamanın adı, simgesi ve rengi. 2048 = Ayaz Ata.
  const ASAMALAR = {
    2:    { ad: "Kar tanesi", simge: "❄️", zemin: "#cfeeff", yazi: "#06121f" },
    4:    { ad: "Kartopu",    simge: "⚪", zemin: "#a9e1fb", yazi: "#06121f" },
    8:    { ad: "Buz",        simge: "🧊", zemin: "#6cc0ea", yazi: "#06121f" },
    16:   { ad: "Sarkıt",     simge: "🔹", zemin: "#4fa3d8", yazi: "#fff" },
    32:   { ad: "Kardan adam", simge: "⛄", zemin: "#2f7ab3", yazi: "#fff" },
    64:   { ad: "Kızak",      simge: "🛷", zemin: "#2d5f99", yazi: "#fff" },
    128:  { ad: "Fener",      simge: "🏮", zemin: "#f0a03c", yazi: "#1a0d00" },
    256:  { ad: "Ocak",       simge: "🔥", zemin: "#e8742c", yazi: "#fff" },
    512:  { ad: "Kutup ayısı", simge: "🐻‍❄️", zemin: "#9b8cff", yazi: "#fff" },
    1024: { ad: "Kuzey ışığı", simge: "🌌", zemin: "#5b4bd6", yazi: "#fff" },
    2048: { ad: "Ayaz Ata",   simge: "🧙", zemin: "linear-gradient(135deg,#fff3c4,#ffd166)", yazi: "#3a2400" },
    4096: { ad: "Nardugan",   simge: "🌅", zemin: "linear-gradient(135deg,#ffb347,#ff6b81)", yazi: "#fff" },
  };
  const BOYUT = 4;

  const $ = id => document.getElementById(id);
  let tahta, puan, rekor, onceki, kazandi, devamEdiyor, idSayac = 0, kilit = false;

  function oku(a, v) { try { const x = localStorage.getItem("karbirlestir-" + a); return x === null ? v : JSON.parse(x); } catch { return v; } }
  function yaz(a, v) { try { localStorage.setItem("karbirlestir-" + a, JSON.stringify(v)); } catch { /* gizli sekme */ } }

  // tahta[s][i] = { id, deger } ya da null
  function bosTahta() { return Array.from({ length: BOYUT }, () => Array(BOYUT).fill(null)); }
  function kopya(t) { return t.map(s => s.map(k => k && { id: k.id, deger: k.deger })); }

  function rastgeleEkle() {
    const bos = [];
    tahta.forEach((s, y) => s.forEach((k, x) => { if (!k) bos.push([y, x]); }));
    if (!bos.length) return;
    const [y, x] = bos[Math.floor(Math.random() * bos.length)];
    tahta[y][x] = { id: ++idSayac, deger: Math.random() < 0.9 ? 2 : 4, yeni: true };
  }

  function yeniOyun() {
    tahta = bosTahta(); puan = 0; onceki = null; kazandi = false; devamEdiyor = false;
    rastgeleEkle(); rastgeleEkle();
    kaydet(); ciz(); perdeKapat();
  }

  /** Bir yöne kaydırır. dy, dx: -1/0/1. Bir şey kıpırdadıysa true. */
  function kaydir(dy, dx) {
    const yeni = bosTahta();
    let oynadi = false, kazanilan = 0;
    const sira = [0, 1, 2, 3];
    const ileri = dy === 1 || dx === 1 ? sira.slice().reverse() : sira;

    for (let hat = 0; hat < BOYUT; hat++) {
      // hattaki karoları kayma yönünde sırala
      const karolar = [];
      for (const a of ileri) {
        const y = dx !== 0 ? hat : a, x = dx !== 0 ? a : hat;
        if (tahta[y][x]) karolar.push({ ...tahta[y][x], eskiY: y, eskiX: x });
      }
      const sonuc = [];
      for (let i = 0; i < karolar.length; i++) {
        const k = karolar[i], sonraki = karolar[i + 1];
        if (sonraki && sonraki.deger === k.deger) {
          const deger = k.deger * 2;
          sonuc.push({ id: ++idSayac, deger, birlesti: true, kaynaklar: [k, sonraki] });
          kazanilan += deger;
          i++;
        } else sonuc.push({ id: k.id, deger: k.deger, kaynaklar: [k] });
      }
      sonuc.forEach((k, i) => {
        const a = ileri[i];
        const y = dx !== 0 ? hat : a, x = dx !== 0 ? a : hat;
        yeni[y][x] = k;
        if (k.birlesti || k.kaynaklar[0].eskiY !== y || k.kaynaklar[0].eskiX !== x) oynadi = true;
      });
    }
    if (!oynadi) return false;

    onceki = { tahta: kopya(tahta), puan };
    tahta = yeni;
    puan += kazanilan;
    if (puan > rekor) { rekor = puan; yaz("rekor", rekor); }
    return true;
  }

  function hamle(dy, dx) {
    if (kilit || !$("perde").hidden) return;
    const eski = kopya(tahta);
    if (!kaydir(dy, dx)) return;
    kilit = true;
    // önce karolar yeni yerlerine kaysın, sonra birleşenler ve yeni karo belirsin
    canlandir(eski);
    setTimeout(() => {
      tahta.forEach(s => s.forEach(k => { if (k) delete k.kaynaklar; }));
      rastgeleEkle();
      ciz();
      kaydet();
      kilit = false;
      durumKontrol();
    }, 130);
  }

  function hamleVarMi() {
    for (let y = 0; y < BOYUT; y++) for (let x = 0; x < BOYUT; x++) {
      const k = tahta[y][x];
      if (!k) return true;
      if (x < BOYUT - 1 && tahta[y][x + 1] && tahta[y][x + 1].deger === k.deger) return true;
      if (y < BOYUT - 1 && tahta[y + 1][x] && tahta[y + 1][x].deger === k.deger) return true;
    }
    return false;
  }

  function enBuyuk() { return Math.max(...tahta.flat().filter(Boolean).map(k => k.deger)); }

  function durumKontrol() {
    if (!kazandi && !devamEdiyor && enBuyuk() >= 2048) {
      kazandi = true;
      perdeAc("🧙 Ayaz Ata geldi!", `${puan.toLocaleString("tr-TR")} puanla en uzun geceyi aydınlattın.`, [["Devam et", () => { devamEdiyor = true; perdeKapat(); }], ["Yeni oyun", yeniOyun]]);
    } else if (!hamleVarMi()) {
      const a = ASAMALAR[enBuyuk()] || ASAMALAR[2];
      perdeAc("Tahta doldu", `En büyük: ${a.simge} ${a.ad} · ${puan.toLocaleString("tr-TR")} puan`, [["Yeniden dene", yeniOyun], ["Son hamleyi geri al", geriAl]]);
    }
  }

  function geriAl() {
    if (!onceki || kilit) return;
    tahta = onceki.tahta; puan = onceki.puan; onceki = null;
    perdeKapat(); ciz(); kaydet();
  }

  // ---------- çizim ----------
  function konum(y, x) { return `translate(${x * 113.2}%, ${y * 113.2}%)`; }   // %22.75 karo + %3 boşluk (karonun %113.2'si)

  function karoOlustur(k, y, x, sinif) {
    const a = ASAMALAR[k.deger] || { ad: String(k.deger), simge: "✨", zemin: "#fff", yazi: "#000" };
    const d = document.createElement("div");
    d.className = "karo" + (sinif ? " " + sinif : "");
    d.dataset.id = k.id;
    d.style.transform = konum(y, x);
    d.style.background = a.zemin;
    d.style.color = a.yazi;
    d.title = a.ad;
    d.innerHTML = `<span class="simge">${a.simge}</span><span class="sayi">${k.deger}</span>`;
    return d;
  }

  function canlandir(eski) {
    // eski karoları yeni konumlarına kaydır (birleşenlerin ikisi de aynı yere gider)
    const kutu = $("karolar");
    const dom = new Map([...kutu.children].map(d => [+d.dataset.id, d]));
    tahta.forEach((s, y) => s.forEach((k, x) => {
      if (!k) return;
      for (const kaynak of k.kaynaklar || []) {
        const d = dom.get(kaynak.id);
        if (d) d.style.transform = konum(y, x);
      }
    }));
  }

  function ciz() {
    const kutu = $("karolar");
    kutu.innerHTML = "";
    tahta.forEach((s, y) => s.forEach((k, x) => {
      if (!k) return;
      kutu.appendChild(karoOlustur(k, y, x, k.yeni ? "yeni" : k.birlesti ? "birlesti" : ""));
      delete k.yeni; delete k.birlesti;
    }));
    $("puan").textContent = puan.toLocaleString("tr-TR");
    $("rekor").textContent = rekor.toLocaleString("tr-TR");
    $("geri").disabled = !onceki;

    const ulasilan = enBuyuk();
    $("liste").innerHTML = Object.entries(ASAMALAR).filter(([d]) => +d <= 2048).map(([d, a]) =>
      `<span class="${+d <= ulasilan ? "acik" : "kapali"}" title="${d}">${+d <= ulasilan ? a.simge + " " + a.ad : "?"}</span>`).join("");
  }

  function perdeAc(baslik, metin, dugmeler) {
    const p = $("perde");
    p.innerHTML = `<h2>${baslik}</h2><p>${metin}</p>`;
    const satir = document.createElement("div");
    satir.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:6px";
    dugmeler.forEach(([ad, f], i) => {
      const b = document.createElement("button");
      b.textContent = ad; if (i === 0) b.className = "ana";
      b.onclick = f; satir.appendChild(b);
    });
    p.appendChild(satir);
    p.hidden = false;
  }
  function perdeKapat() { $("perde").hidden = true; }

  function kaydet() { yaz("oyun", { tahta, puan, kazandi, devamEdiyor, idSayac }); }

  // ---------- girdi ----------
  addEventListener("keydown", e => {
    const yon = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1], w: [-1, 0], s: [1, 0], a: [0, -1], d: [0, 1] }[e.key];
    if (yon) { e.preventDefault(); hamle(...yon); }
    else if ((e.ctrlKey || e.metaKey) && e.key === "z") geriAl();
  });

  let basX = null, basY = null;
  const t = $("tahta");
  t.addEventListener("pointerdown", e => { basX = e.clientX; basY = e.clientY; });
  t.addEventListener("pointerup", e => {
    if (basX === null) return;
    const dx = e.clientX - basX, dy = e.clientY - basY;
    basX = basY = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    if (Math.abs(dx) > Math.abs(dy)) hamle(0, dx > 0 ? 1 : -1); else hamle(dy > 0 ? 1 : -1, 0);
  });
  t.addEventListener("pointercancel", () => { basX = basY = null; });

  $("yeni").onclick = () => { if (puan === 0 || confirm("Yeni oyun başlasın mı? Bu oyun silinecek.")) yeniOyun(); };
  $("geri").onclick = geriAl;

  // ---------- başlangıç ----------
  rekor = oku("rekor", 0);
  const kayit = oku("oyun", null);
  if (kayit && kayit.tahta) {
    tahta = kayit.tahta; puan = kayit.puan; kazandi = kayit.kazandi; devamEdiyor = kayit.devamEdiyor; idSayac = kayit.idSayac || 100; onceki = null;
    ciz();
    if (!hamleVarMi()) durumKontrol();
  } else yeniOyun();

  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => {});

  // Testler için
  window.KarBirlestir = {
    tahta: () => tahta.map(s => s.map(k => (k ? k.deger : 0))),
    kur(dizi) { tahta = dizi.map(s => s.map(d => (d ? { id: ++idSayac, deger: d } : null))); onceki = null; perdeKapat(); ciz(); },
    kaydir: (dy, dx) => kaydir(dy, dx),
    hamle: (dy, dx) => hamle(dy, dx),
    durum: () => ({ puan, rekor, kazandi, perde: !$("perde").hidden, perdeYazi: $("perde").textContent }),
    durumKontrol,
  };
})();
