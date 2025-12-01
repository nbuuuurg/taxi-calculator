import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Petit délai pour l'animation d'entrée
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-7xl mx-auto bg-slate-900/95 backdrop-blur shadow-2xl rounded-2xl p-4 md:p-6 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4 text-white">
        
        <div className="flex items-start gap-4 flex-1">
          <div className="bg-amber-400 p-2 rounded-lg text-slate-900 shrink-0 hidden sm:block">
            <Cookie size={24} />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">Nous respectons votre vie privée</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Nous utilisons des cookies pour assurer le bon fonctionnement du site (sauvegarde de vos préférences) et pour analyser le trafic de manière anonyme. 
              Aucune donnée personnelle n'est revendue à des tiers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button 
            onClick={handleDecline}
            className="flex-1 md:flex-none px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-800 text-slate-300 text-sm font-medium transition-colors"
          >
            Refuser
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none px-6 py-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-900 text-sm font-bold shadow-lg shadow-amber-900/20 transition-all active:scale-95"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;