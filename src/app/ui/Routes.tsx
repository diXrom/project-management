import { Routes, Route, HashRouter as Router } from 'react-router-dom';

import MainPage from 'pages/MainPage';
import Registration from 'pages/Registration';
import Login from 'pages/Login';
import EditProfile from 'pages/EditProfile';
import Layout from 'widgets/Layout';
import { ROUTE_PATH } from 'shared/common/constants';
import 'app/lib/style.scss';

const MainRoutes = () => (
  <Router>
    <Routes>
      <Route path={ROUTE_PATH.INDEX} element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path={ROUTE_PATH.REGISTRATION} element={<Registration />} />
        <Route path={ROUTE_PATH.LOGIN} element={<Login />} />
        <Route path={ROUTE_PATH.EDIT} element={<EditProfile />} />
        <Route path={ROUTE_PATH.BOARDS} element={<div>BOARDS</div>} />
      </Route>
    </Routes>
  </Router>
);

export default MainRoutes;
