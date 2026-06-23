import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import { ArrowRight, FileText, MapPin, Camera, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  return (
    <PublicLayout>
      {/* Header */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            So funktioniert Safety4Car
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ein einfacher, transparenter Prozess von der Buchung bis zum Report.
          </p>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="space-y-12">
            {/* Step 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Paket wählen</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Wählen Sie zwischen drei Inspektionspaketen: Self-Check (72€), Basic Check (120€) oder Premium Check (300€). Jedes Paket ist auf unterschiedliche Anforderungen zugeschnitten.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Transparente Preisgestaltung
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Keine versteckten Gebühren
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Sofortige Bestätigung
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-8 flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">3</div>
                  <p className="text-muted-foreground">Inspektionspakete</p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-primary rotate-90" />
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
              <div className="md:order-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Fahrzeug registrieren</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Geben Sie die Fahrzeuginformationen ein: Hersteller, Modell, Baujahr, Fahrgestellnummer und Kilometerstand. Diese Daten helfen unserem Inspector, eine genaue Inspektion durchzuführen.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Einfaches Formular
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Sichere Datenspeicherung
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    2 Minuten zum Ausfüllen
                  </li>
                </ul>
              </div>
              <div className="md:order-1 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-8 flex items-center justify-center h-64">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary/40 mx-auto mb-2" />
                  <p className="text-muted-foreground">Fahrzeuginformationen</p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-primary rotate-90" />
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Termin buchen</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Wählen Sie einen Inspektionspartner in Ihrer Nähe und einen verfügbaren Termin. Unser System verbindet Sie mit dem besten Inspector für Ihr Fahrzeug.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Verfügbare Termine anzeigen
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Flexible Zeitfenster
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Sofortige Bestätigung
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-8 flex items-center justify-center h-64">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-primary/40 mx-auto mb-2" />
                  <p className="text-muted-foreground">Inspektionstermin</p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-primary rotate-90" />
            </div>

            {/* Step 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
              <div className="md:order-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Inspektion durchführen</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Unser zertifizierter Inspector führt eine gründliche Inspektion Ihres Fahrzeugs durch. Er überprüft alle wichtigen Systeme und dokumentiert alles mit Fotos.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    TÜV-zertifizierte Inspektoren
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Umfassende Checkliste
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Professionelle Dokumentation
                  </li>
                </ul>
              </div>
              <div className="md:order-1 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-8 flex items-center justify-center h-64">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-primary/40 mx-auto mb-2" />
                  <p className="text-muted-foreground">Inspektionsprozess</p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-primary rotate-90" />
            </div>

            {/* Step 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    5
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Report erhalten</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Erhalten Sie einen detaillierten Inspektionsbericht mit Fotos, Risikoanalyse und Empfehlungen. Der Report ist innerhalb von 24 Stunden verfügbar.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Detaillierte Analyse
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Hochwertige Fotos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Wartungsempfehlungen
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-8 flex items-center justify-center h-64">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-primary/40 mx-auto mb-2" />
                  <p className="text-muted-foreground">Inspektionsbericht</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Bereit zu starten?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Buchen Sie jetzt Ihre Fahrzeuginspection und erhalten Sie innerhalb von 24 Stunden einen detaillierten Report.
          </p>
          <Link href="/booking/package">
            <a>
              <Button size="lg">
                Inspektion buchen
              </Button>
            </a>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
