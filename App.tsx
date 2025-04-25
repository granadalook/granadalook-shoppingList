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

const App = () => {
  // Estados para autenticación
  const [user, setUser] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  // Estados para lista de compras
  const [shoppingLists, setShoppingLists] = useState<any[]>([]); // cada lista: { id, name, owner, sharedWith, items }
  const [listName, setListName] = useState('');
  const [currentListId, setCurrentListId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState('');
  const [shareEmail, setShareEmail] = useState('');

  // Simulación de usuarios y auth (en memoria)
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
      alert('Usuario ya existe');
    }
  };

  const login = () => {
    if (users[email] === password) {
      setUser(email);
    } else {
      alert('Credenciales inválidas');
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
  };

  const addItem = () => {
    setShoppingLists(
      shoppingLists.map(list => {
        if (list.id === currentListId) {
          return {...list, items: [...list.items, newItem]};
        }
        return list;
      }),
    );
    setNewItem('');
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
  };

  // Este es el bloque donde se renderiza el login
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Título de la app */}
        <Text style={styles.appTitle}>Mi Lista de Compras</Text>

        {/* Icono o imagen */}
        <Image
          source={{
            uri: 'https://media.istockphoto.com/id/1435832173/es/vector/manos-sosteniendo-portapapeles-con-lista-de-verificaci%C3%B3n-con-marcas-de-verificaci%C3%B3n-verdes-y.jpg?s=612x612&w=0&k=20&c=PUT9UEVS8jM8a0rfwepcD5Hmi3Qll5LWTVMsiJ5onZs=',
          }} // Puedes poner la URL de la imagen o un icono local
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
/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    alignItems: 'center', // Centra el contenido
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    width: '80%', // Ajusta el tamaño del input
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
}); */

export default App;
