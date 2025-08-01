import React from 'react';
import { render } from '@testing-library/react-native';
import { HeaderTitle } from '../components/atoms/HeaderTitle';


jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(() => 'light'), // valor por defecto
}));

describe('HeaderTitle', () => {
  it('debe renderizar el saludo con el nombre de usuario', () => {
    const { getByText } = render(<HeaderTitle user="Carlos" />);
    
    expect(getByText(/👋/)).toBeTruthy(); // ícono
    expect(getByText(/Bienvenido/)).toBeTruthy(); // usando regex
    expect(getByText('Carlos')).toBeTruthy(); // usuario
  });

  it('debe aplicar estilos de modo oscuro si useColorScheme retorna "dark"', () => {
    const useColorScheme = require('react-native/Libraries/Utilities/useColorScheme').default;
    useColorScheme.mockReturnValue('dark');

    const { getByText } = render(<HeaderTitle user="Ana" />);

    expect(getByText(/Bienvenido/)).toBeTruthy();
    expect(getByText('Ana')).toBeTruthy();
  });

  it('debe aplicar estilos de modo claro si useColorScheme retorna "light"', () => {
    const useColorScheme = require('react-native/Libraries/Utilities/useColorScheme').default;
    useColorScheme.mockReturnValue('light');

    const { getByText } = render(<HeaderTitle user="Luis" />);

    expect(getByText(/Bienvenido/)).toBeTruthy();
    expect(getByText('Luis')).toBeTruthy();
  });
});
