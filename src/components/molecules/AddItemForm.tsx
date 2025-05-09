import React from 'react';
import { View } from 'react-native';
import { InputField } from '../atoms/InputField';
import { PrimaryButton } from '../atoms/PrimaryButton';

interface AddItemFormProps {
  newItem: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ newItem, onChange, onSubmit }) => (
  <View>
    <InputField placeholder="Nuevo producto" value={newItem} onChangeText={onChange} />
    <PrimaryButton title="Agregar producto" onPress={onSubmit} disabled={!newItem.trim()} />
  </View>
);