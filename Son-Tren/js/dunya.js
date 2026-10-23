// Tren vagonları ve dışarıdan akan dünya.
// Koordinatlar: tren x ekseni boyunca uzanır. Yakın duvar (z = +1.6) kesik, kamera +z tarafından bakar.
// Uzak duvar (z = -1.6) pencereli; dışarısı z < -1.6 tarafında akar.
import * as THREE from '../lib/three.module.js';
import { Toplayici, tohumlu, yaziDokusu } from './yardimci.js';

export const KORIDOR_Z = 0.85;
export const SINIR = { min: -9.4, max: 30.3 };
export const W1 = { x0: -10, x1: 10, bolmeler: [-8, -4, 0, 4, 8] };
export const W2 = { x0: 11, x1: 31, bolmeler: [13, 17, 21, 25] };
const TAVAN = 2.55;

const RENK = {
  ahsap: '#6e4a2f', ahsapKoyu: '#4b301f', panel: '#7b5236', krem: '#eadcc0', kadife: '#2f5a4a', kadifeKoyu: '#244537',
  pirinc: '#c99a45', zemin: '#5a3b26', hali: '#7a2630', haliKenar: '#a8873c', govde: '#6d1b22', koyu: '#26262c', beyaz: '#f3efe6',
};

// ---------------------------------------------------------------- vagonlar
export function treniKur(sahne) {
  const t = new Toplayici();
  const etkilesim = [];   // tıklanabilir nesneler
  const oturak = {};      // isim → { x, z, yon }
  const kapilar = {};
  const anim = { tekerler: [] };

  for (const W of [W1, W2]) {
    const L = W.x1 - W.x0, cx = (W.x0 + W.x1) / 2;
    // zemin, halı
    t.kutu(L, .12, 3.3, cx, -.06, 0, RENK.zemin);
    t.kutu(L - .2, .02, .9, cx, .01, KORIDOR_Z, RENK.hali);
    t.kutu(L - .2, .021, .05, cx, .012, KORIDOR_Z - .45, RENK.haliKenar);
    t.kutu(L - .2, .021, .05, cx, .012, KORIDOR_Z + .45, RENK.haliKenar);
    // tavan ve çatı
    t.kutu(L, .08, 3.3, cx, TAVAN + .04, 0, RENK.krem);
    t.kutu(L + .1, .18, 3.5, cx, TAVAN + .2, 0, RENK.govde);
    t.silindir(.18, .18, L + .1, cx, TAVAN + .2, 1.72, RENK.govde, 8, 0, 0, Math.PI / 2);
    t.silindir(.18, .18, L + .1, cx, TAVAN + .2, -1.72, RENK.govde, 8, 0, 0, Math.PI / 2);
    t.kutu(L - .4, .1, .5, cx, TAVAN + .34, 0, '#4f1418');
    // alt şasi
    t.kutu(L, .45, 3.0, cx, -.36, 0, RENK.koyu);
    t.kutu(L + .1, .1, 3.4, cx, -.16, 0, RENK.govde);
    t.kutu(L + .1, .05, .04, cx, -.11, 1.71, RENK.krem);
    // uzak duvar: pencereli
    const pencereler = W.bolmeler;
    t.kutu(L, 1.0, .12, cx, .5, -1.62, RENK.panel);
    t.kutu(L, .04, .14, cx, 1.0, -1.6, RENK.pirinc);
    t.kutu(L, .55, .12, cx, 2.28, -1.62, RENK.krem);
    let x = W.x0;
    for (const p of pencereler) {
      const sol = p - .95, sag = p + .95;
      if (sol > x) t.kutu(sol - x, 1.0, .12, (x + sol) / 2, 1.5, -1.62, RENK.krem);
      // çerçeve
      t.kutu(1.94, .07, .16, p, 1.0, -1.58, RENK.ahsapKoyu);
      t.kutu(1.94, .07, .16, p, 2.0, -1.58, RENK.ahsapKoyu);
      t.kutu(.07, 1.0, .16, sol, 1.5, -1.58, RENK.ahsapKoyu);
      t.kutu(.07, 1.0, .16, sag, 1.5, -1.58, RENK.ahsapKoyu);
      t.kutu(1.9, .05, .22, p, .97, -1.52, RENK.ahsap); // pencere pervazı
      // perde
      t.kutu(.3, 1.05, .05, sol + .2, 1.5, -1.5, '#8a2d34');
      t.kutu(.3, 1.05, .05, sag - .2, 1.5, -1.5, '#8a2d34');
      x = sag;
    }
    if (W.x1 > x) t.kutu(W.x1 - x, 1.0, .12, (x + W.x1) / 2, 1.5, -1.62, RENK.krem);
    // uç duvarlar ve kapı boşlukları (koridor hizasında)
    for (const ux of [W.x0, W.x1]) {
      t.kutu(.12, TAVAN, 2.05, ux, TAVAN / 2, -.58, RENK.panel);
      t.kutu(.12, .55, .9, ux, 2.28, KORIDOR_Z, RENK.panel);
      t.kutu(.12, TAVAN, .3, ux, TAVAN / 2, 1.5, RENK.panel);
      t.kutu(.16, .06, 1.0, ux, 2.0, KORIDOR_Z, RENK.pirinc);
    }
    // tavan lambası yuvaları, raflar
    for (const p of pencereler) {
      t.kutu(.5, .05, .3, p, TAVAN - .03, -.4, RENK.pirinc);
      // bagaj rafı
      t.kutu(3.4, .03, .45, p, 2.12, -1.33, RENK.pirinc);
      t.silindir(.015, .015, 3.4, p, 2.12, -1.1, RENK.pirinc, 6, 0, 0, Math.PI / 2);
      for (const dx of [-1.6, 1.6]) t.kutu(.03, .3, .03, p + dx, 2.27, -1.12, RENK.pirinc);
    }
    // bojiler ve tekerler (yakın taraftaki tekerler görünür, dönenler ayrı ağ)
    for (const bx of [W.x0 + 3.2, W.x1 - 3.2]) {
      t.kutu(2.4, .3, 2.6, bx, -.7, 0, '#1b1b1f');
      t.kutu(2.6, .12, .12, bx, -.72, 1.25, '#3a3a40');
      for (const dx of [-.8, .8]) anim.tekerler.push({ x: bx + dx });
    }
  }

  // ---------- yolcu vagonu koltukları
  const koltuk = (ax, yon, z0 = -1.5, z1 = -.12) => {
    const d = z1 - z0, zc = (z0 + z1) / 2;
    t.kutu(.62, .42, d, ax, .21, zc, RENK.ahsapKoyu);
    t.kutu(.6, .14, d, ax, .48, zc, RENK.kadife);
    t.kutu(.16, .78, d, ax - yon * .32, .9, zc, RENK.kadife);
    t.kutu(.2, .1, d, ax - yon * .32, 1.32, zc, RENK.kadifeKoyu);
    t.kutu(.62, .05, .08, ax, .62, z1 + .02, RENK.ahsap);
    t.kutu(.05, .2, .08, ax + yon * .26, .55, z1 + .02, RENK.ahsap);
  };
  W1.bolmeler.forEach((c, i) => {
    koltuk(c - 1.25, 1); koltuk(c + 1.25, -1);
    t.kutu(.7, .05, .5, c, .74, -1.32, RENK.ahsap);
    t.kutu(.06, .7, .06, c, .38, -1.32, RENK.ahsapKoyu);
    oturak[`w1_${i}_sol`] = { x: c - 1.2, z: -.55, yon: 1 };
    oturak[`w1_${i}_sag`] = { x: c + 1.2, z: -.55, yon: -1 };
    oturak[`w1_${i}_sol_pencere`] = { x: c - 1.2, z: -1.15, yon: 1 };
    oturak[`w1_${i}_sag_pencere`] = { x: c + 1.2, z: -1.15, yon: -1 };
  });

  // ---------- yemekli vagon masaları ve büfe
  W2.bolmeler.forEach((c, i) => {
    t.kutu(1.0, .05, 1.0, c, .76, -1.05, RENK.beyaz);
    t.kutu(1.04, .16, 1.04, c, .7, -1.05, '#e9e2d4');
    t.kutu(.08, .72, .08, c, .37, -1.05, RENK.ahsapKoyu);
    for (const yon of [1, -1]) {
      const ax = c - yon * .95;
      t.kutu(.55, .4, 1.1, ax, .2, -1.0, RENK.ahsapKoyu);
      t.kutu(.52, .12, 1.1, ax, .46, -1.0, '#7a2a30');
      t.kutu(.14, .7, 1.1, ax - yon * .28, .85, -1.0, '#7a2a30');
    }
    // çay bardakları, peçetelik
    t.silindir(.035, .028, .09, c - .2, .83, -1.2, '#d97a3a');
    t.silindir(.035, .028, .09, c + .22, .83, -.9, '#d97a3a');
    t.kutu(.08, .1, .05, c + .3, .83, -1.35, '#ddd');
    oturak[`w2_${i}_sol`] = { x: c - .95, z: -.75, yon: 1 };
    oturak[`w2_${i}_sag`] = { x: c + .95, z: -.75, yon: -1 };
  });
  // büfe
  t.kutu(2.6, .95, .7, 29.3, .47, -1.1, RENK.ahsap);
  t.kutu(2.7, .06, .78, 29.3, .97, -1.1, RENK.pirinc);
  for (const y of [1.35, 1.75]) t.kutu(2.5, .04, .3, 29.3, y, -1.42, RENK.ahsapKoyu);
  for (let i = 0; i < 9; i++) t.silindir(.06, .06, .1, 28.2 + i * .26, 1.42, -1.42, ['#c0392b', '#d9a441', '#3a7bd5'][i % 3], 10);
  for (let i = 0; i < 7; i++) t.silindir(.07, .07, .18, 28.3 + i * .32, 1.86, -1.42, ['#5a8a5a', '#8a5a3a'][i % 2], 8);
  // semaver
  t.silindir(.16, .2, .45, 28.4, 1.2, -1.15, '#c9a14a', 12); t.kure(.1, 28.4, 1.48, -1.15, '#c9a14a'); t.silindir(.08, .12, .15, 28.4, 1.58, -1.15, '#d9b45a', 10);
  t.kutu(.5, .3, .35, 30.2, 1.13, -1.15, '#d0b07a'); // simit sepeti

  // ---------- vagonlar arası körük ve dış uçlar
  t.kutu(1.0, 2.3, .1, 10.5, 1.15, -.1, '#1e1e22');
  for (let i = 0; i < 5; i++) t.kutu(.06, 2.4, 2.9, 10.15 + i * .17, 1.2, -.1, i % 2 ? '#2a2a30' : '#18181c');
  t.kutu(1, .1, 1.1, 10.5, -.02, KORIDOR_Z, '#3a3a40');
  t.kutu(2.6, 3.0, 3.4, -11.3, 1.1, 0, RENK.govde); t.kutu(2.6, .1, 3.5, -11.3, .5, 0, RENK.krem);
  t.kutu(2.6, 3.0, 3.4, 32.3, 1.1, 0, '#22252b');

  const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
  const govde = t.mesh(mat);
  sahne.add(govde);

  // ---------- parlayan lambalar
  const lamba = new Toplayici();
  for (const p of [...W1.bolmeler, ...W2.bolmeler]) lamba.kure(.13, p, TAVAN - .12, -.4, '#ffe2a8', 10, 1.4, .6, 1);
  for (const p of [...W1.bolmeler, ...W2.bolmeler]) for (const dx of [-1.05, 1.05]) lamba.kure(.06, p + dx, 1.85, -1.5, '#ffd28a', 8);
  const lambaMat = new THREE.MeshBasicMaterial({ vertexColors: true });
  const lambalar = lamba.mesh(lambaMat);
  sahne.add(lambalar);
  const isiklar = [];
  for (const lx of [-6, 0, 6, 15, 23, 29]) {
    const l = new THREE.PointLight('#ffd9a0', 9, 11, 1.6);
    l.position.set(lx, 2.2, .2);
    sahne.add(l); isiklar.push(l);
  }

  // ---------- camlar
  const camMat = new THREE.MeshBasicMaterial({ color: '#a9cbe8', transparent: true, opacity: .07, depthWrite: false });
  const yagmurDoku = yaziDokusu((c, w, h) => {
    c.clearRect(0, 0, w, h);
    const r = tohumlu(9);
    for (let i = 0; i < 260; i++) {
      const x = r() * w, y = r() * h, l = 6 + r() * 26;
      c.strokeStyle = `rgba(220,235,255,${.15 + r() * .35})`; c.lineWidth = 1 + r() * 1.5;
      c.beginPath(); c.moveTo(x, y); c.lineTo(x - 2, y + l); c.stroke();
      c.fillStyle = `rgba(230,240,255,${.3 + r() * .4})`; c.beginPath(); c.arc(x - 2, y + l, 1.5 + r() * 1.5, 0, 7); c.fill();
    }
  }, 256, 256);
  yagmurDoku.wrapS = yagmurDoku.wrapT = THREE.RepeatWrapping;
  const damlaMat = new THREE.MeshBasicMaterial({ map: yagmurDoku, transparent: true, opacity: 0, depthWrite: false });
  for (const p of [...W1.bolmeler, ...W2.bolmeler]) {
    const g = new THREE.Mesh(new THREE.PlaneGeometry(1.84, .94), camMat); g.position.set(p, 1.5, -1.56); sahne.add(g);
    const d = new THREE.Mesh(new THREE.PlaneGeometry(1.84, .94), damlaMat); d.position.set(p, 1.5, -1.55); sahne.add(d);
  }

  // ---------- tekerler (dönen)
  const tekerGeo = new THREE.CylinderGeometry(.36, .36, .12, 16); tekerGeo.rotateX(Math.PI / 2);
  const tekerMat = new THREE.MeshLambertMaterial({ color: '#3b3b42' });
  const jantGeo = new THREE.BoxGeometry(.6, .06, .14);
  const jantMat = new THREE.MeshLambertMaterial({ color: '#8a8a92' });
  anim.tekerler = anim.tekerler.map(tk => {
    const g = new THREE.Group(); g.position.set(tk.x, -.78, 1.33);
    g.add(new THREE.Mesh(tekerGeo, tekerMat));
    const j = new THREE.Mesh(jantGeo, jantMat); g.add(j);
    const j2 = j.clone(); j2.rotation.z = Math.PI / 2; g.add(j2);
    sahne.add(g); return g;
  });

  // ---------- kapılar (kayar)
  const kapiMat = new THREE.MeshLambertMaterial({ color: '#5b3a24' });
  const kapiCamMat = new THREE.MeshBasicMaterial({ color: '#d9e6ee', transparent: true, opacity: .25 });
  const kapiYap = (ad, x) => {
    const g = new THREE.Group();
    const p = new THREE.Mesh(new THREE.BoxGeometry(.06, 1.96, .82), kapiMat); p.position.y = .98; g.add(p);
    const c = new THREE.Mesh(new THREE.PlaneGeometry(.5, .5), kapiCamMat); c.position.set(.035, 1.45, 0); c.rotation.y = Math.PI / 2; g.add(c);
    const k = new THREE.Mesh(new THREE.BoxGeometry(.04, .04, .12), new THREE.MeshLambertMaterial({ color: RENK.pirinc })); k.position.set(.06, 1.0, -.3); g.add(k);
    g.position.set(x, 0, KORIDOR_Z); sahne.add(g);
    kapilar[ad] = { g, acik: 0, hedef: 0, x };
  };
  kapiYap('w1sol', -10); kapiYap('w1sag', 10); kapiYap('w2sol', 11); kapiYap('w2sag', 31);

  // ---------- etkileşimli nesneler
  const ekle = (id, nesne, durX, opts = {}) => { nesne.userData.etkilesim = id; sahne.add(nesne); etkilesim.push({ id, nesne, durX, ...opts }); return nesne; };
  // bilet (koltuğun üstünde)
  const bilet = new THREE.Mesh(new THREE.BoxGeometry(.18, .01, .1), new THREE.MeshLambertMaterial({ color: '#efe3c2' }));
  bilet.position.set(-5.2, .56, -1.1); bilet.rotation.y = .3; ekle('bilet', bilet, -5.0);
  // şekerlik (yemekli vagon 1. masa)
  const sekerlik = new THREE.Group();
  const s1 = new THREE.Mesh(new THREE.CylinderGeometry(.08, .07, .1, 12), new THREE.MeshLambertMaterial({ color: '#e8eef2' })); sekerlik.add(s1);
  const s2 = new THREE.Mesh(new THREE.SphereGeometry(.08, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: '#d0dbe2' })); s2.position.y = .05; sekerlik.add(s2);
  sekerlik.position.set(17.1, .84, -1.05); ekle('sekerlik', sekerlik, 17.1);
  // bavul (yolcu vagonu, 1. bölme rafı)
  const bavul = new THREE.Group();
  const b1 = new THREE.Mesh(new THREE.BoxGeometry(.7, .35, .35), new THREE.MeshLambertMaterial({ color: '#3d6b45' })); bavul.add(b1);
  const b2 = new THREE.Mesh(new THREE.BoxGeometry(.72, .04, .37), new THREE.MeshLambertMaterial({ color: '#7a5a30' })); b2.position.y = .05; bavul.add(b2);
  bavul.position.set(-8.3, 2.33, -1.32); ekle('bavul', bavul, -8.3);
  // büfe (yemekli vagon sonu)
  const bufe = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.0, .5), new THREE.MeshBasicMaterial({ visible: false }));
  bufe.position.set(29.3, 1.6, -1.3); ekle('bufe', bufe, 28.6);
  // koltuk altları (kedi araması)
  W1.bolmeler.forEach((c, i) => {
    for (const [ad, ax] of [['sol', c - 1.25], ['sag', c + 1.25]]) {
      const alan = new THREE.Mesh(new THREE.BoxGeometry(.7, .5, 1.4), new THREE.MeshBasicMaterial({ visible: false }));
      alan.position.set(ax, .25, -.8); ekle(`koltukalti_${i}_${ad}`, alan, ax, { pasif: true });
    }
  });
  // kilitli kapılar
  for (const [ad, x, dx] of [['kapi_w1sol', -10, -9.3], ['kapi_w2sag', 31, 30.3]]) {
    const alan = new THREE.Mesh(new THREE.BoxGeometry(.4, 2, .9), new THREE.MeshBasicMaterial({ visible: false }));
    alan.position.set(x, 1, KORIDOR_Z); ekle(ad, alan, dx);
  }
  // gizli fotoğraflar
  const fotoMat = new THREE.MeshLambertMaterial({ color: '#f1ead8' });
  for (const [id, x, y, z, ry] of [['foto_f1', 8.9, .03, -.3, .4], ['foto_f2', 30.4, 1.79, -1.38, 0], ['foto_f3', 3.9, 2.155, -1.35, -.2]]) {
    const f = new THREE.Mesh(new THREE.BoxGeometry(.16, .005, .12), fotoMat); f.position.set(x, y, z); f.rotation.y = ry;
    ekle(id, f, Math.min(SINIR.max, Math.max(SINIR.min, x)));
  }

  return { govde, lambalar, isiklar, kapilar, etkilesim, oturak, anim, damlaMat, camMat };
}

// ---------------------------------------------------------------- dış dünya
const HAVALAR = {
  gece:   { gok: ['#070d1f', '#16264a', '#2c4470'], zemin: '#7d8ca8', sis: '#1a2848', hemiUst: '#4a5f90', hemiAlt: '#151520', hemiG: .55, lamba: 9, ay: true, yildiz: true, yagis: 'kar', yagisSayi: 350, nesne: ['cam', 'cam', 'kuru', 'direk'], dag: '#25365a', yon: null },
  kar:    { gok: ['#0d1730', '#25385f', '#4d6390'], zemin: '#aebcd2', sis: '#2b3b62', hemiUst: '#6b80b0', hemiAlt: '#20222c', hemiG: .65, lamba: 9, ay: true, yildiz: false, yagis: 'kar', yagisSayi: 1600, nesne: ['cam', 'cam', 'cam', 'direk', 'kulube', 'kuru'], dag: '#3a4d78', yon: null },
  yagmur: { gok: ['#06080d', '#121820', '#232c38'], zemin: '#1f242b', sis: '#141a22', hemiUst: '#3a4658', hemiAlt: '#0c0d10', hemiG: .5, lamba: 10, ay: false, yildiz: false, yagis: 'yagmur', yagisSayi: 1400, nesne: ['bina', 'bina', 'bina', 'sokak'], dag: '#151b24', yon: null },
  deniz:  { gok: ['#04101f', '#0d2645', '#1c4570'], zemin: '#3b3d45', sis: '#0b1d33', hemiUst: '#3d6a9a', hemiAlt: '#101520', hemiG: .6, lamba: 8, ay: true, ayBuyuk: true, yildiz: true, yagis: null, nesne: ['kaya', 'kaya', 'direk'], dag: '#0b1a2e', deniz: true, fener: true, yon: null },
  safak:  { gok: ['#2b3c70', '#e58a6a', '#ffd59a'], zemin: '#c49a4a', sis: '#e8a878', hemiUst: '#ffd2a0', hemiAlt: '#5a4a3a', hemiG: 1.0, lamba: 3, gunes: true, yildiz: false, yagis: null, nesne: ['kavak', 'kavak', 'balya', 'cit'], dag: '#7a6a8a', yon: '#ffc58a' },
};
export { HAVALAR };

function nesneSablonlari() {
  const s = {};
  const yap = (ad, f) => { const t = new Toplayici(); f(t); s[ad] = t.geometri(); };
  yap('cam', t => { t.silindir(.08, .12, .8, 0, .4, 0, '#4a3524', 6); t.koni(.9, 1.4, 0, 1.3, 0, '#1f3d34'); t.koni(.7, 1.2, 0, 2.0, 0, '#24483c'); t.koni(.45, .9, 0, 2.6, 0, '#2a5244'); t.koni(.75, .25, 0, 1.75, 0, '#dfe8f0'); t.koni(.5, .2, 0, 2.4, 0, '#e8eff5'); });
  yap('kuru', t => { t.silindir(.06, .1, 2.2, 0, 1.1, 0, '#3a2d26', 5); t.silindir(.03, .04, 1, .3, 1.8, 0, '#3a2d26', 4, 0, 0, -.8); t.silindir(.03, .04, .9, -.25, 1.5, 0, '#3a2d26', 4, 0, 0, .9); });
  yap('direk', t => { t.kutu(.12, 4, .12, 0, 2, 0, '#3a2c22'); t.kutu(1.2, .08, .08, 0, 3.7, 0, '#3a2c22'); for (const dx of [-.5, -.2, .2, .5]) t.kutu(.05, .1, .05, dx, 3.78, 0, '#d8d8d0'); });
  yap('kulube', t => { t.kutu(2, 1.4, 1.6, 0, .7, 0, '#5a3a28'); t.koni(1.6, 1.0, 0, 1.9, 0, '#e6edf3', 4, Math.PI / 4); t.kutu(.4, .4, .05, -.5, .8, .82, '#ffcf6a'); t.kutu(.4, .4, .05, .5, .8, .82, '#ffcf6a'); t.kutu(.2, .5, .2, .5, 2.1, 0, '#4a3020'); });
  yap('bina', t => { const r = Math.random; const h = 4 + r() * 7, w = 2 + r() * 2; t.kutu(w, h, 2, 0, h / 2, 0, ['#2a2f38', '#30353f', '#252a33', '#383c44'][Math.floor(r() * 4)]); for (let y = 1; y < h - .5; y += 1.1) for (let x = -w / 2 + .5; x < w / 2 - .3; x += .7) t.kutu(.36, .5, .05, x, y, 1.01, r() < .45 ? ['#ffcf6a', '#ffe0a0', '#f6b55a'][Math.floor(r() * 3)] : '#1a1e26'); t.kutu(w + .1, .15, 2.1, 0, h, 0, '#1a1d22'); });
  yap('sokak', t => { t.silindir(.05, .07, 3.2, 0, 1.6, 0, '#2a2d33', 6); t.kutu(.5, .06, .06, .2, 3.2, 0, '#2a2d33'); t.kutu(.22, .14, .22, .42, 3.12, 0, '#ffd88a'); });
  yap('kaya', t => { t._ekle(new THREE.DodecahedronGeometry(1, 0), 0, .4, 0, '#2f3440', .3, .5, 0, 1.4, .8, 1); t._ekle(new THREE.DodecahedronGeometry(.6, 0), 1.2, .2, .4, '#3a404c', 0, .2, 0, 1, .7, 1); });
  yap('kavak', t => { t.silindir(.07, .1, 1, 0, .5, 0, '#5a4030', 5); t.kure(.6, 0, 2.2, 0, '#7a8a3a', 7, 1, 2.6, 1); t.kure(.45, .1, 2.9, .1, '#9aa04a', 6, 1, 2, 1); });
  yap('balya', t => { t.silindir(.6, .6, 1.1, 0, .6, 0, '#d9b45a', 12, Math.PI / 2); t.silindir(.62, .62, .05, 0, .6, .5, '#c49a3a', 12, Math.PI / 2); });
  yap('cit', t => { for (let i = 0; i < 4; i++) t.kutu(.08, .9, .08, i * 1.2 - 1.8, .45, 0, '#7a5a3a'); t.kutu(4, .07, .05, 0, .7, 0, '#7a5a3a'); t.kutu(4, .07, .05, 0, .4, 0, '#7a5a3a'); });
  return s;
}

export class Disari {
  constructor(sahne) {
    this.sahne = sahne;
    this.grup = new THREE.Group(); sahne.add(this.grup);
    this.hiz = 0; this.mesafe = 0; this.kamX = 0;
    this.sablon = nesneSablonlari();
    this.mat = new THREE.MeshLambertMaterial({ vertexColors: true });
    this.isikMat = new THREE.MeshBasicMaterial({ vertexColors: true });
    this.nesneler = [];

    // gökyüzü
    this.gokCanvas = document.createElement('canvas'); this.gokCanvas.width = 4; this.gokCanvas.height = 256;
    this.gokDoku = new THREE.CanvasTexture(this.gokCanvas); this.gokDoku.colorSpace = THREE.SRGBColorSpace;
    this.gok = new THREE.Mesh(new THREE.PlaneGeometry(900, 220), new THREE.MeshBasicMaterial({ map: this.gokDoku, fog: false }));
    this.gok.position.set(0, 60, -170); sahne.add(this.gok);
    // yıldızlar
    const yg = new THREE.BufferGeometry(), yp = [];
    const r = tohumlu(3);
    for (let i = 0; i < 700; i++) yp.push((r() - .5) * 700, 8 + r() * 130, -160);
    yg.setAttribute('position', new THREE.Float32BufferAttribute(yp, 3));
    this.yildiz = new THREE.Points(yg, new THREE.PointsMaterial({ color: '#ffffff', size: 1.4, sizeAttenuation: false, transparent: true, opacity: .8, fog: false }));
    sahne.add(this.yildiz);
    // ay / güneş
    this.ay = new THREE.Mesh(new THREE.CircleGeometry(5, 32), new THREE.MeshBasicMaterial({ color: '#f4eed8', fog: false }));
    this.ay.position.set(25, 40, -150); sahne.add(this.ay);
    const haleDoku = yaziDokusu((c, w, h) => { const g = c.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); g.addColorStop(0, 'rgba(255,255,255,.55)'); g.addColorStop(.3, 'rgba(255,240,210,.2)'); g.addColorStop(1, 'rgba(255,240,210,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h); }, 128, 128);
    this.hale = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshBasicMaterial({ map: haleDoku, transparent: true, depthWrite: false, fog: false, blending: THREE.AdditiveBlending }));
    this.hale.position.set(25, 40, -151); sahne.add(this.hale);
    // dağlar
    const dt = new Toplayici(), dr = tohumlu(11);
    for (let i = 0; i < 26; i++) { const h = 12 + dr() * 26; dt.koni(14 + dr() * 16, h, -220 + i * 18 + dr() * 8, h / 2 - 2, 0, '#ffffff', 5, dr()); }
    this.dagMat = new THREE.MeshBasicMaterial({ color: '#25365a', fog: false });
    this.daglar = new THREE.Mesh(dt.geometri(), this.dagMat); this.daglar.position.z = -110; sahne.add(this.daglar);
    // zemin ve deniz
    this.zeminMat = new THREE.MeshLambertMaterial({ color: '#7d8ca8' });
    this.zemin = new THREE.Mesh(new THREE.PlaneGeometry(600, 140), this.zeminMat); this.zemin.rotation.x = -Math.PI / 2; this.zemin.position.set(0, -1.02, -50); sahne.add(this.zemin);
    this.denizMat = new THREE.MeshLambertMaterial({ color: '#0d2a48', emissive: '#06182c' });
    this.deniz = new THREE.Mesh(new THREE.PlaneGeometry(600, 120), this.denizMat); this.deniz.rotation.x = -Math.PI / 2; this.deniz.position.set(0, -.9, -78); sahne.add(this.deniz);
    const yolDoku = yaziDokusu((c, w, h) => { const g = c.createLinearGradient(0, 0, w, 0); g.addColorStop(0, 'rgba(255,240,200,0)'); g.addColorStop(.5, 'rgba(255,240,200,.75)'); g.addColorStop(1, 'rgba(255,240,200,0)'); c.fillStyle = g; for (let y = 0; y < h; y += 3) { c.globalAlpha = Math.random() * .9; c.fillRect(Math.random() * w * .3, y, w * (.4 + Math.random() * .3), 2); } }, 128, 256);
    this.ayYolu = new THREE.Mesh(new THREE.PlaneGeometry(14, 110), new THREE.MeshBasicMaterial({ map: yolDoku, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.ayYolu.rotation.x = -Math.PI / 2; this.ayYolu.position.set(25, -.85, -75); sahne.add(this.ayYolu);
    // deniz feneri
    const ft = new Toplayici(); ft.silindir(1.2, 1.8, 14, 0, 7, 0, '#e8e8e2', 10); for (let i = 0; i < 3; i++) ft.silindir(1.25 - i * .1, 1.35 - i * .1, 1.6, 0, 2 + i * 4, 0, '#b83a3a', 10); ft.silindir(1.4, 1.4, .4, 0, 14.2, 0, '#2a2a2a', 10); ft.kure(.9, 0, 15.2, 0, '#fff4c8', 10);
    this.fener = new THREE.Mesh(ft.geometri(), this.mat); this.fener.position.set(-30, -1, -90); sahne.add(this.fener);
    this.fenerIsik = new THREE.Mesh(new THREE.ConeGeometry(6, 60, 16, 1, true), new THREE.MeshBasicMaterial({ color: '#fff2c0', transparent: true, opacity: .12, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, fog: false }));
    this.fenerIsik.geometry.translate(0, -30, 0); this.fenerIsik.geometry.rotateZ(Math.PI / 2);
    this.fenerIsik.position.set(-30, 14.2, -90); sahne.add(this.fenerIsik);
    // raylar ve traversler
    const rt = new Toplayici(); rt.kutu(400, .1, .08, 0, -.97, .72, '#7a7a84'); rt.kutu(400, .1, .08, 0, -.97, -.72, '#7a7a84'); rt.kutu(400, .1, 3.2, 0, -1.0, 0, '#3a3530');
    this.raylar = new THREE.Mesh(rt.geometri(), this.mat); sahne.add(this.raylar);
    this.travers = new THREE.InstancedMesh(new THREE.BoxGeometry(.25, .08, 2.2), new THREE.MeshLambertMaterial({ color: '#4a3a2c' }), 90);
    sahne.add(this.travers);
    // yağış
    const pg = new THREE.BufferGeometry(), pp = new Float32Array(1600 * 3);
    for (let i = 0; i < 1600; i++) { pp[i * 3] = (Math.random() - .5) * 60; pp[i * 3 + 1] = Math.random() * 14 - 1; pp[i * 3 + 2] = -2 - Math.random() * 30; }
    pg.setAttribute('position', new THREE.BufferAttribute(pp, 3));
    this.kar = new THREE.Points(pg, new THREE.PointsMaterial({ color: '#ffffff', size: .09, transparent: true, opacity: .9, depthWrite: false }));
    sahne.add(this.kar);
    const rg = new THREE.BufferGeometry(), rp = new Float32Array(1400 * 6);
    rg.setAttribute('position', new THREE.BufferAttribute(rp, 3));
    this.yagmur = new THREE.LineSegments(rg, new THREE.LineBasicMaterial({ color: '#9fb4cc', transparent: true, opacity: .45 }));
    this.yagmurVeri = Array.from({ length: 1400 }, () => ({ x: (Math.random() - .5) * 60, y: Math.random() * 14, z: -2 - Math.random() * 30 }));
    sahne.add(this.yagmur);
    // istasyon (peron)
    this.istasyon = this._istasyonKur();
    this.istasyon.visible = false;
    this.istasyonX = null;

    this.hemi = new THREE.HemisphereLight('#4a5f90', '#151520', .55); sahne.add(this.hemi);
    this.yonIsik = new THREE.DirectionalLight('#ffc58a', 0); this.yonIsik.position.set(-4, 6, -12); sahne.add(this.yonIsik);
    sahne.fog = new THREE.Fog('#1a2848', 25, 140);
    this.havaAyarla('gece', true);
  }

  _istasyonKur() {
    const t = new Toplayici();
    t.kutu(46, .55, 3.4, 0, -.75, -3.6, '#6a6a70');
    t.kutu(46, .06, .25, 0, -.45, -2.0, '#e8d24a');
    t.kutu(12, 3.2, 3, -4, 1.2, -7, '#8a5a40'); t.kutu(12.6, .3, 3.6, -4, 2.9, -7, '#4a2a1e');
    for (let i = 0; i < 5; i++) t.kutu(.9, 1.3, .05, -9 + i * 2.4, 1.2, -5.48, '#ffcf6a');
    t.kutu(1.2, 2.0, .05, 2, .6, -5.48, '#3a2418');
    for (const x of [-18, -9, 9, 18]) { t.silindir(.06, .08, 3.2, x, 1.1, -3.0, '#2a2a30', 6); t.kure(.22, x, 2.8, -3.0, '#ffe2a0', 8); }
    for (const x of [-14, 13]) { t.kutu(1.6, .08, .45, x, -.1, -3.7, '#6a4a30'); t.kutu(1.6, .5, .08, x, .15, -3.95, '#6a4a30'); }
    const g = new THREE.Group();
    g.add(new THREE.Mesh(t.geometri(), this.mat));
    this.tabelaCanvas = document.createElement('canvas'); this.tabelaCanvas.width = 512; this.tabelaCanvas.height = 128;
    this.tabelaDoku = new THREE.CanvasTexture(this.tabelaCanvas); this.tabelaDoku.colorSpace = THREE.SRGBColorSpace;
    const tab = new THREE.Mesh(new THREE.PlaneGeometry(4, 1), new THREE.MeshBasicMaterial({ map: this.tabelaDoku }));
    tab.position.set(-4, 2.1, -5.45); g.add(tab);
    const dikme = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.15, .06), new THREE.MeshLambertMaterial({ color: '#1a1a1e' })); dikme.position.set(-4, 2.1, -5.5); g.add(dikme);
    // peron lambaları: ışık kaynağı yerine parlayan küreler (ışık sayısı değişince gölgelendirici yeniden derlenmesin)
    const lt = new Toplayici(); for (const x of [-18, -9, 9, 18]) lt.kure(.24, x, 2.8, -3.0, '#ffe8b0', 8);
    g.add(new THREE.Mesh(lt.geometri(), new THREE.MeshBasicMaterial({ vertexColors: true })));
    this.sahne.add(g);
    return g;
  }

  tabelaYaz(ad) {
    const c = this.tabelaCanvas.getContext('2d'), w = 512, h = 128;
    c.fillStyle = '#1d3f73'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#f2efe6'; c.lineWidth = 6; c.strokeRect(8, 8, w - 16, h - 16);
    c.fillStyle = '#f2efe6'; c.font = '700 64px "Big Shoulders", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(ad, w / 2, h / 2 + 4);
    this.tabelaDoku.needsUpdate = true;
  }

  havaAyarla(ad, hemen = false) {
    const h = HAVALAR[ad]; this.havaAd = ad; this.h = h;
    const c = this.gokCanvas.getContext('2d'), g = c.createLinearGradient(0, 0, 0, 256);
    h.gok.forEach((r, i) => g.addColorStop(i / (h.gok.length - 1), r));
    c.fillStyle = g; c.fillRect(0, 0, 4, 256); this.gokDoku.needsUpdate = true;
    this.zeminMat.color.set(h.zemin);
    this.sahne.fog.color.set(h.sis);
    this.hemi.color.set(h.hemiUst); this.hemi.groundColor.set(h.hemiAlt); this.hemi.intensity = h.hemiG;
    this.dagMat.color.set(h.dag);
    this.yildiz.visible = !!h.yildiz;
    this.ay.visible = this.hale.visible = !!(h.ay || h.gunes);
    if (h.gunes) { this.ay.material.color.set('#fff0c0'); this.ay.scale.setScalar(2.2); this.ay.position.set(-10, 12, -150); this.hale.position.set(-10, 12, -151); this.hale.scale.setScalar(3); }
    else { this.ay.material.color.set('#f4eed8'); this.ay.scale.setScalar(h.ayBuyuk ? 1.6 : 1); this.ay.position.set(25, h.ayBuyuk ? 22 : 40, -150); this.hale.position.set(25, h.ayBuyuk ? 22 : 40, -151); this.hale.scale.setScalar(h.ayBuyuk ? 1.6 : 1); }
    this.deniz.visible = this.ayYolu.visible = !!h.deniz;
    this.fener.visible = this.fenerIsik.visible = !!h.fener;
    this.zemin.position.z = h.deniz ? -5 : -50; this.zemin.scale.y = h.deniz ? .2 : 1;
    this.sahne.background = new THREE.Color(h.sis);
    this.kar.visible = h.yagis === 'kar'; this.kar.geometry.setDrawRange(0, h.yagisSayi || 0);
    this.yagmur.visible = h.yagis === 'yagmur'; this.yagmur.geometry.setDrawRange(0, (h.yagisSayi || 0) * 2);
    this.yonIsik.intensity = h.yon ? 1.4 : 0; if (h.yon) this.yonIsik.color.set(h.yon);
    // nesneleri yenile
    for (const n of this.nesneler) this.grup.remove(n.m);
    this.nesneler = [];
    this.siradakiX = this.kamX - 60;
    this._doldur();
  }

  _yeniNesne(x) {
    const h = this.h, r = Math.random;
    const tip = h.nesne[Math.floor(r() * h.nesne.length)];
    let z;
    if (tip === 'direk') z = -3.2;
    else if (tip === 'sokak') z = -3.5 - r() * 2;
    else if (tip === 'bina') z = -9 - r() * 22;
    else if (tip === 'cit') z = -4 - r() * 3;
    else z = -4.5 - r() * 32;
    if (h.deniz && tip === 'kaya') z = -3.5 - r() * 6;
    const geo = tip === 'bina' ? this._binaGeo() : this.sablon[tip];
    const m = new THREE.Mesh(geo, tip === 'bina' || tip === 'kulube' || tip === 'sokak' ? this.isikMatKarisik || (this.isikMatKarisik = new THREE.MeshLambertMaterial({ vertexColors: true, emissive: '#000' })) : this.mat);
    m.position.set(x, -1, z);
    m.rotation.y = tip === 'cit' || tip === 'direk' || tip === 'bina' || tip === 'sokak' ? 0 : r() * 6.28;
    const k = tip === 'bina' || tip === 'direk' || tip === 'sokak' || tip === 'cit' ? 1 : .8 + r() * .6;
    m.scale.setScalar(k);
    if (tip === 'bina') m.material = this._binaMat();
    this.grup.add(m);
    this.nesneler.push({ m, tip });
  }
  _binaGeo() {
    if (!this._binalar) this._binalar = Array.from({ length: 8 }, () => nesneSablonlari().bina);
    return this._binalar[Math.floor(Math.random() * this._binalar.length)];
  }
  _binaMat() {
    // pencereler yansın diye köşe rengini olduğu gibi gösteren bir malzeme
    return this._bm || (this._bm = new THREE.MeshBasicMaterial({ vertexColors: true }));
  }

  _doldur() {
    const aralik = { gece: 3.5, kar: 2.2, yagmur: 3.2, deniz: 4, safak: 2.6 }[this.havaAd];
    while (this.siradakiX < this.kamX + 70) {
      this._yeniNesne(this.siradakiX);
      this.siradakiX += aralik * (.4 + Math.random() * 1.2);
    }
  }

  istasyonGetir(ad, x) { this.tabelaYaz(ad); this.istasyon.visible = true; this.istasyonX = x; this.istasyon.position.x = x; }
  istasyonKaldir() { this.istasyon.visible = false; this.istasyonX = null; }

  guncelle(dt, kamX, zaman) {
    this.kamX = kamX;
    const d = this.hiz * dt;
    this.mesafe += d;
    for (const n of this.nesneler) n.m.position.x -= d;
    this.siradakiX -= d;
    this.nesneler = this.nesneler.filter(n => { if (n.m.position.x < kamX - 70) { this.grup.remove(n.m); return false; } return true; });
    this._doldur();
    if (this.istasyonX !== null) { this.istasyonX -= d; this.istasyon.position.x = this.istasyonX; if (this.istasyonX < kamX - 80) this.istasyonKaldir(); }
    // gökyüzü öğeleri kamerayla birlikte (çok uzak)
    for (const o of [this.gok, this.yildiz]) o.position.x = kamX;
    this.ay.position.x = kamX + (this.h.gunes ? -10 : 25); this.hale.position.x = this.ay.position.x;
    this.ayYolu.position.x = this.ay.position.x;
    this.daglar.position.x = kamX + ((-this.mesafe * .03) % 18);
    this.zemin.position.x = this.deniz.position.x = this.raylar.position.x = kamX;
    this.fener.position.x = kamX - 30; this.fenerIsik.position.x = kamX - 30;
    this.fenerIsik.rotation.y = zaman * .8;
    // traversler
    const m = new THREE.Matrix4(), aralik = 1.1, bas = kamX - 50;
    const kay = ((this.mesafe % aralik) + aralik) % aralik;
    for (let i = 0; i < 90; i++) { m.makeTranslation(bas + i * aralik - kay - (bas % aralik), -1.0, 0); this.travers.setMatrixAt(i, m); }
    this.travers.instanceMatrix.needsUpdate = true;
    // yağış
    if (this.kar.visible) {
      const p = this.kar.geometry.attributes.position.array;
      for (let i = 0; i < (this.h.yagisSayi || 0); i++) {
        p[i * 3 + 1] -= dt * (1.2 + (i % 7) * .12);
        p[i * 3] -= dt * (this.hiz * .9 + .5) - Math.sin(zaman + i) * dt * .3;
        if (p[i * 3 + 1] < -1) p[i * 3 + 1] = 13;
        if (p[i * 3] < kamX - 30) p[i * 3] += 60; if (p[i * 3] > kamX + 30) p[i * 3] -= 60;
      }
      this.kar.geometry.attributes.position.needsUpdate = true;
    }
    if (this.yagmur.visible) {
      const p = this.yagmur.geometry.attributes.position.array;
      const egim = .03 + this.hiz * .012;
      for (let i = 0; i < (this.h.yagisSayi || 0); i++) {
        const v = this.yagmurVeri[i];
        v.y -= dt * 16; v.x -= dt * this.hiz * .9;
        if (v.y < -1) v.y = 13; if (v.x < kamX - 30) v.x += 60; if (v.x > kamX + 30) v.x -= 60;
        p[i * 6] = v.x; p[i * 6 + 1] = v.y; p[i * 6 + 2] = v.z;
        p[i * 6 + 3] = v.x + egim * 6; p[i * 6 + 4] = v.y + .5; p[i * 6 + 5] = v.z;
      }
      this.yagmur.geometry.attributes.position.needsUpdate = true;
    }
  }
}
