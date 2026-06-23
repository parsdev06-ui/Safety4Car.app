import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import { partners } from '@/lib/mock-data';
import { useState } from 'react';

export default function BookingAppointment() {
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <PublicLayout>
      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/booking/vehicle">
              <a className="hover:text-foreground">Fahrzeug</a>
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Termin</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Inspektionstermin buchen
            </h1>
            <p className="text-muted-foreground">
              Wählen Sie einen Inspektionspartner und einen verfügbaren Termin.
            </p>
          </div>

          <div className="space-y-8">
            {/* Partner Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Inspektionspartner wählen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {partners.map((partner) => (
                    <div
                      key={partner.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedPartner === partner.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedPartner(partner.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{partner.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {partner.address}, {partner.city}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="text-muted-foreground">
                              {partner.inspectorCount} Inspektoren
                            </span>
                            <span className="text-emerald-600">
                              ★ {partner.averageRating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            selectedPartner === partner.id
                              ? 'border-primary bg-primary'
                              : 'border-border'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Date and Time Selection */}
            {selectedPartner && (
              <Card>
                <CardHeader>
                  <CardTitle>Datum und Uhrzeit wählen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-foreground">Datum</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full mt-2 px-3 py-2 border border-border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Uhrzeit</label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full mt-2 px-3 py-2 border border-border rounded-md"
                      >
                        <option value="">Wählen Sie eine Uhrzeit</option>
                        <option value="09:00">09:00 Uhr</option>
                        <option value="10:00">10:00 Uhr</option>
                        <option value="11:00">11:00 Uhr</option>
                        <option value="14:00">14:00 Uhr</option>
                        <option value="15:00">15:00 Uhr</option>
                        <option value="16:00">16:00 Uhr</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex gap-4">
              <Link href="/booking/vehicle">
                <a>
                  <Button variant="outline">Zurück</Button>
                </a>
              </Link>
              <Link href="/booking/checkout-preview">
                <a>
                  <Button disabled={!selectedPartner || !selectedDate || !selectedTime}>
                    Weiter
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
