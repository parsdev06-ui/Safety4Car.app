import React, { useState } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Input, ScreenHeader } from '../../src/components';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('max.mueller@example.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = () => {
    router.replace('/(customer)/dashboard');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
          <ScreenHeader title="Anmelden" subtitle="Willkommen zurück bei Safety4Car" showBack />
          
          <View style={{ marginTop: 32 }}>
            <Input
              label="E-Mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="ihre@email.de"
              required
            />
            <Input
              label="Passwort"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              required
            />
            <Button title="Anmelden" onPress={handleLogin} fullWidth />
            <Text style={{ textAlign: 'center', marginTop: 16, color: '#6B7280', fontSize: 12 }}>
              Mock-Login: Beliebige Daten akzeptiert
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
