import { Analytics } from '@vercel/analytics/react';
import { ROUTES } from './config/routes';
import LanguageProvider from './i18n/LanguageProvider';
import CaseServeOps from './pages/CaseServeOps';
import Home from './pages/Home';

const normalize = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path);

const App = () => {
  const path = normalize(window.location.pathname.toLowerCase());

  return (
    <LanguageProvider>
      {path === ROUTES.serveops ? <CaseServeOps /> : <Home />}
      <Analytics />
    </LanguageProvider>
  );
};

export default App;
