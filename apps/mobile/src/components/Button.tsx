import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export function Button({ title, onPress, variant = 'primary', disabled, loading, style, textStyle, fullWidth }: Props) {
  const baseStyle: ViewStyle = {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : undefined,
  };

  const variantStyles: Record<string, ViewStyle> = {
    primary: { backgroundColor: '#2563EB' },
    secondary: { backgroundColor: '#0F172A' },
    outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#E5E7EB' },
    danger: { backgroundColor: '#EF4444' },
  };

  const textColors: Record<string, string> = {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
    outline: '#111827',
    danger: '#FFFFFF',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[baseStyle, variantStyles[variant], style]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={textColors[variant]} />
      ) : (
        <Text style={[{ color: textColors[variant], fontSize: 16, fontWeight: '600' }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
