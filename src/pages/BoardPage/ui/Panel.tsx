import React from 'react';
import clsx from 'clsx';
import { FaAngleLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { ROUTE_PATH } from 'shared/common/constants';
import { useAddColumnMutation, useGetColumnsQuery } from 'shared/api/model/columnsSlice';
import { useGetBoardQuery } from 'shared/api/model/boardsSlice';
import { IBoardId } from 'shared/api/lib/types';

const Panel = () => {
  const [addColumn] = useAddColumnMutation();

  const { boardId } = useParams();

  // console.log(board);
  const handleNewColumnClick = async () => {
    if (boardId) {
      const a = await addColumn({ title: 'test', order: 0, boardId });
      console.log(a);
      // const v = await getBoard();
    }
  };

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
        onClick={() => handleNewColumnClick()}
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
