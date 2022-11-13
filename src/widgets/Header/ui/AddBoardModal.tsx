import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAddBoardMutation } from 'shared/api/model/boardsSlice';
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
  const [addBoard] = useAddBoardMutation();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await addBoard({ title: inputValue, owner: user!._id, users: ['Inna'] });
    closeModal();
    setInputValue('');
  }

  function onChange(event: React.FormEvent<HTMLInputElement>) {
    setInputValue(event.currentTarget.value);
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h3 className="leading-loose text-lg">{t('newBoard')}</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          placeholder={t('enterName')}
          type="text"
          value={inputValue}
          onChange={onChange}
        ></Input>
        <Button type="submit" className="place-self-end">
          {t('save')}
        </Button>
      </form>
    </Modal>
  );
}
