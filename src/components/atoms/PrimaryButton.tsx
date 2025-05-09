import React from 'react';
import { Button } from 'react-native';

export interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ onPress, title, disabled }) => (
  <Button title={title} onPress={onPress} disabled={disabled} />
);