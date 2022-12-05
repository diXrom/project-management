import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { VscProject } from 'react-icons/vsc';
import clsx from 'clsx';

import LangSwitcher from 'widgets/Header/ui/LangSwitcher';
import { useAppSelector } from 'shared/store/model/hooks';
import { getUser } from 'shared/store/model/selectors';
import { ROUTE_PATH } from 'shared/common/constants';
import AuthBtns from './ui/AuthBtns';
import UserPanel from './ui/UserPanel';
import useScrollY from './model/useScrollY';

const Header = () => {
  const user = useAppSelector(getUser);
  const scrollY = useScrollY(); //Пока отлючена анимация перехода стики хедера
  useTranslation();

  return (
    <header>
      <div
        className={clsx(
          'fixed w-full h-16 top-0 z-10 flex content-center shadow-md bg-black transition duration-500 select-none',
          scrollY > 90 ? 'bg-opacity-70' : 'bg-opacity-100'
        )}
      >
        <div className="container flex justify-between mx-auto px-2.5 md:px-5">
          <Link to={user ? ROUTE_PATH.BOARDS : ROUTE_PATH.INDEX} className="flex items-center">
            <VscProject className="w-10 h-10 text-white transition duration-300 active:scale-95" />
          </Link>
          <div className="items-center flex-shrink-0 gap-2.5 flex">
            <LangSwitcher />
            {user ? <UserPanel /> : <AuthBtns />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
