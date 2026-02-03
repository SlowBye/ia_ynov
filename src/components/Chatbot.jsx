import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Clock, Bot } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

// Intelligent response system for Chronos
class ChronosAI {
  constructor(destinations, bookings) {
    this.destinations = destinations;
    this.bookings = bookings;
    this.conversationContext = [];
    this.userName = null;
  }

  updateContext(bookings) {
    this.bookings = bookings;
  }

  findDestination(text) {
    const lower = text.toLowerCase();
    if (lower.includes('paris') || lower.includes('1889') || lower.includes('belle époque') || lower.includes('tour eiffel')) {
      return this.destinations.find(d => d.id === 'paris-1889');
    }
    if (lower.includes('crétacé') || lower.includes('cretace') || lower.includes('dinosaure') || lower.includes('préhistoire') || lower.includes('t-rex') || lower.includes('jurassic')) {
      return this.destinations.find(d => d.id === 'cretace');
    }
    if (lower.includes('florence') || lower.includes('1504') || lower.includes('renaissance') || lower.includes('michel-ange') || lower.includes('david') || lower.includes('medicis')) {
      return this.destinations.find(d => d.id === 'florence-1504');
    }
    return null;
  }

  extractNumber(text) {
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1]) : null;
  }

  generateResponse(userMessage) {
    const lower = userMessage.toLowerCase().trim();
    this.conversationContext.push({ role: 'user', content: userMessage });

    // Extract name if user introduces themselves
    const nameMatch = lower.match(/(?:je m'appelle|mon nom est|je suis|moi c'est)\s+(\w+)/i);
    if (nameMatch) {
      this.userName = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
      return this.formatResponse(`Enchanté, ${this.userName} ! C'est un plaisir de vous accueillir chez TimeTravel Agency. Comment puis-je vous aider dans votre quête temporelle aujourd'hui ?`);
    }

    // Greetings
    if (/^(bonjour|salut|hello|hey|coucou|bonsoir|yo)/i.test(lower)) {
      const greeting = this.userName
        ? `Bonjour ${this.userName} ! Ravi de vous revoir.`
        : 'Bienvenue, cher voyageur temporel !';
      return this.formatResponse(`${greeting} Je suis Chronos, votre concierge personnel à travers les âges. Que puis-je faire pour vous ? Vous souhaitez découvrir nos destinations, connaître nos tarifs, ou peut-être vérifier une réservation ?`);
    }

    // Price inquiries - specific destination
    const destination = this.findDestination(lower);
    if ((lower.includes('prix') || lower.includes('coût') || lower.includes('coute') || lower.includes('combien') || lower.includes('tarif') || lower.includes('cher')) && destination) {
      return this.formatResponse(`L'expédition **${destination.title}** (${destination.era}) est proposée à **${destination.price.toLocaleString()} Crédits Temporels** pour ${destination.duration}.\n\nCe tarif inclut :\n${destination.includes.map(i => `• ${i}`).join('\n')}\n\nSouhaitez-vous réserver cette destination ?`);
    }

    // General price inquiry
    if (lower.includes('prix') || lower.includes('coût') || lower.includes('coute') || lower.includes('combien') || lower.includes('tarif') || lower.includes('budget')) {
      return this.formatResponse(`Nos expéditions temporelles sont tarifées en **Crédits Temporels (CT)** :\n\n🗼 **Paris 1889** : 5 000 CT (3 jours)\n🦖 **Crétacé** : 12 000 CT (2 jours)\n🎨 **Florence 1504** : 7 500 CT (4 jours)\n\nChaque tarif inclut le transport temporel, l'hébergement, un guide certifié et l'assurance paradoxe. Quelle époque vous attire ?`);
    }

    // Destination details
    if (destination && (lower.includes('info') || lower.includes('détail') || lower.includes('parle') || lower.includes('raconte') || lower.includes('décris') || lower.includes('c\'est quoi') || lower.includes('explique'))) {
      return this.formatResponse(`**${destination.title}** - ${destination.era}\n\n${destination.longDescription}\n\n**Durée** : ${destination.duration}\n**Tarif** : ${destination.price.toLocaleString()} CT\n\n**Points forts** :\n${destination.highlights.map(h => `✨ ${h}`).join('\n')}\n\nVoulez-vous réserver cette expédition ?`);
    }

    // Booking status
    if (lower.includes('réservation') || lower.includes('reservation') || lower.includes('booking') || lower.includes('mes voyages') || lower.includes('mon voyage')) {
      if (this.bookings.length === 0) {
        return this.formatResponse(`Vous n'avez pas encore de réservation enregistrée. Souhaitez-vous que je vous présente nos destinations disponibles ?`);
      }
      const confirmed = this.bookings.filter(b => b.status === 'confirmed');
      if (confirmed.length === 0) {
        return this.formatResponse(`Toutes vos réservations ont été annulées. Voulez-vous planifier un nouveau voyage ?`);
      }
      const bookingsList = confirmed.map(b => {
        const dest = this.destinations.find(d => d.id === b.destinationId);
        return `• **${dest?.title || b.destinationId}** - ${new Date(b.departureDate).toLocaleDateString('fr-FR')} (${b.travelers} voyageur${b.travelers > 1 ? 's' : ''})`;
      }).join('\n');
      return this.formatResponse(`Voici vos réservations confirmées :\n\n${bookingsList}\n\nVous pouvez consulter tous les détails dans la section "Mes Réservations".`);
    }

    // Recommendations based on interests
    if (lower.includes('art') || lower.includes('peinture') || lower.includes('sculpture') || lower.includes('musée') || lower.includes('culture')) {
      return this.formatResponse(`Pour les amateurs d'art, je recommande vivement **Florence 1504** ! Imaginez : assister à la révélation du David de Michel-Ange, visiter l'atelier de Léonard de Vinci, et vous promener dans les galeries des Médicis...\n\n**Tarif** : 7 500 CT pour 4 jours d'immersion artistique totale.\n\nC'est l'expérience ultime pour tout amateur d'art. Puis-je vous réserver une place ?`);
    }

    if (lower.includes('nature') || lower.includes('aventure') || lower.includes('dinosaure') || lower.includes('animal') || lower.includes('sauvage') || lower.includes('extreme') || lower.includes('sensation')) {
      return this.formatResponse(`L'âme aventurière ! Le **Crétacé** est fait pour vous ! 66 millions d'années en arrière, face aux créatures les plus majestueuses ayant foulé cette Terre.\n\nT-Rex, Tricératops, Ptéranodons... observés depuis nos capsules d'observation haute sécurité.\n\n**Tarif** : 12 000 CT pour 2 jours d'adrénaline pure.\n\n⚠️ Expérience réservée aux voyageurs intrépides !`);
    }

    if (lower.includes('histoire') || lower.includes('romantique') || lower.includes('élégant') || lower.includes('epoque') || lower.includes('romantisme')) {
      return this.formatResponse(`Pour une expérience historique et romantique, **Paris 1889** est incomparable. La Belle Époque dans toute sa splendeur !\n\nL'Exposition Universelle, la Tour Eiffel toute neuve, les cafés de Montmartre, les spectacles du Moulin Rouge...\n\n**Tarif** : 5 000 CT pour 3 jours de magie parisienne.\n\nUne époque inoubliable vous attend !`);
    }

    // Safety questions
    if (lower.includes('sécurité') || lower.includes('danger') || lower.includes('risque') || lower.includes('safe') || lower.includes('sûr')) {
      return this.formatResponse(`Votre sécurité est notre priorité absolue. Tous nos voyages sont certifiés par l'**Académie Chronologique Internationale**.\n\n🛡️ **Nos garanties** :\n• Bracelet de rappel d'urgence\n• Guide certifié à chaque instant\n• Assurance paradoxe temporel incluse\n• Protocoles de non-interférence stricts\n• Pour le Crétacé : capsules blindées anti-prédateurs\n\nEn 50 ans d'opération, nous n'avons eu aucun incident majeur.`);
    }

    // How to book
    if (lower.includes('comment') && (lower.includes('réserver') || lower.includes('book'))) {
      return this.formatResponse(`Pour réserver votre voyage temporel :\n\n1️⃣ Rendez-vous dans la section **"Destinations"**\n2️⃣ Choisissez votre époque\n3️⃣ Cliquez sur **"Réserver"**\n4️⃣ Sélectionnez votre date et nombre de voyageurs\n5️⃣ Confirmez !\n\nVos réservations seront visibles dans **"Mes Réservations"**.\n\nJe peux aussi vous aider ici ! Quelle destination vous intéresse ?`);
    }

    // Payment / Credits
    if (lower.includes('crédit') || lower.includes('credit') || lower.includes('payer') || lower.includes('paiement') || lower.includes('monnaie')) {
      return this.formatResponse(`Les **Crédits Temporels (CT)** sont notre unité monétaire exclusive.\n\n💰 **Équivalences approximatives** :\n• 1 000 CT ≈ 1 500 €\n• 5 000 CT ≈ 7 500 €\n• 12 000 CT ≈ 18 000 €\n\nNous acceptons les paiements en plusieurs fois et proposons des facilités pour les voyageurs réguliers. Un acompte de 20% confirme votre réservation.`);
    }

    // Duration questions
    if (lower.includes('durée') || lower.includes('duree') || lower.includes('combien de temps') || lower.includes('jours')) {
      if (destination) {
        return this.formatResponse(`L'expédition **${destination.title}** dure **${destination.duration}**. C'est la durée optimale pour vivre pleinement l'expérience sans risque de paradoxe temporel.`);
      }
      return this.formatResponse(`Nos expéditions varient en durée :\n\n🗼 **Paris 1889** : 3 jours\n🦖 **Crétacé** : 2 jours (intensité maximale)\n🎨 **Florence 1504** : 4 jours\n\nChaque durée est calibrée pour une expérience optimale. Quelle destination vous intéresse ?`);
    }

    // What's included
    if (lower.includes('inclus') || lower.includes('compris') || lower.includes('inclut') || lower.includes('comprend')) {
      if (destination) {
        return this.formatResponse(`Le forfait **${destination.title}** à ${destination.price.toLocaleString()} CT inclut :\n\n${destination.includes.map(i => `✓ ${i}`).join('\n')}\n\nTout est pensé pour votre confort et votre immersion totale !`);
      }
      return this.formatResponse(`Chaque expédition TimeTravel inclut :\n\n✓ Transport temporel sécurisé\n✓ Hébergement authentique d'époque\n✓ Guide certifié chrononaute\n✓ Garde-robe période\n✓ Assurance paradoxe temporel\n\nLes options varient selon la destination. Laquelle vous intéresse ?`);
    }

    // Thanks
    if (lower.includes('merci') || lower.includes('thanks') || lower.includes('super') || lower.includes('parfait') || lower.includes('génial')) {
      return this.formatResponse(`C'est un plaisir de vous accompagner dans cette aventure temporelle${this.userName ? `, ${this.userName}` : ''} ! N'hésitez pas si vous avez d'autres questions. Le temps est entre nos mains. ⏳`);
    }

    // Goodbye
    if (lower.includes('au revoir') || lower.includes('bye') || lower.includes('à bientôt') || lower.includes('ciao')) {
      return this.formatResponse(`À bientôt${this.userName ? `, ${this.userName}` : ''} ! Que votre voyage à travers les âges soit inoubliable. L'équipe TimeTravel Agency reste à votre disposition. 🕰️`);
    }

    // Help
    if (lower.includes('aide') || lower.includes('help') || lower.includes('quoi') || lower.includes('peux faire')) {
      return this.formatResponse(`Je suis Chronos, votre assistant TimeTravel ! Voici ce que je peux faire :\n\n📍 **Destinations** : "Parle-moi de Paris 1889"\n💰 **Tarifs** : "Combien coûte le Crétacé ?"\n📅 **Réservations** : "Comment réserver ?"\n🔍 **Recommandations** : "Je cherche de l'aventure"\n🛡️ **Sécurité** : "C'est sûr le voyage temporel ?"\n📋 **Mes voyages** : "Où en sont mes réservations ?"\n\nPosez-moi vos questions !`);
    }

    // Available destinations
    if (lower.includes('destination') || lower.includes('où') || lower.includes('aller') || lower.includes('voyage') || lower.includes('disponible') || lower.includes('choix') || lower.includes('option')) {
      return this.formatResponse(`Nos trois destinations exclusives :\n\n🗼 **Paris 1889** - Belle Époque\nL'Exposition Universelle et la Tour Eiffel\n→ 5 000 CT | 3 jours\n\n🦖 **Crétacé** - Préhistoire\nFace aux dinosaures, 66M d'années en arrière\n→ 12 000 CT | 2 jours\n\n🎨 **Florence 1504** - Renaissance\nMichel-Ange, De Vinci, les Médicis\n→ 7 500 CT | 4 jours\n\nLaquelle vous fait rêver ?`);
    }

    // Specific destination mention without context
    if (destination) {
      return this.formatResponse(`**${destination.title}** (${destination.era}) est une destination fascinante !\n\n${destination.description}\n\n**Tarif** : ${destination.price.toLocaleString()} CT\n**Durée** : ${destination.duration}\n\nVoulez-vous plus de détails ou souhaitez-vous réserver ?`);
    }

    // Default response
    const defaults = [
      `Question intéressante ! En tant que concierge temporel, je peux vous renseigner sur nos destinations (Paris 1889, Crétacé, Florence 1504), les tarifs, la sécurité, ou vos réservations. Comment puis-je vous aider ?`,
      `Je ne suis pas certain de comprendre votre demande. Puis-je vous orienter vers nos destinations, vous donner des informations sur les tarifs, ou vous aider avec une réservation ?`,
      `Fascinante requête ! Pour mieux vous servir, pourriez-vous préciser ? Je suis expert en : destinations temporelles, tarifs en Crédits Temporels, conseils de voyage, et suivi de réservations.`
    ];
    return this.formatResponse(defaults[Math.floor(Math.random() * defaults.length)]);
  }

  formatResponse(text) {
    this.conversationContext.push({ role: 'assistant', content: text });
    return text;
  }
}

export default function Chatbot() {
  const { bookings, destinations } = useBooking();
  const [isOpen, setIsOpen] = useState(false);
  const [chronos] = useState(() => new ChronosAI(destinations, bookings));
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Bienvenue chez **TimeTravel Agency** ! Je suis **Chronos**, votre concierge temporel personnel.\n\nJe peux vous aider à :\n• Découvrir nos destinations\n• Connaître nos tarifs en Crédits Temporels\n• Réserver votre voyage\n• Répondre à vos questions\n\nComment puis-je vous assister ?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    chronos.updateContext(bookings);
  }, [bookings, chronos]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatMessageText = (text) => {
    // Convert **text** to bold
    return text.split(/(\*\*.*?\*\*)/).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    const thinkingTime = 500 + Math.random() * 1000;
    setTimeout(() => {
      const response = chronos.generateResponse(inputValue);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        text: response
      }]);
      setIsTyping(false);
    }, thinkingTime);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-lg shadow-amber-500/30 transition-all duration-300 flex items-center justify-center ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-950 animate-pulse" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full md:w-[420px] md:max-w-[calc(100vw-3rem)] transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        <div className="bg-slate-900/98 backdrop-blur-xl border-t md:border border-slate-700 md:rounded-2xl shadow-2xl overflow-hidden h-[100dvh] md:h-auto flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-950 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-950">Chronos</h3>
                <p className="text-xs text-slate-800">Concierge Temporel • En ligne</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-950/20 hover:bg-slate-950/30 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-slate-950" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 md:h-96">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-amber-500 text-slate-950 rounded-br-md'
                      : 'bg-slate-800 text-slate-200 rounded-bl-md'
                  }`}
                >
                  {message.type === 'bot' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span className="text-xs text-amber-500 font-medium">Chronos</span>
                    </div>
                  )}
                  <div className="text-sm leading-relaxed whitespace-pre-line">
                    {formatMessageText(message.text)}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-200 rounded-2xl rounded-bl-md p-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span className="text-xs text-amber-500 font-medium">Chronos</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t border-slate-800 shrink-0 overflow-x-auto">
            <div className="flex gap-2">
              {['Destinations', 'Tarifs', 'Mes réservations'].map((action) => (
                <button
                  key={action}
                  onClick={() => {
                    setInputValue(action);
                    setTimeout(() => {
                      const form = document.querySelector('form');
                      form?.requestSubmit();
                    }, 100);
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-full whitespace-nowrap transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700 shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Posez votre question..."
                disabled={isTyping}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isTyping || !inputValue.trim()}
                className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-600 disabled:to-slate-700 rounded-xl flex items-center justify-center transition-all duration-300"
              >
                <Send className="w-5 h-5 text-slate-950" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
