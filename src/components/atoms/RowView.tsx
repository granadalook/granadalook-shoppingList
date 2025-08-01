import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Platform,
} from 'react-native';

interface RowViewProps {
  item: string;
  onRemove: (item: string) => void;
}

export const RowView: React.FC<RowViewProps> = ({ item, onRemove }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        styles.row,
        isDarkMode && styles.rowDark,
        Platform.OS === 'ios' && styles.shadowIOS,
      ]}
    >
      <View style={styles.left}>
        <Text style={styles.icon}>🛒</Text>
        <Text style={[styles.text, isDarkMode && styles.textDark]}>{item}</Text>
      </View>

   <TouchableOpacity
  onPress={() => onRemove(item)}
  style={[styles.removeButton, isDarkMode && styles.removeButtonDark]}
  activeOpacity={0.8}
  testID={`delete-${item}`} // 👈 Agregado aquí
>
  <Text style={styles.removeButtonText}>🗑</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 2, // Android
  },
  shadowIOS: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  rowDark: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: '#111827',
    flexShrink: 1,
  },
  textDark: {
    color: '#f3f4f6',
  },
  removeButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  removeButtonDark: {
    backgroundColor: '#b91c1c',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
