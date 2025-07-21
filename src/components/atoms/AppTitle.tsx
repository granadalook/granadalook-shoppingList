import React from 'react';
import { Text, StyleSheet, useColorScheme } from 'react-native';

export const AppTitle = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Text style={[styles.title, isDarkMode && styles.titleDark]}>
      Mi Lista de Compras
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
    letterSpacing: 0.5,
  },
  titleDark: {
    color: '#fff',
  },
});
