// mt_s2.js: STANZA 2, "Ra'ot sav'ah nafshi" (99.6–149.2 s). Slavery in Egypt's brickfields under the golden calf;
// the pillar of fire and the going-out; the sea split; Pharaoh's army sinks like a stone; a timbrel on the far shore.
// (Shots G–K in STORYBOARD.md.)
(() => {
  const V1 = 99.61, U = 22, GY = 860, L = k => lineT(1, k);

  function egyptSky(t, night = 0) {
    skyWash([mixCol(MT.egyptHi, '#141B3C', night), mixCol('#F7C66E', '#1F2A55', night), mixCol(MT.egypt, '#34306A', night), mixCol('#E48A3A', '#4A3A6A', night)], 'esky', -900, W + 1900, -700, 900);
  }
  function pyramid(x, y, s, col, key) {
    boilSeed(key);
    paint([[x - s, y], [x, y - s * .72], [x + s, y]], { wash: col, fill: mixCol(col, PAL.ink, .25), fillOp: 60, tex: .6, ink: mixCol(col, PAL.ink, .5), sw: .7 });
    paint([[x, y - s * .72], [x + s, y], [x + s * .25, y]], { wash: mixCol(col, PAL.ink, .22), washOp: 200, ink: null });
  }
  function egyptLand(t, night = 0) {
    const sunA = 1 - night;
    if (sunA > 0) { boilSeed('esun'); glow(1450, 170, 420, '#FFE6A8', .8 * sunA); paint(ellPts(1450, 170, 80, 80, 26), { wash: '#FFF3D4', washOp: 255 * sunA, ink: null }); }
    pyramid(520, 640, 300, mixCol('#E2B27A', '#3A3560', night), 'pyr1');
    pyramid(900, 650, 190, mixCol('#D9A56C', '#35305A', night), 'pyr2');
    pyramid(2100, 650, 260, mixCol('#E2B27A', '#3A3560', night), 'pyr3');
    ridge(-900, W + 1900, 690, 20, 51, mixCol('#E6B676', '#3B3963', night), { ink: null, texCol: '#C9955A' });
    for (let i = 0; i < 6; i++) palm(-400 + i * 520 + 140 * hs(i, 2), 700 + 10 * hs(i, 3), 170 + 60 * hs(i, 4), t, i, mixCol('#5E7A3E', '#1E2A3A', night));
    ridge(-900, W + 1900, 800, 14, 57, mixCol(MT.sand, '#2E2E55', night), { texCol: MT.sandDk, ink: mixCol(MT.sandDk, PAL.ink, .4) });
  }
  function kiln(x, y, s, t, key) {
    boilSeed(key);
    paint(through([[x - s, y], [x - s * .9, y - s * .7], [x - s * .4, y - s * 1.1], [x + s * .4, y - s * 1.1], [x + s * .9, y - s * .7], [x + s, y]], 4), { wash: '#B9764A', fill: '#7A4428', fillOp: 80, tex: .7, ink: PAL.ink, sw: .9 });
    for (let i = 0; i < 4; i++) inkLine([[x - s * .9 + i * 10, y - s * (.25 + i * .22)], [x + s * .9 - i * 10, y - s * (.25 + i * .22)]], .4, '#7A4428', 'inkfine', .5);
    paint(ellPts(x, y - s * .22, s * .32, s * .26, 14), { wash: '#3A1A12', ink: PAL.ink, sw: .7 });
    for (let i = 0; i < 3; i++) flame(x - s * .15 + i * s * .15, y - s * .05, s * .09, t, { seed: 40 + i + key.length, glow: 1.5 });
    smoke(x, y - s * 1.1, 360, t, '#8C7A70', 90, key + 'sm');
  }
  function brickStack(x, y, n, key) {
    boilSeed(key);
    for (let r = 0; r < n; r++) for (let c = 0; c < n - r; c++) paint(rectPts(x + c * 46 + r * 23, y - (r + 1) * 22, 44, 20, 1), { wash: mixCol('#B5693F', '#8E5030', hs(r * 7 + c, 3)), ink: PAL.ink, sw: .5 });
  }
  // a line of labourers, bowed under bricks, trudging right on the beat
  function labourers(t, x0, y, n, h, key, o = {}) {
    for (let i = 0; i < n; i++) {
      const ph = hs(i, 71) * .6, span = h * .62 * n + 400, walk = bpOf(t) / 2 + ph;
      const x = ((x0 + i * h * .62 + (o.speed ?? 14) * t) % span + span) % span - 200;
      figure(x, y + 6 * hs(i, 2), h * (.9 + .15 * hs(i, 5)), { key: key + i, walk, lean: o.lean ?? .22, carry: o.carry ?? 'brick', arm: o.arm ?? 2.5, col: o.col || '#4A3226', hat: 'hood', headTilt: .25 });
    }
  }

  // G: kiln fire → the brickfield; Clawd bowed under a brick; the whip; Clawd falls
  const tWhip = bt(beatAt(109.4));
  function shotBricks(t, lt, dur) {
    const pull = ease(seg(t, V1, 104.2));
    camBegin(lerp(330, 980, pull), lerp(730, 560, pull), lerp(3.2, 1.28, pull) * (1 + .015 * Math.sin(lt * .6)));
    egyptSky(t);
    egyptLand(t);
    kiln(330, 800, 170, t, 'k1'); kiln(80, 790, 130, t, 'k2');
    brickStack(1350, 820, 4, 'bs1');
    labourers(t, 0, 830, 7, 150, 'far', { col: '#6A4A36' });
    // the overseer on his block, with the whip
    boilSeed('block'); paint(rectPts(1500, 700, 220, 160, 1), { wash: '#C99A62', ink: PAL.ink, sw: .8 });
    const crack = t > tWhip - .35 ? (t < tWhip ? -ease(seg(t, tWhip - .35, tWhip)) : Math.exp(-(t - tWhip) * 4)) : 0;
    figure(1610, 700, 260, { key: 'overseer', hat: 'nemes', col: '#2E2330', arm: 1.2 + 1.1 * crack, carry: 'staff' });
    if (t > tWhip - .35 && t < tWhip + .5) {
      boilSeed('whip');
      const k = seg(t, tWhip - .35, tWhip + .15), P = [];
      for (let i = 0; i <= 8; i++) { const a = lerp(-2.2, .4, easeIn(k)) + i * .12 * (1 - k); P.push([1630 + Math.cos(a) * 60 * i * .9, 520 + Math.sin(a) * 60 * i * .9 + 30 * i * k]); }
      inkLine(P, 1.3, '#3A2418', 'ink', .6);
      if (t > tWhip && t < tWhip + .25) paint(starPts(P[8][0], P[8][1], 60 * (1 - seg(t, tWhip, tWhip + .25)), .2, 6), { wash: PAL.cream, washOp: 220, ink: null });
    }
    // Clawd, bowed under a brick, trudging right; flinches at the crack, falls to its knees
    const mood = emotions(t, [[V1, 'sad'], [tWhip + .02, 'scared'], [tWhip + .9, 'cry']]);
    const fall = ease(seg(t, tWhip + .3, tWhip + .8)), x = lerp(760, 1060, seg(t, 103, tWhip)) + 20 * fall;
    const walking = t > 103 && t < tWhip, tk = take(t, tWhip, 1.2);
    const pose = { ...mood, view: walking ? 'side' : 'q', walk: walking ? bpOf(t) / 2 : null, rot: .1 + .06 * fall, sq: (mood.sq || 0) * .4 + .12 + .16 * fall + tk.sq, dy: tk.dy, aL: 1.3 - 1.8 * fall, aR: 1.3 - 1.9 * fall, hat: 'kippah' };
    const brick = [x + 30 * fall, GY - 9 * U * (1 - pose.sq) - 10 + 170 * ease(seg(t, tWhip + .1, tWhip + .45)) + 40 * fall];
    clawd(x, GY, U, pose);
    boilSeed('cbrick'); push(); translate(...brick); rotate(fall * .5); paint(rectPts(-60, -22, 120, 44, 1), { wash: '#B5693F', ink: PAL.ink, sw: .8 }); pop();
    labourers(t, 300, 900, 4, 230, 'near', { col: '#3E2A22' });
    camEnd();
    if (lt < .5) flash(1 - ease(lt / .5), MT.flameO);
  }

  // H: the golden calf looms; the camera tilts up from tiny Clawd to its glowing eyes
  function calf(x, y, s, t, eyes) {
    boilSeed('calf');
    const g = MT.gold, dk = MT.goldDk, P = pts => pts.map(([a, b]) => [x + a * s, y + b * s]);
    paint(rectPts(x - s * 1.3, y, s * 2.6, s * .5, 1), { wash: '#C7A57A', fill: '#8E7050', fillOp: 70, tex: .7, ink: PAL.ink, sw: 1 });
    for (const lx of [-.8, -.45, .45, .8]) paint(rectPts(x + lx * s - s * .09, y - s * .6, s * .18, s * .62), { wash: lx < 0 ? dk : g, ink: PAL.ink, sw: 1 });
    paint(through(P([[-1.15, -.6], [-1.2, -1.1], [-.9, -1.38], [0, -1.42], [.75, -1.4], [1.05, -1.2], [1.1, -.75], [.6, -.52], [-.6, -.5], [-1.15, -.6]]), 3), { wash: g, fill: dk, fillOp: 70, tex: .5, ink: PAL.ink, sw: 1.2 });
    paint(through(P([[-1.15, -1.0], [-1.45, -.8], [-1.5, -.45], [-1.42, -.4]]), 3).concat(P([[-1.38, -.46], [-1.3, -.8], [-1.12, -.95]])), { wash: dk, ink: PAL.ink, sw: .8 });   // tail
    paint(through(P([[.85, -1.35], [1.25, -1.45], [1.55, -1.3], [1.68, -.95], [1.6, -.78], [1.35, -.8], [1.05, -.95], [.85, -1.35]]), 3), { wash: g, fill: dk, fillOp: 60, ink: PAL.ink, sw: 1.2 });   // head, low and forward
    for (const hx of [1.1, 1.38]) paint(ribbon(P([[hx, -1.4], [hx - .15, -1.7], [hx + .05, -1.9]]), s * .09, s * .02), { wash: '#F4E2A0', ink: PAL.ink, sw: .9 });   // horns
    glow(...P([[1.2, -1.95]])[0], s * .9, '#FFB050', .6);
    paint(ellPts(...P([[1.2, -1.97]])[0], s * .22, s * .22, 20), { wash: '#F08A3A', ink: PAL.ink, sw: .9 });   // the sun disk between the horns
    const e = P([[1.42, -1.15]])[0];
    if (eyes > 0) glow(e[0], e[1], s * .5 * eyes, '#FF5A2A', eyes);
    paint(ellPts(e[0], e[1], s * .06, s * .04, 10), { wash: eyes > .3 ? '#FFD07A' : PAL.ink, ink: null });
  }
  function shotCalf(t, lt, dur) {
    const tilt = ease(seg(t, 113.8, 116.4));
    camBegin(1000, lerp(760, 300, tilt), lerp(1.25, 1.05, tilt));
    egyptSky(t, .15);
    egyptLand(t, .15);
    calf(1050, 820, 260, t, ease(seg(t, 116.2, 116.8)));
    labourers(t, 0, 900, 6, 150, 'calf', { col: '#5A3A2E', lean: .35 });
    const mood = emotions(t, [[L(3), 'cry'], [114.3, 'scared', { lookY: -1, lookX: .3 }]]);
    clawd(700, GY + 20, U, { ...mood, view: 'q', sq: (mood.sq || 0) + .1, hat: 'kippah' });
    camEnd();
    if (lt < .25) whipStreaks(1 - lt / .25, 1);
  }

  // I: night; the pillar of fire comes down; the people stand; the going-out begins, Clawd raising the lamp
  const PIL = 1350;
  function shotPillar(t, lt, dur) {
    const down = easeOut(seg(t, 118.2, 120.8)), stand = ease(seg(t, 121, 123)), go = seg(t, 124, 127.4);
    camBegin(960 + 60 * go, 560, 1.2 - .05 * go);
    egyptSky(t, 1);
    starField(t, 40, 21, -300, -250, W + 900, 600, .9);
    egyptLand(t, 1);
    // the pillar: a tall braided column of flame from the sky
    boilSeed('pillar');
    const bottom = lerp(-300, 860, down);
    glow(PIL, lerp(-100, 500, down), 900 * (.3 + .7 * down), '#FF9A3A', 1);
    for (let i = 0; i < 3; i++) {
      const P = []; for (let k = 0; k <= 10; k++) { const yy = lerp(-400, bottom, k / 10); P.push([PIL + (60 - i * 20) * Math.sin(yy * .01 + t * (3 + i) + i * 2), yy]); }
      paint(ribbon(P, 170 - i * 50, 230 - i * 60), { wash: [MT.ember, MT.flameO, MT.flameY][i], ink: null });
    }
    if (down > .9) flame(PIL, 860, 140, t, { seed: 77, glow: 2 });
    // the people: bowed → standing → walking out to the right
    for (let i = 0; i < 9; i++) {
      const h = 150 + 40 * hs(i, 8), x0 = 150 + i * 170 + 40 * hs(i, 9), x = x0 + go * go * 420 * (1 + .2 * hs(i, 4));
      figure(x, 880 + 10 * hs(i, 7), h, { key: 'p' + i, lean: lerp(.35, .02, ease(seg(t, 121 + .15 * hs(i, 3), 122.5 + .3 * hs(i, 6)))), walk: t > 124 ? (x - x0) / 90 : null, col: '#2A2034', headTilt: lerp(.3, -.3, stand), carry: i % 3 === 1 ? 'staff' : null, arm: i % 3 === 1 ? .9 : .4 });
      if (t < 122.2) { boilSeed('drop' + i); const k = easeIn(seg(t, 121 + .2 * hs(i, 3), 121.6 + .2 * hs(i, 3))); paint(rectPts(x + 20, 880 - h * .9 + k * h * .85, 34, 16, 1), { wash: '#6A3A26', ink: PAL.ink, sw: .5 }); }
    }
    const mood = emotions(t, [[L(4), 'scared', { lookY: -.8, lookX: .6 }], [120.4, 'surprised', { lookX: .8, lookY: -.8 }], [122.1, 'hopeful', { lookX: .9, lookY: -.5 }], [124.5, 'determined']]);
    const w = stroll(t, 124.3, 127.6, 820, 1180, U);
    const raise = ease(seg(t, 122.3, 123.2));
    let pose = t < 124.3 ? { ...mood, view: 'q', aR: lerp(-.6, 1.1, raise) } : walkPose(mood, w, U);
    clawd(w.x, 895, U, carryLamp({ ...pose, hat: 'kippah' }, { lit: ease(seg(t, 122.6, 123.3)) }));
    camEnd();
    if (lt < .3) flash(1 - lt / .3, MT.flameY);
  }

  // J + K: the sea
  function waterWall(x0, x1, top, t, key, a = 255) {
    boilSeed(key);
    const P = [[x0, 1400]];
    for (let i = 0; i <= 14; i++) { const x = lerp(x0, x1, i / 14); P.push([x, top + 26 * Math.sin(x * .01 + t * 2) + 14 * Math.sin(x * .023 - t * 3)]); }
    P.push([x1, 1400]);
    paint(P, { wash: MT.sea, washOp: a, fill: MT.seaDk, fillOp: 90, bleed: .2, tex: .6, ink: null });
    for (let r = 0; r < 5; r++) inkLine(P.slice(1, -1).map(([x, y]) => [x, y + 60 + r * 110 + 20 * Math.sin(x * .004 + r + t)]), .7, '#6FA6CC', 'inkfine', .5);
    inkLine(P.slice(1, -1).map(([x, y]) => [x, y + 4]), 3, MT.foam, 'dry', .5);
    for (let i = 0; i < 5; i++) {   // fish in the wall
      const fx = x0 + (hs(i, key.length) * (x1 - x0) + t * 40 * (i % 2 ? 1 : -1) + 4000) % (x1 - x0), fy = top + 180 + 400 * hs(i + 3, key.length);
      paint(through([[fx - 30, fy], [fx, fy - 12], [fx + 30, fy], [fx + 42, fy - 10], [fx + 42, fy + 10], [fx + 30, fy], [fx, fy + 12], [fx - 30, fy]], 2), { wash: '#1E4A78', washOp: 180, ink: null });
    }
  }
  function chariot(x, y, s, t, key, o = {}) {
    boilSeed(key);
    const col = o.col || '#2A1E2A', gal = t * 9 + hs(key.length, 3) * 6;
    // horse
    const hx = x + s * .9;
    paint(ellPts(hx, y - s * .62, s * .42, s * .2, 16), { wash: col, ink: null });
    paint(ribbon([[hx + s * .3, y - s * .7], [hx + s * .48, y - s * .95], [hx + s * .68, y - s * .9]], s * .16, s * .09), { wash: col, ink: null });
    for (let i = 0; i < 4; i++) { const a = Math.sin(gal + i * 1.6) * .5, lx = hx - s * .3 + i * s * .2; inkLine([[lx, y - s * .5], [lx + Math.sin(a) * s * .25, y - s * .5 + Math.cos(a) * s * .5]], 2.4 * s / 200, col, 'ink', .3); }
    paint(ribbon([[hx + s * .45, y - s * .95], [hx + s * .2, y - s * 1.05], [hx - s * .1, y - s * .85]], s * .06, s * .02), { wash: '#8A2A22', ink: null });   // plume
    // car + wheel
    inkLine([[x + s * .1, y - s * .45], [hx - s * .3, y - s * .6]], 2 * s / 200, col, 'ink', 0);
    paint(through([[x - s * .3, y - s * .25], [x - s * .3, y - s * .7], [x + s * .1, y - s * .55], [x + s * .2, y - s * .25]], 2), { wash: mixCol(col, '#8C6B3E', .3), ink: PAL.ink, sw: .6 });
    const wr = s * .28, wy = y - wr;
    paint(ellPts(x, wy, wr, wr, 20), { ink: col, sw: 1.8 * s / 200 });
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI + (o.spin ?? t * 6); inkLine([[x - Math.cos(a) * wr, wy - Math.sin(a) * wr], [x + Math.cos(a) * wr, wy + Math.sin(a) * wr]], .9 * s / 200, col, 'ink', 0); }
    if (o.rider !== false) figure(x - s * .05, y - s * .45, s * .75, { key: key + 'r', hat: 'helmet', col, carry: 'spear', arm: 1.1, lean: -.1 });
  }
  function shotSea(t, lt, dur) {
    const cx = lerp(900, 1500, ease(seg(t, L(6), L(8)))), look = ease(seg(t, 132.0, 133.2));
    camBegin(cx - 250 * look, 560, 1.12 - .08 * look);
    skyWash(['#233769', '#3D5A8C', '#7C92B4'], 'seasky', -900, W + 1900, -700, 700);
    waterWall(-900, W + 1900, 250, t, 'farwall');
    boilSeed('wallstreaks'); for (let i = 0; i < 18; i++) { const x = -800 + i * 190 + 40 * hs(i, 7); inkLine([[x, 300 + 40 * hs(i, 8)], [x + 8, 560], [x - 4, 820]], 2.2, '#4F8CBB', 'dry', .3); }
    boilSeed('seabed');
    paint(through([[-900, 860], [400, 845], [1400, 870], [2600, 850]], 4).concat([[2600, 1500], [-900, 1500]]), { wash: '#C9B08A', fill: '#8E7A5E', fillOp: 70, tex: .8, ink: null });
    for (let i = 0; i < 14; i++) { const x = -800 + i * 250, y = 900 + 60 * hs(i, 2); boilSeed('weed' + i); inkLine([[x, y], [x + 10 + 15 * Math.sin(t + i), y - 40], [x - 5, y - 70]], 1.2, '#4E6A3A', 'ink', .5); }
    // the procession, walking right; the chariots charge in behind
    for (let i = 0; i < 8; i++) { const h = 150 + 30 * hs(i, 3), x = 200 + i * 190 + (t - L(6)) * 55 + 30 * hs(i, 5); figure(x, 880 + 8 * hs(i, 2), h, { key: 'x' + i, walk: x / 90, col: '#2B2438', carry: i % 4 === 2 ? 'staff' : null }); }
    if (t > 131.9) for (let i = 0; i < 3; i++) chariot(lerp(-300, 1000, seg(t, 131.9 + i * .4, 136.5)) - i * 330, 890, 200, t, 'ch' + i);
    if (t > 131.9) { boilSeed('dust'); for (let i = 0; i < 6; i++) paint(ellPts(lerp(-500, 700, seg(t, 131.9, 136.5)) - i * 120, 850 - 30 * hs(i, 4), 120, 60, 14), { wash: '#B09A80', washOp: 120, ink: null }); }
    const w = t < 133.4 ? stroll(t, L(6), 133.0, 1150, 1500, U) : { x: lerp(1500, 2050, easeIn(seg(t, 133.4, 136.6))), walk: (t - 133.4) * 5, flip: false, dy: -Math.abs(Math.sin(t * 14)) * .4 };
    const mood = emotions(t, [[L(6), 'starstruck', { lookY: -.9, lookX: -.3 }], [129.6, 'hopeful', { lookX: .5, lookY: -.6 }], [132.3, 'scared', { lookX: -1 }]]);
    let pose;
    if (t < 132.3) pose = walkPose(mood, w, U);
    else if (t < 133.4) pose = { ...mood, ...turn(t, 132.3, 132.5, .25, -.125) };
    else pose = { ...walkPose(mood, w, U), smear: .35, smearDir: 1, rot: -.1 };
    clawd(w.x, 885, U, carryLamp({ ...pose, hat: 'kippah' }));
    // the near wall's foam edge in the foreground
    boilSeed('nearfoam');
    paint(through([[-900, 1150], [0, 1030 + 12 * Math.sin(t * 2)], [900, 1045], [1800, 1025 + 12 * Math.sin(t * 2 + 1)], [2800, 1040]], 4).concat([[2800, 1500], [-900, 1500]]), { wash: MT.seaDk, washOp: 230, ink: null });
    camEnd();
  }
  // K: the far shore: the walls fall; underwater, the army sinks like a stone; dawn, and a timbrel
  const tCrash = 136.51, tDeep = 140.3, tShore = 145.75;
  function shotCrash(t, lt, dur) {
    if (t < tDeep) {
      camBegin(900, 560, 1.1 + .05 * seg(t, tCrash, tDeep));
      skyWash(['#1E2E5A', '#3A5382', '#7C92B4'], 'crashsky', -600, W + 600, -600, 800);
      const fall = easeIn(seg(t, tCrash + .2, tCrash + 2.2));
      for (let i = 0; i < 3; i++) chariot(400 + i * 360, 880, 200, t, 'cc' + i, { spin: t * 4 });
      waterWall(-600, 700 - 300 * (1 - fall), lerp(-200, 820, fall), t, 'crashL');
      waterWall(1100 + 400 * (1 - fall), W + 600, lerp(-200, 820, fall), t, 'crashR');
      if (fall > .6) waterWall(-600, W + 600, lerp(1100, 700, seg(fall, .6, 1)), t, 'sealed');
      if (fall > .9) { boilSeed('spray'); for (let i = 0; i < 20; i++) { const k = seg(t, tCrash + 2.0, tCrash + 3.5), a = -Math.PI * hs(i, 5); paint(ellPts(900 + Math.cos(a) * 700 * k * hs(i, 6), 720 + Math.sin(a) * 400 * k + 300 * k * k, 22 * (1 - k), 22 * (1 - k), 8), { wash: MT.foam, ink: null }); } }
      boulder(1650, 1000, 500, 260, '#8E7C66', 'shoreL');
      const mood = emotions(t, [[tCrash, 'scared', { lookX: -1 }], [tCrash + 2.2, 'surprised', { lookX: -.8 }]]);
      clawd(1640, 880, U, carryLamp({ ...mood, view: 'q', flip: true, hat: 'kippah' }));
      camEnd();
      if (lt < .25) flash(1 - lt / .25, MT.foam);
    } else if (t < tShore) {
      // underwater: shafts of light, a wheel, a rider and a stone sinking slowly into the dark
      const d = seg(t, tDeep, tShore);
      skyWash([mixCol('#2E6A9E', '#10224A', d), mixCol('#1C4478', '#0B1636', d), '#070E26'], 'deep', -300, W + 300, -300, H + 300, 6);
      boilSeed('rays');
      for (let i = 0; i < 5; i++) paint([[300 + i * 330, -50], [420 + i * 330, -50], [200 + i * 300 + 200 * d, H + 50], [100 + i * 300 + 200 * d, H + 50]], { wash: '#5A8EC0', washOp: 50 * (1 - d), ink: null });
      const sink = (x, y0, rate, draw) => { const y = y0 + (t - tDeep) * rate; push(); translate(x, y); rotate((t - tDeep) * .15 * (x > 900 ? 1 : -1)); draw(); pop(); };
      sink(620, 120, 115, () => chariot(0, 0, 260, t, 'sw', { spin: .4, rider: false, col: '#15203C' }));
      sink(1250, -180, 120, () => figure(0, 0, 280, { key: 'sr', hat: 'helmet', col: '#15203C', carry: 'spear', lean: 1.2 }));
      sink(960, -60, 150, () => boulder(0, 0, 180, 150, '#3C4A6A', 'stone'));
      for (let i = 0; i < 18; i++) { const k = frac(t * .4 + hs(i, 2)), x = 300 + hs(i, 3) * 1300 + 12 * Math.sin(t * 3 + i); boilSeed('bub' + i); paint(ellPts(x, H + 40 - k * (H + 120), 5 + 8 * hs(i, 4), 5 + 8 * hs(i, 4), 10), { ink: '#9CC4E4', sw: .6 }); }
      if (t - tDeep < .3) flash(1 - (t - tDeep) / .3, MT.seaDk);
      if (t > tShore - .4) flash(ease(seg(t, tShore - .4, tShore)), '#FAD9A8');
    } else {
      // dawn on the far shore: calm sea; Clawd dances with a timbrel, the women behind with theirs
      camBegin(960, 560, 1.15);
      skyWash(['#8FA6D6', '#F2C6A0', '#F7DDB0'], 'shoresky', -600, W + 600, -600, 760);
      boilSeed('sunrise'); glow(1500, 700, 500, '#FFD08A', .8);
      boilSeed('calm');
      paint(rectPts(-600, 690, W + 1200, 180), { wash: '#5E8FB8', ink: null });
      for (let i = 0; i < 6; i++) inkLine([[-200 + i * 380, 720 + i * 22], [60 + i * 380, 720 + i * 22]], .7, MT.foam, 'inkfine', 0);
      ridge(-600, W + 600, 850, 12, 61, MT.sand, { texCol: MT.sandDk });
      for (let i = 0; i < 5; i++) { const x = 250 + i * 330 + (i > 1 ? 480 : 0); figure(x, 860, 190, { key: 'm' + i, col: '#5A3F55', carry: 'timbrel', arm: 1.5 + .5 * Math.sin(bpOf(t) * Math.PI + i), lean: .08 * Math.sin(bpOf(t) * Math.PI + i * 1.3), headTilt: -.2 }); }
      const mood = emotions(t, [[tShore, 'relieved'], [tShore + .9, 'excited', { emote: 'music' }]]);
      const dance = move(t < tShore + .9 ? 'idle' : 'hop', t);
      const tim = (u, sw) => { push(); rotate(dance.aR); paint(ellPts(u * .6, 0, u * 1.2, u * 1.2, 16), { wash: MT.sand, ink: PAL.ink, sw }); for (let i = 0; i < 4; i++) paint(ellPts(u * .6 + Math.cos(i * 1.57) * u * 1.2, Math.sin(i * 1.57) * u * 1.2, u * .25, u * .25, 8), { wash: MT.gold, ink: PAL.ink, sw: sw * .5 }); pop(); };
      clawd(960, 870, U + 6, { ...mood, ...dance, dy: (mood.dy || 0) * .3 + dance.dy, hat: 'kippah', armR: tim, aR: 1.2 + .4 * Math.sin(bpOf(t) * TAU) });
      camEnd();
      flash(1 - ease(seg(t, tShore, tShore + .6)), '#FAD9A8');
      boilSeed('wipe');
      if (t > 149.19 - .3) brushWipe((t - (149.19 - .3)) / .6, [MT.seaDk, MT.sea]);
    }
  }

  shotsShifted([[V1, shotBricks], [L(3), shotCalf], [L(4), shotPillar], [L(6), shotSea], [L(8), shotCrash]], SHIFT[1]);
})();
