import React, { useState } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Input, ScreenHeader } from '../../src/components';

export default function RegisterScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    router.replace('/(customer)/dashboard');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, padding: 24 }}>
          <ScreenHeader title="Registrieren" subtitle="Erstellen Sie Ihr Safety4Car Konto" showBack />
          
          <View style={{ marginTop: 24 }}>
            <Input label="Vorname" value={firstName} onChangeText={setFirstName} placeholder="Max" required />
            <Input label="Nachname" value={lastName} onChangeText={setLastName} placeholder="Mueller" required />
            <Input label="E-Mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="ihre@email.de" required />
            <Input label="Telefon" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="+49 30 123456" />
            <Input label="Passwort" value={password} onChangeText={setPassword} secureTextEntry placeholder="Mind. 8 Zeichen" required />
            <Button title="Konto erstellen" onPress={handleRegister} fullWidth />
            <Text style={{ textAlign: 'center', marginTop: 16, color: '#6B7280', fontSize: 12 }}>
              Mock-Registrierung: Keine echte Validierung
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
