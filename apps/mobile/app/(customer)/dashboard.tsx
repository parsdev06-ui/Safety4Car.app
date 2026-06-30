import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBadge, Card, Button } from '../../src/components';
import { orders } from '../../src/lib/mock-data';
import { getVehicleLabel, getPackageName, formatDate } from '../../src/lib/helpers';

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

export default function DashboardScreen() {
  const router = useRouter();

  const activeOrders = orders.filter((order) => order.status !== 'completed').length;
  const completedOrders = orders.filter((order) => order.status === 'completed').length;
  const recentOrders = orders.slice(0, 3);

  const handleBookingPress = () => {
    router.push('/(customer)/packages');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16 }}>
          <Text style={{ fontSize: 28, fontWeight: '700', color: COLORS.text, marginBottom: 8 }}>
            Hallo, Kunde
          </Text>
          <Text style={{ fontSize: 14, color: COLORS.muted }}>
            Willkommen zu Safety4Car
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {/* Active Orders Card */}
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: COLORS.blue,
                borderRadius: 12,
                padding: 16,
              }}
              onPress={() => router.push('/(customer)/orders')}
            >
              <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 8 }}>
                Aktive Buchungen
              </Text>
              <Text style={{ fontSize: 28, fontWeight: '700', color: '#FFFFFF' }}>
                {activeOrders}
              </Text>
            </TouchableOpacity>

            {/* Completed Orders Card */}
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: COLORS.emerald,
                borderRadius: 12,
                padding: 16,
              }}
              onPress={() => router.push('/(customer)/orders')}
            >
              <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 8 }}>
                Abgeschlossen
              </Text>
              <Text style={{ fontSize: 28, fontWeight: '700', color: '#FFFFFF' }}>
                {completedOrders}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Action */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Button
            title="Neue Inspektion buchen"
            onPress={handleBookingPress}
            style={{
              backgroundColor: COLORS.blue,
              paddingVertical: 14,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            textStyle={{ color: '#FFFFFF', fontWeight: '600', fontSize: 16 }}
          />
        </View>

        {/* Recent Orders Section */}
        <View style={{ paddingHorizontal: 16 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.text }}>
              Letzte Buchungen
            </Text>
            <TouchableOpacity onPress={() => router.push('/(customer)/orders')}>
              <Text style={{ fontSize: 14, color: COLORS.blue, fontWeight: '500' }}>
                Alle ansehen
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={recentOrders}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.surface,
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 10,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                }}
                onPress={() => router.push(`/(customer)/order-detail?orderId=${item.id}`)}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: COLORS.text }}>
                      {getVehicleLabel(item.vehicleId)}
                    </Text>
                    <Text style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>
                      {getPackageName(item.packageId)}
                    </Text>
                  </View>
                  <StatusBadge status={item.status} style={{ marginLeft: 8 }} />
                </View>
                <Text style={{ fontSize: 11, color: COLORS.muted }}>
                  {formatDate(item.createdAt)}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
