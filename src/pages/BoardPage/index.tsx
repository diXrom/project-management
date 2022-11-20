import { motion } from 'framer-motion';
import { fade, motionVariants } from 'shared/common/styles';
import Panel from './ui/Panel';
import { useParams } from 'react-router-dom';
import Field from './ui/Field';
import Modal from 'shared/components/Modal';
import Input from '../../shared/components/Input';
import { useState } from 'react';
import clsx from 'clsx';
import {
  useAddColumnMutation,
  useDeleteColumnMutation,
  useGetColumnsQuery,
} from 'shared/api/model/columnsSlice';
import { useGetBoardQuery } from 'shared/api/model/boardsSlice';
import { IBoardId, IColumnId } from 'shared/api/lib/types';
import NewColModal from './ui/NewColModal';
import DelColModal from './ui/DelColModal';

export default function BoardPage() {
  const { boardId } = useParams();

  const [showNewColModal, setShowNewColModal] = useState(false);
  const [showDelColModal, setShowDelColModal] = useState(false);
  const [columnIdToDel, setColumnIdToDel] = useState('');

  const [addColumn] = useAddColumnMutation();
  const [delColumn] = useDeleteColumnMutation();

  const createNewColumn = async (title: string) => {
    if (boardId) {
      setShowNewColModal(false);
      await addColumn({ title: title, order: data?.length || 0, boardId });
    }
  };

  const openModalDelCol = ({ columnId }: IColumnId) => {
    setShowDelColModal(true);
    setColumnIdToDel(columnId);
  };

  const deleteColumn = async () => {
    if (boardId) await delColumn({ boardId: boardId, columnId: columnIdToDel });
    setShowDelColModal(false);
  };

  const { isLoading, isError, data } = useGetColumnsQuery({ boardId: boardId as string });

  return (
    <motion.div variants={fade} {...motionVariants}>
      <Panel openModalNewCol={() => setShowNewColModal(true)} />
      <Field
        columns={data}
        openModalNewCol={() => setShowNewColModal(true)}
        openModalDelCol={openModalDelCol}
      />

      <NewColModal
        isOpen={showNewColModal}
        hideModal={() => setShowNewColModal(false)}
        createNewColumn={createNewColumn}
      />

      <DelColModal
        isOpen={showDelColModal}
        hideModal={() => setShowDelColModal(false)}
        deleteColumn={deleteColumn}
      />
    </motion.div>
  );
}
