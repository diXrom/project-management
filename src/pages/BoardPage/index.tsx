import { motion } from 'framer-motion';
import { fade, motionVariants } from 'shared/common/styles';
import Panel from './ui/Panel/Panel';
import { useParams } from 'react-router-dom';
import Field from './ui/Field/Field';
import { useState } from 'react';
import {
  useAddColumnMutation,
  useDeleteColumnMutation,
  useGetColumnsQuery,
} from 'shared/api/model/columnsSlice';
import { IColumnId } from 'shared/api/lib/types';
import NewColModal from './ui/Modals/NewColModal';
import DelColModal from './ui/Modals/DelColModal';
import FieldSkeleton from './ui/Field/Skeleton/FieldSkeleton';

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
      {isLoading && <FieldSkeleton />}
      {!isLoading && !isError && (
        <Field
          columns={data}
          openModalNewCol={() => setShowNewColModal(true)}
          openModalDelCol={openModalDelCol}
        />
      )}
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
