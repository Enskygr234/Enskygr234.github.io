(() => {
  "use strict";

  // ---------- i18n ----------
  const STRINGS = {
    tr: {
      focus: "Odak", short: "Kısa mola", long: "Uzun mola",
      start: "Başla", pause: "Durdur", resume: "Devam",
      reset: "Sıfırla", sound: "Ortam sesi",
      done: "tamamlanan oturum", settings: "Ayarlar",
      focusMin: "Odak (dk)", shortMin: "Kısa mola (dk)", longMin: "Uzun mola (dk)",
      snow: "Kar yoğunluğu",
      hint: "Boşluk: başlat/durdur · R: sıfırla · S: ses",
      notifyFocus: "Odak bitti — biraz mola ver ❄",
      notifyBreak: "Mola bitti — odaklanma zamanı",
    },
    en: {
      focus: "Focus", short: "Short break", long: "Long break",
      start: "Start", pause: "Pause", resume: "Resume",
      reset: "Reset", sound: "Ambient sound",
      done: "sessions completed", settings: "Settings",
      focusMin: "Focus (min)", shortMin: "Short break (min)", longMin: "Long break (min)",
      snow: "Snow density",
      hint: "Space: start/pause · R: reset · S: sound",
      notifyFocus: "Focus done — take a break ❄",
      notifyBreak: "Break over — time to focus",
    },
  };

  // ---------- storage (safe) ----------
  const KEY = "wintercle:v1";
  const load = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
  };
  const saved = load();
  const state = {
    lang: saved.lang || ((navigator.language || "").startsWith("tr") ? "tr" : "en"),
    minutes: Object.assign({ focus: 25, short: 5, long: 15 }, saved.minutes),
    snow: saved.snow ?? 160,
    count: saved.count || 0,
    mode: "focus",
    remaining: 0,
    total: 0,
    running: false,
    endAt: 0,
    sound: false,
  };
  const persist = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        lang: state.lang, minutes: state.minutes, snow: state.snow, count: state.count,
      }));
    } catch { /* storage unavailable */ }
  };

  const $ = (id) => document.getElementById(id);
  const t = (k) => STRINGS[state.lang][k];

  // ---------- timer ----------
  const progress = $("progress");
  const R = 100;
  const CIRC = 2 * Math.PI * R;
  progress.style.strokeDasharray = CIRC;

  const fmt = (s) => {
    s = Math.max(0, Math.ceil(s));
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  };

  function setMode(mode) {
    state.mode = mode;
    state.running = false;
    state.total = state.minutes[mode] * 60;
    state.remaining = state.total;
    document.body.classList.toggle("break", mode !== "focus");
    document.querySelectorAll(".mode").forEach((b) =>
      b.classList.toggle("active", b.dataset.mode === mode));
    render();
  }

  function render() {
    const time = fmt(state.remaining);
    $("time").textContent = time;
    $("label").textContent = t(state.mode);
    const frac = state.total ? state.remaining / state.total : 0;
    progress.style.strokeDashoffset = CIRC * (1 - frac);
    const toggle = $("toggle");
    toggle.textContent = state.running ? t("pause")
      : state.remaining < state.total ? t("resume") : t("start");
    $("count").textContent = state.count;
    $("sound").textContent = state.sound ? "🔊" : "🔇";
    document.title = state.running ? `${time} · Wintercle` : "Wintercle";
  }

  function start() {
    if (state.remaining <= 0) return;
    state.running = true;
    state.endAt = performance.now() + state.remaining * 1000;
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
    render();
  }

  function pause() {
    state.running = false;
    render();
  }

  function tick() {
    if (state.running) {
      state.remaining = (state.endAt - performance.now()) / 1000;
      if (state.remaining <= 0) finish();
      render();
    }
  }
  setInterval(tick, 250);

  function finish() {
    state.running = false;
    state.remaining = 0;
    chime();
    const wasFocus = state.mode === "focus";
    notify(wasFocus ? t("notifyFocus") : t("notifyBreak"));
    if (wasFocus) {
      state.count++;
      persist();
      setMode(state.count % 4 === 0 ? "long" : "short");
    } else {
      setMode("focus");
    }
  }

  function notify(msg) {
    try {
      if ("Notification" in window && Notification.permission === "granted" && document.hidden) {
        new Notification("Wintercle", { body: msg });
      }
    } catch { /* ignore */ }
  }

  // ---------- audio (generated, no files) ----------
  let ctx = null;
  let windGain = null;

  function ensureAudio() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();

    // Brown noise -> lowpass with slow LFO = soft winter wind
    const len = ctx.sampleRate * 4;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      data[i] = last * 3.5;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 500;

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 300;
    lfo.connect(lfoGain).connect(filter.frequency);

    windGain = ctx.createGain();
    windGain.gain.value = 0;
    src.connect(filter).connect(windGain).connect(ctx.destination);
    src.start();
    lfo.start();
    return ctx;
  }

  function toggleSound() {
    if (!ensureAudio()) return;
    ctx.resume();
    state.sound = !state.sound;
    windGain.gain.setTargetAtTime(state.sound ? 0.35 : 0, ctx.currentTime, 0.6);
    render();
  }

  function chime() {
    if (!ensureAudio()) return;
    ctx.resume();
    const now = ctx.currentTime;
    [880, 1318.5, 1760].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0, now + i * 0.18);
      g.gain.linearRampToValueAtTime(0.18, now + i * 0.18 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.18 + 1.6);
      o.connect(g).connect(ctx.destination);
      o.start(now + i * 0.18);
      o.stop(now + i * 0.18 + 1.7);
    });
  }

  // ---------- snow ----------
  const canvas = $("snow");
  const c2d = canvas.getContext("2d");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let flakes = [];
  let W = 0, H = 0, dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    c2d.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const makeFlake = (y) => {
    const z = Math.random();
    return {
      x: Math.random() * W,
      y: y ?? Math.random() * H,
      r: 0.6 + z * 2.4,
      vy: 0.3 + z * 1.2,
      phase: Math.random() * Math.PI * 2,
      sway: 0.3 + Math.random() * 0.8,
      a: 0.35 + z * 0.6,
    };
  };

  function syncFlakes() {
    const target = Math.round(state.snow * (W * H) / (1280 * 800));
    while (flakes.length < target) flakes.push(makeFlake());
    flakes.length = Math.min(flakes.length, target);
  }

  let t0 = performance.now();
  function frame(now) {
    const dt = Math.min((now - t0) / 16.67, 3);
    t0 = now;
    c2d.clearRect(0, 0, W, H);
    c2d.fillStyle = "#fff";
    const speed = reduced ? 0.25 : 1;
    for (const f of flakes) {
      f.y += f.vy * dt * speed;
      f.phase += 0.01 * dt;
      f.x += Math.sin(f.phase) * f.sway * 0.5 * dt * speed;
      if (f.y > H + 5) Object.assign(f, makeFlake(-5));
      if (f.x > W + 5) f.x = -5; else if (f.x < -5) f.x = W + 5;
      c2d.globalAlpha = f.a;
      c2d.beginPath();
      c2d.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      c2d.fill();
    }
    c2d.globalAlpha = 1;
    requestAnimationFrame(frame);
  }

  // ---------- i18n apply ----------
  function applyLang() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => { el.title = t(el.dataset.i18nTitle); });
    $("lang").textContent = state.lang === "tr" ? "EN" : "TR";
    render();
  }

  // ---------- wiring ----------
  $("toggle").addEventListener("click", () => (state.running ? pause() : start()));
  $("reset").addEventListener("click", () => setMode(state.mode));
  $("sound").addEventListener("click", toggleSound);
  $("lang").addEventListener("click", () => {
    state.lang = state.lang === "tr" ? "en" : "tr";
    persist();
    applyLang();
  });
  document.querySelectorAll(".mode").forEach((b) =>
    b.addEventListener("click", () => setMode(b.dataset.mode)));

  for (const m of ["focus", "short", "long"]) {
    const input = $(`${m}Min`);
    input.value = state.minutes[m];
    input.addEventListener("change", () => {
      const v = Math.max(1, Math.min(120, parseInt(input.value, 10) || state.minutes[m]));
      input.value = v;
      state.minutes[m] = v;
      persist();
      if (state.mode === m && !state.running) setMode(m);
    });
  }

  const snowInput = $("snowLevel");
  snowInput.value = state.snow;
  snowInput.addEventListener("input", () => {
    state.snow = +snowInput.value;
    syncFlakes();
    persist();
  });

  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.code === "Space") {
      if (["BUTTON", "SUMMARY"].includes(e.target.tagName)) return; // native activation
      e.preventDefault();
      state.running ? pause() : start();
    }
    else if (e.key === "r" || e.key === "R") setMode(state.mode);
    else if (e.key === "s" || e.key === "S") toggleSound();
  });

  window.addEventListener("resize", () => { resize(); syncFlakes(); });

  // ---------- boot ----------
  resize();
  syncFlakes();
  setMode("focus");
  applyLang();
  requestAnimationFrame(frame);
})();
