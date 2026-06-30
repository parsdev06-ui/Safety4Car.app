import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PackageCardProps {
  name: string;
  price: number | string;
  currency: string;
  description: string;
  features: string[];
  selected: boolean;
  onSelect: () => void;
  popular?: boolean;
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

export function PackageCard({
  name,
  price,
  currency,
  description,
  features,
  selected,
  onSelect,
  popular,
}: PackageCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onSelect}
      style={[styles.card, selected ? styles.cardSelected : undefined]}
    >
      {popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Beliebt</Text>
        </View>
      )}

      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={[styles.selectionIndicator, selected ? styles.selectionIndicatorActive : undefined]}>
          {selected && <Text style={styles.selectionCheck}>✓</Text>}
        </View>
      </View>

      <Text style={styles.price}>{formatPrice(price, currency)}</Text>

      <View style={styles.featuresList}>
        {features.map((feature) => (
          <View key={feature} style={styles.featureRow}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    marginBottom: 16,
    position: 'relative',
  },
  cardSelected: {
    borderColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingRight: 56,
  },
  headerText: {
    flex: 1,
    paddingRight: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  selectionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionIndicatorActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  selectionCheck: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 16,
  },
  featuresList: {
    gap: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureIcon: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 10,
    lineHeight: 22,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    lineHeight: 22,
  },
});
