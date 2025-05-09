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

interface ShoppingList {
  id: string;
  name: string;
  owner: string | null;
  sharedWith: string[];
  items: string[];
}

export const HomeContainer = ({ navigation }: { navigation: any }) => {
  const [user, setUser] = useState<string | null>(null);
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [listName, setListName] = useState('');
  const [currentListId, setCurrentListId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState('');
  const [shareEmail, setShareEmail] = useState('');

  const logout = () => {
    setUser(null);
    setCurrentListId(null);
    navigation.pop();
  };

  const createList = () => {
    if (!listName.trim()) {return;}

    const id = Date.now().toString();
    const newList: ShoppingList = {
      id,
      name: listName.trim(),
      owner: user,
      sharedWith: [],
      items: [],
    };

    setShoppingLists(prev => [...prev, newList]);
    setListName('');
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Lista creada',
      text2: `La lista "${newList.name}" ha sido creada.`,
    });
  };

  const shareList = (id: string, sharedUser: string) => {
    if (!sharedUser.trim()) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'No puedes compartir con un usuario vacío.',
      });
      return;
    }
    const emailPattern = /^[\w._-]+@[\w.-]+\.[A-Za-z]{2,6}$/;
    if (!emailPattern.test(sharedUser)) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Por favor, ingresa un correo válido.',
      });
      return;
    }

    setShoppingLists(prev =>
      prev.map(list => {
        if (list.id === id) {
          if (list.sharedWith.includes(sharedUser)) {
            Toast.show({
              type: 'error',
              position: 'bottom',
              text1: 'Error',
              text2: 'Este usuario ya tiene acceso a la lista.',
            });
            return list;
          }
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Compartido',
            text2: `Lista compartida con ${sharedUser}`,
          });
          return { ...list, sharedWith: [...list.sharedWith, sharedUser] };
        }
        return list;
      }),
    );

    setShareEmail('');
  };

  const addItem = () => {
    if (!newItem.trim()) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'No puedes agregar un producto vacío.',
      });
      return;
    }
    setShoppingLists(prev =>
      prev.map(list => {
        if (list.id === currentListId) {
          const updated = { ...list, items: [...list.items, newItem.trim()] };
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Producto agregado',
            text2: `"${newItem.trim()}" agregado a "${list.name}".`,
          });
          return updated;
        }
        return list;
      }),
    );
    setNewItem('');
  };

  const removeItem = (item: string) => {
    setShoppingLists(prev =>
      prev.map(list => {
        if (list.id === currentListId) {
          const updated = {
            ...list,
            items: list.items.filter(i => i !== item),
          };
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Producto eliminado',
            text2: `"${item}" eliminado de "${list.name}".`,
          });
          return updated;
        }
        return list;
      }),
    );
  };

  // Filtramos las listas del usuario (propietario o compartidas)
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
            onSubmit={() =>
              shareList(selectedList.id, shareEmail.trim())
            }
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
