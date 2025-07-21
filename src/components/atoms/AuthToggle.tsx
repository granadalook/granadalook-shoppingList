import React from 'react';
import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import { PrimaryButton } from '../atoms/PrimaryButton';

interface AuthToggleProps {
  isLogin: boolean;
  onToggle: () => void;
}

export const AuthToggle: React.FC<AuthToggleProps> = ({ isLogin, onToggle }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <Text style={[styles.text, isDarkMode && styles.textDark]}>
        {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
      </Text>
      <PrimaryButton
        title={isLogin ? 'Regístrate' : 'Inicia sesión'}
        onPress={onToggle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    alignItems: 'center',
    gap: 8, // Espaciado entre texto y botón
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
  textDark: {
    color: '#ccc',
  },
});
