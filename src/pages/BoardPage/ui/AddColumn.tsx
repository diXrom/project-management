import clsx from 'clsx';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const AddColumn = () => {
  return (
    <div
      className={clsx(
        'w-80 shrink-0 bg-blue-100 hover:bg-blue-200 transition duration-300 text-blue-600 ',
        'h-12 px-3 rounded-lg flex items-center justify-center cursor-pointer font-medium'
      )}
    >
      <FaPlus className="mr-1 text-sm" />
      Add new column
    </div>
  );
};

export default AddColumn;
