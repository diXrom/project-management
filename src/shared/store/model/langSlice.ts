import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from 'shared/locale/i18n';

type langState = { lang: 'EN' | 'RU' };

const initialState: langState = { lang: 'EN' };
const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    toggleLang(state, { payload }: PayloadAction<'EN' | 'RU'>) {
      state.lang = payload;
      i18n.changeLanguage(payload);
    },
  },
});

export const { toggleLang } = langSlice.actions;
export default langSlice;
