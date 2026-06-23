import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'wouter';
import { useState } from 'react';

export default function BookingVehicle() {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    licensePlate: '',
    mileage: '',
  });

  return (
    <PublicLayout>
      <section className="py-12">
        <div className="container max-w-2xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/booking/package">
              <a className="hover:text-foreground">Paket wählen</a>
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Fahrzeug</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Fahrzeuginformationen
            </h1>
            <p className="text-muted-foreground">
              Geben Sie die Details Ihres Fahrzeugs ein.
            </p>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Fahrzeugdetails</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="make">Hersteller</Label>
                    <Input
                      id="make"
                      placeholder="z.B. BMW"
                      value={formData.make}
                      onChange={(e) =>
                        setFormData({ ...formData, make: e.target.value })
                      }
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Modell</Label>
                    <Input
                      id="model"
                      placeholder="z.B. 3 Series"
                      value={formData.model}
                      onChange={(e) =>
                        setFormData({ ...formData, model: e.target.value })
                      }
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="year">Baujahr</Label>
                    <Input
                      id="year"
                      type="number"
                      placeholder="z.B. 2019"
                      value={formData.year}
                      onChange={(e) =>
                        setFormData({ ...formData, year: e.target.value })
                      }
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mileage">Kilometerstand</Label>
                    <Input
                      id="mileage"
                      type="number"
                      placeholder="z.B. 45000"
                      value={formData.mileage}
                      onChange={(e) =>
                        setFormData({ ...formData, mileage: e.target.value })
                      }
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="vin">Fahrgestellnummer (VIN)</Label>
                  <Input
                    id="vin"
                    placeholder="z.B. WBADT43452G915234"
                    value={formData.vin}
                    onChange={(e) =>
                      setFormData({ ...formData, vin: e.target.value })
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="licensePlate">Kennzeichen</Label>
                  <Input
                    id="licensePlate"
                    placeholder="z.B. B-AB-123"
                    value={formData.licensePlate}
                    onChange={(e) =>
                      setFormData({ ...formData, licensePlate: e.target.value })
                    }
                    className="mt-2"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Link href="/booking/package">
                    <a>
                      <Button variant="outline">Zurück</Button>
                    </a>
                  </Link>
                  <Link href="/booking/appointment">
                    <a>
                      <Button className="flex-1">Weiter</Button>
                    </a>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
