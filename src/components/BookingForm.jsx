import { useState } from 'react';
import { Calendar, MapPin, Sparkles, Check } from 'lucide-react';

const destinations = [
  { id: 'paris', name: 'Paris 1889', era: 'Belle Époque', price: '5,000 CT' },
  { id: 'cretace', name: 'Crétacé', era: 'Préhistoire', price: '12,000 CT' },
  { id: 'florence', name: 'Florence 1504', era: 'Renaissance', price: '7,500 CT' },
];

export default function BookingForm() {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDestination && selectedDate) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section id="booking" className="py-24 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500" />
            <Sparkles className="w-5 h-5 text-amber-500" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Réservez votre <span className="text-amber-500">Voyage</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Choisissez votre destination et votre date de départ.
            Notre équipe de chrononautes préparera votre expédition.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Destination Select */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                Destination Temporelle
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-white appearance-none cursor-pointer focus:outline-none focus:border-amber-500 transition-colors"
                required
              >
                <option value="" disabled>Sélectionnez une époque</option>
                {destinations.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name} - {dest.era} ({dest.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Date Select */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500" />
                Date de Départ
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-white cursor-pointer focus:outline-none focus:border-amber-500 transition-colors [color-scheme:dark]"
                required
              />
            </div>
          </div>

          {/* Selected Destination Info */}
          {selectedDestination && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
              <h4 className="text-amber-500 font-semibold mb-2">Résumé de votre voyage</h4>
              <p className="text-slate-300">
                <span className="text-white font-medium">
                  {destinations.find(d => d.id === selectedDestination)?.name}
                </span>
                {' - '}
                {destinations.find(d => d.id === selectedDestination)?.era}
              </p>
              <p className="text-slate-400 text-sm mt-2">
                Tarif : {destinations.find(d => d.id === selectedDestination)?.price}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitted}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] ${
              isSubmitted
                ? 'bg-green-500 text-white'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-lg shadow-amber-500/25'
            }`}
          >
            {isSubmitted ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Réservation confirmée !
              </span>
            ) : (
              'Confirmer la réservation'
            )}
          </button>

          {/* Disclaimer */}
          <p className="text-slate-500 text-xs text-center mt-6">
            En confirmant, vous acceptez les conditions générales de voyage temporel
            et les protocoles de l'Académie Chronologique Internationale.
          </p>
        </form>
      </div>
    </section>
  );
}
