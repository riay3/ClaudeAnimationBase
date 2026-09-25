# How to make the video file

The project is a set of instructions for painting the video one frame at a time. "Rendering" means letting your computer paint all ~8,700 frames and stitch them together with the music into one MP4 file. There's a launcher that does all of it for you. You only need to set it up once.

## 1. Get the project onto your computer

1. Open this link to download the project as a ZIP file:
   https://github.com/riay3/ClaudeAnimationBase/archive/refs/heads/claude/focused-ritchie-wpfp57.zip
2. Unzip it: double-click the ZIP. You get a folder named something like `ClaudeAnimationBase-claude-focused-ritchie-wpfp57`. Put it anywhere you like, such as your Desktop.

## 2. Install Node.js (one time)

Node.js is the free program that runs the launcher.

1. Go to https://nodejs.org and click the big **LTS** download button.
2. Open the file you downloaded and click through the installer, accepting the defaults.

You also need **Google Chrome**. You probably have it already. If you don't, the launcher downloads a private copy just for this.

## 3. The song

Keep the Maoz Tzur MP3 in your **Downloads** folder (or your Desktop or Music folder). The launcher finds it by its name. If it can't find it, it asks you to drag the file into its window. You can also copy it into the project's `assets` folder yourself and name it `maoz_tzur.mp3`.

## 4. Double-click the launcher

In the project folder:

- **Mac:** double-click **`Make Video (Mac).command`**.
  The first time, macOS may say it "can't be opened because it is from an unidentified developer". If it does, right-click the file, choose **Open**, then **Open** again.
- **Windows:** double-click **`Make Video (Windows).bat`**.
  If Windows says "Windows protected your PC", click **More info**, then **Run anyway**.
- **Linux:** open a terminal in the folder and type `node make-video.mjs`.

A window opens and works through six steps:

1. **Checking the tools.** The first time, it installs the parts it needs, which takes a minute or two.
2. **Finding the song.**
3. **Finding Chrome.**
4. **Choosing the graphics card.** It shows which graphics card it will use. Check that it names your external GPU; if it doesn't, see below.
5. **Painting every frame.** This is the long part. The window shows how many frames are done and an estimate of the time left. The first time, it offers to make a 3-second sample first. Say yes: you'll see and hear a short clip, which confirms everything works before the long run.
6. **Adding the music.** When it finishes, the video opens on its own.

The finished video is **`out/Maoz_Tzur.mp4`** inside the project folder.

**You can stop at any time.** Close the window, or put the computer to sleep. Double-click the launcher again later and it carries on from where it stopped; nothing already painted is lost.

## Using the external GPU

The launcher prints the name of the graphics card Chrome is using. If it names your built-in graphics (for example "Intel UHD" or "Intel Iris") instead of the eGPU, the video still renders, just more slowly. To switch to the eGPU:

- **Windows:** open **Settings → System → Display → Graphics**. Click **Browse** (or "Add an app") and choose `C:\Program Files\Google\Chrome\Application\chrome.exe`. Click it, choose **Options → High performance**, and pick your eGPU. Then run the launcher again.
- **Mac (Intel Macs with an eGPU):** quit Chrome. In **Applications**, right-click **Google Chrome**, choose **Get Info**, tick **Prefer External GPU**, and close the window. Then run the launcher again. It also helps to have your monitor plugged into the eGPU itself.
- **Linux:** the launcher tries each way of reaching the graphics card by itself.

If it says Chrome "can't use a graphics card here", it can still paint in software, but the whole video would take many hours.

## If something goes wrong

- **"Node.js isn't installed yet":** do step 2, then double-click the launcher again.
- **It stops partway:** double-click the launcher again and it continues. If the computer is struggling, it automatically switches to painting fewer frames at a time.
- **The video has no sound:** the song wasn't found. Put the MP3 in `assets` named `maoz_tzur.mp3` and run the launcher again. The frames are already done, so this step is quick.
- **You changed the animation's code:** the launcher notices and repaints from the start, so old frames aren't mixed with new ones.

For people comfortable with a terminal: `node make-video.mjs --test` makes only the sample, and `--workers=N` sets how many frames are painted at once (the default is 4). Everything underneath is `render.mjs`; see ANIMATION_GUIDE.md.
