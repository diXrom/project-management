import { ComponentPropsWithoutRef, FC, memo } from 'react';
import clsx from 'clsx';

import { button, buttonBg, buttonOutline } from './lib/styles';

interface IButton extends ComponentPropsWithoutRef<'button'> {
  outline?: boolean;
}

const Button: FC<IButton> = ({ children, className, type, outline = false, ...props }) => (
  <button
    {...props}
    type={type ? 'submit' : 'button'}
    className={clsx(className, button, `${outline ? buttonOutline : buttonBg}`)}
  >
    {children}
  </button>
);

export default memo(Button);
