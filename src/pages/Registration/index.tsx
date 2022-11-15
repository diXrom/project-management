import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import { Link, Navigate } from 'react-router-dom';
import { ROUTE_PATH } from 'shared/common/constants';

import { fade, motionVariants } from 'shared/common/styles';
import Button from 'shared/components/Button';
import Card from 'shared/components/Card';
import InputAuth from 'shared/components/InputAuth';
import { useAppSelector } from 'shared/store/model/hooks';
import { getUser } from 'shared/store/model/selectors';
import { authBtnStyle } from './lib/styles';
import useGetInputs from './model/useGetInputs';
import useAuth from './model/useRegistration';

const Registration = () => {
  const inputs = useGetInputs();
  const { t, register, errors, error, isLoad, setError, handleSubmit, onSubmit } = useAuth();

  if (useAppSelector(getUser)) return <Navigate to={ROUTE_PATH.BOARDS} />;

  return (
    <motion.div variants={fade} {...motionVariants} className="mt-10">
      <Card className="flex justify-center max-w-sm p-3 mx-auto sm:p-6">
        <form className="space-y-3 max-w-max sm:w-60" onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-2 text-2xl font-semibold text-center">{t('signUp')}</div>
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
            {t('haveAcc')}
            <Link
              to={ROUTE_PATH.LOGIN}
              className="block text-gray-800 sm:inline sm:ml-1 hover:underline"
            >
              {t('signIn')}
            </Link>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default Registration;
