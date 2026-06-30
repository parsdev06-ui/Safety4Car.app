# Safety4Car – Design System

## Design-Philosophie

Safety4Car ist ein **Trust-System**, kein Auto-Marktplatz.

Die UI muss **premium, ruhig, technisch und vertrauenswürdig** wirken.

### Nicht erlaubt

- Keine Werkstatt-Ästhetik
- Keine Fake-TÜV-Optik
- Kein Angstmarketing
- Keine Garantiesprache
- Keine überladenen Seiten

### Design-Vorbilder

| Vorbild     | Was wir übernehmen                      |
| ----------- | --------------------------------------- |
| Apple       | Calm premium surfaces                   |
| Stripe      | Trust and conversion clarity            |
| Linear      | Dashboard precision                     |
| Material 3  | Clarity for Android logic (later)       |

---

## Rollenspezifisches Design

### Public Pages (Marketing)

- Große, klare Hero-Section
- Paketvergleich mit klarer Differenzierung
- Prozess in 3–4 Schritten erklärt
- Klare CTAs ohne Druck
- Beispielreport als Preview
- Vertrauen ohne falsche Garantien

### Customer App

- Geführter Booking Flow mit wenigen Feldern pro Schritt
- Progress/Stepper sichtbar
- Status Timeline verständlich
- Report: zuerst verständlich, dann detailliert
- Mobile-first

### Inspector App

- Operational, nicht dekorativ
- Checkliste schnell bedienbar
- Pflichtfelder sichtbar markiert
- Sticky Submit Action
- Foto-Upload als klarer Mock
- Kein unnötiges Design – Funktion zuerst

### Admin

- Desktop-first und data-first
- Tabellen und Filter
- StatusBadges durchgängig
- Side Panels oder Detailseiten
- Kritische Aktionen visuell getrennt
- Keine Marketing-Optik im Admin

### Customer Success

- Kontext schnell sichtbar
- Customer + Order + Complaint in einer Ansicht
- Ticketstatus klar
- Interne Notizen getrennt von Kundennachrichten
- Schnelle Kontaktaktionen

---

## Komponentenregeln

### Cards

- Weißer Hintergrund (`Surface`)
- Subtiler Border (`Border`)
- Border Radius: `lg`
- Padding: `md` bis `lg`

### Badges

- Farbcodiert nach Status/Risk Level
- Abgerundete Ecken (`full`)
- Font-weight: 500
- Konsistente Farbpalette über alle Rollen

### Tabellen

- Zebra-Striping optional
- Hover-State für Zeilen
- Sortierbare Spaltenheader wo sinnvoll
- Responsive: Card-View auf Mobile

### Formulare

- Ein Label pro Feld
- Placeholder als Beispiel, nicht als Label-Ersatz
- Fehlerhinweise unter dem Feld
- Pflichtfelder mit Stern markiert

### Reports

- Verständliche Zusammenfassung oben
- Detailbereiche ausklappbar
- Risiko-Level prominent sichtbar
- Fotos als Grid
- Disclaimer immer sichtbar

---

## Responsive Breakpoints

| Name   | Breite   | Ziel                |
| ------ | -------- | ------------------- |
| Mobile | < 640px  | Smartphones         |
| Tablet | 640–1024px| Tablets             |
| Desktop| > 1024px | Desktop Anwendungen |

- Public Pages: Mobile-first
- Admin/CS: Desktop-first
- Inspector: Mobile-optimiert (Nutzung vor Ort)
