import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ListItemProps {
  name: string;
  onPress: () => void;
  isSelected: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({ name, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, isSelected && styles.itemSelected]}
    >
      <Text style={[styles.text, isSelected && styles.textSelected]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 12,
    backgroundColor: '#f2f2f2',
    marginVertical: 4,
    borderRadius: 8,
  },
  itemSelected: {
    backgroundColor: '#4caf50',
  },
  text: {
    color: '#000',
  },
  textSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
});