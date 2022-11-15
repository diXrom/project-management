import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { setToken } from 'shared/common/utils';
import { setUser } from 'shared/store/model/authSlice';
import { useAppDispatch, useAppSelector } from 'shared/store/model/hooks';
import { getUser } from 'shared/store/model/selectors';

const useUserPanel = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const handleLogout = () => {
    setToken('');
    dispatch(setUser(null));
  };

  return { t, user, isOpen, openModal, closeModal, handleLogout };
};

export default useUserPanel;
