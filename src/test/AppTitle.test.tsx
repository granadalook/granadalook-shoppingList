import React from 'react';
import { render } from '@testing-library/react-native';

import * as ReactNative from 'react-native';
import { AppTitle } from '../components/atoms/AppTitle';

describe('AppTitle', () => {
  it('debería renderizar el título y el ícono en modo claro', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light');

    const { getByText } = render(<AppTitle />);

    expect(getByText('📝')).toBeTruthy();
    expect(getByText('Mi Lista de Compras')).toBeTruthy();
  });

  it('debería aplicar estilos oscuros en modo dark', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark');

    const { getByText } = render(<AppTitle />);

    expect(getByText('📝')).toBeTruthy();
    expect(getByText('Mi Lista de Compras')).toBeTruthy();
  });
});
