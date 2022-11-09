import { managerAPI } from 'shared/api';
import { IAuth, IUserId, IUser } from '../lib/types';
import { API_PATH, TAGS } from './constants';

export const extendedApiSlice = managerAPI.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<IUser[], void>({
      query: () => API_PATH.USERS,
      providesTags: (result) =>
        result
          ? [TAGS.USERS, ...result.map(({ _id }) => ({ type: TAGS.USERS, id: _id }))]
          : [TAGS.USERS],
    }),
    getUser: build.query<IUser, IUserId>({
      query: ({ userId }) => `${API_PATH.USERS}/${userId}`,
      providesTags: (_, __, arg) => [{ type: TAGS.USERS, id: arg.userId }],
    }),
    updateUser: build.mutation<IUser, IUserId & IAuth>({
      query: ({ userId, ...body }) => ({ url: `${API_PATH.USERS}/${userId}`, method: 'PUT', body }),
      invalidatesTags: (_, __, arg) => [{ type: TAGS.USERS, id: arg.userId }],
    }),
    deleteUser: build.mutation<IUser, IUserId>({
      query: ({ userId }) => ({ url: `${API_PATH.USERS}/${userId}`, method: 'DELETE' }),
      invalidatesTags: (_, __, arg) => [{ type: TAGS.USERS, id: arg.userId }],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } =
  extendedApiSlice;
