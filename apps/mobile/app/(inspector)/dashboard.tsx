import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader, Card, Button } from '../../src/components';
import { currentInspector, inspectorOrders } from '../../src/lib/mock-data';
import { getVehicleLabel, getVehiclePlate } from '../../src/lib/helpers';

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

export default function DashboardScreen() {
  const router = useRouter();
  const pendingCount = inspectorOrders.filter((o) => o.status !== 'completed').length;

  const handleNextOrder = () => {
    const nextOrder = inspectorOrders.find((o) => o.status === 'inspection_ready' || o.status === 'inspection_in_progress');
    if (nextOrder) {
      router.push(`/(inspector)/order-detail?orderId=${nextOrder.id}`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header */}
        <ScreenHeader title="Dashboard" />

        {/* Greeting */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 28, fontWeight: '700', color: colors.navy, marginBottom: 4 }}>
            Willkommen, {currentInspector.firstName}
          </Text>
          <Text style={{ fontSize: 14, color: colors.muted }}>
            Lassen Sie uns einen großartigen Tag haben
          </Text>
        </View>

        {/* Stats Cards */}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            gap: 12,
            marginBottom: 24,
          }}
        >
          {/* Completed Inspections */}
          <Card
            style={{
              flex: 1,
              padding: 16,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: '700', color: colors.blue, marginBottom: 4 }}>
              142
            </Text>
            <Text style={{ fontSize: 12, color: colors.muted, textAlign: 'center' }}>
              Abgeschlossene Inspektionen
            </Text>
          </Card>

          {/* Rating */}
          <Card
            style={{
              flex: 1,
              padding: 16,
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: colors.emerald }}>
                4.8
              </Text>
              <Ionicons name="star" size={16} color={colors.emerald} style={{ marginLeft: 4 }} />
            </View>
            <Text style={{ fontSize: 12, color: colors.muted, textAlign: 'center' }}>
              Bewertung
            </Text>
          </Card>

          {/* Pending Orders */}
          <Card
            style={{
              flex: 1,
              padding: 16,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: '700', color: colors.blue, marginBottom: 4 }}>
              {pendingCount}
            </Text>
            <Text style={{ fontSize: 12, color: colors.muted, textAlign: 'center' }}>
              Ausstehende Aufträge
            </Text>
          </Card>
        </View>

        {/* Upcoming Appointments Section */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: colors.navy, marginBottom: 12 }}>
            Bevorstehende Termine
          </Text>

          {inspectorOrders.slice(0, 3).map((order) => (
            <TouchableOpacity
              key={order.id}
              onPress={() => router.push(`/(inspector)/order-detail?orderId=${order.id}`)}
            >
              <Card
                style={{
                  marginBottom: 10,
                  padding: 12,
                  borderLeftWidth: 4,
                  borderLeftColor: order.status === 'completed' ? colors.emerald : colors.blue,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 8,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.navy }}>
                      {getVehicleLabel(order.vehicleId)}
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>
                      {getVehiclePlate(order.vehicleId)}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: order.status === 'completed' ? '#D1FAE5' : '#DBEAFE',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '600',
                        color: order.status === 'completed' ? colors.emerald : colors.blue,
                      }}
                    >
                      {order.status === 'completed' ? 'Abgeschlossen' : 'Ausstehend'}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    paddingTop: 8,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Ionicons name="calendar" size={12} color={colors.muted} />
                    <Text style={{ fontSize: 11, color: colors.muted }}>
                      {(order.appointmentDate ? new Date(order.appointmentDate) : new Date()).toLocaleDateString('de-DE', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Ionicons name="time" size={12} color={colors.muted} />
                    <Text style={{ fontSize: 11, color: colors.muted }}>
                      {order.appointmentTime}
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 16 }}>
          <Button
            title="Nächster Auftrag"
            onPress={handleNextOrder}
            style={{ backgroundColor: colors.blue }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
