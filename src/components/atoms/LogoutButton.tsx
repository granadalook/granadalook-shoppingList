import React from 'react';
import { Button } from 'react-native';

interface LogoutButtonProps {
  onPress: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => (
  <Button title="Cerrar sesión" onPress={onPress} />
);

