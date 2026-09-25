// mt_bridge.js: BRIDGE (194.2–226.5 s, instrumental). On the big hit, the Second Temple is rebuilt course by course,
// one course per beat. Then a quiet night in Shushan: the palace of columns, Mordechai at the king's gate, and a tall
// three-cornered shadow rising on the wall. The lots tumble, the seal stamps, the shadow swallows the frame. (Shots P–R.)
(() => {
  const U = 22, tHit = bt(beatAt(194.2)), tNight = bt(beatAt(204.0)), tLots = bt(beatAt(218.45)), tS4 = lineT(3, 0);

  // P: rebuilding, on the beat
  function shotBuild(t, lt, dur) {
    const b0 = beatAt(tHit), nb = bpOf(t) - bpOf(tHit);   // beats since the hit
    const shake = shakeXY(t, 5 * pulse(t, 8) * (t < tNight - 1 ? 1 : 0));
    camBegin(980 + shake[0] + 300 * Math.pow(1 - seg(lt, 0, .35), 2), 560 + shake[1], 1.05 + .05 * seg(lt, 0, dur));
    skyWash(['#8FB6DE', '#F4D9A6', '#F9E2B2'], 'buildsky', -900, W + 900, -700, 800);
    boilSeed('bsun'); glow(1580, 260, 420, '#FFE2A0', .7);
    ridge(-900, W + 900, 720, 50, 91, '#B99A7A', { ink: null, texCol: '#9A7A5A' });
    ridge(-900, W + 900, 840, 18, 93, '#C9A870', { texCol: '#A8864E' });
    // the courses: each lands on its beat, dropping in with a squash
    const X0 = 520, CW = 110, CH = 56, BASE = 840;
    for (let r = 0; r < 8; r++) {
      const narrow = r >= 5 ? 2 : 0;
      for (let c = narrow; c < 8 - narrow; c++) {
        const land = r * 2 + (c % 2) * .5 + (c > 3 ? .25 : 0), k = nb - land;
        if (k < -.45) continue;
        const drop = k < 0 ? easeIn(clamp((k + .45) / .45)) : 1, y = BASE - (r + 1) * CH - (1 - drop) * 500, sq = k >= 0 ? .15 * Math.exp(-k * 8) : 0;
        boilSeed('blk' + r + '_' + c);
        paint(rectPts(X0 + c * CW + (r % 2) * 20 - CW * sq * .3, y + CH * sq, CW - 6 + CW * sq * .6, CH - 4 - CH * sq, 2), { wash: mixCol(MT.stone, MT.stoneDk, .2 + .3 * hs(r * 9 + c, 4)), fill: MT.stoneDk, fillOp: 40, tex: .6, ink: PAL.ink, sw: .9 });
        if (k >= 0 && k < .6) { boilSeed('dust' + r + c); paint(ellPts(X0 + c * CW + CW / 2, y + CH, 60 * (1 + k * 2), 16 * (1 + k), 12), { wash: '#E8D6B0', washOp: 180 * (1 - k / .6), ink: null }); }
      }
    }
    const done = ease(seg(nb, 16, 17.5));
    if (done > 0) { boilSeed('crown'); paint(rectPts(X0 + 2 * CW, BASE - 8 * CH - 20, 4 * CW, 20), { wash: MT.gold, ink: PAL.ink, sw: .8 }); glow(X0 + 4 * CW, BASE - 8 * CH - 60, 300 * done, '#FFE2A0', .8 * done); }
    // builders: figures hauling, and Clawd pushing a block into place on the last courses
    for (let i = 0; i < 4; i++) figure(300 + i * 1000 * (i % 2 ? 1 : .2) + 40 * Math.sin(t * 2 + i), 860, 190, { key: 'bu' + i, col: '#6A4A3A', arm: 1.4 + .3 * Math.sin(bpOf(t) * Math.PI + i), carry: i % 2 ? 'hammer' : null, lean: .1 * Math.sin(bpOf(t) * Math.PI + i) });
    const mood = emotions(t, [[tHit, 'excited'], [tHit + 5.5, 'determined'], [bt(b0 + 16), 'proud']]);
    const push_ = Math.max(0, Math.sin(bpOf(t) * Math.PI)) * (t < bt(b0 + 16) ? 1 : 0);
    clawd(1520, 870, U + 4, { ...mood, view: 'q', flip: true, aL: t < bt(b0 + 16) ? .6 + .4 * push_ : mood.aL, aR: t < bt(b0 + 16) ? .6 + .4 * push_ : mood.aR, dx: -.3 * push_, hat: 'kippah' });
    camEnd();
    if (lt < .3) whipStreaks(1 - lt / .3, 1);
    boilSeed('wipe');
    if (t > tNight - .3) brushWipe((t - (tNight - .3)) / .6, [MT.persia, '#3A3F7A']);
  }

  // Q: Shushan at night
  function columns(t, x0, n, gap, y, h, col = '#C9B8A0') {
    for (let i = 0; i < n; i++) {
      const x = x0 + i * gap; boilSeed('col' + i + '_' + x0);
      paint(rectPts(x - 28, y - h, 56, h, 1), { wash: col, fill: mixCol(col, PAL.ink, .3), fillOp: 60, tex: .6, ink: PAL.ink, sw: .8 });
      for (let k = 1; k < 5; k++) inkLine([[x - 28 + k * 11, y - h + 30], [x - 28 + k * 11, y - 10]], .4, mixCol(col, PAL.ink, .4), 'inkfine', 0);
      // the double-bull capital
      for (const s of [-1, 1]) paint(through([[x, y - h - 10], [x + s * 60, y - h - 16], [x + s * 90, y - h - 40], [x + s * 70, y - h - 58], [x + s * 30, y - h - 50], [x, y - h - 40]], 3), { wash: mixCol(col, '#8A7A60', .3), ink: PAL.ink, sw: .8 });
      paint(rectPts(x - 50, y - 16, 100, 16), { wash: mixCol(col, PAL.ink, .2), ink: PAL.ink, sw: .6 });
    }
  }
  function lantern(x, y, s, t, key) {
    boilSeed(key);
    inkLine([[x, y - s * 2], [x + 3 * Math.sin(t + x), y - s * .6]], .6, PAL.ink, 'inkfine', 0);
    glow(x, y, s * 5, '#FF8A4A', .8);
    paint(through([[x, y - s * .6], [x + s * .5, y - s * .3], [x + s * .55, y + s * .3], [x, y + s * .6], [x - s * .55, y + s * .3], [x - s * .5, y - s * .3]], 3).concat([[x, y - s * .6]]), { wash: MT.lantern, ink: PAL.ink, sw: .6 });
    for (const d of [-.25, .25]) inkLine([[x + d * s, y - s * .5], [x + d * s * 1.3, y + s * .5]], .4, '#8A2A1A', 'inkfine', .3);
  }
  function palace(t, shadow = 0) {
    skyWash([MT.persia, '#2E3670', '#434A86'], 'psky', -900, W + 900, -700, 800);
    starField(t, 36, 41, -300, -250, W + 600, 480, .9);
    boilSeed('pmoon'); glow(360, 170, 140, '#D8DEFF', .4); paint(ellPts(360, 170, 48, 48, 20), { wash: '#F2EEDC', ink: PAL.ink, sw: .5 }); paint(ellPts(380, 160, 44, 46, 20), { wash: MT.persia, ink: null });
    boilSeed('pwall');
    paint(rectPts(-900, 330, W + 1800, 520), { wash: '#6A5A7A', fill: '#4A3E5E', fillOp: 70, tex: .7, ink: null });
    for (let i = 0; i < 14; i++) inkLine([[-900 + i * 280, 330], [-900 + i * 280, 850]], .4, '#4A3E5E', 'inkfine', 0);
    if (shadow > 0) {   // the tall three-cornered shadow, rising on the wall
      boilSeed('hshadow');
      const h = 620 * shadow, x = 1180, y = 850;
      push(); translate(x, y); scale(1 + .6 * Math.max(0, shadow - 1), 1);
      figure(0, 0, h, { key: 'hamanShadow', hat: 'tricorn', col: '#1E1830', ink: null });
      pop();
    }
    columns(t, -200, 8, 330, 850, 520);
    for (let i = 0; i < 6; i++) lantern(-40 + i * 330, 380 + 20 * Math.sin(i), 26, t, 'lant' + i);
    boilSeed('pfloor'); paint(rectPts(-900, 850, W + 1800, 500), { wash: '#4A4262', fill: '#2E2A44', fillOp: 70, tex: .6, ink: null });
    inkLine([[-900, 852], [W + 900, 850]], 1, PAL.ink, 'ink', .3);
  }
  function gate(x, y, t) {
    boilSeed('gate');
    paint([[x - 160, y], [x - 160, y - 420], [x + 160, y - 420], [x + 160, y]], { wash: '#8A6A4A', fill: '#5A402A', fillOp: 70, tex: .6, ink: PAL.ink, sw: 1 });
    paint(through([[x - 90, y], [x - 90, y - 250], [x, y - 320], [x + 90, y - 250], [x + 90, y]], 3), { wash: '#1E1A30', ink: PAL.ink, sw: .9 });
    for (let i = 0; i < 6; i++) paint(rectPts(x - 150 + i * 52, y - 450, 36, 30), { wash: '#8A6A4A', ink: PAL.ink, sw: .6 });
  }
  function shotShushan(t, lt, dur) {
    const shadow = ease(seg(t, 213.3, 217.6));
    camBegin(lerp(700, 1000, ease(seg(t, tNight, 209))), 560, lerp(1.15, 1.08, seg(lt, 0, dur)));
    palace(t, shadow);
    gate(1450, 860, t);
    figure(1350, 870, 210, { key: 'mordechai', hat: 'turban', col: '#3A3A5A', lean: -.05, headTilt: .1 });   // Mordechai at the king's gate
    const mood = emotions(t, [[tNight, 'neutral'], [tNight + 1.2, 'thinking', { lookX: .5, lookY: -.8 }], [210.5, 'happy', { lookX: .8 }], [214.4, 'suspicious']]);
    const w = stroll(t, tNight + .3, 209.5, 300, 1180, U);
    let pose = t < 209.5 && t > tNight + .3 ? walkPose(mood, w, U) : { ...mood, view: 'q' };
    if (t > 214.2) pose = { ...pose, ...turn(t, 214.2, 214.45, .125, -.125) };
    const sit = ease(seg(t, 210, 210.6));
    clawd(w.x, 870, U, { ...pose, sq: (pose.sq || 0) + .15 * sit, hat: 'kippah' });
    camEnd();
    boilSeed('wipe');
    if (lt < .3) brushWipe(.5 + lt / .6, [MT.persia, '#3A3F7A']);
  }

  // R: the lots (pur) tumble on the beats; the king's seal stamps; the shadow swells and swallows the frame
  function die(x, y, s, rot, face, key) {
    boilSeed(key);
    push(); translate(x, y); rotate(rot);
    paint(rrPts(-s / 2, -s / 2, s, s, s * .16, 1), { wash: '#EDE2C8', ink: PAL.ink, sw: 1 });
    const pips = [[], [[0, 0]], [[-1, -1], [1, 1]], [[-1, -1], [0, 0], [1, 1]], [[-1, -1], [1, -1], [-1, 1], [1, 1]]][face];
    for (const [a, b] of pips) paint(ellPts(a * s * .25, b * s * .25, s * .08, s * .08, 8), { wash: PAL.ink, ink: null });
    pop();
  }
  function shotLots(t, lt, dur) {
    const out = ease(seg(t, 222.4, 224.2)), swallow = easeIn(seg(t, 224.3, tS4));
    camBegin(lerp(960, 900, out), lerp(600, 560, out), lerp(1.6, 1.0, out));
    if (out <= .5) {
      boilSeed('table');
      paint(rectPts(-400, -300, W + 800, H + 600), { wash: '#3A2A3A', ink: null });
      glow(900, 400, 700, '#FF9A4A', .6);
      paint(rectPts(-400, 520, W + 800, 700), { wash: '#6A3A2A', fill: '#4A2418', fillOp: 90, tex: .8, ink: null });
      for (let i = 0; i < 3; i++) {   // three throws, each landing on a beat
        const tl = bt(beatAt(tLots) + 1 + i * 2), k = seg(t, tl - .6, tl);
        if (t < tl - .6) continue;
        const x = lerp(-200, 700 + i * 180, easeOut(k)), y = 640 - 200 * 4 * k * (1 - k) + 30 * i;
        die(x, y, 90, (1 - easeOut(k)) * 8 + i, [4, 2, 3][i], 'die' + i);
      }
      const ts = bt(beatAt(tLots) + 7), st = t < ts - .25 ? 0 : t < ts ? -ease(seg(t, ts - .25, ts)) : 0;   // the seal
      boilSeed('tablet'); paint(rrPts(1180, 560, 360, 240, 20, 2), { wash: '#C4A27A', ink: PAL.ink, sw: 1 });
      if (t > ts) { paint(ellPts(1360, 680, 60, 60, 20), { wash: '#8A2A2A', ink: PAL.ink, sw: .8 }); paint(starPts(1360, 680, 34, .5, 6), { wash: '#5A1A1A', ink: null }); }
      if (t > ts - 1.2) {
        const y = lerp(300, 610, t < ts ? easeIn(seg(t, ts - .5, ts)) : 1) - (t > ts ? 300 * ease(seg(t, ts + .3, ts + 1)) : 0);
        boilSeed('ring'); paint(ribbon([[1600, -100], [1500, y - 120], [1380, y - 40]], 90, 70), { wash: '#2A2038', ink: PAL.ink, sw: .8 });
        paint(ellPts(1365, y - 20, 50, 30, 16), { wash: MT.gold, ink: PAL.ink, sw: .9 });
      }
      if (t > ts && t < ts + .2) flash(.5 * (1 - (t - ts) / .2), '#FFE0B0');
    }
    camEnd();
    if (out > .5) {   // the palace again, Clawd peeking from behind a column; the shadow swells over everything
      camBegin(900, 560, 1.08);
      palace(t, 1 + 2.5 * swallow);
      const mood = emotions(t, [[222.4, 'nervous', { lookX: .8, lookY: -.4 }], [224.8, 'scared', { lookY: -.8 }]]);
      clawd(560, 870, U, { ...mood, view: 'q', hat: 'kippah' });
      boilSeed('colfront'); paint(rectPts(640, 300, 70, 560, 1), { wash: '#C9B8A0', ink: PAL.ink, sw: .8 });
      camEnd();
      if (swallow > 0) flash(swallow, '#1E1830');
    }
    flash(1 - Math.abs(out - .5) * 2, '#2A1E2E');   // dip through dark from the table to the palace
  }

  shots([[tHit, shotBuild], [tNight, shotShushan], [tLots, shotLots]]);
})();
