import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../src/components';

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

const PACKAGES = [
  {
    id: 'pkg-1',
    name: 'Self-Check',
    price: '72',
    description: 'Basis-Selbstcheck für regelmäßige Fahrer',
    features: [
      'Selbstdiagnose via App',
      'Fahrzeug-Grunddaten',
      'Basis-Checkliste',
      'PDF-Report',
    ],
    highlight: false,
  },
  {
    id: 'pkg-2',
    name: 'Basic Check',
    price: '120',
    description: 'Umfassende Sicherheitsprüfung',
    features: [
      'Vor-Ort Inspektion',
      'Technische Überprüfung',
      'Detaillierter Report',
      'Empfehlungen',
      'Email-Support',
    ],
    highlight: true,
  },
  {
    id: 'pkg-3',
    name: 'Premium Check',
    price: '300',
    description: 'Vollständige Sicherheitsanalyse',
    features: [
      'Erweiterte Diagnose',
      'Sicherheitsbericht',
      'Video-Dokumentation',
      'Fachberatung',
      'Priorisierter Support',
      '3-Monate Gültig',
    ],
    highlight: false,
  },
];

export default function PackagesScreen() {
  const router = useRouter();

  const handleSelectPackage = (packageId: string) => {
    router.push(`/(customer)/booking?packageId=${packageId}`);
  };

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
          Inspektions-Pakete
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Introduction */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20, marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 8 }}>
            Wählen Sie Ihr Inspektionspaket
          </Text>
          <Text style={{ fontSize: 14, color: COLORS.muted }}>
            Alle Pakete enthalten einen detaillierten Sicherheitsbericht und personalisierte Empfehlungen.
          </Text>
        </View>

        {/* Packages */}
        <FlatList
          data={PACKAGES}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: COLORS.surface,
                borderRadius: 12,
                overflow: 'hidden',
                borderWidth: item.highlight ? 2 : 1,
                borderColor: item.highlight ? COLORS.blue : COLORS.border,
              }}
            >
              {item.highlight && (
                <View
                  style={{
                    backgroundColor: COLORS.blue,
                    paddingVertical: 4,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '600' }}>
                    BELIEBTESTE WAHL
                  </Text>
                </View>
              )}

              <View style={{ padding: 16 }}>
                {/* Package Header */}
                <View style={{ marginBottom: 12 }}>
                  <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 4 }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: COLORS.muted }}>
                    {item.description}
                  </Text>
                </View>

                {/* Price */}
                <View style={{ marginBottom: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border }}>
                  <Text style={{ fontSize: 12, color: COLORS.muted, marginBottom: 4 }}>
                    Preis
                  </Text>
                  <Text style={{ fontSize: 28, fontWeight: '700', color: COLORS.navy }}>
                    {item.price}€
                  </Text>
                </View>

                {/* Features */}
                <View style={{ marginBottom: 16 }}>
                  {item.features.map((feature, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: index < item.features.length - 1 ? 8 : 0,
                      }}
                    >
                      <Ionicons name="checkmark-circle" size={18} color={COLORS.emerald} style={{ marginRight: 8 }} />
                      <Text style={{ fontSize: 13, color: COLORS.text }}>
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Button */}
                <Button
                  title="Paket wählen"
                  onPress={() => handleSelectPackage(item.id)}
                  style={{
                    backgroundColor: item.highlight ? COLORS.blue : COLORS.navy,
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  textStyle={{ color: '#FFFFFF', fontWeight: '600', fontSize: 15 }}
                />
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
