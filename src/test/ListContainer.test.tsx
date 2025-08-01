import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { ListContainer } from '../components/organisms/ListDetailScreen';
import { createTestStore } from './testStore';

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
const mockRoute = { params: { listId: '1' } };

describe('ListContainer', () => {
afterEach(() => jest.clearAllMocks());
  it('muestra los ítems de la lista correctamente', () => {
    const store = createTestStore({
      auth: { user: 'usuarioEjemplo' },
      lists: {
        lists: [
          {
            id: '1',
            nombre: 'Lista de prueba',
            creadoPor: 'usuarioEjemplo',
            sharedWith: [],
            items: ['Pan', 'Leche'],
          },
        ],
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <ListContainer route={mockRoute} navigation={{}} />
      </Provider>
    );

    expect(getByText(/Lista de prueba/i)).toBeTruthy();
    expect(getByText(/Pan/i)).toBeTruthy();
    expect(getByText(/Leche/i)).toBeTruthy();
  });

  
  it('muestra mensaje si la lista no existe', () => {
    const store = createTestStore({
      auth: { user: 'usuarioEjemplo' },
      lists: { lists: [] },
    });

    const { getByText } = render(
      <Provider store={store}>
        <ListContainer route={{ params: { listId: '99' } }} navigation={{}} />
      </Provider>
    );

    expect(getByText(/Lista no encontrada/i)).toBeTruthy();
  });

  it('permite agregar un nuevo ítem', () => {
    const store = createTestStore({
      auth: { user: 'usuarioEjemplo' },
      lists: {
        lists: [{
          id: '1',
          nombre: 'Lista de prueba',
          creadoPor: 'usuarioEjemplo',
          sharedWith: [],
          items: [],
        }],
      },
    });

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <ListContainer route={mockRoute} navigation={{}} />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText(/Nuevo producto/i), 'Huevos');
    fireEvent.press(getByText(/Agregar producto/i));
    expect(Toast.show).toHaveBeenCalledWith(
  expect.objectContaining({
    type: 'success',
    text1: 'Producto agregado',
    text2: '"Huevos" agregado.',
  }),
);
  });

    it('muestra error si se comparte con un email ya existente', () => {
    const store = createTestStore({
      auth: { user: 'usuarioEjemplo' },
      lists: {
        lists: [
          {
            id: '1',
            nombre: 'Lista de prueba',
            creadoPor: 'usuarioEjemplo',
            sharedWith: ['correo@ejemplo.com'],
            items: [],
          },
        ],
      },
    });

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <ListContainer route={mockRoute} navigation={{}} />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText(/Compartir con usuario/i), 'correo@ejemplo.com');
    fireEvent.press(getByText(/Compartir/i));

    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        text1: 'Error',
        text2: 'Ya compartida con este usuario',
      })
    );
  });

it('muestra mensaje al eliminar un producto', () => {
  const store = createTestStore({
    auth: { user: 'usuarioEjemplo' },
    lists: {
      lists: [
        {
          id: '1',
          nombre: 'Lista de prueba',
          creadoPor: 'usuarioEjemplo',
          sharedWith: [],
          items: ['Pan'],
        },
      ],
    },
  });

  const { getByTestId } = render(
    <Provider store={store}>
      <ListContainer route={mockRoute} navigation={{}} />
    </Provider>
  );

  fireEvent.press(getByTestId('delete-Pan'));

  expect(Toast.show).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'success',
      text1: 'Producto eliminado',
      text2: '"Pan" eliminado.',
    })
  );
});

/////////////////


it('muestra error si se comparte con un email ya existente', () => {
  const store = createTestStore({
    auth: { user: 'usuarioEjemplo' },
    lists: {
      lists: [
        {
          id: '1',
          nombre: 'Lista de prueba',
          creadoPor: 'usuarioEjemplo',
          sharedWith: ['correo@ejemplo.com'],
          items: [],
        },
      ],
    },
  });

  const { getByPlaceholderText, getByText } = render(
    <Provider store={store}>
      <ListContainer route={mockRoute} navigation={{}} />
    </Provider>
  );

  fireEvent.changeText(getByPlaceholderText(/Compartir con usuario/i), 'correo@ejemplo.com');
  fireEvent.press(getByText(/Compartir/i));

  expect(Toast.show).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'error',
      text1: 'Error',
      text2: 'Ya compartida con este usuario',
    })
  );
});


it('comparte correctamente con un nuevo usuario', () => {
  const store = createTestStore({
    auth: { user: 'usuarioEjemplo' },
    lists: {
      lists: [
        {
          id: '1',
          nombre: 'Lista de prueba',
          creadoPor: 'usuarioEjemplo',
          sharedWith: [],
          items: [],
        },
      ],
    },
  });

  store.dispatch = jest.fn();

  const { getByPlaceholderText, getByText } = render(
    <Provider store={store}>
      <ListContainer route={mockRoute} navigation={{}} />
    </Provider>
  );

  fireEvent.changeText(getByPlaceholderText(/Compartir con usuario/i), 'nuevo@correo.com');
  fireEvent.press(getByText(/Compartir/i));

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function)); // thunk
  expect(Toast.show).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'success',
      text1: 'Compartido',
      text2: 'Compartido con nuevo@correo.com',
    })
  );
});


});