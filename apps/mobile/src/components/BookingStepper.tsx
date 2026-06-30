import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface BookingStepperProps {
  steps: string[];
  currentStep: number;
}

export function BookingStepper({ steps, currentStep }: BookingStepperProps) {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <View key={`${step}-${index}`} style={styles.stepWrapper}>
            <View style={styles.stepRow}>
              <View
                style={[
                  styles.circle,
                  isCompleted ? styles.circleCompleted : undefined,
                  isCurrent ? styles.circleCurrent : undefined,
                ]}
              >
                <Text
                  style={[
                    styles.circleText,
                    isCompleted || isCurrent ? styles.circleTextActive : undefined,
                  ]}
                >
                  {isCompleted ? '✓' : index + 1}
                </Text>
              </View>
              {index < steps.length - 1 && (
                <View
                  style={[
                    styles.line,
                    index < currentStep ? styles.lineCompleted : undefined,
                  ]}
                />
              )}
            </View>
            <Text style={[styles.label, isCurrent ? styles.labelCurrent : undefined]}>{step}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepWrapper: {
    flex: 1,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleCompleted: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  circleCurrent: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  circleText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
  },
  circleTextActive: {
    color: '#FFFFFF',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },
  lineCompleted: {
    backgroundColor: '#0F172A',
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    color: '#6B7280',
    paddingRight: 8,
  },
  labelCurrent: {
    color: '#0F172A',
    fontWeight: '600',
  },
});
