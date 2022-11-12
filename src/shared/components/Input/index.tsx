import { ComponentPropsWithRef, FC, memo } from 'react';
import clsx from 'clsx';

import { errorMessageStyle, inputErrorStyle, inputStyle } from './lib/styles';

interface IInput extends ComponentPropsWithRef<'input'> {
  error?: string;
}

const Input: FC<IInput> = ({ children, placeholder, type, className, error, ...props }) => {
  return (
    <div className="relative flex flex-col ">
      {children}
      <input
        autoComplete="on"
        type={type}
        className={clsx(inputStyle, className, error && inputErrorStyle, !children && '!px-3')}
        placeholder={placeholder}
        {...props}
      />
      {Boolean(error) && <p className={errorMessageStyle}>{error}</p>}
    </div>
  );
};

export default memo(Input);
