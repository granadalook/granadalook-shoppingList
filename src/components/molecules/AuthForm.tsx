import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { InputField } from '../atoms/InputField';
import { PrimaryButton } from '../atoms/PrimaryButton';

interface AuthFormProps {
  isLogin: boolean;
  email: string;
  password: string;
  loading: boolean;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onSubmit: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  isLogin,
  email,
  password,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.title, isDarkMode && styles.titleDark]}>
        {isLogin ? 'Iniciar sesión' : 'Registrarse'}
      </Text>

      <InputField
        placeholder="Nickname"
        value={email}
        onChangeText={onEmailChange}
        editable={!loading}
      />

      <InputField
        placeholder="Contraseña"
        secure
        value={password}
        onChangeText={onPasswordChange}
        editable={!loading}
      />

      {loading ? (
        <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#3b82f6'} />
      ) : (
        <PrimaryButton
          title={isLogin ? 'Entrar' : 'Registrar'}
          onPress={onSubmit}
          disabled={loading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f4f4f4',
    flex: 1,
    justifyContent: 'center',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '700',
    color: '#222',
  },
  titleDark: {
    color: '#fff',
  },
});
