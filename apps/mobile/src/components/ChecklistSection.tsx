import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ChecklistSectionProps {
  title: string;
  itemsCount: number;
  completedCount: number;
  children: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
}

export function ChecklistSection({
  title,
  itemsCount,
  completedCount,
  children,
  expanded,
  onToggle,
}: ChecklistSectionProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onToggle} style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {completedCount} von {itemsCount} erledigt
          </Text>
        </View>
        <View style={styles.rightContent}>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{itemsCount}</Text>
          </View>
          <Text style={styles.chevron}>{expanded ? '⌃' : '⌄'}</Text>
        </View>
      </TouchableOpacity>

      {expanded ? <View style={styles.content}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerText: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countBadge: {
    backgroundColor: '#F8FAFC',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  chevron: {
    fontSize: 18,
    color: '#6B7280',
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    padding: 16,
    gap: 12,
  },
});
