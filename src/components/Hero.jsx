import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://i.imgur.com/IJixYP7.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Decorative element */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500" />
          <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
          <span className="text-amber-500 text-sm uppercase tracking-[0.3em]">Agence Temporelle Premium</span>
          <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500" />
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="block text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Voyagez à travers
          </span>
          <span className="block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent" style={{ fontFamily: 'Playfair Display, serif' }}>
            les siècles
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Explorez les époques les plus fascinantes de l'histoire humaine.
          Des expéditions exclusives, un luxe intemporel.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#destinations"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/30 text-lg"
          >
            Découvrir nos destinations
          </a>
          <a
            href="#booking"
            className="border-2 border-white/30 hover:border-amber-500 text-white hover:text-amber-500 font-semibold px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm text-lg"
          >
            Réserver maintenant
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-amber-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
