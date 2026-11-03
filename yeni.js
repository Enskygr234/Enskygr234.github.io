"use strict";
/* WinterDeveloper — yeni ana sayfa */

const P = (Array.isArray(window.P) ? window.P : []).filter(p => p && Array.isArray(p.dl) && (p.dl.length || p.web));
const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
const HOVER = matchMedia("(hover: hover)").matches;
const MEDIA = "/ensdewloper.github.io/img/video/";
const root = document.documentElement;
if (!REDUCE) root.classList.add("anim");

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const safeUrl = u => { try { const x = new URL(u, location.href); return (x.protocol === "https:" || x.origin === location.origin) ? x.href : "#"; } catch (e) { return "#"; } };
const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
const byId = id => P.find(p => p.id === id);
const size = mb => mb < 0.1 ? "<0,1 MB" : mb.toLocaleString("tr-TR", { maximumFractionDigits: 1 }) + " MB";
const platforms = p => { const s = new Set(p.dl.map(d => d.kind)); if (p.web) s.add("Tarayıcı"); return [...s]; };
const CAT = { game: "Oyun", app: "Uygulama", tool: "Windows aracı", web: "Web" };
const ICON = {
  dl: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/></svg>',
  web: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>'
};

function actions(p, max) {
  const dls = p.dl.slice(0, max || 9).map(d => {
    const label = d.name ? d.name : (d.kind === "Minecraft" ? "Modu indir" : d.kind + " için indir");
    return `<a class="btn sm primary" href="${esc(safeUrl(d.url))}" rel="noopener noreferrer" download>${ICON.dl}${esc(label)} <small>${size(d.mb)}</small></a>`;
  }).join("");
  const web = p.web ? `<a class="btn sm" href="${esc(safeUrl(p.web))}" target="_blank" rel="noopener noreferrer">${ICON.web}${p.cat === "game" ? "Tarayıcıda oyna" : "Tarayıcıda aç"}<span class="sr"> (yeni sekmede açılır)</span></a>` : "";
  return dls + web;
}

/* ---------- gerçek rakamlar ---------- */
const COUNT = { all: P.length, game: 0, app: 0, tool: 0, web: 0 };
P.forEach(p => { if (has(COUNT, p.cat)) COUNT[p.cat]++; });
function countUp(el) {
  const to = COUNT[el.dataset.count] || 0;
  if (REDUCE) { el.textContent = to; return; }
  const t0 = performance.now(), dur = 1100;
  (function step(t) {
    const k = Math.min(1, (t - t0) / dur);
    el.textContent = Math.round(to * (1 - Math.pow(1 - k, 4)));
    if (k < 1) requestAnimationFrame(step);
  })(t0);
}
document.querySelectorAll("[data-count]").forEach(countUp);
const newest = P.reduce((a, p) => (p.updated && p.updated > a ? p.updated : a), "");
if (newest) {
  const days = Math.max(0, Math.round((Date.now() - new Date(newest)) / 864e5));
  document.getElementById("lastUpdate").textContent = days === 0 ? "Son güncelleme: bugün" : `Son güncelleme: ${days} gün önce`;
}
const yil = document.getElementById("yil"); if (yil) yil.textContent = new Date().getFullYear();

/* ---------- öne çıkanlar (gerçek projeler) ---------- */
const FEATURED = [
  { id: "Son-Vardiya", video: "sonvardiya" },
  { id: "mahalle", video: "mahalle" },
  { id: "Winterball", video: "winterball" },
  { id: "ayazle", video: "ayazle" }
];
const featured = document.getElementById("featured");
featured.innerHTML = FEATURED.map(f => {
  const p = byId(f.id); if (!p) return "";
  const poster = f.video ? MEDIA + f.video + ".jpg" : f.img;
  return `<article class="fcard rv" data-video="${f.video ? esc(MEDIA + f.video + ".mp4") : ""}" aria-labelledby="f-${esc(p.id)}">
    <div class="media">
      <img src="${esc(poster)}" alt="${esc(p.title)} ekran görüntüsü" loading="lazy" decoding="async">
      <span class="badge ${esc(p.cat)}">${esc(CAT[p.cat] || "")}</span>
      ${f.video ? '<span class="live" aria-hidden="true"><i></i>Önizleme</span>' : ""}
    </div>
    <div class="body">
      <h3 id="f-${esc(p.id)}">${esc(p.icon)} ${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      <div class="acts">${actions(p, 1)}</div>
    </div>
  </article>`;
}).join("");

function videoOf(card) {
  let v = card.querySelector("video");
  if (!v && card.dataset.video) {
    v = document.createElement("video");
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = "none";
    v.setAttribute("aria-hidden", "true");
    v.src = card.dataset.video;
    card.querySelector(".media").insertBefore(v, card.querySelector(".badge"));
  }
  return v;
}
const play = c => { const v = videoOf(c); if (v) v.play().then(() => c.classList.add("playing")).catch(() => {}); };
const stop = c => { const v = c.querySelector("video"); if (v) v.pause(); c.classList.remove("playing"); };
if (!REDUCE) {
  const cards = [...featured.querySelectorAll(".fcard")].filter(c => c.dataset.video);
  if (HOVER) cards.forEach(c => { c.addEventListener("pointerenter", () => play(c)); c.addEventListener("pointerleave", () => stop(c)); });
  else if ("IntersectionObserver" in window) {
    const seen = new Map();
    const io = new IntersectionObserver(es => {
      es.forEach(e => seen.set(e.target, e.intersectionRatio));
      let best = null, r = .7;
      seen.forEach((v, c) => { if (v >= r) { best = c; r = v; } });
      cards.forEach(c => c === best ? play(c) : stop(c));
    }, { threshold: [0, .7, .9, 1] });
    cards.forEach(c => io.observe(c));
  }
}

/* ---------- bütün projeler: sekmeler + arama ---------- */
P.sort((a, b) => (a.id === "ensdewloper.github.io") - (b.id === "ensdewloper.github.io") || (b.dl.length > 0) - (a.dl.length > 0) || new Date(b.updated) - new Date(a.updated));
const TABS = [["all", "Hepsi"], ["game", "Oyunlar"], ["app", "Uygulamalar"], ["tool", "Windows araçları"], ["web", "Web"]];
const filters = { all: () => true, game: p => p.cat === "game", app: p => p.cat === "app", tool: p => p.cat === "tool", web: p => p.cat === "web" };
let cat = "all";
try { const s = localStorage.getItem("wd-cat"); if (s && has(filters, s)) cat = s; } catch (e) {}

const tabs = document.getElementById("tabs"), list = document.getElementById("list"), q = document.getElementById("q"), countEl = document.getElementById("count");
tabs.innerHTML = TABS.map(([k, t]) => `<button class="tab" type="button" aria-pressed="false" data-k="${k}">${t}<span>${P.filter(filters[k]).length}</span></button>`).join("");
const tabBtns = [...tabs.querySelectorAll(".tab")];
const drawTabs = () => tabBtns.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.k === cat)));
tabs.addEventListener("click", e => {
  const b = e.target.closest(".tab"); if (!b || !has(filters, b.dataset.k)) return;
  cat = b.dataset.k; try { localStorage.setItem("wd-cat", cat); } catch (er) {}
  drawTabs(); render();
});

const norm = s => s.toLocaleLowerCase("tr-TR");

/* ---------- kart kapakları: ekran görüntüsü + video önizleme ---------- */
const IMG = "/ensdewloper.github.io/img/";
const COVER = {
  "Winterball": ["video/winterball.jpg", "winterball"], "mahalle": ["video/mahalle.jpg", "mahalle"],
  "ayazle": ["video/ayazle.jpg", "ayazle"], "Son-Vardiya": ["video/sonvardiya.jpg", "sonvardiya"],
  "Son-Tren": ["video/sontren.jpg", "sontren"], "buz-kirici": ["video/buzkirici.jpg", "buzkirici"],
  "kar-birlestir": ["video/karbirlestir.jpg", "karbirlestir"], "golhaber": ["video/golhaber.jpg", "golhaber"],
  "Winter-gym": ["video/wintergym.jpg", "wintergym"], "ensdewloper.github.io": ["video/tarifler.jpg", "tarifler"],
  "kayip-fener": ["kapak/kayip-fener.png"], "son-kis": ["kapak/son-kis.png"],
  "Ayaz-launcher": ["kapak/ayaz-launcher.png"], "FloatingDock": ["kapak/floating-dock.jpg"], "buz-arsiv": ["kapak/buz-arsiv.png"]
};
const HUE = { game: 150, app: 262, tool: 28, web: 212 };
const hash = s => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7);
const coverOf = p => COVER[p.id] ? { img: IMG + COVER[p.id][0], video: COVER[p.id][1] ? MEDIA + COVER[p.id][1] + ".mp4" : "" } : null;
const PLAT = {
  Android: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/></svg>',
  Windows: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  Minecraft: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4zM9 9h2v2H9zm4 0h2v2h-2zm-3 4h4v4h-1v-2h-2v2h-1z"/></svg>',
  "Tarayıcı": '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>'
};
const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m0 0-6-6m6 6-6 6"/></svg>';
const ago = d => { if (!d) return ""; const n = Math.max(0, Math.round((Date.now() - new Date(d)) / 864e5)); return n === 0 ? "bugün" : n === 1 ? "dün" : n < 30 ? n + " gün önce" : Math.round(n / 30) + " ay önce"; };
const art = p => `<div class="art" aria-hidden="true"><i class="orb a"></i><i class="orb b"></i><span class="glyph">${esc(p.icon)}</span></div>`;

const card = p => {
  const c = coverOf(p), d = p.dl[0];
  const quick = d ? `<a class="quick" href="${esc(safeUrl(d.url))}" rel="noopener noreferrer" download aria-label="${esc(p.title)}: ${esc(d.kind)} için indir (${size(d.mb)})" title="Hemen indir · ${size(d.mb)}">${ICON.dl}</a>`
    : p.web ? `<a class="quick" href="${esc(safeUrl(p.web))}" target="_blank" rel="noopener noreferrer" aria-label="${esc(p.title)}: tarayıcıda aç (yeni sekmede)" title="Tarayıcıda aç">${ICON.web}</a>` : "";
  return `<li class="card" data-id="${esc(p.id)}" data-cat="${esc(p.cat)}"${c && c.video ? ` data-video="${esc(c.video)}"` : ""}>
    <div class="cover">${c ? `<img src="${esc(c.img)}" alt="" loading="lazy" decoding="async">` : art(p)}
      <span class="cat ${esc(p.cat)}">${esc(CAT[p.cat] || "")}</span>${quick}
    </div>
    <div class="cbody">
      <h3><span class="ic" aria-hidden="true">${esc(p.icon)}</span>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      <div class="cfoot">
        <span class="plats">${platforms(p).map(k => `<span class="plat" title="${esc(k)}">${PLAT[k] || ""}<span>${esc(k)}</span></span>`).join("")}</span>
        <span class="go">Detay${ARROW}</span>
      </div>
    </div>
    <button class="hit" type="button" data-open="${esc(p.id)}"><span class="sr">${esc(p.title)} detaylarını aç</span></button>
  </li>`;
};

let drawn = 0;
/* kartlar ekrana girdikçe sırayla belirsin */
const cardIO = !REDUCE && "IntersectionObserver" in window ? new IntersectionObserver(es => {
  es.filter(e => e.isIntersecting).forEach((e, i) => {
    const el = e.target; cardIO.unobserve(el);
    el.style.setProperty("--i", Math.min(i, 12));
    el.classList.remove("wait"); el.classList.add("pop");
    el.addEventListener("animationend", ev => { if (ev.target === el && ev.animationName === "cardIn") el.classList.remove("pop", "re"); });
  });
}, { rootMargin: "0px 0px -4% 0px" }) : null;
function render() {
  const t = norm(q.value.trim());
  const items = P.filter(filters[cat]).filter(p => !t || norm(p.title + " " + p.desc + " " + platforms(p).join(" ") + " " + (CAT[p.cat] || "")).includes(t));
  list.innerHTML = items.length ? items.map(card).join("")
    : `<li class="empty"><b>Sonuç yok</b><span>“${esc(q.value)}” ile eşleşen proje bulunamadı.</span><button class="btn sm" type="button" id="reset">Aramayı temizle</button></li>`;
  countEl.textContent = items.length ? `${items.length} proje gösteriliyor` : "Eşleşen proje yok";
  if (cardIO) cardIO.disconnect();
  list.querySelectorAll(".card").forEach(el => {
    const p = byId(el.dataset.id);
    el.style.setProperty("--h", (HUE[p.cat] ?? 212) + (hash(p.id) % 36) - 18);
    if (cardIO) { el.classList.add("wait"); if (drawn) el.classList.add("re"); cardIO.observe(el); }
  });
  drawn++;
  moveInk();
}

/* kayan sekme göstergesi */
const ink = document.createElement("span"); ink.className = "ink"; ink.setAttribute("aria-hidden", "true"); tabs.prepend(ink);
function moveInk() {
  const b = tabs.querySelector('.tab[aria-pressed="true"]'); if (!b) return;
  ink.style.setProperty("--x", b.offsetLeft + "px"); ink.style.setProperty("--w", b.offsetWidth + "px");
  tabs.classList.add("inked");
}
addEventListener("resize", moveInk);
if (document.fonts) document.fonts.ready.then(moveInk);

/* üzerine gelince: 3D eğilme, imleci izleyen ışık, video önizleme */
if (HOVER && !REDUCE) {
  let cur = null;
  const leave = el => { el.style.removeProperty("--rx"); el.style.removeProperty("--ry"); el.classList.remove("hov", "playing"); const v = el.querySelector("video"); if (v) v.pause(); };
  list.addEventListener("pointermove", e => {
    const el = e.target.closest(".card");
    if (el !== cur) { if (cur) leave(cur); cur = el; if (el) enter(el); }
    if (!el) return;
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", (x * 100).toFixed(1) + "%"); el.style.setProperty("--my", (y * 100).toFixed(1) + "%");
    el.style.setProperty("--ry", ((x - .5) * 10).toFixed(2) + "deg"); el.style.setProperty("--rx", ((.5 - y) * 8).toFixed(2) + "deg");
  });
  list.addEventListener("pointerleave", () => { if (cur) leave(cur); cur = null; });
  function enter(el) {
    el.classList.add("hov");
    if (!el.dataset.video) return;
    let v = el.querySelector("video");
    if (!v) {
      v = document.createElement("video"); v.muted = true; v.loop = true; v.playsInline = true; v.preload = "none";
      v.setAttribute("aria-hidden", "true"); v.src = el.dataset.video;
      el.querySelector(".cover").insertBefore(v, el.querySelector(".cat"));
    }
    v.play().then(() => { if (el === cur) el.classList.add("playing"); else v.pause(); }).catch(() => {});
  }
}

/* ---------- detay paneli ---------- */
const dlg = document.createElement("dialog");
dlg.className = "pd"; dlg.setAttribute("aria-labelledby", "pd-t");
document.body.appendChild(dlg);
let lastFocus = null;
function openDetail(id) {
  const p = byId(id); if (!p) return;
  const c = coverOf(p);
  dlg.innerHTML = `<div class="pd-in">
    <button class="pd-x" type="button" data-close aria-label="Kapat"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    <div class="pd-media">${c ? (c.video ? `<video src="${esc(c.video)}" poster="${esc(c.img)}" muted loop playsinline ${REDUCE ? "" : "autoplay"} aria-hidden="true"></video>` : `<img src="${esc(c.img)}" alt="${esc(p.title)} ekran görüntüsü">`) : art(p)}</div>
    <div class="pd-body">
      <div class="pd-meta"><span class="cat ${esc(p.cat)}">${esc(CAT[p.cat] || "")}</span>${p.lang ? `<span class="tag">${esc(p.lang)}</span>` : ""}${p.updated ? `<span class="tag">Güncellendi: ${ago(p.updated)}</span>` : ""}</div>
      <h2 id="pd-t"><span aria-hidden="true">${esc(p.icon)}</span> ${esc(p.title)}</h2>
      <p>${esc(p.desc)}</p>
      <div class="plats big">${platforms(p).map(k => `<span class="plat">${PLAT[k] || ""}<span>${esc(k)}</span></span>`).join("")}</div>
      <div class="pd-acts">${actions(p)}</div>
    </div>
  </div>`;
  dlg.querySelectorAll(".pd-media").forEach(m => { const h = (HUE[p.cat] ?? 212) + (hash(p.id) % 36) - 18; m.style.setProperty("--h", h); });
  lastFocus = document.activeElement;
  dlg.classList.remove("closing");
  dlg.showModal();
  dlg.querySelector(".pd-x").focus();
}
function closeDetail() {
  if (!dlg.open || dlg.classList.contains("closing")) return;
  const v = dlg.querySelector("video"); if (v) v.pause();
  if (REDUCE) { dlg.close(); return; }
  dlg.classList.add("closing");
  setTimeout(() => { dlg.close(); dlg.classList.remove("closing"); }, 220);
}
dlg.addEventListener("close", () => { if (lastFocus && lastFocus.focus) lastFocus.focus(); });
dlg.addEventListener("cancel", e => { e.preventDefault(); closeDetail(); });
dlg.addEventListener("click", e => { if (e.target === dlg || e.target.closest("[data-close]")) closeDetail(); });

list.addEventListener("click", e => {
  if (e.target.closest("#reset")) { q.value = ""; cat = "all"; drawTabs(); render(); q.focus(); return; }
  const b = e.target.closest("[data-open]"); if (b) openDetail(b.dataset.open);
});
try { const s = new URLSearchParams(location.search).get("q"); if (s) { q.value = s.slice(0, 60); cat = "all"; } } catch (e) {}

// aramaya yazınca: kategoriyi "Hepsi" yap ve listeye kaydır
let qt, scrolled = false;
q.addEventListener("input", () => {
  clearTimeout(qt);
  qt = setTimeout(() => {
    if (q.value.trim() && cat !== "all") { cat = "all"; drawTabs(); }
    render();
    if (q.value.trim() && !scrolled) {
      scrolled = true;
      document.getElementById("projeler").scrollIntoView({ behavior: REDUCE ? "auto" : "smooth" });
    }
    if (!q.value.trim()) scrolled = false;
  }, 120);
});
q.addEventListener("keydown", e => {
  if (e.key === "Escape" && q.value) { q.value = ""; render(); }
  if (e.key === "Enter") { e.preventDefault(); document.getElementById("projeler").scrollIntoView({ behavior: REDUCE ? "auto" : "smooth" }); }
});
document.addEventListener("keydown", e => {
  if (e.key === "/" && !e.ctrlKey && !e.metaKey && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
    e.preventDefault(); q.focus();
  }
});
drawTabs(); render();

/* ---------- Ayaz düğmeleri (menü, hero, alt menü) ---------- */
document.addEventListener("click", e => {
  const b = e.target.closest("[data-ayaz]"); if (!b) return;
  const fab = document.querySelector(".ai-fab");
  if (fab) fab.click();
});

/* ---------- üst çubuk ve aktif menü ---------- */
const topBar = document.querySelector(".top");
const onScroll = () => topBar.classList.toggle("solid", scrollY > 30);
addEventListener("scroll", onScroll, { passive: true }); onScroll();

const navLinks = [...document.querySelectorAll("[data-nav]")];
if ("IntersectionObserver" in window) {
  const ids = [...new Set(navLinks.map(a => a.dataset.nav))];
  const spy = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id === "vitrin" ? "ust" : e.target.id;
      navLinks.forEach(a => a.classList.toggle("on", a.dataset.nav === id));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  ids.concat("vitrin").forEach(id => { const s = document.getElementById(id); if (s) spy.observe(s); });
}

// duyuru bölümü görünür olunca menüdeki bağlantısı da görünsün
const duyuruSec = document.getElementById("duyuru"), duyuruLink = document.querySelector("[data-duyuru-link]");
if (duyuruSec && duyuruLink) new MutationObserver(() => { duyuruLink.hidden = duyuruSec.hidden; }).observe(duyuruSec, { attributes: true, attributeFilter: ["hidden"] });

/* ---------- kaydırınca belirme ---------- */
if (!REDUCE && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll(".rv").forEach(el => io.observe(el));
} else document.querySelectorAll(".rv").forEach(el => el.classList.add("in"));

/* ---------- karakter görseli (varsa) ---------- */
(() => {
  const img = document.getElementById("heroChar");
  const probe = new Image();
  probe.onload = () => { img.src = probe.src; img.hidden = false; };
  probe.src = "img/karakter.webp";
})();

/* ---------- kar yağışı ---------- */
(() => {
  const c = document.getElementById("snow"); if (!c || REDUCE) return;
  const ctx = c.getContext("2d");
  let w, h, flakes = [], raf = 0, visible = true;
  const dpr = Math.min(2, devicePixelRatio || 1);
  function resize() {
    w = c.clientWidth; h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(160, w * h / 9000));
    flakes = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.8 + .4, s: Math.random() * .6 + .25, d: Math.random() * Math.PI * 2 }));
  }
  function tick() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(225,238,255,.85)";
    for (const f of flakes) {
      f.y += f.s; f.d += .01; f.x += Math.sin(f.d) * .3;
      if (f.y > h + 4) { f.y = -4; f.x = Math.random() * w; }
      ctx.globalAlpha = .35 + f.r / 3;
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
    }
    raf = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
  }
  resize(); tick();
  addEventListener("resize", resize);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) tick(); }).observe(c);
  document.addEventListener("visibilitychange", () => { if (!document.hidden && visible && !raf) tick(); });
})();
