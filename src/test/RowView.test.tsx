import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import * as ReactNative from 'react-native';
import { RowView } from '../components/atoms/RowView';

describe('RowView', () => {
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar correctamente en modo claro', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light');
   

    const { getByText } = render(<RowView item="Pan" onRemove={mockOnRemove} />);

    expect(getByText('🛒')).toBeTruthy();
    expect(getByText('Pan')).toBeTruthy();
    expect(getByText('🗑')).toBeTruthy();
  });

  it('debería renderizar correctamente en modo oscuro', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark');


    const { getByText } = render(<RowView item="Leche" onRemove={mockOnRemove} />);

    expect(getByText('Leche')).toBeTruthy();
  });

  it('debería llamar a onRemove con el nombre del item', () => {
    const item = 'Huevos';
    const { getByText } = render(<RowView item={item} onRemove={mockOnRemove} />);

    const removeButton = getByText('🗑');
    fireEvent.press(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith(item);
  });
});
