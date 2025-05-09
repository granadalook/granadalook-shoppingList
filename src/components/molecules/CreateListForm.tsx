import React from 'react';
import { View } from 'react-native';
import { InputField } from '../atoms/InputField';
import { PrimaryButton } from '../atoms/PrimaryButton';

interface CreateListFormProps {
  listName: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

export const CreateListForm: React.FC<CreateListFormProps> = ({ listName, onChange, onSubmit }) => (
  <View>
    <InputField placeholder="Nombre de la lista" value={listName} onChangeText={onChange} />
    <PrimaryButton title="Crear nueva lista" onPress={onSubmit} disabled={!listName} />
  </View>
);