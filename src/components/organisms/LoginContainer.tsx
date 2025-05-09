import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { AppTitle } from '../atoms/AppTitle';
import { Icon } from '../atoms/Icon';
import { AuthForm } from '../molecules/AuthForm';
import { AuthToggle } from '../molecules/AuthToggle';

export const LoginContainer = ({ navigation }) => {
  const [user, setUser] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const users: Record<string, string> = {
    'test1@mail.com': '1234',
    'test2@mail.com': '1234',
    'test3@mail.com': '1234',
  };

  const handleRegister = () => {
    if (!users[email]) {
      users[email] = password;
      setUser(email);
    } else {
      Toast.show({ type: 'error', position: 'bottom', text1: 'Error', text2: 'El correo ya está registrado.' });
    }
  };

  const handleLogin = () => {
    if (users[email] === password) {
      setUser(email);
      navigation.navigate('Home');
    } else {
      Toast.show({ type: 'error', position: 'bottom', text1: 'Error', text2: 'Credenciales inválidas.' });
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