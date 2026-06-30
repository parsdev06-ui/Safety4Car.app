import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  selectedValue?: string | null;
  onValueChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export function Select({
  label,
  options,
  selectedValue,
  onValueChange,
  error,
  required,
  placeholder = 'Bitte auswählen',
}: SelectProps) {
  const [visible, setVisible] = React.useState(false);

  const selectedOption = options.find((option) => option.value === selectedValue);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setVisible(true)}
        style={[styles.trigger, error ? styles.triggerError : undefined]}
      >
        <Text style={[styles.triggerText, !selectedOption ? styles.placeholderText : undefined]}>
          {selectedOption?.label || placeholder}
        </Text>
        <Text style={styles.chevron}>⌄</Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      <Modal animationType="fade" transparent visible={visible} onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.backdrop} onPress={() => setVisible(false)}>
          <Pressable style={styles.modalCard} onPress={(event) => event.stopPropagation()}>
            <Text style={styles.modalTitle}>{label || 'Option auswählen'}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {options.map((option) => {
                const isSelected = option.value === selectedValue;
                return (
                  <TouchableOpacity
                    key={option.value}
                    activeOpacity={0.7}
                    onPress={() => handleSelect(option.value)}
                    style={[styles.option, isSelected ? styles.optionSelected : undefined]}
                  >
                    <Text style={[styles.optionText, isSelected ? styles.optionTextSelected : undefined]}>
                      {option.label}
                    </Text>
                    {isSelected && <Text style={styles.optionCheck}>✓</Text>}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
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
  trigger: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  triggerError: {
    borderColor: '#EF4444',
  },
  triggerText: {
    color: '#111827',
    fontSize: 16,
    flex: 1,
  },
  placeholderText: {
    color: '#6B7280',
  },
  chevron: {
    fontSize: 18,
    color: '#6B7280',
    marginLeft: 12,
  },
  error: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionSelected: {
    backgroundColor: '#EFF6FF',
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
  },
  optionTextSelected: {
    color: '#2563EB',
    fontWeight: '600',
  },
  optionCheck: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '700',
  },
});
