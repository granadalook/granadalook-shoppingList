import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import * as ReactNative from 'react-native';
import { LogoutButton } from '../components/atoms/LogoutButton';

describe('LogoutButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('debería renderizar el texto "Cerrar sesión" en modo claro', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light');

    const { getByText } = render(<LogoutButton onPress={mockOnPress} />);

    const buttonText = getByText('Cerrar sesión');
    expect(buttonText).toBeTruthy();

    fireEvent.press(buttonText);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('debería aplicar estilos oscuros en modo dark', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark');

    const { getByText } = render(<LogoutButton onPress={mockOnPress} />);

    const buttonText = getByText('Cerrar sesión');
    expect(buttonText).toBeTruthy();

    fireEvent.press(buttonText);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
