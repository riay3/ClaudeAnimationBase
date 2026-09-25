// config.js: project settings.
//   duration: the video's length in seconds.
//   bpm:      the rhythm that bounces, dances and pulse() follow. Clawd always moves to some beat; if the video has music,
//             set this to the song's tempo, and set offset to the time in seconds of its first downbeat.
// Maoz Tzur (electric guitar cover): 104 bpm, first downbeat at 3.808 s (beat-tracked; see BEATS in mt_common.js).
const PROJECT = { duration: 362.6, bpm: 103.99, offset: 3.808, audio: 'assets/maoz_tzur.mp3' };
