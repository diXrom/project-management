import clsx from 'clsx';
import Input from '../../../../shared/components/Input';
import React, { FormEvent, useState } from 'react';
import Modal from 'shared/components/Modal';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';

const NewTaskModal: React.FC<{
  isOpen: boolean;
  hideModal: () => void;
  createNewTask: (title: string, description: string) => void;
}> = ({ isOpen, hideModal, createNewTask }) => {
  const { t } = useTranslation();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [errorText, setErrorText] = useState('');

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
      createNewTask(newTaskTitle, newTaskDescription);
      setNewTaskTitle('');
      setErrorText('');
    }
  };

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

export default NewTaskModal;
