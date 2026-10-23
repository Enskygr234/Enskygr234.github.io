// Bütün sesler WebAudio ile anında üretilir; hiç ses dosyası yok.
export class Ses {
  constructor() { this.ctx = null; this.acik = true; this.hiz = 0; this.hava = 'gece'; this._sonTak = 0; this._mesafe = 0; }

  baslat() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    const c = this.ctx = new AC();
    this.ana = c.createGain(); this.ana.gain.value = this.acik ? .9 : 0; this.ana.connect(c.destination);
    // gürültü tamponları
    const uz = c.sampleRate * 2;
    const beyaz = c.createBuffer(1, uz, c.sampleRate), kahve = c.createBuffer(1, uz, c.sampleRate);
    const b = beyaz.getChannelData(0), k = kahve.getChannelData(0); let son = 0;
    for (let i = 0; i < uz; i++) { const w = Math.random() * 2 - 1; b[i] = w; son = (son + .02 * w) / 1.02; k[i] = son * 3.5; }
    this.beyaz = beyaz; this.kahve = kahve;
    const dongu = (buf, ...filtreler) => { const s = c.createBufferSource(); s.buffer = buf; s.loop = true; let n = s; for (const f of filtreler) { n.connect(f); n = f; } s.start(); return n; };
    // tren uğultusu
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 180;
    this.ugultu = c.createGain(); this.ugultu.gain.value = 0;
    dongu(kahve, lp, this.ugultu).connect(this.ana);
    // rüzgar
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 500; bp.Q.value = .6; this.ruzgarF = bp;
    this.ruzgar = c.createGain(); this.ruzgar.gain.value = 0;
    dongu(beyaz, bp, this.ruzgar).connect(this.ana);
    // yağmur
    const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 2500;
    this.yagmur = c.createGain(); this.yagmur.gain.value = 0;
    dongu(beyaz, hp, this.yagmur).connect(this.ana);
    // dalga
    const dl = c.createBiquadFilter(); dl.type = 'lowpass'; dl.frequency.value = 600;
    this.dalga = c.createGain(); this.dalga.gain.value = 0;
    dongu(kahve, dl, this.dalga).connect(this.ana);
    this.muzikGain = c.createGain(); this.muzikGain.gain.value = 0; this.muzikGain.connect(this.ana);
    this._kus = 0;
  }

  sesAc(v) { this.acik = v; if (this.ana) this.ana.gain.setTargetAtTime(v ? .9 : 0, this.ctx.currentTime, .1); }

  guncelle(dt, hiz, zaman) {
    const c = this.ctx; if (!c) return;
    const t = c.currentTime, h = this.hava;
    const v = Math.min(1, hiz / 14);
    this.ugultu.gain.setTargetAtTime(.08 + v * .3, t, .3);
    this.ruzgarF.frequency.setTargetAtTime(380 + Math.sin(zaman * .3) * 160 + v * 200, t, .5);
    this.ruzgar.gain.setTargetAtTime((h === 'kar' ? .13 : h === 'gece' ? .07 : h === 'deniz' ? .04 : .02) * (.4 + v * .6), t, .5);
    this.yagmur.gain.setTargetAtTime(h === 'yagmur' ? .07 : 0, t, .5);
    this.dalga.gain.setTargetAtTime(h === 'deniz' ? .18 + Math.sin(zaman * .7) * .12 : 0, t, .3);
    // ray tıkırtısı: her 13 metrede bir "tak-tak"
    this._mesafe += hiz * dt;
    if (this._mesafe > 13) { this._mesafe = 0; this.tak(.12 + v * .15); setTimeout(() => this.tak(.1 + v * .12), 110); }
    if (h === 'safak') { this._kus -= dt; if (this._kus < 0) { this._kus = 1.5 + Math.random() * 4; this.kus(); } }
  }

  _zarf(g, t, a, peak, dus) { g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(.0001, t + a + dus); }

  tak(guc = .2) {
    const c = this.ctx; if (!c) return; const t = c.currentTime;
    const s = c.createBufferSource(); s.buffer = this.beyaz; const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 900 + Math.random() * 300; f.Q.value = 2;
    const g = c.createGain(); this._zarf(g, t, .003, guc, .08); s.connect(f); f.connect(g); g.connect(this.ana); s.start(t, Math.random()); s.stop(t + .15);
    const o = c.createOscillator(); o.frequency.value = 70; const g2 = c.createGain(); this._zarf(g2, t, .003, guc * .8, .12); o.connect(g2); g2.connect(this.ana); o.start(t); o.stop(t + .15);
  }

  blip(f = 660) {
    const c = this.ctx; if (!c) return; const t = c.currentTime;
    const o = c.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * 1.3, t + .06);
    const g = c.createGain(); this._zarf(g, t, .005, .06, .12); o.connect(g); g.connect(this.ana); o.start(t); o.stop(t + .2);
  }

  esya() { [523, 659, 784].forEach((f, i) => setTimeout(() => this.blip(f), i * 90)); }

  zil() {
    const c = this.ctx; if (!c) return; const t = c.currentTime;
    for (let n = 0; n < 2; n++) for (const [f, a] of [[880, .12], [1320, .05], [2210, .03]]) {
      const o = c.createOscillator(); o.frequency.value = f * (n ? .84 : 1); const g = c.createGain(); this._zarf(g, t + n * .45, .005, a, 1.6);
      o.connect(g); g.connect(this.ana); o.start(t + n * .45); o.stop(t + n * .45 + 1.8);
    }
  }

  kapi() {
    const c = this.ctx; if (!c) return; const t = c.currentTime;
    const s = c.createBufferSource(); s.buffer = this.beyaz; const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.setValueAtTime(300, t); f.frequency.linearRampToValueAtTime(1200, t + .35); f.Q.value = 1.2;
    const g = c.createGain(); this._zarf(g, t, .05, .1, .4); s.connect(f); f.connect(g); g.connect(this.ana); s.start(t); s.stop(t + .5);
  }

  tiktak(sayi = 6) {
    const c = this.ctx; if (!c) return; const t = c.currentTime;
    for (let i = 0; i < sayi; i++) {
      const o = c.createOscillator(); o.type = 'square'; o.frequency.value = i % 2 ? 2400 : 3000;
      const g = c.createGain(); this._zarf(g, t + i * .5, .001, .03, .025); o.connect(g); g.connect(this.ana); o.start(t + i * .5); o.stop(t + i * .5 + .05);
    }
  }

  miyav(pan = 0, ses = 1) {
    const c = this.ctx; if (!c) return; const t = c.currentTime;
    const o = c.createOscillator(); o.type = 'sawtooth';
    o.frequency.setValueAtTime(520, t); o.frequency.linearRampToValueAtTime(820, t + .18); o.frequency.linearRampToValueAtTime(480, t + .55);
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 3; f.frequency.setValueAtTime(900, t); f.frequency.linearRampToValueAtTime(1800, t + .2); f.frequency.linearRampToValueAtTime(800, t + .55);
    const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.16 * ses, t + .06); g.gain.linearRampToValueAtTime(.12 * ses, t + .4); g.gain.linearRampToValueAtTime(0, t + .6);
    const p = c.createStereoPanner ? c.createStereoPanner() : null;
    o.connect(f); f.connect(g); if (p) { p.pan.value = Math.max(-1, Math.min(1, pan)); g.connect(p); p.connect(this.ana); } else g.connect(this.ana);
    o.start(t); o.stop(t + .65);
  }

  kus() {
    const c = this.ctx; if (!c) return; const t = c.currentTime; const n = 2 + Math.floor(Math.random() * 3), f0 = 2600 + Math.random() * 1200;
    for (let i = 0; i < n; i++) {
      const o = c.createOscillator(); const st = t + i * .13;
      o.frequency.setValueAtTime(f0, st); o.frequency.exponentialRampToValueAtTime(f0 * 1.4, st + .06); o.frequency.exponentialRampToValueAtTime(f0 * .9, st + .1);
      const g = c.createGain(); this._zarf(g, st, .01, .025, .1); o.connect(g); g.connect(this.ana); o.start(st); o.stop(st + .14);
    }
  }

  kalp() {
    const c = this.ctx; if (!c) return; const t = c.currentTime;
    for (let i = 0; i < 3; i++) { const o = c.createOscillator(); o.frequency.value = 988; const g = c.createGain(); this._zarf(g, t + i * 1.1, .005, .05, .25); o.connect(g); g.connect(this.ana); o.start(t + i * 1.1); o.stop(t + i * 1.1 + .3); }
  }

  // yumuşak akor dizisi (başlık ve anılar için)
  muzik(acik) {
    const c = this.ctx; if (!c) return;
    this.muzikGain.gain.setTargetAtTime(acik ? .5 : 0, c.currentTime, 1.2);
    if (acik && !this._muzikZaman) {
      const akorlar = [[220, 261.6, 329.6], [174.6, 220, 261.6], [196, 246.9, 293.7], [164.8, 196, 246.9]];
      let i = 0;
      const cal = () => {
        const t = c.currentTime;
        for (const f of akorlar[i % 4]) for (const kat of [1, 2]) {
          const o = c.createOscillator(); o.type = 'triangle'; o.frequency.value = f * kat;
          const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(kat === 1 ? .05 : .015, t + 1.2); g.gain.linearRampToValueAtTime(0, t + 4.4);
          o.connect(g); g.connect(this.muzikGain); o.start(t); o.stop(t + 4.5);
        }
        const melodi = akorlar[i % 4][Math.floor(Math.random() * 3)] * 2;
        const o = c.createOscillator(); o.frequency.value = melodi; const g = c.createGain(); this._zarf(g, t + 1 + Math.random(), .02, .04, 2.2);
        o.connect(g); g.connect(this.muzikGain); o.start(t + .9); o.stop(t + 4.4);
        i++;
      };
      cal(); this._muzikZaman = setInterval(cal, 4000);
    } else if (!acik && this._muzikZaman) { clearInterval(this._muzikZaman); this._muzikZaman = null; }
  }
}
