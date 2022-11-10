import { STORAGE_TOKEN } from 'shared/common/constants';

const prepareHeaders = (headers: Headers) => {
  headers.set('Accept', 'application/json');
  headers.set('Authorization', `Bearer ${localStorage.getItem(STORAGE_TOKEN) || ''}`);
  return headers;
};

export { prepareHeaders };
