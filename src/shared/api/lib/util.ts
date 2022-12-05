import { getToken } from 'shared/common/utils';

const prepareHeaders = (headers: Headers) => {
  headers.set('Accept', 'application/json');
  headers.set('Authorization', `Bearer ${getToken() || ''}`);
  return headers;
};

export { prepareHeaders };
