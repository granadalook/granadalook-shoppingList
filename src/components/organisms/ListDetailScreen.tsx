// src/screens/ListDetailScreen.tsx
import React, { useState } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

import { RootState, AppDispatch } from '../../store';
import { AddItemForm } from '../molecules/AddItemForm';
import { RowView } from '../atoms/RowView';
import { ShareListForm } from '../molecules/ShareListForm';
import {
  addItemAsync,
  deleteItemAsync,
  shareListAsync,
} from '../../store/listsSlice';

export const ListContainer = ({ route, navigation: _navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch<AppDispatch>();
  const { listId } = route.params; 
  const user = useSelector((state: RootState) => state.auth.user);
  const selectedList = useSelector((state: RootState) =>
    state.lists.lists.find(l => l.id === listId)
  );

  const [newItem, setNewItem] = useState('');
  const [shareEmail, setShareEmail] = useState('');

  if (!selectedList) {
    return <Text>Lista no encontrada</Text>;
  }

  const showToast = (type: 'success' | 'error', text1: string, text2?: string) => {
    Toast.show({ type, text1, text2 });
  };

  const addItem = () => {
    console.log('listId addItem', listId)
    if (!newItem.trim()) return;
    dispatch(addItemAsync({ listId, item: newItem.trim(), user }));
    setNewItem('');
    showToast('success', 'Producto agregado', `"${newItem.trim()}" agregado.`);
  };

  const removeItem = (item: string) => {
    dispatch(deleteItemAsync({ listId, item }));
    showToast('success', 'Producto eliminado', `"${item}" eliminado.`);
  };

  const shareList = () => {
    if (!shareEmail.trim()) {
      return showToast('error', 'Error', 'Correo vacío');
    }
    if (selectedList.sharedWith.includes(shareEmail.trim())) {
      return showToast('error', 'Error', 'Ya compartida con este usuario');
    }
    dispatch(shareListAsync({
      listId,
      user: shareEmail.trim(),
      owner: null,
      name: '',
    }));
    setShareEmail('');
    showToast('success', 'Compartido', `Compartido con ${shareEmail.trim()}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, isDarkMode && styles.titleDark]}>
        📝 {selectedList.nombre}
      </Text>

      <AddItemForm newItem={newItem} onChange={setNewItem} onSubmit={addItem} />

      {selectedList.items.map((item, index) => (
        <RowView key={item + index} item={item} onRemove={removeItem} />
      ))}

      <ShareListForm
        shareEmail={shareEmail}
        onChange={setShareEmail}
        onSubmit={shareList}
      />

      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#1f2937',
  },
  titleDark: {
    color: '#f3f4f6',
  },
});
