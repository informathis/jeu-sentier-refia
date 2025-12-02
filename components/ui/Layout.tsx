import React from 'react';
import { Mountain, Map, Trophy } from 'lucide-react';
import { Screen } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: Screen;
  totalScore: number;
  completedCount: number;
  onGoHome: () => void;
  onGoDashboard: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentScreen, 
  totalScore, 
  completedCount,
  onGoHome,
  onGoDashboard
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={onGoHome} className="flex items-center gap-2 group">
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700 group-hover:bg-emerald-200 transition-colors">
              <Mountain size={24} />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 leading-tight">Sentier REF'IA</h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Randonnée Pédagogique</p>
            </div>
          </button>

          <div className="flex items-center gap-4">
            {currentScreen !== Screen.HOME && (
              <div className="flex items-center gap-3 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                <div className="flex items-center gap-1.5" title="Étapes franchies">
                  <Map size={16} className="text-amber-600" />
                  <span>{completedCount}/5</span>
                </div>
                <div className="w-px h-4 bg-slate-300"></div>
                <div className="flex items-center gap-1.5" title="Score global">
                  <Trophy size={16} className="text-amber-600" />
                  <span>{totalScore} pts</span>
                </div>
              </div>
            )}
            
            {currentScreen !== Screen.HOME && currentScreen !== Screen.DASHBOARD && (
              <button 
                onClick={onGoDashboard}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
                title="Carnet de route"
              >
                <Map size={20} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-slate-400 text-sm border-t border-slate-200 mt-auto bg-slate-50">
        <p>Jeu sérieux conçu pour la DRIAAF Île-de-France — Expérimentation responsable</p>
      </footer>
    </div>
  );
};