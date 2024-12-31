//
// TEST: GOOSE
//
import React from 'react';
import styled from 'styled-components';

import { range, normalize, random } from '../../utils';
import useInnerSize from '../../hooks/use-inner-size';

import ControlPanel from '../../components/ControlPanel';
import { StateContext } from '../../components/StateProvider';

function ReactSvg() {
  const ref = React.useRef(null);
  const { density, sensitivity, jitter } =
    React.useContext(StateContext);

  const [mousePosition, setMousePosition] = React.useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const innerSize = useInnerSize();

  const scaledJitter = jitter * (200 / innerSize);
  const scaledSensitivity = sensitivity * (200 / innerSize) * 1.5;

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
      <h1>Goose</h1>
      <Wrapper>
        <Svg
          style={{
            width: innerSize,
            height: innerSize,
          }}
          ref={ref}
          viewBox="0 0 200 200"
        >
          {range(density).map((rowIndex) =>
            range(density).map((colIndex) => {
              const xJitter = random(-scaledJitter, scaledJitter, {
                rounded: false,
              });
              const yJitter = random(-scaledJitter, scaledJitter, {
                rounded: false,
              });
              return (
                <circle
                  key={`${rowIndex}-${colIndex}`}
                  cx={
                    normalize(rowIndex, 0, density, 0, 200) +
                    normalize(
                      mousePosition.x,
                      0,
                      window.innerWidth,
                      -scaledSensitivity,
                      scaledSensitivity
                    ) +
                    xJitter
                  }
                  cy={
                    normalize(colIndex, 0, density, 0, 200) +
                    normalize(
                      mousePosition.y,
                      0,
                      window.innerHeight,
                      -scaledSensitivity,
                      scaledSensitivity
                    ) +
                    yJitter +
                    16 * (200 / innerSize)
                  }
                  r={(200 / density) * 0.4}
                  fill="red"
                />
              );
            })
          )}
        </Svg>
      </Wrapper>
      <ControlPanel />
    </>
  );
}

const Svg = styled.svg`
  display: block;
  touch-action: none;
`;

const Wrapper = styled.div`
  border: 3px solid red;
  width: fit-content;
  height: fit-content;
  border-radius: 5px;
`;

export default ReactSvg;
