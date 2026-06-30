# Safety4Car – App Store Plan

## Übersicht

Plan für die Veröffentlichung der Safety4Car Mobile App im Apple App Store und Google Play Store.

---

## App-Informationen

| Feld              | Wert                                      |
| ----------------- | ----------------------------------------- |
| App Name          | Safety4Car                                |
| Bundle ID (iOS)   | com.safety4car.app                        |
| Package (Android) | com.safety4car.app                        |
| Kategorie         | Automobile / Utilities                    |
| Sprache           | Deutsch (primär), Englisch (geplant)      |
| Altersfreigabe    | 4+ (iOS) / Everyone (Android)            |
| Preis             | Kostenlos                                 |

---

## App Store Beschreibung

### Kurzbeschreibung (80 Zeichen)

> Gebrauchtwagen-Checks digital buchen und verwalten.

### Langbeschreibung

> Safety4Car – Ihre digitale Plattform für professionelle Gebrauchtwagen-Checks.
>
> Buchen Sie einen Fahrzeugcheck, wählen Sie aus drei Prüfpaketen und erhalten Sie einen detaillierten Prüfbericht mit Risikoeinschätzung.
>
> Funktionen:
> • Einfache Buchung in wenigen Schritten
> • Drei Prüfpakete: Self-Check, Basic Check, Premium Check
> • Status-Tracking Ihres Auftrags in Echtzeit
> • Detaillierter Prüfbericht mit Fotos
> • Risikoeinschätzung und Empfehlungen
> • Direkter Support-Kanal
>
> Für Inspektoren:
> • Auftragsmanagement
> • Digitale Checkliste
> • Foto-Dokumentation
> • Auszahlungsübersicht
>
> Hinweis: Safety4Car ist keine Werkstatt, keine amtliche Prüfstelle und kein TÜV-Ersatz.

---

## Screenshots (geplant)

| Nr | Screen                  | Beschreibung                    |
| -- | ----------------------- | ------------------------------- |
| 1  | Landing / Rollenauswahl | Einstiegsscreen                 |
| 2  | Paketauswahl            | Drei Prüfpakete                 |
| 3  | Buchungsflow            | Fahrzeugdaten eingeben          |
| 4  | Kundendashboard         | Auftragsübersicht               |
| 5  | Auftragsdetail          | Timeline & Status               |
| 6  | Prüfbericht             | Findings & Risikoeinschätzung   |

---

## EAS Build Konfiguration

### Voraussetzungen

- Expo Account
- Apple Developer Account (99 USD/Jahr)
- Google Play Developer Account (25 USD einmalig)
- EAS CLI installiert (`npm install -g eas-cli`)

### eas.json (geplant)

```json
{
  "cli": {
    "version": ">= 12.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "developer@safety4car.de",
        "ascAppId": "TBD",
        "appleTeamId": "TBD"
      },
      "android": {
        "serviceAccountKeyPath": "./google-services.json",
        "track": "production"
      }
    }
  }
}
```

---

## Release-Plan

### Phase 1: Internal Testing

- [ ] EAS Build für iOS Simulator & Android Emulator
- [ ] Internes Testing via TestFlight (iOS) und Internal Testing (Android)
- [ ] Bug-Fixes und UX-Verbesserungen

### Phase 2: Beta

- [ ] TestFlight Beta (externe Tester)
- [ ] Google Play Open Testing
- [ ] Feedback sammeln und einarbeiten

### Phase 3: Production Release

- [ ] App Store Review einreichen
- [ ] Google Play Review einreichen
- [ ] Marketing-Materialien vorbereiten
- [ ] Launch

---

## Review-Hinweise

### Apple App Store

- Demo-Account bereitstellen für Review
- Keine irreführenden Gesundheits-/Sicherheitsversprechen
- Datenschutzerklärung erforderlich
- App Tracking Transparency (ATT) wenn Tracking verwendet

### Google Play

- Datenschutzerklärung erforderlich
- Content Rating Fragebogen ausfüllen
- Target API Level muss aktuell sein

---

## Datenschutz

| Datentyp          | Erhoben | Zweck              |
| ----------------- | ------- | ------------------ |
| E-Mail            | Ja      | Account            |
| Name              | Ja      | Personalisierung   |
| Telefon           | Optional| Kontakt            |
| Fahrzeugdaten     | Ja      | Prüfung            |
| Standort          | Nein    | –                  |
| Fotos             | Ja*     | Inspektion         |

*Nur Inspektoren laden Fotos hoch.

---

## Versioning

- Semantic Versioning: `MAJOR.MINOR.PATCH`
- Build Number: Auto-Increment via EAS
- Erste Version: `1.0.0`

---

## Kosten

| Posten                      | Kosten           |
| --------------------------- | ---------------- |
| Apple Developer Program     | 99 USD/Jahr      |
| Google Play Developer       | 25 USD (einmalig)|
| EAS Build (Free Tier)       | 0 USD            |
| EAS Build (Production)      | ~99 USD/Monat    |
