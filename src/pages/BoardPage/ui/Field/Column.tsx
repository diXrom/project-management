import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { FaBan, FaPlus, FaTrashAlt, FaPen } from 'react-icons/fa';
import { useUpdateColumnMutation } from 'shared/api/model/columnsSlice';
import { IColumn, IColumnId, ITask } from 'shared/api/lib/types';
import { useTranslation } from 'react-i18next';
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTasksSetMutation,
} from 'shared/api/model/tasksSlice';
import Card from 'shared/components/Card';
import Button from 'shared/components/Button';
import NewTaskModal from '../Modals/NewTaskModal';
import { useAppSelector } from 'shared/store/model/hooks';
import { getUser } from 'shared/store/model/selectors';
import DelTaskModal from '../Modals/DelTaskModal';
import TaskModal from '../Modals/TaskModal';
import { Reorder, useDragControls } from 'framer-motion';
import { TbDragDrop2 } from 'react-icons/tb';

// ==========TODO: REFACTOR==========

const Column: React.FC<{
  tasks: ITask[];
  column: IColumn;
  updateCol: () => void;
  title: string;
  boardId: string;
  columnId: string;
  order: number;
  openModalDelCol: ({ columnId }: IColumnId) => void;
}> = ({ title, boardId, columnId, order, openModalDelCol, column, updateCol, tasks }) => {
  const { t } = useTranslation();
  const [localTitle, setLocalTitle] = useState(title);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [showDelTaskModal, setShowDelTaskModal] = useState(false);
  const [tasksArr, setTasksArr] = useState(tasks);
  const controls = useDragControls();
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [addTask, { isLoading }] = useAddTaskMutation();
  const [delTask] = useDeleteTaskMutation();
  const [updateTasks] = useUpdateTasksSetMutation();

  const taskRef = useRef<ITask>();

  const updateRef = useRef(false);
  const user = useAppSelector(getUser);

  const inputRef = useRef<HTMLInputElement>(null);

  const [applyColumnTitle] = useUpdateColumnMutation();

  const createNewTask = async (title: string, description: string, users: string[]) => {
    updateRef.current = true;
    if (user) {
      await addTask({
        title: title,
        order: tasksArr?.length || 0,
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
    updateRef.current = true;
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

  useEffect(() => {
    if (updateRef.current) {
      setTasksArr(tasks);
    }
  }, [tasks]);

  return (
    <Reorder.Item
      value={column}
      dragListener={false}
      dragControls={controls}
      whileDrag={{ scale: 1.05 }}
      onDragEnd={updateCol}
      as="div"
      className="w-80 bg-slate-50 rounded-lg shadow-lg shadow-slate-300 p-2 pr-1.5 shrink-0 max-h-full h-fit flex flex-col"
    >
      <div className="custom-scroll overflow-x-hidden overflow-y-auto p-1 pr-1.5">
        <div className="flex mb-2">
          <div
            className={clsx(
              'text-slate-800 font-bold p-1 px-3 rounded-lg cursor-text w-full overflow-hidden',
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
            className="p-2 ml-2 font-bold text-red-500 transition-all duration-300 bg-red-100 rounded-lg cursor-pointer hover:bg-red-200"
            onClick={() => handleDeleteClick()}
          >
            <FaBan />
          </div>
        </div>
        <Reorder.Group axis="y" values={tasksArr} onReorder={setTasksArr}>
          {tasksArr?.map((task) => (
            <Reorder.Item
              key={task._id}
              value={task}
              whileDrag={{ scale: 1.05 }}
              as="div"
              onDragEnd={() => {
                updateTasks(
                  tasksArr.map(({ columnId, _id }, idx) => ({ _id, columnId, order: idx }))
                );
                updateRef.current = false;
              }}
              className="hover:cursor-grab active:cursor-grabbing"
            >
              <Card className="flex items-center gap-1 p-2 mb-2 font-medium bg-slate-100 rounded-xl text-slate-800 hover:shadow-lg">
                <h4 className="mr-auto">{task.title}</h4>
                <Button
                  className="flex items-center bg-transparent border-0 text-slate-700 hover:text-slate-400"
                  onClick={() => {
                    taskRef.current = task;
                    setShowTaskModal(true);
                  }}
                >
                  <FaPen className="w-3 h-4" />
                </Button>
                <Button
                  className="flex items-center bg-transparent border-0 text-slate-700 hover:text-red-500 "
                  onClick={(event) => {
                    event.stopPropagation();
                    taskRef.current = task;
                    setShowDelTaskModal(true);
                  }}
                >
                  <FaTrashAlt className="w-3 h-4" />
                </Button>
              </Card>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <div className="flex items-center justify-between">
          <Button
            className={clsx(
              'bg-blue-100 hover:bg-blue-200 transition duration-300 text-blue-600 ',
              'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer font-medium'
            )}
            onClick={() => setShowNewTaskModal(true)}
          >
            <FaPlus className="mr-1 text-sm" /> {t('newTask')}
          </Button>
          <TbDragDrop2
            className="w-6 h-6 text-gray-500 cursor-grab active:cursor-grabbing"
            onPointerDown={(e) => controls.start(e)}
          />
        </div>
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
          updateRef={updateRef}
          task={taskRef.current!}
          boardId={boardId}
          columnId={columnId}
          isOpen={showTaskModal}
          hideModal={() => setShowTaskModal(false)}
          openDelTaskModal={() => setShowDelTaskModal(true)}
        />
      )}
    </Reorder.Item>
  );
};

export default Column;
