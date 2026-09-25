#!/bin/bash
# Double-click this file to make the Maoz Tzur video. (The first time, macOS may refuse: right-click it and choose Open.)
cd "$(dirname "$0")"
# Find node: on the PATH, or where the Node.js installer, Homebrew or nvm put it (a window opened by double-clicking
# doesn't always see those on the PATH).
NODE="$(command -v node)"
for p in /usr/local/bin/node /opt/homebrew/bin/node "$HOME"/.nvm/versions/node/*/bin/node "$HOME"/.volta/bin/node; do
  [ -z "$NODE" ] && [ -x "$p" ] && NODE="$p"
done
if [ -z "$NODE" ]; then
  echo "Node.js was not found on this computer. Opening its download page: install the \"LTS\" version, then double-click this again."
  open "https://nodejs.org/en/download"
  read -n 1 -s -r -p "Press any key to close this window."
  exit 1
fi
export PATH="$(dirname "$NODE"):$PATH"
"$NODE" make-video.mjs "$@"
echo
read -n 1 -s -r -p "Press any key to close this window."
