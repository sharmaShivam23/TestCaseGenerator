// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeMainPage from './pages/Home';
import AuthCallback from './pages/AuthCallback';
import SelectRepo from './pages/ShowRepo';
import SelectFiles from './pages/SelectFiles';
import Contact from './pages/Contact';
import ScrollTop from './pages/ScrollTop';
import Lenis from 'lenis'
import Footer from './pages/Footer';
function App() {
  
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
  return (
    <div className="p relative">
    <Router>
      <ScrollTop/>
      <Routes>
        <Route path="/" element={<HomeMainPage />} />
         <Route path="/auth/callback" element={<AuthCallback />} />
         {/* <Route path="/showRepo" element={<AuthCallback />} /> */}
        <Route path="/select-repo" element={<SelectRepo />} />
        <Route path="/select-files" element={<SelectFiles />} />
      </Routes>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
