import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
} from 'react-native';
import Toast from 'react-native-toast-message';

export const Login = () => {
  const navigation = useNavigation();

  const [_, setUser] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

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
      // @ts-ignore
      navigation.navigate('Home');
    } else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Credenciales inválidas.',
      });
    }
  };

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
