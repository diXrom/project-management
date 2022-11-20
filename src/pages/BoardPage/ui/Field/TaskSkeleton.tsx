import React from 'react';

const TaskSkeleton: React.FC<{ width: string }> = ({ width }) => {
  return (
    <div className="p-2 bg-slate-100 rounded-xl mb-2 font-medium text-slate-800">
      <div
        className={`bg-slate-200 h-6 rounded-md w-${width}`}
        style={{ width: `${width}px` }}
      ></div>
    </div>
  );
};

export default TaskSkeleton;
