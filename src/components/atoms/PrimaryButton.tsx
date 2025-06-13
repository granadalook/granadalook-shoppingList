import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean; // Add the disabled prop
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
