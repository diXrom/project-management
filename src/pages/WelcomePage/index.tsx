import { motion } from 'framer-motion';
import { fade, motionVariants } from 'shared/common/styles';

import HeroSection from './ui/HeroSection';
import OurTeam from './ui/OurTeam';
import Functionality from './ui/Functionality';
import Features from './ui/Features';
import { Navigate } from 'react-router-dom';
import { ROUTE_PATH } from 'shared/common/constants';
import { getToken } from 'shared/common/utils';

const MainPage = () => {
  if (getToken()) return <Navigate to={ROUTE_PATH.BOARDS} />;

  return (
    <motion.div variants={fade} {...motionVariants}>
      <HeroSection />
      <Functionality />
      <Features />
      <OurTeam />
    </motion.div>
  );
};

export default MainPage;
