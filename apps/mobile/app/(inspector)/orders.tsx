import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader, Card, StatusBadge } from '../../src/components';
import { inspectorOrders } from '../../src/lib/mock-data';
import { getVehicleLabel, getVehiclePlate, getPackageName } from '../../src/lib/helpers';
import type { Order } from '../../src/types';

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

export default function OrdersScreen() {
  const router = useRouter();

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

  const renderOrderCard = ({ item }: { item: Order }) => (
    <TouchableOpacity
      onPress={() => router.push(`/(inspector)/order-detail?orderId=${item.id}`)}
      activeOpacity={0.7}
    >
      <Card
        style={{
          marginHorizontal: 16,
          marginBottom: 12,
          padding: 14,
          borderLeftWidth: 4,
          borderLeftColor: getStatusColor(item.status),
        }}
      >
        {/* Header with vehicle and status */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.navy, marginBottom: 2 }}>
              {getVehicleLabel(item.vehicleId)}
            </Text>
            <Text style={{ fontSize: 13, color: colors.text, marginBottom: 4 }}>
              {getVehiclePlate(item.vehicleId)}
            </Text>
            <Text style={{ fontSize: 12, color: colors.muted }}>
              {getPackageName(item.packageId)}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: getStatusColor(item.status) + '20',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: '600',
                color: getStatusColor(item.status),
              }}
            >
              {getStatusLabel(item.status)}
            </Text>
          </View>
        </View>

        {/* Appointment Details */}
        <View
          style={{
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: colors.border,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 }}>
              <Ionicons name="calendar" size={14} color={colors.muted} />
              <Text style={{ fontSize: 12, color: colors.text }}>
                {(item.appointmentDate ? new Date(item.appointmentDate) : new Date()).toLocaleDateString('de-DE', {
                  weekday: 'short',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 }}>
              <Ionicons name="time" size={14} color={colors.muted} />
              <Text style={{ fontSize: 12, color: colors.text }}>{item.appointmentTime}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="location" size={14} color={colors.muted} />
            <Text style={{ fontSize: 12, color: colors.text, flex: 1 }}>
              {item.appointmentLocation || ''}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Aufträge" />
      <FlatList
        data={inspectorOrders}
        renderItem={renderOrderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 12 }}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 }}>
            <Ionicons name="clipboard" size={48} color={colors.muted} />
            <Text style={{ fontSize: 14, color: colors.muted, marginTop: 12 }}>
              Keine Aufträge verfügbar
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
