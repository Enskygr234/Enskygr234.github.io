// Basit geometrilerden kurulan karakterler: yürür, oturur, konuşurken başını sallar.
import * as THREE from '../lib/three.module.js';
import { KORIDOR_Z } from './dunya.js';

const matlar = new Map();
const mat = (renk, parlak = false) => {
  const k = renk + (parlak ? '!' : '');
  if (!matlar.has(k)) matlar.set(k, parlak ? new THREE.MeshBasicMaterial({ color: renk }) : new THREE.MeshLambertMaterial({ color: renk }));
  return matlar.get(k);
};
const kutu = (w, h, d, renk, x = 0, y = 0, z = 0, parlak) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(renk, parlak)); m.position.set(x, y, z); return m; };
const kure = (r, renk, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1, parlak) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 10), mat(renk, parlak)); m.position.set(x, y, z); m.scale.set(sx, sy, sz); return m; };
const sil = (r1, r2, h, renk, x = 0, y = 0, z = 0, seg = 12) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, seg), mat(renk)); m.position.set(x, y, z); return m; };

const TIPLER = {
  sen:       { olcek: 1, ten: '#e8bf98', sac: '#3a2a20', ust: '#3f6b4f', etek: '#3f6b4f', alt: '#2d2f3a', ayakkabi: '#2a1e18', kol: '#3f6b4f' },
  husnu:     { olcek: .97, ten: '#e2b48e', sac: '#d8d8d4', ust: '#d8cfb8', etek: '#4a4038', alt: '#4a4038', ayakkabi: '#2a1e18', kol: '#d8cfb8', egik: .14 },
  murat:     { olcek: 1.02, ten: '#dcae86', sac: '#2a1d16', ust: '#5b6b3a', etek: '#5b6b3a', alt: '#4d5a32', ayakkabi: '#1c1c1c', kol: '#5b6b3a' },
  elif:      { olcek: .72, ten: '#f0c8a2', sac: '#5a3520', ust: '#f2c230', etek: '#f2c230', alt: '#3a5a8a', ayakkabi: '#c0392b', kol: '#f2c230', cocuk: true },
  anne:      { olcek: .95, ten: '#e6b994', sac: '#4a2c1c', ust: '#8a5a7a', etek: '#7a4a6a', alt: '#3a3040', ayakkabi: '#2a1e18', kol: '#8a5a7a' },
  kondukter: { olcek: 1.07, ten: '#d9b090', sac: '#1d1d1d', ust: '#1f2c4a', etek: '#1f2c4a', alt: '#1a2238', ayakkabi: '#111', kol: '#1f2c4a' },
};

export class Kisi {
  constructor(id, sahne) {
    this.id = id; const T = TIPLER[id]; this.T = T;
    const g = this.g = new THREE.Group(); sahne.add(g);
    const s = T.olcek; g.scale.setScalar(s); this.s = s;
    this.x = 0; this.z = KORIDOR_Z; this.aci = 0; this.hedefAci = 0;
    this.mod = 'dur'; this.faz = 0; this.isler = []; this.hiz = 3.2; this.konusuyor = false; this.bakX = null;

    // bacaklar (kalça → diz)
    const bacak = (sx) => {
      const ust = new THREE.Group(); ust.position.set(sx, .86, 0);
      ust.add(kutu(.16, .44, .17, T.alt, 0, -.21, 0));
      const diz = new THREE.Group(); diz.position.y = -.42; ust.add(diz);
      diz.add(kutu(.14, .4, .15, T.alt, 0, -.2, 0));
      diz.add(kutu(.15, .08, .26, T.ayakkabi, 0, -.42, .05));
      g.add(ust); return { ust, diz };
    };
    this.bSol = bacak(-.1); this.bSag = bacak(.1);
    // gövde
    const gv = this.govde = new THREE.Group(); gv.position.y = .86; g.add(gv);
    gv.add(kutu(.44, .6, .25, T.ust, 0, .3, 0));
    gv.add(kutu(.46, .28, .27, T.etek, 0, -.02, 0));
    gv.add(sil(.07, .08, .1, T.ten, 0, .64, 0));
    // kafa
    const bas = this.bas = new THREE.Group(); bas.position.y = .8; gv.add(bas);
    bas.add(kure(.15, T.ten, 0, 0, 0, 1, 1.08, 1));
    bas.add(kure(.022, '#1b1410', -.055, .02, .135)); bas.add(kure(.022, '#1b1410', .055, .02, .135));
    bas.add(kure(.025, T.ten, 0, -.025, .15, 1, 1, 1));
    // kollar
    const kol = (sx) => {
      const k = new THREE.Group(); k.position.set(sx, .56, 0);
      k.add(kutu(.12, .52, .13, T.kol, 0, -.25, 0));
      k.add(kure(.06, T.ten, 0, -.54, 0));
      gv.add(k); return k;
    };
    this.kSol = kol(-.29); this.kSag = kol(.29);
    this._sus(T, gv, bas);

    // tıklama kutusu
    this.vurus = new THREE.Mesh(new THREE.BoxGeometry(.7, 1.9, .7), new THREE.MeshBasicMaterial({ visible: false }));
    this.vurus.position.y = .95; this.vurus.userData.kisi = id; g.add(this.vurus);
    this.yerlestir(0, KORIDOR_Z);
  }

  _sus(T, gv, bas) {
    const id = this.id;
    if (id === 'sen') {
      bas.add(kure(.155, T.sac, 0, .05, -.02, 1.02, .9, 1.02));
      gv.add(kutu(.3, .09, .3, '#b8322f', 0, .6, 0));
      gv.add(kutu(.09, .32, .04, '#b8322f', .1, .42, .14));
      for (const y of [.42, .26, .1]) gv.add(kutu(.035, .035, .02, '#d9c48a', 0, y, .13));
    } else if (id === 'husnu') {
      gv.rotation.x = T.egik;
      gv.add(kutu(.46, .45, .27, '#5a4632', 0, .3, 0));
      gv.add(kutu(.12, .45, .02, T.ust, 0, .32, .135));
      bas.add(kure(.155, T.sac, 0, 0, -.03, 1.02, .9, 1));
      bas.add(sil(.165, .17, .07, '#6a5a48', 0, .1, -.01, 14));
      bas.add(kutu(.24, .03, .12, '#6a5a48', 0, .08, .13));
      bas.add(kutu(.17, .025, .01, '#c9a14a', 0, .02, .155));
      bas.add(kutu(.11, .03, .03, '#eeeeea', 0, -.065, .14));
    } else if (id === 'murat') {
      bas.add(kure(.155, T.sac, 0, .04, -.02, 1.02, .85, 1));
      const bere = kure(.16, '#3e4a28', .03, .11, 0, 1.05, .45, 1.05); bere.rotation.z = -.25; bas.add(bere);
      gv.add(kutu(.46, .05, .26, '#3e4a28', 0, .05, 0));
      for (const y of [.45, .3, .15]) gv.add(kutu(.035, .035, .02, '#c9a14a', 0, y, .13));
    } else if (id === 'elif') {
      bas.add(kure(.16, T.sac, 0, .03, -.02, 1.04, .95, 1.04));
      bas.add(kure(.06, T.sac, -.17, -.02, -.02)); bas.add(kure(.06, T.sac, .17, -.02, -.02));
      bas.add(kure(.03, '#e05a6a', -.15, .03, 0)); bas.add(kure(.03, '#e05a6a', .15, .03, 0));
      gv.add(kutu(.5, .32, .29, T.etek, 0, -.08, 0));
      gv.add(kure(.17, '#e2b020', 0, .66, -.09, 1.1, .7, .8));
    } else if (id === 'anne') {
      bas.add(kure(.16, T.sac, 0, .03, -.03, 1.04, .95, 1.04));
      bas.add(kutu(.3, .34, .1, T.sac, 0, -.12, -.1));
      gv.add(kutu(.3, .08, .3, '#d9c7a0', 0, .58, 0));
    } else if (id === 'kondukter') {
      gv.add(kutu(.48, .5, .28, T.etek, 0, -.12, 0));
      for (const y of [.48, .34, .2, .06]) gv.add(kutu(.04, .04, .02, '#d9b45a', 0, y, .135));
      bas.add(kure(.155, T.sac, 0, 0, -.03, 1.02, .9, 1));
      bas.add(sil(.17, .16, .11, '#1a2238', 0, .12, 0, 16));
      bas.add(sil(.172, .172, .025, '#c9a14a', 0, .085, 0, 16));
      bas.add(kutu(.24, .025, .13, '#0e1220', 0, .07, .14));
      bas.add(kutu(.12, .03, .03, '#2a1d14', 0, -.065, .14));
      this.fenerEkle(this.kSag);
    }
  }

  fenerEkle(kol) {
    const f = new THREE.Group(); f.position.set(0, -.62, .02);
    f.add(kutu(.02, .1, .02, '#333', 0, .06, 0));
    f.add(kutu(.13, .02, .13, '#2a2a2a', 0, 0, 0));
    f.add(kutu(.13, .02, .13, '#2a2a2a', 0, -.2, 0));
    this.fenerCam = kutu(.1, .17, .1, '#ffd27a', 0, -.1, 0, true); f.add(this.fenerCam);
    for (const [x, z] of [[-.06, -.06], [.06, -.06], [-.06, .06], [.06, .06]]) f.add(kutu(.015, .2, .015, '#2a2a2a', x, -.1, z));
    kol.add(f); this.fener = f; return f;
  }
  fenerSondur() { if (this.fenerCam) this.fenerCam.material = mat('#6a5a40'); }
  kasketTak() {
    const b = this.bas;
    this.kasket = new THREE.Group();
    this.kasket.add(sil(.18, .17, .11, '#1a2238', 0, .13, 0, 16));
    this.kasket.add(sil(.182, .182, .025, '#c9a14a', 0, .095, 0, 16));
    this.kasket.add(kutu(.25, .025, .13, '#0e1220', 0, .07, .15));
    b.add(this.kasket);
  }

  yerlestir(x, z) { this.x = x; this.z = z; this.g.position.set(x, 0, z); }
  get gorunur() { return this.g.visible; }
  set gorunur(v) { this.g.visible = v; }

  // ---- iş kuyruğu
  _isEkle(...isler) { return new Promise(coz => { this.isler.push(...isler, { tip: 'son', coz }); }); }
  git(x) {
    const isler = [];
    if (this.mod === 'otur') isler.push({ tip: 'kalk' });
    if (Math.abs(this.z - KORIDOR_Z) > .01) isler.push({ tip: 'z', z: KORIDOR_Z });
    isler.push({ tip: 'x', x });
    return this._isEkle(...isler);
  }
  otur(o) {
    const isler = [];
    if (this.mod === 'otur') { isler.push({ tip: 'kalk' }, { tip: 'z', z: KORIDOR_Z }); }
    const ox = o.x - o.yon * .15;
    isler.push({ tip: 'x', x: ox }, { tip: 'z', z: o.z, yon: o.yon }, { tip: 'otur', yon: o.yon });
    return this._isEkle(...isler);
  }
  hemenOtur(o) {
    this.isler = []; this.yerlestir(o.x - o.yon * .15, o.z); this.oturYon = o.yon;
    this.mod = 'otur'; this.aci = this.hedefAci = o.yon * Math.PI / 2; this.g.rotation.y = this.aci;
  }
  hemenDur(x) { this.isler = []; this.mod = 'dur'; this.yerlestir(x, KORIDOR_Z); this.aci = this.hedefAci = 0; }
  get mesgul() { return this.isler.length > 0; }

  guncelle(dt, t) {
    const is = this.isler[0];
    let yuruyor = false;
    if (is) {
      if (is.tip === 'x') {
        const d = is.x - this.x;
        if (Math.abs(d) < .03) { this.x = is.x; this.isler.shift(); }
        else { const adim = Math.sign(d) * Math.min(Math.abs(d), this.hiz * dt); this.x += adim; this.hedefAci = Math.sign(d) * Math.PI / 2; yuruyor = true; }
      } else if (is.tip === 'z') {
        const d = is.z - this.z;
        if (Math.abs(d) < .02) { this.z = is.z; this.isler.shift(); }
        else { this.z += Math.sign(d) * Math.min(Math.abs(d), 2.2 * dt); this.hedefAci = is.yon ? is.yon * Math.PI / 2 : (d > 0 ? 0 : Math.PI); yuruyor = true; }
      } else if (is.tip === 'otur') {
        this.mod = 'otur'; this.oturYon = is.yon; this.hedefAci = is.yon * Math.PI / 2; this.isler.shift();
      } else if (is.tip === 'kalk') {
        this.mod = 'dur'; this.isler.shift();
      } else if (is.tip === 'son') { this.isler.shift(); is.coz(); }
    }
    if (this.mod !== 'otur') this.mod = yuruyor ? 'yuru' : 'dur';
    if (!yuruyor && this.mod === 'dur' && !this.isler.length) this.hedefAci = this.bakX === null ? 0 : Math.sign(this.bakX - this.x) * Math.PI / 2 * .75;

    // dönüş
    let da = this.hedefAci - this.aci; while (da > Math.PI) da -= Math.PI * 2; while (da < -Math.PI) da += Math.PI * 2;
    this.aci += da * Math.min(1, dt * 10);
    this.g.rotation.y = this.aci;

    // poz
    const s = this.s; const B = [this.bSol, this.bSag];
    let y = 0;
    if (this.mod === 'yuru') {
      this.faz += dt * this.hiz * (this.T.cocuk ? 5.5 : 3.6);
      const f = this.faz;
      B[0].ust.rotation.x = Math.sin(f) * .55; B[1].ust.rotation.x = -Math.sin(f) * .55;
      B[0].diz.rotation.x = Math.max(0, -Math.cos(f)) * .7; B[1].diz.rotation.x = Math.max(0, Math.cos(f)) * .7;
      this.kSol.rotation.x = -Math.sin(f) * .45; this.kSag.rotation.x = this.id === 'kondukter' ? -.15 : Math.sin(f) * .45;
      y = Math.abs(Math.cos(f)) * .035;
    } else if (this.mod === 'otur') {
      for (const b of B) { b.ust.rotation.x += (-Math.PI / 2 - b.ust.rotation.x) * Math.min(1, dt * 8); b.diz.rotation.x += (Math.PI / 2 - b.diz.rotation.x) * Math.min(1, dt * 8); }
      this.kSol.rotation.x += (-.55 - this.kSol.rotation.x) * Math.min(1, dt * 6); this.kSag.rotation.x += (-.55 - this.kSag.rotation.x) * Math.min(1, dt * 6);
      y = .56 - .86 * s + .03;
    } else {
      for (const b of B) { b.ust.rotation.x *= Math.max(0, 1 - dt * 10); b.diz.rotation.x *= Math.max(0, 1 - dt * 10); }
      const nefes = Math.sin(t * 1.8 + this.x) * .03;
      this.kSol.rotation.x += (nefes - this.kSol.rotation.x) * Math.min(1, dt * 6);
      this.kSag.rotation.x += ((this.id === 'kondukter' ? -.15 : -nefes) - this.kSag.rotation.x) * Math.min(1, dt * 6);
    }
    this.g.position.set(this.x, this.g.position.y + (y - this.g.position.y) * Math.min(1, dt * 10), this.z);
    this.govde.scale.y = 1 + Math.sin(t * 1.8 + this.x * 3) * .008;
    this.bas.rotation.x = this.konusuyor ? Math.sin(t * 9) * .06 : this.bas.rotation.x * .9;
    if (this.fener) this.fener.rotation.x = -this.kSag.rotation.x + Math.sin(t * 2.3) * .08;
  }
}

// ---------------------------------------------------------------- kedi
export class Kedi {
  constructor(sahne) {
    const g = this.g = new THREE.Group(); sahne.add(g);
    const gri = '#7e848c', acik = '#9aa0a8';
    const gv = this.govde = new THREE.Group(); gv.position.y = .17; g.add(gv);
    gv.add(kure(.14, gri, 0, 0, 0, 1.6, .95, 1));
    gv.add(kure(.1, acik, .02, -.04, 0, 1.3, .7, .85));
    const bas = this.bas = new THREE.Group(); bas.position.set(.22, .1, 0); gv.add(bas);
    bas.add(kure(.1, gri, 0, 0, 0, 1, .92, 1.05));
    for (const z of [-.055, .055]) {
      const k = new THREE.Mesh(new THREE.ConeGeometry(.035, .07, 4), mat(gri)); k.position.set(-.01, .09, z); bas.add(k);
      bas.add(kure(.018, '#f5d24a', .085, .02, z * .8, 1, 1, 1, true));
    }
    bas.add(kure(.014, '#d88a92', .1, -.015, 0));
    this.bacaklar = [];
    for (const [x, z] of [[.13, -.07], [.13, .07], [-.13, -.07], [-.13, .07]]) {
      const b = sil(.025, .025, .14, gri, x, -.1, z, 6); gv.add(b); this.bacaklar.push(b);
    }
    const kuyruk = this.kuyruk = new THREE.Group(); kuyruk.position.set(-.21, .03, 0); gv.add(kuyruk);
    let ebeveyn = kuyruk; this.kuyrukParca = [];
    for (let i = 0; i < 4; i++) {
      const p = new THREE.Group(); p.position.x = i ? -.08 : 0; ebeveyn.add(p);
      const m = sil(.022, .025, .09, i === 3 ? '#f2f2f0' : gri, -.04, 0, 0, 6); m.rotation.z = Math.PI / 2; p.add(m);
      p.rotation.z = .35; this.kuyrukParca.push(p); ebeveyn = p;
    }
    this.vurus = new THREE.Mesh(new THREE.BoxGeometry(.6, .5, .5), new THREE.MeshBasicMaterial({ visible: false }));
    this.vurus.position.y = .2; this.vurus.userData.kisi = 'duman'; g.add(this.vurus);
    this.x = 0; this.z = 0; this.hedef = null; this.faz = 0; this.mod = 'otur'; this.kucakta = null;
    g.scale.setScalar(1.15);
  }
  git(x, z) { this.hedef = { x, z }; return new Promise(c => { this.coz = c; }); }
  yerlestir(x, z) { this.x = x; this.z = z; this.g.position.set(x, 0, z); }
  guncelle(dt, t) {
    if (this.kucakta) {
      const k = this.kucakta; const o = new THREE.Vector3(0, .5, .22).applyMatrix4(k.govde.matrixWorld);
      this.g.position.copy(o).setY(o.y - .2); this.g.rotation.y = k.g.rotation.y + Math.PI / 2;
      this.kuyrukParca.forEach((p, i) => p.rotation.z = .2 + Math.sin(t * 2 + i) * .15);
      return;
    }
    let yuru = false;
    if (this.hedef) {
      const dx = this.hedef.x - this.x, dz = this.hedef.z - this.z, d = Math.hypot(dx, dz);
      if (d < .04) { this.hedef = null; this.coz && this.coz(); }
      else { const a = Math.min(d, 1.8 * dt); this.x += dx / d * a; this.z += dz / d * a; this.g.rotation.y = Math.atan2(-dz, dx); yuru = true; }
    }
    this.g.position.set(this.x, 0, this.z);
    if (yuru) { this.faz += dt * 14; this.bacaklar.forEach((b, i) => b.rotation.z = Math.sin(this.faz + (i % 2 ? Math.PI : 0) + (i > 1 ? Math.PI / 2 : 0)) * .5); }
    else this.bacaklar.forEach(b => b.rotation.z *= .8);
    this.govde.position.y = .17 + (yuru ? Math.abs(Math.sin(this.faz)) * .015 : 0);
    this.kuyrukParca.forEach((p, i) => p.rotation.z = .35 + Math.sin(t * 2.5 - i * .7) * (.15 + i * .05));
    this.bas.rotation.z = yuru ? 0 : Math.sin(t * .7) * .1;
  }
}
