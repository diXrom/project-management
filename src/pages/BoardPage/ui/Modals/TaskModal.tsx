import clsx from 'clsx';
import Input from '../../../../shared/components/Input';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import Modal from 'shared/components/Modal';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import { useGetTaskQuery, useUpdateTaskMutation } from 'shared/api/model/tasksSlice';
import { FaBan } from 'react-icons/fa';
import { ITask, ITaskId } from 'shared/api/lib/types';

const TaskModal: React.FC<{
  isOpen: boolean;
  hideModal: () => void;
  task: ITask;
  boardId: string;
  columnId: string;
  openDelTaskModal: () => void;
}> = ({ isOpen, hideModal, boardId, columnId, task, openDelTaskModal }) => {
  const { t } = useTranslation();
  const { title, _id: taskId, description } = task;
  const { data: taskInfo, isLoading } = useGetTaskQuery({ boardId, columnId, taskId });

  const [localTitle, setLocalTitle] = useState(title);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [updateTaskTitle] = useUpdateTaskMutation();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.select();
      inputRef.current.value = localTitle || '';
    }
  }, [isEditTitle, localTitle]);

  const handleApplyTitle = () => {
    if (taskInfo && inputRef.current && inputRef.current?.value !== localTitle) {
      setLocalTitle(inputRef.current?.value);
      updateTaskTitle({
        boardId: boardId,
        _id: taskId,
        columnId: columnId,
        title: inputRef.current?.value,
        description: taskInfo?.description,
        userId: taskInfo?.userId,
        users: taskInfo?.users,
        order: taskInfo.order,
      });
    }
    setIsEditTitle(false);
  };

  const handleDeleteClick = () => {
    openDelTaskModal();
  };

  const onCloseClick = () => {
    hideModal();
  };

  return (
    <Modal isOpen={isOpen} closeModal={() => onCloseClick()}>
      <div className="mb-2 flex">
        <div
          className={clsx(
            'text-slate-800 font-bold p-1 px-3 rounded-lg cursor-pointer w-full overflow-hidden',
            isEditTitle && 'hidden'
          )}
          onClick={() => {
            setIsEditTitle(true);
          }}
        >
          {localTitle}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleApplyTitle();
          }}
        >
          <input
            className={clsx(
              'bg-slate-200 font-bold p-1 px-3 rounded-lg w-full outline-none',
              !isEditTitle && 'hidden'
            )}
            ref={inputRef}
            autoComplete="off"
            onBlur={() => {
              handleApplyTitle();
            }}
          ></input>
        </form>
        <div
          className="bg-red-100  transition-all duration-300 hover:bg-red-200 font-bold p-2 ml-2 rounded-lg text-red-500 cursor-pointer"
          onClick={() => handleDeleteClick()}
        >
          <FaBan />
        </div>
      </div>
      {/* <div className="font-semibold text-slate-800 mb-2">{t('enterTaskTitle')}</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          error={errorText}
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <textarea onChange={(e) => setNewTaskDescription(e.target.value)} />
        <p>{t('invite')}</p>
        {boardUsers?.map((item, index) => {
          return (
            <div key={item._id} className="flex items-center">
              <input
                className="w-4 h-4 text-gray-600 bg-gray-100 rounded border-gray-300 focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
                id={`custom-checkbox-${index}`}
                value={item._id}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCheckedUsers([...checkedUsers, item._id]);
                  } else {
                    setCheckedUsers(checkedUsers.filter((user) => user !== item._id));
                  }
                }}
              />
              <label
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                htmlFor={`custom-checkbox-${index}`}
              >
                {item.name}
              </label>
            </div>
          );
        })}
        <div className="flex gap-3 mt-2">
          <div
            onClick={() => onCloseClick()}
            className={clsx(
              'bg-blue-200 hover:bg-blue-300 transition duration-300 text-blue-600 font-semibold',
              'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer w-full'
            )}
          >
            {t('cancel')}
          </div>
          <Button
            type="submit"
            className={clsx(
              'bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold',
              'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer w-full'
            )}
          >
            {t('confirm')}
          </Button>
        </div>
      </form> */}
    </Modal>
  );
};

export default TaskModal;
