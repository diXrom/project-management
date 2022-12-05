import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import timur from '../../../assets/main/authors/timur.jpg';
import inna from '../../../assets/main/authors/inna.jpg';
import vyach from '../../../assets/main/authors/vyach.jpg';

const listVariants = {
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.25,
    },
  }),
  hidden: {
    opacity: 0,
    y: -100,
  },
};

const OurTeam = () => {
  const { t } = useTranslation();

  const AUTHORS_INFO = [
    {
      name: t('nameTimur'),
      role: t('teamlead'),
      description: t('descTimur'),
      photo: timur,
    },
    {
      name: t('nameInna'),
      role: t('developer'),
      description: t('descInna'),
      photo: inna,
    },
    {
      name: t('nameVyach'),
      role: t('developer'),
      description: t('descVyach'),
      photo: vyach,
    },
  ];

  return (
    <section className="container max-w-screen-xl mb-28">
      <h2 className="mb-10 text-4xl font-bold text-center text-slate-700">{t('teamTitle')}</h2>
      <div className="flex flex-col lg:flex-row">
        {AUTHORS_INFO.map((author, idx) => (
          <motion.div
            key={author.name}
            className="flex flex-col p-5 mb-8 ml-3 mr-3 shadow-lg sm:w-full lg:w-1/3 lg:mb-0 shadow-slate-200 rounded-xl bg-slate-50"
            variants={listVariants}
            initial="hidden"
            custom={idx}
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex flex-row mb-2">
              <img className="w-[64px] h-[64px] rounded" src={author.photo}></img>
              <div className="ml-5">
                <div className="text-lg font-bold">{author.name}</div>
                <div className="font-bold text-md text-slate-500">{author.role}</div>
              </div>
            </div>

            <div className="text-md text-slate-700">{author.description}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
