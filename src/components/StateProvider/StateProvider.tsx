/* eslint-disable */
import * as React from 'react';

import { NUMROWS, NUMCOLS, MOUSE_ADJUST } from '../../constants';

export const StateContext = React.createContext({
  numRows: NUMROWS,
  numCols: NUMCOLS,
  mouseAdjust: MOUSE_ADJUST,
  setNumRows: (_: number) => {},
  setNumCols: (_: number) => {},
  setMouseAdjust: (_: number) => {},
});

function StateProvider({ children }: { children: React.ReactNode }) {
  const [numRows, setNumRows] = React.useState(NUMROWS);
  const [numCols, setNumCols] = React.useState(NUMCOLS);
  const [mouseAdjust, setMouseAdjust] = React.useState(MOUSE_ADJUST);

  return (
    <StateContext.Provider
      value={{
        numRows,
        numCols,
        mouseAdjust,
        setNumRows,
        setNumCols,
        setMouseAdjust,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export default StateProvider;
