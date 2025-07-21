import React from 'react';
import { View, Text, StyleSheet, useColorScheme ,TouchableOpacity } from 'react-native';

interface RowViewProps {
  item: string;
  onRemove: (item: string) => void;
}

export const RowView: React.FC<RowViewProps> = ({ item, onRemove }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[styles.row, isDarkMode && styles.rowDark]}>
      <Text style={[styles.text, isDarkMode && styles.textDark]}>{item}</Text>

      <TouchableOpacity
        onPress={() => onRemove(item)}
        style={[styles.removeButton, isDarkMode && styles.removeButtonDark]}
        activeOpacity={0.8}
      >
        <Text style={styles.removeButtonText}>Quitar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 8,
  },
  rowDark: {
    backgroundColor: '#2a2a2a',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  textDark: {
    color: '#eee',
  },
  removeButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  removeButtonDark: {
    backgroundColor: '#dc2626',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
