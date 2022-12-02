import { useEffect, useState } from 'react';

const useScrollY = () => {
  const isBrowser = typeof window !== 'undefined';

  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = () => {
    const currentScrollY = isBrowser ? window.scrollY : 0;
    if (currentScrollY >= 0 && currentScrollY <= 200) {
      setScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  console.log(scrollY);
  return scrollY;
};

export default useScrollY;
