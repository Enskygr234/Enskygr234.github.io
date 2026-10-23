/*! kar.js v1.0 — web sayfana tek satırla kar yağdır. MIT © Winterdeveloper */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Kar = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var VARSAYILAN = {
    adet: 150,        // ekrandaki kar tanesi sayısı
    hiz: 1,           // düşme hızı çarpanı
    ruzgar: 0.3,      // -3 (sola) ... 3 (sağa)
    renk: '#ffffff',  // kar rengi
    enKucuk: 1,       // en küçük tane yarıçapı (px)
    enBuyuk: 3.6,     // en büyük tane yarıçapı (px)
    fare: true,       // taneler imleçten kaçsın mı
    hedef: null,      // bir element verirsen yalnızca onun içine yağar
    zIndex: 9999,
    zorla: false      // "hareketi azalt" ayarı açık olsa bile yağdır
  };

  function birlestir(a, b) {
    var c = {}, k;
    for (k in a) c[k] = a[k];
    for (k in b || {}) if (b[k] !== undefined) c[k] = b[k];
    return c;
  }

  function Yagis(ayar) {
    this.ayar = birlestir(VARSAYILAN, ayar);
    this.taneler = [];
    this.calisiyor = false;
    this.fareX = -9999;
    this.fareY = -9999;
    this._zaman = 0;
    this._kare = null;
    this._kur();
  }

  Yagis.prototype._kur = function () {
    var ben = this, a = this.ayar;
    var tuval = document.createElement('canvas');
    var hedef = a.hedef;
    tuval.setAttribute('aria-hidden', 'true');
    tuval.style.cssText = 'pointer-events:none;top:0;left:0;width:100%;height:100%;z-index:' + a.zIndex +
      ';position:' + (hedef ? 'absolute' : 'fixed');
    if (hedef && getComputedStyle(hedef).position === 'static') hedef.style.position = 'relative';
    (hedef || document.body).appendChild(tuval);
    this.tuval = tuval;
    this.cizim = tuval.getContext('2d');

    this._boyutla = function () {
      var oran = Math.min(window.devicePixelRatio || 1, 2);
      var kutu = hedef ? hedef.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
      ben.en = kutu.width;
      ben.boy = kutu.height;
      tuval.width = Math.round(ben.en * oran);
      tuval.height = Math.round(ben.boy * oran);
      ben.cizim.setTransform(oran, 0, 0, oran, 0, 0);
    };
    this._fare = function (e) {
      var kutu = tuval.getBoundingClientRect();
      ben.fareX = e.clientX - kutu.left;
      ben.fareY = e.clientY - kutu.top;
    };
    this._fareCikti = function () { ben.fareX = ben.fareY = -9999; };
    this._gorunurluk = function () {
      if (document.hidden) ben._bekle();
      else if (ben.calisiyor) ben._dongu();
    };

    window.addEventListener('resize', this._boyutla);
    window.addEventListener('pointermove', this._fare, { passive: true });
    document.addEventListener('pointerleave', this._fareCikti);
    document.addEventListener('visibilitychange', this._gorunurluk);

    this._boyutla();
    this._doldur();
  };

  Yagis.prototype._yeniTane = function (ustten) {
    var a = this.ayar;
    var derinlik = Math.random();               // 0 = uzak, 1 = yakın
    return {
      x: Math.random() * this.en,
      y: ustten ? -10 - Math.random() * 40 : Math.random() * this.boy,
      r: a.enKucuk + (a.enBuyuk - a.enKucuk) * derinlik,
      d: derinlik,
      faz: Math.random() * Math.PI * 2,
      salinim: 0.4 + Math.random() * 0.9,
      itX: 0,
      itY: 0
    };
  };

  Yagis.prototype._doldur = function () {
    var hedefAdet = Math.max(0, Math.round(this.ayar.adet));
    while (this.taneler.length < hedefAdet) this.taneler.push(this._yeniTane(false));
    this.taneler.length = hedefAdet;
  };

  Yagis.prototype._adim = function (dt) {
    var a = this.ayar, c = this.cizim, t, i, dx, dy, uzaklik, guc;
    this._zaman += dt;
    // rüzgâr sabit esmesin: yavaşça kabarıp dinen bir esinti ekle
    var esinti = a.ruzgar + Math.sin(this._zaman * 0.35) * 0.25 * (Math.abs(a.ruzgar) + 0.4);

    c.clearRect(0, 0, this.en, this.boy);
    c.fillStyle = a.renk;

    for (i = 0; i < this.taneler.length; i++) {
      t = this.taneler[i];
      t.faz += dt * t.salinim;

      if (a.fare) {
        dx = t.x - this.fareX;
        dy = t.y - this.fareY;
        uzaklik = dx * dx + dy * dy;
        if (uzaklik < 8100 && uzaklik > 0.01) {       // 90 px içindeyse it
          uzaklik = Math.sqrt(uzaklik);
          guc = (1 - uzaklik / 90) * 260 * dt;
          t.itX += (dx / uzaklik) * guc;
          t.itY += (dy / uzaklik) * guc;
        }
      }
      t.itX *= 0.92;
      t.itY *= 0.92;

      t.x += (esinti * 40 * (0.4 + t.d) + Math.sin(t.faz) * 14) * dt + t.itX;
      t.y += (28 + t.d * 62) * a.hiz * dt + t.itY;

      if (t.y - t.r > this.boy) { this.taneler[i] = t = this._yeniTane(true); }
      if (t.x < -12) t.x = this.en + 10;
      else if (t.x > this.en + 12) t.x = -10;

      c.globalAlpha = 0.35 + t.d * 0.6;
      c.beginPath();
      c.arc(t.x, t.y, t.r, 0, 6.2832);
      c.fill();
    }
    c.globalAlpha = 1;
  };

  Yagis.prototype._dongu = function () {
    var ben = this, onceki = null;
    if (this._kare !== null) return;
    function kare(simdi) {
      var dt = onceki === null ? 0.016 : Math.min((simdi - onceki) / 1000, 0.05);
      onceki = simdi;
      ben._adim(dt);
      ben._kare = requestAnimationFrame(kare);
    }
    this._kare = requestAnimationFrame(kare);
  };

  Yagis.prototype._bekle = function () {
    if (this._kare !== null) cancelAnimationFrame(this._kare);
    this._kare = null;
  };

  /** Yağışı başlatır ya da kaldığı yerden sürdürür. */
  Yagis.prototype.devam = function () {
    this.calisiyor = true;
    if (!document.hidden) this._dongu();
    return this;
  };

  /** Yağışı dondurur; taneler ekranda kalır. */
  Yagis.prototype.durdur = function () {
    this.calisiyor = false;
    this._bekle();
    return this;
  };

  /** Ayarları çalışırken değiştirir: kar.ayarla({ adet: 300, ruzgar: -1 }) */
  Yagis.prototype.ayarla = function (yeni) {
    var eskiEnKucuk = this.ayar.enKucuk, eskiEnBuyuk = this.ayar.enBuyuk, i, t;
    this.ayar = birlestir(this.ayar, yeni);
    if (this.ayar.enKucuk !== eskiEnKucuk || this.ayar.enBuyuk !== eskiEnBuyuk) {
      for (i = 0; i < this.taneler.length; i++) {
        t = this.taneler[i];
        t.r = this.ayar.enKucuk + (this.ayar.enBuyuk - this.ayar.enKucuk) * t.d;
      }
    }
    this.tuval.style.zIndex = this.ayar.zIndex;
    this._doldur();
    return this;
  };

  /** Her şeyi söker: tuvali ve olay dinleyicilerini kaldırır. */
  Yagis.prototype.kaldir = function () {
    this.durdur();
    window.removeEventListener('resize', this._boyutla);
    window.removeEventListener('pointermove', this._fare);
    document.removeEventListener('pointerleave', this._fareCikti);
    document.removeEventListener('visibilitychange', this._gorunurluk);
    if (this.tuval.parentNode) this.tuval.parentNode.removeChild(this.tuval);
    this.taneler = [];
  };

  var Kar = {
    surum: '1.0.0',
    varsayilan: VARSAYILAN,
    /** Kar yağdırmaya başlar ve yağışı yöneten nesneyi döndürür. */
    baslat: function (ayar) {
      var yagis = new Yagis(ayar);
      var azalt = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (azalt && !yagis.ayar.zorla) yagis._adim(0);   // tek kare çiz, hareket ettirme
      else yagis.devam();
      return yagis;
    }
  };

  // <script src="kar.js" data-kar></script> yazınca kendiliğinden başlar.
  // Ayarlar da öznitelikten okunur: data-adet="300" data-ruzgar="-1" data-renk="#cde"
  if (typeof document !== 'undefined') {
    var betik = document.currentScript;
    if (betik && betik.hasAttribute('data-kar')) {
      var oku = function () {
        var v = betik.dataset, ayar = {};
        ['adet', 'hiz', 'ruzgar', 'enKucuk', 'enBuyuk', 'zIndex'].forEach(function (k) {
          if (v[k] !== undefined && v[k] !== '' && !isNaN(+v[k])) ayar[k] = +v[k];
        });
        if (v.renk) ayar.renk = v.renk;
        if (v.fare !== undefined) ayar.fare = v.fare !== 'false';
        Kar.otomatik = Kar.baslat(ayar);
      };
      if (document.body) oku();
      else document.addEventListener('DOMContentLoaded', oku);
    }
  }

  return Kar;
});
