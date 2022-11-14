import { motion } from 'framer-motion';
import { fade, motionVariants } from 'shared/common/styles';

import HeroSection from './ui/HeroSection';
import OurTeam from './ui/OurTeam';
import Functionality from './ui/Functionality';
import Features from './ui/Features';

const MainPage = () => {
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
