import { useState, FormEvent } from 'react';
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
      await addBoard({ title: inputValue, owner: user!._id, users: checkedUsers });
      closeModal();
      setInputValue('');
    }
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h3 className="leading-loose text-lg">{t('newBoard')}</h3>
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
        <p>{t('invite')}</p>
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

        <Button
          type="submit"
          className="place-self-end w-full !text-base shadow-md h-11 flex items-center gap-2 justify-center"
          disabled={isLoading}
        >
          {isLoading && <FaSpinner className="w-5 h-5 animate-spin" />}
          {t('save')}
        </Button>
      </form>
    </Modal>
  );
}
