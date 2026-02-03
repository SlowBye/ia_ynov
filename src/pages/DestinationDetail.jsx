import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Clock, MapPin, Check, Calendar, Users, ArrowLeft, Sparkles } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { destinations, addBooking } = useBooking();

  const destination = destinations.find(d => d.id === id);

  const [showBookingForm, setShowBookingForm] = useState(searchParams.get('book') === 'true');
  const [departureDate, setDepartureDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get('book') === 'true') {
      setShowBookingForm(true);
      setTimeout(() => {
        document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [searchParams]);

  if (!destination) {
    return (
      <div className="min-h-screen bg-slate-950 pt-28 px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Destination non trouvée</h1>
          <Link to="/destinations" className="text-amber-500 hover:underline">
            Retour aux destinations
          </Link>
        </div>
      </div>
    );
  }

  const handleBooking = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      addBooking({
        destinationId: destination.id,
        destinationTitle: destination.title,
        departureDate,
        travelers,
        totalPrice: destination.price * travelers,
        duration: destination.duration
      });

      setIsSubmitting(false);
      setBookingSuccess(true);

      setTimeout(() => {
        navigate('/reservations');
      }, 2000);
    }, 1500);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 7);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Image */}
      <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/30" />

        {/* Back button */}
        <Link
          to="/destinations"
          className="absolute top-20 sm:top-24 left-4 sm:left-6 flex items-center gap-2 text-white/80 hover:text-amber-500 transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Retour</span>
        </Link>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="text-amber-500 text-sm uppercase tracking-wider">{destination.era}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {destination.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {destination.duration}
              </span>
              <span className="text-amber-500 font-bold text-xl">{destination.price.toLocaleString()} CT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                À propos de cette destination
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {destination.longDescription}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Points forts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {destination.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-3 sm:p-4">
                    <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                    <span className="text-slate-300 text-sm sm:text-base">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Includes */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Ce qui est inclus
              </h2>
              <ul className="space-y-3">
                {destination.includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-amber-500" />
                    </div>
                    <span className="text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar - Booking */}
          <div className="lg:col-span-1">
            <div id="booking-section" className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 sm:p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-slate-400 text-sm">À partir de</p>
                <p className="text-3xl sm:text-4xl font-bold text-amber-500">{destination.price.toLocaleString()} CT</p>
                <p className="text-slate-400 text-sm">par personne</p>
              </div>

              {!showBookingForm ? (
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold py-4 rounded-xl transition-all transform hover:scale-[1.02]"
                >
                  Réserver maintenant
                </button>
              ) : bookingSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Réservation confirmée !</h3>
                  <p className="text-slate-400 text-sm">Redirection vers vos réservations...</p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      Date de départ
                    </label>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      min={minDate.toISOString().split('T')[0]}
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors [color-scheme:dark]"
                    />
                  </div>

                  {/* Travelers */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-500" />
                      Nombre de voyageurs
                    </label>
                    <select
                      value={travelers}
                      onChange={(e) => setTravelers(parseInt(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6].map(n => (
                        <option key={n} value={n}>{n} voyageur{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  {/* Total */}
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-400 text-sm">{destination.price.toLocaleString()} CT × {travelers}</span>
                      <span className="text-white font-medium">{(destination.price * travelers).toLocaleString()} CT</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                      <span className="text-white font-semibold">Total</span>
                      <span className="text-amber-500 font-bold text-xl">{(destination.price * travelers).toLocaleString()} CT</span>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-600 disabled:to-slate-700 text-slate-950 font-semibold py-4 rounded-xl transition-all"
                  >
                    {isSubmitting ? 'Réservation en cours...' : 'Confirmer la réservation'}
                  </button>

                  <p className="text-slate-500 text-xs text-center">
                    En confirmant, vous acceptez les conditions générales de voyage temporel.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
