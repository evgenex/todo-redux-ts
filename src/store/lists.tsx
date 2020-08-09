import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface listState {
  listItems: Array<String>;
  currentList: String;
}

const initialState: listState = {
  listItems: [],
  currentList: 'Important',
};

export const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<string>)  => {
      const newList = action.payload;
      if(state.listItems.indexOf(newList)<0){
        state.listItems.push(newList);
      }
    },
    deleteList: (state, action: PayloadAction<number>)  => {
      state.listItems.splice(action.payload, 1);
    },
    setCurrentList: (state, action: PayloadAction<string>)  => {
      state.currentList = action.payload;
  },
  },
});

export const { addList, deleteList, setCurrentList} = listSlice.actions;
export const selectList = (state: RootState) => state.lists.listItems;
export const selectCurrentList = (state: RootState) => state.lists.currentList;

export default listSlice.reducer;
