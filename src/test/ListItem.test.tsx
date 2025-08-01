import React from 'react';
import { render } from '@testing-library/react-native';
import { ListItem } from '../components/atoms/ListItem'; // Ajusta esta ruta

// Mock de useColorScheme
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(() => 'light'), // por defecto modo claro
}));

describe('ListItem', () => {
  const baseProps = {
    name: 'Lista de Compras',
    onPress: jest.fn(),
    isSelected: false,
    icon: '🛒',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente el nombre e ícono', () => {
    const { getByText } = render(<ListItem {...baseProps} />);
    expect(getByText('Lista de Compras')).toBeTruthy();
    expect(getByText('🛒')).toBeTruthy();
  });



  it('renderiza sin icono personalizado (usa por defecto)', () => {
    const { getByText } = render(
      <ListItem {...baseProps} icon={undefined} />
    );
    expect(getByText('📝')).toBeTruthy(); // ícono por defecto
  });

  it('muestra el contador si itemCount es un número', () => {
    const { getByText } = render(
      <ListItem {...baseProps} itemCount={5} />
    );
    expect(getByText('5')).toBeTruthy();
  });

  it('no muestra contador si itemCount es undefined', () => {
    const { queryByText } = render(<ListItem {...baseProps} />);
    expect(queryByText('0')).toBeNull();
    expect(queryByText('5')).toBeNull();
  });

  it('aplica estilos de modo oscuro si useColorScheme retorna "dark"', () => {
    const useColorScheme = require('react-native/Libraries/Utilities/useColorScheme').default;
    useColorScheme.mockReturnValue('dark');

    const { getByText } = render(<ListItem {...baseProps} />);
    expect(getByText('Lista de Compras')).toBeTruthy();
  });

  it('aplica estilos seleccionados si isSelected=true', () => {
    const { getByText } = render(
      <ListItem {...baseProps} isSelected={true} itemCount={3} />
    );

    const title = getByText('Lista de Compras');
    const badge = getByText('3');

    expect(title.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: '#ffffff' }),
      ])
    );

    expect(badge.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: '#1e40af' }),
      ])
    );
  });
});
