import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface VehicleSummaryCardProps {
  make: string;
  model: string;
  year: number | string;
  mileage: number | string;
  licensePlate: string;
  color: string;
}

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

export function VehicleSummaryCard({
  make,
  model,
  year,
  mileage,
  licensePlate,
  color,
}: VehicleSummaryCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {make} {model}
      </Text>
      <View style={styles.grid}>
        <DetailItem label="Baujahr" value={String(year)} />
        <DetailItem label="Kilometer" value={String(mileage)} />
        <DetailItem label="Kennzeichen" value={licensePlate} />
        <DetailItem label="Farbe" value={color} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  detailItem: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
});
