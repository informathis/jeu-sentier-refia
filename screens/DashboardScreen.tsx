import React from 'react';
import { CompletedHike } from '../types';
import { CHALLENGES } from '../data';
import { Button } from '../components/ui/Button';
import { Trophy, Map, RotateCcw } from 'lucide-react';

interface Props {
  history: CompletedHike[];
  onReplay: () => void;
}

export const DashboardScreen: React.FC<Props> = ({ history, onReplay }) => {
  const totalScore = history.reduce((acc, curr) => acc + curr.score, 0);
  const averageScore = history.length > 0 ? Math.round(totalScore / history.length) : 0;
  const progress = Math.round((history.length / CHALLENGES.length) * 100);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-emerald-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Map size={120} />
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Tableau de bord du Guide</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-emerald-300 text-sm font-medium uppercase">Progression</div>
            <div className="text-4xl font-bold">{progress}%</div>
            <div className="text-emerald-400 text-xs">{history.length}/{CHALLENGES.length} sommets</div>
          </div>
          <div>
            <div className="text-emerald-300 text-sm font-medium uppercase">Score Moyen</div>
            <div className="text-4xl font-bold">{averageScore}</div>
            <div className="text-emerald-400 text-xs">Points de cohérence</div>
          </div>
          <div className="col-span-2">
            <div className="text-emerald-300 text-sm font-medium uppercase mb-2">Altitude atteinte</div>
            <div className="w-full bg-emerald-800 rounded-full h-4">
              <div 
                className="bg-amber-400 h-4 rounded-full transition-all duration-1000" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Historique des étapes</h3>
        {history.length === 0 ? (
          <div className="text-center p-8 bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
            Aucune randonnée effectuée pour l'instant.
          </div>
        ) : (
          <div className="grid gap-4">
            {history.map((hike, idx) => {
              const challenge = CHALLENGES.find(c => c.id === hike.challengeId);
              return (
                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800">{challenge?.title}</h4>
                    <p className="text-sm text-slate-500">Score: {hike.score}/100</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${hike.score > 75 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {hike.score > 75 ? 'Validé' : 'Moyen'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <Button onClick={onReplay} fullWidth variant="outline" className="flex items-center justify-center gap-2">
          <RotateCcw size={20} /> Retourner à la carte
        </Button>
      </div>
    </div>
  );
};