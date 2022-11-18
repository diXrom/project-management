import { motion } from 'framer-motion';
import { fade, motionVariants } from 'shared/common/styles';
import Panel from './ui/Panel';
import { useParams } from 'react-router-dom';
import Field from './ui/Field';
import Modal from 'shared/components/Modal';
import Input from '../../shared/components/Input';
import { useState } from 'react';
import clsx from 'clsx';

export default function BoardPage() {
  const { boardId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <motion.div variants={fade} {...motionVariants}>
      <Panel />
      <Field />

      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <div className="font-semibold text-slate-800 mb-2">Enter new column title</div>
        <Input className="mb-3" />
        <div className="flex gap-3">
          <div
            className={clsx(
              'bg-blue-200 hover:bg-blue-300 transition duration-300 text-blue-600 font-semibold',
              'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer w-full'
            )}
          >
            Cancel
          </div>
          <div
            className={clsx(
              'bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold',
              'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer w-full'
            )}
          >
            Add Column
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
