import styled from 'styled-components';

const VisuallyHidden = ({ children, ...delegated }: any) => {
  return <Wrapper {...delegated}>{children}</Wrapper>;
};

const Wrapper = styled.span`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
`;

export default VisuallyHidden;
