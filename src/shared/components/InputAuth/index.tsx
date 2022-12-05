import { ComponentPropsWithRef, FC, memo, useEffect } from 'react';
import { FieldErrorsImpl, UseFormRegister, UseFormSetError } from 'react-hook-form';
import clsx from 'clsx';

import { IAuth } from 'shared/api/lib/types';
import { useTranslation } from 'react-i18next';
import { inputStyle, inputErrorStyle, errorMessageStyle } from '../Input/lib/styles';

interface IInputAuth extends ComponentPropsWithRef<'input'> {
  placeholder: string;
  type: string;
  register: UseFormRegister<IAuth>;
  schema: { required: string; minLength?: { value: number; message: string } };
  error: Partial<FieldErrorsImpl<IAuth>>;
  name: keyof IAuth;
  setError: UseFormSetError<IAuth>;
}

const InputAuth: FC<IInputAuth> = (props) => {
  const { children, placeholder, type, register, name, schema, error, setError, ...arg } = props;
  const { t } = useTranslation();
  const lengthCh = name === 'password' ? '8characters' : '4characters';

  useEffect(() => {
    if (error[name]?.type === 'required') {
      setError(name, { type: 'required', message: t('required') });
    }
    if (error[name]?.type === 'minLength') {
      setError(name, { type: 'minLength', message: `${t('minLength')}${t(lengthCh)}` });
    }
  }, []);

  return (
    <div>
      <div className="relative flex items-center">
        {children}
        <input
          autoComplete="on"
          type={type}
          className={clsx(inputStyle, error[name]?.message ? inputErrorStyle : '')}
          placeholder={placeholder}
          {...register(name, schema)}
          {...arg}
        />
      </div>
      {Boolean(error[name]?.message) && <p className={errorMessageStyle}>{error[name]?.message}</p>}
    </div>
  );
};

export default memo(InputAuth);
