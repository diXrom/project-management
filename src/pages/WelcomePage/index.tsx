import { motion } from 'framer-motion';
import { fade, motionVariants } from 'shared/common/styles';

import HeroSection from './ui/HeroSection';

const MainPage = () => {
  return (
    <motion.div variants={fade} {...motionVariants}>
      <HeroSection />
    </motion.div>
  );
};

export default MainPage;
