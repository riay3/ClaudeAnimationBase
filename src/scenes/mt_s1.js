// mt_s1.js: STANZA 1, "Maoz Tzur" (50.0–99.6 s). Jerusalem at dawn; the barking foe in the storm and the sheltering
// rock; the dedication of the altar and the lighting of the Temple menorah. (Shots D–F in STORYBOARD.md.)
(() => {
  const V0 = 49.97, TEMPLE = [1500, 560], U = 22, GY = 930;

  function dawnSky(t, dark = 0) {
    skyWash([mixCol('#6D68A8', '#3D3F66', dark), mixCol(MT.dawn3, '#57587A', dark), mixCol(MT.dawn2, '#7A6F7E', dark), mixCol(MT.dawn1, '#A59A8E', dark)], 'dawn', -900, 3400, -700, 900);
  }
  function jerusalem(t, sunY, dark = 0) {
    boilSeed('sun');
    const sunK = 1 - dark * .8;
    glow(TEMPLE[0], sunY, 700, '#FFC878', .9 * sunK);
    paint(ellPts(TEMPLE[0], sunY, 120, 120, 30, 1.5), { wash: mixCol('#FFE2A2', '#C9B79A', dark), ink: null });
    glow(TEMPLE[0], sunY, 260, '#FFE9B8', .8 * sunK);
    ridge(-900, 3400, 640, 70, 21, mixCol('#A48CB4', '#6E6684', dark), { ink: null, texCol: '#8A76A2' });
    // the Temple Mount: its hill, the city on its slopes, the walls, the Temple
    boilSeed('mount');
    paint(through([[700, 760], [1050, 640], [1300, 600], [1750, 600], [2000, 650], [2400, 760]], 4).concat([[2400, 900], [700, 900]]), { wash: mixCol('#C59A7E', '#7E7074', dark), ink: null });
    houses(820, 1260, 700, 46, 3, mixCol(MT.stone, '#9A8E8C', dark));
    houses(1760, 2200, 715, 46, 8, mixCol(MT.stone, '#9A8E8C', dark));
    cityWall(760, 2300, 760, 60, mixCol('#E3C9A0', '#9A8E8C', dark), 'jwall');
    temple(TEMPLE[0], 620, 560, t, { col: mixCol(MT.stone, '#A89C98', dark), glow: .5 * sunK });
    ridge(-900, 3400, 820, 40, 31, mixCol(MT.olive, '#5E6450', dark), { texCol: MT.oliveDk });
    for (let i = 0; i < 12; i++) oliveTree(-600 + i * 300 + 120 * hs(i, 1), 800 + 30 * hs(i, 2) - 10, 120 + 40 * hs(i, 3), t, i, mixCol(MT.olive, '#6B7A58', hs(i, 5)));
    ridge(-900, 3400, 880, 25, 41, mixCol('#C9A56E', '#857A66', dark), { texCol: '#A88452' });   // the path
  }

  // D: dawn over Jerusalem; Clawd walks in, stops in awe as the sun clears the Temple, walks on
  function shotDawn(t, lt, dur) {
    const sunY = lerp(720, 330, ease(seg(t, V0, 61)));
    const w = t < 59.2 ? stroll(t, 53.8, 59.2, 380, 760, U) : stroll(t, 63.6, 68.6, 760, 1600, U);
    const cx = kf(t, [[V0, TEMPLE[0]], [54.5, 1150], [59.2, 1150], [63.8, 1180], [68.45, 1480]]), cy = kf(t, [[V0, 470], [54.5, 650]]);
    camBegin(cx, cy, kf(t, [[V0, 1.7], [54.5, 1.3], [68.45, 1.34]]));
    dawnSky(t);
    jerusalem(t, sunY);
    const mood = emotions(t, [[V0, 'hopeful'], [59.35, 'starstruck', { lookX: .9, lookY: -.7 }], [62.6, 'hopeful', { lookX: .6, lookY: -.4 }]]);
    const walking = (t > 53.8 && t < 59.2) || (t > 63.6 && t < 68.6);
    let pose = walking ? walkPose(mood, w, U) : { ...mood, view: t < 61.9 ? 'side' : 'q', aL: .25 + .1 * Math.sin(t * 2) };
    if (!walking && t > 61.9) pose = { ...pose, ...turn(t, 61.9, 62.1, .25, .125) };
    if (!walking && t > 63.4) pose = { ...pose, ...turn(t, 63.4, 63.6, .125, .25) };
    const gy = ridgeY(w.x, 880, 25, 41) + 6;
    clawd(w.x, gy, U, carryLamp({ ...pose, hat: 'kippah' }));
    camEnd();
    const g = 1 - ease(seg(t, V0, V0 + 1.4));
    if (g > 0) flash(g, '#F6D48C');   // out of the flame's gold
    if (lt > dur - .25) whipStreaks(seg(lt, dur - .25, dur), 1);
  }

  // E: the storm and the barking foe; Clawd shelters behind the rock; a sunbeam breaks through
  const ROCK = [1260, 885], tForm = 71.3, tBark = [bt(beatAt(73.6)), bt(beatAt(74.2))], tBeam = bt(beatAt(75.9));
  function jackal(t, k, open, a) {
    // a jackal's head and shoulders in the storm cloud, facing right; open 0..1 opens the jaw
    if (a <= 0) return;
    boilSeed('jackal');
    const x = 520, y = 330, s = 1.25, col = '#2E2A48', P = pts => pts.map(([px, py]) => [x + px * s, y + py * s]);
    const head = P([[-420, 260], [-300, 60], [-170, -40], [-150, -210], [-100, -80], [-40, -170], [0, -40], [120, -10], [260, 40], [300, 70], [230, 90], [120, 100], [-60, 150], [-120, 300]]);
    paint(through(head, 3), { wash: col, washOp: 235 * a, ink: null });
    push(); translate(x + 40 * s, y + 95 * s); rotate(.45 * open);
    paint(through([[0, 0], [120 * s, -6], [230 * s, 6], [120 * s, 40 * s], [10, 50 * s]], 3), { wash: col, washOp: 235 * a, ink: null });
    pop();
    if (open > .1) for (let i = 0; i < 6; i++) paint(starPts(x + (170 + i * 18) * s, y + (95 + 4) * s, 10, .3, 2, Math.PI / 2), { wash: PAL.cream, washOp: 200 * a * open, ink: null });
    glow(x + 20 * s, y + 10 * s, 50, '#FF6A3A', a * k);
    paint(ellPts(x + 20 * s, y + 10 * s, 14 * k, 7 * k, 10), { wash: '#FFB070', washOp: 255 * a, ink: null });
  }
  function shotStorm(t, lt, dur) {
    const dark = ease(seg(t, 68.45, 71.5)) * (1 - ease(seg(t, tBeam, tBeam + 1.2)) * .8);
    const shake = t > tBark[0] ? shakeXY(t, 8 * (Math.exp(-(t - tBark[0]) * 6) + (t > tBark[1] ? Math.exp(-(t - tBark[1]) * 6) : 0))) : [0, 0];
    camBegin(1150 + shake[0] - 700 * Math.pow(1 - seg(lt, 0, .3), 2), 630 + shake[1], 1.25 + .04 * seg(t, 68.45, 77.65));
    dawnSky(t, dark);
    jerusalem(t, 330, dark);
    // the storm rolls in from the left
    const roll = ease(seg(t, 68.45, 71.2)), gone = ease(seg(t, tBeam, tBeam + 1.4));
    for (let i = 0; i < 6; i++) cloud(-400 + i * 330 + 700 * (roll - 1) + 200 * gone * (i - 2), 220 + 60 * hs(i, 3), 640, 300, i % 2 ? '#4A4468' : '#5C5578', 190 * roll * (1 - gone), 'storm' + i);
    const open = Math.max(0, ...tBark.map(b => t > b - .08 ? Math.exp(-(t - b) * 5) * Math.min(1, (t - b + .08) * 12) : 0));
    jackal(t, ease(seg(t, tForm, tForm + .5)), open, ease(seg(t, tForm - .8, tForm + .3)) * (1 - gone));
    for (const b of tBark) if (t > b && t < b + .7) {   // bark: rings out of the jaw
      const k = seg(t, b, b + .7);
      for (let r = 0; r < 3; r++) inkLine(ellPts(900, 470, 60 + 220 * k + r * 50, 40 + 160 * k + r * 36, 14).slice(10, 14), 2 * (1 - k), PAL.cream, 'dry', .5);
    }
    if (t > tBeam - .1) {   // the sunbeam
      const k = ease(seg(t, tBeam - .1, tBeam + .6));
      boilSeed('beam');
      glow(1500, 300, 500 * k, '#FFD98A', .8 * k);
      paint(ribbon([[1520, 120], [1380, 900]], 260 * k, 520 * k), { wash: '#FFE9B8', washOp: 70 * k, ink: null });
    }
    boulder(...ROCK, 380, 330, '#A0907A');
    // Clawd: walking right → looks back at the forming shape → scared → dashes behind the rock → peeks out
    const mood = emotions(t, [[68.45, 'hopeful'], [70.6, 'nervous', { lookX: -.8, lookY: -.6 }], [tBark[0] + .05, 'scared'], [tBeam + .35, 'relieved']]);
    const run = seg(t, tBark[0] + .1, tBark[0] + .75), x = t < 70.5 ? lerp(760, 900, seg(t, 68.45, 70.5)) : lerp(900, 1520, easeOut(run));
    const hop = jump(t, tBark[0] + .15, tBark[0] + .7, 1.6);
    let pose;
    if (t < 70.5) pose = walkPose(mood, { flip: false, walk: (x - 760) / (4 * U), dy: 0 }, U);
    else if (t < tBark[0] + .1) pose = { ...mood, ...turn(t, 70.5, 70.7, .25, -.125) };
    else if (t < tBark[0] + .75) pose = { ...mood, view: 'side', walk: run * 4, smear: .4 * Math.sin(run * Math.PI), smearDir: 1, dy: hop.dy, sq: hop.sq };
    else pose = { ...mood, view: 'q', flip: true, sq: (mood.sq || 0) + .22 * (1 - seg(t, tBeam, tBeam + 1)), lookX: t > tBeam ? .6 : mood.lookX };
    clawd(x, 890, U, carryLamp({ ...pose, hat: 'kippah' }, { bend: -6 * roll * (1 - gone) }));
    camEnd();
    if (lt < .3) whipStreaks(1 - lt / .3, 1);
    boilSeed('wipe');
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, [MT.goldDk, MT.gold]);
  }

  // F: the Temple court: up the altar ramp, the altar fire, the menorah lamps one by one, a song, the fire roars
  const ALT = [560, 760], MEN = [1250, 900], tFire = bt(beatAt(84.0)), lampT = i => bt(144 + i);
  function altar(t, fire) {
    boilSeed('altar');
    const [x, y] = ALT, w = 420, h = 230, st = '#B39A76';
    paint(rectPts(x - w / 2, y - h * .1, w, h * 1.1 + 40, 1), { wash: st, fill: MT.stoneDk, fillOp: 70, tex: .8, ink: PAL.ink, sw: 1.1 });
    for (let i = 0; i < 5; i++) inkLine([[x - w / 2, y + 30 + i * 36], [x + w / 2, y + 32 + i * 36]], .5, MT.stoneSh, 'inkfine', 0);
    for (const s of [-1, 1]) paint([[x + s * w / 2, y - h * .1], [x + s * (w / 2 - 50), y - h * .1], [x + s * (w / 2 - 6), y - h * .1 - 44]], { wash: st, ink: PAL.ink, sw: .9 });   // horns
    paint([[x + w / 2 - 10, y - 10], [x + w / 2 + 380, GY + 20], [x + w / 2 - 10, GY + 20]], { wash: mixCol(st, MT.stoneDk, .3), fill: MT.stoneDk, fillOp: 50, tex: .6, ink: PAL.ink, sw: 1 });   // the ramp
    for (let i = 0; i < 6; i++) paint(rectPts(x - 130 + i * 45, y - 42 - (i % 2) * 10, 150, 22, 2), { wash: '#7A5236', ink: PAL.ink, sw: .6 });   // the wood
    if (fire > 0) {
      const s = 40 * fire * (1 + .4 * Math.sin(t * 5));
      for (let i = 0; i < 5; i++) flame(x - 90 + i * 45, y - 40, s * (.7 + .4 * hs(i, 3)), t, { seed: 30 + i, glow: .45, k: 1 });
    }
  }
  function shotAltar(t, lt, dur) {
    const roar = easeIn(seg(t, 96.1, 99.6));
    camBegin(lerp(1000, ALT[0], roar * 1.2 > 1 ? 1 : roar * 1.2), lerp(540, ALT[1] - 120, roar), lerp(1, 7, roar * roar));
    skyWash(['#7FA3CE', '#B9C9D8', '#F4D9A6'], 'court', -900, W + 900, -700, 900);
    temple(1250, 1020, 1400, t, { glow: .35 });
    boilSeed('court');
    paint(rectPts(-600, GY - 20, W + 1200, 600), { wash: '#E4D2AE', fill: MT.stoneDk, fillOp: 50, tex: .7, ink: null });
    for (let i = 0; i < 9; i++) inkLine([[-600 + i * 380, GY - 20], [-900 + i * 420, H + 200]], .5, MT.stoneDk, 'inkfine', 0);
    inkLine([[-600, GY - 18], [W + 600, GY - 22]], 1, PAL.ink, 'ink', .3);
    const fire = ease(seg(t, tFire - .05, tFire + .3)) * (1 + 1.2 * spring(t, tFire, 4, 12)) + 5 * roar;
    if (t > 91.5) smoke(ALT[0], ALT[1] - 150, 520, t, '#E8DCCB', 110 * seg(t, 91.5, 93), 'offer');
    altar(t, fire);
    const lit = [0, 1, 2, 3, 4, 5, 6].map(i => ease(seg(t, lampT(i), lampT(i) + .25)));
    const lamps = menorah7(MEN[0], MEN[1], 520, t, lit.slice().reverse(), { key: 'court' });
    // the spark that hops from the altar fire to each lamp in turn, right to left
    if (t > lampT(0) - .6 && t < lampT(6) + .1) {
      const i = clamp(Math.floor((t - lampT(0) + .6) / BEAT), 0, 6), a = i === 0 ? [ALT[0], ALT[1] - 120] : lamps[7 - i], b = lamps[6 - i];
      const k = seg(t, lampT(i) - .5, lampT(i));
      if (k > 0 && k < 1) { const p = arcPt(a, [b[0], b[1] - 16], i === 0 ? 260 : 60, ease(k)); spark(p[0], p[1], 7, t); }
    }
    // Clawd: up the ramp (facing left), lights the altar, turns to watch the menorah, sings and dances
    const mood = emotions(t, [[77.65, 'determined'], [tFire + .1, 'surprised'], [tFire + 1.0, 'happy'], [lampT(0) - .3, 'hopeful', { lookX: .9 }], [91.5, 'happy', { emote: 'music' }], [96.3, 'starstruck']]);
    const up = seg(t, 77.9, 82.1), rx0 = 1150, rx1 = ALT[0] + 290;
    const x = lerp(rx0, rx1, ease(up)), y = x >= 1150 ? GY + 10 : 750 + (x - 770) / 380 * 190;
    let pose;
    if (t < 82.1) pose = walkPose(mood, { flip: true, walk: (rx0 - x) / (4 * U), dy: 0 }, U);
    else if (t < tFire + .6) pose = { ...mood, view: 'side', flip: true, aL: lerp(.15, .55, ease(seg(t, 82.4, tFire - .1))) };
    else if (t < lampT(0) - .6) pose = { ...mood, view: 'side', flip: true };
    else pose = { ...mood, ...turn(t, lampT(0) - .6, lampT(0) - .4, -.25, .125), ...(t > 91.5 ? move('bounce', t) : {}), eyes: mood.eyes, mouth: t > 91.5 ? 'open' : mood.mouth };
    const slope = t < 82.1 && t > 77.9 ? .45 : 0;
    clawd(x, y, U + 2, carryLamp({ ...pose, hat: 'kippah', rot: (pose.rot || 0) + slope * (pose.flip ? 1 : -1) * .5 }));
    camEnd();
    boilSeed('wipe');
    if (lt < .3) brushWipe(.5 + lt / .6, [MT.goldDk, MT.gold]);
    if (roar > .6) flash(ease(seg(roar, .6, 1)), MT.flameO);
  }

  shotsShifted([[V0, shotDawn], [68.45, shotStorm], [77.65, shotAltar]], SHIFT[0]);
})();
