import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from 'shared/common/constants';
import Button from 'shared/components/Button';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <section className="flex items-center h-full p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-900">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">{t('notFind')}</p>
          <p className="mt-4 mb-8 dark:text-gray-400">{t('dontWorry')}</p>
          <Link to={ROUTE_PATH.INDEX}>
            <Button className="px-8 py-3 !text-base font-semibold">{t('homepage')}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
