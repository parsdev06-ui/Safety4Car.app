import React from 'react';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  children: React.ReactNode;
}

export function Card({ children, style, ...props }: Props) {
  return (
    <View
      style={[
        {
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: '#E5E7EB',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
