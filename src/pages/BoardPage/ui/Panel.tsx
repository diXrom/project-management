import React from 'react';
import clsx from 'clsx';
import { FaAngleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from 'shared/common/constants';

const Panel = () => {
  return (
    <div className="flex mb-5">
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
        className={clsx(
          'bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold',
          'h-10 px-6 rounded-lg flex items-center justify-center cursor-pointer sm:w-auto ml-2'
        )}
      >
        New Column
      </div>
    </div>
  );
};

export default Panel;
