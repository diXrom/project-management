import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'shared/components/Modal';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import { useGetTasksSetIdQuery, useUpdateTaskMutation } from 'shared/api/model/tasksSlice';
import { FaSave, FaTrashAlt } from 'react-icons/fa';
import { ITask } from 'shared/api/lib/types';
import { useGetUsersQuery } from 'shared/api/model/usersSlice';
import { useGetBoardQuery } from 'shared/api/model/boardsSlice';

// ==========TODO: REFACTOR==========

const TaskModal: React.FC<{
  updateRef: React.MutableRefObject<boolean>;
  isOpen: boolean;
  hideModal: () => void;
  task: ITask;
  boardId: string;
  columnId: string;
  openDelTaskModal: () => void;
}> = ({ isOpen, hideModal, boardId, columnId, task, openDelTaskModal, updateRef }) => {
  const { t } = useTranslation();
  const { title, _id: taskId, description } = task;
  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isEditDescription, setIsEditDescription] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [checkedUsers, setCheckedUsers] = useState<string[]>([...task.users]);
  const { data: tasks = [] } = useGetTasksSetIdQuery({ boardId: boardId! });
  const currentTask = tasks.find((task) => task._id === taskId);

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [updateTask] = useUpdateTaskMutation();
  const { data: users } = useGetUsersQuery();
  const { data: boardInfo } = useGetBoardQuery({ boardId: boardId! });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.select();
      inputRef.current.value = localTitle || '';
    }
  }, [isEditTitle, localTitle]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current?.select();
      textareaRef.current.value = localDescription || '';
    }
  }, [isEditDescription, localDescription]);
  useEffect(() => handleUpdateUsers(), [checkedUsers]);
  const handleApplyTitle = () => {
    updateRef.current = true;
    if (inputRef.current && inputRef.current?.value.length < 1) {
      setErrorTitle(true);
      return;
    }
    if (inputRef.current && inputRef.current?.value !== localTitle) {
      setLocalTitle(inputRef.current?.value);
      updateTask({
        boardId: boardId,
        _id: taskId,
        columnId: columnId,
        title: inputRef.current?.value,
        description: task.description,
        userId: task.userId,
        users: task.users,
        order: currentTask?.order || task.order,
      });
    }
    setIsEditTitle(false);
    setErrorTitle(false);
  };

  const handleApplyDescription = () => {
    updateRef.current = true;
    if (textareaRef.current && textareaRef.current?.value.length < 1) {
      setErrorDescription(true);
      return;
    }
    if (textareaRef.current && textareaRef.current?.value !== localDescription) {
      setLocalDescription(textareaRef.current?.value);
      updateTask({
        boardId: boardId,
        _id: taskId,
        columnId: columnId,
        title: task.title,
        description: textareaRef.current.value,
        userId: task.userId,
        users: task.users,
        order: currentTask?.order || task.order,
      });
    }
    setIsEditDescription(false);
    setErrorDescription(false);
  };

  const handleUpdateUsers = () => {
    updateRef.current = true;
    updateTask({
      boardId: boardId,
      _id: taskId,
      columnId: columnId,
      title: task.title,
      description: task.description,
      userId: task.userId,
      users: checkedUsers,
      order: currentTask?.order || task.order,
    });
  };

  const handleDeleteClick = () => {
    hideModal();
    openDelTaskModal();
  };

  const onCloseClick = () => {
    hideModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} closeModal={onCloseClick}>
        <div className="flex flex-col">
          <div className="mb-4">
            <h3
              className={clsx(
                'text-slate-800 text-lg font-bold p-1 rounded-lg cursor-pointer w-full overflow-hidden',
                isEditTitle && 'hidden'
              )}
              onClick={() => {
                setIsEditTitle(true);
              }}
            >
              {localTitle}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleApplyTitle();
              }}
            >
              <input
                className={clsx(
                  'bg-slate-100 text-lg font-bold p-1 px-3 rounded-lg w-full outline-none',
                  !isEditTitle && 'hidden'
                )}
                ref={inputRef}
                autoComplete="off"
                onBlur={() => {
                  handleApplyTitle();
                }}
              ></input>
              {errorTitle && <p className="text-xs text-red-500 ">{t('titleLength')}</p>}
            </form>
          </div>
          <div className="mb-4">
            <div
              className={clsx(
                'bg-slate-100 text-slate-700 font-light p-1 px-3 rounded-lg cursor-pointer w-full overflow-y-auto h-40 custom-scroll',
                isEditDescription && 'hidden'
              )}
              onClick={() => {
                setIsEditDescription(true);
              }}
            >
              {localDescription}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleApplyDescription();
              }}
            >
              <div className={clsx('flex', !isEditDescription && 'hidden')}>
                <textarea
                  className="w-full h-40 p-1 px-3 font-light rounded-lg outline-none bg-slate-100"
                  ref={textareaRef}
                  autoComplete="off"
                  onBlur={() => {
                    handleApplyDescription();
                  }}
                ></textarea>
                {errorDescription && <p className="text-xs text-red-500 ">{t('titleLength')}</p>}
              </div>
            </form>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            {boardInfo?.users.map((item, index) => {
              return (
                <div key={item} className="flex items-center">
                  <input
                    className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    value={item}
                    checked={checkedUsers.includes(item)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCheckedUsers([...checkedUsers, item]);
                      } else {
                        setCheckedUsers(checkedUsers.filter((user) => user !== item));
                      }
                    }}
                  />
                  <label
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    htmlFor={`custom-checkbox-${index}`}
                  >
                    {users?.find((user) => user._id === item)?.name}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2 ml-auto">
            <Button
              className="items-center gap-1 !border !border-white flex self-end"
              onClick={handleDeleteClick}
            >
              <FaTrashAlt className="w-4 h-4" />
              {t('delete')}
            </Button>
            <Button
              className="items-center gap-1 !border !border-white flex self-end"
              onClick={onCloseClick}
            >
              <FaSave className="w-4 h-4" />
              {t('Ok')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TaskModal;
