import React from 'react';
import clsx from 'clsx';
import { FaAngleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from 'shared/common/constants';
import { useTranslation } from 'react-i18next';

const Panel: React.FC<{ openModalNewCol: () => void }> = ({ openModalNewCol }) => {
  const { t } = useTranslation();

  return (
    <div className="flex">
      <Link
        to={ROUTE_PATH.BOARDS}
        className={clsx(
          'bg-blue-200 hover:bg-blue-300 transition duration-300 text-blue-600 font-semibold',
          'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer'
        )}
      >
        <FaAngleLeft />
      </Link>
      <div
        onClick={() => openModalNewCol()}
        className={clsx(
          'bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold',
          'h-10 px-6 rounded-lg flex items-center justify-center cursor-pointer sm:w-auto ml-2'
        )}
      >
        {t('newColumn')}
      </div>
    </div>
  );
};

export default Panel;
