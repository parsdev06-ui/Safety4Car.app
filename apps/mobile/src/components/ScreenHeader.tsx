import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Props {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export function ScreenHeader({ title, subtitle, showBack = false }: Props) {
  const router = useRouter();

  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 }}>
      {showBack && (
        <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 8 }}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
      )}
      <Text style={{ fontSize: 28, fontWeight: '700', color: '#0F172A' }}>{title}</Text>
      {subtitle && (
        <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>{subtitle}</Text>
      )}
    </View>
  );
}
