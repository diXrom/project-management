import { ComponentPropsWithRef, FC, memo } from 'react';
import clsx from 'clsx';

import { errorMessageStyle, textareaErrorStyle, textareaStyle } from './lib/styles';

interface ITextarea extends ComponentPropsWithRef<'textarea'> {
  error?: string;
}

const Input: FC<ITextarea> = ({ children, placeholder, className, error, ...props }) => {
  return (
    <div className="relative flex flex-col ">
      {children}
      <textarea
        autoComplete="on"
        className={clsx(
          textareaStyle,
          className,
          error && textareaErrorStyle,
          !children && '!px-3'
        )}
        placeholder={placeholder}
        {...props}
      />
      {Boolean(error) && <p className={errorMessageStyle}>{error}</p>}
    </div>
  );
};

export default memo(Input);
