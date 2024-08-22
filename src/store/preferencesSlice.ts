// src/store/preferencesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreferencesState {
  selectedAuthors: string[]; // Store only names of selected authors
  selectedSources: string[]; // Store only IDs of selected sources
  selectedCategories: string[]; // Store only category names
}

const initialState: PreferencesState = {
  selectedAuthors: [],
  selectedSources: [],
  selectedCategories: [],
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleAuthor: (state, action: PayloadAction<string>) => {
      const index = state.selectedAuthors.indexOf(action.payload);
      if (index >= 0) {
        state.selectedAuthors.splice(index, 1);
      } else {
        state.selectedAuthors.push(action.payload);
      }
    },
    toggleSource: (state, action: PayloadAction<string>) => {
      const index = state.selectedSources.indexOf(action.payload);
      if (index >= 0) {
        state.selectedSources.splice(index, 1);
      } else {
        state.selectedSources.push(action.payload);
      }
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const index = state.selectedCategories.indexOf(action.payload);
      if (index >= 0) {
        state.selectedCategories.splice(index, 1);
      } else {
        state.selectedCategories.push(action.payload);
      }
    },
  },
});

export const { toggleAuthor, toggleSource, toggleCategory } = preferencesSlice.actions;
export default preferencesSlice.reducer;
