import { motion } from 'framer-motion';
import { authBtnStyle } from 'pages/Registration/lib/styles';
import { FaSpinner } from 'react-icons/fa';

import { fade, motionVariants } from 'shared/common/styles';
import Button from 'shared/components/Button';
import Card from 'shared/components/Card';
import { errorMessageStyle } from 'shared/components/Input/lib/styles';
import InputAuth from 'shared/components/InputAuth';
import Modal from 'shared/components/Modal';
import useDeleteProfile from './model/useDeleteProfile';
import useEditProfile from './model/useEditProfile';

const EditProfile = () => {
  const { t, register, handleSubmit, onSubmit, errors, error, isLoad, setError } = useEditProfile();
  const { open, openModal, closeModal, errDel, handelDelete, inputs } = useDeleteProfile();

  return (
    <motion.div variants={fade} {...motionVariants} className="mt-10">
      <Card className="flex justify-center max-w-xs p-3 mx-auto sm:p-6">
        <form className="space-y-3 max-w-max sm:w-60" onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-2 text-2xl font-semibold text-center">{t('editProfile')}</div>
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
          <Button onClick={openModal} className={authBtnStyle}>
            {t('deleteProfile')}
          </Button>
          <Modal isOpen={open} closeModal={closeModal} className="max-w-xs">
            <h2 className="text-lg font-semibold text-center md:text-xl">{t('areYouSure')}</h2>
            {Boolean(errDel) && <p className={errorMessageStyle}>{errDel}</p>}
            <div className="flex justify-center gap-2 mt-3">
              <Button onClick={closeModal}>{t('cancel')}</Button>
              <Button onClick={handelDelete}>{t('continue')}</Button>
            </div>
          </Modal>
        </form>
      </Card>
    </motion.div>
  );
};

export default EditProfile;
