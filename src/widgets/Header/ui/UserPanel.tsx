import { Menu, Transition } from '@headlessui/react';
import { Fragment, memo } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdPostAdd } from 'react-icons/md';

import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal';
import useUserPanel from '../model/useUserPanel';
import getMenuItems from '../model/constants';
import { getMenuItem, menuBtnStyle, menuStyle, userPanelBtn, menuTransition } from '../lib/styles';

const UserPanel = () => {
  const { t, user, isOpen, openModal, closeModal, handleLogout } = useUserPanel();
  const menuItems = getMenuItems(openModal, handleLogout);

  return (
    <>
      <Button className={userPanelBtn} onClick={openModal}>
        <MdPostAdd className="w-4 h-4" /> {t('addBoard')}
      </Button>
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className={menuBtnStyle}>
            <FaUserTie className="w-3.5 h-3.5" />
            {user?.name}
            <FiChevronDown className="w-4 h-4" />
          </Menu.Button>
        </div>
        <Transition as={Fragment} {...menuTransition}>
          <Menu.Items className={menuStyle}>
            <div className="px-1 py-1 space-y-1">
              {menuItems.map((item, i) => (
                <Menu.Item key={item.path}>
                  {({ active }) => (
                    <Link to={item.path} onClick={item.onClick} className={getMenuItem(active, i)}>
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
