/*! kartanesi.js v1.0 — her metinden kendine özgü bir kar tanesi (SVG). MIT © Winterdeveloper */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.KarTanesi = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var KOL = 100;   // bir kolun uzunluğu; çizim -125..125 karesine sığar

  // Metni 32 bitlik sayıya çevirir (xmur3), sonra o sayıdan tekrarlanabilir
  // rastgele sayılar üretir (mulberry32). Aynı metin hep aynı taneyi verir.
  function rastgele(metin) {
    var h = 1779033703 ^ metin.length, i;
    for (i = 0; i < metin.length; i++) {
      h = Math.imul(h ^ metin.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    var a = (h ^ (h >>> 16)) >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function s(n) { return (Math.round(n * 100) / 100).toString(); }

  // Tek bir kolun (yukarı bakan) yolunu üretir; tane bunun 6 kez döndürülmüşüdür.
  function kolYolu(r) {
    var d = [], i;
    var arasi = function (a, b) { return a + (b - a) * r(); };
    var cizgi = function (x1, y1, x2, y2) { d.push('M' + s(x1) + ' ' + s(y1) + 'L' + s(x2) + ' ' + s(y2)); };
    // iki yana simetrik çizgi
    var cift = function (x1, y1, x2, y2) { cizgi(x1, y1, x2, y2); cizgi(-x1, y1, -x2, y2); };

    var govde = KOL * arasi(0.82, 1);
    cizgi(0, 0, 0, -govde);

    // dallar
    var dalSayisi = 2 + Math.floor(r() * 4);          // 2..5
    var aci = arasi(38, 66) * Math.PI / 180;
    var bicim = Math.floor(r() * 3);                  // 0: uca doğru kısalır, 1: uzar, 2: ortası şişkin
    var enUzun = arasi(0.2, 0.42) * KOL;
    var filiz = r() < 0.45;
    var ilk = arasi(0.22, 0.36), son = arasi(0.72, 0.9);
    for (i = 0; i < dalSayisi; i++) {
      var k = dalSayisi === 1 ? 0.5 : i / (dalSayisi - 1);
      var t = ilk + (son - ilk) * k;
      var oran = bicim === 0 ? 1 - 0.65 * k : bicim === 1 ? 0.4 + 0.6 * k : 0.45 + 0.55 * Math.sin(Math.PI * k);
      var boy = enUzun * oran;
      var y0 = -govde * t;
      var ux = Math.sin(aci) * boy, uy = y0 - Math.cos(aci) * boy;
      cift(0, y0, ux, uy);
      if (filiz && boy > KOL * 0.16) {
        // dalın ortasından gövdeye paralel küçük bir filiz
        var fx = ux * 0.55, fy = y0 + (uy - y0) * 0.55;
        cift(fx, fy, fx, fy - boy * 0.38);
      }
    }

    // komşu kolla birleşen halka: altı kolda birleşince altıgen olur
    var halka = r();
    if (halka < 0.55) {
      var hr = govde * arasi(0.16, 0.34);
      cizgi(0, -hr, hr * Math.sin(Math.PI / 3), -hr * Math.cos(Math.PI / 3));
      if (halka < 0.2) {
        var hr2 = hr * arasi(0.45, 0.7);
        cizgi(0, -hr2, hr2 * Math.sin(Math.PI / 3), -hr2 * Math.cos(Math.PI / 3));
      }
    }

    // uç süsü
    var uc = Math.floor(r() * 4);
    var b = KOL * arasi(0.05, 0.09);
    if (uc === 1) {                                    // çatal
      cift(0, -govde, b * 1.3, -govde - b * 1.5);
    } else if (uc === 2) {                             // baklava
      d.push('M0 ' + s(-govde + b) + 'L' + s(b * 0.8) + ' ' + s(-govde) + 'L0 ' + s(-govde - b) +
        'L' + s(-b * 0.8) + ' ' + s(-govde) + 'Z');
    } else if (uc === 3) {                             // ok başı
      cift(0, -govde, b * 1.2, -govde + b * 1.4);
    }
    return d.join('');
  }

  /**
   * Verilen metinden bir kar tanesi üretir ve SVG metni olarak döndürür.
   * secenek: { boyut: 512, renk: '#bfe6ff', arkaplan: null, kalinlik: null }
   */
  function uret(metin, secenek) {
    secenek = secenek || {};
    metin = String(metin === undefined || metin === null ? '' : metin);
    var r = rastgele(metin);
    var boyut = secenek.boyut || 512;
    var renk = secenek.renk || '#bfe6ff';
    var yol = kolYolu(r);
    var kalinlik = secenek.kalinlik || s(3 + r() * 3.5);
    var cikti = '<svg xmlns="http://www.w3.org/2000/svg" width="' + boyut + '" height="' + boyut +
      '" viewBox="-125 -125 250 250" role="img"><title>' + kacis(metin) + '</title>';
    if (secenek.arkaplan) cikti += '<rect x="-125" y="-125" width="250" height="250" fill="' + kacis(secenek.arkaplan) + '"/>';
    cikti += '<g fill="none" stroke="' + kacis(renk) + '" stroke-width="' + kalinlik +
      '" stroke-linecap="round" stroke-linejoin="round">';
    for (var i = 0; i < 6; i++) cikti += '<path transform="rotate(' + i * 60 + ')" d="' + yol + '"/>';
    return cikti + '</g></svg>';
  }

  function kacis(m) {
    return String(m).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  return { surum: '1.0.0', uret: uret };
});
