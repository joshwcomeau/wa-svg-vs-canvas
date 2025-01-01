import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App';
import StateProvider from './components/StateProvider';
import BackArrow from './components/BackArrow';
import ReactCanvas from './routes/ReactCanvas/';
import ReactSvg from './routes/ReactSvg/';
import VanillaSvg from './routes/VanillaSvg/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StateProvider>
        <Routes>
          <Route
            path="/goose"
            element={
              <>
                <BackArrow />
                <ReactSvg />
              </>
            }
          />
          <Route
            path="/toucan"
            element={
              <>
                <BackArrow />
                <ReactCanvas />
              </>
            }
          />
          <Route
            path="/puffin"
            element={
              <>
                <BackArrow />
                <VanillaSvg />
              </>
            }
          />
          <Route path="/" element={<App />} />
        </Routes>
      </StateProvider>
    </BrowserRouter>
  </StrictMode>
);
