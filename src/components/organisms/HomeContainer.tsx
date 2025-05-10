import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { HeaderTitle } from '../atoms/HeaderTitle';
import { LogoutButton } from '../atoms/LogoutButton';
import { CreateListForm } from '../molecules/CreateListForm';
import { ListSelector } from '../molecules/ListSelector';
import { AddItemForm } from '../molecules/AddItemForm';
import { ShareListForm } from '../molecules/ShareListForm';
import { RowView } from '../atoms/RowView';

import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../../store/authSlice';
import {
  createList as createListAction,
  addItem as addItemAction,
  removeItem as removeItemAction,
  shareList as shareListAction,
 } from '../../store/listsSlice';
import { RootState } from '../../store';

export const HomeContainer = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const shoppingLists = useSelector((state: RootState) => state.lists.lists);

  const [listName, setListName] = useState('');
  const [currentListId, setCurrentListId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState('');
  const [shareEmail, setShareEmail] = useState('');

  const logout = () => {
    dispatch(logoutAction());
    setCurrentListId(null);
    navigation.pop();
  };

  const createList = () => {
    if (!listName.trim()) return;
    const id = Date.now().toString();
    dispatch(createListAction({ id, name: listName.trim(), owner: user }));
    setListName('');
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Lista creada',
      text2: `La lista "${listName.trim()}" ha sido creada.`,
    });
  };

  const shareList = (listId: string, sharedUser: string) => {
    if (!sharedUser.trim()) {
      return Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'No puedes compartir con un usuario vacío.',
      });
    }
    const emailPattern = /^[\w._-]+@[\w.-]+\.[A-Za-z]{2,6}$/;
    if (!emailPattern.test(sharedUser)) {
      return Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Por favor, ingresa un correo válido.',
      });
    }
    const list = shoppingLists.find(l => l.id === listId);
    if (list?.sharedWith.includes(sharedUser)) {
      return Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Este usuario ya tiene acceso a la lista.',
      });
    }
    dispatch(shareListAction({ listId, user: sharedUser }));
    setShareEmail('');
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Compartido',
      text2: `Lista compartida con ${sharedUser}`,
    });
  };

  const addItem = () => {
    if (!newItem.trim()) {
      return Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'No puedes agregar un producto vacío.',
      });
    }
    dispatch(addItemAction({ listId: currentListId!, item: newItem.trim() }));
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Producto agregado',
      text2: `"${newItem.trim()}" agregado.`,
    });
    setNewItem('');
  };

  const removeItem = (item: string) => {
    dispatch(removeItemAction({ listId: currentListId!, item }));
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Producto eliminado',
      text2: `"${item}" eliminado.`,
    });
  };

  const userLists = shoppingLists.filter(
    l => l.owner === user || (user != null && l.sharedWith.includes(user)),
  );
  const selectedList = shoppingLists.find(l => l.id === currentListId);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitle user={user ?? 'Invitado'} />
      <LogoutButton onPress={logout} />

      <CreateListForm
        listName={listName}
        onChange={setListName}
        onSubmit={createList}
      />

      <ListSelector lists={userLists} onSelect={setCurrentListId} />

      {selectedList && (
        <>
          <AddItemForm
            newItem={newItem}
            onChange={setNewItem}
            onSubmit={addItem}
          />

          <FlatList
            data={selectedList.items}
            keyExtractor={(item, idx) => item + idx}
            renderItem={({ item }) => (
              <RowView item={item} onRemove={removeItem} />
            )}
          />

          <ShareListForm
            shareEmail={shareEmail}
            onChange={setShareEmail}
            onSubmit={() => shareList(selectedList.id, shareEmail.trim())}
          />
        </>
      )}

      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
});
