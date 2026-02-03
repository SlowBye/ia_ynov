import { MapPin, Clock } from 'lucide-react';

export default function DestinationCard({ title, era, description, image, price }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/50 transition-all duration-500 shadow-xl">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

        {/* Era badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <Clock className="w-4 h-4 text-amber-500" />
          <span className="text-xs text-amber-500 uppercase tracking-wider font-medium">{era}</span>
        </div>

        {/* Price badge */}
        <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 px-3 py-1.5 rounded-full font-bold text-sm">
          {price} CT
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors duration-300" style={{ fontFamily: 'Playfair Display, serif' }}>
          {title}
        </h3>

        {/* Location indicator */}
        <div className="flex items-center gap-2 text-slate-400 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{title}</span>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Button */}
        <button className="w-full bg-gradient-to-r from-slate-800 to-slate-700 hover:from-amber-500 hover:to-amber-600 text-white hover:text-slate-950 font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
          Réserver cette expédition
        </button>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent" />
      </div>
    </div>
  );
}
