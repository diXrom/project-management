import { STORAGE_LANG, STORAGE_TOKEN } from './constants';

const getToken = () => localStorage.getItem(STORAGE_TOKEN);
const getLang = () => localStorage.getItem(STORAGE_LANG);
const setToken = (token: string) => localStorage.setItem(STORAGE_TOKEN, token);
const setLang = (token: string) => localStorage.setItem(STORAGE_LANG, token);

export { getToken, setToken, getLang, setLang };
