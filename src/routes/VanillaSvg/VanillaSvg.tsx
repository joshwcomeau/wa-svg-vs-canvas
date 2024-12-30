import React from 'react';

import { range, normalize, random } from '../../utils';
import useWindowDimensions from '../../hooks/use-window-dimensions';

import ControlPanel from '../../components/ControlPanel';
import { StateContext } from '../../components/StateProvider';

function ReactSvg() {
  const ref = React.useRef(null);
  const elems = React.useRef<Record<string, SVGElement>>({});
  const { density, sensitivity, jitter } =
    React.useContext(StateContext);

  const windowDimensions = useWindowDimensions({ throttleBy: 25 });

  const relevantDimension = Math.min(
    windowDimensions.width,
    windowDimensions.height
  );

  const innerSize = relevantDimension - 64;

  const scaledJitter = jitter * (200 / innerSize);

  React.useEffect(() => {
    function handleMove(event: any) {
      for (let rowIndex = 0; rowIndex <= density; rowIndex++) {
        for (let colIndex = 0; colIndex <= density; colIndex++) {
          const id = `${rowIndex}-${colIndex}`;
          const elem = elems.current[id];
          if (!elem) {
            continue;
          }

          const xJitter = random(-scaledJitter, scaledJitter);
          const yJitter = random(-scaledJitter, scaledJitter);

          const cx =
            normalize(rowIndex, 0, density, 0, 200) +
            normalize(
              event.clientX,
              0,
              window.innerWidth,
              -sensitivity,
              sensitivity
            ) +
            xJitter;
          const cy =
            normalize(colIndex, 0, density, 0, 200) +
            normalize(
              event.clientY,
              0,
              window.innerHeight,
              -sensitivity,
              sensitivity
            ) +
            yJitter;

          elem.setAttribute('cx', String(cx));
          elem.setAttribute('cy', String(cy));
        }
      }
    }
    window.addEventListener('pointermove', handleMove);

    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, [density, sensitivity, scaledJitter]);

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
            const id = `${rowIndex}-${colIndex}`;
            return (
              <circle
                key={id}
                cx={normalize(rowIndex, 0, density, 0, 200)}
                cy={normalize(colIndex, 0, density, 0, 200)}
                ref={(elem) => {
                  // @ts-expect-error fsck this oppressive ESLint config
                  elems.current[id] = elem;
                }}
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
