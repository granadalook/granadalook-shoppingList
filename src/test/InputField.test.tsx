import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { InputField, InputFieldProps } from '../components/atoms/InputField'; // ajusta esta ruta si es necesario

// Mock de useColorScheme
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(() => 'light'), // por defecto modo claro
}));

describe('InputField', () => {
  const baseProps: InputFieldProps = {
    placeholder: 'Correo electrónico',
    value: 'prueba@correo.com',
    onChangeText: jest.fn(),
  };

  it('renderiza correctamente con props mínimos', () => {
    const { getByPlaceholderText } = render(<InputField {...baseProps} />);
    const input = getByPlaceholderText('Correo electrónico');

    expect(input).toBeTruthy();
    expect(input.props.value).toBe('prueba@correo.com');
    expect(input.props.secureTextEntry).toBe(false);
    expect(input.props.editable).toBe(true);
    expect(input.props.placeholderTextColor).toBe('#999'); // modo claro
  });

  it('llama onChangeText cuando cambia el texto', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <InputField {...baseProps} onChangeText={onChange} value="" />
    );

    const input = getByPlaceholderText('Correo electrónico');
    fireEvent.changeText(input, 'nuevo@correo.com');

    expect(onChange).toHaveBeenCalledWith('nuevo@correo.com');
  });

  it('usa secureTextEntry si secure es true', () => {
    const { getByPlaceholderText } = render(
      <InputField {...baseProps} secure value="" />
    );

    const input = getByPlaceholderText('Correo electrónico');
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('no es editable si editable es false', () => {
    const { getByPlaceholderText } = render(
      <InputField {...baseProps} editable={false} />
    );

    const input = getByPlaceholderText('Correo electrónico');
    expect(input.props.editable).toBe(false);
  });

  it('usa placeholderTextColor "#888" en modo oscuro', () => {
    const useColorScheme = require('react-native/Libraries/Utilities/useColorScheme').default;
    useColorScheme.mockReturnValue('dark');

    const { getByPlaceholderText } = render(<InputField {...baseProps} />);
    const input = getByPlaceholderText('Correo electrónico');

    expect(input.props.placeholderTextColor).toBe('#888');
  });
});
