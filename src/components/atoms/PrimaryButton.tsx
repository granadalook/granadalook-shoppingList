import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';

export interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDarkMode && styles.buttonDark,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          isDarkMode && styles.textDark,
          disabled && styles.textDisabled,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b82f6', // azul moderno
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  buttonDark: {
    backgroundColor: '#2563eb',
  },
  buttonDisabled: {
    backgroundColor: '#cbd5e1',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  textDark: {
    color: '#fff',
  },
  textDisabled: {
    color: '#7c7c7c',
  },
});
