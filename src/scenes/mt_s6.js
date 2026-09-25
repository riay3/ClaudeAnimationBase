// mt_s6.js: STANZA 6, "Hasof z'roa kodshecha" (322.2–362.6 s), the outro. Back at the snowy window: the eighth night.
// Clawd lights all eight candles, one every two beats. A storm batters the window; Clawd climbs onto the sill and
// becomes a windbreak for the flames. The storm passes. The camera pulls back: every window in the village glows, and
// seven stars (the seven shepherds) light over the hills. Iris to the window; black. (Shots AB–AD.)
(() => {
  const { village, room, WIN, HX, HY, HS, CG, CU, REST } = window.MTI;
  const T0 = lineT(4, 10), U = CU, tOut = 350.2, END = PROJECT.duration;
  const tC = i => bt(beatAt(324.6) + 2 * i);   // candle i is lit (left → right)
  const wick = i => [HX - HS * .35 + i * HS * .1, HY - HS * .08 - HS * .16 - HS * .015];
  const tPlace = tC(7) + 1.5, tStorm = 336.3, tGuard = bt(beatAt(339.35)), tCalm = 346.15;

  function shotWindow(t, lt, dur) {
    const storm = ease(seg(t, tStorm, tStorm + 1.6)) * (1 - ease(seg(t, tCalm, tCalm + 2.4)));
    const guard = ease(seg(t, tGuard, tGuard + .7)) * (1 - ease(seg(t, tCalm + 1.2, tCalm + 2.2)));
    // camera: out of the flame (gold) → the sill; a slow push while the storm rages; eases back as it calms
    const pull = easeOut(seg(t, T0, T0 + 2.2)), w0 = wick(0);
    const shake = shakeXY(t, 3 * storm);
    camBegin(lerp(w0[0] - 60, 900, pull) + shake[0], lerp(w0[1] - 60, 625, pull) + shake[1], lerp(9, 1.45, pull) + .12 * storm);
    room(t, 0, { storm, snowN: Math.round(46 + 110 * storm), wind: 3 * storm, lights: ease(seg(t, tCalm + 1.5, tCalm + 3.5)), stars7: [0, 1, 2, 3, 4, 5, 6].map(i => ease(seg(t, tCalm + 2 + i * .25, tCalm + 2.6 + i * .25))) });
    if (storm > 0) snowfall(t, Math.round(50 * storm), 4 * storm, 1.8, 170 * storm, 9);
    // lighting the candles: reach each wick in turn, hopping between them
    const lit = [0, 1, 2, 3, 4, 5, 6, 7].map(i => ease(seg(t, tC(i) - .1, tC(i) + .3)));
    lit.push(t > tPlace ? 1 : 0);
    const i = clamp(Math.floor((t - tC(0) + 1.0) / (2 * BEAT)), 0, 7);   // the candle being reached for
    const reach = t < tC(7) + .5 ? Math.max(0, 1 - Math.abs(t - tC(i)) / .55) : 0;
    const mood = emotions(t, [[T0, 'hopeful', { lookX: .9, lookY: .4 }], [tC(0) - .5, 'determined', { lookX: .9, lookY: .5 }], [tC(7) + .4, 'happy'],
      [tStorm + .4, 'surprised', { lookX: -.4, lookY: -.6 }], [tGuard + .4, 'determined'], [tGuard + 3.6, 'nervous'], [tGuard + 4.8, 'determined'], [tCalm + 1.4, 'happy'], [tCalm + 2.8, 'starstruck', { lookY: -.9 }]]);
    let pose, x, y = CG;
    if (t < tPlace + .4) {
      // up onto the sill behind the hanukkiah, then from wick to wick, a hop between each, the shamash held low
      const SY = 770, hopUp = { dy: 0, sq: 0 };
      y = SY;
      const needA = k => { const w = wick(clamp(k, -1.6, 7)); return Math.asin(clamp((SY - 4.5 * U - (w[1] + 2.45 * U)) / (2.2 * U), -1, 1)); };
      const k = (t - tC(0) + 1.0) / (2 * BEAT), kk = clamp(Math.floor(k), 0, 7), f = frac(k);
      const aReach = t > tC(7) + .5 ? lerp(needA(7), .75, ease(seg(t, tC(7) + .5, tPlace - .3))) : needA(kk);
      const aR = lerp(-.4, aReach, ease(clamp(reach * 1.6 + (t > tC(7) + .5 ? 1 : 0)))) + .04 * Math.sin(t * 2);
      pose = { ...mood, view: 'q', flip: true, aR, hat: 'kippah', dy: (mood.dy || 0) * .3 + hopUp.dy, sq: (mood.sq || 0) * .3 + hopUp.sq };
      const at = kk_ => { const p = { ...pose, aR: needA(kk_) }; return wick(clamp(kk_, -1.6, 7))[0] - armTipR(0, SY, U, p)[0]; };
      if (t < tC(0) - 1) x = at(0);
      else if (t > tC(7) + .5) x = lerp(at(7), at(-1.5), ease(seg(t, tC(7) + .5, tPlace - .3)));
      else { const a = at(kk), b = at(Math.min(7, kk + 1)); x = f < .7 ? a : lerp(a, b, ease((f - .7) / .3)); const hop = jump(t, tC(0) - 1 + (kk + .7) * 2 * BEAT, tC(0) - 1 + (kk + 1) * 2 * BEAT, 1); if (kk < 7) { pose.dy += hop.dy; pose.sq += hop.sq; } }
      if (t > tPlace - .5) { const h = jump(t, tPlace - .45, tPlace + .1, .8); pose.dy += h.dy; pose.sq += h.sq; }
      clawd(x, y, U, t < tPlace ? carryCandle(pose, 1) : pose);
    } else {
      // up onto the sill, behind the hanukkiah, facing the room: a windbreak with arms spread
      const up = ease(seg(t, tGuard - .2, tGuard + .5)), down = ease(seg(t, tCalm + 1.2, tCalm + 2.2));
      x = lerp(lerp(xPlaced(), HX + 20, up), REST, down); y = lerp(lerp(770, 762, up), CG, down);
      const hop = jump(t, tGuard - .25, tGuard + .35, 2.4), hop2 = jump(t, tCalm + 1.2, tCalm + 1.8, 1.5);
      const brace = guard * (1 - .2 * Math.sin(t * 9) * storm);
      pose = { ...mood, view: guard > .5 ? 'front' : 'q', flip: guard <= .5, hat: 'kippah', aL: lerp(mood.aL ?? .2, .15, brace), aR: lerp(mood.aR ?? .2, .15, brace), sx: 1 + .25 * guard, dy: (mood.dy || 0) * (1 - guard) + hop.dy + hop2.dy, sq: (mood.sq || 0) + hop.sq + hop2.sq + .06 * storm * Math.sin(t * 13) * guard };
      clawd(x, y, lerp(U, U * 1.15, guard), pose);
      if (guard > .3) { boilSeed('snowdust'); for (let s = 0; s < 6; s++) paint(ellPts(x - 4 * U + s * 1.6 * U, y - 8.1 * U, 10, 5, 8), { wash: MT.snow, washOp: 230 * guard, ink: null }); }
    }
    const bend = 26 * storm * (1 - guard * .85);
    hanukkiah(HX, HY, HS, t, lit.map(k => k * (1 - .55 * storm * (1 - guard))), { held: t < tPlace, bend });
    camEnd();
    if (lt < .6) flash(1 - ease(lt / .6), '#FFD58A');   // out of the Temple flame's gold
    if (t > tOut - .5) flash(ease(seg(t, tOut - .5, tOut)), '#F0B060');
  }
  function xPlaced() { return wick(0)[0] - 30; }

  // AD: out through the window: the whole village alight, seven stars; iris to the window; black
  function shotVillageEnd(t, lt, dur) {
    const back = easeOut(seg(t, tOut, tOut + 4.2));
    camBegin(lerp(WIN[0], 960, back), lerp(WIN[1], 520, back), lerp(9, 1, back));
    const stars = [0, 1, 2, 3, 4, 5, 6].map(i => ease(seg(t, bt(beatAt(352.95) + i) - .1, bt(beatAt(352.95) + i) + .3)));
    village(t, {
      lit: 1, allLit: 1, stars7: stars,
      inside: (wx, wy, ww, wh) => {
        boilSeed('inside2');
        paint(rectPts(wx - ww / 2, wy - wh / 2, ww, wh), { wash: '#C8844A', ink: null });
        paint(rectPts(wx - ww / 2, wy + wh * .28, ww, wh * .22), { wash: '#6B4A34', ink: null });
        hanukkiah(wx - ww * .1, wy + wh * .3, ww * .45, t, [1, 1, 1, 1, 1, 1, 1, 1, 1]);
        clawd(wx + ww * .3, wy + wh * .36, ww * .028, { ...feel('starstruck', t), view: 'q', flip: true, lookY: -1, hat: 'kippah', noShadow: true });
      },
    });
    const at = toScreen(WIN[0], WIN[1]);
    camEnd();
    snowfall(t, 40, .1, .8, 180, 3);
    if (lt < .5) flash(1 - lt / .5, '#F0B060');
    const tI = END - 4.2;
    if (t > tI) {   // iris to the glowing window, hold, shut with the last note
      const r = t < tI + 1.8 ? lerp(1500, 190, ease(seg(t, tI, tI + 1.8))) : t < END - .9 ? lerp(190, 170, seg(t, tI + 1.8, END - .9)) : lerp(170, 0, easeIn(seg(t, END - .9, END - .2)));
      iris(...at, r, '#14142A');
    }
  }

  shots([[T0, shotWindow], [tOut, shotVillageEnd]]);
})();
