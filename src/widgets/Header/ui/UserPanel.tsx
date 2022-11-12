import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, memo, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from 'shared/common/constants';
import { useAppSelector } from 'shared/store/model/hooks';
import { getUser } from 'shared/store/model/selectors';
import { MdPostAdd } from 'react-icons/md';
import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal';

const transition = {
  enter: 'transition ease-out duration-100',
  enterFrom: 'transform opacity-0 scale-95',
  enterTo: 'transform opacity-100 scale-100',
  leave: 'transition ease-in duration-75',
  leaveFrom: 'transform opacity-100 scale-100',
  leaveTo: 'transform opacity-0 scale-95',
};

const UserPanel = () => {
  const { t } = useTranslation();
  const user = useAppSelector(getUser);
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const menuItems = [
    { path: '', icon: <MdPostAdd className="w-4 h-4" />, text: 'addBoard' },
    { path: ROUTE_PATH.EDIT, icon: <FaUserEdit className="w-4 h-4" />, text: 'editProfile' },
    { path: ROUTE_PATH.INDEX, icon: <FaSignOutAlt className="w-4 h-4" />, text: 'logout' },
  ];

  return (
    <>
      <Button
        className="hidden items-center gap-1 !border !border-white sm:flex"
        onClick={openModal}
      >
        <MdPostAdd className="w-4 h-4" /> {t('addBoard')}
      </Button>
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className="flex items-center border text-sm px-2.5 py-1.5 font-medium rounded text-white bg-gray-900 hover:text-black hover:bg-white transition duration-300 gap-1">
            {user?.name}
            <FiChevronDown className="w-4 h-4" />
          </Menu.Button>
        </div>
        <Transition as={Fragment} {...transition}>
          <Menu.Items className="absolute z-50 right-0 w-40 mt-1.5 origin-top-right bg-white rounded-md shadow-lg focus:outline-none">
            <div className="px-1 py-1 space-y-1">
              {menuItems.map((item, idx) => (
                <Menu.Item key={item.path}>
                  {({ active }) => (
                    <Link
                      to={item.path}
                      className={clsx(
                        'group w-full gap-2 font-medium items-center rounded-md p-2 text-sm transition duration-300',
                        active ? 'bg-black text-white' : 'text-gray-900',
                        idx ? 'flex' : 'flex sm:hidden'
                      )}
                    >
                      {item.icon}
                      {t(item.text)}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div>Добавить доску</div>
      </Modal>
    </>
  );
};

export default memo(UserPanel);
