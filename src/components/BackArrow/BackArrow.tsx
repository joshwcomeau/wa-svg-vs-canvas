import * as React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import { ArrowLeft } from 'lucide-react';

import VisuallyHidden from '../VisuallyHidden';

function BackArrow() {
  return (
    <Wrapper to="/">
      <ArrowLeft />
      <VisuallyHidden>Return home</VisuallyHidden>
    </Wrapper>
  );
}
const Wrapper = styled(Link)`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  padding: 16px;
  color: white;
  opacity: 0.67;

  &:hover {
    opacity: 1;
  }
`;

export default BackArrow;
