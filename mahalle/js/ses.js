// Ses: dosya yok, her şey Web Audio ile üretiliyor (kuşlar, cırcır böcekleri, yağmur, kalem, sayfa).
const Ses = (() => {
  let ctx = null, ana = null, ortamKazanc = null, ortam = null, muzikZamanlayici = null;
  let acik = true, ortamSeviye = .6, aktifOrtam = null;

  function baslat() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return true; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    ana = ctx.createGain(); ana.gain.value = acik ? .8 : 0; ana.connect(ctx.destination);
    ortamKazanc = ctx.createGain(); ortamKazanc.gain.value = ortamSeviye; ortamKazanc.connect(ana);
    if (aktifOrtam) { const a = aktifOrtam; aktifOrtam = null; ortamCal(a); }
    return true;
  }

  function gurultu(sure = 2) {
    const b = ctx.createBuffer(1, ctx.sampleRate * sure, ctx.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }

  function zarf(g, t, a, tepe, s) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(tepe, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + s);
  }

  // ---- efektler ----
  const EFEKT = {
    kalem() { // tükenmezle tik atma: kısa sürtünme
      const t = ctx.currentTime, k = ctx.createBufferSource(); k.buffer = gurultu(.3);
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 3200; f.Q.value = 1.4;
      const g = ctx.createGain(); zarf(g, t, .01, .25, .12);
      const g2 = ctx.createGain(); g2.gain.setValueAtTime(0, t); g2.gain.setValueAtTime(1, t + .13); zarf(g2, t + .13, .01, .3, .14);
      k.connect(f); f.connect(g); g.connect(ana); k.start(t); k.stop(t + .4);
    },
    sayfa() { // sayfa çevirme
      const t = ctx.currentTime, k = ctx.createBufferSource(); k.buffer = gurultu(.6);
      const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.setValueAtTime(800, t); f.frequency.linearRampToValueAtTime(3000, t + .35);
      const g = ctx.createGain(); zarf(g, t, .06, .22, .35);
      k.connect(f); f.connect(g); g.connect(ana); k.start(t); k.stop(t + .6);
    },
    yirt() { // takvim yaprağı koparma
      const t = ctx.currentTime, k = ctx.createBufferSource(); k.buffer = gurultu(.5);
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1800; f.Q.value = .7;
      const g = ctx.createGain();
      g.gain.setValueAtTime(.0001, t);
      for (let i = 0; i < 9; i++) g.gain.setValueAtTime(.08 + Math.random() * .3, t + i * .028);
      g.gain.exponentialRampToValueAtTime(.0001, t + .32);
      k.connect(f); f.connect(g); g.connect(ana); k.start(t); k.stop(t + .5);
    },
    not() { // küçük bir zil
      const t = ctx.currentTime;
      [880, 1318].forEach((fr, i) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o.frequency.value = fr; zarf(g, t + i * .09, .01, .09, .5); o.connect(g); g.connect(ana); o.start(t + i * .09); o.stop(t + i * .09 + .6); });
    },
    flas() { // fotoğraf makinesi deklanşörü
      const t = ctx.currentTime, k = ctx.createBufferSource(); k.buffer = gurultu(.2);
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2400;
      const g = ctx.createGain(); zarf(g, t, .002, .5, .04);
      const g2 = ctx.createGain(); zarf(g2, t + .07, .002, .35, .05);
      k.connect(f); f.connect(g); g.connect(ana); f.connect(g2); g2.connect(ana); k.start(t); k.stop(t + .2);
    },
  };

  function efekt(ad) { if (!acik || !baslat() || !EFEKT[ad]) return; try { EFEKT[ad](); } catch (e) { } }

  // ---- ortam sesleri ----
  function ortamDur() {
    if (ortam) { const o = ortam; ortam = null; o.durdur(); }
  }

  function ortamCal(tur) {
    if (tur === aktifOrtam) return;
    aktifOrtam = tur;
    if (!ctx) return;
    const eski = ortam;
    if (eski) { eski.kazanc.gain.setTargetAtTime(0.0001, ctx.currentTime, .6); setTimeout(() => eski.durdur(), 2500); }
    ortam = null;
    if (!tur) return;
    const kazanc = ctx.createGain(); kazanc.gain.value = .0001; kazanc.connect(ortamKazanc);
    kazanc.gain.setTargetAtTime(1, ctx.currentTime, .8);
    const kaynaklar = [], zamanlayicilar = [];
    const o = { kazanc, durdur() { zamanlayicilar.forEach(clearInterval); kaynaklar.forEach(k => { try { k.stop(); } catch (e) { } }); kazanc.disconnect(); } };

    // her ortamın altında hafif bir şehir uğultusu
    const ug = ctx.createBufferSource(); ug.buffer = gurultu(4); ug.loop = true;
    const uf = ctx.createBiquadFilter(); uf.type = 'lowpass'; uf.frequency.value = tur === 'ic' ? 300 : 500;
    const ugK = ctx.createGain(); ugK.gain.value = tur === 'yagmur' ? .0 : .035;
    ug.connect(uf); uf.connect(ugK); ugK.connect(kazanc); ug.start(); kaynaklar.push(ug);

    if (tur === 'kus') {
      zamanlayicilar.push(setInterval(() => { if (Math.random() < .55) cik(kazanc); }, 900));
    } else if (tur === 'circir') {
      zamanlayicilar.push(setInterval(() => cirr(kazanc), 520));
    } else if (tur === 'yagmur') {
      const y = ctx.createBufferSource(); y.buffer = gurultu(4); y.loop = true;
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1400; f.Q.value = .4;
      const g = ctx.createGain(); g.gain.value = .14;
      y.connect(f); f.connect(g); g.connect(kazanc); y.start(); kaynaklar.push(y);
      zamanlayicilar.push(setInterval(() => damla(kazanc), 140));
    } else if (tur === 'karanlik') {
      zamanlayicilar.push(setInterval(() => damla(kazanc, .02), 900));
    }
    ortam = o;
  }

  function cik(hedef) { // serçe cıvıltısı
    const t = ctx.currentTime + Math.random() * .3, n = 2 + Math.floor(Math.random() * 4), taban = 3000 + Math.random() * 1800;
    for (let i = 0; i < n; i++) {
      const o = ctx.createOscillator(), g = ctx.createGain(), b = t + i * (.08 + Math.random() * .05);
      o.type = 'sine';
      o.frequency.setValueAtTime(taban, b); o.frequency.exponentialRampToValueAtTime(taban * (1.2 + Math.random() * .4), b + .05);
      zarf(g, b, .005, .025 + Math.random() * .02, .06);
      o.connect(g); g.connect(hedef); o.start(b); o.stop(b + .1);
    }
  }

  function cirr(hedef) { // cırcır böceği
    const t = ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const o = ctx.createOscillator(), g = ctx.createGain(), b = t + i * .045;
      o.type = 'triangle'; o.frequency.value = 4300 + Math.random() * 80;
      zarf(g, b, .004, .012, .03);
      o.connect(g); g.connect(hedef); o.start(b); o.stop(b + .05);
    }
  }

  function damla(hedef, tepe = .05) {
    const t = ctx.currentTime + Math.random() * .1, o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; const fr = 900 + Math.random() * 1600;
    o.frequency.setValueAtTime(fr, t); o.frequency.exponentialRampToValueAtTime(fr * .5, t + .05);
    zarf(g, t, .002, tepe * Math.random(), .05);
    o.connect(g); g.connect(hedef); o.start(t); o.stop(t + .08);
  }

  // ---- menü müziği: hicaz dizisinde küçük bir müzik kutusu ----
  const MELODI = [62, 63, 66, 67, 69, 67, 66, 63, 62, 0, 69, 70, 69, 67, 66, 67, 63, 0, 62, 66, 67, 69, 70, 72, 70, 69, 67, 66, 63, 62, 0, 0];
  function muzikCal() {
    if (!acik || !baslat() || muzikZamanlayici) return;
    let i = 0;
    const adim = () => {
      const n = MELODI[i++ % MELODI.length];
      if (n) {
        const t = ctx.currentTime, fr = 440 * Math.pow(2, (n - 69) / 12);
        [1, 2.01, 3.98].forEach((c, j) => {
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.type = 'sine'; o.frequency.value = fr * c;
          zarf(g, t, .004, [.07, .025, .01][j], 1.6 - j * .4);
          o.connect(g); g.connect(ana); o.start(t); o.stop(t + 2);
        });
      }
    };
    adim(); muzikZamanlayici = setInterval(adim, 420);
  }
  function muzikDur() { clearInterval(muzikZamanlayici); muzikZamanlayici = null; }

  function ayarla({ ses, ortam: o }) {
    if (ses !== undefined) { acik = ses; if (ana) ana.gain.setTargetAtTime(acik ? .8 : 0, ctx.currentTime, .1); if (!acik) muzikDur(); }
    if (o !== undefined) { ortamSeviye = o; if (ortamKazanc) ortamKazanc.gain.setTargetAtTime(o, ctx.currentTime, .1); }
  }

  return { baslat, efekt, ortamCal, ortamDur, muzikCal, muzikDur, ayarla };
})();
