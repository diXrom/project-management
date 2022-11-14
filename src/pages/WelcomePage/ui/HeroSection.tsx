import React from 'react';
import Lottie from 'lottie-react';
import heroAnimation from '../../../assets/main/hero-lottie.json';
import { ROUTE_PATH } from 'shared/common/constants';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="hero container max-w-screen-xl flex flex-col sm:flex-row items-center mt-10 mb-20 ">
      <div className="description max-w-2xl">
        <h1 className="text-6xl font-black mb-3">
          <span className="from-cyan-500 bg-clip-text bg-gradient-to-r text-transparent via-purple-500 to-pink-500">
            {t('heroTitlePt1')}
          </span>
          {t('heroTitlePt2')}
          <span className="bg-clip-text bg-gradient-to-r text-transparent from-purple-500 to-pink-500">
            {t('heroTitlePt3')}
          </span>
        </h1>
        <p className="text-slate-500 text-xl mb-5">{t('heroDesc')}</p>
        <div className="hero-btns flex flex-row gap-5">
          <Link to={ROUTE_PATH.REGISTRATION}>
            <div className="start-btn bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto cursor-pointer">
              {t('heroBtnTry')}
            </div>
          </Link>

          <Link to="#more">
            <div className="more-btn bg-blue-200 hover:bg-blue-300 transition duration-300 text-blue-600 font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto cursor-pointer">
              {t('heroBtnMore')}
            </div>
          </Link>
        </div>
      </div>
      <div className="max-w-2xl" style={{ filter: 'hue-rotate(-30deg)' }}>
        <Lottie animationData={heroAnimation} loop={true} />
      </div>
    </section>
  );
};

export default HeroSection;
