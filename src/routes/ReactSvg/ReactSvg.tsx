import React from 'react';

import { range, normalize, random } from '../../utils';
import useWindowDimensions from '../../hooks/use-window-dimensions';

import ControlPanel from '../../components/ControlPanel';
import { StateContext } from '../../components/StateProvider';

function ReactSvg() {
  const ref = React.useRef(null);
  const { density, sensitivity, jitter } =
    React.useContext(StateContext);

  const [mousePosition, setMousePosition] = React.useState({
    x: 0,
    y: 0,
  });

  const windowDimensions = useWindowDimensions({ throttleBy: 25 });

  const relevantDimension = Math.min(
    windowDimensions.width,
    windowDimensions.height
  );

  const innerSize = relevantDimension - 64;

  const scaledJitter = jitter * (200 / innerSize);

  React.useEffect(() => {
    function handleMove(event: any) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
    window.addEventListener('pointermove', handleMove);

    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, []);

  return (
    <>
      <svg
        style={{
          display: 'block',
          width: innerSize,
          height: innerSize,
        }}
        ref={ref}
        viewBox="0 0 200 200"
      >
        {range(density).map((rowIndex) =>
          range(density).map((colIndex) => {
            const xJitter = random(-scaledJitter, scaledJitter);
            const yJitter = random(-scaledJitter, scaledJitter);
            return (
              <circle
                cx={
                  normalize(rowIndex, 0, density, 0, 200) +
                  normalize(
                    mousePosition.x,
                    0,
                    window.innerWidth,
                    -sensitivity,
                    sensitivity
                  ) +
                  xJitter
                }
                cy={
                  normalize(colIndex, 0, density, 0, 200) +
                  normalize(
                    mousePosition.y,
                    0,
                    window.innerHeight,
                    -sensitivity,
                    sensitivity
                  ) +
                  yJitter
                }
                r={(200 / density) * 0.4}
                fill="red"
              />
            );
          })
        )}
      </svg>
      <ControlPanel />
    </>
  );
}

export default ReactSvg;
