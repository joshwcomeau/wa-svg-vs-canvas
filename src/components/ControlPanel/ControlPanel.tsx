import * as React from 'react';
import styled from 'styled-components';

import { StateContext } from '../StateProvider';

function ControlPanel() {
  const {
    density,
    sensitivity,
    jitter,
    setDensity,
    setSensitivity,
    setJitter,
  } = React.useContext(StateContext);
  // const id = React.useId();

  return (
    <Wrapper>
      <Control>
        <Header>
          Density
          <Value>{density}</Value>
        </Header>
        <input
          type="range"
          value={density}
          min={10}
          max={200}
          step={10}
          onChange={(ev) => {
            setDensity(Number(ev.target.value));
          }}
        />
      </Control>
      <Control>
        <Header>
          Sensitivity
          <Value>{sensitivity}</Value>
        </Header>
        <input
          type="range"
          value={sensitivity}
          min={1}
          max={60}
          onChange={(ev) => {
            setSensitivity(Number(ev.target.value));
          }}
        />
      </Control>
      <Control>
        <Header>
          Jitter
          <Value>{jitter}</Value>
        </Header>
        <input
          type="range"
          value={jitter}
          min={0}
          max={5}
          step={0.1}
          onChange={(ev) => {
            setJitter(Number(ev.target.value));
          }}
        />
      </Control>
      {/* <Control as="div">
        <Header>Random Colors</Header>
        <Row>
          {[true, false].map((value) => (
            <Cell key={String(value)}>
              <input
                type="radio"
                id={`${id}-${String(value)}`}
                value={String(value)}
                checked={enableRandomColors === value}
                onChange={() => {
                  setEnableRandomColors(value);
                }}
              />
              <Label htmlFor={`${id}-${String(value)}`}>
                {String(value)}
              </Label>
            </Cell>
          ))}
        </Row>
      </Control> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  border-radius: 8px;
  background: hsl(210deg 10% 16%);
  color: white;
  touch-action: none;
  user-select: none;

  @media (max-width: 38rem) {
    right: 8px;
  }
`;

const Control = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 32px;
`;
const Value = styled.span`
  font-size: 0.875rem;
`;

// const Row = styled.div`
//   display: flex;
//   gap: 32px;
// `;
// const Cell = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
// `;
// const Label = styled.label`
//   font-size: 0.875rem;
// `;

export default ControlPanel;
