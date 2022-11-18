import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Task from './Task';
import { FaBan, FaPlus } from 'react-icons/fa';
import { useDeleteColumnMutation } from 'shared/api/model/columnsSlice';

const Column: React.FC<{ title: string; boardId: string; columnId: string }> = ({
  title,
  boardId,
  columnId,
}) => {
  const [localTitle, setLocalTitle] = useState(title);
  const [isEditTitle, setIsEditTitle] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const localTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditTitle) inputRef.current?.select();
  }, [isEditTitle]);

  useEffect(() => {
    const endEditTitle = (e: MouseEvent) => {
      if (e.target !== inputRef.current && e.target !== localTitleRef.current) {
        //sendFetch
        setIsEditTitle(false);
      }
    };

    document.addEventListener('click', endEditTitle);

    return () => {
      document.removeEventListener('click', endEditTitle);
    };
  }, []);

  const [deleteColumn] = useDeleteColumnMutation();

  const handleDeleteClick = () => {
    deleteColumn({ boardId: boardId, columnId: columnId });
  };

  return (
    <div className="w-80 bg-slate-50 rounded-lg shadow-lg shadow-slate-300 p-2 pr-1.5 shrink-0 max-h-full h-fit flex flex-col">
      <div className="custom-scroll overflow-x-hidden overflow-y-auto p-1 pr-1.5">
        <div className="mb-2 flex">
          <div
            className={clsx(
              'text-slate-800 font-bold p-1 px-3 rounded-lg cursor-pointer w-full',
              isEditTitle && 'hidden'
            )}
            ref={localTitleRef}
            onClick={() => {
              setIsEditTitle(true);
            }}
          >
            {localTitle}
          </div>

          <input
            className={clsx(
              'bg-slate-200 font-bold p-1 px-3 rounded-lg w-full outline-none',
              !isEditTitle && 'hidden'
            )}
            value={localTitle}
            ref={inputRef}
            autoComplete="off"
            onChange={(e) => {
              setLocalTitle(e.target.value);
            }}
          ></input>

          <div
            className="bg-red-100 font-bold p-2 ml-2 rounded-lg text-red-500 cursor-pointer"
            onClick={() => handleDeleteClick()}
          >
            <FaBan />
          </div>
        </div>

        {Array(5)
          .fill(null)
          .map((elem, idx) => (
            <Task key={idx} />
          ))}

        <div
          className={clsx(
            'bg-blue-100 hover:bg-blue-200 transition duration-300 text-blue-600 ',
            'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer font-medium'
          )}
        >
          <FaPlus className="mr-1 text-sm" />
          Add new task
        </div>
      </div>
    </div>
  );
};

export default Column;
