/* Ortak duyuru betiği: iki site de bunu yükler.
   Duyurular /duyurular.json'dan gelir; admin paneli (/admin/) bu dosyayı yazar.

   Kullanım:
     <link rel="stylesheet" href="/duyuru.css">
     <script src="/duyuru.js" data-site="winterdeveloper" defer></script>
   Kart biçimindeki duyurular sayfada <div id="duyurular"></div> varsa oraya çizilir.

   bicim: "kart"  -> sayfadaki duyurular bölümünde
          "bant"  -> sayfanın en üstünde, kapatılabilir şerit
          "popup" -> açılışta bir kez çıkan pencere                                  */
(function () {
  "use strict";
  var bu = document.currentScript;
  var SITE = (bu && bu.dataset.site) || "";
  var KAPALI = "wd-duyuru-kapali";

  function kapatilanlar() {
    try { return JSON.parse(localStorage.getItem(KAPALI)) || []; } catch (e) { return []; }
  }
  function kapat(id) {
    try {
      var l = kapatilanlar();
      if (l.indexOf(id) < 0) l.push(id);
      localStorage.setItem(KAPALI, JSON.stringify(l.slice(-100)));
    } catch (e) {}
  }

  function el(etiket, sinif, metin) {
    var e = document.createElement(etiket);
    if (sinif) e.className = sinif;
    if (metin != null) e.textContent = metin;
    return e;
  }
  function baglanti(d, sinif) {
    if (!d.link || !/^(https?:\/\/|\/|#)/.test(d.link)) return null;
    var a = el("a", sinif, d.linkMetni || "Ayrıntılar");
    a.href = d.link;
    return a;
  }
  function tarihYaz(t) {
    var g = new Date(t);
    return isNaN(g) ? "" : g.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  }

  function gecerli(d, simdi) {
    if (d.aktif === false) return false;
    if (!d.siteler || d.siteler.indexOf(SITE) < 0) return false;
    if (d.baslangic && new Date(d.baslangic) > simdi) return false;
    if (d.bitis && new Date(d.bitis + "T23:59:59") < simdi) return false;
    return true;
  }

  function bantlar(liste) {
    var kapali = kapatilanlar();
    liste.filter(function (d) { return kapali.indexOf(d.id) < 0; }).reverse().forEach(function (d) {
      var b = el("div", "wd-bant wd-" + (d.renk || "buz"));
      b.setAttribute("role", "status");
      var ic = el("div", "wd-bant-ic");
      if (d.baslik) ic.appendChild(el("b", null, d.baslik));
      if (d.metin) ic.appendChild(el("span", null, d.metin));
      var a = baglanti(d, "wd-bant-link");
      if (a) ic.appendChild(a);
      var x = el("button", "wd-kapat", "×");
      x.type = "button";
      x.setAttribute("aria-label", "Duyuruyu kapat");
      x.addEventListener("click", function () { kapat(d.id); b.remove(); });
      b.appendChild(ic);
      b.appendChild(x);
      document.body.insertBefore(b, document.body.firstChild);
    });
  }

  function popup(liste) {
    var kapali = kapatilanlar();
    var d = liste.filter(function (d) { return kapali.indexOf(d.id) < 0; })[0];
    if (!d) return;
    var perde = el("div", "wd-perde");
    var kutu = el("div", "wd-popup");
    kutu.setAttribute("role", "dialog");
    kutu.setAttribute("aria-modal", "true");
    kutu.setAttribute("aria-label", d.baslik || "Duyuru");
    if (d.baslik) kutu.appendChild(el("h2", null, d.baslik));
    if (d.metin) kutu.appendChild(el("p", null, d.metin));
    var alt = el("div", "wd-popup-alt");
    var a = baglanti(d, "wd-dugme wd-dugme-ana");
    if (a) alt.appendChild(a);
    var tamam = el("button", "wd-dugme", "Kapat");
    tamam.type = "button";
    alt.appendChild(tamam);
    kutu.appendChild(alt);
    perde.appendChild(kutu);
    function bitir() { kapat(d.id); perde.remove(); document.removeEventListener("keydown", tus); }
    function tus(e) { if (e.key === "Escape") bitir(); }
    tamam.addEventListener("click", bitir);
    if (a) a.addEventListener("click", function () { kapat(d.id); });
    perde.addEventListener("click", function (e) { if (e.target === perde) bitir(); });
    document.addEventListener("keydown", tus);

    // ENS Developer sitesinin giriş animasyonu bitmeden açma
    var bekle = 0;
    (function goster() {
      if (document.getElementById("giris") && bekle++ < 20) return setTimeout(goster, 400);
      document.body.appendChild(perde);
      tamam.focus();
    })();
  }

  function kartlar(liste) {
    var yer = document.getElementById("duyurular");
    if (!yer || !liste.length) return;
    var bolum = yer.closest("[data-duyuru-bolum]");
    var ul = el("ul", "wd-kartlar");
    liste.forEach(function (d) {
      var li = el("li", "wd-kart" + (d.sabit ? " wd-sabit" : ""));
      var tarih = el("time", "wd-tarih", tarihYaz(d.tarih));
      tarih.dateTime = d.tarih || "";
      li.appendChild(tarih);
      if (d.baslik) li.appendChild(el("h3", null, d.baslik));
      if (d.metin) li.appendChild(el("p", null, d.metin));
      var a = baglanti(d, "wd-kart-link");
      if (a) li.appendChild(a);
      ul.appendChild(li);
    });
    yer.appendChild(ul);
    if (bolum) bolum.hidden = false;
  }

  function basla(veri) {
    var simdi = new Date();
    var hepsi = (veri && veri.duyurular || []).filter(function (d) { return gecerli(d, simdi); });
    hepsi.sort(function (a, b) {
      return (b.sabit ? 1 : 0) - (a.sabit ? 1 : 0) || String(b.tarih).localeCompare(String(a.tarih));
    });
    function bicim(b) { return hepsi.filter(function (d) { return (d.bicim || "kart") === b; }); }
    bantlar(bicim("bant"));
    kartlar(bicim("kart"));
    popup(bicim("popup"));
  }

  // GitHub Pages dosyaları ~10 dk önbellekte tutar; dakikalık sürüm eki bunu aşar
  var surum = Math.floor(Date.now() / 60000);
  fetch("/duyurular.json?v=" + surum, { cache: "no-store" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (veri) {
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { basla(veri); });
      else basla(veri);
    })
    .catch(function () {});
})();
