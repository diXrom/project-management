import { managerAPI } from 'shared/api';
import { IAuth, IUser, IToken } from '../lib/types';
import { API_PATH } from './constants';

export const extendedApiSlice = managerAPI.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<IUser, IAuth>({
      query: (body) => ({ url: API_PATH.REGISTER, method: 'POST', body }),
    }),
    signIn: build.mutation<IToken, Partial<IAuth>>({
      query: (body) => ({ url: API_PATH.LOGIN, method: 'POST', body }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = extendedApiSlice;
