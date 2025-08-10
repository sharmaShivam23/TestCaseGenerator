// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeMainPage from './pages/Home';
import AuthCallback from './pages/AuthCallback';
import SelectRepo from './pages/ShowRepo';
import SelectFiles from './pages/SelectFiles';
import Contact from './pages/Contact';
// import SelectRepo from './pages/ShowRepo';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeMainPage />} />
         <Route path="/auth/callback" element={<AuthCallback />} />
         {/* <Route path="/showRepo" element={<AuthCallback />} /> */}
        <Route path="/select-repo" element={<SelectRepo />} />
        <Route path="/select-files" element={<SelectFiles />} />
      </Routes>
    </Router>
  );
}

export default App;
