import Column from './Column';

const Field = () => {
  return (
    <div className="custom-scroll flex gap-4 overflow-x-scroll w-full pb-5 pt-1 h-[calc(100vh-260px)]">
      {/* 260px = header+footer height */}
      {Array(6)
        .fill(null)
        .map((elem, idx) => (
          <Column key={idx} />
        ))}
    </div>
  );
};

export default Field;
