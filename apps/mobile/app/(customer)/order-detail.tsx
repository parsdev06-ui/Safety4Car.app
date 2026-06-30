import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBadge, Button } from '../../src/components';
import { orders } from '../../src/lib/mock-data';
import { getVehicle, getVehicleLabel, getVehiclePlate, getPackageName, formatDate } from '../../src/lib/helpers';

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

const TIMELINE_STEPS = [
  { id: 'submitted', label: 'Gebucht', icon: 'checkmark-circle' },
  { id: 'confirmed', label: 'Bestätigt', icon: 'checkmark-circle' },
  { id: 'in_progress', label: 'In Bearbeitung', icon: 'hourglass' },
  { id: 'completed', label: 'Abgeschlossen', icon: 'checkmark-circle' },
];

export default function OrderDetailScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
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
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '700', color: COLORS.text }}>
            Buchungsdetails
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, color: COLORS.text }}>Buchung nicht gefunden</Text>
        </View>
      </SafeAreaView>
    );
  }

  const vehicle = getVehicle(order.vehicleId);

  const handleViewReport = () => {
    router.push(`/(customer)/report?orderId=${order.id}`);
  };

  const handleSupport = () => {
    router.push(`/(customer)/support?orderId=${order.id}`);
  };

  const getTimelineProgress = () => {
    const statuses = ['submitted', 'confirmed', 'in_progress', 'completed'];
    return statuses.indexOf(order.status) + 1;
  };

  const progress = getTimelineProgress();

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
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '700', color: COLORS.text, flex: 1 }}>
          Buchungsdetails
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Order Header */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          <View style={{ backgroundColor: COLORS.surface, borderRadius: 10, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border }}>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 14, color: COLORS.muted, marginBottom: 4 }}>
                FAHRZEUG
              </Text>
              <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.text }}>
                {getVehicleLabel(order.vehicleId)}
              </Text>
              <Text style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>
                {getVehiclePlate(order.vehicleId)}{vehicle?.year ? ` • ${vehicle.year}` : ''}
              </Text>
            </View>

            <View style={{ marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border }}>
              <Text style={{ fontSize: 14, color: COLORS.muted, marginBottom: 4 }}>
                PAKET
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.text }}>
                {getPackageName(order.packageId)}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ fontSize: 12, color: COLORS.muted, marginBottom: 4 }}>
                  STATUS
                </Text>
                <StatusBadge status={order.status} />
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 12, color: COLORS.muted, marginBottom: 4 }}>
                  BESTELLNR.
                </Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: COLORS.text }}>
                  {order.id}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: COLORS.surface, borderRadius: 10, padding: 12, borderWidth: 1, borderColor: COLORS.border }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="calendar" size={16} color={COLORS.blue} style={{ marginRight: 8 }} />
              <Text style={{ fontSize: 13, color: COLORS.text }}>
                {formatDate(order.createdAt)}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Ionicons name="location" size={16} color={COLORS.blue} style={{ marginRight: 8 }} />
              <Text style={{ fontSize: 13, color: COLORS.text }}>
                {order.appointmentLocation || ''}
              </Text>
            </View>
          </View>
        </View>

        {/* Timeline */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 16 }}>
            Bearbeitungsfortschritt
          </Text>

          {TIMELINE_STEPS.map((step, index) => {
            const isCompleted = index < progress;
            const isActive = index === progress - 1;

            return (
              <View key={step.id}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  {/* Timeline Circle */}
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: isCompleted ? COLORS.emerald : COLORS.border,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 12,
                      marginTop: 2,
                    }}
                  >
                    <Ionicons
                      name={(isCompleted ? 'checkmark' : step.icon) as any}
                      size={20}
                      color={isCompleted ? '#FFFFFF' : COLORS.muted}
                    />
                  </View>

                  {/* Content */}
                  <View style={{ flex: 1, paddingTop: 4 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: isActive ? '600' : '500',
                        color: isCompleted || isActive ? COLORS.text : COLORS.muted,
                      }}
                    >
                      {step.label}
                    </Text>
                    <Text style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>
                      {isCompleted
                        ? formatDate(order.createdAt)
                        : 'Ausstehend'}
                    </Text>
                  </View>
                </View>

                {/* Connector Line */}
                {index < TIMELINE_STEPS.length - 1 && (
                  <View
                    style={{
                      width: 2,
                      height: 24,
                      backgroundColor: isCompleted ? COLORS.emerald : COLORS.border,
                      marginLeft: 17,
                      marginVertical: 4,
                    }}
                  />
                )}
              </View>
            );
          })}
        </View>

        {/* Actions */}
        {order.status === 'completed' && (
          <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
            <Button
              title="Report ansehen"
              onPress={handleViewReport}
              style={{
                backgroundColor: COLORS.emerald,
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}
              textStyle={{ color: '#FFFFFF', fontWeight: '600' }}
            />
          </View>
        )}

        {/* Support Button */}
        <View style={{ paddingHorizontal: 16 }}>
          <Button
            title="Frage oder Beschwerde"
            onPress={handleSupport}
            style={{
              backgroundColor: COLORS.surface,
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: COLORS.border,
            }}
            textStyle={{ color: COLORS.blue, fontWeight: '600' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
