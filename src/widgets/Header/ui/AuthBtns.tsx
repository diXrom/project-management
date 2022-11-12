import { Fragment, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSignInAlt } from 'react-icons/fa';
import { BiSpreadsheet } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { ROUTE_PATH } from 'shared/common/constants';
import Button from 'shared/components/Button';

const AuthBtns = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Link className="text-white" to={ROUTE_PATH.LOGIN}>
        <Button className="flex items-center gap-1 !border !border-white">
          <FaSignInAlt className="w-4 h-4" /> <div>{t('signIn')}</div>
        </Button>
      </Link>
      <Link className="hidden text-white sm:flex" to={ROUTE_PATH.REGISTRATION}>
        <Button className="flex items-center gap-1 !border !border-white">
          <BiSpreadsheet className="w-4 h-4" /> {t('signUp')}
        </Button>
      </Link>
    </Fragment>
  );
};

export default memo(AuthBtns);
