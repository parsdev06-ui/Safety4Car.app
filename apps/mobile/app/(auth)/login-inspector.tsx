import React, { useState } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Input, ScreenHeader } from '../../src/components';

export default function LoginInspectorScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('stefan.koch@example.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = () => {
    router.replace('/(inspector)/dashboard');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
          <ScreenHeader title="Inspektor Login" subtitle="Zugang für Prüfpartner" showBack />
          
          <View style={{ marginTop: 32 }}>
            <Input
              label="E-Mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="inspektor@email.de"
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
            <Button title="Als Inspektor anmelden" onPress={handleLogin} variant="secondary" fullWidth />
            <Text style={{ textAlign: 'center', marginTop: 16, color: '#6B7280', fontSize: 12 }}>
              Mock-Login: Beliebige Daten akzeptiert
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
