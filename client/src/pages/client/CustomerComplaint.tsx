import { useMemo, useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  getComplaintsByCustomerId,
  getCustomerById,
  getOrdersByCustomerId,
  getVehicleById,
} from '@/lib/mock-data';
import type { Complaint } from '@/types';
import { AlertCircle, ClipboardList, LayoutDashboard, MessageSquareWarning, Send, Wrench } from 'lucide-react';

const customerId = 'cust-1';
const sidebarItems = [
  { label: 'Dashboard', href: '/customer/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Meine Aufträge', href: '/customer/orders/ord-1', icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'Beschwerde', href: '/customer/complaint', icon: <AlertCircle className="w-4 h-4" /> },
];

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

const statusLabels: Record<Complaint['status'], string> = {
  open: 'Offen',
  in_progress: 'In Bearbeitung',
  resolved: 'Gelöst',
  closed: 'Geschlossen',
};

const priorityLabels: Record<Complaint['priority'], string> = {
  low: 'Niedrig',
  medium: 'Mittel',
  high: 'Hoch',
  urgent: 'Dringend',
};

const statusClasses: Record<Complaint['status'], string> = {
  open: 'bg-red-100 text-red-800',
  in_progress: 'bg-amber-100 text-amber-800',
  resolved: 'bg-emerald-100 text-emerald-800',
  closed: 'bg-slate-100 text-slate-800',
};

export default function CustomerComplaint() {
  const customer = getCustomerById(customerId);
  const customerOrders = getOrdersByCustomerId(customerId);
  const [complaintList, setComplaintList] = useState<Complaint[]>(getComplaintsByCustomerId(customerId));
  const [orderId, setOrderId] = useState(customerOrders[0]?.id ?? '');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const openCount = useMemo(
    () => complaintList.filter((complaint) => ['open', 'in_progress'].includes(complaint.status)).length,
    [complaintList]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!orderId || !subject.trim() || !description.trim()) {
      return;
    }

    const newComplaint: Complaint = {
      id: `comp-local-${complaintList.length + 1}`,
      orderId,
      customerId,
      subject: subject.trim(),
      description: description.trim(),
      status: 'open',
      priority: 'medium',
      createdAt: new Date().toISOString(),
    };

    setComplaintList((current) => [newComplaint, ...current]);
    setSubject('');
    setDescription('');
    setSubmitted(true);
  };

  return (
    <DashboardLayout role="client" sidebarItems={sidebarItems} userName={customer?.firstName}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Beschwerde einreichen</h1>
          <p className="text-muted-foreground">
            Melden Sie Unstimmigkeiten zu einem Auftrag direkt an unser Support-Team.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <DashboardMetricCard
            title="Aufträge"
            value={customerOrders.length}
            description="Für Beschwerden auswählbar"
            icon={<Wrench className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Beschwerden gesamt"
            value={complaintList.length}
            description="Historie aus Mock-Daten"
            icon={<MessageSquareWarning className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Offene Fälle"
            value={openCount}
            description="Offen oder in Bearbeitung"
            icon={<AlertCircle className="w-5 h-5" />}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Neuen Fall anlegen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {submitted && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                Ihre Beschwerde wurde als neuer Mock-Fall erfasst.
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="order-select">Auftrags-ID</Label>
                  <Select value={orderId} onValueChange={setOrderId}>
                    <SelectTrigger id="order-select" className="w-full">
                      <SelectValue placeholder="Auftrag auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {customerOrders.map((order) => {
                        const vehicle = getVehicleById(order.vehicleId);

                        return (
                          <SelectItem key={order.id} value={order.id}>
                            {order.id} • {vehicle ? `${vehicle.make} ${vehicle.model}` : 'Fahrzeug'}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Betreff</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="z. B. Rückfrage zum Prüfbericht"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Beschreibung</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Bitte schildern Sie Ihr Anliegen mit allen relevanten Details."
                  className="min-h-32"
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit">
                  <Send className="mr-2 h-4 w-4" />
                  Beschwerde absenden
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bestehende Beschwerden</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {complaintList.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aktuell liegen keine Beschwerden vor.</p>
            ) : (
              complaintList.map((complaint, index) => {
                const order = customerOrders.find((entry) => entry.id === complaint.orderId);
                const vehicle = order ? getVehicleById(order.vehicleId) : undefined;

                return (
                  <div key={complaint.id} className="space-y-4">
                    {index > 0 && <Separator />}
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-foreground">{complaint.subject}</h3>
                          <Badge className={statusClasses[complaint.status]}>
                            {statusLabels[complaint.status]}
                          </Badge>
                          <Badge variant="outline">Priorität: {priorityLabels[complaint.priority]}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Auftrag {complaint.orderId}
                          {vehicle ? ` • ${vehicle.make} ${vehicle.model}` : ''}
                        </p>
                        <p className="text-sm text-foreground">{complaint.description}</p>
                        {complaint.resolution && (
                          <p className="text-sm text-emerald-700">
                            Lösung: {complaint.resolution}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{formatDate(complaint.createdAt)}</p>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
