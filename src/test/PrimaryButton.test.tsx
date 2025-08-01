import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import * as ReactNative from 'react-native';
import { PrimaryButton } from '../components/atoms/PrimaryButton';

describe('PrimaryButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar el título correctamente en modo claro', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light');

    const { getByText } = render(
      <PrimaryButton title="Guardar" onPress={mockOnPress} />
    );

    const button = getByText('Guardar');
    expect(button).toBeTruthy();

    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('debería renderizar correctamente en modo oscuro', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark');

    const { getByText } = render(
      <PrimaryButton title="Enviar" onPress={mockOnPress} />
    );

    const button = getByText('Enviar');
    expect(button).toBeTruthy();

    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('no debería llamar onPress si está deshabilitado', () => {
    const { getByText } = render(
      <PrimaryButton title="Deshabilitado" onPress={mockOnPress} disabled />
    );

    const button = getByText('Deshabilitado');
    fireEvent.press(button);

    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
