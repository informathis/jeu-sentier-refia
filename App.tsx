import React, { useState } from 'react';
import { Layout } from './components/ui/Layout';
import { HomeScreen } from './screens/HomeScreen';
import { MapScreen } from './screens/MapScreen';
import { DesignScreen } from './screens/DesignScreen';
import { StrategyScreen } from './screens/StrategyScreen';
import { ResultScreen } from './screens/ResultScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { Screen, GlobalState, Challenge, UserChoice, CompletedHike } from './types';

export default function App() {
  const [gameState, setGameState] = useState<GlobalState>({
    screen: Screen.HOME,
    history: [],
    activeChallenge: null,
    currentChoices: null
  });

  const updateState = (updates: Partial<GlobalState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  const handleStartGame = () => updateState({ screen: Screen.MAP });

  const handleSelectChallenge = (challenge: Challenge) => {
    updateState({ 
      activeChallenge: challenge, 
      screen: Screen.DESIGN,
      currentChoices: {
        challengeId: challenge.id,
        useCase: '',
        selectedBenefits: [],
        selectedData: [],
        selectedRisks: [],
        selectedSafeguards: [],
        ambition: null as any
      }
    });
  };

  const handleDesignNext = (choices: Partial<UserChoice>) => {
    updateState({
      currentChoices: { ...gameState.currentChoices!, ...choices },
      screen: Screen.STRATEGY
    });
  };

  const handleStrategyFinish = (finalChoice: UserChoice) => {
    updateState({
      currentChoices: finalChoice,
      screen: Screen.RESULT
    });
  };

  const handleSaveResult = (result: CompletedHike) => {
    updateState({
      history: [...gameState.history.filter(h => h.challengeId !== result.challengeId), result],
      screen: Screen.MAP, // Go back to map to choose next, or Dashboard
      activeChallenge: null,
      currentChoices: null
    });
  };

  // Compute stats for Layout
  const totalScore = gameState.history.reduce((acc, h) => acc + h.score, 0);
  const completedCount = gameState.history.length;

  return (
    <Layout
      currentScreen={gameState.screen}
      totalScore={totalScore}
      completedCount={completedCount}
      onGoHome={() => updateState({ screen: Screen.HOME })}
      onGoDashboard={() => updateState({ screen: Screen.DASHBOARD })}
    >
      {gameState.screen === Screen.HOME && (
        <HomeScreen onStart={handleStartGame} />
      )}

      {gameState.screen === Screen.MAP && (
        <MapScreen 
          completedIds={gameState.history.map(h => h.challengeId)} 
          onSelectChallenge={handleSelectChallenge} 
        />
      )}

      {gameState.screen === Screen.DESIGN && gameState.activeChallenge && (
        <DesignScreen 
          challenge={gameState.activeChallenge} 
          onNext={handleDesignNext}
          initialData={gameState.currentChoices || undefined}
        />
      )}

      {gameState.screen === Screen.STRATEGY && gameState.currentChoices && (
        <StrategyScreen 
          userChoice={gameState.currentChoices} 
          onFinish={handleStrategyFinish}
          onBack={() => updateState({ screen: Screen.DESIGN })}
        />
      )}

      {gameState.screen === Screen.RESULT && gameState.activeChallenge && gameState.currentChoices && (
        <ResultScreen 
          challenge={gameState.activeChallenge}
          userChoice={gameState.currentChoices}
          onSaveAndExit={handleSaveResult}
        />
      )}

      {gameState.screen === Screen.DASHBOARD && (
        <DashboardScreen 
          history={gameState.history} 
          onReplay={() => updateState({ screen: Screen.MAP })}
        />
      )}
    </Layout>
  );
}