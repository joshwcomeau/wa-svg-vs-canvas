import React from 'react';

import { range, normalize } from '../../utils';
import ControlPanel from '../../components/ControlPanel';
import { StateContext } from '../../components/StateProvider';

function ReactSvg() {
  const ref = React.useRef(null);
  const elems = React.useRef<Record<string, SVGElement>>({});
  const { numRows, numCols, mouseAdjust } =
    React.useContext(StateContext);

  React.useEffect(() => {
    function handleMove(event: any) {
      for (let rowIndex = 0; rowIndex <= numRows; rowIndex++) {
        for (let colIndex = 0; colIndex <= numCols; colIndex++) {
          const id = `${rowIndex}-${colIndex}`;
          const elem = elems.current[id];
          if (!elem) {
            continue;
          }

          const cx =
            normalize(rowIndex, 0, numRows, 0, 200) +
            normalize(
              event.clientX,
              0,
              window.innerWidth,
              -mouseAdjust,
              mouseAdjust
            );
          const cy =
            normalize(colIndex, 0, numCols, 0, 200) +
            normalize(
              event.clientY,
              0,
              window.innerHeight,
              -mouseAdjust,
              mouseAdjust
            );

          elem.setAttribute('cx', String(cx));
          elem.setAttribute('cy', String(cy));
        }
      }
    }
    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, [numRows, numCols, mouseAdjust]);

  return (
    <>
      <svg
        style={{
          display: 'block',
          width: 'calc(100vh - 64px)',
          height: 'calc(100vh - 64px)',
        }}
        ref={ref}
        viewBox="0 0 200 200"
      >
        {range(numRows).map((rowIndex) =>
          range(numCols).map((colIndex) => {
            const id = `${rowIndex}-${colIndex}`;
            return (
              <circle
                cx={normalize(rowIndex, 0, numRows, 0, 200)}
                cy={normalize(colIndex, 0, numCols, 0, 200)}
                ref={(elem) => {
                  // @ts-expect-error fsck this oppressive ESLint config
                  elems.current[id] = elem;
                }}
                r={(200 / numRows) * 0.4}
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
