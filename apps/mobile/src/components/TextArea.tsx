import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface TextAreaProps {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  error?: string;
  required?: boolean;
}

export function TextArea({
  label,
  value,
  onChangeText,
  placeholder,
  maxLength,
  error,
  required,
}: TextAreaProps) {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <TextInput
        multiline
        textAlignVertical="top"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        maxLength={maxLength}
        style={[styles.input, error ? styles.inputError : undefined]}
      />

      <View style={styles.metaRow}>
        <View style={styles.errorContainer}>{error && <Text style={styles.error}>{error}</Text>}</View>
        <Text style={styles.count}>
          {value.length}
          {maxLength ? `/${maxLength}` : ''}
        </Text>
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
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  errorContainer: {
    flex: 1,
    paddingRight: 12,
  },
  error: {
    color: '#EF4444',
    fontSize: 12,
  },
  count: {
    color: '#6B7280',
    fontSize: 12,
  },
});
