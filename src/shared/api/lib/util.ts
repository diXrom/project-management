import { STORAGE_AUTH } from 'shared/common/constants';
import { IStorageAuth } from './types';

const getStorageInfo = () => {
  const token = localStorage.getItem(STORAGE_AUTH);
  if (token) return JSON.parse(token) as IStorageAuth;
  return null;
};

const prepareHeaders = (headers: Headers) => {
  headers.set('Accept', 'application/json');
  headers.set('Authorization', `Bearer ${getStorageInfo()?.token || ''}`);
  return headers;
};

export { prepareHeaders };
