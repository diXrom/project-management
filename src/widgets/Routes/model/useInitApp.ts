import jwt_decode from 'jwt-decode';

import i18n from 'shared/locale/i18n';
import { setUser } from 'shared/store/model/authSlice';
import { useGetUserMutation } from 'shared/api/model/usersSlice';
import { useAppDispatch, useAppSelector } from 'shared/store/model/hooks';
import { setToken, getToken } from 'shared/common/utils';
import { useLayoutEffect } from 'react';
import { getLang } from 'shared/store/model/selectors';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from 'shared/common/constants';

const useInitApp = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector(getLang);
  const [getUser, { isLoading }] = useGetUserMutation();
  const token = getToken();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const { id } = jwt_decode<{ id: string }>(token as string);
      const user = await getUser({ userId: id }).unwrap();
      dispatch(setUser(user));
    } catch (error) {
      setToken('');
      navigate(ROUTE_PATH.INDEX);
    }
  };

  useLayoutEffect(() => {
    i18n.changeLanguage(lang);
    if (token) fetchUser();
  }, []);
  return isLoading;
};

export { useInitApp };
