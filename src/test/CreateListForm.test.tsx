import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CreateListForm } from '../components/molecules/CreateListForm';


describe('CreateListForm', () => {
  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar el input y el botón', () => {
    const { getByPlaceholderText, getByText } = render(
      <CreateListForm listName="" onChange={mockOnChange} onSubmit={mockOnSubmit} />
    );

    expect(getByPlaceholderText('Nombre de la lista')).toBeTruthy();
    expect(getByText('Crear nueva lista')).toBeTruthy();
  });

  it('debería llamar a onChange al escribir', () => {
    const { getByPlaceholderText } = render(
      <CreateListForm listName="" onChange={mockOnChange} onSubmit={mockOnSubmit} />
    );

    const input = getByPlaceholderText('Nombre de la lista');
    fireEvent.changeText(input, 'Compras');

    expect(mockOnChange).toHaveBeenCalledWith('Compras');
  });



  it('debería llamar a onSubmit al presionar el botón si el nombre es válido', () => {
    const { getByText } = render(
      <CreateListForm listName="Oficina" onChange={mockOnChange} onSubmit={mockOnSubmit} />
    );

    const button = getByText('Crear nueva lista');
    fireEvent.press(button);

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
