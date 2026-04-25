import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Lost from './pages/Lost';
import Found from './pages/Found';
import AddItem from './pages/AddItem';
import Detail from './pages/Detail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lost" element={<Lost />} />
            <Route path="/found" element={<Found />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/item/:id" element={<Detail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;