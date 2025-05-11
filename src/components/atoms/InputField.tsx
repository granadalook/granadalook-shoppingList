import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secure?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  secure = false,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#999"
      secureTextEntry={secure}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    color: '#000',
    backgroundColor: '#fff',
  },
});
