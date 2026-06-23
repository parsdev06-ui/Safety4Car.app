import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { tickets, complaints, orders } from '@/lib/mock-data';
import { Headphones, AlertCircle, Clock, CheckCircle } from 'lucide-react';

export default function CSDashboard() {
  const openTickets = tickets.filter(t => t.status === 'open');
  const openComplaints = complaints.filter(c => c.status === 'open');

  const sidebarItems = [
    { label: 'Dashboard', href: '/cs/dashboard', active: true, icon: <Headphones className="w-4 h-4" /> },
    { label: 'Tickets', href: '/cs/tickets', icon: <AlertCircle className="w-4 h-4" /> },
    { label: 'Kunden', href: '/cs/customers', icon: <Headphones className="w-4 h-4" /> },
    { label: 'Aufträge', href: '/cs/orders', icon: <Clock className="w-4 h-4" /> },
    { label: 'Beschwerden', href: '/cs/complaints', icon: <AlertCircle className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout role="cs" sidebarItems={sidebarItems}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Customer Success Dashboard
          </h1>
          <p className="text-muted-foreground">
            Übersicht über Kundenunterstützung und Support-Tickets.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <DashboardMetricCard
            title="Offene Tickets"
            value={openTickets.length}
            icon={<AlertCircle className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Offene Beschwerden"
            value={openComplaints.length}
            icon={<AlertCircle className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Gelöste Tickets"
            value={tickets.filter(t => t.status === 'resolved').length}
            icon={<CheckCircle className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Gesamtaufträge"
            value={orders.length}
            icon={<Clock className="w-5 h-5" />}
          />
        </div>

        {/* Open Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>Offene Support-Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            {openTickets.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">Keine offenen Tickets</p>
            ) : (
              <div className="space-y-3">
                {openTickets.map(ticket => (
                  <div key={ticket.id} className="p-3 border border-border rounded-lg">
                    <h4 className="font-semibold text-foreground">{ticket.subject}</h4>
                    <p className="text-sm text-muted-foreground">{ticket.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">{ticket.priority}</span>
                      <span className="text-xs text-muted-foreground">{ticket.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Open Complaints */}
        <Card>
          <CardHeader>
            <CardTitle>Offene Beschwerden</CardTitle>
          </CardHeader>
          <CardContent>
            {openComplaints.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">Keine offenen Beschwerden</p>
            ) : (
              <div className="space-y-3">
                {openComplaints.map(complaint => (
                  <div key={complaint.id} className="p-3 border border-border rounded-lg">
                    <h4 className="font-semibold text-foreground">{complaint.subject}</h4>
                    <p className="text-sm text-muted-foreground">{complaint.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">{complaint.priority}</span>
                      <span className="text-xs text-muted-foreground">{complaint.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
