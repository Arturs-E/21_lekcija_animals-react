import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AnimalsState = {
  name: {
    en: string;
    [prop: string]: string;
  }
  imgSrc: string;
  species: string;
}

const initialState: AnimalsState[] = [];

const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AnimalsState>) => ([...state, action.payload]),
  },
});

const { addItem } = animalsSlice.actions;
const animalsReducer = animalsSlice.reducer;

export { animalsSlice, animalsReducer, addItem };
