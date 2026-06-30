import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface RiskBadgeProps {
  level: 'low' | 'medium' | 'high' | 'critical';
}

const riskConfig = {
  low: { backgroundColor: '#D1FAE5', textColor: '#10B981', label: 'Gering' },
  medium: { backgroundColor: '#FEF3C7', textColor: '#F59E0B', label: 'Mittel' },
  high: { backgroundColor: '#FEE2E2', textColor: '#EF4444', label: 'Hoch' },
  critical: { backgroundColor: '#FDE7D9', textColor: '#7C2D12', label: 'Kritisch' },
} as const;

export function RiskBadge({ level }: RiskBadgeProps) {
  const config = riskConfig[level];

  return (
    <View style={[styles.badge, { backgroundColor: config.backgroundColor }]}>
      <Text style={[styles.text, { color: config.textColor }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
