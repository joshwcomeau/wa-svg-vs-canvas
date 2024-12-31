//
// TEST: TOUCAN
//
import React from 'react';
import styled from 'styled-components';

import { normalize, random } from '../../utils';
import useInnerSize from '../../hooks/use-inner-size';

import ControlPanel from '../../components/ControlPanel';
import { StateContext } from '../../components/StateProvider';

function ReactCanvas() {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const { density, sensitivity, jitter } =
    React.useContext(StateContext);

  const devicePixelRatio = window.devicePixelRatio || 1;
  const innerSize = useInnerSize();

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
          const xJitter = random(-jitter, jitter, { rounded: false });
          const yJitter = random(-jitter, jitter, { rounded: false });

          const cx =
            normalize(rowIndex, 0, density, 0, innerSize) +
            normalize(
              event.clientX,
              0,
              innerSize * devicePixelRatio,
              -sensitivity * 2,
              sensitivity * 2
            ) +
            xJitter;
          const cy =
            normalize(colIndex, 0, density, 0, innerSize) +
            normalize(
              event.clientY,
              0,
              innerSize * devicePixelRatio,
              -sensitivity * 2,
              sensitivity * 2
            ) +
            yJitter +
            32;

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

    handleMove({
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2,
    });

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
      <h1>Toucan</h1>

      <Wrapper>
        <Canvas
          ref={ref}
          style={{
            width: innerSize,
            height: innerSize,
          }}
          width={innerSize * devicePixelRatio}
          height={innerSize * devicePixelRatio}
        />
      </Wrapper>
      <ControlPanel />
    </>
  );
}

const Canvas = styled.canvas`
  display: block;
  touch-action: none;
`;

const Wrapper = styled.div`
  border: 3px solid red;
  width: fit-content;
  height: fit-content;
  border-radius: 5px;
`;

export default ReactCanvas;
