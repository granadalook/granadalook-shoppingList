// __tests__/App.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import RootApp from '../App';

describe('App navigation', () => {
  it('debe renderizar la pantalla de Login por defecto', () => {
    const { getByText } = render(<RootApp />);
    expect(getByText('Iniciar sesión')).toBeTruthy();
  });
});
