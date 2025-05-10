import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ShoppingList {
  id: string;
  name: string;
  owner: string | null;
  sharedWith: string[];
  items: string[];
}

interface ListsState {
  lists: ShoppingList[];
}

const initialState: ListsState = {
  lists: [],
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    createList(state, action: PayloadAction<{ id: string; name: string; owner: string | null }>) {
      state.lists.push({
        id: action.payload.id,
        name: action.payload.name,
        owner: action.payload.owner,
        sharedWith: [],
        items: [],
      });
    },
    addItem(state, action: PayloadAction<{ listId: string; item: string }>) {
      const list = state.lists.find(l => l.id === action.payload.listId);
      if (list) list.items.push(action.payload.item);
    },
    removeItem(state, action: PayloadAction<{ listId: string; item: string }>) {
      const list = state.lists.find(l => l.id === action.payload.listId);
      if (list) list.items = list.items.filter(i => i !== action.payload.item);
    },
    shareList(state, action: PayloadAction<{ listId: string; user: string }>) {
      const list = state.lists.find(l => l.id === action.payload.listId);
      if (list && !list.sharedWith.includes(action.payload.user)) {
        list.sharedWith.push(action.payload.user);
      }
    },
  },
});

export const { createList, addItem, removeItem, shareList } = listsSlice.actions;
export default listsSlice.reducer;
