import { motion } from 'framer-motion';
import { fade, motionVariants } from 'shared/common/styles';

import HeroSection from './ui/HeroSection';
import OurTeam from './ui/OurTeam';
import Functionality from './ui/Functionality';

const MainPage = () => {
  return (
    <motion.div variants={fade} {...motionVariants}>
      <HeroSection />
      <Functionality />
      <OurTeam />
    </motion.div>
  );
};

export default MainPage;
