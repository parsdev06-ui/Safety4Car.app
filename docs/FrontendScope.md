# Safety4Car – Frontend Scope

## Aktueller Status: MVP Frontend (Statisch)

Das Frontend ist ein statisches, klickbares MVP mit Mock-Daten.
Es werden keine echten API-Calls, keine echte Authentifizierung und keine echte Zahlungslogik verwendet.

---

## Tech-Stack

| Technologie      | Version | Zweck                        |
| ---------------- | ------- | ---------------------------- |
| Vite             | 7.x     | Build Tool                   |
| React            | 19.x    | UI Framework                 |
| TypeScript       | 5.6     | Type Safety                  |
| TailwindCSS      | 4.x     | Styling                      |
| shadcn/ui        | latest  | Component Library            |
| wouter           | 3.x     | Client-Side Routing          |
| Lucide React     | 0.453   | Icons                        |
| React Hook Form  | 7.x     | Formulare                    |
| Zod              | 4.x     | Validierung                  |
| Framer Motion    | 12.x    | Animationen (sparsam)        |
| Recharts         | 2.x     | Charts                       |

---

## Was ist umgesetzt

### Public Pages
- [x] Landing Page (`/`)
- [x] Preise (`/preise`)
- [x] So funktioniert's (`/so-funktionierts`)

### Booking Flow
- [x] Paketauswahl (`/booking/package`)
- [x] Fahrzeugdaten (`/booking/vehicle`)
- [x] Terminbuchung (`/booking/appointment`)
- [x] Checkout Preview (`/booking/checkout-preview`)
- [x] Buchungserfolg (`/booking/success`)

### Customer App
- [x] Dashboard (`/customer/dashboard`)
- [x] Order Details (`/customer/orders/:id`)
- [x] Report Ansicht (`/customer/reports/:id`)
- [x] Beschwerde (`/customer/complaint`)

### Inspector App
- [x] Dashboard (`/inspector/dashboard`)
- [x] Aufträge (`/inspector/orders`)
- [x] Auftragsdetails (`/inspector/orders/:id`)
- [x] Inspektionsdetails (`/inspector/inspection/:id`)
- [x] Inspektion einreichen (`/inspector/inspection/:id/submit`)

### Admin
- [x] Dashboard (`/admin/dashboard`)
- [x] Aufträge (`/admin/orders`)
- [x] Auftragsdetails (`/admin/orders/:id`)
- [x] Partner (`/admin/partners`)
- [x] Partnerdetails (`/admin/partners/:id`)
- [x] Reports (`/admin/reports`)
- [x] Zahlungen (`/admin/payments`)
- [x] Beschwerden (`/admin/complaints`)
- [x] Audit Logs (`/admin/audit-logs`)

### Customer Success
- [x] Dashboard (`/cs/dashboard`)
- [x] Tickets (`/cs/tickets`)
- [x] Ticketdetails (`/cs/tickets/:id`)
- [x] Kunden (`/cs/customers`)
- [x] Aufträge (`/cs/orders`)
- [x] Beschwerden (`/cs/complaints`)

---

## Was NICHT umgesetzt ist

- ❌ Echte Backend-Anbindung
- ❌ Echte Authentifizierung
- ❌ Echte Stripe/Payment-Integration
- ❌ Echte Datei-Uploads
- ❌ Echte Formularverarbeitung
- ❌ Produktive API-Calls
- ❌ Server-Side Rendering
- ❌ Echte Datenbank-Queries

---

## Nächste Schritte

1. NestJS Backend anbinden (API-Client aktivieren)
2. Authentifizierung implementieren (JWT/Session)
3. Echte Formularvalidierung mit Zod
4. Stripe Payment Integration
5. File Upload für Inspektionsfotos
6. E-Mail Benachrichtigungen
7. PDF-Report Generierung
8. Internationalisierung (i18n)
