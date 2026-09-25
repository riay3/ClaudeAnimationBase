// make-video.mjs: renders the whole video, start to finish, with one command. It sets everything up, finds the song,
// picks the best graphics card Chrome can use, renders every frame (resumable: run it again and it carries on where
// it stopped), adds the music, and opens the finished video.
//
//   node make-video.mjs                 the whole video → out/Maoz_Tzur.mp4
//   node make-video.mjs --test          a 3-second sample first (out/test.mp4), to check everything works
//   node make-video.mjs --workers=2     fewer frames at once (if the computer struggles), or more (if it's idle)
//   node make-video.mjs --song=<file>   use this MP3 (otherwise: the MP3 in this folder, next to the launchers)
//   node make-video.mjs --yes           don't ask questions; take the default answer
//
// Double-click "Make Video (Mac).command" or "Make Video (Windows).bat" to run it without typing anything.
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readdirSync, copyFileSync, mkdirSync, readFileSync, writeFileSync, rmSync, statSync } from 'node:fs';
import { join, resolve, basename, dirname } from 'node:path';
import { homedir, cpus, platform } from 'node:os';
import { createHash } from 'node:crypto';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

process.chdir(fileURLToPath(new URL('.', import.meta.url)));
const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const OS = platform(), WIN = OS === 'win32', MAC = OS === 'darwin';
const SONG = 'assets/maoz_tzur.mp3', OUT = 'out/Maoz_Tzur.mp4', FRAMES = 'out/frames';
const say = (...m) => console.log(...m), step = (n, m) => say(`\n\x1b[1m[${n}/6] ${m}\x1b[0m`);
const fail = m => { say(`\n\x1b[31m✗ ${m}\x1b[0m`); process.exit(1); };
const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = async (q, def = 'y') => args.yes ? def : ((await rl.question(q)).trim() || def);
// Windows runs npm/npx (.cmd files) only through the shell, which splits on spaces: quote anything with a space in it.
// Everything else (node itself, at a path like C:\Program Files\nodejs\node.exe) runs directly, with no shell.
const q = x => /[\s&()^]/.test(x) ? `"${x}"` : x;
const viaShell = cmd => WIN && /\.cmd$/i.test(cmd);
const shellArgs = (cmd, a) => viaShell(cmd) ? [q(cmd), a.map(q), { shell: true }] : [cmd, a, {}];
const run = (cmd, a, o = {}) => new Promise((ok, bad) => { const [c, aa, so] = shellArgs(cmd, a); const p = spawn(c, aa, { stdio: 'inherit', ...so, ...o }); p.on('error', bad); p.on('close', code => code ? bad(new Error(`${basename(cmd)} exited with code ${code}`)) : ok()); });
// npm and npx sit next to the node that's running this, so use those rather than relying on the PATH
const nodeTool = name => { const p = join(dirname(process.execPath), WIN ? name + '.cmd' : name); return existsSync(p) ? p : WIN ? name + '.cmd' : name; };
// the running node's folder goes first on the PATH, so npm's own install scripts find node too
process.env.PATH = dirname(process.execPath) + (WIN ? ';' : ':') + process.env.PATH;

say('\x1b[1mMaoz Tzur: making the video\x1b[0m  (you can close this window at any time; run it again to continue)');

// ---------- 1. the tools ----------
step(1, 'Checking the tools');
const major = +process.versions.node.split('.')[0];
if (major < 18) fail(`This needs Node.js 18 or newer (you have ${process.versions.node}). Get it from https://nodejs.org (the "LTS" button), then run this again.`);
say(`  Node.js ${process.versions.node} ✓`);
if (!existsSync('node_modules/puppeteer-core') || !existsSync('node_modules/p5.brush') || !existsSync('node_modules/ffmpeg-static')) {
  say('  Installing the parts it needs (one time, a minute or two)…');
  await run(nodeTool('npm'), ['install', '--no-audit', '--no-fund']).catch(e => fail(`Installing failed (${e.message}). Check your internet connection and run this again.`));
}
say('  Parts installed ✓');

// ---------- 2. the song ----------
step(2, 'Finding the song');
const clean = p => p.trim().replace(/^['"]|['"]$/g, '').replace(/\\ /g, ' ');
// The song is the MP3 you put in this folder, next to the launchers. Nothing else on the computer is searched, so a
// different recording of Maoz Tzur in Downloads can't be picked by mistake.
const HERE = resolve('.');
let song = args.song ? clean(String(args.song)) : null;
while (!song) {
  const mp3s = readdirSync('.').filter(f => /\.mp3$/i.test(f));
  if (mp3s.length === 1) song = mp3s[0];
  else if (mp3s.length > 1) {
    if (args.yes) fail(`There are ${mp3s.length} MP3s in ${HERE}. Leave only the one to use, or run with --song=<file>.`);
    say(`  There are ${mp3s.length} MP3 files in this folder:`); mp3s.forEach((f, i) => say(`    ${i + 1}. ${f}`));
    const n = +(await rl.question('  Type the number of the one to use and press Enter: ')).trim();
    if (n >= 1 && n <= mp3s.length) song = mp3s[n - 1];
  } else {
    if (args.yes) fail(`No MP3 in ${HERE}. Put the song's MP3 in that folder and run this again.`);
    await rl.question(`  Put the Maoz Tzur MP3 into this folder (the one with the "Make Video" launchers):\n    ${HERE}\n  then press Enter here. `);
  }
}
if (!existsSync(song)) fail(`Can't find ${song}.`);
// the renderer reads the song from assets/maoz_tzur.mp3: always refresh that copy from the one chosen here
if (resolve(song) !== resolve(SONG)) { mkdirSync('assets', { recursive: true }); copyFileSync(song, SONG); }
say(`  Song ✓ ${basename(song)}`);

// ---------- 3. a browser to paint in ----------
step(3, 'Finding Chrome');
const chromes = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  join(homedir(), 'AppData/Local/Google/Chrome/Application/chrome.exe'), '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Chromium.app/Contents/MacOS/Chromium', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'];
let chrome = chromes.find(p => p && existsSync(p));
if (!chrome) {
  const dir = resolve('.chrome');
  say('  Chrome isn\'t installed, so downloading a private copy for this (one time, ~150 MB)…');
  const [c, aa, so] = shellArgs(nodeTool('npx'), ['--yes', '@puppeteer/browsers', 'install', 'chrome@stable', '--path', dir]);
  const r = spawnSync(c, aa, { encoding: 'utf8', ...so });
  chrome = (r.stdout || '').trim().split('\n').pop()?.split(' ').slice(1).join(' ');
  if (!chrome || !existsSync(chrome)) fail('Couldn\'t get Chrome. Install Google Chrome from https://www.google.com/chrome and run this again.');
}
process.env.CHROME_PATH = chrome;
say(`  Chrome ✓ (${chrome})`);

// ---------- 4. the graphics card ----------
step(4, 'Choosing the graphics card');
const puppeteer = (await import('puppeteer-core')).default;
// the same Chrome switches render.mjs uses for each option
const base = [...(OS === 'linux' ? ['--no-sandbox'] : []), '--allow-file-access-from-files', '--ignore-gpu-blocklist', '--enable-gpu-rasterization'];
const plat = WIN ? ['--use-angle=d3d11'] : MAC ? ['--use-angle=metal'] : ['--use-gl=angle'];
const options = [{ flags: [], chrome: plat }];
if (OS === 'linux') options.push({ flags: ['--gpu-angle=vulkan'], chrome: ['--use-angle=vulkan', '--enable-features=Vulkan'] }, { flags: ['--gpu-angle=gl-egl'], chrome: ['--use-angle=gl-egl'] });
const software = /swiftshader|llvmpipe|software|no webgl/i;
async function probe(extra) {
  let b;
  try {
    b = await puppeteer.launch({ executablePath: chrome, headless: true, args: [...base, ...extra] });
    const p = await b.newPage();
    return await p.evaluate(() => { const gl = document.createElement('canvas').getContext('webgl2') || document.createElement('canvas').getContext('webgl'); if (!gl) return 'no WebGL'; const e = gl.getExtension('WEBGL_debug_renderer_info'); return e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER); });
  } catch (e) { return 'no WebGL (' + e.message.split('\n')[0] + ')'; } finally { await b?.close(); }
}
let gpu = null, gpuName = '';
if (!args['soft-gl']) for (const o of options) { const name = await probe(o.chrome); say(`  tried ${o.flags.join(' ') || 'the default'}: ${name}`); if (!software.test(name)) { gpu = o; gpuName = name; break; } }
if (gpu) {
  say(`  Using: \x1b[1m${gpuName}\x1b[0m ✓`);
  if (/intel|uhd|iris/i.test(gpuName) || (MAC && !/amd|radeon|nvidia|geforce|apple/i.test(gpuName)))
    say('  (That looks like the built-in graphics, not your external GPU. See HOW_TO_RENDER.md, "Using the external GPU",\n   to point Chrome at the eGPU, then run this again. It will still work as is, only slower.)');
} else {
  say('  \x1b[33mChrome can\'t use a graphics card here, so it would paint in software: that works, but it takes many hours\n  for the whole video.\x1b[0m See HOW_TO_RENDER.md, "Using the external GPU".');
  if (!/^y/i.test(await ask('  Carry on in software anyway? [y/N] ', args.yes ? 'y' : 'n'))) process.exit(0);
  gpu = { flags: ['--soft-gl'] };
}
const workers = String(args.workers || (gpu.flags[0] === '--soft-gl' ? Math.max(1, cpus().length - 1) : 4));

// ---------- a quick sample, if asked (or offered the first time) ----------
const fresh = !existsSync(FRAMES) || !readdirSync(FRAMES).some(f => f.endsWith('.jpg'));
if (!args.test && fresh && !args.yes && /^y/i.test(await ask('\n  First time: make a 3-second sample to check that it all works? [Y/n] ', 'y'))) {
  step(5, 'Rendering a 3-second sample');
  await run(process.execPath, ['render.mjs', '--clip', '--range=50:53', '--out=out/test.mp4', ...gpu.flags]).catch(e => fail(e.message));
  say(`  Opening the sample (${resolve('out/test.mp4')})…`); openFile('out/test.mp4');
  if (!/^y/i.test(await ask('  Does it look and sound right? Make the whole video now? [Y/n] ', 'y'))) { rl.close(); process.exit(0); }
}
if (args.test) {
  step(5, 'Rendering a 3-second sample');
  await run(process.execPath, ['render.mjs', '--clip', `--range=${args.range || '50:53'}`, '--out=out/test.mp4', ...gpu.flags, ...(args.fast ? ['--fast'] : [])]).catch(e => fail(e.message));
  step(6, 'Done');
  say(`  Sample: ${resolve('out/test.mp4')}\n  If it looks and sounds right, run this again without --test (or double-click the launcher) for the whole video.`);
  openFile('out/test.mp4'); rl.close(); process.exit(0);
}

// ---------- 5. every frame ----------
step(5, 'Painting every frame (the long part; it shows progress and time left)');
// frames left over from a different version of the video would be stitched in by mistake: start fresh if the scenes changed
const stamp = createHash('sha1');
for (const f of ['studio.html', 'src/config.js', 'src/core.js', 'src/clawd.js', 'src/timeline.js', ...readdirSync('src/scenes').map(f => 'src/scenes/' + f)]) stamp.update(readFileSync(f));
const id = stamp.digest('hex'), stampFile = join(FRAMES, '.version');
if (existsSync(FRAMES) && (!existsSync(stampFile) || readFileSync(stampFile, 'utf8') !== id) && readdirSync(FRAMES).some(f => f.endsWith('.jpg'))) {
  say('  Clearing frames from an older version of the video…'); rmSync(FRAMES, { recursive: true, force: true });
}
mkdirSync(FRAMES, { recursive: true }); writeFileSync(stampFile, id);
say(`  ${workers} frames at a time. You can stop at any point (close the window) and run this again to carry on.`);
const frames = w => run(process.execPath, ['render.mjs', '--frames', `--workers=${w}`, ...gpu.flags, ...(args.fast ? ['--fast'] : [])]);
await frames(workers).catch(async e => {
  if (+workers <= 1) fail(`Rendering stopped: ${e.message}. Run this again to carry on from where it stopped.`);
  const fewer = String(Math.max(1, Math.floor(+workers / 2)));
  say(`\n  Rendering stopped (${e.message}). Carrying on with ${fewer} at a time, which is easier on the computer…`);
  await frames(fewer).catch(e2 => fail(`Rendering stopped again: ${e2.message}. Run this again to carry on from where it stopped.`));
});

// ---------- 6. the music, and done ----------
step(6, 'Adding the music');
await run(process.execPath, ['render.mjs', '--encode', `--audio=${SONG}`, `--out=${OUT}`]).catch(e => fail(e.message));
say(`\n\x1b[32m✓ Finished: ${resolve(OUT)}\x1b[0m`);
openFile(OUT); rl.close();

function openFile(f) {
  if (args.yes) return;
  const p = resolve(f);
  try { if (WIN) spawn('cmd', ['/c', 'start', '', p], { detached: true, stdio: 'ignore' }); else spawn(MAC ? 'open' : 'xdg-open', [p], { detached: true, stdio: 'ignore' }).on('error', () => {}); } catch {}
}
