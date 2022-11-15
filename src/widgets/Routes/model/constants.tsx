import RequireAuth from 'widgets/Routes/ui/RequireAuth';
import EditProfile from 'pages/EditProfile';

const PrivateRoutes = {
  EditProfile: (
    <RequireAuth>
      <EditProfile />
    </RequireAuth>
  ),
};

export default PrivateRoutes;
