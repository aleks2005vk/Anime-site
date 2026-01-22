import { createSlice } from '@reduxjs/toolkit';
import { DAY, META_PERIOD, SEASON, SUBTYPE, TYPE } from '../constants';

const initialState = {
  anime: {
    list: [],        // список аниме (после загрузки API)
    top: [],         // топовые аниме
    genres: [],      // список жанров
    details: null,   // детали выбранного аниме
    loading: false,  // индикатор загрузки
    error: null      // ошибка
  },
  ui: {
    selectedType: TYPE.ANIME,
    selectedSeason: SEASON.WINTER,
    selectedDay: DAY.MONDAY,
    selectedSubtype: SUBTYPE.BYPOPULARITY,
    selectedMetaPeriod: META_PERIOD.TODAY,
    selectedGenre: "",
    selectedYear: "",
    selectedSort: ""
  },
  value: 0,
};

export const currentQuerySlice = createSlice({
  name: 'currentQuerySlice',
  initialState,
  reducers: {
    setSelectedGenre: (state, action) => {
      state.ui.selectedGenre = action.payload;
    },
    setSelectedType: (state, action) => {
      state.ui.selectedType = action.payload;
    },
    setSelectedYear: (state, action) => {
      state.ui.selectedYear = action.payload;
    },
    setSelectedSort: (state, action) => {
      state.ui.selectedSort = action.payload;
    },
    setAnimeList: (state, action) => {
      state.anime.list = action.payload;
    }
  },
});

export const { setSelectedGenre, setSelectedType, setSelectedYear, setSelectedSort, setAnimeList } = currentQuerySlice.actions;

export default currentQuerySlice.reducer;
