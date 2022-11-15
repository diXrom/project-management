import { Navigate } from 'react-router-dom';
import { ROUTE_PATH } from 'shared/common/constants';
import { getToken } from 'shared/common/utils';

interface IRequireAuth {
  children: JSX.Element;
}

const RequireAuth = ({ children }: IRequireAuth) => {
  if (!getToken()) return <Navigate to={ROUTE_PATH.INDEX} />;

  return children;
};

export default RequireAuth;
