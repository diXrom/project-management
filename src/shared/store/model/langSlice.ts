import { createSlice } from '@reduxjs/toolkit';

type langState = { lang: 'en' | 'ru' };

const initialState: langState = { lang: 'en' };
const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    toggleLang(state) {
      if (state.lang === 'en') {
        state.lang = 'ru';
      } else {
        state.lang = 'en';
      }
    },
  },
});

export const { toggleLang } = langSlice.actions;
export default langSlice;
