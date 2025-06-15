import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from '../atoms/ListItem';

interface ListSelectorProps {
  lists: { id: string; nombre: string }[];
  onSelect: (id: string) => void;
}

export const ListSelector: React.FC<ListSelectorProps> = ({ lists, onSelect }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onSelect(id);
  };

  return (
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
    />
  );
};
