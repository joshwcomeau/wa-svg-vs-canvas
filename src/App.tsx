import { Link } from 'react-router';

function App() {
  return (
    <main>
      <ul>
        <li>
          <Link to="/react-canvas">React Canvas test</Link>
        </li>
        <li>
          <Link to="/react-svg">React Svg test</Link>
        </li>
        <li>
          <Link to="/vanilla-svg">Vanilla Svg test</Link>
        </li>
      </ul>
    </main>
  );
}

export default App;
