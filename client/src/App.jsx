import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import BookingPage from './pages/BookingPage';
import Analytics from './pages/Analytics';
import PatientRecords from './pages/PatientRecords';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/patients" element={<PatientRecords />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
