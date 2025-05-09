import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const AppTitle = () => (
  <Text style={styles.title}>Mi Lista de Compras</Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});