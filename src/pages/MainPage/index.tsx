import { motion } from 'framer-motion';

import { fade, motionVariants } from 'shared/common/styles';

const MainPage = () => {
  return (
    <motion.div variants={fade} {...motionVariants}>
      MainPage
    </motion.div>
  );
};

export default MainPage;
