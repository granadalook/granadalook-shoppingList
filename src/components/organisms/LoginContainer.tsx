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
  ActivityIndicator,
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
  const [loading, setLoading] = useState(false);

  const showToast = (
    type: 'success' | 'error',
    title: string,
    message: string
  ) => {
    Toast.show({
      type,
      position: type === 'error' ? 'bottom' : 'top',
      text1: title,
      text2: message,
    });
  };

  const isValidForm = (): boolean => {
    if (!email.trim() || !password) {
      showToast('error', 'Error', 'Nombre de usuario y contraseña requeridos.');
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      showToast(
        'error',
        'Error',
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.'
      );
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!isValidForm()) return;
    try {
      setLoading(true);
      const payload = {
        userName: email,
        email: `${email}@mail.com`,
        password,
        politicas: true,
      };
      const response = await axios.post(
        'https://topsecret-back-end.onrender.com/user',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      const token = response.data.userName;
      dispatch(loginAction(token));
      showToast('success', '¡Registro exitoso!', `Usuario ${token} creado.`);
      navigation.navigate('Home');
    } catch (err: any) {
      const msg = err.response?.data?.message ?? 'Error al registrar usuario.';
      showToast('error', 'Error', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!isValidForm()) return;
    try {
      setLoading(true);
      const response = await axios.post(
        'https://topsecret-back-end.onrender.com/auth/login',
        { userName: email, password }
      );
      const token = response.data.user.userName;
      dispatch(loginAction(token));
      showToast('success', '¡Bienvenido!', `Has iniciado sesión como ${token}.`);
      navigation.navigate('Home');
    } catch (err: any) {
      const msg = err.response?.data?.message ?? 'Error al iniciar sesión.';
      showToast('error', 'Error', msg);
    } finally {
      setLoading(false);
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
              <Icon uri='https://topsecret.sirv.com/Entidad/listas.png' />
              <AuthForm
                isLogin={isLogin}
                email={email}
                password={password}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onSubmit={isLogin ? handleLogin : handleRegister}
                loading={loading}
              />
              {loading ? (
                <ActivityIndicator size='large' />
              ) : (
                <AuthToggle isLogin={isLogin} onToggle={() => setIsLogin(!isLogin)} />
              )}
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