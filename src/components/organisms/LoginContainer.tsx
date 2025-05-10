import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../store/authSlice';
import { AppTitle } from '../atoms/AppTitle';
import { Icon } from '../atoms/Icon';
import { AuthForm } from '../molecules/AuthForm';
import { AuthToggle } from '../molecules/AuthToggle';

const initialUsers: Record<string, string> = {
  'test1@mail.com': '1234',
  'test2@mail.com': '1234',
  'test3@mail.com': '1234',
};

export const LoginContainer = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<Record<string, string>>(initialUsers);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleRegister = () => {
    if (!email.trim() || !password) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Email y contraseña requeridos.',
      });
      return;
    }
    if (users[email]) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'El correo ya está registrado.',
      });
      return;
    }
    // Agregar nuevo usuario
    setUsers(prev => ({ ...prev, [email]: password }));
    dispatch(loginAction(email));        // ← Guardamos en Redux
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Registro exitoso',
      text2: `Bienvenido, ${email}!`,
    });
    navigation.navigate('Home');
  };

  const handleLogin = () => {
    if (users[email] === password) {
      dispatch(loginAction(email));      // ← Guardamos en Redux
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
      <AppTitle />
      <Icon uri="https://media.istockphoto.com/id/1435832173/es/vector/manos-sosteniendo-portapapeles-con-lista-de-verificaci%C3%B3n-con-marcas-de-verificaci%C3%B3n-verdes-y.jpg?s=612x612&w=0&k=20&c=PUT9UEVS8jM8a0rfwepcD5Hmi3Qll5LWTVMsiJ5onZs=" />
      <AuthForm
        isLogin={isLogin}
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={isLogin ? handleLogin : handleRegister}
      />
      <AuthToggle isLogin={isLogin} onToggle={() => setIsLogin(!isLogin)} />
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