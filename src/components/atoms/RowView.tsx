import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface RowViewProps {
  item: string;
  onRemove: (item: string) => void;
}

export const RowView: React.FC<RowViewProps> = ({ item, onRemove }) => (
  <View style={styles.row}>
    <Text>{item}</Text>
    <Button title="Quitar" onPress={() => onRemove(item)} />
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
});