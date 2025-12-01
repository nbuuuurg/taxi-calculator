import React from 'react';
import { ArrowLeft, Lock } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
          <Lock className="text-amber-500" />
          Politique de Confidentialité
        </h2>
      </div>
      
      <div className="p-8 space-y-8 text-slate-700">
        <p className="text-sm bg-blue-50 text-blue-800 p-4 rounded-lg border border-blue-100">
          <strong>En résumé :</strong> Nous collectons uniquement les données nécessaires pour traiter votre réservation de taxi. Vos données ne sont jamais vendues.
        </p>

        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-amber-400 pl-3">1. Collecte des données personnelles</h3>
          <p>
            Dans le cadre de l'utilisation du formulaire de réservation, nous sommes amenés à collecter les données suivantes :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Nom et Prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Adresses de prise en charge et de destination</li>
            <li>Informations relatives au trajet (horaires, nombre de passagers, etc.)</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-amber-400 pl-3">2. Utilisation des données</h3>
          <p>
            Les données collectées sont utilisées pour les finalités suivantes :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Gestion des réservations :</strong> Pour confirmer votre course, vous contacter en cas d'imprévu et assurer le service de transport.</li>
            <li><strong>Relation client :</strong> Pour répondre à vos demandes d'information ou devis.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-amber-400 pl-3">3. Conservation des données</h3>
          <p>
            Les données liées aux demandes de réservation sont conservées pour une durée maximale de 3 ans à compter du dernier contact, conformément aux obligations légales et fiscales.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-amber-400 pl-3">4. Partage des données</h3>
          <p>
            Vos données personnelles sont destinées exclusivement à l'entreprise <strong>Le Taxi de Stef</strong>. Elles ne sont ni vendues, ni louées, ni échangées avec des tiers à des fins commerciales.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-amber-400 pl-3">5. Vos droits (CNIL)</h3>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants concernant vos données :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Droit d'accès et de rectification</li>
            <li>Droit à l'effacement (droit à l'oubli)</li>
            <li>Droit à la limitation du traitement</li>
          </ul>
          <p className="mt-4">
            Pour exercer ces droits, vous pouvez nous contacter par téléphone au <strong>07 49 06 86 65</strong>.
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

export default PrivacyPolicy;