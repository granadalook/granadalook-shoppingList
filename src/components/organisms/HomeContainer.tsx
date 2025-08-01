import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  useColorScheme,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { HeaderTitle } from '../atoms/HeaderTitle';
import { LogoutButton } from '../atoms/LogoutButton';
import { CreateListForm } from '../molecules/CreateListForm';
import { ListSelector } from '../molecules/ListSelector';
import { AddItemForm } from '../molecules/AddItemForm';
import { ShareListForm } from '../molecules/ShareListForm';
import { RowView } from '../atoms/RowView';
import { useDispatch, useSelector } from 'react-redux';
import {
  logout as logoutAction,
} from '../../store/authSlice';
import {
  createListAsync as createListAction,
  addItemAsync as addItemAction,
  deleteItemAsync as deleteItemAction,
  shareListAsync as shareListAction,
  fetchListsByUser as fetchListsByUserAction,
} from '../../store/listsSlice';
import { RootState, AppDispatch } from '../../store';

export const HomeContainer = ({
  navigation,
  initialListId = null,
}: {
  navigation: any;
  initialListId?: string | null;
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const shoppingLists = useSelector((state: RootState) => state.lists.lists);

  const [listName, setListName] = useState('');
 const [currentListId, setCurrentListId] = useState<string | null>(initialListId);
  const [newItem, setNewItem] = useState('');
  const [shareEmail, setShareEmail] = useState('');

  useEffect(() => {
    if (user) {
      dispatch(fetchListsByUserAction(user));
    }
  }, [dispatch, user]);

  const showToast = (
    type: 'success' | 'error',
    text1: string,
    text2?: string,
    position: 'top' | 'bottom' = 'top'
  ) => {
    Toast.show({ type, position, text1, text2 });
  };

  const logout = () => {
    dispatch(logoutAction());
    setCurrentListId(null);
    navigation.pop();
  };

  const createList = () => {
    if (!listName.trim()) return;
    const id = Date.now().toString();
    dispatch(createListAction({ id, name: listName.trim(), owner: JSON.stringify([user]) }));
    showToast('success', 'Lista creada', `La lista "${listName.trim()}" ha sido creada.`);
    setListName('');
  };

  const shareList = (listId: string, sharedUser: string) => {
    if (!sharedUser.trim()) {
      return showToast('error', 'Error', 'No puedes compartir con un usuario vacío.', 'bottom');
    }
    const list = shoppingLists.find(l => l.id === listId);
    if (list?.sharedWith.includes(sharedUser)) {
      return showToast('error', 'Error', 'Este usuario ya tiene acceso a la lista.', 'bottom');
    }
    dispatch(shareListAction({
      listId, user: sharedUser,
      owner: null,
      name: '',
    }));
    setShareEmail('');
    showToast('success', 'Compartido', `Lista compartida con ${sharedUser}`);
  };

  const addItem = () => {
    if (!newItem.trim()) {
      return showToast('error', 'Error', 'No puedes agregar un producto vacío.', 'bottom');
    }
    dispatch(addItemAction({ listId: currentListId!, item: newItem.trim(), user }));
    showToast('success', 'Producto agregado', `"${newItem.trim()}" agregado.`, 'bottom');
    setNewItem('');
  };

  const removeItem = (item: string) => {
    dispatch(deleteItemAction({ listId: currentListId!, item }));
    showToast('success', 'Producto eliminado', `"${item}" eliminado.`, 'bottom');
  };

  const parseStringToArray = (value: string | null): string[] => {
    if (!value) return [];
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  };

  const userLists = shoppingLists.filter(l => {
    const creadoPorArray = parseStringToArray(l.creadoPor);
    return creadoPorArray.includes(user ?? '') || l.sharedWith.includes(user ?? '');
  });

  const selectedList = shoppingLists.find(l => l.id === currentListId);

  if (!user) return null;

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? undefined : 'padding'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.section}>
            <HeaderTitle user={user} />
            <LogoutButton onPress={logout} />
          </View>

          <View style={styles.section}>
            <CreateListForm listName={listName} onChange={setListName} onSubmit={createList} />
          </View>

          <View style={styles.section}>
<ListSelector
  lists={userLists}
  onSelect={(listId) => navigation.navigate('ListDetail', { listId })}
/>
          </View>

          {selectedList && (
            <>
              <Text style={[styles.listName, isDarkMode && styles.listNameDark]}>
                📝 Lista seleccionada: <Text style={styles.listNameBold}>{selectedList.nombre}</Text>
              </Text>

              <View style={styles.section}>
                <AddItemForm newItem={newItem} onChange={setNewItem} onSubmit={addItem} />
              </View>

              {selectedList.items.map((item, idx) => (
                <RowView key={item + idx} item={item} onRemove={removeItem} />
              ))}

              <View style={styles.section}>
                <ShareListForm
                  shareEmail={shareEmail}
                  onChange={setShareEmail}
                  onSubmit={() => {
                    if (selectedList.id) {
                      shareList(selectedList.id, shareEmail.trim());
                    }
                  }}
                />
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#f9f9f9',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  scroll: {
    paddingBottom: 80,
  },
  section: {
    marginBottom: 28,
  },
  listName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    color: '#374151',
  },
  listNameDark: {
    color: '#e5e7eb',
  },
  listNameBold: {
    fontWeight: '700',
    color: '#3b82f6',
  },
});
