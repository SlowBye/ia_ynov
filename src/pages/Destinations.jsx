import { Link } from 'react-router-dom';
import { Sparkles, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function Destinations() {
  const { destinations } = useBooking();

  return (
    <div className="min-h-screen bg-slate-950 pt-28 md:pt-36 pb-16 sm:pb-24">
      {/* Header - centered */}
      <div className="text-center mb-12 sm:mb-16 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500" />
          <Sparkles className="w-5 h-5 text-amber-500" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Nos <span className="text-amber-500">Destinations</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
          Choisissez votre époque et embarquez pour une aventure inoubliable.
          Chaque destination est minutieusement préparée pour votre confort et votre émerveillement.
        </p>
      </div>

      {/* Destinations Grid - properly centered */}
      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-[1200px]">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-500 w-full max-w-[400px] mx-auto md:max-w-none"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Era badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span className="text-xs text-amber-500 uppercase tracking-wider font-medium">{dest.era}</span>
                </div>

                {/* Price badge */}
                <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 px-4 py-2 rounded-full font-bold text-sm">
                  {dest.price.toLocaleString()} CT
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {dest.title}
                </h2>

                <div className="flex items-center gap-2 text-slate-400 mb-4">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="text-sm">{dest.duration}</span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {dest.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {dest.highlights.slice(0, 3).map((highlight, i) => (
                    <span key={i} className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full">
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Actions - larger buttons */}
                <div className="flex gap-4">
                  <Link
                    to={`/destinations/${dest.id}`}
                    className="flex-1 text-center bg-slate-800 hover:bg-slate-700 text-white font-medium py-4 px-6 rounded-xl transition-colors"
                  >
                    Détails
                  </Link>
                  <Link
                    to={`/destinations/${dest.id}?book=true`}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>Réserver</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom info - centered */}
      <div className="mt-16 px-4">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-bold text-white mb-3">Besoin d'aide pour choisir ?</h3>
          <p className="text-slate-400 mb-4">
            Notre assistant Chronos est disponible 24h/24 pour vous conseiller
            et répondre à toutes vos questions.
          </p>
          <p className="text-amber-500 text-sm">
            Cliquez sur l'icône chat en bas à droite pour discuter avec Chronos.
          </p>
        </div>
      </div>
    </div>
  );
}
