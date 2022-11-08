import { motion } from 'framer-motion';
import { fade, motionVariants } from 'shared/common/styles';

const Registration = () => {
  return (
    <motion.div variants={fade} {...motionVariants}>
      Registration
    </motion.div>
  );
};

export default Registration;
