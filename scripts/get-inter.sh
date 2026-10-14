#!/usr/bin/env bash
# Lädt die Inter-Variable-Schrift (Latin-Subset, ca. 50 KB) für das Self-Hosting.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p static/fonts
curl -fL "https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5/files/inter-latin-wght-normal.woff2" \
  -o static/fonts/inter-latin-wght-normal.woff2
echo "Inter gespeichert in static/fonts/ (Lizenz: SIL OFL 1.1)"
