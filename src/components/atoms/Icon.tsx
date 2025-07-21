import React from 'react';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';

interface IconProps {
  uri: string;
  size?: number; // tamaño opcional
  rounded?: boolean; // borde redondeado opcional
}

export const Icon: React.FC<IconProps> = ({ uri, size = 160, rounded = false }) => {
  const { width } = useWindowDimensions();
  const imageSize = Math.min(size, width * 0.6); // máximo 60% del ancho de pantalla

  return (
    <Image
      source={{ uri }}
      style={[
        styles.icon,
        { width: imageSize, height: imageSize },
        rounded && styles.rounded,
      ]}
      resizeMode='contain'
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginBottom: 24,
    alignSelf: 'center',
  },
  rounded: {
    borderRadius: 16,
  },
});
