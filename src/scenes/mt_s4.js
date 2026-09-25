// mt_s4.js: STANZA 4, "K'rot komat brosh" (226.5–276.1 s). Haman's axe against the tall cypress; his own snare catches
// him and his hat falls; Mordechai raised on the king's horse; the gragger scribbles out Haman's name; the tree of the
// eleven hats; Purim in masks and lanterns, and the lanterns rise to become stars. (Shots S–V.)
(() => {
  const V3 = lineT(3, 0), U = 22, L = k => lineT(3, k), tEnd = lineT(4, 0);
  const HAMAN = '#221A34', SASH = '#9A2A3A';

  function moonHill(t, key = 'mh') {
    skyWash(['#161C40', '#26306A', '#3E4C8A'], key + 'sky', -900, W + 900, -700, 800);
    starField(t, 44, 51, -300, -250, W + 600, 520, .9);
    boilSeed(key + 'moon'); glow(1500, 200, 220, '#DCE2FF', .5); paint(ellPts(1500, 200, 70, 70, 24), { wash: '#F4F0DE', ink: PAL.ink, sw: .6 });
    ridge(-900, W + 900, 760, 60, 101, '#2E365E', { ink: null, texCol: '#232A4E' });
    ridge(-900, W + 900, 880, 30, 103, '#3E4A5A', { texCol: '#2E3848', ink: '#1E2436' });
  }
  function haman(x, y, h, o = {}) {
    figure(x, y, h, { key: 'haman', hat: 'tricorn', col: HAMAN, ...o });
    boilSeed('sash'); paint(ribbon([[x - h * .12, y - h * .7], [x + h * .03, y - h * .5], [x + h * .15, y - h * .3]], h * .05, h * .04), { wash: SASH, ink: null });
  }

  // S: the axe against the cypress; Clawd behind the trunk
  const CY = [980, 880], chops = [0, 1, 2, 3, 4, 5].map(i => bt(VERSE[3] + 2 + i * 2));
  function shotAxe(t, lt, dur) {
    const hit = chops.reduce((s, c) => s + (t > c ? Math.exp(-(t - c) * 5) * Math.sin((t - c) * 25) : 0), 0);
    const shake = shakeXY(t, 4 * Math.max(0, ...chops.map(c => t > c ? Math.exp(-(t - c) * 8) : 0)));
    camBegin(960 + shake[0], 560 + shake[1], 1.12);
    moonHill(t);
    cypress(...CY, 700, t, 3, '#2E4A3A', hit * 14);
    for (const c of chops) if (t > c && t < c + .8) { boilSeed('chip' + c); const k = seg(t, c, c + .8); for (let i = 0; i < 4; i++) paint(rectPts(CY[0] - 60 - 160 * k * hs(i, c), CY[1] - 80 - 200 * k + 400 * k * k, 14, 8, 1), { wash: '#C9A070', ink: null }); }
    // Haman: the axe raised, then down on each beat pair
    const ph = frac((bpOf(t) - bpOf(chops[0])) / 2 + .15), strike = t < chops[0] - .9 ? 0 : ph < .7 ? ease(ph / .7) : 1 - easeIn((ph - .7) / .3);
    haman(700, 890, 400, { arm: lerp(-.2, 2.3, strike), carry: 'axe', lean: -.12 * strike + .08 });
    const mood = emotions(t, [[V3, 'scared', { lookX: -.8 }], [L(1) + .3, 'nervous', { lookX: -1 }]]);
    const peek = Math.max(0, Math.sin((t - V3) * 1.3)) * .6;
    clawd(1130, 885, U, { ...mood, view: 'q', flip: true, sq: (mood.sq || 0) + .14, dx: -peek * .5, hat: 'kippah' });
    camEnd();
    fadeFrom(ease(seg(lt, 0, .8)), '#1E1830');
  }

  // T: the snare springs; the hat flies off and falls; Haman dangles, deflated; Clawd surprised, then laughing
  const tSnare = bt(beatAt(237.5)), tHat = tSnare + .15;
  function shotSnare(t, lt, dur) {
    camBegin(990, 560, 1.12 + .02 * Math.sin(lt * .5));
    moonHill(t);
    cypress(...CY, 700, t, 3, '#2E4A3A');
    boilSeed('branch'); inkLine([[CY[0], 360], [CY[0] - 200, 330], [CY[0] - 330, 350]], 3.5, '#3A2A20', 'ink', .5);
    const walk = seg(t, L(2), tSnare), up = easeOut(seg(t, tSnare, tSnare + .5)), deflate = ease(seg(t, L(3), L(3) + 1.5));
    const hx = lerp(560, 740, walk), hy = lerp(890, 700, up) + 30 * Math.sin((t - tSnare) * 3) * up;
    if (t < tSnare) {
      haman(hx, 890, 400, { walk: hx / 90, arm: .8, carry: 'axe', lean: -.05 });
      boilSeed('net'); for (let i = 0; i < 5; i++) inkLine([[700 + i * 30, 895], [715 + i * 30, 888]], .6, '#8A7A5A', 'inkfine', 0);
    } else {
      push(); translate(hx, hy); rotate(.15 * Math.sin((t - tSnare) * 2.5) * (1 - deflate * .5)); translate(-hx, -hy);
      haman(hx, hy, 400 * (1 - .25 * deflate), { hat: 'none', arm: 2.4 - 2 * deflate, headTilt: .4 * deflate, lean: .1 });
      boilSeed('netwrap');
      for (let i = 0; i < 7; i++) inkLine([[hx - 140, hy - 20 - i * 55], [hx, hy - i * 55 - 40], [hx + 140, hy - 20 - i * 55]], 1, '#A89A70', 'ink', .5);
      for (let i = 0; i < 6; i++) inkLine([[hx - 120 + i * 48, hy], [hx - 70 + i * 28, hy - 400]], 1, '#A89A70', 'ink', .2);
      pop();
      inkLine([[hx, hy - 400], [CY[0] - 250, 340]], 1.2, '#A89A70', 'ink', 0);
    }
    // the hat: off on the spring, spinning, landing at Clawd's feet
    if (t > tHat) {
      const k = seg(t, tHat, tHat + 1.4), p = arcPt([hx, 890 - 400 * .95], [1180, 875], 360, easeOut(k));
      boilSeed('hatfly'); push(); translate(...p); rotate(k < 1 ? k * 9 : 0);
      paint([[-70, 0], [0, -64], [70, 0], [0, -14]], { wash: HAMAN, ink: PAL.ink, sw: .8 }); pop();
      if (k >= 1 && t < tHat + 1.8) { boilSeed('hatdust'); paint(ellPts(1180, 880, 80, 16, 12), { wash: '#6A6A7A', washOp: 150 * (1 - seg(t, tHat + 1.4, tHat + 1.8)), ink: null }); }
    }
    const mood = emotions(t, [[L(2), 'nervous', { lookX: -1 }], [tSnare + .05, 'surprised', { lookX: -.8, lookY: -.6 }], [tHat + 1.5, 'confused', { lookX: .3, lookY: .6 }], [L(3) + 1.2, 'laugh']]);
    clawd(1330, 885, U, { ...mood, view: 'q', flip: true, hat: 'kippah' });
    camEnd();
    if (lt < .25) whipStreaks(1 - lt / .25, 1);
  }

  // U: Mordechai raised on the king's horse; the crowd; Clawd's gragger scribbles Haman's name off the wall
  function horse(x, y, s, t, o = {}) {
    boilSeed('horse');
    const col = o.col || '#EDE6DA', rear = o.rear || 0, step = t * 4;
    push(); translate(x, y); rotate(-.15 * rear);
    for (let i = 0; i < 4; i++) { const lx = -s * .35 + i * s * .22, a = .25 * Math.sin(step + i * 1.7); paint(ribbon([[lx, -s * .55], [lx + Math.sin(a) * s * .15, -s * .28], [lx + Math.sin(a) * s * .3, 0]], s * .07, s * .05), { wash: i % 2 ? mixCol(col, '#8A8290', .3) : col, ink: PAL.ink, sw: .8 }); }
    paint(ellPts(0, -s * .62, s * .5, s * .22, 20), { wash: col, ink: PAL.ink, sw: 1 });
    paint(ribbon([[s * .36, -s * .7], [s * .5, -s * .88], [s * .58, -s * .96]], s * .2, s * .14), { wash: col, ink: PAL.ink, sw: 1 });
    paint(through([[s * .5, -s * 1.02], [s * .64, -s * 1.02], [s * .8, -s * .86], [s * .76, -s * .8], [s * .58, -s * .84], [s * .5, -s * 1.02]], 3), { wash: col, ink: PAL.ink, sw: 1 });   // head
    paint([[s * .54, -s * 1.0], [s * .56, -s * 1.09], [s * .6, -s * 1.0]], { wash: col, ink: PAL.ink, sw: .7 });   // ear
    paint(ellPts(s * .64, -s * .95, s * .015, s * .015, 8), { wash: PAL.ink, ink: null });
    paint(ribbon([[s * .52, -s * 1.0], [s * .4, -s * .9], [s * .3, -s * .74]], s * .07, s * .03), { wash: '#6A5A6A', ink: null });   // mane
    paint(ribbon([[-s * .48, -s * .7], [-s * .62, -s * .5], [-s * .6, -s * .3]], s * .08, s * .03), { wash: '#6A5A6A', ink: null });   // tail
    paint(rrPts(-s * .3, -s * .9, s * .5, s * .3, s * .06), { wash: '#6A3A8A', ink: PAL.ink, sw: .7 });   // royal saddle cloth
    for (let i = 0; i < 4; i++) paint(ellPts(-s * .25 + i * s * .13, -s * .62, s * .03, s * .03, 8), { wash: MT.gold, ink: null });
    pop();
  }
  const tScrib = [0, 1, 2, 3, 4, 5, 6].map(i => bt(VERSE[3] + 40 + i + 1));
  function shotProcession(t, lt, dur) {
    const tilt = ease(seg(t, L(4) + .5, L(4) + 3)), back = ease(seg(t, L(5) - .2, L(5) + .6));
    camBegin(lerp(900, 1100, back), lerp(560, 420, tilt * (1 - back)) + 140 * back * 0, lerp(1.1, 1.05, back));
    skyWash(['#2A2E6A', '#6A4A7A', '#C98A6A'], 'procsky', -900, W + 900, -700, 800);
    boilSeed('pwall2');
    paint(rectPts(-900, 380, W + 1800, 480), { wash: '#8A6A5A', fill: '#6A4A3E', fillOp: 70, tex: .7, ink: null });
    // Haman's portrait on the wall, painted large; the gragger scribbles cover it, one per beat
    boilSeed('portrait');
    paint(rectPts(1290, 360, 420, 470, 2), { wash: '#C9A87A', ink: PAL.ink, sw: 1.4 });
    paint(rectPts(1315, 385, 370, 420, 2), { wash: '#E0CFA8', ink: '#6A4A2E', sw: .8 });
    push(); translate(1500, 800); figure(0, 0, 380, { key: 'portrait', hat: 'tricorn', col: '#3A2438', ink: PAL.ink }); pop();
    tScrib.forEach((ts, i) => {
      if (t < ts) return; const k = ease(seg(t, ts, ts + .25)); boilSeed('scr' + i);
      const P = []; for (let j = 0; j < 9; j++) P.push([1500 - 150 + 300 * hs(j, i * 3) , 820 - 440 * hs(j + 5, i * 3 + 1)]);
      inkLine(P.slice(0, Math.max(2, Math.round(9 * k))), 6, PAL.ink, 'dry', .6);
    });
    for (let i = 0; i < 6; i++) lantern2(80 + i * 330, 420, 22, t, 'pl' + i);
    boilSeed('street'); paint(rectPts(-900, 860, W + 1800, 500), { wash: '#6A5A5A', ink: null });
    // the crowd cheering, arms up on the beats
    for (let i = 0; i < 10; i++) figure(-100 + i * 200 + 50 * hs(i, 3), 900 + 20 * hs(i, 4), 170 + 30 * hs(i, 5), { key: 'cr' + i, col: ['#3A2E4A', '#4A2E3A', '#2E3A4A'][i % 3], arm: 1.6 + .8 * pulse(t + hs(i, 6) * .2, 4), carry: i % 4 === 1 ? 'torch' : null, headTilt: -.2 });
    // Mordechai on the horse, riding right, raised high
    const mx = lerp(200, 1100, seg(t, L(4), L(5) + 3));
    horse(mx, 880, 420, t, { rear: .3 * spring(t, L(4) + 1, 2, 5) });
    figure(mx - 20, 880 - 420 * .8, 240, { key: 'mord', hat: 'crown', col: '#5A2A7A', arm: 1.5 + .2 * Math.sin(t * 2), headTilt: -.15 });
    // Clawd: cheering, then whirling the gragger
    const mood = emotions(t, [[L(4), 'excited'], [L(5), 'playful']]);
    const spin = t * 22, grag = (u, sw) => { push(); rotate(mood.aR ?? 1); inkLine([[0, 0], [u * 1.6, 0]], sw * 1.5, MT.wood, 'ink', 0); translate(u * 1.6, 0); rotate(spin); paint(rectPts(0, -u * .35, u * 1.5, u * .7, 1), { wash: '#E4573D', ink: PAL.ink, sw: sw * .7 }); pop(); };
    clawd(1150, 900, U + 4, { ...mood, view: 'q', flip: true, hat: 'kippah', aR: t > L(5) ? 1.3 : mood.aR, armR: t > L(5) ? grag : null });
    camEnd();
    boilSeed('wipe');
    if (lt < .3) brushWipe(.5 + lt / .6, ['#6A3A8A', MT.lantern]);
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#6A3A8A', MT.lantern]);
  }
  function lantern2(x, y, s, t, key) {
    boilSeed(key); glow(x, y, s * 5, '#FF8A4A', .8);
    paint(ellPts(x, y, s * .6, s * .8, 12), { wash: MT.lantern, ink: PAL.ink, sw: .6 });
  }

  // V: the tree of the eleven hats; Purim: masks, lanterns, dancing; the lanterns rise and become stars
  const tRelease = L(9) + 1.2, tStars = L(9) + 4.6;
  function bigTree(x, y, s, t) {
    boilSeed('bigtree');
    paint(ribbon([[x, y], [x - s * .03, y - s * .35], [x + s * .02, y - s * .6]], s * .12, s * .07), { wash: '#3A2A26', ink: PAL.ink, sw: 1 });
    const br = [];
    for (let i = 0; i < 6; i++) {
      const a = -Math.PI / 2 + (i - 2.5) * .45, L_ = s * (.4 + .12 * hs(i, 2)), ex = x + Math.cos(a) * L_, ey = y - s * .55 + Math.sin(a) * L_ * .6;
      inkLine([[x, y - s * .5], [lerp(x, ex, .5), lerp(y - s * .55, ey, .5) - 20], [ex, ey]], 2.5 - .2 * i, '#3A2A26', 'ink', .5);
      br.push([ex, ey], [lerp(x, ex, .6), lerp(y - s * .55, ey, .6) - 14]);
      paint(ellPts(ex, ey - 30, s * .14, s * .09, 14, 3), { wash: '#2A3A34', washOp: 230, ink: null });
    }
    return br;
  }
  function shotTree(t, lt, dur) {
    const rise = ease(seg(t, tRelease, tEnd)), storm = ease(seg(t, tStars, tEnd));
    camBegin(960, lerp(560, 380, rise), lerp(1.08, .95, rise));
    skyWash([mixCol('#161C40', '#262A38', storm), mixCol('#2A2E62', '#3A3E50', storm), mixCol('#4A4A86', '#5A5A6A', storm)], 'treesky', -900, W + 900, -900, 800);
    starField(t, 30, 61, -300, -450, W + 600, 700, .8 * (1 - storm));
    ridge(-900, W + 900, 780, 30, 111, '#2A3048', { ink: null, texCol: '#20263C' });
    const br = bigTree(700, 870, 820, t);
    // the eleven hats: Haman's and his ten sons', hanging and swaying
    br.slice(0, 11).forEach(([bx, by], i) => {
      const sway = .12 * Math.sin(t * 1.4 + i), len = 110 + 60 * hs(i, 7), s = i === 0 ? 2 : 1.25, hx = bx + Math.sin(sway) * len, hy = by + Math.cos(sway) * len;
      boilSeed('hh' + i); inkLine([[bx, by], [hx, hy]], .6, '#A89A70', 'inkfine', 0);
      paint([[hx - 40 * s, hy + 30 * s], [hx, hy], [hx + 40 * s, hy + 30 * s], [hx, hy + 20 * s]], { wash: HAMAN, ink: PAL.ink, sw: .6 });
    });
    ridge(-900, W + 900, 890, 14, 113, '#3A3A4E', { texCol: '#2A2A3E' });
    // the festival: lantern-bearers dancing in a ring, then letting their lanterns go
    const ls = [];
    for (let i = 0; i < 7; i++) {
      const ph = t * .6 + i / 7 * TAU, fx = 1300 + Math.cos(ph) * 380, fy = 900 + Math.sin(ph) * 30;
      figure(fx, fy, 170 + 20 * hs(i, 3), { key: 'fest' + i, col: ['#5A2E4A', '#2E4A5A', '#5A4A2E'][i % 3], walk: ph * 2, arm: 1.5, hat: i % 2 ? 'turban' : 'hood' });
      ls.push([fx + 20, fy - 170 * 1.05 - 40]);
    }
    const mood = emotions(t, [[L(6), 'surprised', { lookY: -.8, lookX: -.8 }], [L(7), 'happy'], [L(8), 'playful'], [tRelease + .2, 'hopeful', { lookY: -1 }], [tStars + .6, 'starstruck']]);
    const dance = t > L(7) && t < tRelease ? move('mix', t) : {};
    clawd(1100, 900, U + 4, { ...mood, ...dance, dy: (mood.dy || 0) * .3 + (dance.dy || 0), hat: t > L(7) ? 'masq' : 'kippah', aR: t > tRelease - .5 ? 1.4 : (dance.aR ?? mood.aR) });
    ls.push([1100 + 5 * U, 900 - 11 * U]);
    ls.forEach(([lx, ly], i) => {   // the lanterns: held, then floating up and turning into stars
      const k = seg(t, tRelease + i * .12, tStars + .8), y = ly - 1100 * easeIn(k) , x = lx + 60 * Math.sin(t + i) * k;
      if (k < .85) lantern2(x, y, 20 * (1 - .5 * k), t, 'fl' + i);
      else { boilSeed('fs' + i); paint(starPts(x, y, 12, .35, 4), { wash: PAL.cream, ink: null }); glow(x, y, 40, '#DDE4FF', .7); }
    });
    for (let i = 0; i < 5; i++) cloud(-200 + i * 520, 100 - 200 * rise, 700, 260, '#4A4C62', 170 * storm, 'st' + i);
    camEnd();
    boilSeed('wipe');
    if (lt < .3) brushWipe(.5 + lt / .6, ['#6A3A8A', MT.lantern]);
  }

  shotsShifted([[V3, shotAxe], [L(2), shotSnare], [L(4), shotProcession], [L(6), shotTree]], SHIFT[3]);
})();
