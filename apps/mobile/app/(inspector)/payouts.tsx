import { View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader, Card } from '../../src/components';
import { payouts } from '../../src/lib/mock-data';
import { formatDate } from '../../src/lib/helpers';
import type { Payout } from '../../src/types';

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

export default function PayoutsScreen() {
  // Calculate summary stats
  const totalEarned = payouts.reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payouts
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);
  const completedAmount = payouts
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return colors.emerald;
      case 'pending':
        return colors.blue;
      case 'failed':
        return '#EF4444';
      default:
        return colors.muted;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Abgerechnet';
      case 'pending':
        return 'Ausstehend';
      case 'failed':
        return 'Fehlgeschlagen';
      default:
        return 'Unbekannt';
    }
  };

  const renderPayoutItem = ({ item }: { item: Payout }) => (
    <Card
      style={{
        marginHorizontal: 16,
        marginBottom: 10,
        padding: 14,
        borderLeftWidth: 4,
        borderLeftColor: getStatusColor(item.status),
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.navy, marginBottom: 2 }}>
            Bestellung {item.orderId}
          </Text>
          <Text style={{ fontSize: 12, color: colors.muted }}>
            {formatDate(item.createdAt)}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: colors.emerald, marginBottom: 4 }}>
            +{item.amount.toFixed(2)}€
          </Text>
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
                fontSize: 10,
                fontWeight: '600',
                color: getStatusColor(item.status),
              }}
            >
              {getStatusLabel(item.status)}
            </Text>
          </View>
        </View>
      </View>

    </Card>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <ScreenHeader title="Auszahlungen" />

        {/* Total Earnings Summary */}
        <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
          <Card
            style={{
              padding: 16,
              backgroundColor: colors.blue,
            }}
          >
            <Text style={{ fontSize: 12, color: '#FFFFFF', opacity: 0.8, marginBottom: 4 }}>
              Gesamtverdienste
            </Text>
            <Text style={{ fontSize: 32, fontWeight: '700', color: '#FFFFFF', marginBottom: 12 }}>
              {totalEarned.toFixed(2)}€
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontSize: 11, color: '#FFFFFF', opacity: 0.8, marginBottom: 2 }}>
                  Abgerechnet
                </Text>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>
                  {completedAmount.toFixed(2)}€
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 11, color: '#FFFFFF', opacity: 0.8, marginBottom: 2 }}>
                  Ausstehend
                </Text>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>
                  {pendingAmount.toFixed(2)}€
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Summary Stats Row */}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            gap: 12,
            marginBottom: 24,
          }}
        >
          <Card
            style={{
              flex: 1,
              padding: 12,
              alignItems: 'center',
            }}
          >
            <Ionicons name="cash" size={20} color={colors.emerald} style={{ marginBottom: 6 }} />
            <Text style={{ fontSize: 12, fontWeight: '600', color: colors.emerald, marginBottom: 4 }}>
              {payouts.filter((p) => p.status === 'completed').length}
            </Text>
            <Text style={{ fontSize: 10, color: colors.muted, textAlign: 'center' }}>
              Abgerechnet
            </Text>
          </Card>

          <Card
            style={{
              flex: 1,
              padding: 12,
              alignItems: 'center',
            }}
          >
            <Ionicons name="hourglass" size={20} color={colors.blue} style={{ marginBottom: 6 }} />
            <Text style={{ fontSize: 12, fontWeight: '600', color: colors.blue, marginBottom: 4 }}>
              {payouts.filter((p) => p.status === 'pending').length}
            </Text>
            <Text style={{ fontSize: 10, color: colors.muted, textAlign: 'center' }}>
              Ausstehend
            </Text>
          </Card>

          <Card
            style={{
              flex: 1,
              padding: 12,
              alignItems: 'center',
            }}
          >
            <Ionicons name="calendar" size={20} color={colors.muted} style={{ marginBottom: 6 }} />
            <Text style={{ fontSize: 12, fontWeight: '600', color: colors.muted, marginBottom: 4 }}>
              {payouts.length}
            </Text>
            <Text style={{ fontSize: 10, color: colors.muted, textAlign: 'center' }}>
              Transaktionen
            </Text>
          </Card>
        </View>

        {/* Payout History Section */}
        <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.navy }}>
            Zahlungshistorie
          </Text>
        </View>

        {/* Payout List */}
        <FlatList
          data={payouts}
          renderItem={renderPayoutItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={{ paddingHorizontal: 16, paddingVertical: 40, alignItems: 'center' }}>
              <Ionicons name="wallet" size={48} color={colors.muted} />
              <Text style={{ fontSize: 14, color: colors.muted, marginTop: 12 }}>
                Keine Zahlungen verfügbar
              </Text>
            </View>
          }
        />

        {/* Payment Info Card */}
        <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
          <Card
            style={{
              padding: 14,
              backgroundColor: '#EFF6FF',
              borderLeftWidth: 4,
              borderLeftColor: colors.blue,
            }}
          >
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Ionicons name="information-circle" size={18} color={colors.blue} style={{ marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: colors.blue, marginBottom: 4 }}>
                  Zahlungsinformationen
                </Text>
                <Text style={{ fontSize: 11, color: colors.text }}>
                  Auszahlungen werden jeden Mittwoch verarbeitet. Ausstehende Beträge werden in 2-3 Werktagen auf Ihr Bankkonto überwiesen.
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
