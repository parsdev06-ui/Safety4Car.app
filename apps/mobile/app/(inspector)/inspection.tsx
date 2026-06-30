import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader, Card, Button } from '../../src/components';
import { inspectorOrders, defaultChecklist } from '../../src/lib/mock-data';
import { getVehicleLabel, getVehiclePlate } from '../../src/lib/helpers';

const colors = {
  navy: '#0F172A',
  blue: '#2563EB',
  emerald: '#10B981',
  bg: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
};

interface ChecklistItemStatus {
  itemId: string;
  status: 'pass' | 'fail' | 'warning' | null;
  notes: string;
  photoCount: number;
}

export default function InspectionScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const order = inspectorOrders.find((o) => o.id === orderId);
  const [itemStatuses, setItemStatuses] = useState<Record<string, ChecklistItemStatus>>(
    defaultChecklist.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: { itemId: item.id, status: null, notes: '', photoCount: 0 },
      }),
      {}
    )
  );
  const [generalNotes, setGeneralNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!order) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <ScreenHeader title="Inspektion" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: colors.muted }}>Auftrag nicht gefunden.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleStatusChange = (itemId: string, status: 'pass' | 'fail' | 'warning') => {
    setItemStatuses((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        status: prev[itemId].status === status ? null : status,
      },
    }));
  };

  const handleNotesChange = (itemId: string, notes: string) => {
    setItemStatuses((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        notes,
      },
    }));
  };

  const handleAddPhoto = (itemId: string) => {
    Alert.alert('Fotos hinzufügen', 'Mock: Foto-Upload simuliert', [
      {
        text: 'OK',
        onPress: () => {
          setItemStatuses((prev) => ({
            ...prev,
            [itemId]: {
              ...prev[itemId],
              photoCount: prev[itemId].photoCount + 1,
            },
          }));
        },
      },
    ]);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setTimeout(() => {
      Alert.alert('Erfolg', 'Inspektion erfolgreich eingereicht', [
        {
          text: 'OK',
          onPress: () => {
            setSubmitting(false);
            router.push('/(inspector)/orders');
          },
        },
      ]);
    }, 500);
  };

  // Group checklist items by category
  const groupedItems = defaultChecklist.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof defaultChecklist>
  );

  const getStatusColor = (status: 'pass' | 'fail' | 'warning' | null) => {
    switch (status) {
      case 'pass':
        return colors.emerald;
      case 'fail':
        return '#EF4444';
      case 'warning':
        return '#F59E0B';
      default:
        return colors.border;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <ScreenHeader title="Inspektionsprotokolle" />

        {/* Vehicle Header */}
        <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
          <Card style={{ padding: 14, backgroundColor: '#DBEAFE', borderLeftWidth: 4, borderLeftColor: colors.blue }}>
            <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 4 }}>Fahrzeug</Text>
            <Text style={{ fontSize: 16, fontWeight: '700', color: colors.navy }}>
              {getVehicleLabel(order.vehicleId)}
            </Text>
            <Text style={{ fontSize: 13, color: colors.text, marginTop: 4 }}>
              {getVehiclePlate(order.vehicleId)}
            </Text>
          </Card>
        </View>

        {/* Checklist Categories */}
        {Object.entries(groupedItems).map(([category, items]) => (
          <View key={category} style={{ paddingHorizontal: 16, marginBottom: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.navy, marginBottom: 12 }}>
              {category}
            </Text>

            {items.map((item) => {
              const itemStatus = itemStatuses[item.id];
              return (
                <Card key={item.id} style={{ marginBottom: 12, padding: 14 }}>
                  {/* Item Name and Description */}
                  <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 2 }}>
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.muted }}>
                      {item.description}
                    </Text>
                  </View>

                  {/* Status Buttons */}
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 8,
                      marginBottom: 12,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handleStatusChange(item.id, 'pass')}
                      style={{
                        flex: 1,
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        borderRadius: 6,
                        backgroundColor: itemStatus.status === 'pass' ? colors.emerald : colors.border + '40',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: 4,
                      }}
                    >
                      <Ionicons
                        name="checkmark-circle"
                        size={14}
                        color={itemStatus.status === 'pass' ? '#FFFFFF' : colors.muted}
                      />
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '600',
                          color: itemStatus.status === 'pass' ? '#FFFFFF' : colors.muted,
                        }}
                      >
                        OK
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStatusChange(item.id, 'warning')}
                      style={{
                        flex: 1,
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        borderRadius: 6,
                        backgroundColor: itemStatus.status === 'warning' ? '#F59E0B' : colors.border + '40',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: 4,
                      }}
                    >
                      <Ionicons
                        name="alert-circle"
                        size={14}
                        color={itemStatus.status === 'warning' ? '#FFFFFF' : colors.muted}
                      />
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '600',
                          color: itemStatus.status === 'warning' ? '#FFFFFF' : colors.muted,
                        }}
                      >
                        Warnung
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleStatusChange(item.id, 'fail')}
                      style={{
                        flex: 1,
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        borderRadius: 6,
                        backgroundColor: itemStatus.status === 'fail' ? '#EF4444' : colors.border + '40',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: 4,
                      }}
                    >
                      <Ionicons
                        name="close-circle"
                        size={14}
                        color={itemStatus.status === 'fail' ? '#FFFFFF' : colors.muted}
                      />
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '600',
                          color: itemStatus.status === 'fail' ? '#FFFFFF' : colors.muted,
                        }}
                      >
                        Fehler
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Notes Input */}
                  <TextInput
                    placeholder="Notizen (optional)"
                    value={itemStatus.notes}
                    onChangeText={(text) => handleNotesChange(item.id, text)}
                    style={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 6,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      fontSize: 12,
                      color: colors.text,
                      marginBottom: 10,
                      backgroundColor: colors.bg,
                    }}
                    multiline
                      placeholderTextColor={colors.muted}
                    numberOfLines={2}
                  />

                  {/* Photo Button and Count */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handleAddPhoto(item.id)}
                      style={{
                        flex: 1,
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        borderRadius: 6,
                        backgroundColor: colors.blue + '20',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: 6,
                      }}
                    >
                      <Ionicons name="camera" size={14} color={colors.blue} />
                      <Text style={{ fontSize: 11, fontWeight: '600', color: colors.blue }}>
                        Fotos hinzufügen
                      </Text>
                    </TouchableOpacity>

                    {itemStatus.photoCount > 0 && (
                      <View
                        style={{
                          backgroundColor: colors.emerald,
                          paddingHorizontal: 10,
                          paddingVertical: 6,
                          borderRadius: 6,
                          alignItems: 'center',
                        }}
                      >
                        <Text style={{ fontSize: 11, fontWeight: '600', color: '#FFFFFF' }}>
                          {itemStatus.photoCount} Fotos
                        </Text>
                      </View>
                    )}
                  </View>
                </Card>
              );
            })}
          </View>
        ))}

        {/* General Notes Section */}
        <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.navy, marginBottom: 10 }}>
            Allgemeine Notizen
          </Text>
          <TextInput
            placeholder="Weitere Bemerkungen zur Inspektion (optional)"
            value={generalNotes}
            onChangeText={setGeneralNotes}
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 6,
              paddingHorizontal: 12,
              paddingVertical: 10,
              fontSize: 12,
              color: colors.text,
              backgroundColor: colors.surface,
              minHeight: 80,
              textAlignVertical: 'top',
            }}
            multiline
            placeholderTextColor={colors.muted}
            numberOfLines={4}
          />
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingHorizontal: 16,
          paddingVertical: 12,
          paddingBottom: 20,
        }}
      >
        <Button
          title="Inspektion einreichen"
          onPress={handleSubmit}
          style={{
            backgroundColor: colors.emerald,
            opacity: submitting ? 0.6 : 1,
          }}
          disabled={submitting}
        />
      </View>
    </SafeAreaView>
  );
}
