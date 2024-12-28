import React from 'react';

import { normalize } from '../../utils';

const NUMROWS = 50;
const NUMCOLS = 50;

function ReactCanvas() {
  const ref = React.useRef<HTMLCanvasElement>(null);

  // const { style, width, height } = React.useMemo(() => {
  //   return getScaledCanvasProps(
  //     window.innerWidth,
  //     window.innerHeight,
  //     context
  //   );
  // }, [context]);

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

      for (let rowIndex = 0; rowIndex <= NUMROWS; rowIndex++) {
        for (let colIndex = 0; colIndex <= NUMCOLS; colIndex++) {
          context.beginPath();
          const cx =
            normalize(rowIndex, 0, NUMROWS, 0, window.innerWidth) +
            normalize(event.clientX, 0, window.innerWidth, -5, 5);
          const cy =
            normalize(colIndex, 0, NUMCOLS, 0, window.innerWidth) +
            normalize(event.clientY, 0, window.innerWidth, -5, 5);

          context.arc(cx, cy, 5, 0, Math.PI * 2);
          context.fill();
          context.closePath();
        }
      }
    }

    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  const devicePixelRatio = window.devicePixelRatio || 1;

  return (
    <canvas
      ref={ref}
      style={{
        display: 'block',
        width: window.innerWidth,
        height: window.innerWidth,
      }}
      width={window.innerWidth * devicePixelRatio}
      height={window.innerWidth * devicePixelRatio}
    />
  );
}

const getScaledCanvasProps = (width, height, ctx) => {
  if (!ctx) {
    return { style: {}, width: undefined, height: undefined };
  }

  const devicePixelRatio = window.devicePixelRatio || 1;

  ctx.scale(devicePixelRatio, devicePixelRatio);

  return {
    style: {
      width,
      height,
    },
    width: width * devicePixelRatio,
    height: height * devicePixelRatio,
  };
};

export default ReactCanvas;
