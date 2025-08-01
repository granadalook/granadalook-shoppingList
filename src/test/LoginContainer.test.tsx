import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createTestStore } from './testStore'; // ✅ store real
import axios from 'axios';
import { LoginContainer } from '../components/organisms/LoginContainer';
import Toast from 'react-native-toast-message';



jest.mock('axios');
jest.mock('react-native-toast-message', () => {
  const MockToastComponent = () => null;
  return {
    __esModule: true,
    default: Object.assign(MockToastComponent, {
      show: jest.fn(),
      hide: jest.fn(),
    }),
  };
});

const mockNavigation = { navigate: jest.fn() };

describe('LoginContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });



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
  }); it('muestra error si email o contraseña están vacíos (isValidForm)', async () => {
    const store = createTestStore();

    const { getByText } = render(
      <Provider store={store}>
        <LoginContainer navigation={mockNavigation} />
      </Provider>
    );

    fireEvent.press(getByText(/Entrar/i)); // Submit sin llenar campos

   
      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          text1: 'Error',
          text2: 'Nombre de usuario y contraseña requeridos.',
        })
      );
  });

  it('muestra error si la contraseña no cumple requisitos (isValidForm)', async () => {
    const store = createTestStore();

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginContainer navigation={mockNavigation} />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Nickname'), 'usuario');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'abc'); 

    fireEvent.press(getByText(/Entrar/i)); // Submit

    
       expect.objectContaining({
        type: 'error',
        text1: 'Error',
        text2:
          'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.',
      })
    
  });




});