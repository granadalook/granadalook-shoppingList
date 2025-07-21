import React from 'react';
import { View, StyleSheet } from 'react-native';
import { InputField } from '../atoms/InputField';
import { PrimaryButton } from '../atoms/PrimaryButton';

interface CreateListFormProps {
  listName: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

export const CreateListForm: React.FC<CreateListFormProps> = ({
  listName,
  onChange,
  onSubmit,
}) => {
  const isValid = listName.trim().length > 0;

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Nombre de la lista"
        value={listName}
        onChangeText={onChange}
      />
      <PrimaryButton
        title="Crear nueva lista"
        onPress={onSubmit}
        disabled={!isValid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12, // requiere RN 0.71+, si no, usar marginBottom manual
    marginBottom: 20,
  },
});
