import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListItem } from '../atoms/ListItem';

interface ListSelectorProps {
  lists: { id: string; nombre: string }[];
  onSelect: (id: string) => void;
}

export const ListSelector: React.FC<ListSelectorProps> = ({
  lists,
  onSelect,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    if (id === selectedId) return; // evita re-seleccionar el mismo
    setSelectedId(id);
    onSelect(id);
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={lists}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem
            name={item.nombre}
            onPress={() => handleSelect(item.id)}
            isSelected={item.id === selectedId}
          />
        )}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});
