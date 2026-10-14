# kubikmeterberechnen.github.io (Hugo)

## Lokal starten
1. Hugo installieren (Standard- oder Extended-Version, ab 0.120).
2. Schrift laden: `./scripts/get-inter.sh` (legt Inter nach `static/fonts/` ab).
3. `hugo server` und im Browser http://localhost:1313 öffnen.

## Vor dem Veröffentlichen ersetzen (TODO)
- `data/author.yaml`: echter Name, Rolle, Bio, `sameAs`-Profile
- `content/impressum.md`, `datenschutz.md`, `kontakt.md`: Platzhalter und E-Mail
- `static/og-image.png`, `static/logo-512.png`: eigene Grafiken (optional)

## Deployment (erst nach dem lokalen Test)
1. Repo `kubikmeterberechnen.github.io` im Account/in der Org `kubikmeterberechnen` anlegen.
2. Pushen auf `main`. Settings > Pages > Source: GitHub Actions.
3. `public/sitemap.xml` in Google Search Console und Bing Webmaster Tools einreichen.
