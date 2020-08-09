import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface todoItems {
  id: number,
  title: string,
  completed: boolean,
  list: string,
}
interface todosState {
  todoItems: Array<todoItems>;
}

const initialState: todosState = {
  todoItems: [],
};
 
export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<todoItems>)  => {
      state.todoItems.push(action.payload);
    },
    clearItems: (state)  => {
      state.todoItems = [];
    },
    deleteItem: (state, index: PayloadAction<number>)  => {
      state.todoItems.splice(index.payload, 1)
    },
    checkItem: (state, index: PayloadAction<number>)  => {
      state.todoItems[index.payload].completed = !state.todoItems[index.payload].completed;
    },

  },
});

export const { addItem, deleteItem, checkItem, clearItems } = todosSlice.actions;
export const selectItems = (state: RootState) => state.todos.todoItems;

export default todosSlice.reducer;
