import { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const destinations = [
  {
    id: 'paris-1889',
    title: 'Paris 1889',
    era: 'Belle Époque',
    description: "Vivez l'effervescence de l'Exposition Universelle. Admirez la Tour Eiffel à son inauguration, flânez sur les Champs-Élysées illuminés par les premières lumières électriques. Fer, vapeur et romantisme.",
    longDescription: "Plongez au cœur de la Belle Époque parisienne. L'année 1889 marque le centenaire de la Révolution française et Paris accueille l'Exposition Universelle. La Tour Eiffel, toute nouvelle, domine la ville de ses 300 mètres. Vous pourrez assister aux spectacles du Moulin Rouge, déguster dans les cafés de Montmartre, et croiser peut-être Toulouse-Lautrec ou Gustave Eiffel lui-même.",
    image: 'https://i.imgur.com/LcFOhMe.jpeg',
    price: 5000,
    duration: '3 jours',
    includes: ['Transport temporel aller-retour', 'Hébergement époque authentique', 'Guide certifié Belle Époque', 'Garde-robe période incluse', 'Assurance paradoxe temporel'],
    highlights: ['Inauguration Tour Eiffel', 'Exposition Universelle', 'Cafés de Montmartre', 'Spectacles Moulin Rouge']
  },
  {
    id: 'cretace',
    title: 'Crétacé',
    era: 'Préhistoire (-66M années)',
    description: "Plongez 66 millions d'années en arrière, au cœur d'un monde sauvage et mystérieux. Observez les titans de la préhistoire dans leur habitat naturel. Une aventure primordiale et inoubliable.",
    longDescription: "L'expédition la plus extrême de notre catalogue. Voyagez 66 millions d'années dans le passé, juste avant l'extinction massive. Observez les T-Rex, Tricératops et Ptéranodons depuis nos capsules d'observation blindées. Une expérience unique pour les amateurs de sensations fortes et de nature primordiale.",
    image: 'https://i.imgur.com/jQfYwBw.jpeg',
    price: 12000,
    duration: '2 jours',
    includes: ['Transport temporel haute sécurité', 'Capsule observation blindée', 'Équipe scientifique', 'Équipement survie complet', 'Assurance paradoxe renforcée'],
    highlights: ['Observation T-Rex', 'Vol de Ptéranodons', 'Faune préhistorique', 'Paysages primordiaux']
  },
  {
    id: 'florence-1504',
    title: 'Florence 1504',
    era: 'Renaissance',
    description: "Déambulez dans les ateliers des plus grands maîtres. Assistez à la révélation du David de Michel-Ange. Art, élégance et génie s'entremêlent dans la cité des Médicis.",
    longDescription: "Florence, berceau de la Renaissance italienne. En 1504, Michel-Ange achève son David, Léonard de Vinci travaille sur la Joconde, et Raphaël perfectionne son art. Vous séjournerez dans un palazzo florentin, assisterez aux débats artistiques de l'époque, et pourrez même commander votre portrait à un maître de la Renaissance.",
    image: 'https://i.imgur.com/D3pRtMk.jpeg',
    price: 7500,
    duration: '4 jours',
    includes: ['Transport temporel aller-retour', 'Palazzo privatif', 'Guide historien d\'art', 'Cours de peinture Renaissance', 'Banquet Médicis'],
    highlights: ['Révélation du David', 'Ateliers des maîtres', 'Palazzo Médicis', 'Art et culture']
  }
];

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('timetravel-bookings');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('timetravel-bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: `TT-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    setBookings(prev => [...prev, newBooking]);
    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    setBookings(prev => prev.map(b =>
      b.id === bookingId ? { ...b, status: 'cancelled' } : b
    ));
  };

  const deleteBooking = (bookingId) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  const getBookingsByStatus = (status) => {
    return bookings.filter(b => b.status === status);
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      addBooking,
      cancelBooking,
      deleteBooking,
      getBookingsByStatus,
      destinations
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
