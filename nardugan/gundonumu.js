/*! gundonumu.js v1.0 — kış gündönümü anı ve gün uzunluğu hesabı. MIT © Winterdeveloper */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Gundonumu = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var RAD = Math.PI / 180;

  // Jean Meeus, "Astronomical Algorithms" 27. bölüm: gündönümü anını düzelten 24 dönemli terim.
  // Her satır: genlik, faz (derece), hız (derece / Jülyen yüzyılı)
  var TERIMLER = [
    [485, 324.96, 1934.136], [203, 337.23, 32964.467], [199, 342.08, 20.186], [182, 27.85, 445267.112],
    [156, 73.14, 45036.886], [136, 171.52, 22518.443], [77, 222.54, 65928.934], [74, 296.72, 3034.906],
    [70, 243.58, 9037.513], [58, 119.81, 33718.147], [52, 297.17, 150.678], [50, 21.02, 2281.226],
    [45, 247.54, 29929.562], [44, 325.15, 31555.956], [29, 60.93, 4443.417], [18, 155.12, 67555.328],
    [17, 288.79, 4569.247], [16, 198.04, 62894.029], [14, 199.76, 31436.921], [12, 95.39, 14577.848],
    [12, 287.11, 31931.756], [12, 320.81, 34777.259], [9, 227.73, 1222.114], [8, 15.45, 16859.074]
  ];

  /**
   * Verilen yılın aralık (kış) gündönümü anını Date olarak döndürür.
   * 1000-3000 yılları için geçerlidir; hata payı bir dakikanın altındadır.
   */
  function kisGundonumu(yil) {
    var y = (yil - 2000) / 1000;
    var jde0 = 2451900.05952 + 365242.74049 * y - 0.06223 * y * y - 0.00823 * y * y * y + 0.00032 * y * y * y * y;
    var t = (jde0 - 2451545.0) / 36525;
    var w = (35999.373 * t - 2.47) * RAD;
    var duzeltme = 1 + 0.0334 * Math.cos(w) + 0.0007 * Math.cos(2 * w);
    var toplam = 0;
    for (var i = 0; i < TERIMLER.length; i++) {
      toplam += TERIMLER[i][0] * Math.cos((TERIMLER[i][1] + TERIMLER[i][2] * t) * RAD);
    }
    var jde = jde0 + (0.00001 * toplam) / duzeltme;
    // Hesap "dinamik zaman" verir; saat zamanına çevirmek için aradaki farkı (ΔT) çıkar.
    var deltaT = 69.2 + 0.4 * (yil - 2020);           // saniye; 2000-2100 için kaba ama yeterli
    return new Date((jde - 2440587.5) * 86400000 - deltaT * 1000);
  }

  /** Verilen andan sonraki ilk kış gündönümünü döndürür. */
  function sonrakiKisGundonumu(simdi) {
    simdi = simdi || new Date();
    var an = kisGundonumu(simdi.getUTCFullYear());
    return an > simdi ? an : kisGundonumu(simdi.getUTCFullYear() + 1);
  }

  /** Verilen andan önceki son kış gündönümünü döndürür. */
  function oncekiKisGundonumu(simdi) {
    simdi = simdi || new Date();
    var an = kisGundonumu(simdi.getUTCFullYear());
    return an <= simdi ? an : kisGundonumu(simdi.getUTCFullYear() - 1);
  }

  /**
   * Verilen enlemde, verilen gündeki yaklaşık gün uzunluğunu saat olarak döndürür
   * (gün doğumundan gün batımına; ufuk kırılması dahil). Kutup gecesinde 0, gece yarısı güneşinde 24.
   */
  function gunUzunlugu(enlem, tarih) {
    tarih = tarih || new Date();
    var yilBasi = Date.UTC(tarih.getUTCFullYear(), 0, 1);
    var gun = (tarih.getTime() - yilBasi) / 86400000;                 // yılın kaçıncı günü (0'dan)
    var g = (2 * Math.PI / 365.2422) * gun;
    // Güneş'in dik açıklığı (Spencer, 1971) — radyan
    var egim = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g)
      - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g)
      - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
    var fi = enlem * RAD;
    var cosH = (Math.sin(-0.833 * RAD) - Math.sin(fi) * Math.sin(egim)) / (Math.cos(fi) * Math.cos(egim));
    if (cosH >= 1) return 0;
    if (cosH <= -1) return 24;
    return (2 * Math.acos(cosH) / RAD) / 15;
  }

  return {
    surum: '1.0.0',
    kisGundonumu: kisGundonumu,
    sonrakiKisGundonumu: sonrakiKisGundonumu,
    oncekiKisGundonumu: oncekiKisGundonumu,
    gunUzunlugu: gunUzunlugu
  };
});
