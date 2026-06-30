import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader, Card, Button } from '../../src/components';
import { inspectorOrders } from '../../src/lib/mock-data';
import { getVehicle, getVehicleLabel, getVehiclePlate, getPackageName } from '../../src/lib/helpers';

const colors = {
  navy: '#0F172A',
  blue: '#2563EB',
  emerald: '#10B981',
  bg: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
};

export default function OrderDetailScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const order = inspectorOrders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <ScreenHeader title="Auftrag nicht gefunden" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: colors.muted }}>Dieser Auftrag existiert nicht.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const canStartInspection = order.status === 'inspection_ready' || order.status === 'inspection_in_progress';
  const vehicle = getVehicle(order.vehicleId);

  const handleStartInspection = () => {
    router.push(`/(inspector)/inspection?orderId=${order.id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return colors.emerald;
      case 'inspection_in_progress':
        return colors.blue;
      case 'inspection_ready':
        return colors.blue;
      default:
        return colors.muted;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Abgeschlossen';
      case 'inspection_in_progress':
        return 'In Bearbeitung';
      case 'inspection_ready':
        return 'Bereit';
      default:
        return 'Ausstehend';
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <ScreenHeader title="Auftragdetails" />

        {/* Status Badge */}
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: getStatusColor(order.status) + '20',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                color: getStatusColor(order.status),
              }}
            >
              {getStatusLabel(order.status)}
            </Text>
          </View>
        </View>

        {/* Vehicle Information */}
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.navy, marginBottom: 10 }}>
            Fahrzeuginformationen
          </Text>
          <Card style={{ padding: 14 }}>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 2 }}>Marke & Modell</Text>
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
                {getVehicleLabel(order.vehicleId)}
              </Text>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 2 }}>Kennzeichen</Text>
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
                {getVehiclePlate(order.vehicleId)}
              </Text>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 2 }}>Baujahr</Text>
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
                {vehicle?.year ?? '–'}
              </Text>
            </View>

            <View>
              <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 2 }}>Kilometerstand</Text>
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
                {vehicle ? `${vehicle.mileage.toLocaleString('de-DE')} km` : '–'}
              </Text>
            </View>
          </Card>
        </View>

        {/* Appointment Information */}
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.navy, marginBottom: 10 }}>
            Termindetails
          </Text>
          <Card style={{ padding: 14 }}>
            <View style={{ marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Ionicons name="calendar" size={16} color={colors.blue} />
              <View>
                <Text style={{ fontSize: 12, color: colors.muted }}>Datum</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
                  {(order.appointmentDate ? new Date(order.appointmentDate) : new Date()).toLocaleDateString('de-DE', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </View>
            </View>

            <View style={{ marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Ionicons name="time" size={16} color={colors.blue} />
              <View>
                <Text style={{ fontSize: 12, color: colors.muted }}>Uhrzeit</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
                  {order.appointmentTime}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Ionicons name="location" size={16} color={colors.blue} />
              <View>
                <Text style={{ fontSize: 12, color: colors.muted }}>Ort</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
                  {order.appointmentLocation || ''}
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Package Information */}
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.navy, marginBottom: 10 }}>
            Inspektionspaket
          </Text>
          <Card
            style={{
              padding: 14,
              borderLeftWidth: 4,
              borderLeftColor: colors.emerald,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 4 }}>
              {getPackageName(order.packageId)}
            </Text>
            <Text style={{ fontSize: 12, color: colors.muted }}>
              Umfassende Fahrzeuginspektionen mit Checklisten
            </Text>
          </Card>
        </View>

        {/* Action Button */}
        {canStartInspection && (
          <View style={{ paddingHorizontal: 16 }}>
            <Button
              title="Inspektion starten"
              onPress={handleStartInspection}
              style={{ backgroundColor: colors.emerald }}
            />
          </View>
        )}

        {order.status === 'completed' && (
          <View style={{ paddingHorizontal: 16 }}>
            <Card style={{ padding: 14, backgroundColor: '#D1FAE5' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Ionicons name="checkmark-circle" size={20} color={colors.emerald} />
                <Text style={{ fontSize: 13, fontWeight: '600', color: colors.emerald }}>
                  Diese Inspektion wurde abgeschlossen
                </Text>
              </View>
            </Card>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
