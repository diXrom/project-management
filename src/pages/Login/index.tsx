import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

import { ROUTE_PATH } from 'shared/common/constants';
import { fade, motionVariants } from 'shared/common/styles';
import Button from 'shared/components/Button';
import Card from 'shared/components/Card';
import { useAppSelector } from 'shared/store/model/hooks';
import { getUser } from 'shared/store/model/selectors';
import useLogin from './model/useLogin';
import InputAuth from 'shared/components/InputAuth';
import { authBtnStyle } from 'pages/Registration/lib/styles';
import useGetInputs from 'pages/Registration/model/useGetInputs';

const Login = () => {
  const inputs = useGetInputs().slice(1);
  const { t, register, handleSubmit, onSubmit, errors, error, isLoad, setError } = useLogin();

  if (useAppSelector(getUser)) return <Navigate to={ROUTE_PATH.BOARDS} />;

  return (
    <motion.div variants={fade} {...motionVariants} className="mt-10">
      <Card className="flex justify-center max-w-xs p-3 mx-auto sm:p-6">
        <form className="space-y-3 max-w-max sm:w-60" onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-2 text-2xl font-semibold text-center">{t('signIn')}</div>
          {inputs.map((input) => (
            <InputAuth
              key={input.placeholder}
              placeholder={input.placeholder}
              type={input.type}
              register={register}
              name={input.name}
              error={errors}
              setError={setError}
              schema={input.shema}
            >
              {input.icon}
            </InputAuth>
          ))}
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
          <Button disabled={isLoad} type="submit" className={authBtnStyle}>
            {isLoad && <FaSpinner className="w-5 h-5 animate-spin" />}
            {t('continue')}
          </Button>
          <div className="text-center text-gray-500">
            {t('haventAcc')}
            <Link
              to={ROUTE_PATH.REGISTRATION}
              className="block text-gray-800 sm:inline sm:ml-1 hover:underline"
            >
              {t('signUp')}
            </Link>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default Login;
