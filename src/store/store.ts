import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './counter';
import todosReducer from './todo';
import listReducer from './lists';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    lists: listReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
