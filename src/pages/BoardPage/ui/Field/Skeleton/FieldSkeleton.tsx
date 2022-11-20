import ColumnSkeleton from './ColumnSkeleton';

const COLS_HEIGHTS = [5, 9, 4];

const FieldSkeleton = () => {
  return (
    <div className="custom-scroll flex gap-4 overflow-x-auto w-full pb-5 pt-1 h-[calc(100vh-260px)]">
      {/* 260px = header+footer height */}
      {COLS_HEIGHTS.map((height) => (
        <ColumnSkeleton key={height} height={height} />
      ))}
    </div>
  );
};

export default FieldSkeleton;
