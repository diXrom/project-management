import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Task from './Task';
import { FaBan, FaPlus } from 'react-icons/fa';
import { useUpdateColumnMutation } from 'shared/api/model/columnsSlice';
import { IColumnId } from 'shared/api/lib/types';
import { useTranslation } from 'react-i18next';

const Column: React.FC<{
  title: string;
  boardId: string;
  columnId: string;
  order: number;
  openModalDelCol: ({ columnId }: IColumnId) => void;
}> = ({ title, boardId, columnId, order, openModalDelCol }) => {
  const { t } = useTranslation();
  const [localTitle, setLocalTitle] = useState(title);
  const [isEditTitle, setIsEditTitle] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const localTitleRef = useRef<HTMLDivElement>(null);

  const [applyColumnTitle] = useUpdateColumnMutation();

  useEffect(() => {
    if (isEditTitle) inputRef.current?.select();
  }, [isEditTitle]);

  useEffect(() => {
    if (isEditTitle) {
      const endEditTitle = (e: MouseEvent) => {
        if (isEditTitle && e.target !== inputRef.current && e.target !== localTitleRef.current) {
          applyColumnTitle({ boardId: boardId, _id: columnId, title: localTitle, order: order });
          setIsEditTitle(false);
        }
      };
      document.addEventListener('click', endEditTitle);
      return () => {
        document.removeEventListener('click', endEditTitle);
      };
    }
  }, [applyColumnTitle, boardId, columnId, isEditTitle, localTitle, order]);

  const handleDeleteClick = () => {
    openModalDelCol({ columnId });
  };

  return (
    <div className="w-80 bg-slate-50 rounded-lg shadow-lg shadow-slate-300 p-2 pr-1.5 shrink-0 max-h-full h-fit flex flex-col">
      <div className="custom-scroll overflow-x-hidden overflow-y-auto p-1 pr-1.5">
        <div className="mb-2 flex">
          <div
            className={clsx(
              'text-slate-800 font-bold p-1 px-3 rounded-lg cursor-pointer w-full overflow-hidden',
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
            className="bg-red-100  transition-all duration-300 hover:bg-red-200 font-bold p-2 ml-2 rounded-lg text-red-500 cursor-pointer"
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

          {t('newTask')}
        </div>
      </div>
    </div>
  );
};

export default Column;
