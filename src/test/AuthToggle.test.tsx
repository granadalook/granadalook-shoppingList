import React from 'react';
import { render } from '@testing-library/react-native';
import { AuthToggle } from '../components/molecules/AuthToggle';


describe('AuthToggle', () => {
  it('debe mostrar el texto y botón para registro cuando isLogin es true', () => {
    const { getByText } = render(<AuthToggle isLogin={true} onToggle={() => {}} />);
    expect(getByText(/¿No tienes cuenta\? Registrarse/i)).toBeTruthy();
  });

  it('debe mostrar el texto y botón para iniciar sesión cuando isLogin es false', () => {
    const { getByText } = render(<AuthToggle isLogin={false} onToggle={() => {}} />);
    expect(getByText(/¿Ya tienes cuenta\? Iniciar sesión/i)).toBeTruthy();
  });

 
});
