"use strict";
/* Winterdeveloper — ana sayfa */

const P = (Array.isArray(window.P) ? window.P : []).filter(p => p && Array.isArray(p.dl) && (p.dl.length || p.web));
const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
const HOVER = matchMedia("(hover: hover)").matches;
const MEDIA = "/ensdewloper.github.io/img/video/";

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safeUrl = u => { try { const x = new URL(u, location.href); return (x.protocol === "https:" || x.origin === location.origin) ? x.href : "#"; } catch (e) { return "#"; } };
const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
const byId = id => P.find(p => p.id === id);
const size = mb => mb < 0.1 ? "<0,1 MB" : mb.toLocaleString("tr-TR", { maximumFractionDigits: 1 }) + " MB";
const platforms = p => { const s = new Set(p.dl.map(d => d.kind)); if (p.web) s.add("Tarayıcı"); return [...s]; };

const ICON = {
  dl: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/></svg>',
  web: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>'
};

function actions(p, max) {
  const dls = p.dl.slice(0, max || 9).map(d => {
    const label = d.name ? d.name : (d.kind === "Minecraft" ? "Modu indir" : d.kind + " için indir");
    return `<a class="btn ember" href="${esc(safeUrl(d.url))}" rel="noopener noreferrer" download>${ICON.dl}${esc(label)} <small>${size(d.mb)}</small></a>`;
  }).join("");
  const web = p.web ? `<a class="btn" href="${esc(safeUrl(p.web))}" target="_blank" rel="noopener noreferrer">${ICON.web}${p.cat === "game" ? "Tarayıcıda oyna" : "Tarayıcıda aç"}</a>` : "";
  return dls + web;
}

/* ---------- öne çıkanlar ---------- */
const FEATURED = [
  { id: "Son-Vardiya", cls: "lg", video: "sonvardiya" },
  { id: "mahalle", video: "mahalle" },
  { id: "Winterball", video: "winterball" },
  { id: "ayazle", video: "ayazle" },
  { id: "son-kis", img: "/ensdewloper.github.io/img/kapak/son-kis.png" }
];
const mosaic = document.getElementById("mosaic");
mosaic.innerHTML = FEATURED.map(f => {
  const p = byId(f.id); if (!p) return "";
  const poster = f.video ? MEDIA + f.video + ".jpg" : f.img;
  return `<article class="tile ${f.cls || ""}" data-video="${f.video ? esc(MEDIA + f.video + ".mp4") : ""}">
    <div class="media"><img src="${esc(poster)}" alt="" loading="lazy"></div>
    <div class="tile-body">
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      <div class="acts">${actions(p, 1)}</div>
    </div>
  </article>`;
}).join("");

/* önizleme videoları: masaüstünde üstüne gelince, telefonda ekranın ortasındaki oynar */
function videoOf(tile) {
  let v = tile.querySelector("video");
  if (!v && tile.dataset.video) {
    v = document.createElement("video");
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = "none";
    v.setAttribute("aria-hidden", "true");
    v.src = tile.dataset.video;
    tile.querySelector(".media").appendChild(v);
  }
  return v;
}
function play(tile) { const v = videoOf(tile); if (!v) return; v.play().then(() => tile.classList.add("playing")).catch(() => {}); }
function stop(tile) { const v = tile.querySelector("video"); if (v) v.pause(); tile.classList.remove("playing"); }
if (!REDUCE) {
  const tiles = [...mosaic.querySelectorAll(".tile[data-video]")].filter(t => t.dataset.video);
  if (HOVER) {
    tiles.forEach(t => { t.addEventListener("pointerenter", () => play(t)); t.addEventListener("pointerleave", () => stop(t)); });
  } else if ("IntersectionObserver" in window) {
    const seen = new Map();
    const io = new IntersectionObserver(es => {
      es.forEach(e => seen.set(e.target, e.intersectionRatio));
      let best = null, r = 0.6;
      seen.forEach((v, t) => { if (v >= r) { best = t; r = v; } });
      tiles.forEach(t => t === best ? play(t) : stop(t));
    }, { threshold: [0, 0.6, 0.8, 1] });
    tiles.forEach(t => io.observe(t));
  }
}

/* ---------- bütün projeler ---------- */
P.sort((a, b) => (a.id === "ensdewloper.github.io") - (b.id === "ensdewloper.github.io") || (b.dl.length > 0) - (a.dl.length > 0) || new Date(b.updated) - new Date(a.updated));
const TABS = [["all", "Hepsi"], ["game", "Oyunlar"], ["app", "Uygulamalar"], ["tool", "Windows araçları"], ["web", "Web"]];
const filters = { all: () => true, game: p => p.cat === "game", app: p => p.cat === "app", tool: p => p.cat === "tool", web: p => p.cat === "web" };
let cat = "all";
try { const s = localStorage.getItem("wd-cat"); if (s && has(filters, s)) cat = s; } catch (e) {}

const tabs = document.getElementById("tabs"), list = document.getElementById("list"), q = document.getElementById("q");
function drawTabs() {
  tabs.innerHTML = TABS.map(([k, t]) => `<button class="tab" role="tab" aria-selected="${k === cat}" data-k="${k}">${t}<span>${P.filter(filters[k]).length}</span></button>`).join("");
}
tabs.addEventListener("click", e => {
  const b = e.target.closest(".tab"); if (!b || !has(filters, b.dataset.k)) return;
  cat = b.dataset.k; try { localStorage.setItem("wd-cat", cat); } catch (e) {}
  drawTabs(); render();
});
const norm = s => s.toLocaleLowerCase("tr-TR");
function row(p) {
  return `<li class="row">
    <div class="ic" aria-hidden="true">${esc(p.icon)}</div>
    <div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      <div class="tags">${platforms(p).map(k => `<span class="tag ${esc(k)}">${esc(k)}</span>`).join("")}</div>
    </div>
    <div class="acts">${actions(p)}</div>
  </li>`;
}
function render() {
  const t = norm(q.value.trim());
  const items = P.filter(filters[cat]).filter(p => !t || norm(p.title + " " + p.desc + " " + platforms(p).join(" ")).includes(t));
  list.innerHTML = items.length ? items.map(row).join("")
    : `<li class="empty">“${esc(q.value)}” ile eşleşen proje yok. Başka bir kelime dene ya da “Hepsi” sekmesine geç.</li>`;
}
try { const s = new URLSearchParams(location.search).get("q"); if (s) { q.value = s.slice(0, 60); cat = "all"; } } catch (e) {}
q.addEventListener("input", render);
drawTabs(); render();

/* ---------- başlık her ekrana sığsın ---------- */
const titleEl = document.querySelector(".title");
function fitTitle() {
  titleEl.style.fontSize = "";
  const max = parseFloat(getComputedStyle(titleEl).fontSize);
  const spans = [...titleEl.children], stacked = getComputedStyle(spans[0]).display === "block";
  const widths = spans.map(s => { const r = document.createRange(); r.selectNodeContents(s); return r.getBoundingClientRect().width; });
  const line = stacked ? Math.max(...widths) : widths.reduce((a, b) => a + b, 0);
  const avail = Math.min(titleEl.parentElement.clientWidth, document.documentElement.clientWidth) - 40;
  if (line > avail) titleEl.style.fontSize = Math.floor(max * avail / line) + "px";
}
fitTitle();
const fontsReady = (document.fonts && document.fonts.ready) ? Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1500))]) : Promise.resolve();
fontsReady.then(fitTitle);

/* ---------- kahraman: buğulu cam ve kar ---------- */
(() => {
  const hero = document.querySelector(".hero");
  const snowC = document.getElementById("snow"), frostC = document.getElementById("frost");
  const hint = document.getElementById("hint");
  if (REDUCE) { hint.classList.add("gone"); addEventListener("resize", fitTitle); return; }
  const sx = snowC.getContext("2d"), fx = frostC.getContext("2d");
  let W = 0, H = 0, dpr = 1, flakes = [], tex = null, visible = true, wiped = 0;

  function makeTexture() {
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const g = c.getContext("2d");
    const grad = g.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "rgba(150,180,206,.62)"); grad.addColorStop(.6, "rgba(176,200,222,.6)"); grad.addColorStop(1, "rgba(200,218,234,.66)");
    g.fillStyle = grad; g.fillRect(0, 0, W, H);
    // buz kristalleri: kenarlardan içeri uzanan eğrelti desenleri
    g.strokeStyle = "rgba(255,255,255,.42)"; g.lineCap = "round";
    const fern = (x, y, a, len, w, d) => {
      if (d > 5 || len < 4) return;
      const x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len;
      g.lineWidth = w; g.beginPath(); g.moveTo(x, y); g.lineTo(x2, y2); g.stroke();
      fern(x2, y2, a + (Math.random() - .5) * .5, len * .78, w * .8, d + 1);
      if (Math.random() < .8) fern(x + (x2 - x) * .5, y + (y2 - y) * .5, a + .9, len * .45, w * .6, d + 2);
      if (Math.random() < .8) fern(x + (x2 - x) * .5, y + (y2 - y) * .5, a - .9, len * .45, w * .6, d + 2);
    };
    const n = Math.round((W + H) / (60 * dpr));
    for (let i = 0; i < n; i++) {
      const side = i % 4, r = Math.random();
      const [x, y, a] = side === 0 ? [r * W, 0, Math.PI / 2] : side === 1 ? [W, r * H, Math.PI] : side === 2 ? [r * W, H, -Math.PI / 2] : [0, r * H, 0];
      fern(x, y, a + (Math.random() - .5) * .8, (40 + Math.random() * 90) * dpr, 2.2 * dpr, 0);
    }
    // ince buğu tanecikleri
    for (let i = 0; i < W * H / (900 * dpr * dpr); i++) {
      g.fillStyle = `rgba(255,255,255,${Math.random() * .25})`;
      g.fillRect(Math.random() * W, Math.random() * H, dpr, dpr);
    }
    return c;
  }
  function fit() {
    const r = hero.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    W = Math.round(r.width * dpr); H = Math.round(r.height * dpr);
    snowC.width = frostC.width = W; snowC.height = frostC.height = H;
    tex = makeTexture();
    fx.globalCompositeOperation = "source-over"; fx.clearRect(0, 0, W, H); fx.drawImage(tex, 0, 0);
    const n = Math.round(Math.min(140, r.width / 9));
    flakes = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: (Math.random() * 1.8 + .5) * dpr, s: (Math.random() * .7 + .25) * dpr, w: Math.random() * 6.3, o: Math.random() * .5 + .35 }));
  }

  // silme fırçası
  const R = () => (W < 700 * dpr ? 34 : 48) * dpr;
  function dab(x, y) {
    const r = R(), g = fx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(0,0,0,1)"); g.addColorStop(.55, "rgba(0,0,0,.85)"); g.addColorStop(1, "rgba(0,0,0,0)");
    fx.globalCompositeOperation = "destination-out"; fx.fillStyle = g;
    fx.beginPath(); fx.arc(x, y, r, 0, 6.2832); fx.fill();
  }
  function stroke(x1, y1, x2, y2) {
    const d = Math.hypot(x2 - x1, y2 - y1), step = R() / 3, n = Math.max(1, Math.ceil(d / step));
    for (let i = 1; i <= n; i++) dab(x1 + (x2 - x1) * i / n, y1 + (y2 - y1) * i / n);
    return d;
  }

  let last = null;
  const pos = e => { const r = hero.getBoundingClientRect(); return [(e.clientX - r.left) * dpr, (e.clientY - r.top) * dpr]; };
  hero.addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse" && !e.buttons && e.pressure === 0) return;
    const [x, y] = pos(e);
    if (last) { wiped += stroke(last[0], last[1], x, y) / dpr; if (wiped > 260) hint.classList.add("gone"); } else dab(x, y);
    last = [x, y];
  });
  ["pointerleave", "pointerup", "pointercancel"].forEach(t => hero.addEventListener(t, () => { last = null; }));

  // açılış: cam buğulanır, sonra başlığın üstü kendiliğinden silinir
  function intro() {
    const el = document.querySelector(".title").getBoundingClientRect(), hr = hero.getBoundingClientRect();
    const y0 = (el.top - hr.top + el.height * .5) * dpr, x0 = (el.left - hr.left) * dpr, x1 = (el.right - hr.left) * dpr;
    const t0 = performance.now(), dur = 1300; let px = null, py = null;
    frostC.style.opacity = 0; frostC.style.transition = "opacity .9s ease"; requestAnimationFrame(() => { frostC.style.opacity = 1; });
    setTimeout(function step() {
      const k = Math.min(1, (performance.now() - t0 - 900) / dur);
      if (k > 0) {
        const e = 1 - Math.pow(1 - k, 3), x = x0 + (x1 - x0) * e, y = y0 + Math.sin(e * Math.PI * 2) * el.height * .22 * dpr;
        if (px !== null) stroke(px, py, x, y); px = x; py = y;
        // ikinci, ince bir geçiş açıklama satırının üstünden
        const ly = (document.querySelector(".lead").getBoundingClientRect().top - hr.top + 14) * dpr;
        dab(x0 + (x1 - x0) * e * .9 + (x1 - x0) * .05, ly);
      }
      if (k < 1) requestAnimationFrame(step);
    }, 0);
    setTimeout(() => hint.classList.add("gone"), 7000);
  }

  // kar yağışı ve yavaşça yeniden buğulanma
  let tick = 0;
  function frame() {
    if (visible) {
      sx.clearRect(0, 0, W, H);
      for (const p of flakes) {
        p.y += p.s; p.w += .01; p.x += Math.sin(p.w) * .35 * dpr;
        if (p.y > H) { p.y = -4; p.x = Math.random() * W; }
        sx.globalAlpha = p.o; sx.fillStyle = "#fff"; sx.beginPath(); sx.arc(p.x, p.y, p.r, 0, 6.2832); sx.fill();
      }
      if (++tick % 10 === 0) { fx.globalCompositeOperation = "source-over"; fx.globalAlpha = .012; fx.drawImage(tex, 0, 0); fx.globalAlpha = 1; }
    }
    requestAnimationFrame(frame);
  }
  if ("IntersectionObserver" in window) new IntersectionObserver(e => { visible = e[0].isIntersecting; }).observe(hero);
  document.addEventListener("visibilitychange", () => { visible = !document.hidden; });
  let rt, lastW = innerWidth; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { if (innerWidth !== lastW) { lastW = innerWidth; fitTitle(); fit(); } }, 200); });

  fit(); requestAnimationFrame(frame);
  fontsReady.then(() => { fitTitle(); intro(); });
})();
