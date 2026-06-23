import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import { CheckCircle, Shield, Zap, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                Professionelle Fahrzeuginspektionen mit Vertrauen
              </h1>
              <p className="text-lg text-muted-foreground">
                Safety4Car verbindet Kunden mit zertifizierten Inspektoren für transparente, detaillierte Fahzeuginspektionen. Sicherheit durch Expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking/package">
                  <a>
                    <Button size="lg" className="w-full sm:w-auto">
                      Inspektion buchen
                    </Button>
                  </a>
                </Link>
                <Link href="/so-funktionierts">
                  <a>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Mehr erfahren
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border border-primary/20 flex items-center justify-center">
              <div className="text-center">
                <Shield className="w-24 h-24 text-primary/40 mx-auto mb-4" />
                <p className="text-muted-foreground">Professionelle Inspektionen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Warum Safety4Car?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Wir machen Fahzeuginspektionen einfach, transparent und zuverlässig.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Zertifizierte Inspektoren</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Alle unsere Inspektoren sind TÜV-zertifiziert und hochqualifiziert.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Schnelle Termine</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Buchen Sie einen Termin in wenigen Minuten und erhalten Sie schnelle Ergebnisse.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Detaillierte Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Umfassende Inspektionsberichte mit Fotos und Empfehlungen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Transparente Preise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Keine versteckten Gebühren. Alle Preise sind von Anfang an klar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              So funktioniert's
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Paket wählen',
                description: 'Wählen Sie zwischen Self-Check, Basic oder Premium Check',
              },
              {
                step: '2',
                title: 'Fahrzeug registrieren',
                description: 'Geben Sie Ihre Fahrzeuginformationen ein',
              },
              {
                step: '3',
                title: 'Termin buchen',
                description: 'Wählen Sie einen Termin bei einem Inspektionspartner',
              },
              {
                step: '4',
                title: 'Report erhalten',
                description: 'Erhalten Sie einen detaillierten Inspektionsbericht',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Bereit für Ihre Inspektion?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Buchen Sie jetzt eine professionelle Fahrzeuginspection und erhalten Sie innerhalb von 24 Stunden einen detaillierten Report.
            </p>
            <Link href="/booking/package">
              <a>
                <Button size="lg" variant="secondary">
                  Jetzt buchen
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
