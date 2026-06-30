import { useMemo, useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { getInspectionByOrderId, getInspectorById, getOrderById, getVehicleById } from '@/lib/mock-data';
import type { ChecklistItem, Order } from '@/types';
import { Camera, CarFront, CheckCircle2, ClipboardCheck, ClipboardList, LayoutDashboard, SendHorizonal } from 'lucide-react';
import { Link, useParams } from 'wouter';

type ChecklistStatus = ChecklistItem['status'];

interface ChecklistSection {
  title: string;
  items: Array<{
    id: string;
    name: string;
    description: string;
    status: ChecklistStatus;
    notes: string;
  }>;
}

const sidebarItems = [
  { label: 'Dashboard', href: '/inspector/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Aufträge', href: '/inspector/orders', icon: <ClipboardList className="w-4 h-4" /> },
];

const statusLabels: Record<ChecklistStatus, string> = {
  pass: 'Bestanden',
  warning: 'Warnung',
  fail: 'Nicht bestanden',
  pending: 'Ausstehend',
};

const statusBadgeClasses: Record<ChecklistStatus, string> = {
  pass: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  fail: 'bg-red-100 text-red-800',
  pending: 'bg-slate-100 text-slate-700',
};

const radioOptions: Array<{ value: ChecklistStatus; label: string }> = [
  { value: 'pass', label: 'Bestanden' },
  { value: 'warning', label: 'Warnung' },
  { value: 'fail', label: 'Nicht bestanden' },
  { value: 'pending', label: 'Ausstehend' },
];

const checklistSections: ChecklistSection[] = [
  {
    title: 'Fahrzeugidentität',
    items: [
      {
        id: 'identity-vin',
        name: 'Fahrgestellnummer prüfen',
        description: 'VIN am Fahrzeug mit den Unterlagen abgleichen.',
        status: 'pass',
        notes: 'VIN stimmt mit der Zulassungsbescheinigung überein.',
      },
      {
        id: 'identity-plate',
        name: 'Kennzeichen aufnehmen',
        description: 'Montiertes Kennzeichen auf Lesbarkeit und Übereinstimmung prüfen.',
        status: 'pass',
        notes: 'Kennzeichen sauber und korrekt montiert.',
      },
      {
        id: 'identity-key',
        name: 'Schlüsselbestand dokumentieren',
        description: 'Anzahl der vorhandenen Fahrzeugschlüssel festhalten.',
        status: 'warning',
        notes: 'Nur ein Originalschlüssel vorgelegt.',
      },
    ],
  },
  {
    title: 'Dokumente',
    items: [
      {
        id: 'docs-registration',
        name: 'Zulassungsbescheinigung prüfen',
        description: 'Vollständigkeit und Gültigkeit der Papiere kontrollieren.',
        status: 'pass',
        notes: 'Teil I und II vorhanden.',
      },
      {
        id: 'docs-service',
        name: 'Servicehistorie kontrollieren',
        description: 'Serviceheft oder digitale Nachweise auf Plausibilität prüfen.',
        status: 'warning',
        notes: 'Letzter Eintrag vor 14 Monaten.',
      },
    ],
  },
  {
    title: 'Karosserie',
    items: [
      {
        id: 'body-panels',
        name: 'Spaltmaße und Anbauteile',
        description: 'Türen, Hauben und Kotflügel auf gleichmäßige Spaltmaße prüfen.',
        status: 'pass',
        notes: 'Keine Auffälligkeiten sichtbar.',
      },
      {
        id: 'body-paint',
        name: 'Lackbild kontrollieren',
        description: 'Lackoberflächen auf Nachlackierungen oder Kratzer prüfen.',
        status: 'warning',
        notes: 'Leichte Kratzer an der hinteren Stoßstange.',
      },
      {
        id: 'body-corrosion',
        name: 'Korrosion prüfen',
        description: 'Schweller, Türen und Radläufe auf Rostansätze prüfen.',
        status: 'pass',
        notes: 'Keine Korrosion erkennbar.',
      },
    ],
  },
  {
    title: 'Reifen und Felgen',
    items: [
      {
        id: 'tires-tread',
        name: 'Profiltiefe messen',
        description: 'Vorder- und Hinterachse auf ausreichende Profiltiefe prüfen.',
        status: 'pass',
        notes: 'Durchschnittlich 6 mm Restprofil.',
      },
      {
        id: 'tires-age',
        name: 'Reifenalter bewerten',
        description: 'DOT-Nummern und gleichmäßige Alterung kontrollieren.',
        status: 'warning',
        notes: 'Vorderreifen aus Produktionsjahr 2020.',
      },
      {
        id: 'tires-rims',
        name: 'Felgenzustand prüfen',
        description: 'Felgen auf Bordsteinschäden und Verformungen prüfen.',
        status: 'pass',
        notes: 'Nur minimale optische Gebrauchsspuren.',
      },
    ],
  },
  {
    title: 'Innenraum',
    items: [
      {
        id: 'interior-seats',
        name: 'Sitze und Polster',
        description: 'Polster, Verstellungen und sichtbare Abnutzung dokumentieren.',
        status: 'pass',
        notes: 'Normale Nutzungsspuren auf dem Fahrersitz.',
      },
      {
        id: 'interior-odor',
        name: 'Geruch und Sauberkeit',
        description: 'Innenraum auf Rauchgeruch, Feuchtigkeit oder starke Verschmutzung prüfen.',
        status: 'pass',
        notes: 'Innenraum sauber und geruchsneutral.',
      },
    ],
  },
  {
    title: 'Motorraum',
    items: [
      {
        id: 'engine-fluids',
        name: 'Betriebsflüssigkeiten prüfen',
        description: 'Öl, Kühlmittel und Bremsflüssigkeit stichprobenartig kontrollieren.',
        status: 'pass',
        notes: 'Flüssigkeitsstände im Sollbereich.',
      },
      {
        id: 'engine-leaks',
        name: 'Leckagen prüfen',
        description: 'Sichtprüfung auf Öl- oder Kühlmittelaustritt.',
        status: 'pass',
        notes: 'Keine frischen Leckspuren sichtbar.',
      },
      {
        id: 'engine-battery',
        name: 'Batteriezustand bewerten',
        description: 'Batteriepole und Befestigung auf Zustand und Korrosion prüfen.',
        status: 'warning',
        notes: 'Leichte Oxidation an einem Pol.',
      },
    ],
  },
  {
    title: 'Elektronik',
    items: [
      {
        id: 'electronics-lights',
        name: 'Beleuchtung testen',
        description: 'Scheinwerfer, Blinker, Bremslicht und Innenbeleuchtung prüfen.',
        status: 'pass',
        notes: 'Alle Lichtfunktionen ohne Fehler.',
      },
      {
        id: 'electronics-display',
        name: 'Kontrollleuchten prüfen',
        description: 'Instrumentendisplay und Fehlermeldungen kontrollieren.',
        status: 'warning',
        notes: 'Servicehinweis aktiv, keine Sicherheitsmeldung.',
      },
    ],
  },
  {
    title: 'Verkäuferverhalten',
    items: [
      {
        id: 'seller-punctuality',
        name: 'Pünktlichkeit und Vorbereitung',
        description: 'Erscheinen zum Termin und Bereitstellung der Unterlagen bewerten.',
        status: 'pass',
        notes: 'Fahrzeug pünktlich und vorbereitet bereitgestellt.',
      },
      {
        id: 'seller-transparency',
        name: 'Transparenz im Gespräch',
        description: 'Rückfragen zu Vorschäden und Wartung nachvollziehbar beantworten.',
        status: 'warning',
        notes: 'Aussagen zu einer älteren Lackarbeit blieben ungenau.',
      },
    ],
  },
  {
    title: 'Abschlussnotizen',
    items: [
      {
        id: 'closing-testdrive',
        name: 'Probefahrt bewerten',
        description: 'Lenkung, Bremsverhalten und Geräuschkulisse zusammenfassen.',
        status: 'pending',
        notes: '',
      },
      {
        id: 'closing-summary',
        name: 'Gesamteindruck festhalten',
        description: 'Abschließende Einschätzung für den Prüfbericht notieren.',
        status: 'pending',
        notes: '',
      },
    ],
  },
];

export default function InspectionDetail() {
  const params = useParams<{ id: string }>();
  const order: Order | undefined = params.id ? getOrderById(params.id) : undefined;
  const fallbackInspector = getInspectorById('insp-1');
  const inspection = params.id ? getInspectionByOrderId(params.id) : undefined;
  const inspector = order?.inspectorId ? getInspectorById(order.inspectorId) : fallbackInspector;
  const vehicle = order ? getVehicleById(order.vehicleId) : undefined;

  const [checklistState, setChecklistState] = useState(() =>
    Object.fromEntries(
      checklistSections.flatMap((section) =>
        section.items.map((item) => [
          item.id,
          {
            status: item.status,
            notes: item.notes,
          },
        ])
      )
    ) as Record<string, { status: ChecklistStatus; notes: string }>
  );

  const totalItems = useMemo(
    () => checklistSections.reduce((sum, section) => sum + section.items.length, 0),
    []
  );
  const completedItems = Object.values(checklistState).filter((item) => item.status !== 'pending').length;

  const updateItem = (id: string, changes: Partial<{ status: ChecklistStatus; notes: string }>) => {
    setChecklistState((current) => ({
      ...current,
      [id]: {
        ...current[id],
        ...changes,
      },
    }));
  };

  if (!order) {
    return (
      <DashboardLayout role="inspector" sidebarItems={sidebarItems} userName={fallbackInspector?.firstName}>
        <Card>
          <CardHeader>
            <CardTitle>Inspektion nicht gefunden</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Für diese Auftrags-ID konnte keine Inspektion geladen werden.</p>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="inspector" sidebarItems={sidebarItems} userName={inspector?.firstName}>
      <div className="space-y-6 pb-28">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inspektions-Checkliste</h1>
            <p className="text-muted-foreground">
              Auftrag {order.id} • {vehicle ? `${vehicle.make} ${vehicle.model}` : 'Fahrzeug nicht verfügbar'}
            </p>
          </div>
          <Badge className="bg-cyan-100 text-cyan-800">
            {inspection?.status === 'submitted' ? 'Vorbefüllt aus Mock-Daten' : 'Prüfung aktiv'}
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <DashboardMetricCard
            title="Fahrzeug"
            value={vehicle ? `${vehicle.make} ${vehicle.model}` : 'Nicht verfügbar'}
            description={vehicle?.licensePlate}
            icon={<CarFront className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Bearbeitet"
            value={`${completedItems} von ${totalItems}`}
            description="Checklistenpunkte mit Bewertung"
            icon={<ClipboardCheck className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Dokumentation"
            value={inspection?.photos.length ?? 0}
            description="Fotos aus Mock-Daten"
            icon={<Camera className="w-5 h-5" />}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fahrzeugübersicht</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm md:grid-cols-2 xl:grid-cols-4">
            <div>
              <p className="text-muted-foreground">Modell</p>
              <p className="font-medium">{vehicle ? `${vehicle.make} ${vehicle.model}` : '—'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Baujahr</p>
              <p className="font-medium">{vehicle?.year ?? '—'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Kilometerstand</p>
              <p className="font-medium">{vehicle ? `${vehicle.mileage.toLocaleString('de-DE')} km` : '—'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">VIN</p>
              <p className="font-medium">{vehicle?.vin ?? '—'}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {checklistSections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {section.items.map((item, index) => {
                  const current = checklistState[item.id];

                  return (
                    <div key={item.id} className="space-y-4">
                      {index > 0 && <Separator />}
                      <div className="space-y-3 pt-1">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-medium text-foreground">{item.name}</h3>
                              <Badge className={statusBadgeClasses[current.status]}>
                                {statusLabels[current.status]}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>

                        <RadioGroup
                          value={current.status}
                          onValueChange={(value) => updateItem(item.id, { status: value as ChecklistStatus })}
                          className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"
                        >
                          {radioOptions.map((option) => (
                            <Label
                              key={option.value}
                              className="flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3"
                            >
                              <RadioGroupItem value={option.value} />
                              <span>{option.label}</span>
                            </Label>
                          ))}
                        </RadioGroup>

                        <div className="space-y-2">
                          <Label htmlFor={`${item.id}-notes`}>Notizen</Label>
                          <Textarea
                            id={`${item.id}-notes`}
                            value={current.notes}
                            onChange={(event) => updateItem(item.id, { notes: event.target.value })}
                            placeholder="Details, Messwerte oder Auffälligkeiten festhalten"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fotodokumentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
              <Camera className="mb-3 h-10 w-10 text-muted-foreground" />
              <p className="font-medium text-foreground">Fotos hinzufügen</p>
              <p className="text-sm text-muted-foreground">
                Hier können später Bilder von Schäden, Dokumenten oder Detailaufnahmen hochgeladen werden.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="sticky bottom-0 z-20 -mx-4 border-t bg-background/95 px-4 py-4 backdrop-blur lg:-mx-6 lg:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-medium text-foreground">Fortschritt der Inspektion</p>
              <p className="text-sm text-muted-foreground">
                {completedItems} von {totalItems} Prüfpunkten bewertet.
              </p>
            </div>
            <Link href={`/inspector/inspection/${order.id}/submit`}>
              <a>
                <Button size="lg">
                  <SendHorizonal className="mr-2 h-4 w-4" />
                  Inspektion einreichen
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
