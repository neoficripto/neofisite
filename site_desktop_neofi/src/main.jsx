import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

const resolveBasename = () => {
  if (typeof window === 'undefined') return '';
  const pathname = window.location.pathname || '/';
  const normalized = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  const knownRoutes = [
    '/',
    '/neoline',
    '/neoboost',
    '/neoyield',
    '/login',
    '/signup',
    '/quem-somos',
    '/Neoline',
    '/Neoboost',
    '/Neoyield',
    '/NeoLine',
    '/NeoBoost',
    '/NeoYield',
  ];

  for (const route of knownRoutes) {
    if (route === '/') {
      continue;
    }
    if (normalized.endsWith(route)) {
      const base = normalized.slice(0, normalized.length - route.length);
      return base || '';
    }
  }

  if (normalized === '/') return '';
  if (normalized.endsWith('/')) return normalized.slice(0, -1);
  return '';
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={resolveBasename()}>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
