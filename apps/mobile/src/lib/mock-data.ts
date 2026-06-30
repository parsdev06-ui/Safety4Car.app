import { Package, Vehicle, Customer, Inspector, Order, Inspection, Report, Payout, TimelineEvent, ChecklistItem } from '../types';

export const packages: Package[] = [
  {
    id: 'pkg-1',
    name: 'Self-Check',
    type: 'self_check',
    price: 72,
    currency: 'EUR',
    description: 'Digitale Selbstbewertung mit Checkliste',
    features: ['Digitale Checkliste', 'Foto-Upload', 'Basis-Report'],
    estimatedDuration: 1,
  },
  {
    id: 'pkg-2',
    name: 'Basic Check',
    type: 'basic_check',
    price: 120,
    currency: 'EUR',
    description: 'Professionelle Inspektion durch zertifizierten Inspektor',
    features: ['Professionelle Inspektion', 'Detaillierter Report', 'Foto-Dokumentation', 'Risikoeinschätzung'],
    estimatedDuration: 2,
  },
  {
    id: 'pkg-3',
    name: 'Premium Check',
    type: 'premium_check',
    price: 300,
    currency: 'EUR',
    description: 'Umfassende Inspektion mit detaillierter Analyse',
    features: ['Umfassende Inspektion', 'Experten-Analyse', 'Video-Dokumentation', 'Detaillierte Empfehlungen', 'Priority Support'],
    estimatedDuration: 3,
  },
];

export const currentCustomer: Customer = {
  id: 'cust-1',
  firstName: 'Max',
  lastName: 'Mueller',
  email: 'max.mueller@example.com',
  phone: '+49 30 123456',
  city: 'Berlin',
};

export const currentInspector: Inspector = {
  id: 'insp-1',
  firstName: 'Stefan',
  lastName: 'Koch',
  email: 'stefan.koch@example.com',
  phone: '+49 40 987654',
  certifications: ['KFZ-Meister', 'TÜV-Sachverständiger'],
  rating: 4.8,
  completedInspections: 142,
  status: 'active',
};

export const vehicles: Vehicle[] = [
  {
    id: 'veh-1',
    vin: 'WBA3B1C51FK456789',
    licensePlate: 'B-SC 4321',
    make: 'BMW',
    model: '320d',
    year: 2019,
    mileage: 67000,
    fuelType: 'Diesel',
    transmission: 'Automatik',
    color: 'Schwarz',
  },
  {
    id: 'veh-2',
    vin: 'WVWZZZ3CZYE123456',
    licensePlate: 'M-AB 1234',
    make: 'Volkswagen',
    model: 'Golf 8',
    year: 2021,
    mileage: 32000,
    fuelType: 'Benzin',
    transmission: 'Manuell',
    color: 'Weiß',
  },
];

export const orders: Order[] = [
  {
    id: 'ord-1',
    customerId: 'cust-1',
    vehicleId: 'veh-1',
    packageId: 'pkg-2',
    inspectorId: 'insp-1',
    status: 'completed',
    totalPrice: 120,
    currency: 'EUR',
    appointmentDate: '2025-03-15',
    appointmentTime: '10:00',
    appointmentLocation: 'Berlin Mitte',
    createdAt: '2025-03-01T10:00:00Z',
    updatedAt: '2025-03-15T14:00:00Z',
    completedAt: '2025-03-15T14:00:00Z',
  },
  {
    id: 'ord-2',
    customerId: 'cust-1',
    vehicleId: 'veh-2',
    packageId: 'pkg-3',
    inspectorId: 'insp-1',
    status: 'inspection_in_progress',
    totalPrice: 300,
    currency: 'EUR',
    appointmentDate: '2025-04-02',
    appointmentTime: '14:00',
    appointmentLocation: 'München Zentrum',
    createdAt: '2025-03-20T09:00:00Z',
    updatedAt: '2025-04-02T14:00:00Z',
  },
  {
    id: 'ord-3',
    customerId: 'cust-1',
    vehicleId: 'veh-1',
    packageId: 'pkg-1',
    status: 'appointment_confirmed',
    totalPrice: 72,
    currency: 'EUR',
    appointmentDate: '2025-04-10',
    appointmentTime: '09:00',
    appointmentLocation: 'Berlin Charlottenburg',
    createdAt: '2025-04-01T08:00:00Z',
    updatedAt: '2025-04-01T08:00:00Z',
  },
];

export const inspectorOrders: Order[] = [
  {
    id: 'ord-2',
    customerId: 'cust-1',
    vehicleId: 'veh-2',
    packageId: 'pkg-3',
    inspectorId: 'insp-1',
    status: 'inspection_in_progress',
    totalPrice: 300,
    currency: 'EUR',
    appointmentDate: '2025-04-02',
    appointmentTime: '14:00',
    appointmentLocation: 'München Zentrum',
    createdAt: '2025-03-20T09:00:00Z',
    updatedAt: '2025-04-02T14:00:00Z',
  },
  {
    id: 'ord-4',
    customerId: 'cust-2',
    vehicleId: 'veh-1',
    packageId: 'pkg-2',
    inspectorId: 'insp-1',
    status: 'inspection_ready',
    totalPrice: 120,
    currency: 'EUR',
    appointmentDate: '2025-04-05',
    appointmentTime: '11:00',
    appointmentLocation: 'Hamburg Altona',
    createdAt: '2025-03-28T10:00:00Z',
    updatedAt: '2025-04-01T09:00:00Z',
  },
  {
    id: 'ord-5',
    customerId: 'cust-3',
    vehicleId: 'veh-2',
    packageId: 'pkg-3',
    inspectorId: 'insp-1',
    status: 'partner_assigned',
    totalPrice: 300,
    currency: 'EUR',
    appointmentDate: '2025-04-08',
    appointmentTime: '15:00',
    appointmentLocation: 'Frankfurt Sachsenhausen',
    createdAt: '2025-04-01T12:00:00Z',
    updatedAt: '2025-04-02T08:00:00Z',
  },
];

export const defaultChecklist: ChecklistItem[] = [
  { id: 'cl-1', category: 'Karosserie', name: 'Lackzustand', description: 'Prüfung auf Kratzer, Dellen, Rost', status: 'pending' },
  { id: 'cl-2', category: 'Karosserie', name: 'Spaltmaße', description: 'Gleichmäßigkeit der Spaltmaße', status: 'pending' },
  { id: 'cl-3', category: 'Karosserie', name: 'Unfallschäden', description: 'Sichtbare Reparaturen oder Verformungen', status: 'pending' },
  { id: 'cl-4', category: 'Motor', name: 'Ölstand', description: 'Ölstand und Ölqualität', status: 'pending' },
  { id: 'cl-5', category: 'Motor', name: 'Kühlflüssigkeit', description: 'Stand und Zustand', status: 'pending' },
  { id: 'cl-6', category: 'Motor', name: 'Geräusche', description: 'Ungewöhnliche Motorgeräusche', status: 'pending' },
  { id: 'cl-7', category: 'Fahrwerk', name: 'Bremsen', description: 'Bremsbeläge und -scheiben', status: 'pending' },
  { id: 'cl-8', category: 'Fahrwerk', name: 'Reifen', description: 'Profiltiefe und Zustand', status: 'pending' },
  { id: 'cl-9', category: 'Fahrwerk', name: 'Stoßdämpfer', description: 'Funktion und Dichtigkeit', status: 'pending' },
  { id: 'cl-10', category: 'Innenraum', name: 'Sitze', description: 'Zustand und Funktion', status: 'pending' },
  { id: 'cl-11', category: 'Innenraum', name: 'Elektronik', description: 'Fensterheber, Klima, Radio', status: 'pending' },
  { id: 'cl-12', category: 'Innenraum', name: 'Tacho', description: 'Plausibilität der Laufleistung', status: 'pending' },
];

export const inspections: Inspection[] = [
  {
    id: 'ins-1',
    orderId: 'ord-1',
    inspectorId: 'insp-1',
    status: 'approved',
    startedAt: '2025-03-15T10:00:00Z',
    completedAt: '2025-03-15T12:30:00Z',
    checklist: defaultChecklist.map((item, i) => ({
      ...item,
      status: i % 5 === 0 ? 'warning' : 'pass',
    })),
    photos: ['photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg'],
    notes: 'Fahrzeug in gutem Zustand. Leichte Gebrauchsspuren an der Karosserie.',
    riskAssessment: 'low',
  },
];

export const reports: Report[] = [
  {
    id: 'rep-1',
    orderId: 'ord-1',
    inspectionId: 'ins-1',
    riskLevel: 'low',
    summary: 'Das Fahrzeug befindet sich in einem guten Gesamtzustand. Geringe Auffälligkeiten im Bereich Karosserie.',
    findings: [
      {
        id: 'find-1',
        category: 'Karosserie',
        severity: 'low',
        description: 'Leichte Kratzer an der Fahrertür',
        recommendation: 'Kosmetische Reparatur möglich, kein Sicherheitsrisiko',
      },
      {
        id: 'find-2',
        category: 'Reifen',
        severity: 'medium',
        description: 'Profiltiefe hinten links bei 2.5mm',
        recommendation: 'Reifenwechsel innerhalb der nächsten 5.000 km empfohlen',
      },
    ],
    recommendations: [
      'Reifenwechsel hinten innerhalb von 5.000 km',
      'Nächster Ölwechsel bei 70.000 km',
    ],
    generatedAt: '2025-03-15T14:00:00Z',
  },
];

export const timeline: TimelineEvent[] = [
  { id: 'tl-1', orderId: 'ord-2', title: 'Buchung erstellt', description: 'Premium Check gebucht', timestamp: '2025-03-20T09:00:00Z', status: 'completed' },
  { id: 'tl-2', orderId: 'ord-2', title: 'Zahlung bestätigt', description: '300 EUR erhalten', timestamp: '2025-03-20T09:05:00Z', status: 'completed' },
  { id: 'tl-3', orderId: 'ord-2', title: 'Inspektor zugewiesen', description: 'Stefan Koch', timestamp: '2025-03-22T10:00:00Z', status: 'completed' },
  { id: 'tl-4', orderId: 'ord-2', title: 'Termin bestätigt', description: '02.04.2025, 14:00 Uhr', timestamp: '2025-03-25T11:00:00Z', status: 'completed' },
  { id: 'tl-5', orderId: 'ord-2', title: 'Inspektion läuft', description: 'Inspektor vor Ort', timestamp: '2025-04-02T14:00:00Z', status: 'current' },
  { id: 'tl-6', orderId: 'ord-2', title: 'Report erstellt', description: 'Bericht wird generiert', timestamp: '', status: 'upcoming' },
  { id: 'tl-7', orderId: 'ord-2', title: 'Abgeschlossen', description: 'Report verfügbar', timestamp: '', status: 'upcoming' },
];

export const payouts: Payout[] = [
  { id: 'pay-1', orderId: 'ord-1', inspectorId: 'insp-1', amount: 85, currency: 'EUR', status: 'completed', createdAt: '2025-03-16T10:00:00Z' },
  { id: 'pay-2', orderId: 'ord-2', inspectorId: 'insp-1', amount: 210, currency: 'EUR', status: 'pending', createdAt: '2025-04-02T14:00:00Z' },
  { id: 'pay-3', orderId: 'ord-4', inspectorId: 'insp-1', amount: 85, currency: 'EUR', status: 'pending', createdAt: '2025-04-05T11:00:00Z' },
];

export const statusLabels: Record<string, string> = {
  draft: 'Entwurf',
  payment_pending: 'Zahlung ausstehend',
  paid: 'Bezahlt',
  partner_matching: 'Partner wird gesucht',
  partner_assigned: 'Partner zugewiesen',
  appointment_confirmed: 'Termin bestätigt',
  inspection_ready: 'Inspektion bereit',
  inspection_in_progress: 'Inspektion läuft',
  report_pending: 'Report ausstehend',
  qa_review: 'Qualitätsprüfung',
  completed: 'Abgeschlossen',
  payout_pending: 'Auszahlung ausstehend',
  payout_completed: 'Ausgezahlt',
  cancelled: 'Storniert',
  refunded: 'Erstattet',
  disputed: 'Streitfall',
  complaint_open: 'Beschwerde offen',
};
