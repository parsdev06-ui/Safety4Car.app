import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface PriceCardProps {
  price: number | string;
  currency: string;
  label: string;
  highlighted: boolean;
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

export function PriceCard({ price, currency, label, highlighted }: PriceCardProps) {
  return (
    <View style={[styles.card, highlighted ? styles.cardHighlighted : undefined]}>
      <Text style={[styles.label, highlighted ? styles.labelHighlighted : undefined]}>{label}</Text>
      <Text style={[styles.price, highlighted ? styles.priceHighlighted : undefined]}>
        {formatPrice(price, currency)}
      </Text>
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
  cardHighlighted: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  labelHighlighted: {
    color: '#CBD5E1',
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2563EB',
  },
  priceHighlighted: {
    color: '#FFFFFF',
  },
});
