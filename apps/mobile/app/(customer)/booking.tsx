import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Button, Input } from '../../src/components';

const COLORS = {
  navy: '#0F172A',
  blue: '#2563EB',
  emerald: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444',
  bg: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
};

const PACKAGE_NAMES: Record<string, string> = {
  'pkg-1': 'Self-Check',
  'pkg-2': 'Basic Check',
  'pkg-3': 'Premium Check',
};

const LOCATIONS = ['Berlin', 'München', 'Hamburg', 'Köln', 'Frankfurt'];
const TIME_SLOTS = ['09:00', '10:30', '13:00', '14:30', '16:00'];

export default function BookingScreen() {
  const router = useRouter();
  const { packageId } = useLocalSearchParams<{ packageId: string }>();

  const [currentStep, setCurrentStep] = useState(0);
  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    licensePlate: '',
    vin: '',
  });
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    location: '',
  });

  const steps = ['Fahrzeugart', 'Termin', 'Bestätigung'];
  const packageName = packageId ? PACKAGE_NAMES[packageId] || 'Paket' : 'Paket';

  const handleVehicleChange = (key: string, value: string) => {
    setVehicleData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAppointmentChange = (key: string, value: string) => {
    setAppointmentData((prev) => ({ ...prev, [key]: value }));
  };

  const validateStep = () => {
    if (currentStep === 0) {
      return vehicleData.make && vehicleData.model && vehicleData.year && vehicleData.licensePlate;
    }
    if (currentStep === 1) {
      return appointmentData.date && appointmentData.time && appointmentData.location;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) {
      Alert.alert('Fehler', 'Bitte füllen Sie alle erforderlichen Felder aus');
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleConfirm = () => {
    Alert.alert('Erfolg', 'Buchung abgeschlossen! Sie werden zum Dashboard weitergeleitet.', [
      {
        text: 'OK',
        onPress: () => router.push('/(customer)/dashboard'),
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
        }}
      >
        <TouchableOpacity onPress={handleBack} style={{ marginRight: 12 }}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '700', color: COLORS.text, flex: 1 }}>
          Buchung
        </Text>
        <Text style={{ fontSize: 12, color: COLORS.muted }}>
          Schritt {currentStep + 1}/{steps.length}
        </Text>
      </View>

      {/* Step Indicator */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 16, backgroundColor: COLORS.surface }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {steps.map((step, index) => (
            <View key={index} style={{ alignItems: 'center', flex: 1 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: index <= currentStep ? COLORS.blue : COLORS.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    color: index <= currentStep ? '#FFFFFF' : COLORS.muted,
                    fontWeight: '600',
                    fontSize: 14,
                  }}
                >
                  {index + 1}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 11,
                  color: index <= currentStep ? COLORS.text : COLORS.muted,
                  textAlign: 'center',
                }}
              >
                {step}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Content */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
          {currentStep === 0 && (
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.text, marginBottom: 16 }}>
                Fahrzeugdaten
              </Text>

              <Input
                placeholder="Hersteller (z.B. BMW)"
                value={vehicleData.make}
                onChangeText={(value) => handleVehicleChange('make', value)}
                style={{ marginBottom: 12 }}
              />

              <Input
                placeholder="Modell (z.B. 3er)"
                value={vehicleData.model}
                onChangeText={(value) => handleVehicleChange('model', value)}
                style={{ marginBottom: 12 }}
              />

              <Input
                placeholder="Baujahr (z.B. 2020)"
                value={vehicleData.year}
                onChangeText={(value) => handleVehicleChange('year', value)}
                keyboardType="number-pad"
                style={{ marginBottom: 12 }}
              />

              <Input
                placeholder="Laufleistung (km)"
                value={vehicleData.mileage}
                onChangeText={(value) => handleVehicleChange('mileage', value)}
                keyboardType="number-pad"
                style={{ marginBottom: 12 }}
              />

              <Input
                placeholder="Kennzeichen"
                value={vehicleData.licensePlate}
                onChangeText={(value) => handleVehicleChange('licensePlate', value.toUpperCase())}
                style={{ marginBottom: 12 }}
              />

              <Input
                placeholder="VIN (optional)"
                value={vehicleData.vin}
                onChangeText={(value) => handleVehicleChange('vin', value)}
              />
            </View>
          )}

          {currentStep === 1 && (
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.text, marginBottom: 16 }}>
                Termin wählen
              </Text>

              <Text style={{ fontSize: 14, color: COLORS.text, fontWeight: '500', marginBottom: 8 }}>
                Standort
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
                {LOCATIONS.map((location) => (
                  <TouchableOpacity
                    key={location}
                    onPress={() => handleAppointmentChange('location', location)}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 8,
                      backgroundColor: appointmentData.location === location ? COLORS.blue : COLORS.border,
                      marginRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: appointmentData.location === location ? '#FFFFFF' : COLORS.text,
                        fontWeight: '500',
                        fontSize: 13,
                      }}
                    >
                      {location}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={{ fontSize: 14, color: COLORS.text, fontWeight: '500', marginBottom: 8 }}>
                Datum
              </Text>
              <Input
                placeholder="z.B. 15.01.2024"
                value={appointmentData.date}
                onChangeText={(value) => handleAppointmentChange('date', value)}
                style={{ marginBottom: 16 }}
              />

              <Text style={{ fontSize: 14, color: COLORS.text, fontWeight: '500', marginBottom: 8 }}>
                Uhrzeit
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {TIME_SLOTS.map((time) => (
                  <TouchableOpacity
                    key={time}
                    onPress={() => handleAppointmentChange('time', time)}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 8,
                      backgroundColor: appointmentData.time === time ? COLORS.blue : COLORS.border,
                      marginRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: appointmentData.time === time ? '#FFFFFF' : COLORS.text,
                        fontWeight: '500',
                        fontSize: 13,
                      }}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {currentStep === 2 && (
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.text, marginBottom: 16 }}>
                Bestätigung
              </Text>

              {/* Summary Card */}
              <View
                style={{
                  backgroundColor: COLORS.surface,
                  borderRadius: 10,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  marginBottom: 16,
                }}
              >
                <View style={{ marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border }}>
                  <Text style={{ fontSize: 12, color: COLORS.muted, marginBottom: 4 }}>
                    PAKET
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.text }}>
                    {packageName}
                  </Text>
                </View>

                <View style={{ marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border }}>
                  <Text style={{ fontSize: 12, color: COLORS.muted, marginBottom: 4 }}>
                    FAHRZEUG
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.text }}>
                    {vehicleData.make} {vehicleData.model} ({vehicleData.year})
                  </Text>
                  <Text style={{ fontSize: 13, color: COLORS.muted, marginTop: 4 }}>
                    Kennzeichen: {vehicleData.licensePlate}
                  </Text>
                </View>

                <View>
                  <Text style={{ fontSize: 12, color: COLORS.muted, marginBottom: 4 }}>
                    TERMIN
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.text }}>
                    {appointmentData.date} um {appointmentData.time}
                  </Text>
                  <Text style={{ fontSize: 13, color: COLORS.muted, marginTop: 4 }}>
                    Standort: {appointmentData.location}
                  </Text>
                </View>
              </View>

              <Text style={{ fontSize: 12, color: COLORS.muted, lineHeight: 18 }}>
                Mit der Buchung bestätigen Sie, dass alle Angaben korrekt sind. Sie erhalten eine Bestätigungsemail mit weiteren Details.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: COLORS.surface,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          flexDirection: 'row',
          gap: 12,
        }}
      >
        <Button
          title="Zurück"
          onPress={handleBack}
          style={{
            flex: 1,
            backgroundColor: COLORS.border,
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          textStyle={{ color: COLORS.text, fontWeight: '600' }}
        />
        {currentStep < steps.length - 1 ? (
          <Button
            title="Weiter"
            onPress={handleNext}
            style={{
              flex: 1,
              backgroundColor: COLORS.blue,
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            textStyle={{ color: '#FFFFFF', fontWeight: '600' }}
          />
        ) : (
          <Button
            title="Buchung abschließen"
            onPress={handleConfirm}
            style={{
              flex: 1,
              backgroundColor: COLORS.emerald,
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            textStyle={{ color: '#FFFFFF', fontWeight: '600' }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
