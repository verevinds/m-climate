import { useEffect, useState } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      const { width, height } = getWindowDimensions();
      const isMobile = width <= 768;

      setIsMobile(isMobile);
      setWindowDimensions({ width, height });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowDimensions, isMobile };
}
