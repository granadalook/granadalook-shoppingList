import React from 'react';
import { Text, StyleSheet, useColorScheme, View } from 'react-native';

export const AppTitle = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <Text style={[styles.icon, isDarkMode && styles.iconDark]}>📝</Text>
      <Text style={[styles.title, isDarkMode && styles.titleDark]}>
        Mi Lista de Compras
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 28,
  },
  icon: {
    fontSize: 32,
    marginBottom: 4,
    color: '#4b5563',
  },
  iconDark: {
    color: '#d1d5db',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  titleDark: {
    color: '#f9fafb',
  },
});
