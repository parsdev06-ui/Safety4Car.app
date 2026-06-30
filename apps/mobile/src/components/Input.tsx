import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
}

export function Input({ label, error, required, style, ...props }: Props) {
  return (
    <View style={{ marginBottom: 16 }}>
      {label && (
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827', marginBottom: 6 }}>
          {label}{required && <Text style={{ color: '#EF4444' }}> *</Text>}
        </Text>
      )}
      <TextInput
        style={[
          {
            borderWidth: 1,
            borderColor: error ? '#EF4444' : '#E5E7EB',
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 12,
            fontSize: 16,
            color: '#111827',
            backgroundColor: '#FFFFFF',
          },
          style,
        ]}
        placeholderTextColor="#6B7280"
        {...props}
      />
      {error && (
        <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>{error}</Text>
      )}
    </View>
  );
}
