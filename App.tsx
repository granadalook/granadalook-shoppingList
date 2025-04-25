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
  Image,
} from 'react-native';
import Toast from 'react-native-toast-message';

const App = () => {
  const [user, setUser] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
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

  const users: any = {
    'user1@mail.com': '1234',
    'guest@mail.com': 'guest',
    test: 'test',
  };

  const register = () => {
    if (!users[email]) {
      users[email] = password;
      setUser(email);
    } else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'El correo ya está registrado.',
      });
    }
  };

  const login = () => {
    if (users[email] === password) {
      setUser(email);
    } else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Credenciales inválidas.',
      });
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentListId(null);
  };

  const createList = () => {
    if (listName) {
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

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.appTitle}>Mi Lista de Compras</Text>
        <Image
          source={{
            uri: 'https://media.istockphoto.com/id/1435832173/es/vector/manos-sosteniendo-portapapeles-con-lista-de-verificaci%C3%B3n-con-marcas-de-verificaci%C3%B3n-verdes-y.jpg?s=612x612&w=0&k=20&c=PUT9UEVS8jM8a0rfwepcD5Hmi3Qll5LWTVMsiJ5onZs=',
          }}
          style={styles.icon}
        />
        <Text>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Button
          title={isLogin ? 'Entrar' : 'Registrar'}
          onPress={isLogin ? login : register}
        />
        <Button
          title={isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          onPress={() => setIsLogin(!isLogin)}
        />
      </SafeAreaView>
    );
  }

  const userLists = shoppingLists.filter(
    l => l.owner === user || l.sharedWith.includes(user),
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
      <Button title="Crear nueva lista" onPress={createList} />

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

const RootApp = () => {
  return (
    <>
      <App />
      <Toast />
    </>
  );
};

export default RootApp;
