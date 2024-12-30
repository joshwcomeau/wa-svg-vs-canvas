import React from 'react';

import { normalize, random } from '../../utils';
import useWindowDimensions from '../../hooks/use-window-dimensions';
import ControlPanel from '../../components/ControlPanel';
import { StateContext } from '../../components/StateProvider';

function ReactCanvas() {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const { density, sensitivity, jitter } =
    React.useContext(StateContext);

  const windowDimensions = useWindowDimensions({ throttleBy: 25 });

  const relevantDimension = Math.min(
    windowDimensions.width,
    windowDimensions.height
  );

  const devicePixelRatio = window.devicePixelRatio || 1;
  const innerSize = relevantDimension - 64;

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

        context.scale(devicePixelRatio, devicePixelRatio);
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'red';

      for (let rowIndex = 0; rowIndex <= density; rowIndex++) {
        for (let colIndex = 0; colIndex <= density; colIndex++) {
          context.beginPath();
          const xJitter = random(-jitter, jitter);
          const yJitter = random(-jitter, jitter);

          const cx =
            normalize(rowIndex, 0, density, 0, innerSize) +
            normalize(
              event.clientX,
              0,
              innerSize,
              -sensitivity * 2,
              sensitivity * 2
            ) +
            xJitter;
          const cy =
            normalize(colIndex, 0, density, 0, innerSize) +
            normalize(
              event.clientY,
              0,
              innerSize,
              -sensitivity * 2,
              sensitivity * 2
            ) +
            yJitter;

          context.arc(
            cx,
            cy,
            (innerSize / density) * 0.4,
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
      context?.scale(
        1 / window.devicePixelRatio,
        1 / window.devicePixelRatio
      );
    };
  }, [density, sensitivity, jitter, devicePixelRatio, innerSize]);

  return (
    <>
      <canvas
        ref={ref}
        style={{
          display: 'block',
          width: innerSize,
          height: innerSize,
        }}
        width={innerSize * devicePixelRatio}
        height={innerSize * devicePixelRatio}
      />
      <ControlPanel />
    </>
  );
}

export default ReactCanvas;
