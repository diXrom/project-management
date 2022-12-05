import { RefObject } from 'react';

interface ViewportOptions {
  root?: RefObject<Element>;
  once?: boolean;
  margin?: string;
  amount?: 'some' | 'all' | number;
  fallback?: boolean;
}

const viewport: ViewportOptions = { once: true };
const motionSettings = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport,
};
const motionVariants = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
};

const fade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};
const imgAnimation = {
  hidden: { filter: 'blur(3px)' },
  visible: {
    filter: 'blur(0)',
    transition: { duration: 0.3 },
  },
};

export { fade, motionSettings, imgAnimation, motionVariants };
