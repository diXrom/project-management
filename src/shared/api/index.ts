import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { prepareHeaders } from './lib/util';
import { API_URL, TAGS } from './model/constants';

export const managerAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL, prepareHeaders }),
  tagTypes: [TAGS.USERS, TAGS.BOARDS, TAGS.COLUMNS, TAGS.TASKS, TAGS.FILE, TAGS.POINTS],
  endpoints: () => ({}),
});
