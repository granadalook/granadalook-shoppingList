import React from 'react';
import { Text, StyleSheet, useColorScheme } from 'react-native';

interface HeaderTitleProps {
  user: string;
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({ user }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Text style={[styles.title, isDarkMode && styles.titleDark]}>
      Bienvenido, {user}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
    textAlign: 'left',
  },
  titleDark: {
    color: '#fff',
  },
});
