import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import { Check } from 'lucide-react';
import { packages } from '@/lib/mock-data';

export default function Pricing() {
  return (
    <PublicLayout>
      {/* Header */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Transparente Preise
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wählen Sie das Inspektionspaket, das Ihren Anforderungen entspricht.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                      Geschätzte Dauer: {pkg.estimatedDuration} Stunde{pkg.estimatedDuration > 1 ? 'n' : ''}
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

                  <Link href="/booking/package">
                    <a>
                      <Button
                        className="w-full"
                        variant={index === 1 ? 'default' : 'outline'}
                      >
                        Jetzt buchen
                      </Button>
                    </a>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Häufig gestellte Fragen
          </h2>

          <div className="space-y-6">
            {[
              {
                question: 'Was ist in jedem Paket enthalten?',
                answer:
                  'Jedes Paket beinhaltet eine professionelle Inspektion durch einen zertifizierten Inspector, einen detaillierten Bericht mit Fotos und Empfehlungen. Das Premium-Paket beinhaltet zusätzlich eine Video-Dokumentation und erweiterte Analysen.',
              },
              {
                question: 'Wie lange dauert eine Inspektion?',
                answer:
                  'Die Dauer hängt vom gewählten Paket ab. Self-Check dauert etwa 1 Stunde, Basic Check 2 Stunden und Premium Check 3 Stunden.',
              },
              {
                question: 'Kann ich meinen Termin verschieben?',
                answer:
                  'Ja, Sie können Ihren Termin bis zu 24 Stunden vor dem geplanten Inspektionszeitpunkt kostenlos verschieben.',
              },
              {
                question: 'Erhalte ich eine Rückerstattung, wenn ich nicht zufrieden bin?',
                answer:
                  'Wir bieten eine 100%-Zufriedenheitsgarantie. Wenn Sie nicht zufrieden sind, erhalten Sie innerhalb von 7 Tagen eine vollständige Rückerstattung.',
              },
            ].map((item, index) => (
              <div key={index} className="border-b border-border pb-6 last:border-0">
                <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
