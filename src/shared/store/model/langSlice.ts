import { createSlice } from '@reduxjs/toolkit';
import { getLang, setLang } from 'shared/common/utils';
import i18n from 'shared/locale/i18n';

type langState = { lang: 'EN' | 'RU' };

const initialState: langState = { lang: (getLang() as 'EN' | 'RU') || 'EN' };
const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    toggleLang(state) {
      state.lang = state.lang === 'EN' ? 'RU' : 'EN';
      setLang(state.lang);
      i18n.changeLanguage(state.lang);
    },
  },
});

export const { toggleLang } = langSlice.actions;
export default langSlice;
