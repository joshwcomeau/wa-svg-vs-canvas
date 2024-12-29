import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App';
import ReactCanvas from './routes/ReactCanvas/';
import ReactSvg from './routes/ReactSvg/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/react-canvas" element={<ReactCanvas />} />
        <Route path="/react-svg" element={<ReactSvg />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
