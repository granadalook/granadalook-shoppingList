import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PrimaryButton } from '../atoms/PrimaryButton';

interface AuthToggleProps {
  isLogin: boolean;
  onToggle: () => void;
}

export const AuthToggle: React.FC<AuthToggleProps> = ({ isLogin, onToggle }) => (
  <View style={styles.container}>
    <PrimaryButton
      title={isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
      onPress={onToggle}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});