// mt_s5.js: STANZA 5, "Yevanim nikbetzu alai" (276.1–322.2 s), the climax. The phalanx gathers; the Maccabees rise;
// the walls are breached and the oil defiled; one sealed jar; the menorah lit; eight days and nights of light; song
// and dancing; the camera pushes into one flame. (Shots W–AA.)
(() => {
  const V4 = lineT(4, 0), U = 22, L = k => lineT(4, k);
  // the song and dancing carry on through the instrumental after the verse, until stanza 6 begins (in authoring time)
  const tOut = sungT(5, 0) + SHIFT[4], tLove = tOut - 6;

  function stormHills(t, flashK = 0) {
    skyWash(['#2A3044', '#46506A', '#6A7488'], 'stormsky', -900, W + 900, -700, 800);
    for (let i = 0; i < 5; i++) cloud(-300 + i * 560 + 40 * Math.sin(t * .2 + i), 120 + 50 * hs(i, 3), 760, 280, i % 2 ? '#3A4058' : '#555C74', 200, 'sc' + i);
    if (flashK > 0) flash(flashK * .55, '#E8ECFF');
    ridge(-900, W + 900, 720, 70, 121, '#3E4A48', { ink: null, texCol: '#2E3A38' });
  }
  const bolts = [bt(VERSE[4] + 3), bt(VERSE[4] + 13)];
  function bolt(t, t0, x) {
    if (t < t0 || t > t0 + .35) return 0;
    boilSeed('bolt' + t0);
    const P = [[x, -100]]; for (let i = 1; i < 7; i++) P.push([x + 80 * (hs(i, t0) - .5), -100 + i * 110]);
    inkLine(P, 3, '#F4F6FF', 'ink', 0); glow(x, 200, 400, '#C8D2FF', 1 - seg(t, t0, t0 + .35));
    return 1 - seg(t, t0, t0 + .35);
  }

  // W: the phalanx from the left; the Maccabees rise on the rocks at the right; Clawd raises the hammer on the beat
  function shotPhalanx(t, lt, dur) {
    const fl = Math.max(bolt(t, bolts[0], 1500) * 0, 0), f1 = t > bolts[0] && t < bolts[0] + .35 ? 1 - seg(t, bolts[0], bolts[0] + .35) : 0, f2 = t > bolts[1] && t < bolts[1] + .35 ? 1 - seg(t, bolts[1], bolts[1] + .35) : 0;
    const shake = shakeXY(t, 3 * pulse(t, 6));
    camBegin(960 + shake[0], 560 + shake[1], 1.08 + .03 * seg(lt, 0, dur));
    stormHills(t, Math.max(f1, f2));
    bolt(t, bolts[0], 400); bolt(t, bolts[1], 1450);
    boilSeed('rocks'); paint(through([[1180, 900], [1250, 720], [1420, 640], [1650, 660], [1900, 760], [2100, 900]], 3).concat([[2100, 1200], [1180, 1200]]), { wash: '#6A6258', fill: '#4A443E', fillOp: 80, tex: .8, ink: PAL.ink, sw: 1 });
    ridge(-900, W + 900, 900, 10, 123, '#4E5646', { texCol: '#3A4236' });
    // the phalanx: three ranks, stepping on every beat
    const adv = seg(t, V4, L(2));
    for (let r = 0; r < 3; r++) for (let i = 0; i < 7; i++) {
      const x = -700 + i * 125 + r * 45 + 700 * easeOut(adv), step = bpOf(t) / 2 + r * .1;
      figure(x, 860 + r * 30, 200 - r * 12, { key: 'h' + r + '_' + i, hat: 'helmet', col: ['#3A2E3A', '#2E2A3A', '#26222E'][r], carry: 'hoplite', walk: step, arm: .6 });
    }
    // the Maccabees: rising up behind Clawd on the rocks
    const rise = ease(seg(t, L(1), L(1) + 1.6));
    for (let i = 0; i < 4; i++) figure(1500 + i * 120, lerp(900, 650 + 25 * i, rise), 200, { key: 'mac' + i, col: '#2E3A2E', carry: i % 2 ? 'hammer' : 'staff', arm: 1.6 + .5 * pulse(t, 4), hat: 'band' });
    const mood = emotions(t, [[V4, 'scared', { lookX: -1 }], [L(1) - .1, 'determined', { lookX: -.6 }]]);
    const hammer = (u, sw) => { push(); rotate(-1.2); inkLine([[0, 0], [u * 2.4, 0]], sw * 1.6, MT.wood, 'ink', 0); paint(rectPts(u * 2.1, -u * .7, u * .9, u * 1.4), { wash: MT.slate, ink: PAL.ink, sw: sw * .7 }); pop(); };
    const hit = t > L(1) ? pulse(t, 5) : 0;
    clawd(1330, 690, U + 4, { ...mood, view: 'q', flip: true, hat: 'kippah', aR: t > L(1) ? 1.3 + .3 * hit : mood.aR, armR: t > L(1) ? hammer : null, sq: (mood.sq || 0) + .1 * hit });
    camEnd();
    if (lt < .6) flash(1 - ease(lt / .6), '#262A38');
  }

  // X: the walls breached (cracks on the beats, stones falling); the oil jars topple, black oil spills; fury, grief
  function amphora(x, y, s, col, key, rot = 0) {
    boilSeed(key); push(); translate(x, y); rotate(rot);
    paint(through([[-s * .12, -s], [-s * .1, -s * .85], [-s * .32, -s * .6], [-s * .3, -s * .2], [0, 0], [s * .3, -s * .2], [s * .32, -s * .6], [s * .1, -s * .85], [s * .12, -s]], 3), { wash: col, fill: mixCol(col, PAL.ink, .3), fillOp: 60, tex: .5, ink: PAL.ink, sw: .8 });
    for (const d of [-1, 1]) inkLine([[d * s * .1, -s * .88], [d * s * .3, -s * .8], [d * s * .28, -s * .6]], .8, PAL.ink, 'ink', .6);
    pop();
  }
  const cracks = [0, 1, 2, 3, 4, 5, 6, 7].map(i => bt(VERSE[4] + 16 + i));
  function shotBreach(t, lt, dur) {
    const inside = t > L(3) - .15;
    const shake = shakeXY(t, 6 * Math.max(0, ...cracks.map(c => t > c ? Math.exp(-(t - c) * 7) : 0)));
    if (!inside) {
      camBegin(960 + shake[0], 560 + shake[1], 1.1);
      stormHills(t);
      boilSeed('towers');
      for (let i = 0; i < 3; i++) {
        const x = 420 + i * 540, fallK = i === 1 ? ease(seg(t, cracks[6], cracks[6] + 1.2)) : 0;
        push(); translate(x, 900); rotate(fallK * .3); translate(-x, -900);
        paint(rectPts(x - 150, 380 + 60 * fallK * fallK * 5, 300, 520), { wash: '#B7A68A', fill: '#8A7A64', fillOp: 70, tex: .7, ink: PAL.ink, sw: 1 });
        for (let k = 0; k < 4; k++) paint(rectPts(x - 150 + k * 80, 340, 50, 44), { wash: '#B7A68A', ink: PAL.ink, sw: .8 });
        pop();
      }
      cityWall(-600, W + 600, 900, 160, '#A8977A', 'breachwall');
      cracks.forEach((c, i) => {
        if (t < c) return; boilSeed('crack' + i);
        const x = 300 + (i * 237) % 1400, P = [[x, 560 + 30 * hs(i, 2)]];
        for (let k = 1; k < 5; k++) P.push([x + 60 * (hs(k, i) - .5) * k, 560 + k * 80]);
        inkLine(P.slice(0, 1 + Math.ceil(4 * seg(t, c, c + .2))), 2.2, PAL.ink, 'ink', .2);
        const k = seg(t, c, c + 1.2); if (k < 1) for (let j = 0; j < 4; j++) { const p = arcPt([x, 620], [x + (j - 1.5) * 120, 1000], 120, k); paint(rectPts(p[0] - 18, p[1] - 12, 36, 24, 2), { wash: '#A8977A', ink: PAL.ink, sw: .6 }); }
      });
      const mood = emotions(t, [[L(2), 'determined'], [cracks[3], 'scared']]);
      clawd(1500, 1000, U, { ...mood, view: 'q', flip: true, hat: 'kippah' });
      camEnd();
      boilSeed('wipe');
      if (lt < .3) brushWipe(.5 + lt / .6, ['#3A4058', '#6A7488']);
    } else {
      camBegin(960 + shake[0], 560 + shake[1], 1.1);
      boilSeed('store');
      paint(rectPts(-600, -600, W + 1200, H + 1200), { wash: '#5A4A3E', fill: '#3A2E26', fillOp: 90, tex: .8, ink: null });
      paint(rectPts(-600, 820, W + 1200, 600), { wash: '#6A5A48', ink: null });
      inkLine([[-600, 822], [W + 600, 820]], 1, PAL.ink, 'ink', .3);
      // the jars, falling like dominoes (on the beats), each spilling black
      for (let i = 0; i < 8; i++) {
        const tf = bt(VERSE[4] + 25 + i * .5), k = easeIn(seg(t, tf, tf + .3)), x = 200 + i * 150;
        amphora(x + 60 * k, 820, 150, '#C28A5A', 'amph' + i, k * 1.45);
        if (t > tf + .25) { boilSeed('spill' + i); const sp = ease(seg(t, tf + .25, tf + 1.6)); paint(ellPts(x + 200, 835, 30 + 90 * sp, 8 + 14 * sp, 16, 2), { wash: '#1A1418', ink: null }); }
      }
      const mood = emotions(t, [[L(3) - .15, 'surprised'], [L(3) + 1.6, 'furious'], [L(3) + 3.3, 'cry']]);
      clawd(1600, 840, U + 6, { ...mood, view: 'q', flip: true, hat: 'kippah' });
      camEnd();
      if (t < L(3) + .2) flash(1 - seg(t, L(3) - .15, L(3) + .2), '#1A1418');
    }
  }

  // Y: the one sealed jar; lifted; poured; the menorah lit; roses open around its foot
  const MEN = [760, 880], tFind = L(4) + 1.4, tLift = L(4) + 2.8, tLight = bt(beatAt(L(5) + 1.2));
  function rose(x, y, r, k, key) {
    if (k <= 0) return;
    boilSeed(key);
    inkLine([[x, y + r * 3], [x + r * .3, y + r * 1.5], [x, y]], .9, '#3A5A2E', 'ink', .5);
    paint(ellPts(x + r * .6, y + r * 1.8, r * .5, r * .25, 10, 0, -.5), { wash: '#4E7A3E', ink: PAL.ink, sw: .4 });
    const rr = r * backOut(k);
    paint(ellPts(x, y, rr, rr * .85, 14), { wash: '#C8324A', ink: PAL.ink, sw: .6 });
    inkLine([[x - rr * .4, y], [x, y - rr * .4], [x + rr * .4, y], [x, y + rr * .3], [x - rr * .15, y]], .6, '#7A1A2A', 'inkfine', .6);
  }
  function templeInside(t, warm) {
    boilSeed('tin');
    paint(rectPts(-600, -600, W + 1200, H + 1200), { wash: mixCol('#3A3040', '#6A4A30', warm), fill: '#2A2230', fillOp: 90, tex: .8, ink: null });
    for (let i = 0; i < 6; i++) { boilSeed('tp' + i); paint(rectPts(-100 + i * 380, 120, 60, 700), { wash: mixCol('#6A5A60', '#A8804A', warm), ink: PAL.ink, sw: .8 }); }
    boilSeed('tfloor'); paint(rectPts(-600, 880, W + 1200, 600), { wash: mixCol('#4A4048', '#7A5A3A', warm), ink: null });
    inkLine([[-600, 882], [W + 600, 880]], 1, PAL.ink, 'ink', .3);
    for (let i = 0; i < 7; i++) { boilSeed('shard' + i); paint([[1100 + i * 90, 900], [1130 + i * 90, 870 - 20 * hs(i, 2)], [1170 + i * 90, 905]], { wash: '#8A6A4A', ink: PAL.ink, sw: .5 }); }
  }
  function shotJar(t, lt, dur) {
    const lit = [0, 1, 2, 3, 4, 5, 6].map(i => ease(seg(t, tLight + i * .08, tLight + i * .08 + .3)));
    const warm = ease(seg(t, tLight, tLight + 1));
    camBegin(lerp(1150, 960, ease(seg(t, tLift, tLight))), 560, lerp(1.3, 1.1, ease(seg(t, tLift, tLight))));
    templeInside(t, warm);
    const lamps = menorah7(...MEN, 560, t, lit, { key: 'miracle', glow: 1.3 });
    if (t > tLight) { glow(MEN[0], MEN[1] - 460, 700 * warm, '#FFD27A', .9 * warm + .5 * spring(t, tLight, 3, 8)); }
    for (let i = 0; i < 9; i++) rose(MEN[0] - 320 + i * 80, 850 - 20 * Math.sin(i), 16, ease(seg(t, tLight + .6 + i * .12, tLight + 1.2 + i * .12)), 'rose' + i);
    // the jar: glowing among the shards; lifted overhead; tipped over the menorah
    const mood = emotions(t, [[L(4), 'sad', { lookY: .6 }], [tFind, 'surprised', { lookX: .6, lookY: .6 }], [tLift, 'starstruck'], [tLight - 1.2, 'determined'], [tLight + .3, 'starstruck']]);
    const walk = seg(t, tLift + .8, tLight - .9), x = lerp(1450, 1010, ease(walk));
    const up = backOut(seg(t, tLift, tLift + .5)) * (1 - ease(seg(t, tLight - .9, tLight - .5)));
    const pose = t > tLift + .8 && t < tLight - .9 ? walkPose(mood, { flip: true, walk: (1450 - x) / (4 * U), dy: 0 }, U) : { ...mood, view: 'q', flip: true, aL: lerp(mood.aL ?? .2, 1.45, up), aR: lerp(mood.aR ?? .2, 1.45, up) };
    clawd(x, 890, U + 4, { ...pose, hat: 'kippah' });
    const jy = t < tLift ? 880 : 890 - (9.6 * (U + 4)) * up - 60 * (1 - up), jx = t < tLift ? 1300 : x - 20 * (1 - up);
    const tip = ease(seg(t, tLight - 1.0, tLight - .3)) * (1 - ease(seg(t, tLight + .6, tLight + 1.2)));
    if (t < tLight + 1.4) {
      boilSeed('jar');
      if (t < tLift + .3) glow(jx, jy - 40, 160, '#FFD27A', .7 + .3 * Math.sin(t * 5));
      push(); translate(t > tLight - 1.2 ? lamps[6][0] + 70 : jx, t > tLight - 1.2 ? lamps[6][1] - 70 : jy); rotate(-tip * 1.9);
      paint(through([[-22, 0], [-26, -40], [-12, -58], [-10, -74], [10, -74], [12, -58], [26, -40], [22, 0]], 2), { wash: '#D8B07A', ink: PAL.ink, sw: .8 });
      paint(ellPts(0, -40, 10, 10, 10), { wash: MT.gold, ink: PAL.ink, sw: .5 });   // the High Priest's seal
      pop();
      if (tip > .5) { boilSeed('pour'); inkLine([[lamps[6][0] + 20, lamps[6][1] - 90], [lamps[6][0] + 4, lamps[6][1] - 10]], 2, '#E8C060', 'ink', .3); }
    }
    camEnd();
    if (lt < .4) flash(1 - lt / .4, '#1A1418');
  }

  // Z: eight days: the sun and moon swing over, one day per two beats; a star for each; the flames never dim
  const tDays = L(6), dayLen = 2 * BEAT;
  function shotDays(t, lt, dur) {
    const d = (t - tDays) / dayLen, ph = frac(d), days = Math.min(8, Math.floor(d) + (ph > .5 ? 1 : 0));
    const dayK = t < tDays ? 0 : .5 - .5 * Math.cos(ph * TAU);
    camBegin(960, 520, 1.02);
    skyWash([mixCol('#1A1E3E', '#7FA8D8', dayK), mixCol('#2A2E5A', '#B8D0E4', dayK), mixCol('#4A4A7A', '#F2DDB0', dayK)], 'dsky', -900, W + 900, -700, 900);
    if (t > tDays && d < 8) {
      boilSeed('sunmoon');
      const a = Math.PI * frac(ph * 2), sx = 960 - Math.cos(a) * 1000, sy = 760 - Math.sin(a) * 560;
      if (ph < .5) { glow(sx, sy, 260, '#FFE2A0', .8); paint(ellPts(sx, sy, 60, 60, 20), { wash: '#FFF1C8', ink: null }); }
      else { glow(sx, sy, 120, '#D8DEFF', .5); paint(ellPts(sx, sy, 44, 44, 20), { wash: '#F2EEDC', ink: null }); }
    }
    for (let i = 0; i < days; i++) { boilSeed('day' + i); const x = 960 + (i - 3.5) * 150, y = 150, k = backOut(seg(t, tDays + (i + .5) * dayLen, tDays + (i + .5) * dayLen + .3)); glow(x, y, 50 * k, '#FFE2A0', .8); paint(starPts(x, y, 26 * k, .4, 8), { wash: '#FFE9A8', ink: PAL.ink, sw: .5 }); }
    temple(960, 1010, 1100, t, { glow: 1, col: mixCol('#8A7A90', MT.stone, dayK) });
    menorah7(960, 880, 360, t, [1, 1, 1, 1, 1, 1, 1], { key: 'days', glow: 1.2 });
    for (let i = 0; i < 9; i++) rose(960 - 200 + i * 50, 870, 11, 1, 'rz' + i);
    const mood = emotions(t, [[tDays, 'starstruck'], [tDays + 3 * dayLen, 'excited']]);
    clawd(1380, 930, U + 2, { ...mood, view: 'q', flip: true, hat: 'kippah', ...(t > tDays + 3 * dayLen ? { ...move('hop', t), eyes: mood.eyes, mouth: mood.mouth } : {}) });
    camEnd();
    if (lt < .35) flash(1 - lt / .35, '#FFE2A0');
  }

  // AA: song and jubilation: a ring of dancers around the lit menorah; Clawd dances, then just watches, in love;
  // the camera pushes into one flame (the match cut to the eighth night's shamash)
  function shotSong(t, lt, dur) {
    const push_ = easeIn(seg(t, tOut - 3.4, tOut));
    const f = [960 - 360 * .13 * 3, 880 - 360 * .82 - 18];   // the leftmost lamp's flame
    camBegin(lerp(960, f[0], ease(seg(t, tOut - 3.4, tOut - 1.5))), lerp(560, f[1], ease(seg(t, tOut - 3.4, tOut - 1.5))), lerp(1.05, 16, push_ * push_));
    templeInside(t, 1);
    glow(960, 600, 800, '#FFB86A', .6);
    const ring = [];
    for (let i = 0; i < 8; i++) {
      const ph = t * .45 + i / 8 * TAU, x = 960 + Math.cos(ph) * 560, y = 900 + Math.sin(ph) * 40, back = Math.sin(ph) < 0;
      ring.push([back, () => figure(x, y, 200 + 30 * Math.sin(ph), { key: 'rd' + i, col: ['#5A3A2A', '#3A2A4A', '#2A3A3A', '#4A2A2A'][i % 4], walk: ph * 3, arm: 1.3 + .4 * Math.sin(bpOf(t) * Math.PI + i), lean: .06 * Math.sin(ph * 3), hat: ['hood', 'turban', 'band', 'hood'][i % 4] })]);
    }
    ring.filter(r => r[0]).forEach(r => r[1]());
    menorah7(960, 880, 360, t, [1, 1, 1, 1, 1, 1, 1], { key: 'song', glow: 1.3 });
    ring.filter(r => !r[0]).forEach(r => r[1]());
    const mood = emotions(t, [[L(8), 'happy', { emote: 'music' }], [L(10), 'excited', { emote: 'music' }], [tLove, 'love']]);
    const dance = t < L(10) ? move('sway', t) : t < tLove ? move('mix', t) : {};
    clawd(1320, 960, U + 4, { ...mood, ...dance, dy: (mood.dy || 0) * .5 + (dance.dy || 0), view: t < tLove ? (dance.view || 'front') : 'q', flip: t < tLove ? !!dance.flip : true, hat: 'kippah' });
    camEnd();
    if (push_ > .7) flash(ease(seg(push_, .7, 1)), '#FFD58A');
    boilSeed('wipe');
    if (lt < .3) brushWipe(.5 + lt / .6, ['#A8804A', '#FFD58A']);
  }

  shotsShifted([[V4, shotPhalanx], [L(2), shotBreach], [L(4), shotJar], [L(6), shotDays], [L(8), shotSong]], SHIFT[4]);
})();
