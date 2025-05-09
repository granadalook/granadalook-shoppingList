import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ListItemProps {
  name: string;
  onPress: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({ name, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.item}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    marginVertical: 4,
  },
});