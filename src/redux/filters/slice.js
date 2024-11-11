import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    filterDictionary: {
      keyword: "",
      category: "",
      isIrregular: null,
      page: 1,
    },
    filterRecomend: {
      keyword: "",
      category: "",
      isIrregular: null,
      page: 1,
    },
  },
  reducers: {
    changeFilterDictionary: (state, action) => {
      state.filterDictionary = { ...state.filterDictionary, ...action.payload };
    },
    changeDictionaryPage: (state, action) => {
      state.filterDictionary.page = action.payload;
    },
    changeFilterRecomend: (state, action) => {
      state.filterRecomend = { ...state.filterRecomend, ...action.payload };
    },
    changeRecomendPage: (state, action) => {
      state.filterRecomend.page = action.payload;
    },
  },
});

export const filtersReduser = filtersSlice.reducer;
export const { changeFilterDictionary, changeDictionaryPage, changeFilterRecomend, changeRecomendPage } =
  filtersSlice.actions;
