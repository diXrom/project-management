import clsx from 'clsx';
import Input from '../../../../shared/components/Input';
import React, { FormEvent, useState } from 'react';
import Modal from 'shared/components/Modal';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';

const NewColModal: React.FC<{
  isOpen: boolean;
  hideModal: () => void;
  createNewColumn: (title: string) => void;
}> = ({ isOpen, hideModal, createNewColumn }) => {
  const { t } = useTranslation();
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [errorText, setErrorText] = useState('');

  const onCloseClick = () => {
    hideModal();
    setNewColumnTitle('');
    setErrorText('');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (newColumnTitle.length < 1) {
      setErrorText(`${t('titleLength')}`);
      return;
    } else {
      createNewColumn(newColumnTitle);
      setNewColumnTitle('');
      setErrorText('');
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={() => onCloseClick()}>
      <div className="font-semibold text-slate-800 mb-2">{t('enterColTitle')}</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          error={errorText}
          value={newColumnTitle}
          onChange={(e) => setNewColumnTitle(e.target.value)}
        />
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

export default NewColModal;
