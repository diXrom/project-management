import clsx from 'clsx';
import Input from '../../../../shared/components/Input';
import React, { FormEvent, useState } from 'react';
import Modal from 'shared/components/Modal';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import { useGetUsersQuery } from 'shared/api/model/usersSlice';
import { useGetBoardQuery } from 'shared/api/model/boardsSlice';
import { useParams } from 'react-router-dom';

const TaskModal: React.FC<{
  isOpen: boolean;
  hideModal: () => void;
}> = ({ isOpen, hideModal }) => {
  const { t } = useTranslation();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [errorText, setErrorText] = useState('');
  const { boardId } = useParams();

  const { data: users } = useGetUsersQuery();
  const { data: boardInfo } = useGetBoardQuery({ boardId: boardId! });
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);

  const onCloseClick = () => {
    hideModal();
    setNewTaskTitle('');
    setErrorText('');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (newTaskTitle.length < 1) {
      setErrorText(`${t('titleLength')}`);
      return;
    } else {
      //   createNewTask(newTaskTitle, newTaskDescription, checkedUsers);
      setNewTaskTitle('');
      setErrorText('');
    }
  };

  const boardUsers = users?.filter((user) => boardInfo?.users.includes(user._id));
  return (
    <Modal isOpen={isOpen} closeModal={() => onCloseClick()}>
      <div className="font-semibold text-slate-800 mb-2">{t('enterTaskTitle')}</div>
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
      </form>
    </Modal>
  );
};

export default TaskModal;
