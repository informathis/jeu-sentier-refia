import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Footprints, Map, ShieldCheck, AlertTriangle } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export const HomeScreen: React.FC<Props> = ({ onStart }) => {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-fade-in">
      
      {/* Hero Visual */}
      <div className="relative w-48 h-48 mb-4">
        <div className="absolute inset-0 bg-emerald-100 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute inset-4 bg-emerald-200 rounded-full opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center text-emerald-800">
            <Footprints size={80} strokeWidth={1.5} />
        </div>
      </div>

      <div className="space-y-4 max-w-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 tracking-tight">
          Prêt à guider la transformation ?
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          En tant que référent IA ou responsable formation, vous êtes le guide de haute montagne. 
          Votre mission : choisir les bons sentiers (cas d'usage) pour atteindre les sommets de l'innovation pédagogique, 
          sans mettre vos équipes et vos publics en danger.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Button onClick={onStart} fullWidth className="text-lg">
          Commencer la randonnée
        </Button>
        <Button variant="outline" onClick={() => setShowRules(true)} fullWidth>
          Comment jouer ?
        </Button>
      </div>

      {/* Modal Rules */}
      {showRules && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
              <Map className="text-amber-600" />
              Règles du sentier
            </h3>
            
            <div className="space-y-6 text-left">
              <div className="flex gap-4">
                <div className="bg-emerald-100 p-2 rounded-lg h-fit text-emerald-700 mt-1">
                  <Map size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">1. Choisissez un défi</h4>
                  <p className="text-sm text-slate-600">Chaque étape de la randonnée correspond à un problème concret de formation (orientation, décrochage, etc.).</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-blue-100 p-2 rounded-lg h-fit text-blue-700 mt-1">
                  <Footprints size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">2. Tracez votre itinéraire</h4>
                  <p className="text-sm text-slate-600">Imaginez une solution IA. Sélectionnez les données nécessaires. Attention : plus vous montez haut, plus le temps peut se gâter (risques).</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-amber-100 p-2 rounded-lg h-fit text-amber-700 mt-1">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">3. Assurez vos arrières</h4>
                  <p className="text-sm text-slate-600">Placez des garde-fous (contrôle humain, transparence) pour sécuriser le groupe. Si l'ambition est forte mais les protections faibles, gare à la chute !</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-slate-100 p-2 rounded-lg h-fit text-slate-700 mt-1">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Le Score</h4>
                  <p className="text-sm text-slate-600">Il dépend de la cohérence de votre projet. Un petit sentier bien sécurisé vaut mieux qu'une ascension dangereuse mal préparée.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100">
              <Button onClick={() => setShowRules(false)} fullWidth variant="secondary">
                J'ai compris, en route !
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};