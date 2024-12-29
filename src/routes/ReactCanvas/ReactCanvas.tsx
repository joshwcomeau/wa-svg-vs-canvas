import React from 'react';

import { normalize } from '../../utils';
import { NUMCOLS, NUMROWS, MOUSE_ADJUST } from '../../constants';

function ReactCanvas() {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    let context: CanvasRenderingContext2D | null = null;

    function handleMove(event: any) {
      const canvas = ref.current;

      if (!canvas) {
        return;
      }

      if (!context) {
        context = canvas.getContext('2d');
      }
      if (!context) {
        // Stupid TS
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'red';

      for (let rowIndex = 0; rowIndex <= NUMROWS; rowIndex++) {
        for (let colIndex = 0; colIndex <= NUMCOLS; colIndex++) {
          context.beginPath();
          const cx =
            normalize(rowIndex, 0, NUMROWS, 0, window.innerWidth) +
            normalize(
              event.clientX,
              0,
              window.innerHeight,
              -MOUSE_ADJUST * 2,
              MOUSE_ADJUST * 2
            );
          const cy =
            normalize(colIndex, 0, NUMCOLS, 0, window.innerWidth) +
            normalize(
              event.clientY,
              0,
              window.innerHeight,
              -MOUSE_ADJUST * 2,
              MOUSE_ADJUST * 2
            );

          context.arc(cx, cy, 7, 0, Math.PI * 2);
          context.fill();
          context.closePath();
        }
      }
    }

    window.addEventListener('pointermove', handleMove);

    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, []);

  const devicePixelRatio = window.devicePixelRatio || 1;

  return (
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
  );
}

export default ReactCanvas;
