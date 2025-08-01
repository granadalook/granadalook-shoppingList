// src/test/HomeContainer.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createTestStore } from './testStore';
import { HomeContainer } from '../components/organisms/HomeContainer';

describe('HomeContainer', () => {
  const initialState = {
    auth: {
      user: 'usuarioEjemplo',
    },
    lists: {
      lists: [
        {
          id: '1',
          nombre: 'Mi lista',
          creadoPor: JSON.stringify(['usuarioEjemplo']),
          sharedWith: [],
          items: ['Pan', 'Leche'],
        },
      ],
    },
  };

  it('muestra el nombre de usuario y renderiza una lista', () => {
    const store = createTestStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <HomeContainer
          navigation={{ pop: jest.fn(), navigate: jest.fn() }}
          initialListId='1'
        />
      </Provider>
    );

    expect(getByText(/usuarioEjemplo/i)).toBeTruthy();
    expect(getByText(/Mi lista/i)).toBeTruthy();
  
  });

  it('permite crear una nueva lista', () => {
    const store = createTestStore(initialState);
    store.dispatch = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <HomeContainer navigation={{ pop: jest.fn(), navigate: jest.fn() }} />
      </Provider>
    );

    const input = getByPlaceholderText('Nombre de la lista');
    fireEvent.changeText(input, 'Nueva Lista');

    fireEvent.press(getByText(/Crear nueva lista/i));
    expect(store.dispatch).toHaveBeenCalled();
  });
});
