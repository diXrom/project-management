import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import useGetInputs from 'pages/Registration/model/useGetInputs';
import { useAppDispatch, useAppSelector } from 'shared/store/model/hooks';
import { IAuth } from 'shared/api/lib/types';
import { setUser } from 'shared/store/model/authSlice';
import { getUser } from 'shared/store/model/selectors';
import { useUpdateUserMutation } from 'shared/api/model/usersSlice';

const useEditProfile = () => {
  const mode = 'onSubmit';
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [updateUser] = useUpdateUserMutation();

  const [error, setErrorMessage] = useState('');
  const { t } = useTranslation();
  const { register, handleSubmit, setError, formState, setValue } = useForm<IAuth>({ mode });

  const { errors, isSubmitting: isLoad } = formState;
  const onSubmit: SubmitHandler<IAuth> = async (valuesUpdate) => {
    try {
      const newUser = await updateUser({ ...valuesUpdate, userId: user?._id || '' }).unwrap();
      dispatch(setUser(newUser));
    } catch (e) {
      setErrorMessage(`${t('failedToEdit')}`);
    }
  };

  useEffect(() => {
    if (!user) return;
    setValue('name', user.name);
    setValue('login', user.login);
  }, [user, setValue]);

  return { register, handleSubmit, onSubmit, errors, error, isLoad, setError, t };
};

export default useEditProfile;
