import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Reservations from './pages/Reservations';

function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="min-h-screen bg-slate-950">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetail />} />
            <Route path="/reservations" element={<Reservations />} />
          </Routes>

          {/* Footer */}
          <footer className="bg-slate-950 border-t border-slate-800 py-8 sm:py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto text-center">
              <p className="text-amber-500 font-semibold text-lg mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                TimeTravel Agency
              </p>
              <p className="text-slate-500 text-sm">
                Le temps est notre territoire. Votre aventure, notre passion.
              </p>
              <p className="text-slate-600 text-xs mt-6">
                © 2024 TimeTravel Agency. Tous droits temporels réservés.
              </p>
            </div>
          </footer>

          <Chatbot />
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;
