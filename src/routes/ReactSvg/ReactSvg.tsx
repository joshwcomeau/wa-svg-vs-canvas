import React from 'react';

import { range, normalize } from '../../utils';
import ControlPanel from '../../components/ControlPanel';
import { StateContext } from '../../components/StateProvider';

function ReactSvg() {
  const ref = React.useRef(null);
  const { numRows, numCols, mouseAdjust } =
    React.useContext(StateContext);

  const [mousePosition, setMousePosition] = React.useState({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    function handleMove(event: any) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

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
          range(numCols).map((colIndex) => (
            <circle
              cx={
                normalize(rowIndex, 0, numRows, 0, 200) +
                normalize(
                  mousePosition.x,
                  0,
                  window.innerWidth,
                  -mouseAdjust,
                  mouseAdjust
                )
              }
              cy={
                normalize(colIndex, 0, numCols, 0, 200) +
                normalize(
                  mousePosition.y,
                  0,
                  window.innerHeight,
                  -mouseAdjust,
                  mouseAdjust
                )
              }
              r={(200 / numRows) * 0.4}
              fill="red"
            />
          ))
        )}
      </svg>
      <ControlPanel />
    </>
  );
}

export default ReactSvg;
