import { useState, FormEvent } from 'react';
import clsx from 'clsx';

import { useTranslation } from 'react-i18next';
import { FaSpinner } from 'react-icons/fa';
import { useAddBoardMutation } from 'shared/api/model/boardsSlice';
import { useGetUsersQuery } from 'shared/api/model/usersSlice';
import Button from 'shared/components/Button';
import Input from 'shared/components/Input';
import Modal from 'shared/components/Modal';
import { useAppSelector } from 'shared/store/model/hooks';
import { getUser } from 'shared/store/model/selectors';

type AddBoardProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export default function AddBoardModal({ isOpen, closeModal }: AddBoardProps) {
  const { t } = useTranslation();
  const user = useAppSelector(getUser);

  const [inputValue, setInputValue] = useState('');
  const [addBoard, { isLoading }] = useAddBoardMutation();
  const [errorTextTitle, setErrorTextTitle] = useState('');

  const { data: users } = useGetUsersQuery(undefined, {
    skip: !isOpen,
  });

  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!inputValue) {
      setErrorTextTitle(`${t('titleLength')}`);

      return;
    } else {
      await addBoard({ title: inputValue, owner: user!._id, users: [...checkedUsers, user!._id] });
      closeModal();
      setInputValue('');
      setCheckedUsers([]);
    }
  }
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h3 className="'text-slate-800 text-lg font-bold mb-2">{t('newBoard')}</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          placeholder={t('enterName')}
          error={errorTextTitle}
          type="text"
          value={inputValue}
          onChange={(event) => {
            setErrorTextTitle('');
            setInputValue(event.currentTarget.value);
          }}
        ></Input>
        <p className="text-slate-800 text-md font-bold mb-2">{t('invite')}</p>
        <div className="flex gap-4 mb-4 flex-wrap">
          {users
            ?.filter((item) => item._id !== user?._id)
            .map((item, index) => {
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
        </div>
        <div className="flex gap-3 mt-2">
          <Button
            onClick={() => {
              setInputValue('');
              setErrorTextTitle('');

              closeModal();
            }}
            className={clsx(
              'bg-blue-200 hover:bg-blue-300 transition duration-300 text-white-600 font-semibold',
              'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer w-full !text-base'
            )}
          >
            {t('cancel')}
          </Button>
          <Button
            type="submit"
            className={clsx(
              'bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold',
              'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer w-full !text-base shadow-md gap-2 '
            )}
            disabled={isLoading}
          >
            {isLoading && <FaSpinner className="w-5 h-5 animate-spin" />}
            {t('save')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
