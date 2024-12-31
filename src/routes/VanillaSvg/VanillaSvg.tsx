//
// TEST: PUFFIN
//
import React from 'react';
import styled from 'styled-components';

import { range, normalize, random } from '../../utils';
import useInnerSize from '../../hooks/use-inner-size';

import ControlPanel from '../../components/ControlPanel';
import { StateContext } from '../../components/StateProvider';

function ReactSvg() {
  const ref = React.useRef(null);
  const elems = React.useRef<Record<string, SVGElement>>({});
  const { density, sensitivity, jitter } =
    React.useContext(StateContext);

  const innerSize = useInnerSize();

  const scaledJitter = jitter * (200 / innerSize);
  const scaledSensitivity = sensitivity * (200 / innerSize) * 1.5;

  React.useEffect(() => {
    function handleMove(event: any) {
      console.log(event.clientX);
      for (let rowIndex = 0; rowIndex <= density; rowIndex++) {
        for (let colIndex = 0; colIndex <= density; colIndex++) {
          const id = `${rowIndex}-${colIndex}`;
          const elem = elems.current[id];
          if (!elem) {
            continue;
          }

          const xJitter = random(-scaledJitter, scaledJitter, {
            rounded: false,
          });
          const yJitter = random(-scaledJitter, scaledJitter, {
            rounded: false,
          });

          const cx =
            normalize(rowIndex, 0, density, 0, 200) +
            normalize(
              event.clientX,
              0,
              window.innerWidth,
              -scaledSensitivity,
              scaledSensitivity
            ) +
            xJitter;
          const cy =
            normalize(colIndex, 0, density, 0, 200) +
            normalize(
              event.clientY,
              0,
              window.innerHeight,
              -scaledSensitivity,
              scaledSensitivity
            ) +
            yJitter +
            16 * (200 / innerSize);

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
      <h1>Puffin</h1>

      <Wrapper>
        <Svg
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
