import React, { memo, lazy, Suspense } from 'react';
import { ClipLoader } from 'react-spinners';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = lazy(() => import('./components/Header'));
const Main = lazy(() => import('./components/Main'));
const Footer = lazy(() => import('./components/Footer'));

const App: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <ClipLoader
            color="#000"
            size={100}
          />
        </div>
      }
    >
      <div style={{ minWidth: '400px' }}>
        <Header />
        <Main />
        <Footer />
      </div>
    </Suspense>
  );
};

export default memo(App);
