import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';

interface ListItemProps {
  name: string;
  onPress: () => void;
  isSelected: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({ name, onPress, isSelected }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.item,
        isDarkMode && styles.itemDark,
        isSelected && styles.itemSelected,
      ]}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          isDarkMode && styles.textDark,
          isSelected && styles.textSelected,
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  itemDark: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
  },
  itemSelected: {
    backgroundColor: '#3b82f6', // azul moderno
    borderColor: '#2563eb',
  },
  text: {
    fontSize: 16,
    color: '#222',
  },
  textDark: {
    color: '#eaeaea',
  },
  textSelected: {
    color: '#fff',
    fontWeight: '600',
  },
});
