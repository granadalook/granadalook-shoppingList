import React from 'react';
import {
  TextInput,
  StyleSheet,
  useColorScheme,
  Platform,
  ViewStyle,
} from 'react-native';

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
        Platform.OS === 'ios' && !isDarkMode && styles.shadowIOS,
      ]}
      placeholder={placeholder}
      placeholderTextColor={isDarkMode ? '#888' : '#999'}
      secureTextEntry={secure}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
    />
  );
};

const baseInput: ViewStyle = {
  borderWidth: 1,
  borderRadius: 12,
  paddingVertical: 14,
  paddingHorizontal: 18,

  marginBottom: 16,
};

const styles = StyleSheet.create({
  input: {
    ...baseInput,
    borderColor: '#d1d5db',
    backgroundColor: '#f9fafb',
    color: '#111827',
  },
  inputDark: {
    ...baseInput,
    borderColor: '#333',
    backgroundColor: '#1e1e1e',
    color: '#f3f4f6',
  },
  disabled: {
    opacity: 0.6,
  },
  shadowIOS: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
});
