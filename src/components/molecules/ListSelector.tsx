import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from '../atoms/ListItem';

interface ListSelectorProps {
  lists: { id: string; name: string }[];
  onSelect: (id: string) => void;
}

export const ListSelector: React.FC<ListSelectorProps> = ({ lists, onSelect }) => (
  <FlatList
    data={lists}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <ListItem name={item.name} onPress={() => onSelect(item.id)} />
    )}
  />
);