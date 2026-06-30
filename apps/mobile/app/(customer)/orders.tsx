import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBadge } from '../../src/components';
import { orders } from '../../src/lib/mock-data';
import { getVehicleLabel, getVehiclePlate, getPackageName, formatDate } from '../../src/lib/helpers';

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

export default function OrdersScreen() {
  const router = useRouter();

  const handleOrderPress = (orderId: string) => {
    router.push(`/(customer)/order-detail?orderId=${orderId}`);
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
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '700', color: COLORS.text }}>
          Meine Buchungen
        </Text>
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.surface,
              borderRadius: 10,
              padding: 14,
              borderWidth: 1,
              borderColor: COLORS.border,
            }}
            onPress={() => handleOrderPress(item.id)}
            activeOpacity={0.7}
          >
            {/* Top Row: Vehicle & Status */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: COLORS.text }}>
                  {getVehicleLabel(item.vehicleId)}
                </Text>
                <Text style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>
                  {getVehiclePlate(item.vehicleId)}
                </Text>
              </View>
              <StatusBadge status={item.status} style={{ marginLeft: 10 }} />
            </View>

            {/* Middle Row: Package & Date */}
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 13, fontWeight: '500', color: COLORS.text }}>
                {getPackageName(item.packageId)}
              </Text>
              <Text style={{ fontSize: 12, color: COLORS.muted, marginTop: 3 }}>
                {formatDate(item.createdAt)}
              </Text>
            </View>

            {/* Order ID */}
            <Text style={{ fontSize: 11, color: COLORS.muted }}>
              Bestellung: {item.id}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
            <Ionicons name="document-outline" size={48} color={COLORS.border} style={{ marginBottom: 12 }} />
            <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 4 }}>
              Keine Buchungen
            </Text>
            <Text style={{ fontSize: 13, color: COLORS.muted, textAlign: 'center' }}>
              Sie haben noch keine Inspektionen gebucht. Starten Sie jetzt eine neue Buchung.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
