import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface PayoutCardProps {
  totalEarnings: number | string;
  pendingAmount: number | string;
  completedCount: number;
  currency: string;
}

function formatPrice(price: number | string, currency: string) {
  if (typeof price === 'number') {
    if (currency.length === 3) {
      try {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(price);
      } catch {
        return `${price.toFixed(2)} ${currency}`;
      }
    }

    return `${price.toFixed(2)} ${currency}`;
  }

  return `${price} ${currency}`;
}

export function PayoutCard({ totalEarnings, pendingAmount, completedCount, currency }: PayoutCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Auszahlungsübersicht</Text>
      <Text style={styles.total}>{formatPrice(totalEarnings, currency)}</Text>
      <Text style={styles.totalLabel}>Gesamteinnahmen</Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{formatPrice(pendingAmount, currency)}</Text>
          <Text style={styles.statLabel}>Ausstehend</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{completedCount}</Text>
          <Text style={styles.statLabel}>Abgeschlossen</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 16,
  },
  heading: {
    fontSize: 14,
    color: '#CBD5E1',
    marginBottom: 8,
  },
  total: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  totalLabel: {
    fontSize: 14,
    color: '#CBD5E1',
    marginTop: 4,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#CBD5E1',
  },
});
