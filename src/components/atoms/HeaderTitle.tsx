import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface HeaderTitleProps {
  user: string;
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({ user }) => (
  <Text style={styles.title}>Bienvenido {user}</Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});