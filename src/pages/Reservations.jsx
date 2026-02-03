import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Users, Clock, MapPin, Trash2, XCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function Reservations() {
  const { bookings, cancelBooking, deleteBooking, destinations } = useBooking();

  const getDestination = (destinationId) => {
    return destinations.find(d => d.id === destinationId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="flex items-center gap-1 text-green-500 bg-green-500/10 px-3 py-1 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            Confirmée
          </span>
        );
      case 'cancelled':
        return (
          <span className="flex items-center gap-1 text-red-500 bg-red-500/10 px-3 py-1 rounded-full text-xs font-medium">
            <XCircle className="w-3 h-3" />
            Annulée
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full text-xs font-medium">
            <AlertCircle className="w-3 h-3" />
            En attente
          </span>
        );
    }
  };

  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  return (
    <div className="min-h-screen bg-slate-950 pt-28 md:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500" />
            <Sparkles className="w-5 h-5 text-amber-500" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Mes <span className="text-amber-500">Réservations</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Retrouvez ici toutes vos expéditions temporelles.
          </p>
        </div>

        {bookings.length === 0 ? (
          /* Empty state */
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-slate-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Aucune réservation</h2>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Vous n'avez pas encore réservé de voyage temporel.
              Explorez nos destinations et embarquez pour une aventure inoubliable !
            </p>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold px-6 py-3 rounded-full transition-all transform hover:scale-105"
            >
              Découvrir nos destinations
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Confirmed bookings */}
            {confirmedBookings.length > 0 && (
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Voyages à venir ({confirmedBookings.length})
                </h2>
                <div className="space-y-4">
                  {confirmedBookings.map((booking) => {
                    const dest = getDestination(booking.destinationId);
                    return (
                      <div
                        key={booking.id}
                        className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row">
                          {/* Image */}
                          <div className="sm:w-48 h-32 sm:h-auto shrink-0">
                            <img
                              src={dest?.image || '/assets/img/paris_169.png'}
                              alt={booking.destinationTitle}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-4 sm:p-6">
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                              <div>
                                <h3 className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                                  {booking.destinationTitle}
                                </h3>
                                <p className="text-slate-500 text-xs">Réf: {booking.id}</p>
                              </div>
                              {getStatusBadge(booking.status)}
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                              <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                                <span className="truncate">{formatDate(booking.departureDate)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <Users className="w-4 h-4 text-amber-500 shrink-0" />
                                <span>{booking.travelers} voyageur{booking.travelers > 1 ? 's' : ''}</span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                                <span>{booking.duration}</span>
                              </div>
                              <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm">
                                <MapPin className="w-4 h-4 shrink-0" />
                                <span>{booking.totalPrice.toLocaleString()} CT</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Link
                                to={`/destinations/${booking.destinationId}`}
                                className="text-sm bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
                              >
                                Voir les détails
                              </Link>
                              <button
                                onClick={() => cancelBooking(booking.id)}
                                className="text-sm bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                              >
                                <XCircle className="w-4 h-4" />
                                Annuler
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Cancelled bookings */}
            {cancelledBookings.length > 0 && (
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-400 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  Voyages annulés ({cancelledBookings.length})
                </h2>
                <div className="space-y-4">
                  {cancelledBookings.map((booking) => {
                    const dest = getDestination(booking.destinationId);
                    return (
                      <div
                        key={booking.id}
                        className="bg-slate-900/30 border border-slate-800/50 rounded-2xl overflow-hidden opacity-60"
                      >
                        <div className="flex flex-col sm:flex-row">
                          {/* Image */}
                          <div className="sm:w-48 h-24 sm:h-auto shrink-0 grayscale">
                            <img
                              src={dest?.image || '/assets/img/paris_169.png'}
                              alt={booking.destinationTitle}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-4 sm:p-6">
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                              <div>
                                <h3 className="text-lg font-bold text-slate-400 line-through">
                                  {booking.destinationTitle}
                                </h3>
                                <p className="text-slate-600 text-xs">Réf: {booking.id}</p>
                              </div>
                              {getStatusBadge(booking.status)}
                            </div>

                            <div className="flex items-center gap-4 text-slate-500 text-sm mb-3">
                              <span>{formatDate(booking.departureDate)}</span>
                              <span>{booking.travelers} voyageur{booking.travelers > 1 ? 's' : ''}</span>
                            </div>

                            <button
                              onClick={() => deleteBooking(booking.id)}
                              className="text-sm text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* New booking CTA */}
            <div className="text-center pt-8 border-t border-slate-800">
              <p className="text-slate-400 mb-4">Envie d'une nouvelle aventure ?</p>
              <Link
                to="/destinations"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold px-6 py-3 rounded-full transition-all transform hover:scale-105"
              >
                Explorer nos destinations
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
