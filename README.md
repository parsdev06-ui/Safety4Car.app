# Safety4Car – Frontend MVP

Safety4Car ist eine digitale Plattform für Gebrauchtwagen-Checks.
Die Plattform verbindet Endkunden mit freigegebenen Prüfpartnern und Inspektoren.

> **Hinweis:** Safety4Car ist keine Werkstatt, keine amtliche Prüfstelle und kein TÜV-Ersatz.

---

## Tech-Stack

| Technologie     | Zweck                   |
| --------------- | ----------------------- |
| Vite            | Build Tool              |
| React 19        | UI Framework            |
| TypeScript      | Type Safety             |
| TailwindCSS 4   | Styling                 |
| shadcn/ui       | Component Library       |
| wouter          | Client-Side Routing     |
| Lucide React    | Icons                   |
| React Hook Form | Formulare               |
| Zod             | Validierung             |
| Recharts        | Charts                  |

---

## Setup

### Voraussetzungen

- Node.js >= 20
- pnpm >= 10

### Installation

```bash
pnpm install
```

### Development Server

```bash
pnpm dev
```

Öffnet die App unter `http://localhost:3000`.

### Build

```bash
pnpm build
```

### Type Check

```bash
pnpm check
```

---

## Projektstruktur

```
client/
  src/
    pages/           # Alle Seiten nach Rolle gruppiert
      public/        # Landing, Pricing, How It Works
      client/        # Booking Flow, Customer Dashboard
      inspector/     # Inspector Dashboard, Inspektionen
      admin/         # Admin Dashboard, Verwaltung
      cs/            # Customer Success Dashboard
    components/
      ui/            # shadcn/ui Komponenten
      layouts/       # PublicLayout, DashboardLayout
      dashboard/     # Dashboard-spezifische Komponenten
    lib/
      mock-data.ts   # Alle Mock-Daten
      api-client.ts  # Vorbereiteter API-Client
      routes.ts      # Route-Konstanten
      status.ts      # Status-Labels und Farben
      utils.ts       # Utility-Funktionen
    types/
      index.ts       # TypeScript Typen
docs/
  BrandGuidelines.md
  Design.md
  FrontendScope.md
  AppFlow.md
  MockData.md
  ApiIntegrationNotes.md
```

---

## Rollen-Flows

### Client / Endkunde
- `/` – Landing Page
- `/preise` – Preise
- `/so-funktionierts` – So funktioniert's
- `/booking/package` – Paket wählen
- `/booking/vehicle` – Fahrzeugdaten
- `/booking/appointment` – Termin buchen
- `/booking/checkout-preview` – Buchungsübersicht
- `/booking/success` – Buchungserfolg
- `/customer/dashboard` – Kundendashboard
- `/customer/orders/:id` – Auftragsdetails
- `/customer/reports/:id` – Prüfbericht
- `/customer/complaint` – Beschwerde

### Inspector / Prüfer
- `/inspector/dashboard` – Inspector Dashboard
- `/inspector/orders` – Auftragsübersicht
- `/inspector/orders/:id` – Auftragsdetails
- `/inspector/inspection/:id` – Inspektion durchführen
- `/inspector/inspection/:id/submit` – Inspektion einreichen

### Admin
- `/admin/dashboard` – Admin Dashboard
- `/admin/orders` – Aufträge verwalten
- `/admin/orders/:id` – Auftragsdetails
- `/admin/partners` – Partnerverwaltung
- `/admin/partners/:id` – Partnerdetails
- `/admin/reports` – Reports
- `/admin/payments` – Zahlungen
- `/admin/complaints` – Beschwerden
- `/admin/audit-logs` – Audit Logs

### Customer Success
- `/cs/dashboard` – CS Dashboard
- `/cs/tickets` – Support-Tickets
- `/cs/tickets/:id` – Ticketdetails
- `/cs/customers` – Kundenübersicht
- `/cs/orders` – Aufträge
- `/cs/complaints` – Beschwerden

---

## Mock-Daten

Alle Daten sind statisch in `/client/src/lib/mock-data.ts` definiert. Es werden keine echten API-Calls ausgeführt. Der API-Client in `/client/src/lib/api-client.ts` ist vorbereitet und gibt aktuell Mock-Daten zurück.

---

## Mobile App (Expo React Native)

Die Safety4Car Mobile App befindet sich unter `apps/mobile/`.

### Tech-Stack Mobile

| Technologie       | Zweck                         |
| ----------------- | ----------------------------- |
| Expo SDK 57       | React Native Framework        |
| TypeScript        | Type Safety                   |
| Expo Router       | File-based Navigation         |
| NativeWind        | Tailwind CSS for RN           |
| React Hook Form   | Formulare                     |
| Zod               | Validierung                   |

### Mobile App starten

```bash
cd apps/mobile
npm install
npx expo start
```

### iOS Simulator

```bash
cd apps/mobile
npm install
npx expo start --ios
```

> Voraussetzung: macOS mit Xcode installiert.

### Android Emulator

```bash
cd apps/mobile
npm install
npx expo start --android
```

> Voraussetzung: Android Studio mit konfiguriertem Emulator.

### EAS Build (Production)

```bash
npm install -g eas-cli
eas login
eas build --platform all
```

Siehe [App Store Plan](docs/AppStorePlan.md) für Details zum Release-Prozess.

### Mobile App Struktur

```
apps/mobile/
  app/
    (auth)/        # Login, Register
    (customer)/    # Customer Flow (Dashboard, Booking, Orders, Reports)
    (inspector)/   # Inspector Flow (Dashboard, Orders, Inspection, Payouts)
  src/
    components/    # Shared UI Components
    lib/           # Mock-Daten
    types/         # TypeScript Types
    constants/     # Farben, Tokens
```

---

## Nächste Schritte

1. NestJS Backend anbinden
2. Authentifizierung implementieren (JWT)
3. Stripe Payment Integration
4. Echte Datei-Uploads für Inspektionsfotos
5. PDF-Report Generierung
6. E-Mail Benachrichtigungen
7. Internationalisierung (i18n)
8. Mobile App: Backend-Anbindung
9. Mobile App: EAS Build & Store Release

---

## Dokumentation

Weitere Dokumentation befindet sich im `/docs` Verzeichnis:

- [Brand Guidelines](docs/BrandGuidelines.md)
- [Design System](docs/Design.md)
- [Frontend Scope](docs/FrontendScope.md)
- [App Flow](docs/AppFlow.md)
- [Mock Data](docs/MockData.md)
- [API Integration Notes](docs/ApiIntegrationNotes.md)
- [Mobile App Scope](docs/MobileAppScope.md)
- [App Store Plan](docs/AppStorePlan.md)

---

## Lizenz

MIT