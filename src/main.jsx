import React from 'react'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './Pages/home.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Footer from './Components/Footer/Footer.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <Home />
    <Footer />
  </StrictMode>,
)
