import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

interface AuthToggleProps {
  isLogin: boolean;
  onToggle: () => void;
}

export const AuthToggle: React.FC<AuthToggleProps> = ({ isLogin, onToggle }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle} activeOpacity={0.7}>
        <Text style={[styles.text, isDarkMode && styles.textDark]}>
          {isLogin ? '¿No tienes cuenta? Registrarse' : '¿Ya tienes cuenta? Iniciar sesión'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#3b82f6', // Azul moderno
    textDecorationLine: 'underline',
  },
  textDark: {
    color: '#60a5fa', // Azul claro para fondo oscuro
  },
});
