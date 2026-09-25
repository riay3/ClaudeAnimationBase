// mt_intro.js: INTRO (0–50 s). A snowy village at night; one window warms as Clawd carries in the shamash. Match cut
// through the window to the sill: Clawd lights the first candle. Clawd gazes out; Jerusalem appears in the snow-light;
// the camera pushes into the flame, and gold fills the frame. (Shots A–C in STORYBOARD.md.)
(() => {
  // ---------- the village (outside) ----------
  const WIN = [1190, 630];
  function village(t, o = {}) {
    skyWash([MT.night, '#252E5E', '#3A4884', '#566BA6'], 'vsky');
    starField(t, 40, 1, -300, -200, W + 600, 560, .9);
    boilSeed('moon');
    glow(1610, 170, 160, '#CFD8FF', .35);
    paint(ellPts(1610, 170, 52, 52, 22, 1), { wash: '#F4EED8', ink: PAL.ink, sw: .6 });
    paint(ellPts(1632, 158, 48, 50, 22, 1), { wash: '#252E5E', ink: null });   // crescent: the night bites the moon
    ridge(-400, W + 400, 700, 60, 3, '#8E9CC4', { ink: '#5B6894', texCol: '#6F7DAA' });
    ridge(-400, W + 400, 800, 30, 7, '#C8D2E8', { ink: '#8C99BE', texCol: MT.snowSh });
    for (let i = 0; i < 9; i++) pine(-100 + i * 260 + 90 * hs(i, 2), 790 + 20 * hs(i, 5), 150 + 70 * hs(i, 9), i);
    if (o.stars7) sevenStars(t, o.stars7);
    const lit = o.lit || 0, all = o.allLit || 0, mini = (wx, wy, ww, wh) => { if (all > 0) { boilSeed('mini' + wx); paint(rectPts(wx - ww / 2, wy + wh * .25, ww, wh * .25), { wash: '#6B4A34', ink: null }); for (let i = 0; i < 9; i++) flame(wx - ww * .4 + i * ww * .1, wy + wh * .22 - (i === 0 ? wh * .1 : 0), ww * .02, t, { k: all, seed: i + wx, glow: .5 }); } };
    snowHouse(560, 820, 280, 230, { col: '#4A3E5A', wx: -.15, win: all, inside: mini });
    snowHouse(870, 800, 240, 200, { col: '#3E3A58', wx: .1, win: all, inside: mini });
    snowHouse(1550, 830, 300, 240, { col: '#453A55', wx: .15, win: all, inside: mini });
    const w = snowHouse(WIN[0], 760, 300, 260, { col: '#51405C', win: lit, inside: o.inside });
    // chimney smoke
    boilSeed('smoke');
    const sm = []; for (let k = 0; k < 7; k++) sm.push([1260 + 14 * Math.sin(t * .8 + k * .9) + k * 10, 520 - k * 42]);
    paint(ribbon(sm, 16, 40), { wash: '#7C86AC', washOp: 120, ink: null });
    ridge(-400, W + 400, 900, 12, 11, MT.snow, { ink: '#9AA6C8', texCol: MT.snowSh, texOp: 40 });
    return w;
  }

  function shotVillage(t, lt, dur) {
    const push = easeIn(seg(lt, 3.5, dur)), zoom = lerp(1, 12, push * push) * (1 + .02 * lt);
    camBegin(lerp(960, WIN[0], ease(seg(lt, 0, dur))), lerp(560, WIN[1], ease(seg(lt, 0, dur))), zoom);
    const lit = ease(seg(lt, 4.0, 7.0));
    village(t, {
      lit,
      inside: (wx, wy, ww, wh) => {   // through the glass: a warm room, the sill, Clawd carrying the shamash in
        if (lit <= 0) return;
        boilSeed('inside');
        paint(rectPts(wx - ww / 2, wy - wh / 2, ww, wh), { wash: mixCol('#3B2A3E', '#C8844A', lit * .8), ink: null });
        paint(rectPts(wx - ww / 2, wy + wh * .28, ww, wh * .22), { wash: '#6B4A34', ink: null });
        hanukkiah(wx - ww * .1, wy + wh * .3, ww * .45, t, [0, 0, 0, 0, 0, 0, 0, 0, 0], { held: true });
        const cx = lerp(wx - ww * .7, wx + ww * .22, ease(seg(lt, 4, 8.2))), walking = lt > 4 && lt < 8.2;
        const pose = carryCandle({ ...feel('hopeful', t), view: lt > 9.5 ? 'front' : 'q', walk: walking ? lt * 1.6 : null, aR: -.2 });
        clawd(cx, wy + wh * .36, ww * .028, { ...pose, noShadow: true, hat: 'kippah' });
      },
    });
    camEnd();
    snowfall(t, 60, .2, 1, 210 * (1 - seg(lt, 10, dur)));
    if (lt < 3) fadeFrom(ease(lt / 3), MT.night);
  }

  // ---------- the sill (inside) ----------
  const HX = 700, HY = 800, HS = 560, CG = 850, CU = 24, REST = 1260;
  const tLight = 19.4;
  function room(t, vision, o = {}) {
    boilSeed('wall');
    paint(rectPts(-400, -400, W + 800, H + 800), { wash: '#3A2A3D', ink: null });
    paint(rectPts(-400, -400, W + 800, H + 800), { fill: '#241A2C', fillOp: 110, bleed: .2, tex: .7, ink: null });
    // outside, through the window
    const X0 = 330, Y0 = 90, X1 = 1470, Y1 = 700;
    boilSeed('outside');
    for (let i = 0; i < 6; i++) paint(rectPts(X0, lerp(Y0, Y1, i / 6), X1 - X0, (Y1 - Y0) / 6 + 6), { wash: mixCol(MT.night, '#4E5F9A', i / 5), ink: null });
    starField(t, 22, 4, X0 + 20, Y0 + 10, X1 - X0 - 40, 220, .8 * (1 - (o.storm || 0)));
    if (o.stars7) sevenStars(t, o.stars7, .55, X0 + 120, Y0 + 60, X1 - X0 - 240);
    if (o.storm) for (let i = 0; i < 3; i++) { boilSeed('sclouds' + i); paint(ellPts(X0 + 200 + i * 400 + 60 * Math.sin(t * .8 + i), Y0 + 120, 320, 110, 16, 6), { wash: '#4E5878', washOp: 220 * o.storm, ink: null }); }
    if (vision > 0) jerusalemVision(t, vision, X0, Y0, X1, Y1);
    ridgeIn(X0, X1, 560, 30, 13, '#B9C4DE');
    boilSeed('outhouses');
    for (let i = 0; i < 5; i++) {
      const hx = X0 + 90 + i * 250 + 40 * hs(i, 6), hy = 640, hw = 150, hh = 110 + 40 * hs(i, 7);
      paint(rectPts(hx, hy - hh, hw, hh), { wash: '#3C3656', ink: null });
      paint([[hx - 16, hy - hh + 4], [hx + hw / 2, hy - hh - 70], [hx + hw + 16, hy - hh + 4]], { wash: '#D9E0EE', ink: null });
      paint(rectPts(hx + hw * .4, hy - hh * .55, 30, 34), { wash: mixCol('#1F1D33', MT.win, o.lights || 0), ink: null });
      if (o.lights) glow(hx + hw * .4 + 15, hy - hh * .55 + 17, 70, '#FFB65C', .7 * o.lights);
    }
    paint(rectPts(X0, 640, X1 - X0, 60), { wash: '#DCE3F0', ink: null });
    snowIn(t, X0, Y0, X1 - X0, Y1 - Y0, o.snowN ?? 46, 1.4, 5, o.wind || 0);
    // the window: frame, muntins, a glint on the glass
    boilSeed('frame');
    const wood = '#5A3B2A', fr = 34;
    for (const R of [[X0 - fr, Y0 - fr, X1 - X0 + 2 * fr, fr], [X0 - fr, Y1, X1 - X0 + 2 * fr, fr], [X0 - fr, Y0, fr, Y1 - Y0], [X1, Y0, fr, Y1 - Y0]])
      paint(rectPts(...R, 1), { wash: wood, fill: '#3A2418', fillOp: 70, tex: .6, ink: PAL.ink, sw: 1 });
    paint(rectPts((X0 + X1) / 2 - 12, Y0, 24, Y1 - Y0), { wash: wood, ink: PAL.ink, sw: .8 });
    paint(rectPts(X0, (Y0 + Y1) / 2 - 10, X1 - X0, 20), { wash: wood, ink: PAL.ink, sw: .8 });
    inkLine([[X0 + 60, Y0 + 220], [X0 + 190, Y0 + 60]], 1.4, '#9AA8CC', 'dry', .2);
    inkLine([[X1 - 260, Y1 - 40], [X1 - 120, Y1 - 190]], 1, '#9AA8CC', 'dry', .2);
    // the sill
    boilSeed('sill');
    paint([[-200, 730], [W + 200, 730], [W + 200, H + 200], [-200, H + 200]], { wash: '#6E4B35', fill: '#4A2F20', fillOp: 90, bleed: .1, tex: .8, ink: null });
    inkLine([[-200, 732], [W / 2, 728], [W + 200, 733]], 1.2, PAL.ink, 'ink', .3);
    for (let i = 0; i < 5; i++) inkLine([[-200, 800 + i * 60 + 10 * hs(i, 2)], [W + 200, 804 + i * 60]], .5, '#4A2F20', 'inkfine', .3);
  }
  function ridgeIn(x0, x1, y, amp, seed, col) {
    boilSeed('ridgein' + seed); const P = [];
    for (let i = 0; i <= 16; i++) { const x = lerp(x0, x1, i / 16); P.push([x, ridgeY(x, y, amp, seed)]); }
    paint([...P, [x1, 700], [x0, 700]], { wash: col, ink: null });
  }
  // Jerusalem, seen in the snow-light: hills, walls and the Temple, pale gold, slowly surfacing in the night sky.
  function jerusalemVision(t, k, X0, Y0, X1, Y1) {
    boilSeed('vision');
    const col = '#EBCB8E', a = 170 * k, cx = (X0 + X1) / 2 + 80, by = 440, rise = 30 * (1 - k);
    glow(cx, by - 120, 460 * k, '#FFD9A0', .6 * k);
    const hill = []; for (let i = 0; i <= 18; i++) { const x = lerp(X0, X1, i / 18); hill.push([x, by + 40 + rise - 90 * Math.exp(-(((x - cx) / 300) ** 2)) + 10 * Math.sin(i * 1.3)]); }
    paint([...hill, [X1, 600], [X0, 600]], { wash: col, washOp: a * .45, ink: null });
    // walls with towers, then the Temple rising above them, all one pale silhouette
    const P = [[cx - 360, by + 10 + rise]];
    for (let i = 0; i <= 14; i++) { const x = lerp(cx - 360, cx + 360, i / 14), tw = i % 4 === 0 ? 34 : 0; P.push([x - 12, by - 36 - tw + rise], [x + 12, by - 36 - tw + rise]); }
    P.push([cx + 360, by + 10 + rise]);
    paint(P, { wash: col, washOp: a * .7, ink: null });
    const T0 = by - 40 + rise;
    paint([[cx - 70, T0], [cx - 70, T0 - 120], [cx - 110, T0 - 120], [cx - 110, T0 - 180], [cx + 110, T0 - 180], [cx + 110, T0 - 120], [cx + 70, T0 - 120], [cx + 70, T0]], { wash: col, washOp: a, ink: null });
    for (let i = 0; i < 7; i++) {   // soft rays from behind it
      const ang = -Math.PI / 2 + (i - 3) * .28 + .03 * Math.sin(t * .7 + i), r0 = 140, r1 = 330 + 40 * hs(i, 3);
      paint(ribbon([[cx + Math.cos(ang) * r0, T0 - 100 + Math.sin(ang) * r0], [cx + Math.cos(ang) * r1, T0 - 100 + Math.sin(ang) * r1]], 26, 4), { wash: col, washOp: a * .28, ink: null });
    }
  }

  function shotSill(t, lt, dur) {
    const T0 = t - lt;   // video time this shot started (13.1)
    const L = x => x - T0;   // video time → shot time
    // camera: a steady medium shot, then a push toward Clawd and the window, then into the first flame
    const w7 = [HX - HS * .35 + 7 * HS * .1, HY - HS * .08 - HS * .16 - HS * .015];
    const cam = lt < L(31.5) ? [lerp(900, 930, seg(lt, 0, L(31.5))), 625 + 6 * Math.sin(lt * .5), lerp(1.42, 1.5, seg(lt, 0, L(31.5)))]
      : lt < L(40.8) ? [lerp(930, 1000, ease(seg(lt, L(31.5), L(34.5)))), lerp(625, 520, ease(seg(lt, L(31.5), L(34.5)))), lerp(1.5, 1.4, ease(seg(lt, L(31.5), L(34.5))))]
      : (() => { const k = easeIn(seg(lt, L(40.8), L(47.6))); return [lerp(1000, w7[0], ease(seg(lt, L(40.8), L(44)))), lerp(520, w7[1] - 30, ease(seg(lt, L(40.8), L(44)))), lerp(1.4, 14, k * k)]; })();
    camBegin(...cam);
    const vision = ease(seg(t, 32.5, 38));
    room(t, vision);

    // Clawd: holds the shamash, reaches, lights the first candle, pulls back, watches, looks up at the vision
    const mood = emotions(t, [[0, 'hopeful', { lookX: .9, lookY: .4 }], [17.0, 'determined', { lookX: .9, lookY: .5 }], [tLight + .15, 'happy'],
      [24.6, 'relieved'], [32.9, 'hopeful', { lookX: .5, lookY: -.9 }], [36.0, 'starstruck', { lookY: -.8 }]]);
    const reach = ease(seg(t, 17.6, 19.2)) * (1 - ease(seg(t, 20.2, 21.6))), wind = spring(t, 17.2, 7, 14) * .2;
    const aR = lerp(-.25, .51, reach) + .05 * Math.sin(t * 2);
    let pose = { ...mood, view: 'q', flip: true, aR, hat: 'kippah', rot: (mood.rot || 0) * .5 - .06 * reach, dy: mood.dy * (1 - reach), sq: mood.sq * (1 - reach) + wind };
    const tip0 = armTipR(0, CG, CU, pose), xReach = w7[0] - tip0[0];
    const x = lerp(REST, xReach, reach) + 30 * wind;
    const lit7 = ease(seg(t, tLight - .1, tLight + .35));
    clawd(x, CG, CU, carryCandle(pose, 1));
    const lit = [0, 0, 0, 0, 0, 0, 0, lit7 * (1 + .6 * spring(t, tLight, 5, 20)), 0];
    hanukkiah(HX, HY, HS, t, lit, { held: true });
    if (t > tLight - .1) glow(w7[0], w7[1] - 20, 260 * (1 + 1.2 * Math.exp(-(t - tLight) * 3)), '#FFB15A', .35 * lit7);
    camEnd();
    // gold fills the frame as the camera enters the flame, and holds until stanza 1
    const gold = ease(seg(t, 45.8, 48.4));
    if (gold > 0) flash(gold, '#F6D48C');
    if (lt < .25) flash(1 - lt / .25, '#F0B060');   // the warm flash of passing through the window
  }

  // shared with the outro (mt_s6.js), which comes back to this window on the eighth night
  window.MTI = { village, room, WIN, HX, HY, HS, CG, CU, REST };
  shots([[0, shotVillage], [13.1, shotSill]]);
})();
