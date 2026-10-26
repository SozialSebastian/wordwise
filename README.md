# Wordwise – Englisch lernen

Web-App (PWA) fürs iPhone: Vokabeltrainer mit automatischer Wortsuche, Übungen im Duolingo-Stil (ohne Spielereien) und Grammatik B1–C1.

## Online stellen (GitHub Pages)

1. Neues Repository anlegen, z. B. `wordwise`.
2. Alle Dateien aus diesem Ordner hochladen (Struktur beibehalten: `index.html`, `styles.css`, `sw.js`, `manifest.webmanifest`, `js/`, `icons/`).
3. Repository → Settings → Pages → Source: „Deploy from a branch“, Branch `main`, Ordner `/ (root)`.
4. Nach ca. einer Minute: `https://<benutzername>.github.io/wordwise/` in Safari öffnen → Teilen → „Zum Home-Bildschirm“.

## Aufbau

| Datei | Inhalt |
|---|---|
| `js/data.js` | Grammatikthemen (Erklärung + Aufgaben) und Startpaket-Vokabeln – hier lassen sich Inhalte ergänzen |
| `js/app.js` | App-Logik: Wiederholungssystem, Übungstypen, Wortsuche, Speicher |
| `sw.js` | Offline-Cache. Bei Änderungen `CACHE = 'wordwise-v2'` hochzählen |

## Automatische Wortsuche

- Bedeutungen, Beispielsätze, Lautschrift, Audio, Synonyme: [Free Dictionary API](https://dictionaryapi.dev) (ohne Schlüssel)
- Übersetzungen EN↔DE: [MyMemory](https://mymemory.translated.net) (ca. 5.000 Zeichen/Tag frei, mit E-Mail in den Einstellungen 50.000)

## Daten

Alles liegt lokal im Browser-Speicher des iPhones. Backup über „Mehr → Backup exportieren“.

## Übungstypen

Vokabeln: Bedeutung wählen (EN→DE, DE→EN), Übersetzen, Lückentext (Auswahl/Tippen), Definition zuordnen, Hören & Schreiben, Diktat, Satz bauen, Paare finden.
Grammatik: Lücke füllen, Auswahl, Fehler finden + korrigieren, Satz bauen, Umformen.

Wiederholung nach Leitner-System: Intervalle 1, 2, 4, 8, 16, 35, 75 Tage; falsche Antworten fallen zurück und kommen am Ende der Lektion noch einmal.
