import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { VscProject } from 'react-icons/vsc';

import LangSwitcher from 'widgets/Header/ui/LangSwitcher';

import { useAppSelector } from 'shared/store/model/hooks';
import { getUser } from 'shared/store/model/selectors';

import { ROUTE_PATH, STORAGE_TOKEN } from 'shared/common/constants';
import AuthBtns from './ui/AuthBtns';
import UserPanel from './ui/UserPanel';
import useScrollY from './model/useScrollY';
import clsx from 'clsx';
import { memo } from 'react';
import { useAddBoardMutation } from 'shared/api/model/boardsSlice';

const Header = () => {
  const user = useAppSelector(getUser);
  //Пока отлючена анимация перехода стики хедера
  /*  const scrollY = useScrollY(); */

  return (
    <header
      className={clsx(
        'sticky top-0 z-10 flex content-center shadow-md bg-black transition duration-500 select-none'
        /*  scrollY > 90 ? 'bg-opacity-80' : 'bg-opacity-100' */
      )}
    >
      <div className="container flex justify-between mx-auto px-2.5 md:px-5">
        <Link to={user ? ROUTE_PATH.BOARDS : ROUTE_PATH.INDEX} className="flex items-center">
          <VscProject className="w-10 h-10 text-white transition duration-300 active:scale-95" />
        </Link>
        <motion.div layout className="items-center flex-shrink-0 gap-2.5 flex">
          <LangSwitcher />
          {user ? <UserPanel /> : <AuthBtns />}
        </motion.div>
      </div>
    </header>
  );
};

export default memo(Header);
