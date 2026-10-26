/* Duyuru paneli: duyurular.json'u GitHub API ile okur ve yazar.
   İki site de bu dosyayı /duyuru.js aracılığıyla gösterir. */
"use strict";

const SAHIP = "Enskygr234";
const REPO = "Enskygr234.github.io";
const DAL = "main";
const DOSYA = "duyurular.json";
const API = `https://api.github.com/repos/${SAHIP}/${REPO}`;
const ANAHTAR = "wd-admin-token";

const SITELER = { winterdeveloper: "Winterdeveloper", ensdeveloper: "ENS Developer" };
const BICIMLER = { kart: "Kart", bant: "Üst bant", popup: "Pop-up" };
const IPUCU = {
  kart: "Sitedeki “Duyurular” bölümünde kart olarak listelenir.",
  bant: "Sayfanın en üstünde şerit olarak çıkar; ziyaretçi kapatınca bir daha görmez.",
  popup: "Sayfa açılınca pencere olarak bir kez çıkar. Aynı anda yalnızca en yenisi gösterilir."
};

const $ = s => document.querySelector(s);
let token = "";
let veri = { guncelleme: null, duyurular: [] };
let sha = null;
let duzenlenen = null;
let filtre = "hepsi";
let mesgul = false;

/* ---------- GitHub ---------- */
async function api(yol, ayar = {}) {
  const r = await fetch(API + yol, {
    ...ayar,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: "Bearer " + token,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(ayar.body ? { "Content-Type": "application/json" } : {})
    }
  });
  const govde = r.status === 204 ? null : await r.json().catch(() => null);
  if (!r.ok) {
    const e = new Error((govde && govde.message) || "HTTP " + r.status);
    e.status = r.status;
    throw e;
  }
  return govde;
}

function b64Coz(s) {
  const ikili = atob(s.replace(/\s/g, ""));
  return new TextDecoder().decode(Uint8Array.from(ikili, c => c.charCodeAt(0)));
}
function b64Yaz(s) {
  const baytlar = new TextEncoder().encode(s);
  let ikili = "";
  for (let i = 0; i < baytlar.length; i += 0x8000) ikili += String.fromCharCode(...baytlar.subarray(i, i + 0x8000));
  return btoa(ikili);
}

async function oku() {
  try {
    const d = await api(`/contents/${DOSYA}?ref=${DAL}&t=${Date.now()}`);
    sha = d.sha;
    veri = JSON.parse(b64Coz(d.content));
    if (!Array.isArray(veri.duyurular)) veri.duyurular = [];
  } catch (e) {
    if (e.status !== 404) throw e;
    sha = null;
    veri = { guncelleme: null, duyurular: [] };
  }
}

async function yaz(yeniListe, mesaj) {
  const yeni = { guncelleme: new Date().toISOString(), duyurular: yeniListe };
  try {
    const d = await api(`/contents/${DOSYA}`, {
      method: "PUT",
      body: JSON.stringify({ message: mesaj, content: b64Yaz(JSON.stringify(yeni, null, 2) + "\n"), branch: DAL, ...(sha ? { sha } : {}) })
    });
    sha = d.content.sha;
    veri = yeni;
  } catch (e) {
    // Başka bir yerden (ya da başka sekmeden) değiştirilmiş: güncelini çek
    if (e.status === 409 || e.status === 422) {
      await oku();
      ciz();
      throw new Error("Dosya bu arada başka yerden değişmiş. Liste yenilendi, lütfen tekrar dene.");
    }
    throw e;
  }
}

/* ---------- giriş ---------- */
function kayitliToken() {
  try { return localStorage.getItem(ANAHTAR) || sessionStorage.getItem(ANAHTAR) || ""; } catch (e) { return ""; }
}
function tokenSakla(t, kalici) {
  try {
    localStorage.removeItem(ANAHTAR);
    sessionStorage.removeItem(ANAHTAR);
    if (t) (kalici ? localStorage : sessionStorage).setItem(ANAHTAR, t);
  } catch (e) {}
}

async function girisYap(t, kalici) {
  token = t.trim();
  const repo = await api("");
  if (!repo.permissions || !repo.permissions.push) throw new Error("Bu token'ın repoya yazma izni yok (Contents: Read and write gerekli).");
  await oku();
  tokenSakla(token, kalici);
  $("#giris").hidden = true;
  $("#panel").hidden = false;
  formuSifirla();
  ciz();
  durum("Bağlandı", "iyi");
}

function cikisYap() {
  token = "";
  tokenSakla("");
  $("#panel").hidden = true;
  $("#giris").hidden = false;
  $("#token").value = "";
}

$("#girisForm").addEventListener("submit", async e => {
  e.preventDefault();
  const d = $("#girisDugme");
  d.disabled = true; d.textContent = "Kontrol ediliyor…";
  $("#girisHata").textContent = "";
  try {
    await girisYap($("#token").value, $("#hatirla").checked);
  } catch (err) {
    token = "";
    $("#girisHata").textContent = err.status === 401 ? "Token geçersiz ya da süresi dolmuş." : err.status === 404 ? "Token bu repoyu göremiyor. Repository access ayarını kontrol et." : err.message;
  } finally {
    d.disabled = false; d.textContent = "Giriş yap";
  }
});
$("#cikis").addEventListener("click", cikisYap);
$("#yenile").addEventListener("click", async () => {
  try { durum("Yenileniyor…"); await oku(); ciz(); durum("Güncel", "iyi"); } catch (e) { durum(e.message, "kotu"); }
});

/* ---------- durum ---------- */
let durumZaman;
function durum(metin, tur = "") {
  const d = $("#durum");
  d.textContent = metin;
  d.className = "durum " + tur;
  clearTimeout(durumZaman);
  if (tur === "iyi") durumZaman = setTimeout(() => { d.textContent = ""; }, 6000);
}

/* ---------- liste ---------- */
function tarihYaz(t) {
  if (!t) return "";
  const g = new Date(t.length === 10 ? t + "T12:00:00" : t);
  return g.toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
}
function hal(d) {
  const simdi = new Date();
  if (d.aktif === false) return ["Taslak", "pasif"];
  if (d.bitis && new Date(d.bitis + "T23:59:59") < simdi) return ["Süresi doldu", "pasif"];
  if (d.baslangic && new Date(d.baslangic + "T00:00:00") > simdi) return ["Planlandı · " + tarihYaz(d.baslangic), "plan"];
  return ["Yayında", "canli"];
}
function el(etiket, sinif, metin) {
  const e = document.createElement(etiket);
  if (sinif) e.className = sinif;
  if (metin != null) e.textContent = metin;
  return e;
}

function ciz() {
  const ul = $("#liste");
  ul.textContent = "";
  const liste = veri.duyurular
    .filter(d => filtre === "hepsi" || (d.siteler || []).includes(filtre))
    .sort((a, b) => (b.sabit ? 1 : 0) - (a.sabit ? 1 : 0) || String(b.tarih).localeCompare(String(a.tarih)));
  $("#bos").hidden = liste.length > 0;
  if (!liste.length) $("#bos").textContent = veri.duyurular.length ? "Bu sitede duyuru yok." : "Henüz duyuru yok. “Yeni duyuru” ile ilkini ekle.";

  for (const d of liste) {
    const li = el("li", "oge" + (duzenlenen === d.id ? " secili" : ""));
    const [halMetni, halSinif] = hal(d);
    const ust = el("div", "oge-ust");
    ust.append(el("span", "rozet " + halSinif, halMetni), el("span", "rozet", BICIMLER[d.bicim] || "Kart"));
    if (d.sabit) ust.append(el("span", "rozet sabit", "Sabit"));
    ust.append(el("time", "oge-tarih", tarihYaz(d.tarih)));
    li.append(ust);
    li.append(el("h3", null, d.baslik || "(başlıksız)"));
    if (d.metin) li.append(el("p", "oge-metin", d.metin));
    li.append(el("p", "oge-site", (d.siteler || []).map(s => SITELER[s] || s).join(" · ")));

    const alt = el("div", "oge-alt");
    const duzenle = el("button", "dugme kucuk", "Düzenle");
    duzenle.type = "button";
    duzenle.addEventListener("click", () => formuDoldur(d));
    const ac = el("button", "dugme kucuk", d.aktif === false ? "Yayınla" : "Yayından kaldır");
    ac.type = "button";
    ac.addEventListener("click", () => islem(
      veri.duyurular.map(x => x.id === d.id ? { ...x, aktif: x.aktif === false } : x),
      `Duyuru ${d.aktif === false ? "yayınlandı" : "kaldırıldı"}: ${d.baslik || d.id}`,
      d.aktif === false ? "Yayınlandı" : "Yayından kaldırıldı"
    ));
    const sil = el("button", "dugme kucuk tehlike", "Sil");
    sil.type = "button";
    sil.addEventListener("click", () => {
      if (!confirm(`“${d.baslik || "Bu duyuru"}” silinsin mi? Bu geri alınamaz.`)) return;
      if (duzenlenen === d.id) formuSifirla();
      islem(veri.duyurular.filter(x => x.id !== d.id), `Duyuru silindi: ${d.baslik || d.id}`, "Silindi");
    });
    alt.append(duzenle, ac, sil);
    li.append(alt);
    ul.append(li);
  }
}

$("#filtre").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  filtre = b.dataset.f;
  document.querySelectorAll("#filtre button").forEach(x => x.classList.toggle("secili", x === b));
  ciz();
});

async function islem(yeniListe, mesaj, basari) {
  if (mesgul) return;
  mesgul = true;
  durum("Kaydediliyor…");
  try {
    await yaz(yeniListe, mesaj);
    ciz();
    durum(basari + " · sitelerde ~1 dk içinde görünür", "iyi");
    return true;
  } catch (e) {
    durum(e.status === 401 ? "Oturum geçersiz, yeniden giriş yap." : e.message, "kotu");
    return false;
  } finally {
    mesgul = false;
  }
}

/* ---------- form ---------- */
const form = $("#form");

function formDegeri() {
  const f = new FormData(form);
  const d = {
    baslik: f.get("baslik").trim(),
    metin: f.get("metin").trim(),
    bicim: f.get("bicim"),
    siteler: f.getAll("site"),
    aktif: form.aktif.checked
  };
  if (d.bicim === "bant") d.renk = f.get("renk");
  if (d.bicim === "kart" && form.sabit.checked) d.sabit = true;
  const link = f.get("link").trim();
  if (link) { d.link = link; const lm = f.get("linkMetni").trim(); if (lm) d.linkMetni = lm; }
  if (f.get("baslangic")) d.baslangic = f.get("baslangic");
  if (f.get("bitis")) d.bitis = f.get("bitis");
  return d;
}

function formuSifirla() {
  duzenlenen = null;
  form.reset();
  $("#form-baslik").textContent = "Yeni duyuru";
  $("#kaydet").textContent = "Yayınla";
  $("#formHata").textContent = "";
  bicimDegisti();
  ciz();
}

function formuDoldur(d) {
  form.reset();
  duzenlenen = d.id;
  $("#form-baslik").textContent = "Duyuruyu düzenle";
  $("#kaydet").textContent = "Kaydet";
  form.baslik.value = d.baslik || "";
  form.metin.value = d.metin || "";
  form.link.value = d.link || "";
  form.linkMetni.value = d.linkMetni || "";
  form.baslangic.value = d.baslangic || "";
  form.bitis.value = d.bitis || "";
  form.aktif.checked = d.aktif !== false;
  form.sabit.checked = !!d.sabit;
  form.querySelectorAll('[name="site"]').forEach(c => { c.checked = (d.siteler || []).includes(c.value); });
  form.querySelector(`[name="bicim"][value="${d.bicim || "kart"}"]`).checked = true;
  form.querySelector(`[name="renk"][value="${d.renk || "buz"}"]`).checked = true;
  $("#formHata").textContent = "";
  bicimDegisti();
  ciz();
  form.scrollIntoView({ behavior: "smooth", block: "start" });
  form.baslik.focus({ preventScroll: true });
}

function bicimDegisti() {
  const b = form.querySelector('[name="bicim"]:checked').value;
  $("#renkAlan").hidden = b !== "bant";
  $("#sabitAlan").hidden = b !== "kart";
  $("#bicimIpucu").textContent = IPUCU[b];
  onizle();
}

function onizle() {
  const d = formDegeri();
  const yer = $("#onizleme");
  yer.textContent = "";
  const baslik = d.baslik || "Başlık", metin = d.metin;
  if (d.bicim === "bant") {
    const b = el("div", "wd-bant wd-" + (d.renk || "buz"));
    const ic = el("div", "wd-bant-ic");
    ic.append(el("b", null, baslik));
    if (metin) ic.append(el("span", null, metin));
    if (d.link) ic.append(el("a", "wd-bant-link", d.linkMetni || "Ayrıntılar"));
    b.append(ic, el("span", "wd-kapat", "×"));
    yer.append(b);
  } else if (d.bicim === "popup") {
    const k = el("div", "wd-popup");
    k.append(el("h2", null, baslik));
    if (metin) k.append(el("p", null, metin));
    const alt = el("div", "wd-popup-alt");
    if (d.link) alt.append(el("span", "wd-dugme wd-dugme-ana", d.linkMetni || "Ayrıntılar"));
    alt.append(el("span", "wd-dugme", "Kapat"));
    k.append(alt);
    yer.append(k);
  } else {
    const k = el("div", "wd-kart" + (d.sabit ? " wd-sabit" : ""));
    k.append(el("span", "wd-tarih", tarihYaz(new Date().toISOString())), el("h3", null, baslik));
    if (metin) k.append(el("p", null, metin));
    if (d.link) k.append(el("span", "wd-kart-link", d.linkMetni || "Ayrıntılar"));
    yer.append(k);
  }
}

form.addEventListener("input", onizle);
form.addEventListener("change", e => { if (e.target.name === "bicim") bicimDegisti(); });
$("#vazgec").addEventListener("click", formuSifirla);
$("#yeni").addEventListener("click", () => { formuSifirla(); form.baslik.focus(); });

form.addEventListener("submit", async e => {
  e.preventDefault();
  const d = formDegeri();
  const hata = $("#formHata");
  hata.textContent = "";
  if (!d.siteler.length) return void (hata.textContent = "En az bir site seç.");
  if (!d.baslik && !d.metin) return void (hata.textContent = "Başlık ya da metin yaz.");
  if (d.link && !/^(https?:\/\/|\/|#)/.test(d.link)) return void (hata.textContent = "Bağlantı https:// ya da / ile başlamalı.");
  if (d.baslangic && d.bitis && d.bitis < d.baslangic) return void (hata.textContent = "Bitiş tarihi başlangıçtan önce olamaz.");

  let liste, mesaj;
  if (duzenlenen) {
    liste = veri.duyurular.map(x => x.id === duzenlenen ? { id: x.id, tarih: x.tarih, ...d } : x);
    mesaj = "Duyuru güncellendi: " + (d.baslik || duzenlenen);
  } else {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    liste = [{ id, tarih: new Date().toISOString(), ...d }, ...veri.duyurular];
    mesaj = "Yeni duyuru: " + (d.baslik || id);
  }
  const k = $("#kaydet");
  k.disabled = true;
  const ok = await islem(liste, mesaj, duzenlenen ? "Kaydedildi" : "Yayınlandı");
  k.disabled = false;
  if (ok) formuSifirla();
});

/* ---------- başlangıç ---------- */
(async () => {
  const t = kayitliToken();
  if (!t) { $("#giris").hidden = false; return; }
  try {
    await girisYap(t, !!localStorage.getItem(ANAHTAR));
  } catch (e) {
    tokenSakla("");
    $("#giris").hidden = false;
    $("#girisHata").textContent = "Kayıtlı oturum açılamadı, yeniden giriş yap.";
  }
})();
