# Trimsalon Aubain — website

Simpele, statische website (HTML/CSS/JS, geen build-stap nodig) voor Trimsalon Aubain in Brugge.

## Bestanden aanpassen

- `index.html` — tekst, diensten, prijzen, contactgegevens
- `css/style.css` — kleuren, lettertypes, layout
- `js/main.js` — mobiel menu + jaartal in footer
- `images/` — plaats hier je eigen voor/na-foto's (zie `images/LEESMIJ.txt`)

Diensten en prijzen in `index.html` zijn **voorbeeldprijzen** — pas ze aan naar je eigen tarieven.
Openingsuren zijn een inschatting op basis van je Instagram — check en corrigeer deze in de sectie "Contact".

## Lokaal bekijken

Dubbelklik op `index.html`, of run in deze map:

```bash
python3 -m http.server 8000
```

en open `http://localhost:8000`.

## Naar GitHub pushen

```bash
cd trimsalon-aubain
git init
git add .
git commit -m "Eerste versie site Trimsalon Aubain"
git branch -M main
git remote add origin https://github.com/<jouw-gebruikersnaam>/trimsalon-aubain.git
git push -u origin main
```

Maak de repo eerst aan op github.com (New repository → geen README/gitignore aanvinken, die heb je al).

## Deployen op Vercel

1. Log in op [vercel.com](https://vercel.com) met je GitHub-account.
2. Klik **Add New → Project**.
3. Selecteer de `trimsalon-aubain` repo.
4. Framework preset: **Other** (het is een statische site, geen build-commando nodig).
5. Klik **Deploy**.

Na een minuut krijg je een live URL zoals `trimsalon-aubain.vercel.app`. Bij elke `git push` naar `main` deployt Vercel automatisch de nieuwe versie.

### Eigen domeinnaam (optioneel)

In het Vercel-dashboard van je project: **Settings → Domains** → voeg je eigen domein toe (bv. `trimsalonaubain.be`) en volg de DNS-instructies.
