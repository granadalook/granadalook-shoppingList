import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Interface para respuesta de la API
interface ShoppingListApi {
   id: string;
  nombre: string;
  creadoPor: string | null;
  post:EntidadApi []; // Asumiendo que 'post' es el campo que contiene los items
}

export interface ShoppingList {
  id: string;
  nombre: string;
  creadoPor: string | null;
  sharedWith: string[];
  items: string[];
}

interface ListsState {
  lists: ShoppingList[];
  loading: boolean;
  error: string | null;
}
interface EntidadApi {
  id: string;
  userName: string;
  texto: string;
  verdad: number;
  mentira: number;
  duda: number;
  idEntidad: string;
  fechaCreacion: string;
  cantidadComentario: number;
  image: string | null;
}

const initialState: ListsState = {
  lists: [],
  loading: false,
  error: null,
};

// Thunk para crear una lista (post)
export const createListAsync = createAsyncThunk(
  'lists/createListAsync',
  async (
    payload: { id: string; name: string; owner: string | null; image?: string },
    { rejectWithValue }
  ) => {
    try {
      await axios.post('http://192.168.20.55:3000/entidad', {
        nombre: payload.name.toLowerCase(),
        pais: 'COLOMBIA',
        departamento: 'CALDAS',
        ciudad: 'VITERBO',
        creadoPor: JSON.stringify([payload.owner]),
      });
      return payload;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
// Thunk para obtener todas las listas de un usuario
function parseStringToArray(value: string | null): string[] {
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

export const fetchListsByUser = createAsyncThunk(
  'lists/fetchListsByUser',
  async (userName: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<ShoppingListApi[]>(
        `http://192.168.20.55:3000/entidad/filterAll/${userName}`
      );

      const lists: ShoppingList[] = response.data.map(entidad => ({
        id: entidad.id,
        nombre: entidad.nombre,
        creadoPor: entidad.creadoPor, // se mantiene como string
        sharedWith: entidad.post?.map(p => p.idEntidad) ?? [],
        items: entidad.post?.map(p => p.texto) ?? [],
      }));

      // 🔍 Filtro solo las listas donde el usuario está en creadoPor o en sharedWith
      const userLists = lists.filter(list => {
        const creadoPorArray = parseStringToArray(list.creadoPor);
        return creadoPorArray.includes(userName) || list.sharedWith.includes(userName);
      });
      console.log('userLists', userLists);debugger
      return userLists; 
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
// Thunk para compartir lista en remoto
export const shareListAsync = createAsyncThunk(
  'lists/shareListAsync',
  async (
    payload: { listId: string; user: string; owner: string | null; name: string; image?: string },
    { rejectWithValue }
  ) => {
    try {
      // Usamos el mismo endpoint POST para agregar un nuevo registro indicando la compartición
      await axios.post('https://topsecret-back-end.onrender.com/post', {
        userName: payload.user,                // quien recibe la lista
        texto: payload.name,                   // nombre de la lista
        image: payload.image ?? '',
        entidadId: payload.listId,
      });
      return payload;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const addItemAsync = createAsyncThunk(
  'lists/addItemAsync',
  async (
    { listId, item, user }: { listId: string; item: string; user?: string | null },
    { rejectWithValue }
  ) => {
    try {
      await axios.post('http://192.168.20.55:3000/post', {
        userName: user,
        texto: item,
        entidadId: listId,
      });
      return { listId, item, user };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const deleteItemAsync = createAsyncThunk(
  'lists/deleteItemAsync',
  async (
    { listId, item, user }: { listId: string; item: string; user?: string | null },
    { rejectWithValue }
  ) => {
    try {
      await axios.delete(`http://192.168.20.55:3000/post/${item}`, );
      return { listId, item, user };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
   addItem(state, action: PayloadAction<{ listId: string; item: string; user: string }>) {
  const list = state.lists.find(l => l.id === action.payload.listId);
    if (list) { 
    list.items.push(action.payload.item);
  }
},
    removeItem(state, action: PayloadAction<{ listId: string; item: string }>) {
      const list = state.lists.find(l => l.id === action.payload.listId);
      if (list) list.items = list.items.filter(i => i !== action.payload.item);
    },
  },
  extraReducers: builder => {

    builder.addCase(addItemAsync.fulfilled, (state, action) => {
  const list = state.lists.find(l => l.id === action.payload.listId);
  if (list) {
    list.items.push(action.payload.item);
  }
});
builder.addCase(deleteItemAsync.fulfilled, (state, action) => {
  const { listId, item } = action.payload;
  const list = state.lists.find(l => l.id === listId);
  if (list) {
    list.items = list.items.filter(i => i !== item);
  }
});

builder.addCase(addItemAsync.rejected, (state, action) => {
  state.error = action.payload as string;
});
    // createListAsync
    builder.addCase(createListAsync.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createListAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.lists.push({
        id: action.payload.id,
        nombre: action.payload.name,
        creadoPor: action.payload.owner,
        sharedWith: [],
        items: [],
      });
    });
    builder.addCase(createListAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // fetchListsByUser
    builder.addCase(fetchListsByUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchListsByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.lists = action.payload;
    });
    builder.addCase(fetchListsByUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // shareListAsync
    builder.addCase(shareListAsync.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(shareListAsync.fulfilled, (state, action) => {
      state.loading = false;
      // opcionalmente podrías añadir lógica para reflejar que ya está compartida
    });
    builder.addCase(shareListAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export const { addItem, removeItem } = listsSlice.actions;
export default listsSlice.reducer;
