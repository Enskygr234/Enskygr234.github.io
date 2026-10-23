// Sahne çizici: Akasya Sokağı'nın her köşesini, günün saatine ve mevsime göre SVG olarak çizer.
const Sahne = (() => {
  const W = 800, H = 500;

  const ZAMANLAR = {
    sabah:         { gok: ['#9fcdea', '#cfe6f0', '#f9e6c6'], carp: '#fff6ea', isik: 0,    gunes: [610, 120, '#fff4cf'] },
    ogle:          { gok: ['#6fb2e2', '#a8d3ee', '#e3f1f6'], carp: '#ffffff', isik: 0,    gunes: [520, 70, '#fffbe6'] },
    ogleden_sonra: { gok: ['#7db3da', '#c4dbe2', '#f6d7a0'], carp: '#fff0d6', isik: 0,    gunes: [230, 120, '#fff0c2'] },
    aksam:         { gok: ['#3f4a86', '#c9768a', '#f3a56f', '#f9cf86'], carp: '#e7b49e', isik: .45, gunes: [170, 330, '#ffd38a'] },
    gece:          { gok: ['#0a1428', '#16284a', '#2a3f66'], carp: '#53618f', isik: .62, ay: [600, 90] },
  };
  const YAGMUR = { gok: ['#6f7c8b', '#97a2ad', '#bfc6cc'], carp: '#a9b2bb' };

  let Z = ZAMANLAR.ogle, carp = [255, 255, 255], rnd = Math.random, durum = {};

  // ---------- yardımcılar ----------
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const tohex = a => '#' + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  const karis = (a, b, t) => tohex(hex(a).map((v, i) => v + (hex(b)[i] - v) * t));
  // dünya renklerini saate göre boyar (çarpma)
  const t = h => tohex(hex(h).map((v, i) => v * carp[i] / 255));
  const koyu = (h, k = .82) => tohex(hex(h).map(v => v * k));
  function tohum(s) {
    let a = 0; for (const c of String(s)) a = (a * 31 + c.charCodeAt(0)) | 0;
    return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let x = Math.imul(a ^ a >>> 15, 1 | a); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; };
  }
  const sec = a => a[Math.floor(rnd() * a.length)];
  const r = (x, y, w, h, f, ek = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" ${ek}/>`;

  function gokyuzu(hava) {
    const g = hava === 'yagmur' ? YAGMUR.gok : Z.gok;
    const stops = g.map((c, i) => `<stop offset="${i / (g.length - 1)}" stop-color="${c}"/>`).join('');
    let s = `<defs><linearGradient id="gok" x1="0" y1="0" x2="0" y2="1">${stops}</linearGradient>
      <radialGradient id="lamba" r=".5"><stop offset="0" stop-color="#ffe2a0" stop-opacity=".75"/><stop offset=".4" stop-color="#ffcf70" stop-opacity=".25"/><stop offset="1" stop-color="#ffcf70" stop-opacity="0"/></radialGradient>
      <radialGradient id="gunes" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".25" stop-color="#fff6d8" stop-opacity=".55"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></radialGradient>
      <filter id="gren" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .25  0 0 0 0 .15  0 0 0 .09 0"/></filter>
      <radialGradient id="vinyet" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#1a1024" stop-opacity=".38"/></radialGradient>
    </defs>`;
    s += r(0, 0, W, H, 'url(#gok)');
    if (hava === 'yagmur') return s + bulutlar(6, '#8e98a3', .85);
    if (Z.ay) {
      for (let i = 0; i < 90; i++) {
        const x = rnd() * W, y = rnd() * 260, b = rnd() * 1.4 + .3;
        s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${b.toFixed(2)}" fill="#fff" opacity="${(.35 + rnd() * .6).toFixed(2)}"/>`;
      }
      const [x, y] = Z.ay;
      s += `<circle cx="${x}" cy="${y}" r="70" fill="url(#gunes)" opacity=".5"/><circle cx="${x}" cy="${y}" r="22" fill="#f6f0d8"/><circle cx="${x + 9}" cy="${y - 5}" r="20" fill="${Z.gok[0]}" opacity=".0"/>
        <circle cx="${x - 6}" cy="${y - 4}" r="4" fill="#e3dcc0"/><circle cx="${x + 7}" cy="${y + 7}" r="3" fill="#e3dcc0"/>`;
    } else if (Z.gunes) {
      const [x, y, c] = Z.gunes;
      s += `<circle cx="${x}" cy="${y}" r="150" fill="url(#gunes)"/><circle cx="${x}" cy="${y}" r="30" fill="${c}"/>`;
      s += bulutlar(3, Z === ZAMANLAR.aksam ? '#f7b98e' : '#ffffff', Z === ZAMANLAR.aksam ? .75 : .9);
      if (Z !== ZAMANLAR.aksam) s += kuslar();
    }
    return s;
  }

  function bulutlar(n, renk, op) {
    let s = '<g class="bulutlar">';
    for (let i = 0; i < n; i++) {
      const x = rnd() * W, y = 40 + rnd() * 120, k = .6 + rnd() * .9;
      s += `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${k.toFixed(2)})" opacity="${op}">
        <ellipse cx="0" cy="0" rx="60" ry="16" fill="${renk}"/><ellipse cx="-22" cy="-10" rx="26" ry="18" fill="${renk}"/>
        <ellipse cx="14" cy="-16" rx="30" ry="22" fill="${renk}"/><ellipse cx="44" cy="-4" rx="20" ry="13" fill="${renk}"/></g>`;
    }
    return s + '</g>';
  }

  function kuslar() {
    let s = '';
    for (let i = 0; i < 4; i++) {
      const x = 260 + rnd() * 300, y = 60 + rnd() * 80, k = .6 + rnd() * .6;
      s += `<path d="M${x} ${y} q ${6 * k} ${-6 * k} ${12 * k} 0 q ${6 * k} ${-6 * k} ${12 * k} 0" fill="none" stroke="#4a5568" stroke-width="1.6" stroke-linecap="round" opacity=".6"/>`;
    }
    return s;
  }

  // uzaktaki şehir: apartmanlar, bir kubbe, iki minare
  function silüet(yer = 300) {
    const renk = karis(Z.gok[Z.gok.length - 1], durum.hava === 'yagmur' ? '#6e7884' : (Z.ay ? '#0e1830' : '#7f8fa8'), .55);
    let s = `<g fill="${renk}">`;
    let x = -10;
    while (x < W + 10) {
      const w = 30 + rnd() * 50, h = 30 + rnd() * 70;
      s += r(x, yer - h, w, h + 40, renk);
      x += w - 4;
    }
    s += `<path d="M330 ${yer - 40} a 46 46 0 0 1 92 0 z"/>${r(330, yer - 40, 92, 50, renk)}`;
    s += `${r(316, yer - 120, 7, 120, renk)}<path d="M314 ${yer - 120} l 5.5 -22 l 5.5 22 z"/>`;
    s += `${r(430, yer - 112, 7, 112, renk)}<path d="M428 ${yer - 112} l 5.5 -22 l 5.5 22 z"/>`;
    s += '</g>';
    if (Z.isik) for (let i = 0; i < 40; i++) s += r((rnd() * W).toFixed(0), (yer - 10 - rnd() * 60).toFixed(0), 2, 2, '#ffd98a', `opacity="${(Z.isik + .2).toFixed(2)}"`);
    return s;
  }

  // ---------- binalar ----------
  function pencere(x, y, w, h, opts = {}) {
    const yanik = Z.isik && rnd() < (durum.karanlik ? .14 : Z.isik);
    const cerceve = t('#f3ede2');
    let cam = yanik ? (durum.karanlik ? sec(['#e8963a', '#d8782a']) : sec(['#ffd479', '#ffc861', '#ffe2a2', '#f7b96a'])) : t(sec(['#8fb2c4', '#7ea3b8', '#9dbdcb']));
    let s = r(x - 2, y - 2, w + 4, h + 4, cerceve) + r(x, y, w, h, cam);
    if (!yanik) s += `<path d="M${x} ${y + h} L${x + w * .6} ${y} L${x + w} ${y} L${x + w} ${y + h * .2} L${x + w * .25} ${y + h}z" fill="#fff" opacity=".18"/>`;
    if (rnd() < .5) { const pc = t(sec(['#d9826b', '#e8c26a', '#9cc0a8', '#f2f2ec', '#c98fb0'])); s += r(x, y, w * .38, h, pc, 'opacity=".85"'); }
    s += r(x + w / 2 - 1, y, 2, h, cerceve);
    if (yanik) s += `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" fill="#ffcf70" opacity=".12" rx="4"/>`;
    if (opts.balkon) {
      const by = y + h - 6;
      s += r(x - 10, by + 6, w + 20, 4, t('#d8d0c2'));
      s += r(x - 10, by - 16, w + 20, 22, 'none', `stroke="${t('#5b5650')}" stroke-width="1.4"`);
      for (let i = x - 6; i < x + w + 10; i += 5) s += r(i, by - 16, 1.2, 22, t('#5b5650'));
      if (rnd() < .6) {
        for (let i = 0; i < 3; i++) {
          const px = x - 4 + i * (w / 2.4);
          s += r(px, by - 24, 9, 8, t('#b8653f')) + `<circle cx="${px + 4.5}" cy="${by - 28}" r="6" fill="${t('#3f7a46')}"/><circle cx="${px + 2}" cy="${by - 31}" r="2.4" fill="${t('#d8343a')}"/><circle cx="${px + 7}" cy="${by - 29}" r="2.2" fill="${t('#e2474a')}"/>`;
        }
      }
    }
    return s;
  }

  function bina(x, zemin, w, kat, renk, opts = {}) {
    const kh = 62, h = kat * kh + 14, y = zemin - h;
    const govde = t(renk), golge = t(koyu(renk, .78));
    let s = `<g>${r(x, y, w, h, govde)}${r(x + w - 10, y, 10, h, golge)}`;
    s += r(x - 4, y - 8, w + 8, 10, t(koyu(renk, .9)));
    // sıva lekeleri
    for (let i = 0; i < 5; i++) s += `<ellipse cx="${x + rnd() * w}" cy="${y + rnd() * h}" rx="${8 + rnd() * 18}" ry="${4 + rnd() * 9}" fill="${golge}" opacity=".18"/>`;
    const sutun = Math.max(1, Math.floor((w - 20) / 52));
    const pw = 28, ph = 36, aralik = (w - 10 - sutun * pw) / (sutun + 1);
    for (let k = 0; k < kat; k++) {
      if (k === kat - 1 && opts.dukkan) continue;
      for (let c = 0; c < sutun; c++) {
        const px = x + aralik + c * (pw + aralik), py = y + 18 + k * kh;
        s += pencere(px, py, pw, ph, { balkon: opts.balkonlu && (c + k) % 2 === 0 && k < kat - 1 });
      }
    }
    // çatı: anten
    if (opts.anten !== false) {
      const ax = x + 14 + rnd() * (w - 40);
      s += `<path d="M${ax} ${y - 8} v-30 M${ax - 14} ${y - 30} h28 M${ax - 10} ${y - 22} h20" stroke="${t('#4a4a4a')}" stroke-width="1.6" fill="none"/>`;
      if (rnd() < .5) s += r(x + w - 40, y - 26, 26, 18, t('#c9c9c4'), 'rx="2"') + `<ellipse cx="${x + w - 27}" cy="${y - 26}" rx="13" ry="3" fill="${t('#a8a8a2')}"/>`;
    }
    if (opts.kapi) {
      const kx = x + w / 2 - 16;
      s += r(kx - 4, zemin - 54, 40, 54, t('#e6dccb')) + r(kx, zemin - 50, 32, 50, t('#6b4a34')) + r(kx + 4, zemin - 46, 24, 18, t('#9fb8c4')) + `<circle cx="${kx + 26}" cy="${zemin - 22}" r="1.6" fill="${t('#e0c060')}"/>`;
      s += r(kx - 2, zemin - 64, 36, 7, t('#3a5a8a'), 'rx="1"') + `<text x="${kx + 16}" y="${zemin - 58.5}" font-size="6" text-anchor="middle" fill="${t('#fff')}" font-family="Literata, serif">${opts.kapi}</text>`;
    }
    return s + '</g>';
  }

  function bakkal(x, zemin, w) {
    let s = '';
    const y = zemin - 62;
    s += r(x, y, w, 62, t('#e9dfcc'));
    // vitrin
    s += r(x + 10, y + 18, w * .55, 40, t('#5c4632')) + r(x + 13, y + 21, w * .55 - 6, 34, t(Z.isik ? '#ffd78a' : '#a7c2cc'));
    for (let i = 0; i < 6; i++) s += r(x + 16 + i * ((w * .55 - 12) / 6), y + 40, (w * .55 - 16) / 6 - 3, 12, t(sec(['#d84b3a', '#3f7cc0', '#e8c13a', '#4aa36a', '#f2f2f2'])));
    for (let i = 0; i < 5; i++) s += `<circle cx="${x + 22 + i * 16}" cy="${y + 31}" r="5" fill="${t(sec(['#e8853a', '#c8343a', '#f0d040']))}"/>`;
    // kapı
    const kx = x + w * .55 + 22;
    s += r(kx, y + 12, w - (kx - x) - 10, 50, t('#5c4632')) + r(kx + 4, y + 16, w - (kx - x) - 18, 46, t(Z.isik ? '#ffcf78' : '#3d332a'));
    // tente
    const tw = w + 16, ts = 10;
    for (let i = 0; i < ts; i++) s += `<path d="M${x - 8 + i * tw / ts} ${y - 4} h${tw / ts} l -4 22 h${-tw / ts} z" fill="${t(i % 2 ? '#f4efe6' : '#cc3b33')}"/>`;
    for (let i = 0; i < ts; i++) s += `<path d="M${x - 12 + i * tw / ts} ${y + 18} q ${tw / ts / 2} 9 ${tw / ts} 0" fill="${t(i % 2 ? '#f4efe6' : '#cc3b33')}"/>`;
    // tabela
    s += r(x + 6, y - 36, w - 12, 26, t('#1f4f7a'), 'rx="3"');
    s += `<text x="${x + w / 2}" y="${y - 18}" font-size="13" text-anchor="middle" fill="${t('#fbf3d8')}" font-family="Literata, serif" font-weight="700" letter-spacing=".5">CEMİL BAKKALİYESİ</text>`;
    // kasalar, gazete
    s += r(x - 30, zemin - 22, 30, 22, t('#b58a52')) + r(x - 30, zemin - 22, 30, 4, t('#8a6638'));
    for (let i = 0; i < 4; i++) s += `<circle cx="${x - 25 + i * 7}" cy="${zemin - 25}" r="4" fill="${t(sec(['#e8853a', '#d84b3a', '#8fc04a']))}"/>`;
    s += r(x + w + 4, zemin - 34, 22, 34, t('#8a8f96')) + r(x + w + 6, zemin - 32, 18, 12, t('#ece6d6')) + r(x + w + 6, zemin - 18, 18, 10, t('#e8e2d2'));
    // asılı toplar
    s += `<path d="M${kx + 8} ${y + 8} v10" stroke="${t('#444')}"/><circle cx="${kx + 8}" cy="${y + 24}" r="6" fill="${t('#e4e4e4')}"/><path d="M${kx + 3} ${y + 22} q5 4 10 0" stroke="${t('#222')}" fill="none" stroke-width=".8"/>`;
    return s;
  }

  function direk(x, zemin, yuk = 230) {
    const c = t('#5e4a38');
    return r(x - 3, zemin - yuk, 6, yuk, c) + r(x - 26, zemin - yuk + 14, 52, 5, c) + r(x - 18, zemin - yuk + 30, 36, 4, c) +
      [-22, -8, 8, 22].map(d => `<circle cx="${x + d}" cy="${zemin - yuk + 12}" r="2.4" fill="${t('#e8e2d4')}"/>`).join('');
  }

  function teller(x1, x2, y) {
    let s = '';
    for (let i = 0; i < 4; i++) {
      const yy = y + i * 6;
      s += `<path d="M${x1} ${yy} Q ${(x1 + x2) / 2} ${yy + 38 + i * 4} ${x2} ${yy + 4}" stroke="${t('#2d2a28')}" stroke-width="1.1" fill="none" opacity=".75"/>`;
    }
    return s;
  }

  function lamba(x, zemin) {
    const c = t('#3f4650');
    let s = `<path d="M${x} ${zemin} V ${zemin - 190} q 0 -22 26 -22 h 6" stroke="${c}" stroke-width="5" fill="none"/>`;
    s += `<path d="M${x + 24} ${zemin - 214} h18 l -4 8 h-10 z" fill="${c}"/>`;
    if (Z.isik && !durum.karanlik) s += `<circle cx="${x + 33}" cy="${zemin - 202}" r="95" fill="url(#lamba)"/><ellipse cx="${x + 33}" cy="${zemin - 204}" rx="6" ry="3" fill="#fff4c8"/>` +
      `<ellipse cx="${x + 33}" cy="${zemin + 2}" rx="90" ry="16" fill="#ffd98a" opacity=".22"/>`;
    return s;
  }

  function ip(x1, y1, x2, y2) {
    const cy = Math.max(y1, y2) + 26;
    let s = `<path d="M${x1} ${y1} Q ${(x1 + x2) / 2} ${cy} ${x2} ${y2}" stroke="${t('#d8d2c6')}" stroke-width="1" fill="none"/>`;
    const n = Math.floor(Math.abs(x2 - x1) / 30);
    for (let i = 1; i < n; i++) {
      const tt = i / n, px = x1 + (x2 - x1) * tt;
      const py = (1 - tt) * (1 - tt) * y1 + 2 * (1 - tt) * tt * cy + tt * tt * y2;
      const tur = rnd(), renk = t(sec(['#e44c3c', '#f2efe7', '#4a7fc0', '#f2c94c', '#7bbf8e', '#e996b4', '#ffffff']));
      if (tur < .4) s += `<path d="M${px - 9} ${py} h18 l3 6 h-4 v14 h-16 v-14 h-4 z" fill="${renk}"/>`;
      else if (tur < .7) s += r(px - 10, py, 20, 26, renk);
      else s += r(px - 7, py, 14, 18, renk) + r(px - 7, py + 18, 6, 10, renk) + r(px + 1, py + 18, 6, 10, renk);
      s += r(px - 2, py - 3, 4, 5, t('#7a6a5a'));
    }
    return s;
  }

  function kopek(x, y, k = 1, ayakta = false) {
    const c = t('#1f1c1e'), g = t('#3a3436');
    if (ayakta) return `<g transform="translate(${x} ${y}) scale(${k})"><ellipse cx="0" cy="-22" rx="22" ry="11" fill="${c}"/>${r(-18, -16, 5, 16, c)}${r(12, -16, 5, 16, c)}<circle cx="22" cy="-32" r="9" fill="${c}"/><path d="M24 -40 l6 -8 l2 9z" fill="${g}"/><path d="M-22 -24 q -10 -8 -8 -18" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="26" cy="-34" r="1.4" fill="#e8c860"/></g>`;
    return `<g transform="translate(${x} ${y}) scale(${k})">
      <ellipse cx="0" cy="-8" rx="26" ry="9" fill="${c}"/><ellipse cx="24" cy="-11" rx="9" ry="7.5" fill="${c}"/>
      <path d="M26 -17 l5 -6 l3 7z" fill="${g}"/><ellipse cx="33" cy="-8" rx="5" ry="3.2" fill="${c}"/>
      <path d="M-24 -8 q -14 2 -16 -6" stroke="${c}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M10 -2 h18" stroke="${g}" stroke-width="3" stroke-linecap="round"/>
      ${durum.kurdele ? `<path d="M17 -14 l4 9" stroke="#d8343a" stroke-width="3"/>` : ''}</g>`;
  }

  function kedi(x, y) {
    const c = t('#e08a3a');
    return `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="-7" rx="10" ry="7" fill="${c}"/><circle cx="9" cy="-14" r="5.5" fill="${c}"/><path d="M6 -18 l1 -6 l3 4z M11 -18 l2 -5 l2 5z" fill="${c}"/><path d="M-9 -6 q -10 -2 -8 -14" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>`;
  }

  // ---------- dut ağacı ----------
  function dut(x, zemin, k = 1) {
    const b = durum.bolum || 1;
    const govde = t('#6a4a32');
    let s = `<g transform="translate(${x} ${zemin}) scale(${k})">`;
    s += `<path d="M-16 0 C -12 -60 -22 -100 -8 -150 L 8 -150 C 20 -100 14 -60 18 0 Z" fill="${govde}"/>`;
    s += `<path d="M-4 -120 C -30 -150 -60 -160 -90 -170 M2 -130 C 30 -160 50 -175 86 -180 M0 -145 C -6 -175 4 -200 0 -220" stroke="${govde}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
    s += `<path d="M-6 -60 q 4 -10 2 -24 M6 -30 q -3 -8 0 -16" stroke="${t('#4a3222')}" stroke-width="2" fill="none"/>`;
    const yaprak = b <= 3 ? ['#3f7a3a', '#4e8d43', '#5f9c4a', '#356b33'] : b === 4 ? ['#5a8a3a', '#7a9a3a', '#a8a43a', '#4e7d3a'] : b === 5 ? ['#c9a43a', '#d88a32', '#b8742a', '#9aa03a'] : ['#b88a3a', '#a06a2a'];
    const yogun = b <= 4 ? 34 : b === 5 ? 22 : (durum.bitis === 'park' || durum.bitis === 'dut' ? 34 : 9);
    const kr = tohum('dut' + b);
    for (let i = 0; i < yogun; i++) {
      const a = kr() * Math.PI, d = kr();
      const cx = Math.cos(a) * 120 * d * (1.1 - d * .2), cy = -175 - Math.sin(a) * 70 * d + kr() * 30;
      s += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${(18 + kr() * 22).toFixed(0)}" fill="${t(yaprak[Math.floor(kr() * yaprak.length)])}" opacity="${b === 6 && !durum.bitis ? .85 : 1}"/>`;
    }
    if (b <= 2) for (let i = 0; i < 18; i++) { const cx = (kr() - .5) * 200, cy = -150 - kr() * 90; s += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="2.6" fill="${t(kr() < .5 ? '#3a1a3a' : '#7a2a5a')}"/>`; }
    if (b >= 5) for (let i = 0; i < 14; i++) s += `<ellipse cx="${((kr() - .5) * 260).toFixed(0)}" cy="${(-2 + kr() * 8).toFixed(0)}" rx="5" ry="2.4" fill="${t(yaprak[0])}" transform="rotate(${(kr() * 180).toFixed(0)} 0 0)" opacity=".9"/>`;
    return s + '</g>';
  }

  function tabela(x, zemin) {
    const c = t('#1d58a8'), d = t('#7a7a7a');
    return `<g>${r(x + 6, zemin - 120, 5, 120, d)}${r(x + 126, zemin - 120, 5, 120, d)}${r(x, zemin - 150, 138, 70, c, 'rx="2"')}
      ${r(x + 4, zemin - 146, 130, 62, 'none', `stroke="${t('#ffffff')}" stroke-width="1.2" opacity=".6"`)}
      <text x="${x + 69}" y="${zemin - 126}" font-size="15" text-anchor="middle" fill="${t('#fff')}" font-family="Literata, serif" font-weight="800">RIZA YAPI</text>
      <text x="${x + 69}" y="${zemin - 110}" font-size="6.4" text-anchor="middle" fill="${t('#e6eefc')}" font-family="Literata, serif">BU ARSADA 5 KATLI LÜKS KONUT</text>
      <text x="${x + 69}" y="${zemin - 101}" font-size="6.4" text-anchor="middle" fill="${t('#e6eefc')}" font-family="Literata, serif">YAPILACAKTIR — KASIM 1996</text>
      ${durum.bolum >= 3 ? `<text x="${x + 69}" y="${zemin - 88}" font-size="10" text-anchor="middle" fill="${t('#ffffff')}" font-family="Caveat, cursive" transform="rotate(-4 ${x + 69} ${zemin - 90})" opacity=".9">BURASI BİZİM</text>` : ''}</g>`;
  }

  function kale(x, zemin) {
    let s = '';
    for (const dx of [0, 70]) for (let i = 0; i < 3; i++) s += `<ellipse cx="${x + dx + (i - 1) * 3}" cy="${zemin - i * 7}" rx="${9 - i * 2}" ry="5" fill="${t(sec(['#9a948a', '#b0aa9e', '#87817a']))}"/>`;
    return s;
  }

  function bayraklar(x1, x2, y) {
    const renkler = ['#d8343a', '#f2c94c', '#3f7cc0', '#4aa36a', '#e996b4', '#f28a3a'];
    let s = `<path d="M${x1} ${y} Q ${(x1 + x2) / 2} ${y + 30} ${x2} ${y}" stroke="${t('#6a6a6a')}" fill="none"/>`;
    const n = Math.floor((x2 - x1) / 22);
    for (let i = 0; i < n; i++) {
      const tt = (i + .5) / n, px = x1 + (x2 - x1) * tt, py = y + 30 * 2 * tt * (1 - tt);
      s += `<path d="M${px - 8} ${py} h16 l-8 16z" fill="${t(renkler[i % renkler.length])}"/>`;
    }
    return s;
  }

  function masa(x, zemin, ortu = '#d8343a') {
    let s = r(x, zemin - 34, 90, 6, t('#8a6a4a')) + r(x + 4, zemin - 28, 4, 28, t('#6a4a32')) + r(x + 82, zemin - 28, 4, 28, t('#6a4a32'));
    s += `<path d="M${x - 4} ${zemin - 36} h98 v16 h-98z" fill="${t(ortu)}"/>`;
    for (let i = 0; i < 6; i++) s += `<path d="M${x - 4 + i * 16} ${zemin - 20} h8 v-16 h8 v16" fill="${t('#ffffff')}" opacity=".35"/>`;
    s += `<ellipse cx="${x + 25}" cy="${zemin - 38}" rx="18" ry="4" fill="${t('#d8b070')}"/><ellipse cx="${x + 65}" cy="${zemin - 40}" rx="14" ry="5" fill="${t('#c08040')}"/>`;
    for (let i = 0; i < 4; i++) s += r(x + 48 + i * 6, zemin - 52, 4, 14, t('#3a7a4a'), 'rx="1"');
    return s;
  }

  function fotograflar(x1, x2, y) {
    let s = `<path d="M${x1} ${y} Q ${(x1 + x2) / 2} ${y + 20} ${x2} ${y}" stroke="${t('#444')}" fill="none"/>`;
    const n = Math.floor((x2 - x1) / 40);
    for (let i = 0; i < n; i++) {
      const tt = (i + .5) / n, px = x1 + (x2 - x1) * tt, py = y + 20 * 2 * tt * (1 - tt);
      s += `<g transform="rotate(${(rnd() * 8 - 4).toFixed(1)} ${px} ${py})">${r(px - 14, py + 2, 28, 34, t('#f6f2e8'))}${r(px - 11, py + 5, 22, 22, t(sec(['#6a7a8a', '#8a6a5a', '#5a6a5a', '#7a7a6a'])))}${r(px - 3, py - 2, 6, 7, t('#c8a878'))}</g>`;
    }
    return s;
  }

  function yagmur() {
    let s = '<g class="yagmur" opacity=".55">';
    for (let i = 0; i < 160; i++) {
      const x = rnd() * (W + 100) - 50, y = rnd() * H, l = 10 + rnd() * 14;
      s += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} l -4 ${l.toFixed(0)}" stroke="#e8eef4" stroke-width="1" />`;
    }
    s += '</g>';
    return s + r(0, 0, W, H, '#5a6878', 'opacity=".12"');
  }

  function zeminSokak(y) {
    let s = r(0, y, W, H - y, t('#77716c'));
    s += r(0, y, W, 10, t('#b9b1a4')) + r(0, y + 10, W, 3, t('#8f877c'));
    for (let i = 0; i < 18; i++) s += r(i * 48, y, 1.5, 10, t('#9d968a'));
    s += r(0, y + 72, W, 4, t('#e9e3d2'), 'opacity=".25"');
    for (let i = 0; i < 12; i++) s += `<ellipse cx="${rnd() * W}" cy="${y + 20 + rnd() * 70}" rx="${10 + rnd() * 30}" ry="${2 + rnd() * 3}" fill="${t('#5f5a56')}" opacity=".35"/>`;
    if (durum.hava === 'yagmur') for (let i = 0; i < 8; i++) s += `<ellipse cx="${rnd() * W}" cy="${y + 30 + rnd() * 60}" rx="${20 + rnd() * 30}" ry="${3 + rnd() * 3}" fill="#c8d2dc" opacity=".35"/>`;
    return s;
  }

  function zeminArsa(y) {
    const c = durum.hava === 'yagmur' ? '#8a6e52' : '#c9a476';
    let s = r(0, y, W, H - y, t(c));
    for (let i = 0; i < 40; i++) s += `<ellipse cx="${rnd() * W}" cy="${y + 6 + rnd() * (H - y)}" rx="${3 + rnd() * 14}" ry="${1 + rnd() * 3}" fill="${t(koyu(c, .85))}" opacity=".5"/>`;
    for (let i = 0; i < 26; i++) { const x = rnd() * W, yy = y + 4 + rnd() * (H - y); s += `<path d="M${x} ${yy} l -3 -8 M${x} ${yy} l 0 -10 M${x} ${yy} l 3 -8" stroke="${t(durum.bolum >= 5 ? '#9a9a4a' : '#6f9a4a')}" stroke-width="1.4"/>`; }
    if (durum.hava === 'yagmur') for (let i = 0; i < 9; i++) s += `<ellipse cx="${rnd() * W}" cy="${y + 20 + rnd() * 70}" rx="${16 + rnd() * 30}" ry="${3 + rnd() * 4}" fill="#b8c6d0" opacity=".45"/>`;
    return s;
  }

  // ---------- mekanlar ----------
  const MEKAN = {
    sokak() {
      const z = 400;
      let s = silüet(300);
      s += bina(-20, z, 190, 4, '#e8b5a6', { balkonlu: true });
      s += bina(160, z, 170, 4, '#e7c77f', { balkonlu: true, dukkan: true, kapi: 'No: 3' });
      s += bakkal(165, z, 160);
      s += bina(470, z, 180, 5, '#a9ccb6', { balkonlu: true, kapi: 'No: 5' });
      s += bina(640, z, 190, 4, '#f0c39b', { balkonlu: true });
      s += dut(400, z - 6, .62);
      s += ip(150, 190, 474, 176) + ip(-10, 250, 160, 242);
      s += direk(355, z) + teller(-20, 355, 186) + teller(355, 820, 188);
      s += lamba(612, z + 6);
      s += zeminSokak(z);
      if (durum.bolum !== 6) s += kopek(560, z + 54, .9);
      s += kedi(118, z - 1);
      if (durum.karanlik) for (const [x, y] of [[230, z + 30], [420, z + 40], [520, z + 26], [300, z + 60]]) s += `<circle cx="${x}" cy="${y - 14}" r="46" fill="url(#lamba)"/><path d="M${x - 5} ${y} h10 l-2 -12 h-6z" fill="#8a6a4a"/><ellipse cx="${x}" cy="${y - 16}" rx="3" ry="5" fill="#ffd27a"/>`;
      return s;
    },
    arsa() {
      const z = 360;
      let s = silüet(300);
      s += bina(-30, z, 210, 5, '#e3a796', { balkonlu: true });
      s += bina(612, z, 220, 5, '#d9c88f', { balkonlu: true });
      const yikik = ['son_mac', 'mektup', 'yalniz'].includes(durum.bitis);
      if (durum.bitis === 'dut') s += bina(220, z - 6, 380, 5, '#f2d36a', { balkonlu: true, anten: false });
      else if (yikik) s += bina(170, z + 70, 460, 6, '#f2d36a', { balkonlu: true, kapi: 'AKASYA SİTESİ' });
      else s += r(180, z - 70, 432, 70, t('#cfc2ad')) + r(180, z - 74, 432, 6, t('#b8ab96'));
      s += zeminArsa(z);
      if (durum.bitis === 'park') {
        s += r(0, z, W, H - z, t('#7fae5a'), 'opacity=".75"');
        s += `<path d="M120 ${z + 40} v-80 M190 ${z + 40} v-80 M110 ${z - 40} h90" stroke="${t('#c8343a')}" stroke-width="5" fill="none"/>
          <path d="M140 ${z - 40} v52 M170 ${z - 40} v52" stroke="${t('#555')}" stroke-width="1.6"/>${r(134, z + 12, 42, 5, t('#3f6fb0'))}`;
        s += r(560, z + 38, 90, 8, t('#8a5a32')) + r(565, z + 46, 5, 14, t('#555')) + r(640, z + 46, 5, 14, t('#555')) + r(560, z + 20, 90, 6, t('#8a5a32'));
        s += `${r(468, z - 30, 4, 70, t('#666'))}${r(440, z - 60, 70, 36, t('#3f8a4a'), 'rx="2"')}<text x="475" y="${z - 44}" font-size="8" text-anchor="middle" fill="#fff" font-family="Literata, serif" font-weight="700">AKASYA PARKI</text><text x="475" y="${z - 33}" font-size="5" text-anchor="middle" fill="#e8f4e8" font-family="Literata, serif">Mahalle halkı tarafından korunmuştur</text>`;
      } else if (!yikik) {
        s += kale(130, z + 70) + kale(600, z + 70);
        if (durum.tabela && durum.bitis !== 'dut') s += tabela(470, z + 30);
      }
      if (durum.bitis === 'dut') s += r(330, z + 52, 90, 7, t('#8a5a32')) + r(334, z + 59, 4, 12, t('#555')) + r(412, z + 59, 4, 12, t('#555'));
      if (yikik) {
        s += r(330, z + 6, 140, 24, t('#e8402a'), 'rx="2"') + `<text x="400" y="${z + 23}" font-size="13" text-anchor="middle" fill="${t('#fff')}" font-family="Literata, serif" font-weight="800">MARKET</text>`;
        return s + lamba(690, z + 40);
      }
      s += dut(330, z + 40, 1.05);
      if (durum.kermes) { s += bayraklar(160, 640, 200) + bayraklar(170, 610, 250) + masa(170, z + 84) + masa(520, z + 92, '#3f7cc0'); }
      if (durum.sergi) s += fotograflar(420, 640, 262);
      s += lamba(690, z + 40);
      if (durum.bolum !== 6 || durum.bitis) s += kopek(250, z + 112, 1.1);
      return s;
    },
    balkon() {
      const z = 330;
      let s = silüet(260);
      s += bina(-40, 420, 280, 6, '#a9ccb6', { balkonlu: true });
      s += bina(230, 420, 240, 6, '#e8b5a6', { balkonlu: true });
      s += bina(460, 420, 380, 6, '#efd9a2', { balkonlu: true });
      s += ip(0, 230, 800, 210);
      // ön plan: balkon zemini, korkuluk, saksılar, masa
      s += r(0, z + 70, W, H - z - 70, t('#c9b49a')) + r(0, z + 66, W, 8, t('#a8937a'));
      s += r(0, z - 20, W, 6, t('#4a4440'));
      for (let x = 6; x < W; x += 16) s += r(x, z - 16, 3, 84, t('#4a4440'));
      for (let i = 0; i < 7; i++) {
        const px = 30 + i * 118;
        s += `<path d="M${px} ${z - 22} h40 l -5 -30 h-30z" fill="${t('#b8653f')}"/>`;
        for (let j = 0; j < 7; j++) s += `<circle cx="${px + 6 + rnd() * 28}" cy="${z - 58 - rnd() * 22}" r="${5 + rnd() * 4}" fill="${t(sec(['#3f7a46', '#4a8a50']))}"/>`;
        for (let j = 0; j < 5; j++) s += `<circle cx="${px + 6 + rnd() * 28}" cy="${z - 68 - rnd() * 22}" r="${3 + rnd() * 2}" fill="${t(sec(['#d8343a', '#e8484a', '#c8202a']))}"/>`;
      }
      s += `<ellipse cx="400" cy="${z + 110}" rx="120" ry="18" fill="${t('#e8e0d0')}"/>${r(392, z + 110, 16, 60, t('#8a7a6a'))}`;
      for (let i = 0; i < 4; i++) s += `<path d="M${350 + i * 30} ${z + 92} l 3 16 h8 l3 -16 z" fill="#d07a3a" opacity=".85"/><path d="M${350 + i * 30} ${z + 92} h14" stroke="#fff" opacity=".6"/>`;
      return s;
    },
    bakkal() {
      let s = r(0, 0, W, H, t('#e9dcc2'));
      s += r(0, 0, W, 40, t('#d4c4a6'));
      // raflar
      for (let k = 0; k < 4; k++) {
        const y = 70 + k * 64;
        s += r(40, y + 44, 470, 8, t('#8a6a46'));
        let x = 46;
        while (x < 500) {
          const w = 14 + rnd() * 22, h = 22 + rnd() * 20;
          s += r(x, y + 44 - h, w, h, t(sec(['#d84b3a', '#3f7cc0', '#e8c13a', '#4aa36a', '#f2f2f2', '#e8853a', '#7a4ab0', '#2a8a8a'])));
          s += r(x + 2, y + 44 - h + 5, w - 4, 5, t('#ffffff'), 'opacity=".55"');
          x += w + 2;
        }
      }
      // pencere
      const pc = Z.ay ? '#1f2c48' : (Z === ZAMANLAR.aksam ? '#f3b07a' : '#bcd9e6');
      s += r(560, 70, 200, 170, t('#6b4a34')) + r(568, 78, 184, 154, pc);
      s += `<path d="M568 232 L 620 78 L 680 78 L 620 232z" fill="#fff" opacity=".2"/>`;
      s += r(658, 78, 4, 154, t('#6b4a34'));
      // tezgah
      s += r(0, 330, W, 170, t('#8a5e3a')) + r(0, 322, W, 14, t('#a87a52'));
      // kavanozlar
      for (let i = 0; i < 5; i++) {
        const x = 60 + i * 50;
        s += `<rect x="${x}" y="270" width="36" height="52" rx="6" fill="#dfeef2" opacity=".75"/>${r(x + 2, 264, 32, 8, t('#c8343a'), 'rx="2"')}`;
        for (let j = 0; j < 8; j++) s += `<circle cx="${x + 6 + rnd() * 24}" cy="${282 + rnd() * 34}" r="4" fill="${sec(['#e84a8a', '#f2c94c', '#4ab0e8', '#f28a3a', '#8ae84a'])}"/>`;
      }
      // terazi
      s += `<path d="M420 322 h80 l -10 -10 h-60z" fill="${t('#c8c0b0')}"/>${r(456, 270, 8, 44, t('#9a9a9a'))}<path d="M410 272 h100" stroke="${t('#7a7a7a')}" stroke-width="4"/><path d="M410 272 l-12 26 h24z M510 272 l-12 26 h24z" fill="${t('#d8c070')}"/>`;
      // defter
      s += `<g transform="rotate(-6 600 316)">${r(560, 300, 90, 20, t('#7a4e2a'), 'rx="2"')}${r(564, 302, 82, 3, t('#f0e6d0'))}</g>`;
      // radyo
      s += r(670, 286, 80, 40, t('#6a5040'), 'rx="6"') + `<circle cx="694" cy="306" r="12" fill="${t('#d8c8a8')}"/>` + r(714, 296, 28, 20, t('#3a2a20'));
      // asılı lamba
      s += `<path d="M400 0 v60" stroke="${t('#333')}"/><path d="M380 60 h40 l -8 18 h-24z" fill="${t('#2f5a3a')}"/>`;
      if (Z.isik) s += `<circle cx="400" cy="90" r="220" fill="url(#lamba)"/>`;
      if (Z.ay) s += r(0, 0, W, H, '#ffb060', 'opacity=".08"') + `<g opacity=".95"><rect x="300" y="300" width="14" height="24" fill="#f6efe0"/><path d="M307 300 q -3 -8 0 -14 q 3 6 0 14" fill="#ffcf5a"/><circle cx="307" cy="292" r="40" fill="url(#lamba)"/></g>` + `<g transform="translate(160 312)">${r(0, 0, 120, 12, '#6a4a2a')}${r(2, 2, 116, 8, '#d8b878')}<circle cx="20" cy="-4" r="4" fill="#f2f2f2"/><circle cx="30" cy="-4" r="4" fill="#5a3a2a"/></g>`;
      return s;
    },
    oda() {
      let s = r(0, 0, W, H, t('#dfe6d8'));
      for (let x = 0; x < W; x += 26) s += r(x, 0, 12, H, t('#d4dccc'), 'opacity=".6"');
      // pencere: dışarıda arsa ve tabela
      s += `<clipPath id="pc"><rect x="430" y="60" width="300" height="220"/></clipPath><g clip-path="url(#pc)">` + r(430, 60, 300, 220, 'url(#gok)');
      if (Z.ay) for (let i = 0; i < 30; i++) s += `<circle cx="${430 + rnd() * 300}" cy="${60 + rnd() * 120}" r="${rnd() * 1.2 + .3}" fill="#fff" opacity=".7"/>`;
      s += `<g transform="translate(430 60) scale(.375)">${bina(-20, 560, 220, 5, '#e3a796', { balkonlu: true, anten: false })}${['son_mac', 'mektup', 'yalniz'].includes(durum.bitis) ? bina(260, 560, 380, 6, '#f2d36a', { anten: false }) : dut(380, 560, .9)}${(durum.tabela && !durum.bitis) ? tabela(500, 560) : ''}${r(0, 560, 800, 200, t('#b8956a'))}${lamba(660, 560)}</g>`;
      if (durum.hava === 'yagmur') { for (let i = 0; i < 40; i++) s += `<path d="M${430 + rnd() * 300} ${60 + rnd() * 220} l -2 10" stroke="#fff" opacity=".5"/>`; s += r(430, 60, 300, 220, '#8090a0', 'opacity=".25"'); }
      s += '</g>';
      s += r(420, 50, 320, 10, t('#f2efe6')) + r(420, 280, 320, 14, t('#f2efe6')) + r(420, 50, 10, 244, t('#f2efe6')) + r(730, 50, 10, 244, t('#f2efe6')) + r(576, 50, 8, 244, t('#f2efe6'));
      s += `<path d="M400 40 q 30 120 0 260 h-30 v-260z" fill="${t('#e8a07a')}"/><path d="M760 40 q -30 120 0 260 h30 v-260z" fill="${t('#e8a07a')}"/>`;
      // yatak
      s += r(0, 330, 360, 80, t('#7a5a3e')) + r(0, 300, 340, 50, t('#e6e2f0')) + `<path d="M0 316 q 170 -20 340 4 v 30 h-340z" fill="${t('#5f86b8')}"/>` + r(10, 290, 90, 30, t('#ffffff'), 'rx="10"');
      for (let i = 0; i < 6; i++) s += `<circle cx="${60 + i * 50}" cy="${328 + (i % 2) * 6}" r="5" fill="${t('#f2c94c')}" opacity=".7"/>`;
      // poster
      s += `<g transform="rotate(-3 150 140)">${r(90, 70, 130, 170, t('#f4f0e2'))}${r(98, 78, 114, 110, t('#2f6a3a'))}<circle cx="155" cy="133" r="22" fill="${t('#f2f2f2')}"/><path d="M144 126 l11 -8 l11 8 l-4 13 h-14z" fill="${t('#2a2a2a')}"/>${r(98, 196, 114, 6, t('#c8343a'))}${r(98, 208, 80, 4, t('#999'))}</g>`;
      // masa, kasetçalar
      s += r(470, 360, 300, 14, t('#9a7a52')) + r(480, 374, 8, 126, t('#7a5a3a')) + r(752, 374, 8, 126, t('#7a5a3a'));
      s += r(500, 326, 92, 34, t('#c0392b'), 'rx="4"') + `<circle cx="522" cy="343" r="9" fill="${t('#2a2a2a')}"/><circle cx="570" cy="343" r="9" fill="${t('#2a2a2a')}"/>` + r(536, 334, 20, 16, t('#d8d0c0'));
      s += `<g transform="rotate(4 660 350)">${r(620, 340, 90, 18, t('#f6f4ee'))}${r(620, 346, 90, 1, t('#9ab8d8'))}${r(620, 352, 90, 1, t('#9ab8d8'))}</g>`;
      if (Z.isik) s += `<path d="M720 290 l 20 40 h-40z" fill="${t('#e8c070')}"/><circle cx="720" cy="330" r="160" fill="url(#lamba)"/>`;
      if (Z.ay) s += r(0, 0, W, H, '#1a2448', 'opacity=".35"');
      return s;
    },
    mutfak() {
      let s = r(0, 0, W, H, t('#f1e3c4'));
      for (let y = 220; y < 330; y += 22) for (let x = 0; x < W; x += 22) s += r(x + 1, y + 1, 20, 20, t((x / 22 + y / 22) % 2 ? '#e6eef2' : '#ffffff'));
      s += r(500, 50, 220, 160, t('#f8f6ee')) + r(510, 60, 200, 140, 'url(#gok)') + r(606, 60, 8, 140, t('#f8f6ee'));
      s += `<g transform="translate(510 60) scale(.25)">${bina(0, 560, 300, 5, '#e7c77f', { balkonlu: true, anten: false })}${bina(300, 560, 360, 5, '#a9ccb6', { anten: false })}${bina(660, 560, 260, 6, '#e8b5a6', { anten: false })}</g>`;
      s += `<path d="M490 44 h240 v18 q -120 20 -240 0z" fill="${t('#e86a5a')}"/>`;
      s += r(0, 330, W, 30, t('#c9b08a')) + r(0, 360, W, 140, t('#a8865e'));
      // ocak ve çaydanlık
      s += r(40, 250, 180, 80, t('#e8e4dc')) + `<circle cx="90" cy="250" r="6" fill="#333"/><circle cx="170" cy="250" r="6" fill="#333"/>`;
      s += `<path d="M100 250 q -6 -40 30 -44 q 36 4 30 44z" fill="${t('#c8c8c4')}"/><path d="M118 210 q 12 -30 26 0" fill="${t('#e8e8e4')}"/><path d="M160 228 q 22 -4 22 -24" stroke="${t('#999')}" stroke-width="4" fill="none"/>`;
      s += `<path d="M126 196 q -10 -20 4 -36 q 8 -10 0 -24" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/>`;
      // masa
      s += `<ellipse cx="420" cy="420" rx="260" ry="50" fill="${t('#f6f0e2')}"/>`;
      for (let i = 0; i < 12; i++) s += `<circle cx="${200 + i * 40}" cy="${420 + Math.sin(i) * 30}" r="7" fill="${t('#d84b3a')}" opacity=".18"/>`;
      s += `<ellipse cx="330" cy="410" rx="34" ry="10" fill="${t('#ffffff')}"/>${r(310, 398, 40, 12, t('#f6f2e2'), 'rx="3"')}`;
      s += `<ellipse cx="420" cy="420" rx="28" ry="9" fill="${t('#ffffff')}"/><ellipse cx="412" cy="414" rx="8" ry="4" fill="${t('#d8343a')}"/><ellipse cx="428" cy="416" rx="8" ry="4" fill="${t('#e84a3a')}"/>`;
      s += `<ellipse cx="510" cy="414" rx="22" ry="8" fill="${t('#e8e0f0')}"/><ellipse cx="510" cy="410" rx="14" ry="5" fill="${t('#7a1a3a')}"/>`;
      s += `<path d="M590 380 l 4 26 h12 l4 -26z" fill="#c0602a" opacity=".85"/><path d="M590 380 h20" stroke="#fff" opacity=".7"/>`;
      s += r(640, 120, 90, 50, t('#7a5a40'), 'rx="8"') + `<circle cx="664" cy="145" r="14" fill="${t('#d8c8a8')}"/>`;
      return s;
    },
    okul() {
      const z = 380;
      let s = silüet(300);
      s += r(100, 120, 600, 260, t('#e8d8b8')) + r(100, 110, 600, 14, t('#c8b898'));
      s += r(100, 120, 600, 30, t('#c45a3a'));
      s += `<text x="400" y="142" font-size="16" text-anchor="middle" fill="${t('#fff6e0')}" font-family="Literata, serif" font-weight="700" letter-spacing="1">AKASYA İLKOKULU</text>`;
      for (let k = 0; k < 3; k++) for (let c = 0; c < 9; c++) if (!(k === 2 && (c === 4))) s += pencere(130 + c * 64, 172 + k * 66, 34, 44);
      s += r(366, 300, 68, 80, t('#6b4a34')) + r(370, 304, 28, 76, t('#8a6a4a')) + r(402, 304, 28, 76, t('#8a6a4a'));
      s += zeminArsa(z).replace(/#c9a476/g, '#b8b0a4');
      s += r(0, z, W, H - z, t('#a9a39a'), 'opacity=".6"');
      // bayrak direği
      s += r(728, 90, 5, 290, t('#bbb'));
      s += `<path d="M733 96 q 30 -8 60 4 v40 q -30 -10 -60 -4z" fill="#e30a17"/><circle cx="756" cy="117" r="9" fill="#fff"/><circle cx="759" cy="117" r="7.2" fill="#e30a17"/><path d="M770 117 l -6.5 2.1 4 -5.5 v6.8 l -4 -5.5z" fill="#fff"/>`;
      for (const x of [40, 760]) s += `<g>${r(x - 4, z - 80, 8, 90, t('#6a4a32'))}<circle cx="${x}" cy="${z - 110}" r="46" fill="${t(durum.bolum >= 4 ? '#7a9a3a' : '#3f7a3a')}"/><circle cx="${x - 22}" cy="${z - 90}" r="30" fill="${t(durum.bolum >= 4 ? '#a8a43a' : '#4e8d43')}"/></g>`;
      s += `<g transform="translate(560 ${z + 40})">${r(0, 0, 10, 40, t('#888'))}${r(-10, -10, 30, 14, t('#9aa'))}</g>`;
      for (let i = 0; i < 9; i++) { const x = 140 + i * 60 + rnd() * 20, y = z + 30 + rnd() * 50; s += `<g transform="translate(${x} ${y})">${r(-6, -26, 12, 22, t(durum.bolum >= 4 ? '#2a3f7a' : '#1f3f8a'))}<circle cx="0" cy="-32" r="6" fill="${t('#e0b08a')}"/>${r(-6, -26, 12, 4, t('#ffffff'))}${r(-5, -4, 4, 8, t('#333'))}${r(1, -4, 4, 8, t('#333'))}</g>`; }
      return s;
    },
    cati() {
      let s = silüet(380);
      s += r(0, 370, W, 130, t('#6a6a72')) + r(0, 366, W, 8, t('#8a8a90'));
      s += r(80, 300, 80, 70, t('#b8b8b0')) + `<ellipse cx="120" cy="300" rx="40" ry="8" fill="${t('#d0d0c8')}"/>`;
      s += r(620, 290, 50, 80, t('#a0603a')) + r(612, 284, 66, 10, t('#80482a'));
      for (const x of [260, 520, 700]) s += `<path d="M${x} 370 v-110 M${x - 20} 280 h40 M${x - 14} 292 h28 M${x - 26} 268 h52" stroke="${t('#4a4a4a')}" stroke-width="2" fill="none"/>`;
      s += ip(170, 330, 600, 330);
      // kilim
      s += `<g transform="translate(330 420) skewX(-20)">${r(0, 0, 200, 50, t('#a8343a'))}${r(8, 6, 184, 38, 'none', `stroke="${t('#f2c94c')}" stroke-width="2"`)}<path d="M40 25 l15 -12 l15 12 l-15 12z M130 25 l15 -12 l15 12 l-15 12z" fill="${t('#2a4a7a')}"/></g>`;
      s += `<g transform="translate(400 432)"><ellipse cx="-50" cy="0" rx="22" ry="8" fill="${t('#c4462f')}"/><circle cx="-76" cy="-2" r="8" fill="${t('#b8835a')}"/><ellipse cx="10" cy="2" rx="22" ry="8" fill="${t('#2f6f8f')}"/><circle cx="-16" cy="0" r="8" fill="${t('#e2b590')}"/></g>`;
      return s;
    },
    deniz() {
      const ufuk = 250;
      let s = '';
      // Adalar silueti
      const ada = karis(Z.gok[Z.gok.length - 1], '#5a7090', .5);
      s += `<path d="M420 ${ufuk} q 40 -26 80 -8 q 30 -16 60 2 q 20 -10 40 6z M610 ${ufuk} q 30 -18 60 -4 q 20 -8 34 4z" fill="${ada}"/>`;
      s += `<defs><linearGradient id="deniz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t('#3f8fc0')}"/><stop offset="1" stop-color="${t('#2a6f9f')}"/></linearGradient></defs>`;
      s += r(0, ufuk, W, 140, 'url(#deniz)');
      for (let i = 0; i < 30; i++) { const y = ufuk + 6 + rnd() * 120; s += r(rnd() * W, y, 20 + rnd() * 50, 1.6, '#ffffff', `opacity="${(.2 + (y - ufuk) / 300).toFixed(2)}"`); }
      if (Z.gunes) s += `<ellipse cx="${Z.gunes[0]}" cy="${ufuk + 30}" rx="40" ry="60" fill="#fff6d8" opacity=".25"/>`;
      // vapur
      s += `<g transform="translate(180 ${ufuk - 2})">${r(0, -10, 70, 10, t('#f4f4ee'))}${r(10, -18, 44, 8, t('#f4f4ee'))}${r(30, -30, 8, 12, t('#d8343a'))}${r(0, -2, 70, 3, t('#2a2a2a'))}</g>`;
      // köpüklü kıyı
      s += `<path d="M0 ${ufuk + 140} q 100 -12 200 0 t 200 0 t 200 0 t 200 0 v 10 h-800z" fill="#ffffff" opacity=".8"/>`;
      s += r(0, ufuk + 148, W, H, t('#ecd3a0'));
      for (let i = 0; i < 60; i++) s += `<circle cx="${rnd() * W}" cy="${ufuk + 150 + rnd() * 110}" r="${rnd() * 1.6 + .4}" fill="${t('#c8a878')}"/>`;
      // şemsiyeler ve havlular
      const sems = [[110, '#d8343a', '#f4f0e6'], [330, '#2f6fb0', '#f2c94c'], [600, '#3a9a5a', '#f4f0e6'], [740, '#e88a3a', '#ffffff']];
      for (const [x, a, b] of sems) {
        s += r(x - 2, ufuk + 150, 4, 90, t('#7a5a3a'));
        for (let i = 0; i < 6; i++) s += `<path d="M${x} ${ufuk + 150} L ${x - 60 + i * 20} ${ufuk + 180} L ${x - 40 + i * 20} ${ufuk + 180}z" fill="${t(i % 2 ? b : a)}"/>`;
        s += `<g transform="rotate(${(rnd() * 20 - 10).toFixed(0)} ${x + 30} ${ufuk + 225})">${r(x + 4, ufuk + 214, 54, 22, t(sec(['#e996b4', '#4ab0e8', '#f2c94c', '#ffffff'])))}${r(x + 4, ufuk + 220, 54, 4, t('#ffffff'), 'opacity=".6"')}</g>`;
      }
      // sepet ve karpuz
      s += `<g transform="translate(360 ${ufuk + 222})"><path d="M0 0 h40 l-4 22 h-32z" fill="${t('#c89a5a')}"/><path d="M4 0 q 16 -22 32 0" stroke="${t('#a87a3a')}" stroke-width="3" fill="none"/><path d="M48 18 a 16 16 0 0 1 32 0z" fill="${t('#3a8a3a')}"/><path d="M51 18 a 13 13 0 0 1 26 0z" fill="${t('#e84a4a')}"/></g>`;
      // martılar
      for (let i = 0; i < 3; i++) { const x = 300 + rnd() * 300, y = 80 + rnd() * 80; s += `<path d="M${x} ${y} q 8 -8 16 0 q 8 -8 16 0" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>`; }
      return s;
    },
    defne() {
      let s = r(0, 0, W, H, '#2a0a0a');
      s += `<circle cx="400" cy="40" r="300" fill="#c81e1e" opacity=".35"/>`;
      s += r(380, 0, 40, 30, '#3a1010') + `<circle cx="400" cy="38" r="12" fill="#ff3a2a"/><circle cx="400" cy="38" r="60" fill="#ff3a2a" opacity=".25"/>`;
      for (const y of [120, 170]) {
        s += `<path d="M0 ${y} Q 400 ${y + 26} 800 ${y}" stroke="#5a2a2a" fill="none"/>`;
        for (let i = 0; i < 9; i++) { const x = 60 + i * 84, yy = y + 13 * Math.sin(Math.PI * x / 800) + 2; s += `<g transform="rotate(${(rnd() * 6 - 3).toFixed(1)} ${x} ${yy})">${r(x - 26, yy, 52, 40, '#e8d8d0')}${r(x - 22, yy + 4, 44, 30, sec(['#6a3a3a', '#8a4a4a', '#5a2a2a', '#7a5050']))}${r(x - 4, yy - 4, 8, 8, '#8a6a4a')}</g>`; }
      }
      s += r(0, 360, W, 140, '#3a1414') + r(0, 352, W, 12, '#4a1a1a');
      for (const x of [140, 330, 520]) s += `<path d="M${x} 340 h150 l -10 30 h-130z" fill="#e8e0d8" opacity=".85"/><ellipse cx="${x + 75}" cy="344" rx="70" ry="6" fill="#c84a3a" opacity=".6"/>`;
      s += `<g transform="rotate(-8 360 336)">${r(330, 320, 60, 46, '#fff4ec')}${r(334, 324, 52, 34, '#a85a50')}</g>`;
      return s;
    },
  };

  function ciz(yer, zaman, opts = {}) {
    durum = opts;
    Z = ZAMANLAR[zaman] || ZAMANLAR.ogle;
    let c = hex(Z.carp);
    if (opts.hava === 'yagmur') c = hex(karis(Z.carp, YAGMUR.carp, .8));
    carp = c;
    rnd = tohum(yer + zaman + (opts.bolum || 0));
    const icMekan = ['bakkal', 'oda', 'mutfak', 'defne'].includes(yer);
    let s = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${yer}">`;
    s += gokyuzu(icMekan && yer !== 'oda' && yer !== 'mutfak' ? 'yok' : opts.hava);
    if (icMekan) s += r(0, 0, W, H, '#000');
    const f = MEKAN[yer] || MEKAN.sokak;
    s += f();
    if (opts.hava === 'yagmur' && !icMekan) s += yagmur();
    s += r(0, 0, W, H, 'url(#vinyet)') + `<rect width="${W}" height="${H}" filter="url(#gren)"/>`;
    s += '</svg>';
    // aynı sayfada birden çok sahne olabilir (anı defteri): kimlikleri benzersiz yap
    const u = '_' + (++sayac);
    return s.replace(/id="(\w+)"/g, `id="$1${u}"`).replace(/url\(#(\w+)\)/g, `url(#$1${u})`);
  }
  let sayac = 0;

  return { ciz, ZAMANLAR };
})();
