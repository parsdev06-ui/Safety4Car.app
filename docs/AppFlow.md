# Safety4Car – App Flow

## Übersicht der Rollen-Flows

### 1. Client / Endkunde

```
Landing Page (/)
    ↓
Preise (/preise) oder So funktioniert's (/so-funktionierts)
    ↓
Paket wählen (/booking/package)
    ↓
Fahrzeugdaten eingeben (/booking/vehicle)
    ↓
Termin buchen (/booking/appointment)
    ↓
Checkout Preview (/booking/checkout-preview)
    ↓
Buchungserfolg (/booking/success)
    ↓
Customer Dashboard (/customer/dashboard)
    ↓
Order Details (/customer/orders/:id)
    ↓
Report ansehen (/customer/reports/:id)
    ↓
Beschwerde eröffnen (/customer/complaint)
```

### 2. Inspector / Prüfer

```
Inspector Dashboard (/inspector/dashboard)
    ↓
Aufträge ansehen (/inspector/orders)
    ↓
Auftrag öffnen (/inspector/orders/:id)
    ↓
Inspektion durchführen (/inspector/inspection/:id)
    ↓
Inspektion einreichen (/inspector/inspection/:id/submit)
```

### 3. Admin

```
Admin Dashboard (/admin/dashboard)
    ├── Aufträge (/admin/orders) → Details (/admin/orders/:id)
    ├── Partner (/admin/partners) → Details (/admin/partners/:id)
    ├── Reports (/admin/reports)
    ├── Zahlungen (/admin/payments)
    ├── Beschwerden (/admin/complaints)
    └── Audit Logs (/admin/audit-logs)
```

### 4. Customer Success

```
CS Dashboard (/cs/dashboard)
    ├── Tickets (/cs/tickets) → Details (/cs/tickets/:id)
    ├── Kunden (/cs/customers)
    ├── Aufträge (/cs/orders)
    └── Beschwerden (/cs/complaints)
```

---

## Order Lifecycle

```
draft
  → payment_pending
    → paid
      → partner_matching
        → partner_assigned
          → appointment_confirmed
            → inspection_ready
              → inspection_in_progress
                → report_pending
                  → qa_review
                    → completed
                      → payout_pending
                        → payout_completed
```

Alternative Pfade:
- `cancelled` (jederzeit vor `inspection_in_progress`)
- `refunded` (nach Stornierung mit Zahlung)
- `disputed` (Kunde beanstandet Ergebnis)
- `complaint_open` (formelle Beschwerde)

---

## Pakete

| Paket         | Preis | Dauer  | Beschreibung                      |
| ------------- | ----- | ------ | --------------------------------- |
| Self-Check    | 72 €  | ~1h    | Digitale Selbstbewertung          |
| Basic Check   | 120 € | ~2h    | Professionelle Inspektion         |
| Premium Check | 300 € | ~3h    | Umfassende Analyse mit Video-Doku |

---

## Inspektions-Checkliste

| Bereich              | Beschreibung                              |
| -------------------- | ----------------------------------------- |
| Fahrzeugidentität    | VIN, Kennzeichen, Farbe, Ausstattung      |
| Dokumente            | Fahrzeugschein, TÜV, Serviceheft          |
| Karosserie           | Lack, Dellen, Rost, Unfallschäden         |
| Reifen und Felgen    | Profiltiefe, Zustand, Alter               |
| Innenraum            | Polster, Elektronik, Geruch               |
| Motorraum            | Ölstand, Flüssigkeiten, Zustand           |
| Elektronik           | Beleuchtung, Steuergeräte, Fehlerspeicher |
| Verkäuferverhalten   | Kooperativ, auffällig, abweichend         |
| Abschlussnotizen     | Gesamteindruck, Empfehlungen              |
| Fotos                | Dokumentation aller relevanten Bereiche   |
