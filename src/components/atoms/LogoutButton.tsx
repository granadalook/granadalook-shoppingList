import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';

interface LogoutButtonProps {
  onPress: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <TouchableOpacity
      style={[styles.button, isDarkMode && styles.buttonDark]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, isDarkMode && styles.textDark]}>
        Cerrar sesión
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#e53935',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 16,
  },
  buttonDark: {
    backgroundColor: '#cf3c3c',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  textDark: {
    color: '#fff',
  },
});
