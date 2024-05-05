import { useState, useEffect } from 'react';

function getWidthDimensions() {
  const { innerWidth: width  } = window;
  return {
    width
  };
}

export default function useWidthDimensions() {
  const [widthDimensions, setWidthDimensions] = useState(getWidthDimensions());

  useEffect(() => {
    function handleResize() {
      setWidthDimensions(getWidthDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return widthDimensions;
}