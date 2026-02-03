import { Sparkles } from 'lucide-react';
import DestinationCard from './DestinationCard';

const destinations = [
  {
    id: 1,
    title: "Paris 1889",
    era: "Belle Époque",
    description: "Vivez l'effervescence de l'Exposition Universelle. Admirez la Tour Eiffel à son inauguration, flânez sur les Champs-Élysées illuminés par les premières lumières électriques. Fer, vapeur et romantisme.",
    image: "/assets/img/paris_169.png",
    price: "5,000"
  },
  {
    id: 2,
    title: "Crétacé",
    era: "Préhistoire",
    description: "Plongez 66 millions d'années en arrière, au cœur d'un monde sauvage et mystérieux. Observez les titans de la préhistoire dans leur habitat naturel. Une aventure primordiale et inoubliable.",
    image: "/assets/img/cretace_169.png",
    price: "12,000"
  },
  {
    id: 3,
    title: "Florence 1504",
    era: "Renaissance",
    description: "Déambulez dans les ateliers des plus grands maîtres. Assistez à la révélation du David de Michel-Ange. Art, élégance et génie s'entremêlent dans la cité des Médicis.",
    image: "/assets/img/florence_169.png",
    price: "7,500"
  }
];

export default function DestinationsGallery() {
  return (
    <section id="destinations" className="py-24 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500" />
            <Sparkles className="w-5 h-5 text-amber-500" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Nos <span className="text-amber-500">Destinations</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Trois époques emblématiques vous attendent. Chaque voyage est une expérience unique,
            minutieusement préparée pour votre confort et votre émerveillement.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              title={destination.title}
              era={destination.era}
              description={destination.description}
              image={destination.image}
              price={destination.price}
            />
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm uppercase tracking-wider">
            * Crédits Temporels • Tarifs indicatifs • Conditions spéciales disponibles
          </p>
        </div>
      </div>
    </section>
  );
}
