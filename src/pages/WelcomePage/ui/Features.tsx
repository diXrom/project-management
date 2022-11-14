import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();

  return (
    <section className="container max-w-screen-xl mb-28">
      <h2 className="text-4xl font-bold text-slate-700 text-center mb-10 ">{t('featTitle')}</h2>

      <iframe
        className="m-auto rounded-lg w-full h-[300px] md:w-[700px] sm:h-[380px]"
        src="https://www.youtube.com/embed/lXA0ATF12JY"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </section>
  );
};

export default Features;
