import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../src/components';

export default function IndexScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <View style={{ marginBottom: 48, alignItems: 'center' }}>
          <Text style={{ fontSize: 32, fontWeight: '700', color: '#0F172A', marginBottom: 8 }}>
            Safety4Car
          </Text>
          <Text style={{ fontSize: 16, color: '#6B7280', textAlign: 'center' }}>
            Digitale Plattform für Gebrauchtwagen-Checks
          </Text>
        </View>

        <View style={{ width: '100%', gap: 12 }}>
          <Button
            title="Als Kunde anmelden"
            onPress={() => router.push('/(auth)/login')}
            fullWidth
          />
          <Button
            title="Als Inspektor anmelden"
            onPress={() => router.push('/(auth)/login-inspector')}
            variant="secondary"
            fullWidth
          />
          <Button
            title="Registrieren"
            onPress={() => router.push('/(auth)/register')}
            variant="outline"
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
