import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

interface LegalNoticeProps {
  onBack: () => void;
}

const LegalNotice: React.FC<LegalNoticeProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-200 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <ShieldCheck className="text-amber-500" />
          Mentions Légales
        </h2>
      </div>
      
      <div className="p-8 space-y-8 text-slate-700">
        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-amber-400 pl-3">1. Édition du site</h3>
          <p className="mb-2">
            En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet <strong>Le Taxi de Stef</strong> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-sm bg-slate-50 p-4 rounded-lg">
            <li><strong>Propriétaire du site :</strong> Stéphane (Le Taxi de Stef) - Entrepreneur Individuel</li>
            <li><strong>Contact :</strong> 07 49 06 86 65</li>
            <li><strong>Activité :</strong> Transports de voyageurs par taxis (Code NAF 4932Z)</li>
            <li><strong>Commune de stationnement :</strong> Étampes (91150)</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-amber-400 pl-3">2. Hébergement</h3>
          <p>
            Le site est hébergé par la société <strong>Vercel Inc.</strong><br />
            Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789, USA.<br />
            Le stockage des données webhook est géré par Hostinger International Ltd.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-amber-400 pl-3">3. Propriété intellectuelle</h3>
          <p>
            Stéphane est propriétaire des droits de propriété intellectuelle et détient les droits d’usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.
            <br /><br />
            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-amber-400 pl-3">4. Limitations de responsabilité</h3>
          <p>
            Le Taxi de Stef ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site.
            <br />
            Le site contient des estimations tarifaires basées sur la réglementation préfectorale. Ces tarifs sont donnés à titre indicatif et ne valent pas devis contractuel, le prix final étant déterminé par le taximètre (compteur).
          </p>
        </section>
        
        <div className="pt-6 border-t border-slate-100 text-center">
            <button onClick={onBack} className="text-amber-600 font-medium hover:underline">
                Retour à l'accueil
            </button>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;