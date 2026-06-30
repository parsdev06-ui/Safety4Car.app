import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBadge } from '../../src/components';
import { orders } from '../../src/lib/mock-data';
import { getVehicleLabel, getVehiclePlate, formatDate } from '../../src/lib/helpers';

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

const MOCK_FINDINGS = [
  {
    id: 'f1',
    category: 'Bremsanlage',
    severity: 'high',
    title: 'Bremsbelag-Verschleiß',
    description: 'Der Bremsbelag zeigt erhöhten Verschleiß. Austausch empfohlen.',
  },
  {
    id: 'f2',
    category: 'Reifen',
    severity: 'medium',
    title: 'Reifenprofiltiefe',
    description: 'Profiltiefe an der Grenze. Überwachung empfohlen.',
  },
  {
    id: 'f3',
    category: 'Beleuchtung',
    severity: 'low',
    title: 'Scheinwerferbeschlag',
    description: 'Leichte Kondensation im Scheinwerfer erkannt.',
  },
];

const MOCK_RECOMMENDATIONS = [
  'Bremsbelag in nächster Zeit austauschen',
  'Reifendruck monatlich überprüfen',
  'Ölwechsel in 5.000 km fällig',
  'Nächste Inspektion in 12 Monaten empfohlen',
];

export default function ReportScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
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
            Inspektionsbericht
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, color: COLORS.text }}>Report nicht gefunden</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return COLORS.red;
      case 'medium':
        return COLORS.amber;
      case 'low':
        return COLORS.emerald;
      default:
        return COLORS.muted;
    }
  };

  const getRiskLevel = () => {
    const highCount = MOCK_FINDINGS.filter((f) => f.severity === 'high').length;
    if (highCount > 0) return { level: 'HOCH', color: COLORS.red };
    const mediumCount = MOCK_FINDINGS.filter((f) => f.severity === 'medium').length;
    if (mediumCount > 0) return { level: 'MITTEL', color: COLORS.amber };
    return { level: 'NIEDRIG', color: COLORS.emerald };
  };

  const riskLevel = getRiskLevel();

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
        <Text style={{ fontSize: 20, fontWeight: '700', color: COLORS.text, flex: 1 }}>
          Inspektionsbericht
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Risk Level Card */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          <View
            style={{
              backgroundColor: COLORS.surface,
              borderRadius: 12,
              padding: 20,
              borderWidth: 2,
              borderColor: riskLevel.color,
              alignItems: 'center',
            }}
          >
            <Ionicons
              name="alert-circle"
              size={48}
              color={riskLevel.color}
              style={{ marginBottom: 12 }}
            />
            <Text style={{ fontSize: 12, color: COLORS.muted, marginBottom: 4 }}>
              RISIKO-LEVEL
            </Text>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '700',
                color: riskLevel.color,
                marginBottom: 12,
              }}
            >
              {riskLevel.level}
            </Text>
            <Text style={{ fontSize: 14, color: COLORS.text, textAlign: 'center', fontWeight: '500' }}>
              {getVehicleLabel(order.vehicleId)}
            </Text>
            <Text style={{ fontSize: 12, color: COLORS.muted, textAlign: 'center', marginTop: 4 }}>
              {getVehiclePlate(order.vehicleId)}
            </Text>
          </View>
        </View>

        {/* Summary */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: COLORS.surface,
              borderRadius: 10,
              padding: 14,
              borderWidth: 1,
              borderColor: COLORS.border,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: 8 }}>
              Zusammenfassung
            </Text>
            <Text style={{ fontSize: 13, color: COLORS.text, lineHeight: 20 }}>
              Die Inspektion wurde am {formatDate(order.createdAt)} durchgeführt.{' '}
              {MOCK_FINDINGS.filter((f) => f.severity === 'high').length > 0
                ? 'Es wurden mehrere kritische Mängel festgestellt, die zeitnah behoben werden sollten.'
                : 'Das Fahrzeug befindet sich in gutem Zustand.'}
            </Text>
          </View>
        </View>

        {/* Findings */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 12 }}>
            Befunde ({MOCK_FINDINGS.length})
          </Text>

          <FlatList
            data={MOCK_FINDINGS}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: COLORS.surface,
                  borderRadius: 10,
                  padding: 12,
                  borderLeftWidth: 4,
                  borderLeftColor: getSeverityColor(item.severity),
                  borderWidth: 1,
                  borderColor: COLORS.border,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 6,
                  }}
                >
                  <Text style={{ fontSize: 13, fontWeight: '600', color: COLORS.text, flex: 1 }}>
                    {item.title}
                  </Text>
                  <View
                    style={{
                      backgroundColor: getSeverityColor(item.severity),
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 4,
                      marginLeft: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '600',
                        color: '#FFFFFF',
                      }}
                    >
                      {item.severity === 'high'
                        ? 'KRITISCH'
                        : item.severity === 'medium'
                          ? 'WARNUNG'
                          : 'INFO'}
                    </Text>
                  </View>
                </View>
                <Text style={{ fontSize: 11, color: COLORS.muted, marginBottom: 4 }}>
                  {item.category}
                </Text>
                <Text style={{ fontSize: 12, color: COLORS.text, lineHeight: 18 }}>
                  {item.description}
                </Text>
              </View>
            )}
          />
        </View>

        {/* Recommendations */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 12 }}>
            Empfehlungen
          </Text>

          <View
            style={{
              backgroundColor: COLORS.surface,
              borderRadius: 10,
              padding: 14,
              borderWidth: 1,
              borderColor: COLORS.border,
            }}
          >
            {MOCK_RECOMMENDATIONS.map((rec, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginBottom: index < MOCK_RECOMMENDATIONS.length - 1 ? 12 : 0,
                }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: COLORS.blue,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                    marginTop: 2,
                  }}
                >
                  <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '600' }}>
                    {index + 1}
                  </Text>
                </View>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 13,
                    color: COLORS.text,
                    lineHeight: 18,
                  }}
                >
                  {rec}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Disclaimer */}
        <View style={{ paddingHorizontal: 16 }}>
          <View
            style={{
              backgroundColor: '#FFF7ED',
              borderRadius: 8,
              padding: 12,
              borderWidth: 1,
              borderColor: '#FED7AA',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Ionicons name="information-circle" size={16} color={COLORS.amber} style={{ marginRight: 8, marginTop: 2 }} />
              <Text style={{ fontSize: 11, color: '#92400E', lineHeight: 16, flex: 1 }}>
                Risikoeinschätzung auf Grundlage des gebuchten Prüfumfangs.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
