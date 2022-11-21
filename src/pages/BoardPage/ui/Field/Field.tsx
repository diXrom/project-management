import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { IColumn, IColumnId } from 'shared/api/lib/types';
import Column from './Column';

const Field: React.FC<{
  columns: IColumn[] | undefined;
  openModalNewCol: () => void;
  openModalDelCol: ({ columnId }: IColumnId) => void;
}> = ({ columns, openModalNewCol, openModalDelCol }) => {
  const { t } = useTranslation();
  const { boardId } = useParams();

  return (
    <div className="custom-scroll flex gap-4 overflow-x-auto w-full pb-5 pt-1 h-[calc(100vh-260px)]">
      {/* 260px = header+footer height */}
      {!!columns &&
        !!boardId &&
        columns.map((column) => (
          <Column
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
    </div>
  );
};

export default Field;
