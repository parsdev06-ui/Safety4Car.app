import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { getInspectionByOrderId, getInspectorById, getOrderById, getPackageById, getVehicleById } from '@/lib/mock-data';
import type { Order, RiskLevel } from '@/types';
import {
  CarFront,
  CheckCheck,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  LayoutDashboard,
  ShieldAlert,
} from 'lucide-react';
import { Link, useParams } from 'wouter';

const sidebarItems = [
  { label: 'Dashboard', href: '/inspector/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Aufträge', href: '/inspector/orders', icon: <ClipboardList className="w-4 h-4" /> },
];

const riskOptions: Array<{ value: RiskLevel; label: string }> = [
  { value: 'low', label: 'Niedrig' },
  { value: 'medium', label: 'Mittel' },
  { value: 'high', label: 'Hoch' },
];

export default function InspectionSubmit() {
  const params = useParams<{ id: string }>();
  const order: Order | undefined = params.id ? getOrderById(params.id) : undefined;
  const fallbackInspector = getInspectorById('insp-1');
  const inspector = order?.inspectorId ? getInspectorById(order.inspectorId) : fallbackInspector;
  const vehicle = order ? getVehicleById(order.vehicleId) : undefined;
  const pkg = order ? getPackageById(order.packageId) : undefined;
  const inspection = params.id ? getInspectionByOrderId(params.id) : undefined;

  const totalItems = 22;
  const completedItems = order?.status === 'completed' ? 22 : order?.status === 'inspection_in_progress' ? 18 : 10;
  const completionPercentage = (completedItems / totalItems) * 100;

  const [riskLevel, setRiskLevel] = useState<RiskLevel>(inspection?.riskAssessment ?? 'medium');
  const [notes, setNotes] = useState(inspection?.notes ?? '');
  const [submitted, setSubmitted] = useState(false);

  if (!order) {
    return (
      <DashboardLayout role="inspector" sidebarItems={sidebarItems} userName={fallbackInspector?.firstName}>
        <Card>
          <CardHeader>
            <CardTitle>Einreichung nicht verfügbar</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Die gewünschte Inspektion konnte nicht geladen werden.</p>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  if (submitted) {
    return (
      <DashboardLayout role="inspector" sidebarItems={sidebarItems} userName={inspector?.firstName}>
        <Card className="mx-auto max-w-2xl">
          <CardContent className="flex flex-col items-center gap-4 px-6 py-12 text-center">
            <CheckCircle2 className="h-14 w-14 text-emerald-600" />
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Inspektion erfolgreich eingereicht</h1>
              <p className="text-muted-foreground">
                Die Mock-Einreichung für Auftrag {order.id} wurde gespeichert und an die Qualitätsprüfung übergeben.
              </p>
            </div>
            <Link href={`/inspector/orders/${order.id}`}>
              <a>
                <Button>Zurück zum Auftrag</Button>
              </a>
            </Link>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="inspector" sidebarItems={sidebarItems} userName={inspector?.firstName}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inspektion einreichen</h1>
          <p className="text-muted-foreground">
            Abschlussprüfung für Auftrag {order.id} und finale Risikoeinschätzung festhalten.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <DashboardMetricCard
            title="Fahrzeug"
            value={vehicle ? `${vehicle.make} ${vehicle.model}` : 'Nicht verfügbar'}
            description={vehicle?.licensePlate}
            icon={<CarFront className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Checkliste"
            value={`${completedItems} von ${totalItems}`}
            description="Bewertete Prüfpunkte"
            icon={<ClipboardCheck className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Paket"
            value={pkg?.name ?? 'Nicht zugewiesen'}
            description="Grundlage der Prüfung"
            icon={<CheckCheck className="w-5 h-5" />}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Einreichungsübersicht</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 text-sm md:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="text-muted-foreground">Fahrzeug</p>
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
            </div>

            <div className="space-y-3 rounded-lg border p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Checklistenfortschritt</span>
                <span className="text-muted-foreground">
                  {completedItems} von {totalItems} Punkten abgeschlossen
                </span>
              </div>
              <Progress value={completionPercentage} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-foreground">Risikobewertung</h2>
              </div>
              <RadioGroup
                value={riskLevel}
                onValueChange={(value) => setRiskLevel(value as RiskLevel)}
                className="grid gap-3 md:grid-cols-3"
              >
                {riskOptions.map((option) => (
                  <Label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3">
                    <RadioGroupItem value={option.value} />
                    <span>{option.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="general-notes">Allgemeine Notizen</Label>
              <Textarea
                id="general-notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="min-h-32"
                placeholder="Zusammenfassung der wichtigsten Feststellungen und Hinweise für QA."
              />
            </div>

            <div className="flex justify-end">
              <Button size="lg" onClick={() => setSubmitted(true)}>
                Inspektion einreichen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
