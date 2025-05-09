import React from 'react';
import { View } from 'react-native';
import { InputField } from '../atoms/InputField';
import { PrimaryButton } from '../atoms/PrimaryButton';

interface ShareListFormProps {
  shareEmail: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

export const ShareListForm: React.FC<ShareListFormProps> = ({ shareEmail, onChange, onSubmit }) => (
  <View>
    <InputField placeholder="Compartir con (email)" value={shareEmail} onChangeText={onChange} />
    <PrimaryButton title="Compartir" onPress={onSubmit} disabled={!shareEmail} />
  </View>
);