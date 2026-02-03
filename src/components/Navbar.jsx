import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, Sparkles, Menu, X } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function Navbar() {
  const location = useLocation();
  const { bookings } = useBooking();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/destinations', label: 'Destinations' },
    { to: '/reservations', label: 'Mes Réservations', badge: confirmedBookings },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg shadow-black/20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-wide">
              <span className="text-amber-500">Time</span>
              <span className="text-white">Travel</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm uppercase tracking-wider transition-colors duration-300 ${
                  isActive(link.to) ? 'text-amber-500' : 'text-slate-300 hover:text-amber-500'
                }`}
              >
                {link.label}
                {link.badge > 0 && (
                  <span className="absolute -top-2 -right-4 w-5 h-5 bg-amber-500 text-slate-950 text-xs font-bold rounded-full flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <Link
            to="/destinations"
            className="hidden md:block bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold px-5 lg:px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/25 text-sm"
          >
            Embarquer
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 backdrop-blur-xl bg-slate-900/95 border border-white/20 rounded-2xl p-4 shadow-lg">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                    isActive(link.to)
                      ? 'bg-amber-500/20 text-amber-500'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge > 0 && (
                    <span className="w-6 h-6 bg-amber-500 text-slate-950 text-xs font-bold rounded-full flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              <Link
                to="/destinations"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold px-4 py-3 rounded-xl text-center"
              >
                Embarquer
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
