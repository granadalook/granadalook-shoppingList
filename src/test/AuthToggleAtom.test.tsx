import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AuthToggle } from '../../src/components/atoms/AuthToggle';

// Mock de useColorScheme
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(() => 'light'), // modo claro por defecto
}));

jest.mock('../../src/components/atoms/PrimaryButton', () => {
  const React = require('react');
  const { TouchableOpacity, Text } = require('react-native');
  return {
    PrimaryButton: ({ title, onPress }: any) => (
      <TouchableOpacity onPress={onPress} testID="primary-button">
        <Text>{title}</Text>
      </TouchableOpacity>
    ),
  };
});

describe('AuthToggle', () => {
  it('muestra texto y botón para login=true', () => {
    const { getByText } = render(<AuthToggle isLogin={true} onToggle={jest.fn()} />);
    expect(getByText('¿No tienes cuenta?')).toBeTruthy();
    expect(getByText('Regístrate')).toBeTruthy();
  });

  it('muestra texto y botón para login=false', () => {
    const { getByText } = render(<AuthToggle isLogin={false} onToggle={jest.fn()} />);
    expect(getByText('¿Ya tienes cuenta?')).toBeTruthy();
    expect(getByText('Inicia sesión')).toBeTruthy();
  });

  it('ejecuta onToggle al presionar el botón', () => {
    const onToggleMock = jest.fn();
    const { getByTestId } = render(<AuthToggle isLogin={true} onToggle={onToggleMock} />);
    fireEvent.press(getByTestId('primary-button'));
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  it('aplica estilos oscuros si useColorScheme retorna "dark"', () => {
    const useColorScheme = require('react-native/Libraries/Utilities/useColorScheme').default;
    useColorScheme.mockReturnValue('dark');

    const { getByText } = render(<AuthToggle isLogin={true} onToggle={jest.fn()} />);
    const text = getByText('¿No tienes cuenta?');
    expect(text.props.style).toEqual(
      expect.arrayContaining([{ fontSize: 16, color: '#555' }, { color: '#ccc' }])
    );
  });
});
