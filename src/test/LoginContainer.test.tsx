import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createTestStore } from './testStore'; // ✅ store real
import axios from 'axios';
import { LoginContainer } from '../components/organisms/LoginContainer';


jest.mock('axios');
jest.mock('react-native-toast-message', () => {
  const ActualToast = jest.requireActual('react-native-toast-message');
  return {
    __esModule: true,
    default: () => null, // El componente Toast se renderiza como null en pruebas
    show: jest.fn(),
    hide: jest.fn(),
    ...ActualToast, // Opcional, para preservar otros métodos si los usas
  };
});

const mockNavigation = { navigate: jest.fn() };

describe('LoginContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

/*  it('muestra error si los campos están vacíos', async () => {
  const store = createTestStore();
  const { getByText } = render(
    <Provider store={store}>
      <LoginContainer navigation={mockNavigation} />
    </Provider>
  );

  fireEvent.press(getByText(/Entrar/i));

  await waitFor(() => {
    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        text2: expect.stringContaining('requeridos'),
      })
    );
  });
}); */


  it('inicia sesión exitosamente con credenciales válidas', async () => {
    const store = createTestStore();

    (axios.post as jest.Mock).mockResolvedValue({
      data: { user: { userName: 'testUser' } },
    });

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginContainer navigation={mockNavigation} />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Nickname'), 'testUser');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'Password123');
    fireEvent.press(getByText(/Entrar/i));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Home');
    });
  });
});
