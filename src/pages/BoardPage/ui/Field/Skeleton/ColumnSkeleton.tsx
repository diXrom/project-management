import TaskSkeleton from './TaskSkeleton';

const TASK_WIDTHS = ['150', '120', '200', '220', '180', '120', '200', '220', '180'];

const ColumnSkeleton: React.FC<{ height: number }> = ({ height }) => {
  return (
    <div className="w-80 bg-slate-50 rounded-lg shadow-lg shadow-slate-300 p-2 pr-1.5 shrink-0 max-h-full h-fit flex flex-col">
      <div className="custom-scroll overflow-x-hidden overflow-y-auto p-1 pr-1.5">
        <div className="mb-2 flex">
          <div
            className={'bg-slate-200 font-bold p-1 px-3 rounded-lg w-full overflow-hidden h-8'}
          ></div>

          <div className="bg-slate-200 p-2 ml-2 rounded-lg w-8 h-8 shrink-0"></div>
        </div>

        {Array(height)
          .fill(null)
          .map((_, idx) => {
            return <TaskSkeleton key={idx} width={TASK_WIDTHS[idx]} />;
          })}
      </div>
    </div>
  );
};

export default ColumnSkeleton;
