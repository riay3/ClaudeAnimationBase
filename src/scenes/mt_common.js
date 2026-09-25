// mt_common.js: shared pieces for "Maoz Tzur": the beat map, the Hebrew lyric track, and the set pieces every chapter
// paints with (skies, hills, flames, the clay lamp Clawd carries, shadow-puppet people, menorahs, architecture).
// See STORYBOARD.md for the plan. All of it is closed-form in t.

// ---------- the song's beats ----------
// Beat-tracked downbeats of the recording (seconds). bt(n) = time of beat n (fractional n interpolates).
const BEATS = [3.808,4.412,4.992,5.550,6.153,6.711,7.291,7.872,8.452,9.009,9.590,10.170,10.751,11.331,11.935,12.516,13.073,13.630,14.211,14.791,15.372,15.952,16.533,17.113,17.670,18.251,18.831,19.412,19.992,20.573,21.130,21.687,22.268,22.848,23.452,24.033,24.613,25.147,25.728,26.308,26.819,27.492,28.073,28.653,29.234,29.768,30.395,30.975,31.486,32.020,32.670,33.205,33.808,34.389,34.923,35.527,36.130,36.664,37.314,37.872,38.475,39.010,39.613,40.171,40.774,41.424,41.935,42.493,43.050,43.630,44.211,44.768,45.349,45.929,46.533,47.090,47.671,48.274,48.855,49.435,49.969,50.503,51.037,51.548,52.106,52.686,53.290,53.894,54.474,55.078,55.658,56.239,56.912,57.516,58.096,58.654,59.211,59.791,60.372,60.952,61.533,62.113,62.694,63.251,63.808,64.366,64.900,65.480,66.038,66.711,67.315,67.872,68.452,69.033,69.590,70.171,70.751,71.332,71.912,72.469,73.050,73.630,74.211,74.791,75.349,75.952,76.533,77.090,77.648,78.251,78.832,79.412,79.970,80.550,81.131,81.711,82.268,82.872,83.453,84.033,84.590,85.171,85.751,86.332,86.889,87.493,88.050,88.631,89.188,89.792,90.349,90.929,91.510,92.090,92.671,93.251,93.832,94.412,94.970,95.550,96.131,96.711,97.292,97.872,98.429,99.033,99.614,100.171,100.751,101.332,101.912,102.493,103.050,103.631,104.211,104.768,105.349,105.929,106.510,107.090,107.671,108.251,108.785,109.389,109.970,110.573,111.131,111.711,112.292,112.872,113.453,114.010,114.590,115.171,115.751,116.332,116.912,117.493,118.050,118.631,119.211,119.792,120.372,120.953,121.510,122.067,122.671,123.252,123.832,124.389,124.970,125.550,126.131,126.711,127.292,127.872,128.430,129.010,129.591,130.171,130.752,131.332,131.866,132.470,133.050,133.631,134.211,134.792,135.326,135.953,136.510,137.091,137.671,138.252,138.832,139.413,139.970,140.550,141.131,141.711,142.269,142.872,143.430,144.010,144.591,145.171,145.752,146.332,146.913,147.493,148.050,148.631,149.188,149.792,150.372,150.953,151.510,152.091,152.671,153.252,153.832,154.413,154.970,155.550,156.131,156.711,157.292,157.872,158.430,159.010,159.591,160.171,160.752,161.309,161.890,162.493,163.051,163.631,164.212,164.792,165.373,165.953,166.510,167.091,167.671,168.252,168.832,169.413,169.970,170.551,171.131,171.712,172.292,172.873,173.453,174.034,174.591,175.171,175.729,176.263,176.890,177.470,178.074,178.654,179.188,179.815,180.419,180.953,181.534,182.091,182.625,183.205,183.763,184.343,184.924,185.527,186.131,186.712,187.292,187.849,188.383,188.987,189.544,190.148,190.682,191.309,191.890,192.424,192.958,193.631,194.212,194.769,195.349,195.930,196.510,197.091,197.671,198.252,198.832,199.390,199.970,200.551,201.131,201.712,202.292,202.873,203.430,203.987,204.568,205.102,205.636,206.286,206.867,207.447,208.028,208.631,209.212,209.839,210.373,210.953,211.511,212.091,212.648,213.252,213.833,214.367,214.877,215.528,216.131,216.712,217.292,217.873,218.453,219.057,219.591,220.172,220.752,221.333,221.913,222.494,223.051,223.631,224.212,224.792,225.373,225.953,226.511,227.091,227.672,228.252,228.833,229.390,229.970,230.551,231.131,231.712,232.292,232.873,233.430,234.011,234.591,235.172,235.752,236.333,236.913,237.494,238.051,238.631,239.212,239.792,240.373,240.953,241.511,242.091,242.672,243.252,243.833,244.413,244.994,245.551,246.132,246.712,247.293,247.873,248.454,249.034,249.591,250.172,250.752,251.333,251.913,252.494,253.051,253.632,254.212,254.793,255.373,255.954,256.511,257.091,257.672,258.252,258.833,259.413,259.971,260.551,261.132,261.712,262.293,262.873,263.430,264.011,264.591,265.172,265.752,266.333,266.913,267.471,268.051,268.608,269.142,269.769,270.373,270.930,271.488,272.068,272.649,273.229,273.833,274.390,274.971,275.528,276.132,276.712,277.293,277.873,278.430,279.011,279.591,280.172,280.706,281.333,281.913,282.494,283.051,283.632,284.212,284.793,285.373,285.954,286.511,287.092,287.672,288.253,288.833,289.414,289.924,290.551,291.132,291.712,292.293,292.873,293.454,294.034,294.592,295.172,295.753,296.333,296.890,297.471,298.051,298.632,299.212,299.793,300.373,300.954,301.511,302.092,302.672,303.253,303.833,304.414,304.971,305.551,306.132,306.712,307.293,307.873,308.431,309.011,309.592,310.172,310.753,311.333,311.914,312.471,313.028,313.585,314.096,314.630,315.257,315.931,316.534,317.092,317.626,318.113,318.694,319.298,319.901,320.459,321.039,321.643,322.223,322.804,323.384,323.988,324.522,325.126,325.753,326.333,326.914,327.471,328.075,328.609,329.189,329.723,330.304,330.861,331.535,332.092,332.672,333.276,333.833,334.367,334.925,335.435,335.993,336.550,337.107,337.665,338.175,338.802,339.336,339.917,340.497,341.124,341.728,342.355,342.982,343.609,344.120,344.770,345.350,345.954,346.535,347.069,347.603,348.206,348.694,349.228,349.739,350.343,350.970,351.597,352.200,352.804,353.361,354.035,354.638,355.219,355.776];
function bt(n) {
  const L = BEATS.length;
  if (n <= 0) return BEATS[0] + n * BEAT;
  if (n >= L - 1) return BEATS[L - 1] + (n - L + 1) * BEAT;
  const i = Math.floor(n); return lerp(BEATS[i], BEATS[i + 1], n - i);
}
// Each sung verse is 10 lines of 8 beats (lines 9–10 repeat 7–8). VERSE[k] = the beat each verse starts on.
const VERSE = [80, 166, 252, 386, 472];
const lineT = (v, k) => bt(VERSE[v] + 8 * k);

// ---------- film palette ----------
const MT = {
  night: '#1C2346', nightLt: '#34427A', snow: '#E8EDF4', snowSh: '#AFBAD2', win: '#FFD58A',
  gold: '#F2C14E', goldDk: '#B98A2A', flameO: '#F28A2E', flameY: '#FFE7A0', ember: '#D9542B',
  stone: '#EADCBE', stoneDk: '#B99E76', stoneSh: '#8E7A62', olive: '#7D8B52', oliveDk: '#4F5E3A',
  dawn1: '#F6C98B', dawn2: '#E98E6A', dawn3: '#8F7CB0',
  sand: '#E9BC72', sandDk: '#C98D46', egypt: '#F0A441', egyptHi: '#FAD48A',
  sea: '#2D6A9A', seaDk: '#1B3B69', foam: '#DDEEF4',
  exile: '#4C4478', exileLt: '#8E83B8', river: '#3F5E86',
  persia: '#232A5C', lantern: '#E4573D', slate: '#4A5570', slateLt: '#7B86A0', marble: '#E4E1D6',
  wood: '#6B4A34', clayLamp: '#A7663F', clayLampDk: '#6E3E26', wax: '#F4ECDD', waxBlue: '#9CB8DE',
  shadow: '#2A2238',
};

// ---------- lyrics ----------
// [start, end, text]. Shown at the foot of the frame, as sung: one line per 8 beats. Stanza 6 falls on the outro,
// where the melody has no clear line grid, so it's shown two lines at a time.
const STANZAS = [
  ['מעוז צור ישועתי', 'לך נאה לשבח', 'תיכון בית תפילתי', 'ושם תודה נזבח', 'לעת תכין מטבח', 'מצר המנבח', 'אז אגמור בשיר מזמור', 'חנוכת המזבח'],
  ['רעות שבעה נפשי', 'ביגון כוחי כלה', 'חיי מררו בקושי', 'בשעבוד מלכות עגלה', 'ובידו הגדולה', 'הוציא את הסגולה', 'חיל פרעה וכל זרעו', 'ירדו כאבן במצולה'],
  ['דביר קדשו הביאני', 'וגם שם לא שקטתי', 'ובא נוגש והגלני', 'כי זרים עבדתי', 'ויין רעל מסכתי', 'כמעט שעברתי', 'קץ בבל זרובבל', 'לקץ שבעים נושעתי'],
  ['כרות קומת ברוש ביקש', 'אגגי בן המדתא', 'ונהייתה לו לפח ולמוקש', 'וגאוותו נשבתה', 'ראש ימיני נשאת', 'ואויב שמו מחית', 'רוב בניו וקניניו', 'על העץ תלית'],
  ['יוונים נקבצו עלי', 'אזי בימי חשמנים', 'ופרצו חומות מגדלי', 'וטמאו כל השמנים', 'ומנותר קנקנים', 'נעשה נס לשושנים', 'בני בינה ימי שמונה', 'קבעו שיר ורננים'],
  ['חשוף זרוע קדשך', 'וקרב קץ הישועה', 'נקום נקמת דם עבדיך', 'מאומה הרשעה', 'כי ארכה לנו הישועה', 'ואין קץ לימי הרעה', 'דחה אדמון בצל צלמון', 'הקם לנו רועים שבעה'],
];
const LYRICS = [];
for (let v = 0; v < 5; v++) {
  const S = STANZAS[v], order = [0, 1, 2, 3, 4, 5, 6, 7, 6, 7];
  order.forEach((li, k) => LYRICS.push([lineT(v, k), k < 9 ? lineT(v, k + 1) : lineT(v, 9) + 8 * BEAT - .3, [S[li]]]));
}
{ // stanza 6: couplets over the outro, the last one repeated as the song repeats its closing lines
  const S = STANZAS[5], t0 = bt(558), step = 6.8;
  [[0, 1], [2, 3], [4, 5], [6, 7], [6, 7]].forEach(([a, b], k) => LYRICS.push([t0 + k * step, t0 + (k + 1) * step - (k === 4 ? .4 : 0), [S[a], S[b]]]));
}

const LYR_FONT = s => `800 ${s}px "Frank Ruhl Libre"`;
function lyricLayer(t) {
  for (const [a, b, lines] of LYRICS) {
    if (t < a - .12 || t > b) continue;
    const k = ease(seg(t, a - .12, a + .2)) * (1 - ease(seg(t, b - .42, b - .12)));
    if (k <= .01) continue;
    const size = lines.length > 1 ? 66 : 78, gap = size * 1.18, y0 = H - 96 - (lines.length - 1) * gap;
    // a soft painted band under the words, so they read on bright skies and dark nights alike
    boilSeed('lyrband' + a);
    const bw = 460 + 13 * size * Math.max(...lines.map(l => l.length)) / 20, bh = gap * lines.length + 34, by = y0 - gap / 2 - 10;
    const band = []; for (let i = 0; i <= 10; i++) band.push([W / 2 - bw / 2 + bw * i / 10 + jit(3), by + 6 * Math.sin(i * 1.9 + a) + jit(2)]);
    for (let i = 10; i >= 0; i--) band.push([W / 2 - bw / 2 + bw * i / 10 + jit(3), by + bh + 6 * Math.sin(i * 2.3 + a) + jit(2)]);
    band.push([W / 2 - bw / 2 - 30, by + bh / 2]); band.splice(11, 0, [W / 2 + bw / 2 + 30, by + bh / 2]);
    paint(through(band, 3), { wash: MT.shadow, washOp: 105 * k, ink: null });
    lines.forEach((txt, i) => letter(txt, W / 2, y0 + i * gap + 6 * (1 - k), size, PAL.cream,
      { screen: true, rtl: true, font: LYR_FONT(size), alpha: k, stroke: MT.shadow }));
  }
}
window.TOP_LAYER = lyricLayer;

// ---------- small maths ----------
const hs = (i, s = 0) => hash(i * 7.31 + s * 13.7);   // stable per-object random in 0..1
const tri = x => 1 - Math.abs(2 * frac(x) - 1);         // 0..1..0 triangle wave
const fadeFrom = (k, col) => flash(1 - clamp(k), col);  // a full-frame wash that fades out as k goes 0 → 1

// ---------- skies ----------
// A vertical wash of stacked, slightly wobbly bands from top colour to bottom colour (wet-in-wet watercolour look),
// oversized so camera moves never show an edge. cols = [top, ..., bottom].
function skyWash(cols, key = 'sky', x0 = -900, x1 = W + 900, y0 = -700, y1 = H + 500, n = 9) {
  boilSeed(key);
  const band = (y1 - y0) / n;
  for (let i = 0; i < n; i++) {
    const k = i / (n - 1), seg_ = k * (cols.length - 1), j = Math.min(cols.length - 2, Math.floor(seg_));
    const c = mixCol(cols[j], cols[j + 1], seg_ - j), y = y0 + i * band;
    const P = [[x0, y - 30]]; for (let s = 0; s <= 8; s++) P.push([lerp(x0, x1, s / 8), y - 20 + 14 * Math.sin(s * 1.7 + i) + jit(3)]);
    P.push([x1, y + band + 40], [x0, y + band + 40]);
    paint(P, { wash: c, washOp: 255, ink: null });
  }
}
// Soft watercolour clouds: a few overlapping blotches. col, alpha 0..255.
function cloud(x, y, w, h, col, a = 140, key = 'cloud' + x) {
  boilSeed(key);
  for (let i = 0; i < 4; i++) {
    const cx = x + (hs(i, x) - .5) * w * .7, cy = y + (hs(i + 5, x) - .5) * h * .5;
    paint(ellPts(cx, cy, w * (.35 + .2 * hs(i + 9, x)), h * (.4 + .2 * hs(i + 3, x)), 18, 4), { fill: col, fillOp: a, bleed: .25, tex: .5, ink: null });
  }
}
function starField(t, n, seed, x0, y0, w, h, br = 1, col = PAL.cream) {
  for (let i = 0; i < n; i++) {
    boilSeed('star' + seed + '_' + i);
    const x = x0 + hs(i, seed) * w, y = y0 + hs(i + 50, seed) * h, tw = .6 + .4 * Math.sin(t * (1.5 + 2 * hs(i + 9, seed)) + i);
    const r = (2.5 + 5 * hs(i + 21, seed)) * tw * br; if (r < .8) continue;
    paint(starPts(x, y, r, .35, 4), { wash: col, washOp: Math.min(255, 140 + 110 * tw) * clamp(br), ink: null });
  }
}
// Falling snow (screen space), n flakes, drift with wind.
function snowfall(t, n = 70, wind = 0, sp = 1, a = 230, seed = 0) {
  for (let i = 0; i < n; i++) {
    const z = .4 + .6 * hs(i, 3 + seed), fall = (40 + 60 * z) * sp;
    const y = frac(hs(i + 7, seed) + t * fall / (H + 80)) * (H + 80) - 40;
    const x = ((hs(i + 13, seed) * (W + 300) + 22 * Math.sin(t * .9 + i) + wind * t * z * 140) % (W + 300) + W + 300) % (W + 300) - 150;
    boilSeed('snow' + seed + '_' + i);
    paint(ellPts(x, y, 2.2 + 3.6 * z, 2.2 + 3.6 * z, 8, .6), { wash: MT.snow, washOp: a * (.55 + .45 * z), ink: null });
  }
}

// ---------- land ----------
// A ridge from x0 to x1 around height y (world px), amp high, painted solid down to yb. Ink runs along the top only.
function ridgeY(x, y, amp, seed) { return y - amp * (.55 * Math.sin(x * .0023 + seed) + .3 * Math.sin(x * .0061 + seed * 2.1) + .15 * Math.sin(x * .017 + seed * 3.3)); }
function ridge(x0, x1, y, amp, seed, col, o = {}) {
  boilSeed('ridge' + seed);
  const top = []; const n = o.n || 26;
  for (let i = 0; i <= n; i++) { const x = lerp(x0, x1, i / n); top.push([x, ridgeY(x, y, amp, seed) + jit(1.5)]); }
  const yb = o.yb ?? y + 900;
  paint([...top, [x1, yb], [x0, yb]], { wash: col, washOp: 255, ink: null });
  if (o.tex !== false) paint([...top.map(([x, yy]) => [x, yy + 30]), [x1, yb], [x0, yb]], { fill: o.texCol || mixCol(col, PAL.ink, .25), fillOp: o.texOp ?? 60, bleed: .12, tex: .7, border: .6, ink: null });
  if (o.ink !== null) for (let i = 0; i < n; i += 6) inkLine(through(top.slice(i, Math.min(n, i + 6) + 1), 3), o.sw ?? .8, o.ink || mixCol(col, PAL.ink, .55), 'inkfine', .4);
}
// Olive tree: gnarled trunk + a cloud of silver-green crowns. s = height in px.
function oliveTree(x, y, s, t, seed = 0, col = MT.olive) {
  boilSeed('olive' + seed);
  paint(ribbon([[x, y], [x - s * .05, y - s * .3], [x + s * .06, y - s * .55]], s * .12, s * .06), { wash: MT.wood, ink: PAL.ink, sw: .6 });
  const sway = wob(t, .25, seed) * s * .02;
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i - 2) * .55, r = s * .28;
    paint(ellPts(x + Math.cos(a) * r * 1.2 + sway, y - s * .62 + Math.sin(a) * r * .6, s * (.2 + .06 * hs(i, seed)), s * (.14 + .04 * hs(i + 3, seed)), 14, 2),
      { wash: mixCol(col, '#B8C49A', .2 * hs(i + 7, seed)), ink: mixCol(col, PAL.ink, .5), sw: .5 });
  }
}
function palm(x, y, s, t, seed = 0, col = '#5E7A3E') {
  boilSeed('palm' + seed);
  const top = [x + s * .12 * Math.sin(seed), y - s];
  paint(ribbon([[x, y], [lerp(x, top[0], .5) + s * .05, y - s * .5], top], s * .07, s * .04), { wash: '#8A6A44', ink: PAL.ink, sw: .6 });
  for (let i = 0; i < 7; i++) {
    const a = -Math.PI / 2 + (i - 3) * .48 + wob(t, .3, i * .2 + seed) * .06, L = s * .42;
    paint(ribbon([top, [top[0] + Math.cos(a) * L * .6, top[1] + Math.sin(a) * L * .6 - s * .04], [top[0] + Math.cos(a) * L, top[1] + Math.sin(a) * L + s * .12]], s * .09, s * .01), { wash: col, ink: mixCol(col, PAL.ink, .5), sw: .5 });
  }
}
function cypress(x, y, s, t, seed = 0, col = '#33543F', chop = 0) {
  boilSeed('cyp' + seed);
  const sw = wob(t, .2, seed) * s * .01 + chop;
  paint(through([[x - s * .09, y], [x - s * .12, y - s * .35], [x - s * .05 + sw * .6, y - s * .8], [x + sw, y - s], [x + s * .05 + sw * .6, y - s * .8], [x + s * .12, y - s * .35], [x + s * .09, y]], 4),
    { wash: col, fill: mixCol(col, PAL.ink, .3), fillOp: 90, bleed: .1, tex: .6, ink: PAL.ink, sw: .9 });
  for (let i = 0; i < 6; i++) inkLine([[x - s * .06 + sw * i / 6, y - s * (.15 + i * .12)], [x + s * .03 + sw * i / 6, y - s * (.2 + i * .12)]], .5, mixCol(col, PAL.ink, .6), 'inkfine', .3);
}

// ---------- light ----------
// A candle/lamp flame at (x, y) = its base; s = size (px). o: { k (0..1 lit), bend (wind lean px), seed, glow (mult) }.
function flame(x, y, s, t, o = {}) {
  const k = o.k ?? 1; if (k <= .02) return;
  const seed = o.seed || 0, fl = 1 + .12 * Math.sin(t * 17 + seed * 3) + .08 * Math.sin(t * 29 + seed), h = s * 2.6 * fl * k;
  const lean = (o.bend || 0) + s * .25 * Math.sin(t * 6.3 + seed * 2);
  glow(x, y - h * .45, s * 7 * (o.glow ?? 1) * (.6 + .4 * k), o.glowCol || '#FFB65C', .9 * k);
  boilSeed('flame' + seed);
  const P = h => [[x - s * .55 * k, y - h * .18], [x - s * .42 * k, y - h * .52], [x + lean, y - h], [x + s * .42 * k, y - h * .52], [x + s * .55 * k, y - h * .18], [x, y + s * .12]];
  paint(through(P(h), 4), { wash: o.outer || MT.flameO, ink: null });
  const P2 = P(h * .66).map(([px, py]) => [x + (px - x) * .6, y + (py - y)]);
  paint(through(P2, 4), { wash: MT.flameY, ink: null });
}
// The clay oil lamp Clawd carries: handle ring at (x, y), body to the right, the flame on the spout. s ≈ its length.
function oilLamp(x, y, s, t, o = {}) {
  boilSeed('lamp' + (o.key || ''));
  const bx = x + s * .5, by = y;
  paint(through([[x + s * .08, by], [bx - s * .2, by + s * .2], [bx + s * .25, by + s * .17], [x + s * .98, by - s * .02], [bx + s * .25, by - s * .13], [bx - s * .2, by - s * .15], [x + s * .08, by]], 3),
    { wash: MT.clayLamp, fill: MT.clayLampDk, fillOp: 60, tex: .6, ink: PAL.ink, sw: o.sw ?? .7 });
  paint(ellPts(bx - s * .02, by - s * .1, s * .16, s * .045, 12), { wash: MT.clayLampDk, ink: null });   // filling hole
  paint(ellPts(x + s * .02, by - s * .02, s * .11, s * .09, 12), { ink: PAL.ink, sw: (o.sw ?? .7) * 1.3 });   // handle loop
  flame(x + s * .95, by - s * .06, s * .16 * (o.size || 1), t, { k: o.lit ?? 1, seed: 11, glow: o.glow ?? 1.3, bend: o.bend || 0 });
}
// A pose carrying the lamp: attaches it to the arm tip and keeps it upright whatever the arm or body does.
// pose: the final clawd() options (after emotions and moves). Front / q views hold it out on the right arm; side on the near arm.
function carryLamp(pose, lamp = {}) {
  const side = pose.view === 'side', fx = pose.flip ? -1 : 1, rot = pose.rot || 0;
  const a = side ? (pose.aL ?? .2) : (pose.aR ?? .2), fix = side ? a - .7 - fx * rot : a - fx * rot;
  const hook = (u, sw) => { push(); rotate(fix); oilLamp(-u * .1, u * .25, u * 2.6, T, { sw: sw * .7, ...lamp }); pop(); };
  return side ? { ...pose, armL: hook } : { ...pose, armR: hook };
}

// ---------- people: shadow-puppet silhouettes ----------
// (x, y) = feet; h = height px. o: { col, walk (phase in steps), lean, flip, hat, carry, arm (angle), key, ink, headTilt }
// hats: hood, nemes, helmet (Greek crest), bab (tall Babylonian cap), turban, tricorn (Haman), crown, band, none
// carry: brick, spear, shield, banner, staff, torch, harp, hammer, timbrel
function figure(x, y, h, o = {}) {
  boilSeed('fig' + (o.key ?? x));
  const col = o.col || MT.shadow, ink = o.ink === undefined ? mixCol(col, PAL.ink, .6) : o.ink, sw = clamp(h / 260, .3, 1) * (o.sw || 1);
  const w = o.walk ?? null, st = w == null ? 0 : Math.sin(w * TAU), bob = w == null ? 0 : Math.abs(st) * h * .02;
  push(); translate(x, y - bob); if (o.flip) scale(-1, 1); rotate(o.lean || 0);
  const Hh = h, sh = -Hh * .74, hem = -Hh * .02;
  // feet, peeking under the hem
  if (w != null) for (const s of [-1, 1]) paint(ellPts(s * st * Hh * .09 + Hh * .03, -Hh * .015, Hh * .06, Hh * .025, 10), { wash: mixCol(col, PAL.ink, .3), ink: null });
  // robe: one outline from shoulders to a swaying hem
  const flare = Hh * (.2 + .02 * st), sway = st * Hh * .03;
  const robe = [[-Hh * .13, sh], [Hh * .13, sh], [Hh * .16, sh + Hh * .2], [flare + sway, hem], [0 + sway * .5, hem + Hh * .01], [-flare + sway, hem], [-Hh * .17, sh + Hh * .22]];
  paint(through([...robe, robe[0]], 3), { wash: col, ink, sw });
  // head
  const hx = Hh * .02, hy = -Hh * .85, hr = Hh * .1;
  push(); translate(hx, hy); rotate(o.headTilt || 0);
  paint(ellPts(0, 0, hr * .9, hr, 14), { wash: col, ink, sw });
  figHat(o.hat || 'hood', hr, col, ink, sw);
  pop();
  // the near arm, holding whatever it carries
  const aa = o.arm ?? (w == null ? .25 : .25 + .3 * st);
  push(); translate(Hh * .05, sh + Hh * .06); rotate(Math.PI / 2 - aa);
  paint(ribbon([[0, 0], [Hh * .15, Hh * .01], [Hh * .3, 0]], Hh * .07, Hh * .05), { wash: mixCol(col, PAL.ink, .12), ink, sw: sw * .8 });
  translate(Hh * .3, 0); rotate(-(Math.PI / 2 - aa) - (o.lean || 0));
  if (o.carry) figCarry(o.carry, Hh, col, ink, sw, o);
  pop();
  pop();
}
function figHat(hat, r, col, ink, sw) {
  const P = pts => pts.map(([a, b]) => [a * r, b * r]);
  if (hat === 'hood') paint(through(P([[-1.15, .9], [-1.2, -.3], [-.4, -1.35], [.6, -1.2], [1.15, -.2], [1.1, .6]]), 3), { wash: mixCol(col, PAL.ink, .12), ink, sw });
  else if (hat === 'nemes') paint(P([[-1.1, -1.05], [1.1, -1.05], [1.5, 1.4], [.9, 1.5], [.7, .2], [-.7, .2], [-.9, 1.5], [-1.5, 1.4]]), { wash: mixCol(col, '#5A7FA8', .25), ink, sw });
  else if (hat === 'helmet') {
    paint(P([[-1.05, .4], [-1.1, -.6], [0, -1.2], [1.1, -.6], [1.05, .4], [.5, .45], [.5, -.1], [-.2, -.1], [-.2, .9], [-1.05, .8]]), { wash: mixCol(col, '#8C6B3E', .25), ink, sw });
    paint(through(P([[-1.4, -.6], [-.6, -2.2], [.5, -2.1], [1.3, -1.2], [.4, -1.3], [-.4, -1.1]]), 2), { wash: mixCol(col, '#A53A2E', .45), ink, sw });   // crest
  } else if (hat === 'bab') paint(P([[-.95, -.6], [-.8, -2.3], [.8, -2.3], [.95, -.6]]), { wash: mixCol(col, '#3C4E8A', .2), ink, sw });
  else if (hat === 'turban') paint(ellPts(0, -.75 * r, 1.25 * r, .7 * r, 14), { wash: mixCol(col, PAL.cream, .15), ink, sw });
  else if (hat === 'tricorn') paint(P([[-2.3, -.4], [0, -2.6], [2.3, -.4], [0, -.9]]), { wash: mixCol(col, PAL.ink, .3), ink, sw });
  else if (hat === 'crown') paint(P([[-1, -.7], [-1.1, -1.9], [-.5, -1.3], [0, -2.1], [.5, -1.3], [1.1, -1.9], [1, -.7]]), { wash: MT.gold, ink, sw });
  else if (hat === 'band') paint(rectPts(-1.05 * r, -.55 * r, 2.1 * r, .45 * r), { wash: '#C8324A', ink: null });
}
function figCarry(c, h, col, ink, sw, o) {
  if (c === 'brick') paint(rectPts(-h * .02, -h * .16, h * .2, h * .1, 1), { wash: '#B5693F', ink, sw });
  else if (c === 'spear') { inkLine([[0, h * .45], [0, -h * .75]], sw * 1.4, mixCol(col, PAL.ink, .3), 'ink', 0); paint([[-h * .03, -h * .72], [0, -h * .86], [h * .03, -h * .72]], { wash: MT.slateLt, ink, sw: sw * .6 }); }
  else if (c === 'shield') paint(ellPts(-h * .05, -h * .05, h * .17, h * .17, 18), { wash: mixCol(col, o.shieldCol || '#8C6B3E', .45), ink, sw });
  else if (c === 'banner') { inkLine([[0, h * .3], [0, -h * .7]], sw * 1.3, MT.wood, 'ink', 0); paint(through([[0, -h * .7], [h * .28, -h * .66 + h * .02 * Math.sin(T * 5)], [h * .34, -h * .55], [0, -h * .5]], 3), { wash: o.bannerCol || '#3F6FA8', ink, sw }); }
  else if (c === 'staff') inkLine([[0, h * .45], [0, -h * .55], [h * .05, -h * .62]], sw * 1.4, MT.wood, 'ink', .3);
  else if (c === 'torch') { inkLine([[0, h * .2], [0, -h * .25]], sw * 1.4, MT.wood, 'ink', 0); flame(0, -h * .25, h * .05, T, { seed: String(o.key).length * 7 + (String(o.key).charCodeAt(String(o.key).length - 1) || 0), glow: 1.2 }); }
  else if (c === 'hammer') { inkLine([[0, h * .2], [0, -h * .3]], sw * 1.4, MT.wood, 'ink', 0); paint(rectPts(-h * .07, -h * .38, h * .14, h * .09), { wash: MT.slate, ink, sw }); }
  else if (c === 'hoplite') {
    inkLine([[h * .05, h * .45], [h * .05, -h * .8]], sw * 1.4, mixCol(col, PAL.ink, .3), 'ink', 0);
    paint([[h * .02, -h * .77], [h * .05, -h * .9], [h * .08, -h * .77]], { wash: MT.slateLt, ink, sw: sw * .6 });
    paint(ellPts(-h * .02, -h * .02, h * .19, h * .19, 18), { wash: mixCol(col, '#A8783E', .45), ink, sw });
    paint(ellPts(-h * .02, -h * .02, h * .07, h * .07, 12), { wash: mixCol(col, '#E0B060', .4), ink: null });
  }
  else if (c === 'timbrel') paint(ellPts(0, -h * .05, h * .09, h * .09, 14), { wash: MT.sand, ink, sw });
  else if (c === 'axe') { inkLine([[0, h * .15], [0, -h * .5]], sw * 1.6, MT.wood, 'ink', 0); paint([[0, -h * .5], [h * .16, -h * .56], [h * .14, -h * .36], [0, -h * .4]], { wash: MT.slateLt, ink, sw }); }
}

// ---------- ritual objects ----------
// The Temple's seven-branched menorah, base centre at (x, y), height s. lit[i] 0..1 per lamp (0 = rightmost... any order).
function menorah7(x, y, s, t, lit = [], o = {}) {
  boilSeed('menorah' + (o.key || ''));
  const gold = o.col || MT.gold, dk = MT.goldDk, sw = clamp(s / 260, .4, 1.2), top = y - s * .82;
  paint([[x - s * .22, y], [x - s * .08, y - s * .1], [x + s * .08, y - s * .1], [x + s * .22, y], [x + s * .12, y + s * .02], [x - s * .12, y + s * .02]], { wash: gold, fill: dk, fillOp: 70, ink: PAL.ink, sw });
  paint(rectPts(x - s * .025, top, s * .05, s * .74), { wash: gold, ink: PAL.ink, sw: sw * .8 });
  const lamps = [[x, top]];
  for (let i = 1; i <= 3; i++) {
    const r = s * .13 * i, arc = [];
    for (let k = 0; k <= 10; k++) { const a = Math.PI * k / 10; arc.push([x - Math.cos(a) * r, top + Math.sin(a) * r]); }
    paint(ribbon(arc, s * .04, s * .04), { wash: gold, ink: PAL.ink, sw: sw * .7 });
    lamps.push([x - r, top], [x + r, top]);
  }
  lamps.sort((a, b) => a[0] - b[0]);
  lamps.forEach(([lx, ly], i) => {
    paint(ellPts(lx, ly - s * .01, s * .045, s * .025, 10), { wash: dk, ink: PAL.ink, sw: sw * .6 });
    if (lit[i] > 0) flame(lx, ly - s * .03, s * .03, t, { k: lit[i], seed: i + (o.seedOff || 0), glow: o.glow ?? 1 });
  });
  return lamps;
}
// A window hanukkiah: eight candles in a row, and the raised shamash at the left end. lit[0..7] candles (left→right),
// lit[8] = the shamash. o.held: the shamash is in Clawd's hand, not in its cup. Returns wick positions ([8] = shamash).
function hanukkiah(x, y, s, t, lit = [], o = {}) {
  boilSeed('hanuk');
  const sw = clamp(s / 400, .4, 1), col = o.col || '#C9A04A', dk = '#8A6A2E';
  paint(rectPts(x - s * .56, y - s * .08, s * .98, s * .06, 1), { wash: col, ink: PAL.ink, sw });
  paint([[x - s * .1, y - s * .02], [x + s * .06, y - s * .02], [x + s * .12, y + s * .06], [x - s * .16, y + s * .06]], { wash: col, fill: dk, fillOp: 60, ink: PAL.ink, sw });
  paint(rectPts(x - s * .52, y - s * .26, s * .04, s * .18), { wash: col, ink: PAL.ink, sw: sw * .8 });
  const wicks = [];
  for (let i = 0; i < 9; i++) {
    const sh = i === 8, cx = sh ? x - s * .5 : x - s * .35 + i * s * .1, base = sh ? y - s * .26 : y - s * .08, ch = s * (sh ? .14 : .16);
    if (!(o.held && sh)) {
      paint(rectPts(cx - s * .018, base - ch, s * .036, ch, .5), { wash: i % 2 && !sh ? MT.waxBlue : MT.wax, ink: PAL.ink, sw: sw * .6 });
      inkLine([[cx, base - ch], [cx, base - ch - s * .02]], sw * .6, PAL.ink, 'inkfine', 0);
    }
    paint(ellPts(cx, base, s * .03, s * .012, 8), { wash: dk, ink: null });
    wicks.push([cx, base - ch - s * .015]);
  }
  for (let i = 0; i < 9; i++) if ((lit[i] || 0) > 0 && !(o.held && i === 8)) flame(wicks[i][0], wicks[i][1], s * .022, t, { k: lit[i], seed: i * 3, glow: .9, bend: o.bend ? o.bend * (1 + .3 * hs(i, 4)) : 0 });
  return wicks;
}
// A shamash candle held in the hand (for hooks): base at (0,0), pointing up.
function heldCandle(u, sw, lit = 1, bend = 0) {
  paint(rectPts(-u * .28, -u * 2.2, u * .56, u * 2.2, .5), { wash: MT.wax, ink: PAL.ink, sw: sw * .6 });
  inkLine([[0, -u * 2.2], [0, -u * 2.5]], sw * .6, PAL.ink, 'inkfine', 0);
  if (lit > 0) flame(0, -u * 2.45, u * .36, T, { k: lit, seed: 8, glow: 1.2, bend });
}
function carryCandle(pose, lit = 1, bend = 0) {
  const fx = pose.flip ? -1 : 1, a = pose.aR ?? .2, fix = a - fx * (pose.rot || 0);
  return { ...pose, armR: (u, sw) => { push(); rotate(fix); heldCandle(u, sw, lit, bend); pop(); } };
}

// ---------- architecture ----------
// The (Herodian) Temple on its platform: base centre (x, y), width s. o.col, o.glow (portal light 0..1), o.ruin 0..1.
function temple(x, y, s, t, o = {}) {
  boilSeed('temple' + (o.key || ''));
  const st = o.col || MT.stone, dk = mixCol(st, MT.stoneSh, .55), sw = clamp(s / 700, .4, 1.1), g = MT.gold;
  // platform walls
  paint(rectPts(x - s * .75, y - s * .12, s * 1.5, s * .12, 1), { wash: dk, fill: MT.stoneSh, fillOp: 50, tex: .6, ink: PAL.ink, sw });
  for (let i = 1; i < 4; i++) inkLine([[x - s * .74, y - s * .03 * i], [x + s * .74, y - s * .03 * i]], sw * .4, mixCol(dk, PAL.ink, .4), 'inkfine', 0);
  // court colonnade
  paint(rectPts(x - s * .6, y - s * .2, s * 1.2, s * .08, 1), { wash: mixCol(st, dk, .3), ink: PAL.ink, sw: sw * .8 });
  for (let i = 0; i <= 16; i++) inkLine([[x - s * .58 + i * s * .0725, y - s * .19], [x - s * .58 + i * s * .0725, y - s * .125]], sw * .5, mixCol(dk, PAL.ink, .5), 'inkfine', 0);
  // sanctuary: a T-shaped facade, wider at the top
  const bw = s * .22, tw = s * .34, hb = s * .3, ht = s * .14, base = y - s * .2;
  paint([[x - bw, base], [x - bw, base - hb], [x - tw, base - hb], [x - tw, base - hb - ht], [x + tw, base - hb - ht], [x + tw, base - hb], [x + bw, base - hb], [x + bw, base]],
    { wash: st, fill: dk, fillOp: 45, tex: .5, ink: PAL.ink, sw });
  paint(rectPts(x - tw, base - hb - ht - s * .02, tw * 2, s * .025), { wash: g, ink: PAL.ink, sw: sw * .6 });
  // portal
  const pw = s * .06, ph = s * .3;
  paint(rectPts(x - pw, base - ph, pw * 2, ph), { wash: mixCol(MT.goldDk, PAL.ink, .35), ink: PAL.ink, sw: sw * .7 });
  if (o.glow) glow(x, base - ph * .5, s * .25, '#FFC76A', o.glow);
  inkLine([[x - pw * 1.6, base - ph - s * .02], [x, base - ph - s * .045], [x + pw * 1.6, base - ph - s * .02]], sw * 1.1, g, 'ink', .5);   // the golden vine
  for (let i = -4; i <= 4; i++) if (i) inkLine([[x + i * tw / 4.6, base - hb - ht + s * .02], [x + i * tw / 4.6, base - hb - ht - s * .01]], sw * .5, g, 'inkfine', 0);
}
// A crenellated city wall with towers along the ground line y from x0 to x1, height h.
function cityWall(x0, x1, y, h, col = MT.stone, key = 'wall') {
  boilSeed(key);
  const dk = mixCol(col, MT.stoneSh, .5), P = [[x0, y]];
  const n = Math.max(2, Math.round((x1 - x0) / (h * .5)));
  for (let i = 0; i <= n; i++) {
    const x = lerp(x0, x1, i / n), tower = i % 5 === 0, th = tower ? h * 1.35 : h;
    P.push([x - h * .12, y - th], [x - h * .12, y - th - h * .12], [x + h * .12, y - th - h * .12], [x + h * .12, y - th]);
  }
  P.push([x1, y]);
  paint(P, { wash: col, fill: dk, fillOp: 50, tex: .6, ink: PAL.ink, sw: clamp(h / 150, .4, 1) });
}
// A little stone house cluster for Jerusalem's slopes: flat roofs and domes.
function houses(x0, x1, y, h, seed, col = MT.stone) {
  for (let i = 0, x = x0; x < x1; i++) {
    const w = h * (.8 + .7 * hs(i, seed)), hh = h * (.6 + .6 * hs(i + 3, seed)), yy = y - h * .2 * hs(i + 8, seed);
    boilSeed('house' + seed + '_' + i);
    paint(rectPts(x, yy - hh, w, hh, 1), { wash: mixCol(col, MT.stoneSh, .15 + .3 * hs(i + 1, seed)), ink: mixCol(MT.stoneSh, PAL.ink, .4), sw: .5 });
    if (hs(i + 11, seed) > .6) paint(ellPts(x + w / 2, yy - hh, w * .28, h * .22, 12).filter(p => p[1] <= yy - hh + 1), { wash: mixCol(col, MT.stoneSh, .2), ink: mixCol(MT.stoneSh, PAL.ink, .4), sw: .5 });
    if (hs(i + 17, seed) > .5) paint(rectPts(x + w * .4, yy - hh * .6, w * .16, hh * .25), { wash: mixCol(MT.stoneSh, PAL.ink, .35), ink: null });
    x += w * (.85 + .2 * hs(i + 5, seed));
  }
}

// World position of Clawd's right-arm tip (front / q views) for a pose drawn at (x, y) with unit u. Use it to put a held
// thing exactly where the hand is (a candle to a wick), or to solve for where Clawd must stand to reach something.
function armTipR(x, y, u, pose) {
  const V = VIEWS[pose.view] || VIEWS.front, arm = V.arms.find(a => a[2] === 'R'), a = pose.aR ?? .2, dir = arm[1];
  const px = (arm[0] + dir * .55 * clamp((Math.abs(a) - .7) / .9)) * u, lx = px + dir * 2.2 * u * Math.cos(a), ly = -4.5 * u - 2.2 * u * Math.sin(a);
  const sq = pose.sq || 0, fx = (pose.flip ? -1 : 1) * (pose.sx ?? 1) * (1 + sq * .6), fy = (pose.sy ?? 1) * (1 - sq), r = pose.rot || 0;
  const X = lx * fx, Y = ly * fy;
  return [x + (pose.dx || 0) * u + X * Math.cos(r) - Y * Math.sin(r), y + (pose.dy || 0) * u + X * Math.sin(r) + Y * Math.cos(r)];
}
// Snow falling inside a world-space box (a window pane), n flakes.
function snowIn(t, x0, y0, w, h, n, s = 1, seed = 5, wind = 0) {
  for (let i = 0; i < n; i++) {
    const z = .4 + .6 * hs(i, seed), y = y0 + frac(hs(i + 7, seed) + t * (.05 + .07 * z)) * h;
    const x = x0 + frac(hs(i + 13, seed) + .01 * Math.sin(t * .9 + i) + wind * t * z * .05) * w;
    boilSeed('sin' + seed + '_' + i);
    paint(ellPts(x, y, (1.5 + 2.5 * z) * s, (1.5 + 2.5 * z) * s, 8), { wash: MT.snow, washOp: 150 + 90 * z, ink: null });
  }
}
// A snowy village house: pitched roof with a snow cap, one window. win: 0 dark .. 1 lit. Returns the window centre.
function snowHouse(x, y, w, h, o = {}) {
  boilSeed('shouse' + x);
  const col = o.col || '#4B3F5E', rh = h * .55;
  paint(rectPts(x - w / 2, y - h, w, h, 1), { wash: col, fill: mixCol(col, PAL.ink, .3), fillOp: 50, tex: .5, ink: PAL.ink, sw: .6 });
  paint([[x - w * .62, y - h + 4], [x, y - h - rh], [x + w * .62, y - h + 4]], { wash: mixCol(col, PAL.ink, .35), ink: PAL.ink, sw: .6 });
  paint(through([[x - w * .66, y - h + 6], [x - w * .3, y - h - rh * .5 - 4], [x, y - h - rh - 6], [x + w * .3, y - h - rh * .5 - 4], [x + w * .66, y - h + 6], [x + w * .5, y - h + 12], [x, y - h - rh + 14], [x - w * .5, y - h + 12]], 2), { wash: MT.snow, ink: PAL.ink, sw: .5 });
  const wx = x + (o.wx || 0) * w, wy = y - h * .5, ww = w * (o.ww || .28), wh = h * .38;
  paint(rectPts(wx - ww / 2, wy - wh / 2, ww, wh), { wash: mixCol('#1B1A2E', MT.win, o.win || 0), ink: PAL.ink, sw: .6 });
  if (o.inside) o.inside(wx, wy, ww, wh);
  if (o.win) glow(wx, wy, ww * 2.6, '#FFB65C', .8 * o.win);
  if (o.cross !== false) { inkLine([[wx, wy - wh / 2], [wx, wy + wh / 2]], .6, '#2B2233', 'inkfine', 0); inkLine([[wx - ww / 2, wy], [wx + ww / 2, wy]], .6, '#2B2233', 'inkfine', 0); }
  paint(rectPts(wx - ww / 2 - 4, wy + wh / 2, ww + 8, 6), { wash: MT.snow, ink: null });
  return [wx, wy];
}
function pine(x, y, s, seed = 0) {
  boilSeed('pine' + seed);
  for (let i = 0; i < 3; i++) {
    const yy = y - s * (.25 + i * .25), w = s * (.36 - i * .09);
    paint([[x - w, yy + s * .1], [x, yy - s * .3], [x + w, yy + s * .1]], { wash: '#243A45', ink: PAL.ink, sw: .5 });
    paint([[x - w * .8, yy + s * .06], [x, yy - s * .28], [x + w * .3, yy - s * .05]], { wash: MT.snow, washOp: 200, ink: null });
  }
}

// ---------- more helpers ----------
// The beat index nearest to video time t.
function beatAt(t) { let lo = 0, hi = BEATS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (BEATS[m] < t) lo = m; else hi = m; } return Math.abs(BEATS[lo] - t) < Math.abs(BEATS[hi] - t) ? lo : hi; }
// Whip-pan streaks (screen space): k 0..1 strength, dir ±1. Dry-brush smears across the frame.
function whipStreaks(k, dir = 1, cols = [PAL.cream, '#CDBFA8']) {
  if (k <= .02) return;
  boilSeed('whip');
  for (let i = 0; i < 16; i++) {
    const y = hs(i, 41) * H, len = W * (.4 + .6 * hs(i, 42)) * k, x0 = hs(i, 43) * W - len / 2;
    inkLine([[x0, y], [x0 + len * .5, y + jit(6)], [x0 + len, y]], 3 + 5 * hs(i, 44) * k, cols[i % 2], 'dry', .3);
  }
}
// Rising smoke: a column of soft puffs from (x, y), h high.
function smoke(x, y, h, t, col = '#D9CFC2', a = 120, key = 'smoke') {
  for (let i = 0; i < 7; i++) {
    const k = frac(t * .18 + i / 7), px = x + 30 * Math.sin(t * .7 + i * 1.7) * k + 40 * k * k, py = y - h * k, r = 18 + 60 * k;
    boilSeed(key + i);
    paint(ellPts(px, py, r, r * .8, 14, 2), { wash: col, washOp: a * Math.sin(k * Math.PI), ink: null });
  }
}
// A boulder: one lumpy outline with a lit top and a crack or two.
function boulder(x, y, w, h, col = '#9C8A74', key = 'rock') {
  boilSeed(key);
  const P = [[x - w * .5, y], [x - w * .48, y - h * .45], [x - w * .3, y - h * .9], [x, y - h], [x + w * .28, y - h * .92], [x + w * .5, y - h * .5], [x + w * .52, y]];
  paint(through([...P, P[0]], 3), { wash: col, fill: mixCol(col, PAL.ink, .35), fillOp: 90, bleed: .08, tex: .8, ink: PAL.ink, sw: 1.1 });
  paint(through([[x - w * .3, y - h * .82], [x, y - h * .93], [x + w * .25, y - h * .84], [x, y - h * .7]], 3), { wash: mixCol(col, PAL.cream, .3), washOp: 200, ink: null });
  inkLine([[x - w * .1, y - h * .6], [x, y - h * .4], [x - w * .05, y - h * .2]], .8, mixCol(col, PAL.ink, .6), 'inkfine', .3);
}
// A drifting spark of light (a flying ember) at (x, y).
function spark(x, y, r, t, a = 1) {
  glow(x, y, r * 6, '#FFC766', a);
  paint(starPts(x, y, r * (1 + .2 * Math.sin(t * 30)), .35, 4, t * 3), { wash: MT.flameY, washOp: 255 * clamp(a), ink: null });
}
// Walk pose for a lamp-carrier in profile: stroll() gives the path, the mood gives the face and a softened body.
function walkPose(mood, w, u) { return { ...mood, view: 'side', flip: w.flip, walk: w.walk, dy: (mood.dy || 0) * .3 + w.dy, aL: .15 + .05 * Math.sin(w.walk * TAU) }; }

// The seven shepherds: seven bright stars in a gentle arc, each lit by k[i] (0..1). Default arc spans the sky.
function sevenStars(t, k, sc = 1, x0 = 360, y0 = 120, w = 1200) {
  for (let i = 0; i < 7; i++) {
    const kk = typeof k === 'number' ? k : k[i]; if (!(kk > 0)) continue;
    const x = x0 + i * w / 6, y = y0 + 60 * sc * Math.pow((i - 3) / 3, 2) - 20 * sc, r = 22 * sc * backOut(clamp(kk)) * (1 + .08 * Math.sin(t * 3 + i));
    boilSeed('seven' + i);
    glow(x, y, r * 6, '#E8EEFF', .8 * clamp(kk));
    paint(starPts(x, y, r, .3, 4), { wash: '#FFF8E6', ink: null });
    paint(starPts(x, y, r * .55, .3, 4, Math.PI / 4 - Math.PI / 2), { wash: '#FFF8E6', ink: null });
  }
}
