import * as React from 'react';
import styled from 'styled-components';

import { StateContext } from '../StateProvider';

function ControlPanel() {
  const {
    numRows,
    mouseAdjust,
    setNumRows,
    setNumCols,
    setMouseAdjust,
  } = React.useContext(StateContext);

  return (
    <Wrapper>
      <Control>
        <Header>
          Density
          <Value>{numRows}</Value>
        </Header>
        <input
          type="range"
          value={numRows}
          min={10}
          max={200}
          onChange={(ev) => {
            setNumRows(Number(ev.target.value));
            setNumCols(Number(ev.target.value));
          }}
        />
      </Control>
      <Control>
        <Header>
          Sensitivity
          <Value>{mouseAdjust}</Value>
        </Header>
        <input
          type="range"
          value={mouseAdjust}
          min={1}
          max={60}
          onChange={(ev) => {
            setMouseAdjust(Number(ev.target.value));
          }}
        />
      </Control>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 16px;
  background: hsl(210deg 10% 16%);
  color: white;
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

export default ControlPanel;
