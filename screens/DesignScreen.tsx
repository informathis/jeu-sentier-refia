import React, { useState, useEffect } from 'react';
import { Challenge, UserChoice, OptionItem, AmbitionLevel } from '../types';
import { Button } from '../components/ui/Button';
import { CloudRain, CloudSun, Cloud, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

interface Props {
  challenge: Challenge;
  onNext: (choices: Partial<UserChoice>) => void;
  initialData?: Partial<UserChoice>;
}

export const DesignScreen: React.FC<Props> = ({ challenge, onNext, initialData }) => {
  const [useCase, setUseCase] = useState<string>(initialData?.useCase || '');
  const [benefits, setBenefits] = useState<string[]>(initialData?.selectedBenefits || []);
  const [data, setData] = useState<string[]>(initialData?.selectedData || []);
  const [risks, setRisks] = useState<string[]>(initialData?.selectedRisks || []);
  
  // Weather simulation based on Risks
  const [weatherScore, setWeatherScore] = useState(0);

  useEffect(() => {
    // Calculate "weather" based on selected risks' inherent risk factor
    let score = 0;
    risks.forEach(rId => {
      const r = challenge.suggestedRisks.find(i => i.id === rId);
      if (r && r.riskFactor) score += r.riskFactor;
    });
    setWeatherScore(score);
  }, [risks, challenge.suggestedRisks]);

  const toggleSelection = (list: string[], setList: (l: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleNext = () => {
    onNext({
      challengeId: challenge.id,
      useCase,
      selectedBenefits: benefits,
      selectedData: data,
      selectedRisks: risks
    });
  };

  const isComplete = useCase !== '' && benefits.length > 0 && data.length > 0 && risks.length > 0;

  const getWeatherIcon = () => {
    if (weatherScore < 3) return <CloudSun className="text-amber-500" size={32} />;
    if (weatherScore < 7) return <Cloud className="text-slate-500" size={32} />;
    return <CloudRain className="text-blue-700" size={32} />;
  };

  const getWeatherLabel = () => {
    if (weatherScore < 3) return "Ciel dégagé";
    if (weatherScore < 7) return "Temps couvert";
    return "Orage menaçant (Risques élevés)";
  };

  return (
    <div className="space-y-8 pb-20 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500">
        <h2 className="text-xl font-bold text-emerald-900 mb-2">Défi : {challenge.title}</h2>
        <p className="text-slate-600">{challenge.context}</p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Use Case */}
        <section>
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
            Quel outil pour gravir ce versant ?
          </h3>
          <div className="grid gap-3">
            {challenge.suggestedUseCases.map((opt) => (
              <label 
                key={opt.id}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${useCase === opt.id ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-white hover:border-emerald-200'}
                `}
              >
                <input 
                  type="radio" 
                  name="useCase" 
                  className="hidden"
                  checked={useCase === opt.id}
                  onChange={() => setUseCase(opt.id)}
                />
                <div className="flex-1">
                  <span className="font-medium text-slate-800">{opt.label}</span>
                </div>
                {useCase === opt.id && <CheckCircle2 className="text-emerald-600" size={20} />}
              </label>
            ))}
          </div>
        </section>

        {/* Section 2: Benefits */}
        <section>
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
            Bénéfices attendus (Pourquoi monter ?)
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {challenge.suggestedBenefits.map((opt) => (
              <label 
                key={opt.id}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-sm
                  ${benefits.includes(opt.id) ? 'border-sky-500 bg-sky-50' : 'border-slate-100 bg-white hover:border-sky-200'}
                `}
              >
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={benefits.includes(opt.id)}
                  onChange={() => toggleSelection(benefits, setBenefits, opt.id)}
                />
                <span className="text-slate-700">{opt.label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Section 3: Data */}
        <section>
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
            Contenu du sac à dos (Données utilisées)
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {challenge.suggestedData.map((opt) => (
              <label 
                key={opt.id}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-sm
                  ${data.includes(opt.id) ? 'border-amber-500 bg-amber-50' : 'border-slate-100 bg-white hover:border-amber-200'}
                `}
              >
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={data.includes(opt.id)}
                  onChange={() => toggleSelection(data, setData, opt.id)}
                />
                <span className="text-slate-700">{opt.label}</span>
                {opt.id.includes('social') && <span className="block text-xs text-amber-600 font-bold mt-1">⚠️ Sensible</span>}
              </label>
            ))}
          </div>
        </section>

        {/* Section 4: Risks & Weather */}
        <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
              Météo & Risques
            </h3>
            <div className="flex flex-col items-end">
              {getWeatherIcon()}
              <span className="text-xs font-medium text-slate-500 mt-1">{getWeatherLabel()}</span>
            </div>
          </div>
          
          <div className="grid gap-3">
            {challenge.suggestedRisks.map((opt) => (
              <label 
                key={opt.id}
                className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all text-sm
                  ${risks.includes(opt.id) ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white hover:border-red-200'}
                `}
              >
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={risks.includes(opt.id)}
                  onChange={() => toggleSelection(risks, setRisks, opt.id)}
                />
                <AlertTriangle size={16} className={`mt-0.5 flex-shrink-0 ${risks.includes(opt.id) ? 'text-red-500' : 'text-slate-300'}`} />
                <span className="text-slate-700">{opt.label}</span>
              </label>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 flex justify-center z-40">
        <div className="w-full max-w-3xl">
          <Button 
            onClick={handleNext} 
            disabled={!isComplete} 
            fullWidth 
            className="shadow-lg"
          >
            Continuer vers les garde-fous <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};