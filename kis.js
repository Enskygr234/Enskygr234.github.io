"use strict";
/* WinterDeveloper — "Kuzey Gecesi": vitrin, raflar, kayan bant, komut paleti, yüzen dock, etkileşimli kar */
(() => {
  const P = Array.isArray(window.P) ? window.P : [];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!REDUCE) document.documentElement.classList.add("motion");
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byId = id => P.find(p => p.id === id);

  const CAT = { game: "Oyun", app: "Uygulama", tool: "Windows aracı", web: "Web" };
  const SHELF = [
    { cat: "game", title: "Oyunlar" }, { cat: "app", title: "Android uygulamaları" },
    { cat: "tool", title: "Windows araçları" }, { cat: "web", title: "Web projeleri" }
  ];
  const GLOW = { game: "rgba(110,231,168,.55)", app: "rgba(185,168,255,.6)", tool: "rgba(255,176,112,.55)", web: "rgba(124,200,255,.55)" };
  const ART = {
    game: ["#d3f3e2", "#9fdcbc"], app: ["#e6e0ff", "#c2b4ff"], tool: ["#ffe6cf", "#ffbf87"], web: ["#dceafc", "#a8c7f1"]
  };

  // kapak görselleri ve video önizlemeleri (eski sitedekiyle aynı dosyalar)
  const IMG = "/ensdewloper.github.io/img/", MEDIA = IMG + "video/";
  const COVER = {
    "Winterball": ["video/winterball.jpg", "winterball"], "mahalle": ["video/mahalle.jpg", "mahalle"],
    "ayazle": ["video/ayazle.jpg", "ayazle"], "Son-Vardiya": ["video/sonvardiya.jpg", "sonvardiya"],
    "Son-Tren": ["video/sontren.jpg", "sontren"], "buz-kirici": ["video/buzkirici.jpg", "buzkirici"],
    "kar-birlestir": ["video/karbirlestir.jpg", "karbirlestir"], "golhaber": ["video/golhaber.jpg", "golhaber"],
    "Winter-gym": ["video/wintergym.jpg", "wintergym"], "ensdewloper.github.io": ["video/tarifler.jpg", "tarifler"],
    "kayip-fener": ["kapak/kayip-fener.png"], "son-kis": ["kapak/son-kis.png"],
    "Ayaz-launcher": ["kapak/ayaz-launcher.png"], "FloatingDock": ["kapak/floating-dock.jpg"], "buz-arsiv": ["kapak/buz-arsiv.png"]
  };
  // tarayıcıda açılan projelerin ekran görüntüleri (img/kapak/<id>.jpg)
  const SHOTS = new Set(["Nobet-ecza", "mont-al", "oyuncu-merkez", "kizak", "xox-oyunu", "kur-ayazi", "kar-js", "nardugan", "kar-tanesi",
    "piksel-ayaz", "buz-sifre", "sifre-uretici", "wintercle", "pomodoro-zamanlayici", "gorev-listesi", "harcama-takip"]);
  const coverOf = p => COVER[p.id] ? { img: IMG + COVER[p.id][0], video: COVER[p.id][1] ? MEDIA + COVER[p.id][1] + ".mp4" : "" }
    : SHOTS.has(p.id) ? { img: "/img/kapak/" + p.id + ".jpg", video: "" } : null;

  const ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    dl: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-5-5m5 5 5-5M5 20h14"/></svg>',
    gh: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 7-5 5 5 5m8-10 5 5-5 5"/></svg>'
  };
  const fmtMb = mb => mb > 0 ? String(mb.toFixed(1)).replace(".", ",") + " MB" : "";
  const dlLabel = d => d.kind === "Android" ? "Android" : d.kind === "Windows" ? "Windows" : d.kind || "İndir";
  const repo = p => "https://github.com/Enskygr234/" + encodeURIComponent(p.id);

  /** Bir projenin eylem düğmeleri: tarayıcıda aç, indir (en fazla 2), yoksa kaynak kod. */
  function actions(p, max = 2) {
    const out = [];
    if (p.web) out.push(`<a class="btn sm line" href="${esc(p.web)}">${ICON.play}${p.cat === "game" ? "Oyna" : "Aç"}</a>`);
    for (const d of (p.dl || []).slice(0, max - out.length + 1)) {
      if (out.length >= max) break;
      const mb = fmtMb(d.mb);
      out.push(`<a class="btn sm ${out.length ? "line" : "aur"}" href="${esc(d.url)}">${ICON.dl}${esc(dlLabel(d))}${mb ? ` <small>${mb}</small>` : ""}</a>`);
    }
    if (!out.length) out.push(`<a class="btn sm line" href="${repo(p)}" target="_blank" rel="noopener noreferrer">${ICON.gh}Kaynak kod</a>`);
    return `<div class="acts">${out.join("")}</div>`;
  }
  /** Paletten Enter'a basınca gidilecek tek adres. */
  const primary = p => p.web || (p.dl && p.dl[0] && p.dl[0].url) || repo(p);

  // ---------- sayaçlar ----------
  const counts = { all: P.length };
  P.forEach(p => counts[p.cat] = (counts[p.cat] || 0) + 1);
  $$("[data-count]").forEach(el => {
    const to = counts[el.dataset.count] || 0;
    if (REDUCE) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 1400;
    const step = t => { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 4))); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
  const yil = $("#yil"); if (yil) yil.textContent = new Date().getFullYear();

  // ---------- kayan bant ----------
  const names = [...P].sort((a, b) => (b.updated || "").localeCompare(a.updated || ""));
  const mqHtml = list => list.map(p => `<span class="mq-item"><i class="${esc(p.cat)}"></i>${esc(p.title)}</span>`).join("");
  const half = Math.ceil(names.length / 2);
  [["#mq1", names.slice(0, half)], ["#mq2", names.slice(half)]].forEach(([sel, list]) => {
    const t = $(sel); if (!t) return;
    t.innerHTML = mqHtml(list);
    t.parentElement.appendChild(t.cloneNode(true)); // kesintisiz döngü için ikinci kopya
  });

  // ---------- vitrin (bento) ----------
  const BENTO = [["Son-Vardiya", "big"], ["mahalle", ""], ["Winterball", ""], ["ayazle", ""], ["buz-kirici", ""]];
  const bento = $("#bento");
  if (bento) {
    bento.innerHTML = BENTO.map(([id, size]) => {
      const p = byId(id); if (!p) return "";
      const c = coverOf(p);
      return `<article class="tile rv ${size}" data-cat="${esc(p.cat)}"${c && c.video ? ` data-video="${esc(c.video)}"` : ""}>
        <div class="media">${c ? `<img src="${esc(c.img)}" alt="" loading="lazy" decoding="async">` : ""}</div>
        ${c && c.video ? '<span class="live"><i></i>Önizleme</span>' : ""}
        <div class="tile-in"><span class="chip ${esc(p.cat)}">${CAT[p.cat] || ""}</span><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>${actions(p)}</div>
      </article>`;
    }).join("");
    $$(".tile", bento).forEach(t => t.style.setProperty("--glow", GLOW[t.dataset.cat] || GLOW.web));
  }

  // ---------- raflar ----------
  const shelves = $("#shelves");
  const card = p => {
    const c = coverOf(p);
    return `<li class="pc" data-cat="${esc(p.cat)}" data-id="${esc(p.id)}"${c && c.video ? ` data-video="${esc(c.video)}"` : ""}>
      <a class="pc-cover" href="${esc(primary(p))}" tabindex="-1" aria-hidden="true"${p.web ? "" : ' target="_blank" rel="noopener noreferrer"'}>${c ? `<img src="${esc(c.img)}" alt="" loading="lazy" decoding="async">` : `<span class="art"><span>${esc(p.icon || "❄")}</span></span>`}</a>
      <div class="pc-body"><span class="chip ${esc(p.cat)}">${CAT[p.cat] || ""}</span><h4>${esc(p.title)}</h4><p>${esc(p.desc)}</p>${actions(p)}</div>
    </li>`;
  };
  if (shelves) {
    shelves.innerHTML = SHELF.map(s => {
      const list = P.filter(p => p.cat === s.cat);
      if (!list.length) return "";
      return `<section class="shelf rv" aria-label="${esc(s.title)}">
        <div class="shelf-head"><h3><i class="${s.cat}"></i>${esc(s.title)}</h3><span class="cnt">${list.length} proje</span>
          <div class="shelf-nav"><button type="button" data-dir="-1" aria-label="${esc(s.title)}: geri"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>
          <button type="button" data-dir="1" aria-label="${esc(s.title)}: ileri"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button></div></div>
        <ul class="rail">${list.map(card).join("")}</ul>
      </section>`;
    }).join("");
    $$(".shelf-head h3 i", shelves).forEach(i => i.style.background = `var(--${i.className})`);
    $$(".pc", shelves).forEach(el => {
      el.style.setProperty("--hc", GLOW[el.dataset.cat]);
      const a = ART[el.dataset.cat]; const art = $(".art", el);
      if (a && art) art.style.setProperty("--art", `linear-gradient(135deg,${a[0]},${a[1]})`);
    });
    $$(".shelf", shelves).forEach(sh => {
      const rail = $(".rail", sh), [prev, next] = $$(".shelf-nav button", sh);
      const sync = () => { prev.disabled = rail.scrollLeft < 8; next.disabled = rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8; };
      rail.addEventListener("scroll", sync, { passive: true }); addEventListener("resize", sync); sync();
      [prev, next].forEach(b => b.addEventListener("click", () => rail.scrollBy({ left: +b.dataset.dir * rail.clientWidth * .85, behavior: REDUCE ? "auto" : "smooth" })));
      // fareyle tutup sürükleyerek kaydırma
      if (FINE) {
        let down = false, sx = 0, sl = 0, moved = false;
        rail.addEventListener("pointerdown", e => { if (e.button) return; down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft; });
        addEventListener("pointermove", e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 5) { moved = true; rail.style.scrollSnapType = "none"; rail.scrollLeft = sl - dx; } });
        addEventListener("pointerup", () => { if (!down) return; down = false; rail.style.scrollSnapType = ""; });
        rail.addEventListener("click", e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
      }
    });
  }

  // ---------- üzerine gelince video önizleme ----------
  function hookVideo(el, holderSel) {
    if (!el.dataset.video || !FINE || REDUCE) return;
    el.addEventListener("pointerenter", () => {
      let v = $("video", el);
      if (!v) {
        v = document.createElement("video");
        v.muted = true; v.loop = true; v.playsInline = true; v.preload = "none"; v.setAttribute("aria-hidden", "true");
        v.src = el.dataset.video;
        $(holderSel, el).appendChild(v);
      }
      v.play().then(() => el.classList.add("playing")).catch(() => {});
    });
    el.addEventListener("pointerleave", () => { const v = $("video", el); if (v) v.pause(); el.classList.remove("playing"); });
  }
  $$(".tile").forEach(t => hookVideo(t, ".media"));
  $$(".pc").forEach(c => hookVideo(c, ".pc-cover"));

  // ---------- görünüme girince belir ----------
  if (!REDUCE && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.remove("pre"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px" });
    $$(".rv").forEach((el, i) => {
      if (el.getBoundingClientRect().top < innerHeight) return; // ilk ekranda görünenler hiç gizlenmez
      el.classList.add("pre");
      el.style.transitionDelay = (i % 5) * 70 + "ms";
      io.observe(el);
    });
  }

  // ---------- üst çubuk + dock'ta etkin bölüm ----------
  const bar = $(".bar");
  const onScroll = () => bar && bar.classList.toggle("solid", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const dockLinks = $$(".dock a[href^='#']");
  if ("IntersectionObserver" in window) {
    const so = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      dockLinks.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    ["ust", "vitrin", "floatingdock", "raflar"].forEach(id => { const s = document.getElementById(id); if (s) so.observe(s); });
  }

  // ---------- yüzen dock: macOS tarzı büyüme ----------
  const dock = $("#dock");
  if (dock && FINE && !REDUCE) {
    const items = $$("a,button", dock);
    dock.addEventListener("pointermove", e => {
      items.forEach(it => {
        const r = it.getBoundingClientRect(), d = e.clientX - (r.left + r.width / 2);
        it.style.setProperty("--s", (1 + .45 * Math.exp(-(d * d) / (2 * 60 * 60))).toFixed(3));
      });
    });
    dock.addEventListener("pointerleave", () => items.forEach(it => it.style.setProperty("--s", 1)));
  }

  // ---------- Ayaz düğmeleri ----------
  document.addEventListener("click", e => {
    if (!e.target.closest("[data-ayaz]")) return;
    const fab = $(".ai-fab"); if (fab) fab.click();
  });

  // ---------- komut paleti ----------
  const pal = $("#palette"), pq = $("#pq"), plist = $("#plist");
  let hits = [], sel = 0;
  const tr = s => s.toLocaleLowerCase("tr-TR");
  function score(p, q) {
    const t = tr(p.title), d = tr(p.desc || ""), c = tr(CAT[p.cat] || "");
    if (t.startsWith(q)) return 0;
    if (t.split(/[\s\-.]/).some(w => w.startsWith(q))) return 1;
    if (t.includes(q)) return 2;
    if (c.includes(q)) return 3;
    if (d.includes(q)) return 4;
    return 99;
  }
  function drawPalette() {
    const q = tr(pq.value.trim());
    hits = q ? P.map(p => [p, score(p, q)]).filter(x => x[1] < 99).sort((a, b) => a[1] - b[1]).map(x => x[0]) : names.slice(0, 8);
    sel = 0;
    plist.innerHTML = hits.length ? hits.slice(0, 12).map((p, i) => {
      const c = coverOf(p);
      return `<li role="option" aria-selected="${i === 0}"><a href="${esc(primary(p))}"${p.web ? "" : ' target="_blank" rel="noopener noreferrer"'}>
        <span class="pal-ic">${c ? `<img src="${esc(c.img)}" alt="" loading="lazy">` : esc(p.icon || "❄")}</span>
        <span class="pal-t"><b>${esc(p.title)}</b><small>${esc(p.desc)}</small></span><span class="chip ${esc(p.cat)}">${CAT[p.cat] || ""}</span></a></li>`;
    }).join("") : `<li class="pal-empty">"${esc(pq.value)}" için sonuç yok. Ayaz'a sormayı dene.</li>`;
  }
  function mark() { $$("li[role=option]", plist).forEach((li, i) => { li.setAttribute("aria-selected", i === sel); if (i === sel) li.scrollIntoView({ block: "nearest" }); }); }
  function openPalette(q = "") {
    if (!pal || pal.open) return;
    pq.value = q; drawPalette();
    pal.showModal(); pq.focus();
  }
  if (pal) {
    pq.addEventListener("input", drawPalette);
    pq.addEventListener("keydown", e => {
      const n = Math.min(hits.length, 12);
      if (e.key === "ArrowDown") { sel = (sel + 1) % Math.max(n, 1); mark(); e.preventDefault(); }
      else if (e.key === "ArrowUp") { sel = (sel - 1 + n) % Math.max(n, 1); mark(); e.preventDefault(); }
      else if (e.key === "Enter") { const a = $$("li[role=option] a", plist)[sel]; if (a) { e.preventDefault(); pal.close(); a.click(); } }
    });
    pal.addEventListener("click", e => { if (e.target === pal) pal.close(); if (e.target.closest("a")) pal.close(); });
    document.addEventListener("click", e => { if (e.target.closest("[data-palette]")) openPalette(); });
    addEventListener("keydown", e => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName);
      if ((e.key === "/" && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) { e.preventDefault(); openPalette(); }
    });
    // ?q=... ile gelen arama (site arama kutusu ve ld+json SearchAction)
    const q0 = new URLSearchParams(location.search).get("q");
    if (q0) openPalette(q0);
  }

  // ---------- başlıkta fener: imleç kuzey ışığını aydınlatır ----------
  const mega = $(".mega");
  if (mega && FINE && !REDUCE) {
    let raf = 0, mx = 0, my = 0;
    addEventListener("pointermove", e => {
      mx = e.clientX; my = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = mega.getBoundingClientRect();
        mega.style.setProperty("--x", (mx - r.left) + "px");
        mega.style.setProperty("--y", (my - r.top) + "px");
      });
    }, { passive: true });
  } else if (mega) mega.style.setProperty("--x", "-999px");

  // ---------- etkileşimli kar: imleç yaklaşınca taneler kaçışır ----------
  const cv = $("#kar");
  if (cv && !REDUCE) {
    const ctx = cv.getContext("2d");
    let W = 0, H = 0, dpr = 1, flakes = [], px = -9999, py = -9999, run = true;
    const make = () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.8 + .5, vy: Math.random() * .5 + .25, vx: 0, s: Math.random() * Math.PI * 2, o: Math.random() * .5 + .35 });
    const size = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(220, W * H / 7000));
      flakes = Array.from({ length: n }, make);
    };
    size(); addEventListener("resize", size);
    const hero = $(".hero");
    hero.addEventListener("pointermove", e => { const r = cv.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top; }, { passive: true });
    hero.addEventListener("pointerleave", () => { px = py = -9999; });
    new IntersectionObserver(es => { run = es[0].isIntersecting; if (run) requestAnimationFrame(tick); }).observe(hero);
    function tick() {
      if (!run) return;
      ctx.clearRect(0, 0, W, H);
      for (const f of flakes) {
        const dx = f.x - px, dy = f.y - py, d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120) { const d = Math.sqrt(d2) || 1, k = (120 - d) / 120 * 1.6; f.vx += dx / d * k; f.y += dy / d * k; }
        f.vx *= .92; f.s += .01;
        f.x += f.vx + Math.sin(f.s) * .35; f.y += f.vy;
        if (f.y > H + 5) { f.y = -5; f.x = Math.random() * W; }
        if (f.x < -5) f.x = W + 5; else if (f.x > W + 5) f.x = -5;
        ctx.globalAlpha = f.o; ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283); ctx.fillStyle = "#9fb4d8"; ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
})();
