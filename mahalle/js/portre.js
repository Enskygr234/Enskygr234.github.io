// Vesikalık portreler: her karakter düz renkli, sıcak bir illüstrasyon.
const Portre = (() => {
  const TEN = { acik: '#f0c9a6', orta: '#e2b08a', esmer: '#c98f68', yasli: '#e6b996' };

  const K = {
    mert:   { ten: 'esmer', sac: 'diken', sacRenk: '#3a2418', giysi: '#c4462f', yaka: 'tisort', agiz: 'sirit', cil: true },
    defne:  { ten: 'acik', sac: 'atkuyrugu', sacRenk: '#2a1a14', giysi: '#2f7f8f', yaka: 'tisort', agiz: 'gulumse', kayis: true },
    nine:   { ten: 'yasli', sac: 'yazma', sacRenk: '#f4efe4', desen: '#7a5a8c', giysi: '#6a4a6a', yaka: 'hirka', agiz: 'gulumse', kirisik: true },
    cemil:  { ten: 'yasli', sac: 'kel', sacRenk: '#b8b4ac', giysi: '#7a5a3a', yaka: 'yelek', agiz: 'duz', biyik: '#b8b4ac', gozluk: 'ucta', kirisik: true },
    nermin: { ten: 'orta', sac: 'yazma', sacRenk: '#f2b8c6', desen: '#c84a6a', giysi: '#8a4a8a', yaka: 'bluz', agiz: 'acik', kupe: true },
    hasan:  { ten: 'orta', sac: 'yatik', sacRenk: '#141414', giysi: '#23262c', yaka: 'deri', agiz: 'yan', sakal: true },
    tolga:  { ten: 'orta', sac: 'kisa', sacRenk: '#5a3a24', giysi: '#3a7a3a', yaka: 'forma', agiz: 'yan' },
    riza:   { ten: 'orta', sac: 'jole', sacRenk: '#2a2420', giysi: '#3a3a44', yaka: 'takim', kravat: '#a8343a', agiz: 'sirit', biyik: '#2a2420', altin: true },
    kadir:  { ten: 'esmer', sac: 'kasket', sacRenk: '#3a2a20', giysi: '#4a6a9a', yaka: 'gomlek', agiz: 'duz', biyik: '#2a1a14' },
    selim:  { ten: 'acik', sac: 'duz', sacRenk: '#4a3020', giysi: '#d8d8e8', yaka: 'cizgili', agiz: 'duz', gozluk: 'yuvarlak' },
    erol:   { ten: 'acik', sac: 'kisa', sacRenk: '#3a2a20', giysi: '#5a6a4a', yaka: 'kazak', agiz: 'gulumse', sakal: 'tam', gozluk: 'kare' },
    orhan:  { ten: 'yasli', sac: 'kisa', sacRenk: '#c8c4bc', giysi: '#3a4050', yaka: 'takim', kravat: '#2a4a7a', agiz: 'duz', gozluk: 'kare', kirisik: true },
    zeki:   { ten: 'orta', sac: 'dagınık', sacRenk: '#2a1a14', giysi: '#e8e4dc', yaka: 'gomlek', kravat: '#3a6a5a', egik: true, agiz: 'gulumse', sakal: 'tam' },
    saadet: { ten: 'acik', sac: 'kakul', sacRenk: '#6a4a3a', giysi: '#8a5a5a', yaka: 'hirka', agiz: 'duz', gozluk: 'kare' },
    ali:    { ten: 'yasli', sac: 'kasket', sacRenk: '#a8a49c', giysi: '#6a5a4a', yaka: 'gomlek', agiz: 'gulumse', biyik: '#a8a49c', kirisik: true },
    anne:   { ten: 'orta', sac: 'kakul', sacRenk: '#3a2418', giysi: '#a8586a', yaka: 'hirka', agiz: 'gulumse', kupe: true },
    baba:   { ten: 'esmer', sac: 'kisa', sacRenk: '#1f1814', giysi: '#3f5a7a', yaka: 'gomlek', agiz: 'duz', biyik: '#1f1814', sakal: true },
    gul:    { ten: 'acik', sac: 'kakul', sacRenk: '#8a5a3a', giysi: '#5a7a9a', yaka: 'bluz', agiz: 'acik', gozluk: 'yuvarlak' },
    muhtar: { ten: 'orta', sac: 'kel', sacRenk: '#4a4040', giysi: '#2a2a30', yaka: 'takim', kravat: '#5a2a2a', agiz: 'duz', biyik: '#2a2020' },
  };

  function koyu(h, k) { return '#' + [1, 3, 5].map(i => Math.round(parseInt(h.slice(i, i + 2), 16) * k).toString(16).padStart(2, '0')).join(''); }

  function sac(o, ust) {
    const c = o.sacRenk;
    switch (o.sac) {
      case 'diken': return `<path d="M30 66 q -4 -34 30 -40 q 34 6 30 40 l -6 -14 l -4 8 l -6 -14 l -5 10 l -7 -14 l -6 12 l -6 -12 l -5 12 l -6 -10 z" fill="${c}"/>`;
      case 'atkuyrugu': return ust ? `<path d="M88 52 q 22 10 14 52 q -6 -20 -14 -30z" fill="${c}"/>` :
        `<path d="M28 74 q -4 -46 32 -48 q 36 2 32 48 q -6 -24 -18 -30 q -14 12 -40 8 q -4 10 -6 22z" fill="${c}"/>`;
      case 'yazma': return ust ? '' : `<path d="M22 84 q -4 -62 38 -62 q 42 0 38 62 q 0 22 -10 34 l -4 -40 q -24 -14 -48 0 l -4 40 q -10 -12 -10 -34z" fill="${c}"/>` +
        [...Array(9)].map((_, i) => `<circle cx="${30 + (i % 3) * 22 + (i > 5 ? 6 : 0)}" cy="${34 + Math.floor(i / 3) * 18}" r="3" fill="${o.desen}" opacity=".75"/>`).join('') +
        `<path d="M34 50 q 26 -10 52 0" stroke="${koyu(c, .85)}" stroke-width="3" fill="none"/>`;
      case 'kel': return `<path d="M30 70 q -2 -18 6 -22 l 2 20z M90 70 q 2 -18 -6 -22 l -2 20z" fill="${c}"/>`;
      case 'yatik': return `<path d="M29 66 q -6 -44 34 -42 q 30 2 28 34 q -18 -18 -44 -12 q -10 6 -18 20z" fill="${c}"/><path d="M50 30 q 20 -6 36 10" stroke="#3a3a3a" stroke-width="2" fill="none"/>`;
      case 'kisa': return `<path d="M30 62 q -2 -36 30 -36 q 32 0 30 36 q -8 -18 -30 -20 q -22 2 -30 20z" fill="${c}"/>`;
      case 'jole': return `<path d="M30 64 q -4 -40 32 -40 q 32 2 28 38 q -4 -16 -12 -20 q -26 -10 -48 22z" fill="${c}"/><path d="M40 36 q 20 -8 40 2" stroke="#fff" stroke-width="2" opacity=".5" fill="none"/>`;
      case 'kasket': return `<path d="M28 58 q 2 -32 34 -32 q 32 0 32 30 z" fill="${koyu(o.sacRenk === '#a8a49c' ? '#5a5a5a' : '#4a4a52', 1)}"/><path d="M24 58 q 40 -12 76 2 l -4 6 q -36 -10 -70 -2z" fill="#3a3a40"/><path d="M30 64 v10 M90 64 v10" stroke="${c}" stroke-width="4"/>`;
      case 'duz': return `<path d="M30 66 q -2 -40 30 -40 q 32 0 30 40 q -2 -14 -8 -20 h-46 q -4 8 -6 20z" fill="${c}"/><path d="M36 46 q 24 6 48 0" stroke="${koyu(c, .8)}" stroke-width="2" fill="none"/>`;
      case 'dagınık': return `<path d="M28 66 q -6 -42 32 -42 q 38 0 32 42 l -6 -16 l -8 6 l -4 -14 l -10 8 l -6 -12 l -8 10 l -8 -8 l -6 12z" fill="${c}"/>`;
      case 'kakul': return ust ? '' : `<path d="M26 92 q -8 -66 34 -68 q 42 2 34 68 l -8 -40 q -8 -6 -26 -6 q -18 0 -26 6 z" fill="${c}"/><path d="M34 52 q 26 -12 52 0 v8 h-52z" fill="${c}"/>`;
    }
    return '';
  }

  function ciz(id) {
    const o = K[id];
    if (!o) return '';
    const ten = TEN[o.ten], tenK = koyu(ten, .86);
    let s = `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><linearGradient id="pf${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d3e1e8"/><stop offset="1" stop-color="#eef2ee"/></linearGradient></defs>
      <rect width="120" height="150" fill="url(#pf${id})"/>`;
    // arka saç (yazma, at kuyruğu vs.)
    if (['yazma', 'kakul'].includes(o.sac)) s += sac(o, false);
    if (o.sac === 'atkuyrugu') s += sac(o, true);
    // gövde
    const g = o.giysi;
    s += `<path d="M8 150 q 4 -38 52 -40 q 48 2 52 40z" fill="${g}"/>`;
    s += `<rect x="50" y="94" width="20" height="20" fill="${tenK}"/>`;
    switch (o.yaka) {
      case 'yelek': s += `<path d="M44 112 l16 38 l16 -38 l-8 -2 l-8 14 l-8 -14z" fill="#f2efe6"/>`; break;
      case 'deri': s += `<path d="M40 112 l20 26 l20 -26 l10 4 l-14 34 h-32 l-14 -34z" fill="#3a3e46"/><path d="M48 112 h24 l-12 16z" fill="#e8e4dc"/>`; break;
      case 'takim': s += `<path d="M46 110 l14 22 l14 -22 l-6 40 h-16z" fill="#f4f2ee"/><path d="M56 118 h8 l-2 30 h-4z" fill="${o.kravat}"/><path d="M34 116 l26 34 M86 116 l-26 34" stroke="${koyu(g, .7)}" stroke-width="3"/>`; break;
      case 'gomlek': s += `<path d="M46 110 l14 14 l14 -14 l-4 -2 l-10 8 l-10 -8z" fill="${koyu(g, .85)}"/>` + (o.kravat ? `<path d="M57 120 h6 l2 30 h-10z" fill="${o.kravat}" ${o.egik ? 'transform="rotate(10 60 120)"' : ''}/>` : ''); break;
      case 'hirka': s += `<path d="M44 112 l16 38 l16 -38" stroke="${koyu(g, .7)}" stroke-width="5" fill="none"/>`; break;
      case 'cizgili': for (let y = 120; y < 150; y += 7) s += `<path d="M12 ${y} h96" stroke="#5a6a9a" stroke-width="2.5" opacity=".7"/>`; s += `<path d="M48 110 q 12 10 24 0" stroke="#fff" stroke-width="4" fill="none"/>`; break;
      case 'forma': s += `<text x="60" y="142" font-size="20" text-anchor="middle" fill="#f2f2e6" font-family="Literata, serif" font-weight="800">9</text><path d="M46 110 q 14 8 28 0" stroke="#f2f2e6" stroke-width="3" fill="none"/>`; break;
      case 'kazak': s += `<path d="M46 110 q 14 10 28 0" stroke="${koyu(g, .75)}" stroke-width="6" fill="none"/>`; break;
      case 'bluz': s += `<path d="M44 112 q 16 16 32 0" stroke="#f2e6ee" stroke-width="5" fill="none"/>`; break;
      default: s += `<path d="M48 110 q 12 10 24 0" stroke="${koyu(g, .8)}" stroke-width="4" fill="none"/>`;
    }
    if (o.kayis) s += `<path d="M38 112 L 82 150" stroke="#222" stroke-width="4"/>`;
    // kafa
    s += `<ellipse cx="29" cy="74" rx="6" ry="9" fill="${tenK}"/><ellipse cx="91" cy="74" rx="6" ry="9" fill="${tenK}"/>`;
    if (o.kupe) s += `<circle cx="29" cy="86" r="3" fill="#e8c040"/><circle cx="91" cy="86" r="3" fill="#e8c040"/>`;
    s += `<ellipse cx="60" cy="70" rx="31" ry="37" fill="${ten}"/>`;
    s += `<path d="M34 92 q 26 22 52 0 q -4 16 -26 18 q -22 -2 -26 -18z" fill="${tenK}" opacity=".5"/>`;
    if (!['yazma', 'kakul'].includes(o.sac)) s += sac(o, false);
    else if (o.sac === 'yazma') s += `<path d="M28 60 q 32 -28 64 0 q -4 -34 -32 -36 q -28 2 -32 36z" fill="${o.sacRenk}"/>` + [...Array(5)].map((_, i) => `<circle cx="${38 + i * 11}" cy="${40 + (i % 2) * 6}" r="2.6" fill="${o.desen}" opacity=".8"/>`).join('');
    // yüz
    const gy = 72;
    s += `<path d="M40 ${gy - 10} q 7 -4 14 0 M66 ${gy - 10} q 7 -4 14 0" stroke="${koyu(o.sacRenk === '#f4efe4' || o.sacRenk === '#f2b8c6' ? '#6a5a4a' : o.sacRenk, .9)}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    s += `<ellipse cx="47" cy="${gy}" rx="3.2" ry="3.8" fill="#2a1e1a"/><ellipse cx="73" cy="${gy}" rx="3.2" ry="3.8" fill="#2a1e1a"/>`;
    s += `<circle cx="48" cy="${gy - 1.4}" r="1" fill="#fff"/><circle cx="74" cy="${gy - 1.4}" r="1" fill="#fff"/>`;
    if (o.kirisik) s += `<path d="M38 ${gy + 4} l-4 2 M82 ${gy + 4} l4 2 M44 50 q 16 -4 32 0" stroke="${koyu(ten, .75)}" stroke-width="1.2" fill="none"/>`;
    s += `<path d="M60 ${gy + 2} q -4 10 0 12 q 3 1 4 -1" stroke="${koyu(ten, .7)}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
    s += `<ellipse cx="40" cy="${gy + 14}" rx="6" ry="3.5" fill="#e87a6a" opacity=".28"/><ellipse cx="80" cy="${gy + 14}" rx="6" ry="3.5" fill="#e87a6a" opacity=".28"/>`;
    if (o.cil) s += [[42, 82], [46, 84], [38, 84], [76, 82], [80, 84], [74, 85]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9" fill="#8a5a3a"/>`).join('');
    const my = gy + 22;
    if (o.sakal === 'tam') s += `<path d="M32 80 q 2 36 28 36 q 26 0 28 -36 q -4 14 -10 16 q -18 -6 -36 0 q -6 -2 -10 -16z" fill="${o.sacRenk}" opacity=".9"/>`;
    else if (o.sakal) s += `<path d="M34 84 q 4 28 26 30 q 22 -2 26 -30" stroke="${o.sacRenk}" stroke-width="8" fill="none" opacity=".22"/>`;
    if (o.biyik) s += `<path d="M46 ${my - 4} q 14 -8 28 0 q -6 6 -14 2 q -8 4 -14 -2z" fill="${o.biyik}"/>`;
    switch (o.agiz) {
      case 'sirit': s += `<path d="M48 ${my} q 12 12 24 0 z" fill="#7a2a2a"/><path d="M50 ${my + .5} h20 v3 h-20z" fill="#fff"/>` + (o.altin ? `<rect x="62" y="${my + .5}" width="4" height="3" fill="#e8c040"/>` : ''); break;
      case 'gulumse': s += `<path d="M50 ${my} q 10 8 20 0" stroke="#8a3a3a" stroke-width="2.4" fill="none" stroke-linecap="round"/>`; break;
      case 'acik': s += `<ellipse cx="60" cy="${my + 2}" rx="7" ry="5" fill="#7a2a2a"/><path d="M54 ${my} h12" stroke="#fff" stroke-width="2"/>`; break;
      case 'yan': s += `<path d="M50 ${my + 2} q 10 2 20 -4" stroke="#8a3a3a" stroke-width="2.4" fill="none" stroke-linecap="round"/>`; break;
      default: s += `<path d="M52 ${my + 1} h16" stroke="#8a3a3a" stroke-width="2.4" stroke-linecap="round"/>`;
    }
    if (o.gozluk === 'yuvarlak') s += `<g stroke="#3a3a3a" stroke-width="2" fill="#fff" fill-opacity=".15"><circle cx="47" cy="${gy}" r="9"/><circle cx="73" cy="${gy}" r="9"/><path d="M56 ${gy} h8"/></g>`;
    else if (o.gozluk === 'kare') s += `<g stroke="#3a3030" stroke-width="2" fill="#fff" fill-opacity=".12"><rect x="37" y="${gy - 7}" width="20" height="14" rx="3"/><rect x="63" y="${gy - 7}" width="20" height="14" rx="3"/><path d="M57 ${gy - 2} h6"/></g>`;
    else if (o.gozluk === 'ucta') s += `<g stroke="#5a4a3a" stroke-width="1.8" fill="#fff" fill-opacity=".15"><path d="M38 ${gy + 6} h18 v8 q -9 4 -18 0z M64 ${gy + 6} h18 v8 q -9 4 -18 0z M56 ${gy + 8} h8"/></g>`;
    return s + '</svg>';
  }

  return { ciz, var: id => !!K[id] };
})();
