import React from 'react';
import { View, StyleSheet } from 'react-native';
import { InputField } from '../atoms/InputField';
import { PrimaryButton } from '../atoms/PrimaryButton';

interface ShareListFormProps {
  shareEmail: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

export const ShareListForm: React.FC<ShareListFormProps> = ({
  shareEmail,
  onChange,
  onSubmit,
}) => {
  const isValid = shareEmail.trim().length > 0;

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Compartir con usuario"
        value={shareEmail}
        onChangeText={onChange}
      />
      <PrimaryButton
        title="Compartir"
        onPress={onSubmit}
        disabled={!isValid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12, // solo si usas RN 0.71+
    marginBottom: 20,
  },
});
