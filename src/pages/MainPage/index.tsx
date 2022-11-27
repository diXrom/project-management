import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useDeleteBoardMutation, useGetBoardsSetIdQuery } from 'shared/api/model/boardsSlice';
import { useTranslation } from 'react-i18next';
import { fade, motionVariants } from 'shared/common/styles';
import Card from 'shared/components/Card';
import Button from 'shared/components/Button';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useRef, useState } from 'react';
import Modal from 'shared/components/Modal';
import CardSkeleton from 'pages/MainPage/ui/CardSkeleton';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from 'shared/common/constants';
import { useAppSelector } from 'shared/store/model/hooks';
import { getUser } from 'shared/store/model/selectors';
import { useGetUsersQuery } from 'shared/api/model/usersSlice';
import AddBoardModal from 'widgets/Header/ui/AddBoardModal';

const MainPage = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const [isOpenAddBoardModal, setOpenAddBoardModal] = useState(false);
  const openModal = () => setOpen(true);
  const openAddBoardModal = () => setOpenAddBoardModal(true);
  const closeModal = () => setOpen(false);
  const user = useAppSelector(getUser);
  const boardIdRef = useRef<string>();
  const { data: users } = useGetUsersQuery();

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
      <h1 className="text-3xl text-slate-800 font-bold	p-6">{t('boards')}</h1>
      {isError && <p className="text-center text-red-500">{t('error')}</p>}
      {isLoading && <CardSkeleton />}
      {data?.length ? (
        <div className="container mx-auto flex flex-col gap-4 ">
          {data?.map((board) => (
            <Link key={board._id} to={`${ROUTE_PATH.BOARDS}/${board._id}`}>
              <Card className="flex justify-between cursor-pointer	hover:shadow-lg">
                <div>
                  <h1 className="text-xl font-semibold	">{board.title}</h1>
                  <p className="text-light text-sm	text-slate-600">
                    {t('invited')}
                    {board.users
                      .map((user) => users?.find((item) => item._id === user)?.name)
                      .join(', ')}
                  </p>
                </div>
                <Button
                  className="items-center gap-1 !border !border-white flex self-center"
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
      ) : (
        <div
          onClick={openAddBoardModal}
          className={clsx(
            'w-80 shrink-0 bg-blue-100 hover:bg-blue-200 transition duration-300 text-blue-600 ',
            'h-12 px-3 rounded-lg flex items-center justify-center cursor-pointer font-medium'
          )}
        >
          <FaPlus className="mr-1 text-sm" />
          {t('addBoard')}
        </div>
      )}
      <AddBoardModal isOpen={isOpenAddBoardModal} closeModal={() => setOpenAddBoardModal(false)} />
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <h3 className="font-semibold text-slate-800 mb-2">{t('warning')}</h3>
        <div className="flex gap-3">
          <div
            onClick={closeModal}
            className={clsx(
              'bg-red-200 hover:bg-red-300 transition duration-300 text-red-600 font-semibold',
              'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer w-full'
            )}
          >
            {t('cancel')}
          </div>
          <div
            onClick={handleBoardDelete}
            className={clsx(
              'bg-red-600 hover:bg-red-700 transition duration-300 text-white font-semibold',
              'h-10 px-3 rounded-lg flex items-center justify-center cursor-pointer w-full'
            )}
          >
            {t('delete')}
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default MainPage;
