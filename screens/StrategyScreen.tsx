import React, { useState } from 'react';
import { Challenge, UserChoice, AmbitionLevel } from '../types';
import { COMMON_SAFEGUARDS, getAmbitionLabel } from '../data';
import { Button } from '../components/ui/Button';
import { Shield, Mountain, Flag } from 'lucide-react';

interface Props {
  userChoice: UserChoice;
  onFinish: (finalChoice: UserChoice) => void;
  onBack: () => void;
}

export const StrategyScreen: React.FC<Props> = ({ userChoice, onFinish, onBack }) => {
  const [safeguards, setSafeguards] = useState<string[]>([]);
  const [ambition, setAmbition] = useState<AmbitionLevel | null>(null);

  const toggleSafeguard = (id: string) => {
    if (safeguards.includes(id)) {
      setSafeguards(safeguards.filter(i => i !== id));
    } else {
      setSafeguards([...safeguards, id]);
    }
  };

  const handleFinish = () => {
    if (!ambition) return;
    onFinish({
      ...userChoice,
      selectedSafeguards: safeguards,
      ambition
    });
  };

  return (
    <div className="space-y-8 pb-24 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-emerald-900">Préparer l'ascension</h2>
        <p className="text-slate-600">Sécurisez le parcours et choisissez votre niveau d'engagement.</p>
      </div>

      {/* Ambition Level */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Mountain className="text-emerald-600" />
          Quel type d'expédition ? (Ambition)
        </h3>
        
        <div className="space-y-4">
          <button 
            onClick={() => setAmbition(AmbitionLevel.LOCAL)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex gap-4 ${ambition === AmbitionLevel.LOCAL ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-slate-200 hover:border-emerald-200'}`}
          >
            <div className="bg-emerald-100 p-2 rounded-lg h-fit"><Flag size={20} className="text-emerald-700"/></div>
            <div>
              <div className="font-bold text-slate-800">Petit sentier local (Expérimentation établissement)</div>
              <p className="text-sm text-slate-600 mt-1">On teste sur un petit groupe, risques limités, impact local. Idéal pour débuter.</p>
            </div>
          </button>

          <button 
            onClick={() => setAmbition(AmbitionLevel.PILOT)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex gap-4 ${ambition === AmbitionLevel.PILOT ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500' : 'border-slate-200 hover:border-amber-200'}`}
          >
            <div className="bg-amber-100 p-2 rounded-lg h-fit"><Mountain size={20} className="text-amber-700"/></div>
            <div>
              <div className="font-bold text-slate-800">Traversée (Pilote inter-établissements)</div>
              <p className="text-sm text-slate-600 mt-1">Projet structurant, impact fort. Demande une préparation logistique et technique impeccable.</p>
            </div>
          </button>

          <button 
            onClick={() => setAmbition(AmbitionLevel.NONE)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex gap-4 ${ambition === AmbitionLevel.NONE ? 'border-slate-500 bg-slate-50 ring-1 ring-slate-500' : 'border-slate-200 hover:border-slate-300'}`}
          >
            <div className="bg-slate-200 p-2 rounded-lg h-fit"><Shield size={20} className="text-slate-700"/></div>
            <div>
              <div className="font-bold text-slate-800">Bivouac (Pas d'IA pour l'instant)</div>
              <p className="text-sm text-slate-600 mt-1">Le terrain est trop glissant. On renforce d'abord les méthodes classiques avant d'automatiser.</p>
            </div>
          </button>
        </div>
      </section>

      {/* Safeguards */}
      {ambition !== AmbitionLevel.NONE && (
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Shield className="text-blue-600" />
            Garde-fous (Équipement de sécurité)
          </h3>
          <p className="text-sm text-slate-500 mb-4">Cochez les mesures indispensables pour protéger les apprenants.</p>
          
          <div className="grid gap-3">
            {COMMON_SAFEGUARDS.map((sg) => (
              <label 
                key={sg.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer
                  ${safeguards.includes(sg.id) ? 'bg-blue-50 border-blue-300' : 'hover:bg-slate-50 border-slate-200'}
                `}
              >
                <input 
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                  checked={safeguards.includes(sg.id)}
                  onChange={() => toggleSafeguard(sg.id)}
                />
                <span className="text-slate-700 font-medium">{sg.label}</span>
              </label>
            ))}
          </div>
        </section>
      )}

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 flex justify-center gap-4 z-40">
        <div className="w-full max-w-3xl flex gap-4">
          <Button onClick={onBack} variant="ghost" className="flex-1">
            Retour
          </Button>
          <Button 
            onClick={handleFinish} 
            disabled={!ambition || (ambition !== AmbitionLevel.NONE && safeguards.length === 0)} 
            fullWidth 
            className="flex-[2] shadow-lg"
          >
            Lancer l'expédition
          </Button>
        </div>
      </div>
    </div>
  );
};