import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import { Check } from 'lucide-react';
import { packages } from '@/lib/mock-data';

export default function BookingPackage() {
  return (
    <PublicLayout>
      <section className="py-12">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <span>Inspektion buchen</span>
            <span>/</span>
            <span className="text-foreground font-medium">Paket wählen</span>
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Wählen Sie Ihr Inspektionspaket
            </h1>
            <p className="text-muted-foreground">
              Wählen Sie das Paket, das Ihren Anforderungen entspricht.
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {packages.map((pkg, index) => (
              <Card
                key={pkg.id}
                className={`relative flex flex-col ${
                  index === 1 ? 'md:scale-105 border-primary shadow-lg' : ''
                }`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Beliebt
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">{pkg.description}</p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-primary">
                      {pkg.price}€
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Geschätzte Dauer: {pkg.estimatedDuration}h
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/booking/vehicle">
                    <a>
                      <Button className="w-full" variant={index === 1 ? 'default' : 'outline'}>
                        Wählen
                      </Button>
                    </a>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Section */}
          <Card className="bg-muted/50 border-border">
            <CardHeader>
              <CardTitle>Häufig gestellte Fragen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Welches Paket sollte ich wählen?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Wählen Sie Self-Check für eine schnelle Selbstbewertung, Basic Check für eine professionelle Inspektion oder Premium Check für eine umfassende Analyse mit Video-Dokumentation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Kann ich mein Paket später ändern?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Ja, Sie können Ihr Paket bis 24 Stunden vor dem Inspektionstermin ändern.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Gibt es zusätzliche Gebühren?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Nein, der angezeigte Preis ist der Gesamtpreis. Es gibt keine versteckten Gebühren.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
