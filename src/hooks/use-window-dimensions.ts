/*
  This hook works just like `use-window-dimensions`, but it is NOT SSR SAFE. It assumes that it’s called inside a component which is rendered for the first time on the client (eg. inside <ClientOnly>). This hook is useful because it produces a value immediately, avoiding a pointless re-render / flash of empty content.
*/
import React from 'react';

import { throttle } from '../utils';

const useWindowDimensions = ({
  throttleBy = 100,
}: { throttleBy?: number } = {}) => {
  const [windowDimensions, setWindowDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
    clientWidth: document.documentElement.clientWidth,
  });

  React.useEffect(() => {
    const calculatorElement = document.createElement('div');
    calculatorElement.style.fontSize = '1rem';

    document.body.appendChild(calculatorElement);

    const fontSize = parseFloat(
      window.getComputedStyle(calculatorElement).fontSize
    );

    const ratio = 16 / fontSize;

    setWindowDimensions({
      width: window.innerWidth * ratio,
      height: window.innerHeight * ratio,
      clientWidth: document.documentElement.clientWidth * ratio,
    });

    const handleResize = throttle(() => {
      setWindowDimensions({
        width: window.innerWidth * ratio,
        height: window.innerHeight * ratio,
        clientWidth: document.documentElement.clientWidth * ratio,
      });
    }, throttleBy);

    window.addEventListener('resize', handleResize);

    return () => {
      document.body.removeChild(calculatorElement);
      window.removeEventListener('resize', handleResize);
    };
  }, [throttleBy]);

  return windowDimensions;
};

export default useWindowDimensions;
