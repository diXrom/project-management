import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import jwt_decode from 'jwt-decode';

import { IAuth } from 'shared/api/lib/types';
import { useSignInMutation } from 'shared/api/model/authSlice';
import { useGetUserMutation } from 'shared/api/model/usersSlice';
import { setUser } from 'shared/store/model/authSlice';
import { useAppDispatch } from 'shared/store/model/hooks';
import { setToken } from 'shared/common/utils';

const useLogin = () => {
  const dispatch = useAppDispatch();
  const [getUser] = useGetUserMutation();
  const [signIn] = useSignInMutation();
  const [error, setErrorMessage] = useState('');
  const { t } = useTranslation();
  const { register, handleSubmit, setError, formState } = useForm<IAuth>({ mode: 'onSubmit' });
  const { errors, isSubmitting: isLoad } = formState;

  const onSubmit: SubmitHandler<IAuth> = async (valuesSignIn) => {
    try {
      const { token } = await signIn(valuesSignIn).unwrap();
      setToken(token);
      const { id } = jwt_decode<{ id: string }>(token);
      const user = await getUser({ userId: id }).unwrap();
      dispatch(setUser(user));
    } catch (e) {
      setErrorMessage(`${t('failedToLogin')}`);
    }
  };

  return { t, register, handleSubmit, onSubmit, errors, error, isLoad, setError };
};

export default useLogin;
