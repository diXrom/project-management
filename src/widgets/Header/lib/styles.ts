import clsx from 'clsx';

const userPanelBtn = 'hidden items-center gap-1 !border !border-white sm:flex';
const menuStyle =
  'absolute z-50 right-0 w-40 mt-1.5 origin-top-right bg-white rounded-md shadow-lg focus:outline-none';
const menuBtnStyle =
  'flex items-center border text-sm px-2.5 py-1.5 font-medium rounded text-white bg-gray-900 hover:text-black hover:bg-white transition duration-300 gap-1';
const getMenuItem = (active: boolean, i: number) =>
  clsx(
    'group w-full gap-2 font-medium items-center rounded-md p-2 text-sm transition duration-300',
    active ? 'bg-black text-white' : 'text-gray-900',
    i ? 'flex' : 'flex sm:hidden'
  );

const menuTransition = {
  enter: 'transition ease-out duration-100',
  enterFrom: 'transform opacity-0 scale-95',
  enterTo: 'transform opacity-100 scale-100',
  leave: 'transition ease-in duration-75',
  leaveFrom: 'transform opacity-100 scale-100',
  leaveTo: 'transform opacity-0 scale-95',
};

export { userPanelBtn, menuStyle, menuBtnStyle, getMenuItem, menuTransition };
