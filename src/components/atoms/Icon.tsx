import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface IconProps {
  uri: string;
}

export const Icon: React.FC<IconProps> = ({ uri }) => (
  <Image source={{ uri }} style={styles.icon} />
);

const styles = StyleSheet.create({
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: 'center',  // centrado horizontal
  },
});