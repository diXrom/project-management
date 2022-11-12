import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAddBoardMutation } from 'shared/api/model/boardsSlice';
import { ROUTE_PATH, STORAGE_TOKEN } from 'shared/common/constants';
import Button from 'shared/components/Button';
import LangSwitcher from 'widgets/LangSwitcher/LangSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const [addBoard] = useAddBoardMutation();
  const createBoardHandler = async () => {
    await addBoard({ title: 'test45', owner: 'Inna', users: ['Inna'] });
  };
  return (
    <header className="flex content-center bg-white shadow-md ">
      <div className="container flex justify-between mx-auto px-2.5 md:px-5">
        <Link to="/" className="flex items-center">
          <div>Logo</div>
        </Link>
        <div className="items-center flex-shrink-0 gap-2.5 flex">
          {localStorage.getItem(STORAGE_TOKEN) && (
            <Button onClick={createBoardHandler}>{t('newBoard')}</Button>
          )}
          <LangSwitcher />
          <Link to={ROUTE_PATH.LOGIN}>
            <Button>{t('signIn')}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
