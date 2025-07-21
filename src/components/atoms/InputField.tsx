import React from 'react';
import { TextInput, StyleSheet, useColorScheme } from 'react-native';

export interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secure?: boolean;
  editable?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  secure = false,
  editable = true,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <TextInput
      style={[
        styles.input,
        isDarkMode && styles.inputDark,
        !editable && styles.disabled,
      ]}
      placeholder={placeholder}
      placeholderTextColor={isDarkMode ? '#aaa' : '#777'}
      secureTextEntry={secure}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  inputDark: {
    borderColor: '#444',
    color: '#fff',
    backgroundColor: '#1c1c1e',
  },
  disabled: {
    opacity: 0.5,
  },
});
