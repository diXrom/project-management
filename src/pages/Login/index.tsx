import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { useSignInMutation } from 'shared/api/model/authSlice';
import { useGetUserMutation } from 'shared/api/model/usersSlice';
import { ROUTE_PATH, STORAGE_TOKEN } from 'shared/common/constants';
import { fade, motionVariants } from 'shared/common/styles';
import { IUser } from 'shared/api/lib/types';
import Button from 'shared/components/Button';
import { useAppDispatch } from 'shared/store/model/hooks';
import { setUser } from 'shared/store/model/authSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const [signIn] = useSignInMutation();
  const [getUser] = useGetUserMutation();
  const signInHandle = async () => {
    const auth = { login: 'dixrom', password: 'dixrom' };
    const { token } = await signIn(auth).unwrap();
    if (!token) return console.log('Не удалось войти');
    localStorage.setItem(STORAGE_TOKEN, token);
    const { _id: id } = jwt_decode<Pick<IUser, '_id'>>(token);
    const user = await getUser({ userId: id }).unwrap();
    if (!user.name) return console.log('Не удалось получить пользователя');
    dispatch(setUser(user));
  };
  return (
    <motion.div variants={fade} {...motionVariants}>
      <div className="flex gap-2">
        <Button outline onClick={signInHandle}>
          sign In
        </Button>
        <Link to={ROUTE_PATH.REGISTRATION}>
          <Button>sign Up</Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Login;
