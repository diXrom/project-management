import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'shared/components/Modal';

const DelTaskModal: React.FC<{
  isOpen: boolean;
  hideModal: () => void;
  deleteTask: () => void;
}> = ({ isOpen, hideModal, deleteTask }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} closeModal={() => hideModal()}>
      <div className="font-semibold text-slate-800 mb-2">{t('wantToDeleteTask')}</div>
      <div className="flex gap-3">
        <div
          onClick={() => hideModal()}
          className={clsx(
            'bg-red-200 hover:bg-red-300 transition duration-300 text-red-600 font-semibold',
            'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer w-full'
          )}
        >
          {t('cancel')}
        </div>
        <div
          onClick={() => deleteTask()}
          className={clsx(
            'bg-red-600 hover:bg-red-700 transition duration-300 text-white font-semibold',
            'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer w-full'
          )}
        >
          {t('delete')}
        </div>
      </div>
    </Modal>
  );
};

export default DelTaskModal;
