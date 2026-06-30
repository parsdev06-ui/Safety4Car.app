import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type ChecklistStatus = 'pending' | 'pass' | 'warning' | 'fail';

interface ChecklistItemProps {
  name: string;
  description: string;
  status: ChecklistStatus;
  onStatusChange: (status: ChecklistStatus) => void;
  notes?: string;
  onNotesChange: (notes: string) => void;
  required?: boolean;
}

const statusOptions: Array<{ value: ChecklistStatus; label: string; color: string }> = [
  { value: 'pending', label: 'Offen', color: '#6B7280' },
  { value: 'pass', label: 'OK', color: '#10B981' },
  { value: 'warning', label: 'Hinweis', color: '#F59E0B' },
  { value: 'fail', label: 'Mangel', color: '#EF4444' },
];

export function ChecklistItem({
  name,
  description,
  status,
  onStatusChange,
  notes,
  onNotesChange,
  required,
}: ChecklistItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>
            {name}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      <View style={styles.statusRow}>
        {statusOptions.map((option) => {
          const active = option.value === status;

          return (
            <TouchableOpacity
              key={option.value}
              activeOpacity={0.8}
              onPress={() => onStatusChange(option.value)}
              style={[
                styles.statusButton,
                active ? { borderColor: option.color, backgroundColor: `${option.color}15` } : undefined,
              ]}
            >
              <Text style={[styles.statusButtonText, active ? { color: option.color } : undefined]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TextInput
        multiline
        textAlignVertical="top"
        value={notes}
        onChangeText={onNotesChange}
        placeholder="Notizen hinzufügen"
        placeholderTextColor="#6B7280"
        style={styles.notesInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
  },
  header: {
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  required: {
    color: '#EF4444',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  statusButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  statusButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  notesInput: {
    minHeight: 88,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    color: '#111827',
  },
});
