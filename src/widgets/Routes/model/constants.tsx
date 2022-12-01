import RequireAuth from 'widgets/Routes/ui/RequireAuth';
import EditProfile from 'pages/EditProfile';
import MainPage from 'pages/MainPage';
import BoardPage from 'pages/BoardPage';

const PrivateRoutes = {
  EditProfile: (
    <RequireAuth>
      <EditProfile />
    </RequireAuth>
  ),
  MainPage: (
    <RequireAuth>
      <MainPage />
    </RequireAuth>
  ),
  BoardPage: (
    <RequireAuth>
      <BoardPage />
    </RequireAuth>
  ),
};

export default PrivateRoutes;
