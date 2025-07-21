import React from 'react';
import { Text, StyleSheet, useColorScheme, View } from 'react-native';

interface HeaderTitleProps {
  user: string;
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({ user }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <Text style={[styles.icon, isDarkMode && styles.iconDark]}>👋</Text>
      <Text style={[styles.title, isDarkMode && styles.titleDark]}>
        Bienvenido, <Text style={styles.user}>{user}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 26,
    marginRight: 10,
    color: '#4b5563',
  },
  iconDark: {
    color: '#d1d5db',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    letterSpacing: 0.3,
  },
  titleDark: {
    color: '#f9fafb',
  },
  user: {
    fontWeight: '700',
    color: '#3b82f6',
  },
});
