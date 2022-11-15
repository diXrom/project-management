import { useTranslation } from 'react-i18next';
import { FaLock } from 'react-icons/fa';
import { RiUserSettingsFill, RiUserFill } from 'react-icons/ri';

const useGetInputs = () => {
  const { t } = useTranslation();
  const inputsData = [
    {
      placeholder: t('name'),
      type: 'text',
      name: 'name' as const,
      shema: {
        required: t('required'),
        minLength: { value: 4, message: `${t('minLength')}${t('4characters')}` },
      },
      icon: <RiUserFill className="absolute w-5 h-5 mx-2 text-gray-800" />,
    },
    {
      placeholder: t('login'),
      type: 'text',
      name: 'login' as const,
      shema: {
        required: t('required'),
        minLength: { value: 4, message: `${t('minLength')}${t('4characters')}` },
      },
      icon: <RiUserSettingsFill className="absolute w-5 h-5 mx-2 text-gray-800" />,
    },
    {
      placeholder: t('password'),
      type: 'password',
      name: 'password' as const,
      shema: {
        required: t('required'),
        minLength: { value: 8, message: `${t('minLength')}${t('8characters')}` },
      },
      icon: <FaLock className="absolute w-5 h-5 mx-2 text-gray-800" />,
    },
  ];
  return inputsData;
};

export default useGetInputs;
