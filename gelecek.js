"use strict";
/* WinterDeveloper — "2060" teması: HUD saati, imleci izleyen ışık, hero paralaks */
(() => {
  const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const HOVER = matchMedia("(hover: hover)").matches;

  // HUD saati: bugünün tarihi, ama yıl 2060
  const t = document.getElementById("hudTime");
  if (t) {
    const p = n => String(n).padStart(2, "0");
    const tick = () => {
      const d = new Date();
      t.textContent = `${p(d.getDate())}.${p(d.getMonth() + 1)}.2060 · ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    };
    tick(); setInterval(tick, 1000);
  }

  if (REDUCE || !HOVER) return;

  // imleci izleyen yumuşak ışık
  const glow = document.createElement("div");
  glow.className = "cursor-glow"; glow.setAttribute("aria-hidden", "true");
  document.body.prepend(glow);
  const hero = document.querySelector(".hero");
  let x = -999, y = -999, raf = 0;
  addEventListener("pointermove", e => {
    x = e.clientX; y = e.clientY;
    if (!raf) raf = requestAnimationFrame(() => {
      raf = 0;
      glow.style.setProperty("--cx", x + "px");
      glow.style.setProperty("--cy", y + "px");
      if (hero && y < hero.offsetHeight) {
        hero.style.setProperty("--px", (x / innerWidth - .5).toFixed(3));
        hero.style.setProperty("--py", (y / innerHeight - .5).toFixed(3));
      }
    });
  }, { passive: true });
  document.addEventListener("pointerleave", () => { glow.style.setProperty("--cx", "-999px"); });
})();
