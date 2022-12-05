import { FaUserEdit, FaSignOutAlt } from 'react-icons/fa';
import { MdPostAdd } from 'react-icons/md';
import { ROUTE_PATH } from 'shared/common/constants';

const getMenuItems = (openModal: () => void, handleLogout: () => void) => [
  { path: '', icon: <MdPostAdd className="w-4 h-4" />, text: 'addBoard', onClick: openModal },
  { path: ROUTE_PATH.EDIT, icon: <FaUserEdit className="w-4 h-4" />, text: 'editProfile' },
  {
    path: ROUTE_PATH.INDEX,
    icon: <FaSignOutAlt className="w-4 h-4" />,
    text: 'logout',
    onClick: handleLogout,
  },
];

export default getMenuItems;
