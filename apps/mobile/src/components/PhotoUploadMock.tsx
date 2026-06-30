import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface PhotoUploadMockProps {
  label: string;
  required?: boolean;
  photoCount: number;
  maxPhotos: number;
}

export function PhotoUploadMock({ label, required, photoCount, maxPhotos }: PhotoUploadMockProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>

      <View style={styles.placeholder}>
        <Text style={styles.icon}>📷</Text>
        <Text style={styles.count}>
          {photoCount} / {maxPhotos} Fotos
        </Text>
        <Text style={styles.hint}>Mock - keine echte Upload-Funktion</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 6,
  },
  required: {
    color: '#EF4444',
  },
  placeholder: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
    marginBottom: 8,
  },
  count: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  hint: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },
});
