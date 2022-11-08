import { Link } from 'react-router-dom';
import { ROUTE_PATH } from 'shared/common/constants';
import Button from 'shared/components/Button';

const Header = () => {
  return (
    <header className="flex content-center bg-white shadow-md ">
      <div className="container flex justify-between mx-auto px-2.5 md:px-5">
        <Link to="/" className="flex items-center">
          <div>Logo</div>
        </Link>
        <div className="items-center flex-shrink-0 gap-2.5 flex">
          <Link to={ROUTE_PATH.LOGIN}>
            <Button>Войти</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
