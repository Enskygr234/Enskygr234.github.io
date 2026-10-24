"use strict";
const VARLIK = [
  { kod: "USD", ad: "🇺🇸 Dolar", keys: ["USD", "usd"] },
  { kod: "EUR", ad: "🇪🇺 Euro", keys: ["EUR", "eur"] },
  { kod: "GBP", ad: "🇬🇧 Sterlin", keys: ["GBP", "gbp"] },
  { kod: "GRAM", ad: "🥇 Gram altın", keys: ["GRA", "gram-altin", "GRAMALTIN"], altin: true },
  { kod: "CEYREK", ad: "🪙 Çeyrek altın", keys: ["CEYREKALTIN", "ceyrek-altin", "CEYREK"], altin: true },
  { kod: "ONS", ad: "✨ Ons altın", keys: ["ONS", "ons"], altin: true, usd: true },
];
const $ = id => document.getElementById(id);
let fiyat = {};

const sayi = v => {
  if (typeof v === "number") return v;
  if (v == null) return NaN;
  let s = String(v).replace(/[^\d.,-]/g, "");
  if (s.includes(",") && s.includes(".")) s = s.replace(/\./g, "").replace(",", ".");
  else if (s.includes(",")) s = s.replace(",", ".");
  return parseFloat(s);
};
const fmt = (n, d = 2) => Number.isFinite(n) ? n.toLocaleString("tr-TR", { minimumFractionDigits: d, maximumFractionDigits: d }) : "—";
const getJSON = async url => {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error(r.status);
  return r.json();
};

async function anlik() {
  for (const url of ["https://finans.truncgil.com/v4/today.json", "https://finans.truncgil.com/today.json"]) {
    try {
      const d = await getJSON(url);
      const out = {};
      for (const v of VARLIK) {
        const k = v.keys.find(a => d[a] && typeof d[a] === "object");
        if (!k) continue;
        const o = d[k];
        const satis = sayi(o.Selling ?? o["Satış"]);
        if (!Number.isFinite(satis)) continue;
        out[v.kod] = { satis, alis: sayi(o.Buying ?? o["Alış"]), degisim: sayi(o.Change ?? o["Değişim"]) };
      }
      if (Object.keys(out).length) return { out, kaynak: "Truncgil", zaman: d.Update_Date || null };
    } catch (e) { /* sonraki kaynağı dene */ }
  }
  const d = await getJSON("https://open.er-api.com/v6/latest/USD");
  const t = d.rates.TRY;
  const m = x => ({ satis: x, alis: x, degisim: NaN });
  return { out: { USD: m(t), EUR: m(t / d.rates.EUR), GBP: m(t / d.rates.GBP) }, kaynak: "open.er-api (altın verisi yok)", zaman: null };
}

function kartlar() {
  const box = $("kartlar");
  box.textContent = "";
  for (const v of VARLIK) {
    const f = fiyat[v.kod];
    const c = document.createElement("article");
    c.className = "card" + (v.altin ? " altin" : "") + (f ? "" : " bos");
    const ad = document.createElement("div"); ad.className = "ad"; ad.textContent = v.ad;
    const fy = document.createElement("div"); fy.className = "fiyat";
    fy.textContent = f ? fmt(f.satis) + (v.usd ? " $" : " ₺") : "—";
    const alt = document.createElement("div"); alt.className = "alt";
    if (f) {
      const a = document.createElement("span"); a.textContent = "Alış " + fmt(f.alis); alt.append(a);
      if (Number.isFinite(f.degisim)) {
        const dg = document.createElement("span");
        dg.className = f.degisim >= 0 ? "up" : "down";
        dg.textContent = (f.degisim >= 0 ? "▲ %" : "▼ %") + fmt(Math.abs(f.degisim));
        alt.append(dg);
      }
    } else alt.textContent = "Veri yok";
    c.append(ad, fy, alt);
    box.append(c);
  }
  const sel = $("birim"), once = sel.value;
  sel.textContent = "";
  VARLIK.filter(v => fiyat[v.kod] && !v.usd).forEach(v => sel.add(new Option(v.ad.replace(/^\S+\s/, "") + " → TL", v.kod)));
  if (once && fiyat[once]) sel.value = once;
  cevir();
}

function cevir() {
  const m = parseFloat($("miktar").value), f = fiyat[$("birim").value];
  $("sonuc").textContent = f && Number.isFinite(m) ? fmt(m * f.satis) + " ₺" : "—";
}

async function yenile() {
  try {
    const { out, kaynak, zaman } = await anlik();
    fiyat = out;
    kartlar();
    const saat = new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
    $("durum").textContent = `Son kontrol ${saat} · ${kaynak}${zaman ? " · Kaynak saati " + zaman : ""}`;
  } catch (e) {
    $("durum").textContent = "Kurlar alınamadı. Bağlantını kontrol edip sayfayı yenile.";
  }
}

// ---------- grafik (kütüphanesiz SVG) ----------
let para = "USD", gun = 90, seri = [];
const NS = "http://www.w3.org/2000/svg";
const el = (t, a) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); return e; };

async function grafikVeri() {
  const bas = new Date(Date.now() - gun * 864e5).toISOString().slice(0, 10);
  const urls = [
    `https://api.frankfurter.app/${bas}..?from=${para}&to=TRY`,
    `https://api.frankfurter.dev/v1/${bas}..?base=${para}&symbols=TRY`,
  ];
  for (const u of urls) {
    try {
      const d = await getJSON(u);
      return Object.keys(d.rates).sort().map(t => ({ t, v: d.rates[t].TRY })).filter(p => Number.isFinite(p.v));
    } catch (e) { /* sonraki */ }
  }
  return null;
}

function ciz() {
  const svg = $("svg");
  svg.textContent = "";
  if (!seri.length) return;
  const W = svg.clientWidth || 600, H = svg.clientHeight || 260;
  const sol = 46, alt = 22, ust = 8;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  const vs = seri.map(p => p.v);
  let mn = Math.min(...vs), mx = Math.max(...vs);
  const pad = (mx - mn) * 0.08 || mx * 0.01; mn -= pad; mx += pad;
  const x = i => sol + (W - sol - 4) * (seri.length === 1 ? 0.5 : i / (seri.length - 1));
  const y = v => ust + (H - ust - alt) * (1 - (v - mn) / (mx - mn));

  const defs = el("defs", {});
  const g = el("linearGradient", { id: "dol", x1: 0, y1: 0, x2: 0, y2: 1 });
  g.append(el("stop", { offset: "0%", "stop-color": "#5ef2c2", "stop-opacity": ".35" }), el("stop", { offset: "100%", "stop-color": "#5ef2c2", "stop-opacity": "0" }));
  defs.append(g); svg.append(defs);

  for (let i = 0; i <= 3; i++) {
    const v = mn + (mx - mn) * i / 3, yy = y(v);
    svg.append(el("line", { class: "gl", x1: sol, x2: W, y1: yy, y2: yy }));
    const tx = el("text", { class: "lbl", x: sol - 6, y: yy + 4, "text-anchor": "end" }); tx.textContent = fmt(v, 1); svg.append(tx);
  }
  const adim = Math.max(1, Math.floor(seri.length / (W < 500 ? 3 : 5)));
  for (let i = 0; i < seri.length; i += adim) {
    const tx = el("text", { class: "lbl", x: x(i), y: H - 4, "text-anchor": "middle" });
    tx.textContent = new Date(seri[i].t).toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
    svg.append(tx);
  }
  const d = seri.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.v).toFixed(1)}`).join("");
  svg.append(el("path", { d: `${d}L${x(seri.length - 1)},${H - alt}L${x(0)},${H - alt}Z`, fill: "url(#dol)" }));
  svg.append(el("path", { class: "ln", d }));
  const cur = el("line", { class: "cur", y1: ust, y2: H - alt, visibility: "hidden" });
  const dot = el("circle", { r: 4, fill: "#f6fbff", visibility: "hidden" });
  svg.append(cur, dot);

  const tip = $("tip"), box = $("grafik");
  box.onpointermove = e => {
    const r = svg.getBoundingClientRect();
    const px = (e.clientX - r.left) * (W / r.width);
    const i = Math.max(0, Math.min(seri.length - 1, Math.round((px - sol) / (W - sol - 4) * (seri.length - 1))));
    const xx = x(i), yy = y(seri[i].v);
    cur.setAttribute("x1", xx); cur.setAttribute("x2", xx); cur.setAttribute("visibility", "visible");
    dot.setAttribute("cx", xx); dot.setAttribute("cy", yy); dot.setAttribute("visibility", "visible");
    tip.hidden = false;
    tip.textContent = fmt(seri[i].v, 4) + " ₺";
    const s = document.createElement("small");
    s.textContent = new Date(seri[i].t).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    tip.append(s);
    tip.style.left = Math.max(50, Math.min(r.width - 50, xx * r.width / W)) + "px";
  };
  box.onpointerleave = () => { tip.hidden = true; cur.setAttribute("visibility", "hidden"); dot.setAttribute("visibility", "hidden"); };
}

async function grafik() {
  const not = $("grafikNot");
  not.textContent = "Grafik yükleniyor…";
  const s = await grafikVeri();
  if (!s || !s.length) { seri = []; ciz(); not.textContent = "Grafik verisi alınamadı."; return; }
  seri = s; ciz();
  const ilk = s[0].v, son = s[s.length - 1].v, fark = (son - ilk) / ilk * 100;
  not.textContent = "";
  const sp = document.createElement("span");
  sp.className = fark >= 0 ? "up" : "down";
  sp.textContent = (fark >= 0 ? "+%" : "−%") + fmt(Math.abs(fark));
  not.append(`Son ${gun} günde `, sp, ` (${fmt(ilk)} → ${fmt(son)} ₺)`);
}

function seg(id, cb) {
  $(id).addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    for (const x of $(id).children) x.classList.toggle("on", x === b);
    cb(b.dataset); grafik();
  });
}
seg("paraSec", d => para = d.p);
seg("gunSec", d => gun = +d.g);
$("miktar").addEventListener("input", cevir);
$("birim").addEventListener("change", cevir);
let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(ciz, 150); });

$("kartlar").innerHTML = '<div class="skel"></div>'.repeat(6);
yenile(); grafik();
setInterval(() => { if (!document.hidden) yenile(); }, 60000);
