import { motion } from 'framer-motion';
import { fade, motionVariants } from 'shared/common/styles';
import Panel from './ui/Panel/Panel';
import { useParams } from 'react-router-dom';
import Field from './ui/Field/Field';
import { useRef, useState } from 'react';
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

  const refCol = useRef(false);
  const [showNewColModal, setShowNewColModal] = useState(false);
  const [showDelColModal, setShowDelColModal] = useState(false);
  const [columnIdToDel, setColumnIdToDel] = useState('');

  const [addColumn] = useAddColumnMutation();
  const [delColumn] = useDeleteColumnMutation();

  const createNewColumn = async (title: string) => {
    refCol.current = true;
    if (boardId) {
      setShowNewColModal(false);
      await addColumn({ title: title, order: columns?.length || 0, boardId });
    }
  };

  const openModalDelCol = ({ columnId }: IColumnId) => {
    setShowDelColModal(true);
    setColumnIdToDel(columnId);
  };

  const deleteColumn = async () => {
    refCol.current = true;
    if (boardId) await delColumn({ boardId: boardId, columnId: columnIdToDel });
    setShowDelColModal(false);
  };

  const { isLoading, isError, columns } = useGetColumnsQuery(
    { boardId: boardId as string },
    {
      selectFromResult: ({ isError, isLoading, data }) => ({
        columns: data ? [...data].sort((a, b) => a.order - b.order) : [],
        isLoading,
        isError,
      }),
    }
  );

  return (
    <motion.div variants={fade} {...motionVariants}>
      <Panel openModalNewCol={() => setShowNewColModal(true)} />
      {isLoading && <FieldSkeleton />}
      {!isLoading && !isError && (
        <Field
          refCol={refCol}
          columns={columns}
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
