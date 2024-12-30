import { Link } from 'react-router';
import styled from 'styled-components';

function App() {
  return (
    <Main>
      <h1>Canvas vs. SVG performance test</h1>
      <p>
        Thanks for helping me figure out the real-world differences
        between 2D canvas and SVG!
      </p>
      <h2>Instructions</h2>
      <Mouse>
        For each page linked below, move your mouse across the screen.
        This should create a bunch of red circles that respond to your
        cursor position.
      </Mouse>

      <Touch>
        For each page linked below, drag your finger across the
        screen. This should create a bunch of red circles that respond
        to touch.
      </Touch>
      <p>
        Drag the "Density" slider until it starts to feel laggy. Let
        me know what the density was for each page.
      </p>

      <ul>
        <li>
          <Link to="/goose">Test 1: Codename Goose</Link>
        </li>
        <li>
          <Link to="/toucan">Test 2: Codename Toucan</Link>
        </li>
      </ul>
    </Main>
  );
}

const Main = styled.main`
  max-width: 38rem;
  margin-inline: auto;
  color: white;
  padding: 32px;

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  h2 {
    font-size: 1.325rem;
    margin-top: 3rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1em;
  }

  ul {
    margin-top: 3rem;
  }
`;

const Mouse = styled.p`
  @media (pointer: coarse) {
    display: none;
  }
`;
const Touch = styled.p`
  display: none;
  @media (pointer: coarse) {
    display: block;
  }
`;

export default App;
