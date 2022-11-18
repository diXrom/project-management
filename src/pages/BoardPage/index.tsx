import { motion } from 'framer-motion';
import { fade, motionVariants } from 'shared/common/styles';
import Panel from './ui/Panel';
import { useParams } from 'react-router-dom';

export default function BoardPage() {
  const { boardId } = useParams();

  return (
    <motion.div variants={fade} {...motionVariants}>
      <Panel />
    </motion.div>
  );
}
