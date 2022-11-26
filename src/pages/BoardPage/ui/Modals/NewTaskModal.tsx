import clsx from 'clsx';
import Input from '../../../../shared/components/Input';
import React, { FormEvent, useState } from 'react';
import Modal from 'shared/components/Modal';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import { useGetUsersQuery } from 'shared/api/model/usersSlice';
import { useGetBoardQuery } from 'shared/api/model/boardsSlice';
import { useParams } from 'react-router-dom';
import Textarea from 'shared/components/Textarea';
import { FaSpinner } from 'react-icons/fa';

const NewTaskModal: React.FC<{
  isOpen: boolean;
  isLoading: boolean;
  hideModal: () => void;
  createNewTask: (title: string, description: string, users: string[]) => void;
}> = ({ isOpen, hideModal, isLoading, createNewTask }) => {
  const { t } = useTranslation();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [errorTextTitle, setErrorTextTitle] = useState('');
  const [errorTextDescription, setErrorTextDescription] = useState('');

  const { boardId } = useParams();

  const { data: users } = useGetUsersQuery();
  const { data: boardInfo } = useGetBoardQuery({ boardId: boardId! });
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);

  const onCloseClick = () => {
    hideModal();
    setNewTaskTitle('');
    setErrorTextTitle('');
    setErrorTextDescription('');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!newTaskTitle.length || !newTaskDescription.length) {
      !newTaskTitle.length && setErrorTextTitle(`${t('titleLength')}`);
      !newTaskDescription.length && setErrorTextDescription(`${t('titleLength')}`);
      return;
    } else {
      createNewTask(newTaskTitle, newTaskDescription, checkedUsers);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setErrorTextTitle('');
      setErrorTextDescription('');
    }
  };

  const boardUsers = users?.filter((user) => boardInfo?.users.includes(user._id));
  return (
    <Modal isOpen={isOpen} closeModal={() => onCloseClick()}>
      <div className="font-semibold text-slate-800 mb-2">{t('enterTaskTitle')}</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          error={errorTextTitle}
          value={newTaskTitle}
          onChange={(e) => {
            setErrorTextTitle('');
            setNewTaskTitle(e.target.value);
          }}
        />
        <div className="font-semibold text-slate-800 mb-2">{t('enterDescription')}</div>

        <Textarea
          error={errorTextDescription}
          value={newTaskDescription}
          onChange={(e) => {
            setErrorTextDescription('');
            setNewTaskDescription(e.target.value);
          }}
        />
        <p>{t('executors')}</p>
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
          <Button
            onClick={() => onCloseClick()}
            className={clsx(
              'bg-blue-200 hover:bg-blue-300 transition duration-300 text-white-600 font-semibold',
              'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer w-full !text-base'
            )}
          >
            {t('cancel')}
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className={clsx(
              'bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold',
              'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer w-full !text-base shadow-md gap-2 '
            )}
          >
            {isLoading && <FaSpinner className="w-5 h-5 animate-spin" />}
            {t('confirm')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewTaskModal;
