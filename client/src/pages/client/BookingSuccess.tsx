import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { CheckCircle, ArrowRight, Calendar, FileText } from 'lucide-react';

export default function BookingSuccess() {
  return (
    <PublicLayout>
      <section className="py-20">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">
              Buchung erfolgreich!
            </h1>
            <p className="text-lg text-muted-foreground">
              Ihre Inspektion wurde erfolgreich gebucht. Sie erhalten in Kürze eine Bestätigungsemail.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Buchungsnummer</span>
                <span className="font-semibold font-mono">ORD-2025-0042</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Paket</span>
                <span className="font-semibold">Basic Check</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Fahrzeug</span>
                <span className="font-semibold">BMW 3 Series (2019)</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Inspektionspartner</span>
                <span className="font-semibold">Berlin Auto Inspectors</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Termin</span>
                <span className="font-semibold">23. Juni 2025, 14:00 Uhr</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-semibold">Gezahlt</span>
                <span className="text-2xl font-bold text-emerald-600">120 €</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-semibold text-foreground">Nächste Schritte</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Termin bestätigt</p>
                  <p className="text-sm text-muted-foreground">
                    Bitte erscheinen Sie pünktlich am Inspektionsort mit Fahrzeug und Fahrzeugschein.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Prüfbericht</p>
                  <p className="text-sm text-muted-foreground">
                    Nach der Inspektion erhalten Sie Ihren Prüfbericht innerhalb von 24 Stunden in Ihrem Dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/customer/dashboard">
              <a className="flex-1">
                <Button className="w-full" size="lg">
                  Zum Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </Link>
            <Link href="/">
              <a>
                <Button variant="outline" size="lg">
                  Zur Startseite
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
