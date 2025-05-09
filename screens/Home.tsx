import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-toast-message';

export const Home = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState<string | null>(null);
  interface ShoppingList {
    id: string;
    name: string;
    owner: string | null;
    sharedWith: string[];
    items: string[];
  }

  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [listName, setListName] = useState('');
  const [currentListId, setCurrentListId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState('');
  const [shareEmail, setShareEmail] = useState('');

  const logout = () => {
    setUser(null);
    setCurrentListId(null);
    // @ts-ignore
    navigation.pop();
  };

  const createList = () => {
    if (listName) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Lista creada',
        text2: `La lista ${listName} ha sido creada.`,
      });
      const id = Date.now().toString();
      setShoppingLists([
        ...shoppingLists,
        {
          id,
          name: listName,
          owner: user,
          sharedWith: [],
          items: [],
        },
      ]);
      setListName('');
    }
  };

  const shareList = (id: string, sharedUser: string) => {
    if (!sharedUser) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'No puedes compartir con un usuario vacío.',
      });
      return;
    }

    const selectedList = shoppingLists.find(list => list.id === id);
    if (selectedList?.sharedWith.includes(sharedUser)) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Este usuario ya tiene acceso a la lista.',
      });
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(sharedUser)) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Por favor, ingresa un correo electrónico válido.',
      });
      return;
    }

    setShoppingLists(
      shoppingLists.map(list =>
        list.id === id
          ? {
              ...list,
              sharedWith: [...list.sharedWith, sharedUser],
            }
          : list,
      ),
    );

    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Compartido',
      text2: `Lista compartida con éxito con ${sharedUser}`,
    });
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

    setShoppingLists(
      shoppingLists.map(list => {
        if (list.id === currentListId) {
          return {...list, items: [...list.items, newItem]};
        }
        return list;
      }),
    );
    setNewItem('');
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Producto agregado',
      text2: `${newItem} ha sido agregado a la lista.`,
    });
  };

  const removeItem = (item: string) => {
    setShoppingLists(
      shoppingLists.map(list => {
        if (list.id === currentListId) {
          return {...list, items: list.items.filter(i => i !== item)};
        }
        return list;
      }),
    );
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Producto eliminado',
      text2: `${item} ha sido eliminado de la lista.`,
    });
  };

  const userLists = shoppingLists.filter(
    l => l.owner === user || (user && l.sharedWith.includes(user)),
  );

  const selectedList = shoppingLists.find(l => l.id === currentListId);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bienvenido {user}</Text>
      <Button title="Cerrar sesión" onPress={logout} />

      <TextInput
        placeholder="Nombre de la lista"
        value={listName}
        onChangeText={setListName}
        style={styles.input}
      />
      <Button
        disabled={!listName}
        title="Crear nueva lista"
        onPress={createList}
      />

      <Text style={styles.subtitle}>Tus listas</Text>
      <FlatList
        data={userLists}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => setCurrentListId(item.id)}>
            <Text style={styles.listItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedList && (
        <View>
          <Text style={styles.subtitle}>Lista: {selectedList.name}</Text>
          <TextInput
            placeholder="Nuevo producto"
            value={newItem}
            onChangeText={setNewItem}
            style={styles.input}
          />
          <Button title="Agregar producto" onPress={addItem} />

          <FlatList
            data={selectedList.items}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => (
              <View style={styles.row}>
                <Text>{item}</Text>
                <Button title="Quitar" onPress={() => removeItem(item)} />
              </View>
            )}
          />

          <TextInput
            placeholder="Compartir con (email)"
            value={shareEmail}
            onChangeText={setShareEmail}
            style={styles.input}
          />
          <Button
            title="Compartir"
            onPress={() => {
              if (shareEmail) {
                shareList(selectedList.id, shareEmail);
                setShareEmail('');
              }
            }}
            disabled={!shareEmail}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 15,
    fontWeight: '600',
  },
  listItem: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    marginVertical: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
});
