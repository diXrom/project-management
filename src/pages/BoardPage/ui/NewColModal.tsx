import clsx from 'clsx';
import Input from '../../../shared/components/Input';
import React, { useState } from 'react';
import Modal from 'shared/components/Modal';

const NewColModal: React.FC<{
  isOpen: boolean;
  hideModal: () => void;
  createNewColumn: (title: string) => void;
}> = ({ isOpen, hideModal, createNewColumn }) => {
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const onCloseClick = () => {
    setNewColumnTitle('');
    hideModal();
  };

  const onApplyClick = () => {
    createNewColumn(newColumnTitle);
    setNewColumnTitle('');
  };

  return (
    <Modal isOpen={isOpen} closeModal={() => onCloseClick()}>
      <div className="font-semibold text-slate-800 mb-2">Enter new column title</div>
      <Input
        className="mb-3"
        value={newColumnTitle}
        onChange={(e) => setNewColumnTitle(e.target.value)}
      />
      <div className="flex gap-3">
        <div
          onClick={() => onCloseClick()}
          className={clsx(
            'bg-blue-200 hover:bg-blue-300 transition duration-300 text-blue-600 font-semibold',
            'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer w-full'
          )}
        >
          Cancel
        </div>
        <div
          onClick={() => onApplyClick()}
          className={clsx(
            'bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold',
            'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer w-full'
          )}
        >
          Add Column
        </div>
      </div>
    </Modal>
  );
};

export default NewColModal;
