import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HeaderNav from './components/HeaderNav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ManifiestoPage from './pages/ManifiestoPage';
import MethodPage from './pages/MethodPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTopOnNavigate />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <HeaderNav />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/manifiesto" element={<ManifiestoPage />} />
            <Route path="/metodologia" element={<MethodPage />} />
            <Route path="/proyectos" element={<ProjectsPage />} />
            <Route path="/proyectos/:slug" element={<ProjectDetailPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
