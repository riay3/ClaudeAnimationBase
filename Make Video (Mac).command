#!/bin/bash
# Double-click this file to make the Maoz Tzur video. (The first time, macOS may refuse: right-click it and choose Open.)
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js isn't installed yet. Opening its download page: install the \"LTS\" version, then double-click this again."
  open "https://nodejs.org/en/download"
  read -n 1 -s -r -p "Press any key to close this window."
  exit 1
fi
node make-video.mjs "$@"
echo
read -n 1 -s -r -p "Press any key to close this window."
