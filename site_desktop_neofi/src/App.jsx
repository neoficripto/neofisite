import styles from './App.module.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import { useState, useEffect, lazy, Suspense } from 'react';
import { supabase } from './lib/supaBaseClient';
import AppErrorBoundary from './components/AppErrorBoundary/AppErrorBoundary';
import PageLoader from './components/PageLoader/PageLoader';

import { initMercadoPago } from '@mercadopago/sdk-react';
const mercadoPagoPublicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;
if (mercadoPagoPublicKey) {
  initMercadoPago(mercadoPagoPublicKey, { locale: 'pt-BR' });
}

const Home = lazy(() => import('./pages/Home/Home'));
const NeoLine = lazy(() => import('./pages/NeoLine').then((m) => ({ default: m.NeoLine })));
const NeoBoost = lazy(() => import('./pages/NeoBoost').then((m) => ({ default: m.NeoBoost })));
const NeoYield = lazy(() => import('./pages/NeoYield').then((m) => ({ default: m.NeoYield })));
const Contato = lazy(() => import('./pages/Contato').then((m) => ({ default: m.Contato })));
const QuemSomos = lazy(() => import('./pages/QuemSomos'));
const Privacidade = lazy(() => import('./pages/Privacidade').then((m) => ({ default: m.Privacidade })));
const Termos = lazy(() => import('./pages/Termos').then((m) => ({ default: m.Termos })));
const Login = lazy(() => import('./pages/Login/Login'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
}

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // 1. Check active session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <div className={styles.fullBackground}>
        <Header session={session}></Header>
        <ScrollToTop />

        <AppErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path='/' element={<Home session={session}/>} />
              <Route path='/neoline' element={<NeoLine />} />
              <Route path='/neoboost' element={<NeoBoost />} />
              <Route path='/neoyield' element={<NeoYield />} />
              <Route path='/contato' element={<Contato />} />
              <Route path='/privacidade' element={<Privacidade />} />
              <Route path='/termos' element={<Termos />} />

              <Route path='/Neoline' element={<Navigate to="/neoline" replace />} />
              <Route path='/NeoLine' element={<Navigate to="/neoline" replace />} />
              <Route path='/Neoboost' element={<Navigate to="/neoboost" replace />} />
              <Route path='/NeoBoost' element={<Navigate to="/neoboost" replace />} />
              <Route path='/Neoyield' element={<Navigate to="/neoyield" replace />} />
              <Route path='/NeoYield' element={<Navigate to="/neoyield" replace />} />
              <Route path='/Contato' element={<Navigate to="/contato" replace />} />

              <Route path='/quem-somos' element={<QuemSomos />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
        </AppErrorBoundary>
      </div>
    </>
  )
}

export default App
