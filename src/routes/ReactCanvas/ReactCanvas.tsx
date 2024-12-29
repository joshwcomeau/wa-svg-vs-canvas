import React from 'react';

import { normalize, random } from '../../utils';
import ControlPanel from '../../components/ControlPanel';
import { StateContext } from '../../components/StateProvider';

function ReactCanvas() {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const { numRows, numCols, mouseAdjust } =
    React.useContext(StateContext);

  React.useEffect(() => {
    let context: CanvasRenderingContext2D | null = null;

    function handleMove(event: any) {
      const canvas = ref.current;

      if (!canvas) {
        return;
      }

      if (!context) {
        context = canvas.getContext('2d');
        if (!context) {
          // Stupid TS
          return;
        }
        const devicePixelRatio = window.devicePixelRatio || 1;

        context.scale(devicePixelRatio, devicePixelRatio);
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'red';

      for (let rowIndex = 0; rowIndex <= numRows; rowIndex++) {
        for (let colIndex = 0; colIndex <= numCols; colIndex++) {
          context.beginPath();
          const xJitter = random(
            -mouseAdjust * 0.07,
            mouseAdjust * 0.07
          );
          const yJitter = random(
            -mouseAdjust * 0.07,
            mouseAdjust * 0.07
          );
          const cx =
            normalize(rowIndex, 0, numRows, 0, window.innerWidth) +
            normalize(
              event.clientX,
              0,
              window.innerHeight,
              -mouseAdjust * 2,
              mouseAdjust * 2
            ) +
            xJitter;
          const cy =
            normalize(colIndex, 0, numCols, 0, window.innerWidth) +
            normalize(
              event.clientY,
              0,
              window.innerHeight,
              -mouseAdjust * 2,
              mouseAdjust * 2
            ) +
            yJitter;

          context.arc(
            cx,
            cy,
            (window.innerHeight / numRows) * 0.4,
            0,
            Math.PI * 2
          );
          context.fill();
          context.closePath();
        }
      }
    }

    window.addEventListener('pointermove', handleMove);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      context?.scale(1 / devicePixelRatio, 1 / devicePixelRatio);
    };
  }, [numRows, numCols, mouseAdjust]);

  const devicePixelRatio = window.devicePixelRatio || 1;

  return (
    <>
      <canvas
        ref={ref}
        style={{
          display: 'block',
          width: window.innerHeight - 64,
          height: window.innerHeight - 64,
        }}
        width={(window.innerHeight - 64) * devicePixelRatio}
        height={(window.innerHeight - 64) * devicePixelRatio}
      />
      <ControlPanel />
    </>
  );
}

export default ReactCanvas;
