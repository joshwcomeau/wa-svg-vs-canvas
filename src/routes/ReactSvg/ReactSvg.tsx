import React from 'react';

import { range, normalize } from '../../utils';

const NUMROWS = 50;
const NUMCOLS = 50;

function ReactSvg() {
  const ref = React.useRef(null);
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
          width: '100svw',
          height: '100svh',
        }}
        ref={ref}
        viewBox="0 0 200 200"
      >
        {range(NUMROWS).map((rowIndex) =>
          range(NUMCOLS).map((colIndex) => (
            <circle
              cx={
                normalize(rowIndex, 0, NUMROWS, 0, 200) +
                normalize(
                  mousePosition.x,
                  0,
                  window.innerWidth,
                  -5,
                  5
                )
              }
              cy={
                normalize(colIndex, 0, NUMCOLS, 0, 200) +
                normalize(
                  mousePosition.y,
                  0,
                  window.innerWidth,
                  -5,
                  5
                )
              }
              r={1}
              fill="red"
            />
          ))
        )}
      </svg>
    </>
  );
}

export default ReactSvg;
