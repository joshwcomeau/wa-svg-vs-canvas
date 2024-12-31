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
        The red circles should respond to your cursor position.
      </Mouse>

      <Touch>
        For each page linked below, drag your finger across the
        screen, within the red box. The red circles should respond to
        your touch, following your finger.
      </Touch>
      <p>
        The "Density" slider will increase the number of red circles
        in the box. Your mission is to figure out the maximum density
        before it starts to feel laggy. Tweak the "Density" value
        until there is a noticeable performance dip, and then let me
        know what the Density value is, for each test.
      </p>

      <ul>
        <li>
          <Link to="/goose">Test 1: Codename Goose</Link>
        </li>
        <li>
          <Link to="/toucan">Test 2: Codename Toucan</Link>
        </li>
        <li>
          <Link to="/puffin">Test 3: Codename Puffin</Link>
        </li>
      </ul>

      <p>
        You can use the other controls, <i>Sensitivity</i> and{' '}
        <i>Jitter</i>, to help you evaluate smoothness.
      </p>
      <p>
        It can be hard to tell exactly where the smoothness stops.
        Don’t worry too much about whether it’s 110 or 120. I’m trying
        to get a big-picture idea, so approximate values are fine.
      </p>
    </Main>
  );
}

const Main = styled.main`
  max-width: 38rem;
  margin-inline: auto;
  color: white;
  padding-top: 32px;
  padding-bottom: 128px;

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: left;
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
    margin-block: 3rem;

    li {
      margin-bottom: 0.5rem;
    }
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
