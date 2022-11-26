import { motion } from 'framer-motion';
import { useDeleteBoardMutation, useGetBoardsSetIdQuery } from 'shared/api/model/boardsSlice';
import { useTranslation } from 'react-i18next';
import { fade, motionVariants } from 'shared/common/styles';
import Card from 'shared/components/Card';
import Button from 'shared/components/Button';
import { FaTrashAlt } from 'react-icons/fa';
import { useRef, useState } from 'react';
import Modal from 'shared/components/Modal';
import CardSkeleton from 'pages/MainPage/ui/CardSkeleton';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from 'shared/common/constants';
import { useAppSelector } from 'shared/store/model/hooks';
import { getUser } from 'shared/store/model/selectors';

const MainPage = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const user = useAppSelector(getUser);
  const boardIdRef = useRef<string>();

  const [deleteBoard] = useDeleteBoardMutation();

  const handleBoardDelete = async () => {
    if (boardIdRef.current) {
      await deleteBoard({ boardId: boardIdRef.current });
      closeModal();
    }
  };

  const { isLoading, isError, data } = useGetBoardsSetIdQuery({ userId: user?._id ?? '' });

  return (
    <motion.div variants={fade} {...motionVariants}>
      {isError && <p className="text-center text-red-500">{t('error')}</p>}
      {isLoading && <CardSkeleton />}
      <div className="container mx-auto flex flex-col gap-4 ">
        {data?.map((board) => (
          <Link key={board._id} to={`${ROUTE_PATH.BOARDS}/${board._id}`}>
            <Card className="flex justify-between cursor-pointer	hover:shadow-lg">
              <h1 className="text-xl">{board.title}</h1>
              <Button
                className="items-center gap-1 !border !border-white flex"
                onClick={(event) => {
                  event.preventDefault();
                  openModal();
                  boardIdRef.current = board._id;
                }}
              >
                <FaTrashAlt className="w-4 h-4" /> {t('delete')}
              </Button>
            </Card>
          </Link>
        ))}
      </div>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <h3 className="leading-loose text-lg">{t('warning')}</h3>
        <div className="flex place-content-end gap-3 mt-3">
          <Button type="button" onClick={closeModal}>
            {t('cancel')}
          </Button>
          <Button type="button" onClick={handleBoardDelete}>
            {t('delete')}
          </Button>
        </div>
      </Modal>
    </motion.div>
  );
};

export default MainPage;
