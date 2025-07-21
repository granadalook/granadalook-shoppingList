import React from 'react';
import { View, StyleSheet } from 'react-native';
import { InputField } from '../atoms/InputField';
import { PrimaryButton } from '../atoms/PrimaryButton';

interface AddItemFormProps {
  newItem: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({
  newItem,
  onChange,
  onSubmit,
}) => {
  return (
    <View style={styles.container}>
      <InputField
        placeholder="Nuevo producto"
        value={newItem}
        onChangeText={onChange}
      />
      <PrimaryButton
        title="Agregar producto"
        onPress={onSubmit}
        disabled={!newItem.trim()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12, // solo funciona desde RN 0.71+
    marginBottom: 20,
  },
});
