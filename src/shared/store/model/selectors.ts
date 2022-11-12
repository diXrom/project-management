import { AppState } from '..';

const getLang = (state: AppState) => state.langSlice.lang;
const getUser = (state: AppState) => state.authSlice.user;

export { getLang, getUser };
