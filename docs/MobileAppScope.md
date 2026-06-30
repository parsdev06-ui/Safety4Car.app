# Safety4Car – Mobile App Scope

## Übersicht

Die Safety4Car Mobile App ist eine native iOS/Android App auf Basis von Expo React Native.
Sie bietet Customer- und Inspector-Flows als mobile-first Erfahrung.

---

## Tech-Stack

| Technologie       | Zweck                          |
| ----------------- | ------------------------------ |
| Expo SDK 57       | React Native Framework         |
| TypeScript        | Type Safety                    |
| Expo Router       | File-based Navigation          |
| NativeWind        | Tailwind CSS für React Native  |
| React Hook Form   | Formularvalidierung            |
| Zod               | Schema-Validierung             |
| @expo/vector-icons| Icons (Ionicons)               |

---

## Architektur

```
apps/mobile/
  app/
    _layout.tsx           # Root Layout (Stack)
    index.tsx             # Entry / Rollenauswahl
    (auth)/
      _layout.tsx         # Auth Stack
      login.tsx           # Kunden-Login
      login-inspector.tsx # Inspektor-Login
      register.tsx        # Registrierung
    (customer)/
      _layout.tsx         # Customer Tabs
      dashboard.tsx       # Kundendashboard
      packages.tsx        # Paketauswahl
      booking.tsx         # Buchungsflow (Multi-Step)
      orders.tsx          # Auftragsliste
      order-detail.tsx    # Auftragsdetail + Timeline
      report.tsx          # Prüfbericht
      support.tsx         # Support/Beschwerde
    (inspector)/
      _layout.tsx         # Inspector Tabs
      dashboard.tsx       # Inspektor-Dashboard
      orders.tsx          # Auftragsliste
      order-detail.tsx    # Auftragsdetail
      inspection.tsx      # Checkliste + Fotos
      payouts.tsx         # Auszahlungsübersicht
  src/
    components/           # Wiederverwendbare UI-Komponenten
    lib/
      mock-data.ts        # Statische Mock-Daten
    types/
      index.ts            # TypeScript Interfaces
    constants/
      colors.ts           # Brand-Farben
```

---

## Customer Flow

1. **Login/Register** – Mock-Authentifizierung
2. **Dashboard** – Übersicht aktiver Aufträge
3. **Paket-Auswahl** – Self-Check / Basic / Premium
4. **Buchung** – Fahrzeugdaten → Termin → Bestätigung
5. **Auftragsdetail** – Status-Timeline
6. **Report** – Prüfbericht mit Findings & Risiko
7. **Support** – Beschwerde einreichen

## Inspector Flow

1. **Login** – Mock-Authentifizierung
2. **Dashboard** – Übersicht, Stats, nächste Termine
3. **Auftragsliste** – Zugewiesene Aufträge
4. **Auftragsdetail** – Fahrzeug & Termin
5. **Inspektion** – Checkliste mit Kategorien, Foto-Mock, Notizen
6. **Einreichen** – Inspektion abschließen
7. **Auszahlungen** – Payout-Übersicht

---

## Was NICHT enthalten ist

- ❌ Backend-Anbindung / API Calls
- ❌ Echte Authentifizierung (JWT/OAuth)
- ❌ Stripe Payment Integration
- ❌ Push Notifications
- ❌ Admin Mobile Dashboard
- ❌ Echte Datei-Uploads
- ❌ PDF-Export
- ❌ Internationalisierung

---

## Mock-Daten

Alle Daten sind statisch in `src/lib/mock-data.ts` definiert.
Die Types werden in `src/types/index.ts` geteilt.
Es werden keine echten API-Calls ausgeführt.

---

## Design-Grundsätze

- **Mobile-first** für alle Screens
- **Premium, ruhig, technisch** – kein Angstmarketing
- **Safety4Car Brand Colors** aus BrandGuidelines.md
- **Inter Font** (System Fallback)
- **4px Grid** für Spacing
- **12px Border Radius** für Cards/Buttons
- Customer-UI: geführt, vertrauenswürdig
- Inspector-UI: operational, funktional, schnell bedienbar

---

## Nächste Schritte

1. NativeWind-Klassen statt Inline-Styles
2. Backend-Anbindung (REST API)
3. Echte Auth mit JWT + Secure Storage
4. Stripe Payment Integration
5. Expo Image Picker für echte Uploads
6. Push Notifications via Expo Notifications
7. PDF-Report Download
8. Offline-Support für Inspektoren
9. Dark Mode
10. App Store / Play Store Release
