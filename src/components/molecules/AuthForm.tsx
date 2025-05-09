import React from 'react';
import { View, Text } from 'react-native';
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
  <View>
    <Text>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</Text>
    <InputField placeholder="Email" value={email} onChangeText={onEmailChange} secure={undefined} />
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