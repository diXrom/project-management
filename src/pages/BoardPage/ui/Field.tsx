import clsx from 'clsx';
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useGetColumnsQuery } from 'shared/api/model/columnsSlice';
import AddColumn from './AddColumn';
import Column from './Column';

const Field = () => {
  const { boardId } = useParams();
  const { isLoading, isError, data } = useGetColumnsQuery({ boardId: boardId as string });

  console.log(data);

  return (
    <div className="custom-scroll flex gap-4 overflow-x-auto w-full pb-5 pt-1 h-[calc(100vh-260px)]">
      {/* 260px = header+footer height */}
      {!!data &&
        boardId &&
        data.map((column, idx) => (
          <Column key={column._id} boardId={boardId} columnId={column._id} title={column.title} />
        ))}

      <AddColumn />
    </div>
  );
};

export default Field;
