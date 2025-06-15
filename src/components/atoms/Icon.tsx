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
    width: 200,
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
  },
});