// features/searchQuerySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: "", // ключевое слово для поиска
  results: [], // результаты поиска
  loading: false,
  error: null
};

export const searchQuerySlice = createSlice({
  name: 'searchQuerySlice',
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearSearch: (state) => {
      state.keyword = "";
      state.results = [];
      state.error = null;
    }
  },
});

export const { 
  setKeyword, 
  setResults, 
  setLoading, 
  setError, 
  clearSearch 
} = searchQuerySlice.actions;

export default searchQuerySlice.reducer;