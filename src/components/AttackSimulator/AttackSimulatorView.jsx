import React from 'react';
import { AttackControlPanel } from './AttackControlPanel';
import { DynamicScoreSimulator } from './DynamicScoreSimulator';
import { RobustnessIndexGauge } from './RobustnessIndexGauge';

export function AttackSimulatorView({ 
  caseData, 
  activeAttacks, 
  onToggleAttack, 
  onApplyPreset, 
  simulatedScore 
}) {
  return (
    <div className="space-y-6">
      {/* 1. Dynamic Score Simulator: Baseline vs Post-Attack with Delta Indicators */}
      <DynamicScoreSimulator
        originalScore={caseData.initialScore}
        simulatedScore={simulatedScore}
        activeAttacks={activeAttacks}
        caseAttackWeights={caseData.attackWeights}
      />

      {/* 2. Control Panel with Interactive Toggles */}
      <AttackControlPanel
        activeAttacks={activeAttacks}
        onToggleAttack={onToggleAttack}
        onApplyPreset={onApplyPreset}
        caseAttackWeights={caseData.attackWeights}
      />

      {/* 3. Robustness Index Gauge */}
      <RobustnessIndexGauge
        robustnessScore={caseData.robustnessScore}
        robustnessRating={caseData.robustnessRating}
      />
    </div>
  );
}
