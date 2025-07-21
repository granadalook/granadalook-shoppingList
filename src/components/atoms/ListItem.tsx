import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  useColorScheme,
  Platform,
} from 'react-native';

interface ListItemProps {
  name: string;
  onPress: () => void;
  isSelected: boolean;
  icon?: string;
  itemCount?: number;
}

export const ListItem: React.FC<ListItemProps> = ({
  name,
  onPress,
  isSelected,
  icon = '📝',
  itemCount,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.item,
        isDarkMode && styles.itemDark,
        isSelected && styles.itemSelected,
        Platform.OS === 'ios' && styles.shadowIOS,
      ]}
    >
      <View style={styles.row}>
        <Text style={styles.icon}>{icon}</Text>
        <Text
          style={[
            styles.text,
            isDarkMode && styles.textDark,
            isSelected && styles.textSelected,
          ]}
        >
          {name}
        </Text>
        {typeof itemCount === 'number' && (
          <Text style={[styles.badge, isSelected && styles.badgeSelected]}>
            {itemCount}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d1d5db',
    elevation: 2,
  },
  shadowIOS: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  itemDark: {
    backgroundColor: '#2c2c2e',
    borderColor: '#3a3a3c',
  },
  itemSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#1d4ed8',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  textDark: {
    color: '#f3f4f6',
  },
  textSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  badge: {
    fontSize: 12,
    backgroundColor: '#e5e7eb',
    color: '#111',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  badgeSelected: {
    backgroundColor: '#1e40af',
    color: '#fff',
  },
});
