
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeMainPage from './pages/Home';
import AuthCallback from './pages/AuthCallback';
import SelectRepo from './pages/ShowRepo';
import SelectFiles from './pages/SelectFiles';
import Contact from './pages/Contact';
import ScrollTop from './pages/ScrollTop';
import Footer from './pages/Footer';
import ProtectedLoginRoute from './components/Protectedroutes/ProtectedLoginRoute';

function App() {
  return (
    <div className="p relative">
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomeMainPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route element={<ProtectedLoginRoute />}>
            <Route path="/select-repo" element={<SelectRepo />} />
            <Route path="/select-files" element={<SelectFiles />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
