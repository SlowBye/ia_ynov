import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Clock, Shield, Users } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function Home() {
  const { destinations } = useBooking();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/video/trailer.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          {/* Decorative element */}
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-amber-500" />
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 animate-pulse" />
            <span className="text-amber-500 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em]">Agence Temporelle Premium</span>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 animate-pulse" />
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-amber-500" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="block text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              Voyagez à travers
            </span>
            <span className="block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent" style={{ fontFamily: 'Playfair Display, serif' }}>
              les siècles
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-2xl mb-8 sm:mb-10 leading-relaxed px-4">
            Explorez les époques les plus fascinantes de l'histoire humaine.
            Des expéditions exclusives, un luxe intemporel.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <Link
              to="/destinations"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/30 text-base sm:text-lg flex items-center justify-center gap-2"
            >
              Découvrir nos destinations
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/reservations"
              className="border-2 border-white/30 hover:border-amber-500 text-white hover:text-amber-500 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 backdrop-blur-sm text-base sm:text-lg text-center"
            >
              Mes réservations
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-amber-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Pourquoi <span className="text-amber-500">TimeTravel</span> ?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              Une expertise inégalée dans le voyage temporel depuis plus de 50 ans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: Clock, title: 'Technologie de pointe', desc: 'Nos capsules temporelles de dernière génération garantissent un voyage sûr et confortable.' },
              { icon: Shield, title: 'Sécurité absolue', desc: 'Certifiés par l\'Académie Chronologique Internationale. Zéro incident en 50 ans.' },
              { icon: Users, title: 'Guides experts', desc: 'Des chrononautes certifiés vous accompagnent à chaque instant de votre aventure.' }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center hover:border-amber-500/50 transition-colors">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm sm:text-base">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Preview */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500" />
              <Sparkles className="w-5 h-5 text-amber-500" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Nos <span className="text-amber-500">Destinations</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              Trois époques emblématiques vous attendent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {destinations.map((dest) => (
              <Link
                key={dest.id}
                to={`/destinations/${dest.id}`}
                className="group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/50 transition-all duration-500"
              >
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-amber-500 text-xs sm:text-sm uppercase tracking-wider">{dest.era}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {dest.title}
                    </h3>
                    <p className="text-amber-500 font-semibold mt-2">{dest.price.toLocaleString()} CT</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Voir toutes les destinations
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
