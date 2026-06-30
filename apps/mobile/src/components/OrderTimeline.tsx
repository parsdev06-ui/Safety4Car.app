import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface OrderTimelineEvent {
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface OrderTimelineProps {
  events: OrderTimelineEvent[];
}

const statusStyles = {
  completed: { dotColor: '#10B981', lineColor: '#10B981', fill: '#10B981' },
  current: { dotColor: '#2563EB', lineColor: '#E5E7EB', fill: '#2563EB' },
  upcoming: { dotColor: '#E5E7EB', lineColor: '#E5E7EB', fill: '#FFFFFF' },
} as const;

export function OrderTimeline({ events }: OrderTimelineProps) {
  return (
    <View style={styles.container}>
      {events.map((event, index) => {
        const config = statusStyles[event.status];

        return (
          <View key={`${event.title}-${event.timestamp}-${index}`} style={styles.row}>
            <View style={styles.leftColumn}>
              <View style={[styles.dot, { borderColor: config.dotColor, backgroundColor: config.fill }]} />
              {index < events.length - 1 && (
                <View style={[styles.line, { backgroundColor: config.lineColor }]} />
              )}
            </View>
            <View style={styles.content}>
              <Text style={styles.timestamp}>{event.timestamp}</Text>
              <Text style={styles.title}>{event.title}</Text>
              <Text style={styles.description}>{event.description}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
  },
  leftColumn: {
    alignItems: 'center',
    marginRight: 12,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    marginTop: 4,
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: 40,
    marginVertical: 4,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});
