import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { FaBan, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useUpdateColumnMutation } from 'shared/api/model/columnsSlice';
import { IColumnId, ITask } from 'shared/api/lib/types';
import { useTranslation } from 'react-i18next';
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
} from 'shared/api/model/tasksSlice';
import Card from 'shared/components/Card';
import Button from 'shared/components/Button';
import NewTaskModal from '../Modals/NewTaskModal';
import { useAppSelector } from 'shared/store/model/hooks';
import { getUser } from 'shared/store/model/selectors';
import DelTaskModal from '../Modals/DelTaskModal';
import TaskModal from '../Modals/TaskModal';

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
  const [showDelTaskModal, setShowDelTaskModal] = useState(false);

  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [addTask, { isLoading }] = useAddTaskMutation();
  const [delTask] = useDeleteTaskMutation();

  const taskRef = useRef<ITask>();

  const user = useAppSelector(getUser);

  const inputRef = useRef<HTMLInputElement>(null);

  const [applyColumnTitle] = useUpdateColumnMutation();

  const { data: tasks } = useGetTasksQuery({ boardId: boardId, columnId: columnId });

  const createNewTask = async (title: string, description: string, users: string[]) => {
    if (user) {
      await addTask({
        title: title,
        order: tasks?.length || 0,
        boardId: boardId,
        columnId: columnId,
        users: users,
        userId: user._id,
        description: description,
      });
      setShowNewTaskModal(false);
    }
  };

  const deleteTask = async () => {
    if (taskRef.current?._id) {
      await delTask({ boardId: boardId, columnId: columnId, taskId: taskRef.current._id });
      setShowDelTaskModal(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.select();
      inputRef.current.value = localTitle;
    }
  }, [isEditTitle, localTitle]);

  const handleDeleteClick = () => {
    openModalDelCol({ columnId });
  };

  const handleApplyTitle = () => {
    if (inputRef.current && inputRef.current?.value !== localTitle) {
      setLocalTitle(inputRef.current?.value);
      applyColumnTitle({
        boardId: boardId,
        _id: columnId,
        title: inputRef.current?.value,
        order: order,
      });
    }
    setIsEditTitle(false);
  };

  return (
    <div className="w-80 bg-slate-50 rounded-lg shadow-lg shadow-slate-300 p-2 pr-1.5 shrink-0 max-h-full h-fit flex flex-col hover:shadow-md">
      <div className="custom-scroll overflow-x-hidden overflow-y-auto p-1 pr-1.5">
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

        {tasks?.map((task) => (
          <Card
            className="p-2 bg-slate-100 rounded-xl mb-2 font-medium text-slate-800 flex justify-between items-center	hover:shadow-lg"
            key={task._id}
            onClick={() => {
              taskRef.current = task;

              setShowTaskModal(true);
            }}
          >
            <h4>{task.title}</h4>
            <Button
              className="items-center gap-1 !border !border-white flex"
              onClick={(event) => {
                event.stopPropagation();
                taskRef.current = task;
                setShowDelTaskModal(true);
              }}
            >
              <FaTrashAlt className="w-4 h-4" />
            </Button>
          </Card>
        ))}

        <Button
          className={clsx(
            'bg-blue-100 hover:bg-blue-200 transition duration-300 text-blue-600 ',
            'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer font-medium'
          )}
          onClick={() => setShowNewTaskModal(true)}
        >
          <FaPlus className="mr-1 text-sm" /> {t('newTask')}
        </Button>
      </div>
      <NewTaskModal
        isOpen={showNewTaskModal}
        hideModal={() => setShowNewTaskModal(false)}
        createNewTask={createNewTask}
        isLoading={isLoading}
      />
      <DelTaskModal
        isOpen={showDelTaskModal}
        hideModal={() => setShowDelTaskModal(false)}
        deleteTask={deleteTask}
      />
      {showTaskModal && (
        <TaskModal
          task={taskRef.current!}
          boardId={boardId}
          columnId={columnId}
          isOpen={showTaskModal}
          hideModal={() => setShowTaskModal(false)}
          openDelTaskModal={() => setShowDelTaskModal(true)}
        />
      )}
    </div>
  );
};

export default Column;
