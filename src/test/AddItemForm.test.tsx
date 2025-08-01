// src/test/AddItemForm.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AddItemForm } from '../components/molecules/AddItemForm';

describe('AddItemForm', () => {
  it('debe mostrar el valor ingresado y llamar al submit', () => {
    const mockOnChange = jest.fn();
    const mockOnSubmit = jest.fn();

    // 1. Render inicial con campo vacío
    const { getByPlaceholderText, rerender, getByText } = render(
      <AddItemForm
        newItem=""
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
      />
    );

    // 2. Simular escritura del texto
    const input = getByPlaceholderText('Nuevo producto');
    fireEvent.changeText(input, 'Tomate');
    expect(mockOnChange).toHaveBeenCalledWith('Tomate');

    // 3. Volver a renderizar con el valor actualizado
    rerender(
      <AddItemForm
        newItem="Tomate"
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
      />
    );

    // 4. Pulsar el botón y verificar que se llama a onSubmit
    const button = getByText('Agregar producto');
    fireEvent.press(button);
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
