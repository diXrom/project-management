import { motion } from 'framer-motion';
import { fade, motionVariants } from 'shared/common/styles';

const Login = () => {
  return (
    <motion.div variants={fade} {...motionVariants}>
      Login
    </motion.div>
  );
};

export default Login;
