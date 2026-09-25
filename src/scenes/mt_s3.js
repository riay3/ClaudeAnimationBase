// mt_s3.js: STANZA 3, "D'vir kodsho" (149.2–195.35 s). The sanctuary with no rest (idols creep in); the oppressor
// comes and leads Clawd away LEFT into exile; the rivers of Babylon and the cup of bewilderment; seventy years pass
// over the sleeping Clawd; Babylon falls; Zerubbabel's caravan; Clawd wakes and turns home, RIGHT. (Shots L–O.)
(() => {
  const V2 = 149.19, U = 22, L = k => lineT(2, k), tHit = bt(beatAt(194.2));

  // L: the sanctuary: cedar and gold; idols creep onto the shelf, one per beat; the lamp gutters
  function shotSanctuary(t, lt, dur) {
    camBegin(960 + 20 * Math.sin(lt * .4), 560, 1.1 + .03 * lt / dur);
    boilSeed('cedar');
    paint(rectPts(-600, -600, W + 1200, H + 1200), { wash: '#6A4128', fill: '#4A2A18', fillOp: 100, bleed: .15, tex: .8, ink: null });
    for (let i = 0; i < 9; i++) {   // carved panels: palms and open flowers in gold
      const x = -180 + i * 290;
      paint(rectPts(x, 120, 230, 560, 2), { wash: '#7A4C2E', ink: '#3A2014', sw: .8 });
      boilSeed('carve' + i);
      inkLine([[x + 115, 640], [x + 115, 260]], 1.6, MT.gold, 'ink', .2);
      for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * .5; inkLine([[x + 115, 260], [x + 115 + Math.cos(a) * 80, 260 + Math.sin(a) * 60 + 30]], 1.2, MT.gold, 'ink', .5); }
      paint(ellPts(x + 115, 470, 34, 34, 10), { ink: MT.gold, sw: 1 });
    }
    boilSeed('veil');   // the veil of the inner sanctuary, deep blue and crimson
    paint(through([[760, 90], [1160, 90], [1170, 700], [1100, 715], [960, 700], [820, 716], [750, 700]], 3), { wash: '#2E3C7A', fill: '#8A2A3A', fillOp: 90, bleed: .2, tex: .6, ink: PAL.ink, sw: 1 });
    for (let i = 0; i < 6; i++) inkLine([[790 + i * 70, 100], [785 + i * 70 + 10 * Math.sin(t + i), 700]], .6, '#1E2650', 'inkfine', .4);
    paint(rectPts(-600, 700, W + 1200, 600), { wash: '#8A6A44', fill: '#5A4028', fillOp: 70, tex: .7, ink: null });
    inkLine([[-600, 702], [W + 600, 700]], 1, PAL.ink, 'ink', .3);
    // the shelf of idols
    boilSeed('shelf'); paint(rectPts(1300, 520, 460, 24, 1), { wash: '#4A2A18', ink: PAL.ink, sw: .8 });
    for (let i = 0; i < 5; i++) {
      const tIn = bt(beatAt(L(1)) + 1 + i * 1.5), k = backOut(seg(t, tIn, tIn + .35)); if (k <= 0) continue;
      boilSeed('idol' + i);
      const x = 1340 + i * 90, h = 70 + 20 * hs(i, 3);
      push(); translate(x, 520); scale(1, k);
      paint(through([[-20, 0], [-24, -h * .5], [-12, -h * .8], [0, -h], [12, -h * .8], [24, -h * .5], [20, 0]], 2), { wash: ['#3A3044', '#4A3A2A', '#2E3A3A'][i % 3], ink: PAL.ink, sw: .7 });
      pop();
      glow(x - 5, 520 - h * .75 * k, 16, '#FF6A3A', k * .9);
    }
    // a lampstand for Clawd's lamp, and Clawd, content → uneasy
    boilSeed('stand'); paint(rectPts(655, 540, 30, 160), { wash: MT.goldDk, ink: PAL.ink, sw: .8 }); paint(ellPts(670, 540, 60, 14, 12), { wash: MT.gold, ink: PAL.ink, sw: .8 });
    const unease = ease(seg(t, L(1) + .8, L(1) + 2));
    oilLamp(620, 525, 110, t, { key: 'stand', bend: 10 * unease * Math.sin(t * 7), size: 1 - .35 * unease });
    const mood = emotions(t, [[V2, 'hopeful'], [L(1) + 1.2, 'nervous', { lookX: .9 }], [L(1) + 3.2, 'shy', { lookX: .9, lookY: .4 }]]);
    clawd(880, 780, U + 6, { ...mood, view: 'q', hat: 'kippah' });
    camEnd();
    boilSeed('wipe');
    if (lt < .3) brushWipe(.5 + lt / .6, [MT.seaDk, MT.sea]);
  }

  // M: the oppressor: spears from the right, the Temple burns, Clawd led LEFT among the captives, looking back
  function shotExile(t, lt, dur) {
    const burn = ease(seg(t, 160.4, 163)), lead = seg(t, L(3), dur + (t - lt));
    camBegin(lerp(1100, 700, ease(seg(t, L(3), L(4)))), 560, 1.12);
    skyWash([mixCol('#3C3A6A', '#5A2A30', burn), mixCol('#8A6A8A', '#B4502E', burn), mixCol('#D9A07A', '#E88A3A', burn)], 'exsky', -900, W + 1200, -700, 800);
    temple(1500, 700, 620, t, { col: mixCol(MT.stone, '#8A6A60', burn) });
    if (burn > 0) {
      for (let i = 0; i < 7; i++) flame(1250 + i * 85, 540 - 60 * Math.sin(i * 1.3) ** 2, 45 * burn * (.7 + .5 * hs(i, 2)), t, { seed: 60 + i, glow: 1.3 });
      smoke(1500, 360, 500, t, '#3A2E3A', 150 * burn, 'burnsmoke');
    }
    ridge(-900, W + 1200, 800, 20, 71, '#8C6E5A', { texCol: '#6A5040' });
    // soldiers sweep in from the right (on the beat), then line the road
    for (let i = 0; i < 7; i++) {
      const tin = L(2) + i * BEAT * .5, x = lerp(W + 400, 900 + i * 150, easeOut(seg(t, tin, tin + 2.2)));
      figure(x, 820 + 6 * hs(i, 3), 220 + 20 * hs(i, 5), { key: 's' + i, hat: 'bab', col: '#2A2440', carry: i === 2 ? 'banner' : 'spear', arm: i === 2 ? .9 : 1.2, walk: t < tin + 2.2 ? x / 80 : null, flip: true, bannerCol: '#8A3A2A' });
    }
    // the captives: a roped line walking left, Clawd among them, head down, then looking back
    const cx = lerp(1000, 360, ease(lead));
    for (let i = 0; i < 4; i++) figure(cx - 220 - i * 170, 845, 180 + 20 * hs(i, 6), { key: 'c' + i, col: '#3A3048', walk: t > L(3) ? cx / 70 + i * .3 : null, flip: true, lean: .12, headTilt: .3 });
    if (t > L(3)) { boilSeed('rope'); inkLine([[cx - 700, 760], [cx - 360, 770], [cx - 40, 760], [cx + 20, 760]], 1.3, '#8A6A44', 'ink', .6); }
    const mood = emotions(t, [[L(2), 'scared', { lookX: 1 }], [161.2, 'cry'], [L(3) + .2, 'sad'], [165.6, 'cry', { lookX: -1 }]]);
    const walking = t > L(3) && t < 165.4;
    let pose = walking ? walkPose(mood, { flip: true, walk: (1000 - cx) / (4 * U), dy: 0 }, U) : { ...mood, view: 'q', flip: t > L(3) };
    if (t > 165.4) pose = { ...pose, ...turn(t, 165.4, 165.6, -.25, .125) };
    clawd(cx, 850, U, carryLamp({ ...pose, hat: 'kippah' }, { size: .8 }));
    camEnd();
    if (lt < .35) flash(1 - lt / .35, '#FFE0C0');
  }

  // N + O: by the rivers of Babylon
  function willow(x, y, s, t, seed, bare = 0) {
    boilSeed('willow' + seed);
    paint(ribbon([[x, y], [x - s * .04, y - s * .4], [x + s * .03, y - s * .7]], s * .1, s * .05), { wash: '#4A3A30', ink: PAL.ink, sw: .7 });
    for (let i = 0; i < 12; i++) {
      const bx = x + (i - 5.5) * s * .06, by = y - s * (.72 + .08 * Math.sin(i)), sway = 12 * Math.sin(t * .8 + i * .7), len = s * (.45 + .25 * hs(i, seed));
      const leaves = 1 - bare * (hs(i, seed + 3) > .3 ? 1 : .6);
      inkLine([[x, y - s * .7], [bx, by], [bx + sway * .5, by + len * .5], [bx + sway, by + len]], .7, '#3A4A30', 'inkfine', .6);
      if (leaves > .05) paint(ribbon([[bx, by + 10], [bx + sway * .5, by + len * .5], [bx + sway, by + len]], 18 * leaves, 4 * leaves), { wash: mixCol('#6E8A52', '#A48A4A', bare), washOp: 220 * leaves, ink: null });
    }
  }
  function harp(x, y, s) {   // a lyre hanging on a willow branch
    boilSeed('harp' + x);
    inkLine([[x, y - s * .9], [x, y - s * .55]], .6, '#3A2A20', 'inkfine', 0);
    paint(ribbon([[x - s * .3, y], [x - s * .38, y - s * .35], [x - s * .2, y - s * .6]], s * .08, s * .05), { wash: '#8A5A34', ink: PAL.ink, sw: .6 });
    paint(ribbon([[x + s * .3, y], [x + s * .38, y - s * .35], [x + s * .2, y - s * .6]], s * .08, s * .05), { wash: '#8A5A34', ink: PAL.ink, sw: .6 });
    paint(rectPts(x - s * .25, y - s * .62, s * .5, s * .06), { wash: '#6A4228', ink: PAL.ink, sw: .5 });
    for (let i = 0; i < 4; i++) inkLine([[x - s * .15 + i * s * .1, y - s * .58], [x - s * .15 + i * s * .1, y - s * .05]], .4, PAL.cream, 'inkfine', 0);
    paint(ellPts(x, y, s * .32, s * .1, 12), { wash: '#6A4228', ink: PAL.ink, sw: .5 });
  }
  function ziggurat(x, y, s, crumble, t) {
    boilSeed('zig');
    for (let i = 0; i < 5; i++) {
      const w = s * (1 - i * .18), h = s * .16, fall = clamp(crumble * 1.6 - (4 - i) * .15), yy = y - i * h + fall * (i * h * .9);
      push(); translate(x + fall * (i % 2 ? 30 : -40), yy); rotate(fall * (i % 2 ? .15 : -.12));
      paint(rectPts(-w / 2, -h, w, h, 2), { wash: mixCol('#5A4A7A', '#3A3058', i / 5), ink: '#2A2240', sw: .8 });
      pop();
    }
    if (crumble > .05 && crumble < 1) { boilSeed('zigdust'); for (let i = 0; i < 8; i++) paint(ellPts(x + (i - 4) * 70, y - 60 - 80 * crumble * hs(i, 3), 90 * crumble, 50 * crumble, 12), { wash: '#6A5E86', washOp: 140 * (1 - crumble), ink: null }); }
  }
  const tDrink = bt(beatAt(170.0)), tSlump = L(5) + .3;
  function shotRivers(t, lt, dur) {
    const inO = t >= L(6), years = seg(t, L(6), L(7));   // the seventy years
    const dawn = ease(seg(t, L(7), L(7) + 3));
    camBegin(980 + 30 * Math.sin(lt * .2), 560, inO ? lerp(1.18, 1.1, seg(t, L(6), L(9))) : 1.18);
    const night = inO ? 1 - dawn : ease(seg(t, L(4), L(6)));
    skyWash([mixCol(MT.exile, '#141A3A', night), mixCol(MT.exileLt, '#2A2E5A', night), mixCol('#D9A2A0', '#4A4A7A', night * (1 - dawn * .0))].map(c => mixCol(c, ['#F2C0A0', '#F6D6A8', '#FBE7C0'][0], 0)), 'bsky', -600, W + 600, -700, 760);
    if (dawn > 0) { boilSeed('dawnS'); glow(1500, 700, 600 * dawn, '#FFC888', dawn); }
    if (inO) {   // moons arcing over, fast: seventy years
      const n = years * 10, k = frac(n);
      if (years > 0 && years < 1) { boilSeed('moonlapse'); const a = Math.PI * (1 - k), mx = 960 + Math.cos(a) * 900, my = 620 - Math.sin(a) * 480; glow(mx, my, 90, '#CFD8FF', .5); paint(ellPts(mx, my, 34, 34, 16), { wash: '#F2EEDC', ink: null }); }
      starField(t, 30, 31, -300, -200, W + 600, 500, (1 - dawn) * .9);
    } else starField(t, 30, 31, -300, -200, W + 600, 500, night * .9);
    ziggurat(1450, 690, 520, inO ? ease(seg(t, L(6) + .8, L(7) - .6)) : 0, t);
    ridge(-600, W + 600, 700, 16, 81, mixCol('#5A5480', '#2E2E50', night), { ink: null, texCol: '#443E6A' });
    boilSeed('river');
    paint(rectPts(-600, 700, W + 1200, 120), { wash: mixCol(MT.river, '#1E2A4A', night), ink: null });
    for (let i = 0; i < 8; i++) { const x = -400 + ((i * 330 + t * 30) % 2600); inkLine([[x, 720 + i * 11], [x + 160, 720 + i * 11]], .6, '#8AA4C8', 'inkfine', 0); }
    ridge(-600, W + 600, 830, 10, 83, mixCol('#6A6A4A', '#2A2A3A', night), { texCol: '#4A4A34' });
    const bare = inO ? tri(years * 5) : 0;
    willow(360, 840, 520, t, 1, bare); willow(1640, 840, 460, t, 2, bare);
    harp(300, 560, 90); harp(440, 590, 80); harp(1600, 580, 86);
    // the caravan home (from L7), walking right along the far bank, Zerubbabel's banner at its head
    if (t > L(7)) for (let i = 0; i < 7; i++) {
      const x = -300 + (t - L(7)) * 110 - i * 170;
      figure(x, 800, 150 + 20 * hs(i, 4), { key: 'z' + i, col: mixCol('#3A3050', '#6A4A4A', dawn), walk: x / 70, carry: i === 0 ? 'banner' : i % 3 === 2 ? 'staff' : null, arm: i === 0 ? 1 : .5, bannerCol: '#3F6FA8' });
    }
    // the cup: an arm reaches in from the left with it; Clawd drinks; dizzy; slumps; the flame shrinks to a spark
    if (t > L(4) && t < tDrink + 1.4) {
      const k = ease(seg(t, L(4) + .4, L(4) + 1.6)) * (1 - ease(seg(t, tDrink + .6, tDrink + 1.4)));
      boilSeed('cuparm');
      const hx = lerp(-100, 790, k), hy = 690;
      paint(ribbon([[-200, 720], [hx - 120, hy + 20], [hx, hy]], 60, 40), { wash: '#2A2440', ink: PAL.ink, sw: .8 });
      paint(through([[hx - 20, hy - 60], [hx + 30, hy - 60], [hx + 18, hy - 20], [hx + 6, hy - 10], [hx + 6, hy + 10], [hx + 20, hy + 16], [hx - 10, hy + 16], [hx + 4, hy + 10], [hx + 4, hy - 10], [hx - 8, hy - 20]], 2), { wash: '#8A6A3A', ink: PAL.ink, sw: .7 });
      paint(ellPts(hx + 5, hy - 56, 24, 6, 10), { wash: '#3A0E1E', ink: null });
    }
    const wake = ease(seg(t, 186.6, 187.4));
    const mood = inO ? emotions(t, [[L(6), 'sleepy'], [186.7, 'surprised', { lookX: -.6 }], [187.5, 'hopeful', { lookX: .8 }], [190.9, 'determined']])
      : emotions(t, [[L(4), 'sad'], [tDrink + .2, 'dizzy'], [tSlump + .6, 'ko']]);
    const x = t < 190.9 ? 900 : lerp(900, 1500, ease(seg(t, 190.9, 195.4)));
    let pose = { ...mood, view: 'q', hat: 'kippah' };
    if (inO && t < 186.7) pose = { ...pose, sq: .26, rot: .12, aL: -.9, aR: -.9 };
    if (t > 190.7) pose = walkPose(mood, { flip: false, walk: (x - 900) / (4 * U), dy: 0 }, U);
    const lampLit = inO ? .18 + .82 * wake : 1 - .8 * ease(seg(t, tSlump, tSlump + 2.5));
    if (t < 190.7) { clawd(x, 860, U, pose); oilLamp(x + 150, 860, 100, t, { key: 'ground', lit: lampLit, size: .7 + .6 * spring(t, 187.0, 3, 10) * wake }); }
    else clawd(x, 860, U, carryLamp({ ...pose, hat: 'kippah' }));
    if (inO && t > 186.2 && t < 188.4) {   // a hand from the caravan, reaching down to wake Clawd
      boilSeed('wakehand'); const k = ease(seg(t, 186.2, 186.8)) * (1 - ease(seg(t, 187.8, 188.4)));
      figure(lerp(1300, 1130, k), 860, 230, { key: 'helper', col: '#4A3A50', lean: .3 * k, arm: -.2 - .6 * k, headTilt: .4 * k });
    }
    camEnd();
    if (lt < .6) flash(1 - ease(lt / .6), '#7A6A9A');
    if (t > tHit - .3) whipStreaks(seg(t, tHit - .3, tHit), 1);
  }

  shots([[V2, shotSanctuary], [L(2), shotExile], [L(4), shotRivers]]);
})();
