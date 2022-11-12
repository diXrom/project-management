import { motion } from 'framer-motion';
import { useDeleteBoardMutation, useGetBoardsQuery } from 'shared/api/model/boardsSlice';
import { useTranslation } from 'react-i18next';

import { fade, motionVariants } from 'shared/common/styles';
import Card from 'shared/components/Card';
import Button from 'shared/components/Button';
import { IBoardId } from 'shared/api/lib/types';

const MainPage = () => {
  const { t } = useTranslation();
  const [deleteBoard] = useDeleteBoardMutation();

  const handleBoardDelete = async (id: IBoardId) => {
    await deleteBoard(id);
  };
  const { isLoading, isError, data } = useGetBoardsQuery();

  return (
    <motion.div variants={fade} {...motionVariants}>
      {isError && <p className="text-center text-red-500">{t('error')}</p>}
      {isLoading && <p className="text-center text-slate-400">{t('loading')}</p>}
      <div className="container mx-auto p-6 flex flex-col gap-4">
        {data?.map((board) => (
          <Card key={board._id} className="flex justify-between">
            <h1 className="text-xl">{board.title}</h1>
            <Button onClick={() => handleBoardDelete({ boardId: board._id })}>Del</Button>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default MainPage;
