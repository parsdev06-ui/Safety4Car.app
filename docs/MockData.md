# Safety4Car – Mock Data Documentation

## Übersicht

Alle Mock-Daten befinden sich in `/client/src/lib/mock-data.ts`.

Die Daten werden ausschließlich im Frontend verwendet und simulieren die Antworten des zukünftigen NestJS Backends.

---

## Mock-Objekte

| Objekt       | Datei-Variable  | Anzahl | Beschreibung                    |
| ------------ | --------------- | ------ | ------------------------------- |
| Packages     | `packages`      | 3      | Self-Check, Basic, Premium      |
| Customers    | `customers`     | 3      | Testkunden                      |
| Vehicles     | `vehicles`      | 3      | Testfahrzeuge                   |
| Partners     | `partners`      | 2      | Inspektionspartner              |
| Inspectors   | `inspectors`    | 2      | Prüfer                          |
| Orders       | `orders`        | 3      | Aufträge in verschiedenen Status|
| Inspections  | `inspections`   | 2      | Inspektionsdaten                |
| Reports      | `reports`       | 1      | Prüfbericht                     |
| Payments     | `payments`      | 2      | Zahlungen                       |
| Complaints   | `complaints`    | 1      | Beschwerde                      |
| Tickets      | `tickets`       | 2      | Support-Tickets                 |
| Audit Logs   | `auditLogs`     | 3      | Audit-Einträge                  |

---

## Helper Functions

| Funktion                   | Parameter    | Rückgabe         |
| -------------------------- | ------------ | ---------------- |
| `getOrderById`             | `id: string` | `Order \| undefined` |
| `getCustomerById`          | `id: string` | `Customer \| undefined` |
| `getVehicleById`           | `id: string` | `Vehicle \| undefined` |
| `getInspectorById`         | `id: string` | `Inspector \| undefined` |
| `getPartnerById`           | `id: string` | `Partner \| undefined` |
| `getPackageById`           | `id: string` | `Package \| undefined` |
| `getInspectionByOrderId`   | `orderId: string` | `Inspection \| undefined` |
| `getReportByOrderId`       | `orderId: string` | `Report \| undefined` |
| `getPaymentByOrderId`      | `orderId: string` | `Payment \| undefined` |
| `getTicketsByCustomerId`   | `customerId: string` | `Ticket[]` |
| `getComplaintsByCustomerId`| `customerId: string` | `Complaint[]` |
| `getOrdersByCustomerId`    | `customerId: string` | `Order[]` |
| `getOrdersByPartnerId`     | `partnerId: string` | `Order[]` |
| `getOrdersByInspectorId`   | `inspectorId: string` | `Order[]` |

---

## Statuswerte

### Order Status

| Status                 | Label (DE)              |
| ---------------------- | ----------------------- |
| `draft`                | Entwurf                 |
| `payment_pending`      | Zahlung ausstehend      |
| `paid`                 | Bezahlt                 |
| `partner_matching`     | Partner wird gesucht    |
| `partner_assigned`     | Partner zugewiesen      |
| `appointment_confirmed`| Termin bestätigt        |
| `inspection_ready`     | Bereit zur Inspektion   |
| `inspection_in_progress`| Inspektion läuft       |
| `report_pending`       | Report ausstehend       |
| `qa_review`            | QA-Überprüfung          |
| `completed`            | Abgeschlossen           |
| `payout_pending`       | Auszahlung ausstehend   |
| `payout_completed`     | Auszahlung abgeschlossen|
| `cancelled`            | Storniert               |
| `refunded`             | Rückerstattung          |
| `disputed`             | Streitfall              |
| `complaint_open`       | Beschwerde offen        |

### Partner Status

| Status                  | Label (DE)               |
| ----------------------- | ------------------------ |
| `registered`            | Registriert              |
| `profile_incomplete`    | Profil unvollständig     |
| `documents_pending`     | Dokumente ausstehend     |
| `verification_pending`  | Verifizierung ausstehend |
| `training_pending`      | Schulung ausstehend      |
| `approved`              | Freigegeben              |
| `suspended`             | Gesperrt                 |
| `rejected`              | Abgelehnt                |
| `terminated`            | Gekündigt                |

### Risk Levels

| Level    | Label (DE) | Farbe   |
| -------- | ---------- | ------- |
| `low`    | Niedrig    | Emerald |
| `medium` | Mittel     | Amber   |
| `high`   | Hoch       | Red     |
| `unknown`| Unbekannt  | Gray    |

---

## Hinweise

- Alle IDs verwenden das Format `prefix-number` (z.B. `ord-1`, `cust-1`)
- Timestamps sind im ISO 8601 Format
- Preise sind in EUR
- Alle Daten sind fiktiv und dienen nur der Frontend-Entwicklung
