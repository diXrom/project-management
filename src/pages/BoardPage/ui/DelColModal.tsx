import clsx from 'clsx';
import React from 'react';
import Modal from 'shared/components/Modal';

const DelColModal: React.FC<{
  isOpen: boolean;
  hideModal: () => void;
  deleteColumn: () => void;
}> = ({ isOpen, hideModal, deleteColumn }) => {
  return (
    <Modal isOpen={isOpen} closeModal={() => hideModal()}>
      <div className="font-semibold text-slate-800 mb-2">Are you sure want to delete column?</div>
      <div className="flex gap-3">
        <div
          onClick={() => hideModal()}
          className={clsx(
            'bg-red-200 hover:bg-red-300 transition duration-300 text-red-600 font-semibold',
            'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer w-full'
          )}
        >
          Cancel
        </div>
        <div
          onClick={() => deleteColumn()}
          className={clsx(
            'bg-red-600 hover:bg-red-700 transition duration-300 text-white font-semibold',
            'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer w-full'
          )}
        >
          Delete
        </div>
      </div>
    </Modal>
  );
};

export default DelColModal;
