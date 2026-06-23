import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import { Check } from 'lucide-react';

export default function CheckoutPreview() {
  return (
    <PublicLayout>
      <section className="py-12">
        <div className="container max-w-2xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/booking/appointment">
              <a className="hover:text-foreground">Termin</a>
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Bestätigung</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Buchungsübersicht
            </h1>
            <p className="text-muted-foreground">
              Überprüfen Sie Ihre Buchung und bestätigen Sie die Zahlung.
            </p>
          </div>

          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Buchungsdetails</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                <div className="flex justify-between items-center pt-4">
                  <span className="text-lg font-semibold">Gesamtbetrag</span>
                  <span className="text-2xl font-bold text-primary">120€</span>
                </div>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle>Im Paket enthalten</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">
                      Professionelle Inspektion durch zertifizierten Inspector
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">
                      Detaillierter Inspektionsbericht mit Fotos
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">
                      Risikoanalyse und Wartungsempfehlungen
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">
                      Report innerhalb von 24 Stunden
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card className="bg-muted/50 border-border">
              <CardHeader>
                <CardTitle className="text-base">Zahlungsinformationen</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  Zahlungen werden sicher über unseren Payment-Provider verarbeitet. Sie erhalten eine Bestätigungsemail mit Ihrer Buchungsreferenz.
                </p>
                <p>
                  Sie können Ihre Buchung bis 24 Stunden vor dem Inspektionstermin kostenlos stornieren.
                </p>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex gap-4">
              <Link href="/booking/appointment">
                <a>
                  <Button variant="outline">Zurück</Button>
                </a>
              </Link>
              <Link href="/customer/dashboard">
                <a>
                  <Button className="flex-1">Zahlung abschließen</Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
