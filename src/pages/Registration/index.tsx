import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useSignInMutation, useSignUpMutation } from 'shared/api/model/authSlice';
import { ROUTE_PATH, STORAGE_TOKEN } from 'shared/common/constants';
import { fade, motionVariants } from 'shared/common/styles';
import Button from 'shared/components/Button';
import { setUser } from 'shared/store/model/authSlice';
import { useAppDispatch } from 'shared/store/model/hooks';

const Registration = () => {
  const dispatch = useAppDispatch();
  const [signIn] = useSignInMutation();
  const [signUp] = useSignUpMutation();

  const signUpHandle = async () => {
    const dataSignIn = { login: 'dixrom', password: 'dixrom', name: 'Dixrom' };
    const dataSignUp = { ...dataSignIn, name: 'Dixrom' };
    const user = await signUp(dataSignUp).unwrap();
    if (!user.name) return console.log('Не удалось зарегистрироваться');
    const { token } = await signIn(dataSignIn).unwrap();
    if (!token) return console.log('Не удалось войти');
    dispatch(setUser(user));
    localStorage.setItem(STORAGE_TOKEN, token);
  };

  return (
    <motion.div variants={fade} {...motionVariants}>
      <div className="flex gap-2">
        <Button outline onClick={signUpHandle}>
          sign Up
        </Button>
        <Link to={ROUTE_PATH.LOGIN}>
          <Button>sign In</Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Registration;
