import React from 'react';
import { CHALLENGES } from '../data';
import { Challenge } from '../types';
import { Users, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface Props {
  completedIds: string[];
  onSelectChallenge: (challenge: Challenge) => void;
}

export const MapScreen: React.FC<Props> = ({ completedIds, onSelectChallenge }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-emerald-900">Carte du Massif Formation</h2>
        <p className="text-slate-600">Choisissez votre prochain versant à explorer.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {CHALLENGES.map((challenge) => {
          const isCompleted = completedIds.includes(challenge.id);
          
          return (
            <div 
              key={challenge.id}
              className={`relative bg-white rounded-xl shadow-sm border-2 transition-all duration-300 overflow-hidden group
                ${isCompleted ? 'border-emerald-200 opacity-60 grayscale' : 'border-white hover:border-emerald-400 hover:shadow-md cursor-pointer'}
              `}
              onClick={() => !isCompleted && onSelectChallenge(challenge)}
            >
              {isCompleted && (
                <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full z-10">
                  Sommet atteint
                </div>
              )}

              <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
                {/* Icon/Difficulty visual */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-inner
                    ${isCompleted ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-700'}`}>
                    {challenge.id.replace('c', '')}
                  </div>
                  <div className="flex gap-0.5" title={`Difficulté: ${challenge.difficulty}/3`}>
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i < challenge.difficulty ? 'bg-amber-500' : 'bg-slate-200'}`} />
                    ))}
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-800 transition-colors">
                      {challenge.title}
                    </h3>
                    <p className="text-sm font-medium text-emerald-600 uppercase tracking-wide">
                      {challenge.description}
                    </p>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed border-l-2 border-slate-200 pl-3">
                    {challenge.context}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {challenge.publics.map((pub, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs">
                        <Users size={12} /> {pub}
                      </span>
                    ))}
                  </div>
                </div>

                {!isCompleted && (
                  <div className="self-end md:self-center">
                    <Button variant="ghost" className="text-emerald-700">
                      Explorer <ArrowRight size={18} />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};