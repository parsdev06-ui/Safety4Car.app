import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Button, Input } from '../../src/components';
import { orders } from '../../src/lib/mock-data';
import { getVehicleLabel } from '../../src/lib/helpers';

const COLORS = {
  navy: '#0F172A',
  blue: '#2563EB',
  emerald: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444',
  bg: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
};

export default function SupportScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(orderId || '');
  const [submitted, setSubmitted] = useState(false);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  const handleSubmit = () => {
    if (!subject.trim() || !description.trim()) {
      Alert.alert('Fehler', 'Bitte füllen Sie alle erforderlichen Felder aus');
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      Alert.alert('Erfolg', 'Ihre Beschwerde wurde eingereicht. Unser Team wird sich in Kürze mit Ihnen in Verbindung setzen.', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    }, 500);
  };

  if (submitted) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.border,
          }}
        >
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '700', color: COLORS.text }}>
            Beschwerde einreichen
          </Text>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: COLORS.surface,
              borderRadius: 12,
              padding: 24,
              borderWidth: 1,
              borderColor: COLORS.border,
            }}
          >
            <Ionicons name="checkmark-circle" size={56} color={COLORS.emerald} style={{ marginBottom: 16 }} />
            <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 8, textAlign: 'center' }}>
              Beschwerde eingereicht
            </Text>
            <Text style={{ fontSize: 13, color: COLORS.muted, textAlign: 'center', lineHeight: 20 }}>
              Danke für Ihre Rückmeldung. Unser Support-Team wird sich in Kürze mit Ihnen in Verbindung setzen.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
        }}
      >
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '700', color: COLORS.text }}>
          Beschwerde einreichen
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Introduction */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          <Text style={{ fontSize: 14, color: COLORS.muted, lineHeight: 20 }}>
            Bitte füllen Sie das Formular aus, um eine Beschwerde oder Frage einzureichen. Unser Support-Team wird sich schnellstmöglich mit Ihnen in Verbindung setzen.
          </Text>
        </View>

        {/* Form */}
        <View style={{ paddingHorizontal: 16 }}>
          {/* Order Reference */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: COLORS.text, marginBottom: 8 }}>
              Buchungsreferenz (optional)
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.border,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                backgroundColor: COLORS.surface,
              }}
            >
              <TextInput
                placeholder="Wählen Sie eine Buchung..."
                editable={false}
                value={selectedOrderId}
                style={{
                  fontSize: 14,
                  color: COLORS.text,
                }}
              />
            </View>
            {orders.length > 0 && (
              <Text style={{ fontSize: 11, color: COLORS.muted, marginTop: 6 }}>
                Verlinked: {selectedOrder ? getVehicleLabel(selectedOrder.vehicleId) : ''}
              </Text>
            )}
          </View>

          {/* Subject */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: COLORS.text, marginBottom: 8 }}>
              Betreff *
            </Text>
            <Input
              placeholder="z.B. Frage zum Bericht"
              value={subject}
              onChangeText={setSubject}
              maxLength={80}
            />
            <Text style={{ fontSize: 11, color: COLORS.muted, marginTop: 4 }}>
              {subject.length}/80
            </Text>
          </View>

          {/* Description */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: COLORS.text, marginBottom: 8 }}>
              Beschreibung *
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.border,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                backgroundColor: COLORS.surface,
                minHeight: 120,
              }}
            >
              <TextInput
                placeholder="Beschreiben Sie Ihr Anliegen..."
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                maxLength={500}
                style={{
                  fontSize: 14,
                  color: COLORS.text,
                }}
              />
            </View>
            <Text style={{ fontSize: 11, color: COLORS.muted, marginTop: 4 }}>
              {description.length}/500
            </Text>
          </View>

          {/* Info Box */}
          <View
            style={{
              backgroundColor: '#EFF6FF',
              borderRadius: 8,
              padding: 12,
              borderWidth: 1,
              borderColor: '#BFDBFE',
              marginBottom: 24,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Ionicons name="help-circle" size={16} color={COLORS.blue} style={{ marginRight: 8, marginTop: 2 }} />
              <Text style={{ fontSize: 11, color: '#1E40AF', lineHeight: 16, flex: 1 }}>
                Unser Support-Team antwortet normalerweise innerhalb von 24 Stunden.
              </Text>
            </View>
          </View>

          {/* Submit Button */}
          <Button
            title="Beschwerde einreichen"
            onPress={handleSubmit}
            style={{
              backgroundColor: COLORS.blue,
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
            textStyle={{ color: '#FFFFFF', fontWeight: '600', fontSize: 15 }}
          />

          {/* Cancel Button */}
          <Button
            title="Abbrechen"
            onPress={() => router.back()}
            style={{
              backgroundColor: COLORS.surface,
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: COLORS.border,
            }}
            textStyle={{ color: COLORS.text, fontWeight: '600', fontSize: 15 }}
          />
        </View>

        {/* Contact Info */}
        <View style={{ paddingHorizontal: 16, marginTop: 24, borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 16 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: COLORS.text, marginBottom: 10 }}>
            Weitere Kontaktoptionen
          </Text>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 12,
              paddingVertical: 10,
              backgroundColor: COLORS.surface,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: COLORS.border,
              marginBottom: 8,
            }}
          >
            <Ionicons name="mail" size={18} color={COLORS.blue} style={{ marginRight: 10 }} />
            <View>
              <Text style={{ fontSize: 12, color: COLORS.muted }}>Email</Text>
              <Text style={{ fontSize: 13, fontWeight: '500', color: COLORS.text }}>
                support@safety4car.de
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 12,
              paddingVertical: 10,
              backgroundColor: COLORS.surface,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: COLORS.border,
            }}
          >
            <Ionicons name="call" size={18} color={COLORS.blue} style={{ marginRight: 10 }} />
            <View>
              <Text style={{ fontSize: 12, color: COLORS.muted }}>Telefon</Text>
              <Text style={{ fontSize: 13, fontWeight: '500', color: COLORS.text }}>
                +49 (0) 30 123456
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
