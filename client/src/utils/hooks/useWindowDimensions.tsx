import { useEffect, useState } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  if (!process.browser) return undefined;

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      const { width, height } = getWindowDimensions();
      const isMobileSize = width <= 768;

      setIsMobile(isMobileSize);
      setWindowDimensions({ width, height });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowDimensions, isMobile };
}
