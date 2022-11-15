import { useState } from 'react';
import { useDeleteUserMutation } from 'shared/api/model/usersSlice';
import { useAppDispatch, useAppSelector } from 'shared/store/model/hooks';
import { setUser } from 'shared/store/model/authSlice';
import { getUser } from 'shared/store/model/selectors';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from 'shared/common/constants';
import { setToken } from 'shared/common/utils';
import useGetInputs from 'pages/Registration/model/useGetInputs';

const useDeleteProfile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [deleteUser] = useDeleteUserMutation();
  const [open, setOpen] = useState(false);
  const [errDel, setErrDelMessage] = useState('');
  const inputs = useGetInputs().map((item, idx) => {
    if (idx === 2) item.placeholder = t('newPassword');
    return item;
  });

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const handelDelete = async () => {
    try {
      const newUser = await deleteUser({ userId: user?._id || '' }).unwrap();
      dispatch(setUser(null));
      setToken('');
      navigate(ROUTE_PATH.INDEX);
    } catch (e) {
      setErrDelMessage(`${t('failedToDelete')}`);
    }
  };

  return { open, openModal, closeModal, errDel, handelDelete, inputs };
};

export default useDeleteProfile;
