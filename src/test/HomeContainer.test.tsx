// src/test/HomeContainer.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createTestStore } from './testStore';
import { HomeContainer } from '../components/organisms/HomeContainer';

const mockNavigate = jest.fn();
const mockPop = jest.fn();

const navigationMock = {
  navigate: mockNavigate,
  pop: mockPop,
};

describe('HomeContainer', () => {
  const baseState = {
    auth: {
      user: 'usuarioEjemplo',
    },
    lists: {
      lists: [
        {
          id: '1',
          nombre: 'Mi lista',
          creadoPor: JSON.stringify(['usuarioEjemplo']),
          sharedWith: ['otro@correo.com'],
          items: ['Pan', 'Leche'],
        },
      ],
    },
  };

  it('muestra el nombre de usuario y renderiza una lista', () => {
    const store = createTestStore(baseState);
    const { getByText } = render(
      <Provider store={store}>
        <HomeContainer navigation={navigationMock} />
      </Provider>
    );

    expect(getByText(/usuarioEjemplo/i)).toBeTruthy();
    expect(getByText(/Mi lista/i)).toBeTruthy();
  });

  it('permite crear una nueva lista', () => {
    const store = createTestStore(baseState);
    store.dispatch = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <HomeContainer navigation={navigationMock} />
      </Provider>
    );

    const input = getByPlaceholderText('Nombre de la lista');
    fireEvent.changeText(input, 'Nueva Lista');
    fireEvent.press(getByText(/Crear nueva lista/i));

    expect(store.dispatch).toHaveBeenCalled();
  });

  it('ejecuta logout y navega hacia atrás', () => {
    const store = createTestStore(baseState);
    const { getByText } = render(
      <Provider store={store}>
        <HomeContainer navigation={navigationMock} />
      </Provider>
    );

    fireEvent.press(getByText('Cerrar sesión'));
    expect(mockPop).toHaveBeenCalled();
  });

  it('navega a detalles al seleccionar una lista', () => {
    const store = createTestStore(baseState);
    const { getByText } = render(
      <Provider store={store}>
        <HomeContainer navigation={navigationMock} />
      </Provider>
    );

    fireEvent.press(getByText('Mi lista'));
    expect(mockNavigate).toHaveBeenCalledWith('ListDetail', { listId: '1' });
  });

 it('agrega un ítem válido', () => {
  const store = createTestStore(baseState);
  store.dispatch = jest.fn();

  const { getByPlaceholderText, getByText } = render(
    <Provider store={store}>
      <HomeContainer navigation={navigationMock} initialListId='1' />
    </Provider>
  );

  fireEvent.changeText(getByPlaceholderText('Nuevo producto'), 'Huevos');
  fireEvent.press(getByText('Agregar producto'));

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function)); // ✅ thunk
});

it('comparte lista con correo válido y no duplicado', () => {
  const store = createTestStore({
    ...baseState,
    lists: {
      lists: [{
        ...baseState.lists.lists[0],
        sharedWith: [], // para que no falle por duplicado
      }],
    },
  });
  store.dispatch = jest.fn();

  const { getByPlaceholderText, getByText } = render(
    <Provider store={store}>
      <HomeContainer navigation={navigationMock} initialListId='1' />
    </Provider>
  );

  fireEvent.changeText(getByPlaceholderText('Compartir con usuario'), 'nuevo@correo.com');
  fireEvent.press(getByText('Compartir'));

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
});


it('elimina un ítem de la lista', () => {
  const store = createTestStore(baseState); // baseState incluye una lista con items
  store.dispatch = jest.fn();

  const { getByTestId } = render(
    <Provider store={store}>
      <HomeContainer navigation={navigationMock} initialListId='1' />
    </Provider>
  );

  fireEvent.press(getByTestId('delete-Pan'));

   expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
});


});
