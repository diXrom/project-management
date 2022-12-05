import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IAuth } from 'shared/api/lib/types';
import { useSignInMutation, useSignUpMutation } from 'shared/api/model/authSlice';
import { setToken } from 'shared/common/utils';
import { setUser } from 'shared/store/model/authSlice';
import { useAppDispatch } from 'shared/store/model/hooks';

const useRegistration = () => {
  const dispatch = useAppDispatch();
  const [signIn] = useSignInMutation();
  const [signUp] = useSignUpMutation();
  const [error, setErrorMessage] = useState('');
  const { t } = useTranslation();
  const { register, handleSubmit, setError, formState } = useForm<IAuth>({ mode: 'onSubmit' });
  const { errors, isSubmitting: isLoad } = formState;

  const onSubmit: SubmitHandler<IAuth> = async (valuesSignUp) => {
    if (!valuesSignUp) return;
    const { name, ...valuesSignIn } = valuesSignUp;
    try {
      const user = await signUp(valuesSignUp).unwrap();
      const { token } = await signIn(valuesSignIn).unwrap();
      dispatch(setUser(user));
      setToken(token);
    } catch (e) {
      setErrorMessage(`${t('failedToRegister')}`);
    }
  };
  return { t, register, errors, error, isLoad, setError, handleSubmit, onSubmit };
};

export default useRegistration;
