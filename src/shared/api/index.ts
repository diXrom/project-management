import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { prepareHeaders } from './lib/util';
import { API_URL } from './model/constants';

export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL, prepareHeaders }),
  tagTypes: [],
  endpoints: (build) => ({
    getPost: build.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: id, method: 'GET' }),
    }),
  }),
});

export const {} = postAPI;
