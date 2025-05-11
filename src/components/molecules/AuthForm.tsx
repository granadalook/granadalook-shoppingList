import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { InputField } from '../atoms/InputField';
import { PrimaryButton } from '../atoms/PrimaryButton';

interface AuthFormProps {
  isLogin: boolean;
  email: string;
  password: string;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onSubmit: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  isLogin,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</Text>
    <InputField placeholder="Email" value={email} onChangeText={onEmailChange} />
    <InputField
      placeholder="Contraseña"
      secure
      value={password}
      onChangeText={onPasswordChange}
    />
    <PrimaryButton
      title={isLogin ? 'Entrar' : 'Registrar'}
      onPress={onSubmit}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
});
