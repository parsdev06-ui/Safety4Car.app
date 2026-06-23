import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export default function InspectionSubmit() {
  const sidebarItems = [
    { label: 'Dashboard', href: '/inspector/dashboard', icon: <Clock className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout role="inspector" sidebarItems={sidebarItems}>
      <Card>
        <CardHeader>
          <CardTitle>Inspektion einreichen</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Inspektions-Einreichungsformular wird hier angezeigt.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
