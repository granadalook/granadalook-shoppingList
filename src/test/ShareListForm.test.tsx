import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ShareListForm } from '../components/molecules/ShareListForm';


describe('ShareListForm', () => {
  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar input y botón', () => {
    const { getByPlaceholderText, getByText } = render(
      <ShareListForm shareEmail="" onChange={mockOnChange} onSubmit={mockOnSubmit} />
    );

    expect(getByPlaceholderText('Compartir con usuario')).toBeTruthy();
    expect(getByText('Compartir')).toBeTruthy();
  });

  it('debería llamar a onChange al escribir', () => {
    const { getByPlaceholderText } = render(
      <ShareListForm shareEmail="" onChange={mockOnChange} onSubmit={mockOnSubmit} />
    );

    const input = getByPlaceholderText('Compartir con usuario');
    fireEvent.changeText(input, 'usuario@example.com');

    expect(mockOnChange).toHaveBeenCalledWith('usuario@example.com');
  });



  it('debería llamar a onSubmit si se presiona el botón y el input es válido', () => {
    const { getByText } = render(
      <ShareListForm shareEmail="correo@dominio.com" onChange={mockOnChange} onSubmit={mockOnSubmit} />
    );

    const button = getByText('Compartir');
    fireEvent.press(button);

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
