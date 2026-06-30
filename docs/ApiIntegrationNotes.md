# Safety4Car – API Integration Notes

## Backend-Stack

Das Backend wird mit folgenden Technologien betrieben:

- **NestJS** – API Framework
- **Prisma** – ORM
- **PostgreSQL** – Datenbank
- **Stripe** – Zahlungsabwicklung (geplant)

---

## API-Client

Der vorbereitete API-Client befindet sich in `/client/src/lib/api-client.ts`.

Aktuell gibt der Client **Mock-Daten** zurück. Sobald das Backend verfügbar ist, werden die Funktionen auf echte HTTP-Calls umgestellt.

---

## Geplante Endpoints

### Orders

| Methode | Endpoint               | Beschreibung          |
| ------- | ---------------------- | --------------------- |
| GET     | `/api/orders`          | Alle Aufträge         |
| GET     | `/api/orders/:id`      | Einzelner Auftrag     |
| POST    | `/api/orders`          | Auftrag erstellen     |
| PATCH   | `/api/orders/:id`      | Auftrag aktualisieren |

### Vehicles

| Methode | Endpoint               | Beschreibung          |
| ------- | ---------------------- | --------------------- |
| GET     | `/api/vehicles`        | Alle Fahrzeuge        |
| POST    | `/api/vehicles`        | Fahrzeug erstellen    |

### Inspections

| Methode | Endpoint                      | Beschreibung             |
| ------- | ----------------------------- | ------------------------ |
| GET     | `/api/inspections/:id`        | Inspektionsdaten         |
| POST    | `/api/inspections/:id/submit` | Inspektion einreichen    |

### Reports

| Methode | Endpoint               | Beschreibung          |
| ------- | ---------------------- | --------------------- |
| GET     | `/api/reports/:id`     | Report abrufen        |
| PATCH   | `/api/reports/:id`     | Report aktualisieren  |

### Partners

| Methode | Endpoint               | Beschreibung          |
| ------- | ---------------------- | --------------------- |
| GET     | `/api/partners`        | Alle Partner          |
| GET     | `/api/partners/:id`    | Einzelner Partner     |

### Payments

| Methode | Endpoint                      | Beschreibung          |
| ------- | ----------------------------- | --------------------- |
| POST    | `/api/payments/checkout`      | Checkout starten      |
| GET     | `/api/payments/:id`           | Zahlungsstatus        |

### Customers

| Methode | Endpoint               | Beschreibung          |
| ------- | ---------------------- | --------------------- |
| GET     | `/api/customers`       | Alle Kunden           |
| GET     | `/api/customers/:id`   | Einzelner Kunde       |

### Tickets & Complaints

| Methode | Endpoint                | Beschreibung          |
| ------- | ----------------------- | --------------------- |
| GET     | `/api/tickets`          | Alle Tickets          |
| GET     | `/api/tickets/:id`      | Einzelnes Ticket      |
| GET     | `/api/complaints`       | Alle Beschwerden      |
| POST    | `/api/complaints`       | Beschwerde erstellen  |

### Audit Logs

| Methode | Endpoint               | Beschreibung          |
| ------- | ---------------------- | --------------------- |
| GET     | `/api/audit-logs`      | Audit Logs abrufen    |

---

## Authentifizierung (geplant)

- JWT-basierte Authentifizierung
- Login über E-Mail + Passwort
- Rollenbasierte Zugriffskontrolle (RBAC)
- Rollen: `admin`, `customer_success`, `inspector`, `partner`, `customer`

---

## Migration von Mock zu API

1. API-Client Funktionen von Mock auf `fetch`/`axios` umstellen
2. Authentifizierung-Middleware einbauen
3. Error Handling für API-Fehler implementieren
4. Loading States für alle Datenabrufe
5. TanStack Query für Caching und Refetching aktivieren
6. Optimistic Updates für Formulare

---

## Hinweise

- Alle API-Calls sollen über den zentralen API-Client laufen
- Keine direkten `fetch`/`axios` Calls in Komponenten
- Error Boundaries für API-Fehler vorbereiten
- Rate Limiting beachten
