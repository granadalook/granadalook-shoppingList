import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login as loginAction } from '../../store/authSlice';
import { AppTitle } from '../atoms/AppTitle';
import { Icon } from '../atoms/Icon';
import { AuthForm } from '../molecules/AuthForm';
import { AuthToggle } from '../molecules/AuthToggle';

export const LoginContainer = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const showToast = (type: 'success' | 'error', title: string, message: string) => {
    Toast.show({
      type,
      position: type === 'error' ? 'bottom' : 'top',
      text1: title,
      text2: message,
    });
  };

  const handleRegister = async () => {
    if (!email.trim() || !password) {
      showToast('error', 'Error', 'Nombre de usuario y contraseña requeridos.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      showToast(
        'error',
        'Error',
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.'
      );
      return;
    }

    try {
      const payload = {
        userName: email,
        email: `${email}@mail.com`,
        password: password,
        politicas: true,
      };
      const response = await axios.post(
        'https://topsecret-back-end.onrender.com/user',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('API register response:', response.data);
      showToast('success', '¡Registro exitoso!', `Usuario ${response.data.userName} creado.`);
      const token = response.data.userName;
      dispatch(loginAction(token));
      navigation.navigate('Home');
    } catch (err: any) {
      const msg = err.response?.data?.message ?? 'Error al registrar usuario.';
      showToast('error', 'Error', msg);
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      showToast('error', 'Error', 'Email y contraseña requeridos.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      showToast(
        'error',
        'Error',
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.'
      );
      return;
    }

    try {
      const response = await axios.post(
        'https://topsecret-back-end.onrender.com/auth/login',
        { userName: email, password }
      );
      console.log('API login response:', response.data);
      const token = response.data.user.userName;
      dispatch(loginAction(token));
      showToast('success', '¡Bienvenido!', `Has iniciado sesión como ${token}.`);
      navigation.navigate('Home');
    } catch (err: any) {
      const msg = err.response?.data?.message ?? 'Error al iniciar sesión.';
      showToast('error', 'Error', msg);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'android' ? undefined : 'padding'}
        keyboardVerticalOffset={60}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inner}>
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
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
  },
});
