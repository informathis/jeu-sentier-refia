import React, { useEffect, useState } from 'react';
import { Challenge, UserChoice, AmbitionLevel, CompletedHike, OptionItem } from '../types';
import { COMMON_SAFEGUARDS } from '../data';
import { Button } from '../components/ui/Button';
import { Trophy, AlertTriangle, CheckCircle, ArrowRight, BookOpen, BrainCircuit, ShieldAlert, Microscope } from 'lucide-react';

interface Props {
  challenge: Challenge;
  userChoice: UserChoice;
  onSaveAndExit: (result: CompletedHike) => void;
}

interface DetailedFeedbackItem {
  type: 'success' | 'warning' | 'info' | 'critical';
  title: string;
  message: string;
}

export const ResultScreen: React.FC<Props> = ({ challenge, userChoice, onSaveAndExit }) => {
  const [score, setScore] = useState(0);
  const [detailedFeedbacks, setDetailedFeedbacks] = useState<DetailedFeedbackItem[]>([]);

  useEffect(() => {
    let tempScore = 50; // Base score
    const newFeedbacks: DetailedFeedbackItem[] = [];

    // --- 1. AMBITION & STRATEGY ANALYSIS ---
    const safeguardCount = userChoice.selectedSafeguards.length;
    
    if (userChoice.ambition === AmbitionLevel.NONE) {
      tempScore = 70; 
      newFeedbacks.push({
        type: 'info',
        title: "Stratégie de Bivouac",
        message: "Refuser l'IA est une option valide. Parfois, la technologie n'est pas la réponse adaptée aux problèmes humains. Vous privilégiez la stabilité, c'est une décision de gestionnaire prudent."
      });
    } else {
      // Bonus for ambition
      if (userChoice.ambition === AmbitionLevel.PILOT) {
        tempScore += 20;
        newFeedbacks.push({
          type: 'info',
          title: "Ambition 'Traversée' (Pilote)",
          message: "Lancer un pilote inter-établissements permet de mutualiser les coûts et les apprentissages. Attention, cela demande une gouvernance des données beaucoup plus stricte qu'un test local."
        });
      } else {
        tempScore += 10;
        newFeedbacks.push({
          type: 'success',
          title: "Ambition 'Petit Sentier' (Local)",
          message: "L'expérimentation locale est idéale pour acculturer les équipes et tester le concept sans risque systémique (Proof of Concept)."
        });
      }

      // Penalty for lack of safeguards
      if (safeguardCount < 2) {
        tempScore -= 40;
        newFeedbacks.push({
          type: 'critical',
          title: "Danger : Absence de protection",
          message: "Vous partez en expédition sans corde ! Lancer une IA (même locale) sans supervision humaine ni transparence est une faute professionnelle grave au regard des risques éthiques."
        });
      } else if (safeguardCount < 4) {
        tempScore += 5;
        newFeedbacks.push({
          type: 'warning',
          title: "Équipement léger",
          message: "Vos garde-fous sont un bon début, mais pour un déploiement public, il faudra renforcer la documentation et l'auditabilité."
        });
      } else {
        tempScore += 20;
        newFeedbacks.push({
          type: 'success',
          title: "Sécurité maximale",
          message: "Excellent balisage ! En multipliant les garde-fous (humain, transparence, recours), vous créez un cadre de confiance indispensable."
        });
      }
    }

    // --- 2. DATA & RISKS (Educational Content) ---
    // Check Use Case Feedback
    const selectedUseCaseObj = challenge.suggestedUseCases.find(u => u.id === userChoice.useCase);
    if (selectedUseCaseObj?.educationalFeedback) {
      newFeedbacks.push({
        type: 'info',
        title: "Analyse du Cas d'Usage",
        message: selectedUseCaseObj.educationalFeedback
      });
    }

    // Check Sensitive Data
    const hasSensitiveData = userChoice.selectedData.some(d => d.includes('social') || d.includes('medical') || d.includes('grades') || d.includes('softskills'));
    if (hasSensitiveData) {
      if (!userChoice.selectedSafeguards.includes('privacy')) {
        tempScore -= 20;
        newFeedbacks.push({
          type: 'critical',
          title: "Alerte RGPD",
          message: "Vous manipulez des données sensibles/personnelles sans avoir coché 'Anonymisation/RGPD'. C'est illégal. La minimisation des données est la règle d'or."
        });
      }
    }

    // Check Risk Feedback
    userChoice.selectedRisks.forEach(riskId => {
      const riskObj = challenge.suggestedRisks.find(r => r.id === riskId);
      if (riskObj?.educationalFeedback) {
        newFeedbacks.push({
          type: 'warning',
          title: `Vigilance : ${riskObj.label}`,
          message: riskObj.educationalFeedback
        });
      }
    });

    // --- 3. CHALLENGE SPECIFIC CHECKS ---
    // C1: Orientation specific
    if (challenge.id === 'c1' && userChoice.useCase === 'reco' && !userChoice.selectedSafeguards.includes('no_auto')) {
      newFeedbacks.push({
        type: 'critical',
        title: "Règle d'or de l'Orientation",
        message: "Pour l'orientation, la décision purement automatisée est à proscrire absolument. L'IA doit être un outil d'aide, pas de verdict."
      });
      tempScore -= 15;
    }

    setScore(Math.min(100, Math.max(0, tempScore)));
    setDetailedFeedbacks(newFeedbacks);
  }, [challenge, userChoice]);

  const handleComplete = () => {
    onSaveAndExit({
      challengeId: challenge.id,
      choices: userChoice,
      score,
      feedback: detailedFeedbacks.map(f => `${f.title}: ${f.message}`), // Flatten for history
      date: new Date().toISOString()
    });
  };

  const getScoreColor = () => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} className="text-emerald-600" />;
      case 'warning': return <AlertTriangle size={20} className="text-amber-600" />;
      case 'critical': return <ShieldAlert size={20} className="text-red-600" />;
      case 'info': default: return <BookOpen size={20} className="text-blue-600" />;
    }
  };

  const getFeedbackStyle = (type: string) => {
    switch (type) {
      case 'success': return 'bg-emerald-50 border-emerald-200 text-emerald-900';
      case 'warning': return 'bg-amber-50 border-amber-200 text-amber-900';
      case 'critical': return 'bg-red-50 border-red-200 text-red-900';
      case 'info': default: return 'bg-blue-50 border-blue-200 text-blue-900';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* HEADER SCORE */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-blue-500"></div>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Performance de l'étape</h2>
        
        <div className="flex flex-col items-center justify-center mb-6">
          <div className={`text-7xl font-black ${getScoreColor()} mb-2 tracking-tighter`}>{score}<span className="text-3xl text-slate-300">/100</span></div>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <Trophy key={i} size={28} className={i < Math.floor(score/20) ? 'text-amber-400 drop-shadow-sm' : 'text-slate-100'} fill={i < Math.floor(score/20) ? "currentColor" : "none"} />
            ))}
          </div>
        </div>
        <p className="text-slate-500 italic max-w-md mx-auto">
          {score > 80 ? "Une ascension exemplaire, maîtrisée et sécurisée." : score > 50 ? "Sommet atteint, mais quelques imprudences techniques." : "Une expédition périlleuse qui aurait pu mal tourner."}
        </p>
      </div>

      {/* EXPERT CONTEXT */}
      {challenge.expertComment && (
        <div className="bg-slate-800 text-white rounded-xl p-6 shadow-md flex gap-4 items-start">
          <div className="bg-slate-700 p-2 rounded-lg text-amber-400 flex-shrink-0">
            <Microscope size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-amber-400">Le Debrief du Guide Expert</h3>
            <p className="text-slate-200 leading-relaxed text-sm md:text-base">{challenge.expertComment}</p>
          </div>
        </div>
      )}

      {/* DETAILED FEEDBACKS */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
          <BrainCircuit className="text-emerald-600" />
          Analyse de vos choix
        </h3>
        
        <div className="grid gap-4">
          {detailedFeedbacks.map((fb, idx) => (
            <div key={idx} className={`p-5 rounded-xl border flex gap-4 items-start ${getFeedbackStyle(fb.type)} transition-all hover:shadow-sm`}>
              <div className="mt-1 flex-shrink-0 bg-white/50 p-1.5 rounded-full">
                {getFeedbackIcon(fb.type)}
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wide opacity-80 mb-1">{fb.title}</h4>
                <p className="text-sm md:text-base font-medium leading-relaxed">{fb.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUMMARY CARD */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm font-mono text-slate-600 space-y-3">
        <h3 className="font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2 uppercase text-xs tracking-wider">Résumé Technique</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-400 uppercase">Défi</p>
            <p className="font-medium text-slate-800">{challenge.title}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase">Solution IA</p>
            <p className="font-medium text-slate-800">{challenge.suggestedUseCases.find(u => u.id === userChoice.useCase)?.label || "Personnalisée"}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase">Ambition</p>
            <p className="font-medium text-slate-800">{userChoice.ambition}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase">Sécurisation</p>
            <p className="font-medium text-slate-800">{userChoice.selectedSafeguards.length} garde-fous activés</p>
          </div>
        </div>
      </div>

      <Button onClick={handleComplete} fullWidth className="text-lg py-4 shadow-xl shadow-emerald-200/50">
        Valider et retourner au camp de base <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
};