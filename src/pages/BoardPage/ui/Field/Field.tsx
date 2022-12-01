import clsx from 'clsx';
import { Reorder } from 'framer-motion';
import { MutableRefObject, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { IColumn, IColumnId } from 'shared/api/lib/types';
import { useUpdateColumnsSetMutation } from 'shared/api/model/columnsSlice';
import { useGetTasksSetIdQuery } from 'shared/api/model/tasksSlice';
import Column from './Column';

// ==========TODO: REFACTOR==========

const Field: React.FC<{
  refCol: MutableRefObject<boolean>;
  columns: IColumn[];
  openModalNewCol: () => void;
  openModalDelCol: ({ columnId }: IColumnId) => void;
}> = ({ columns, openModalNewCol, openModalDelCol, refCol }) => {
  const { t } = useTranslation();
  const [updateColumn] = useUpdateColumnsSetMutation();

  const updateCol = () => {
    refCol.current = false;
    updateColumn(col.map(({ _id }, idx) => ({ _id, order: idx })));
  };
  const boardId = useParams().boardId as string;
  const [col, setCol] = useState(columns);
  const { tasks } = useGetTasksSetIdQuery(
    { boardId },
    {
      selectFromResult: ({ data }) => ({
        tasks: data ? [...data].sort((a, b) => a.order - b.order) : [],
      }),
    }
  );

  useEffect(() => {
    if (refCol.current) {
      setCol(columns);
    }
  }, [columns]);

  return (
    <Reorder.Group
      axis="x"
      values={col}
      onReorder={setCol}
      className="custom-scroll flex gap-4 overflow-x-auto w-full pb-5 pt-5 h-[calc(100vh-260px)] select-none"
    >
      {tasks.length &&
        col.map((column) => (
          <Column
            tasks={tasks.filter((task) => task.columnId === column._id)}
            column={column}
            updateCol={updateCol}
            key={column._id}
            boardId={boardId}
            columnId={column._id}
            title={column.title}
            order={column.order}
            openModalDelCol={openModalDelCol}
          />
        ))}
      <div
        onClick={openModalNewCol}
        className={clsx(
          'w-80 shrink-0 bg-blue-100 hover:bg-blue-200 transition duration-300 text-blue-600 ',
          'h-12 px-3 rounded-lg flex items-center justify-center cursor-pointer font-medium'
        )}
      >
        <FaPlus className="mr-1 text-sm" />
        {t('newColumn')}
      </div>
    </Reorder.Group>
  );
};

export default Field;
