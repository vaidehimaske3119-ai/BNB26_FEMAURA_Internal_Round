import React from 'react';
import { Sliders, Shield, Zap, AlertTriangle, RefreshCw, Skull, Sparkles, Flame } from 'lucide-react';
import { ATTACK_DEFINITIONS } from '../../data/mockCases';

export function AttackControlPanel({ 
  activeAttacks, 
  onToggleAttack, 
  onApplyPreset, 
  caseAttackWeights 
}) {
  return (
    <div className="cyber-card p-5 rounded-2xl border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyber-purple" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Adversarial Red-Team Control Matrix
          </h3>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
          <span className="text-slate-500 mr-1">Presets:</span>
          <button
            onClick={() => onApplyPreset('clear')}
            className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={() => onApplyPreset('audioVisual')}
            className="px-2 py-0.5 rounded bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 border border-purple-500/40 transition-colors flex items-center gap-1"
          >
            <Flame className="w-3 h-3 text-purple-400" />
            AV Deepfake
          </button>
          <button
            onClick={() => onApplyPreset('fullCascade')}
            className="px-2 py-0.5 rounded bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-500/50 transition-colors flex items-center gap-1 font-bold"
          >
            <Skull className="w-3 h-3 text-red-400" />
            Full Cascade
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 font-mono mb-4">
        Simulate zero-day synthetic tampering vectors against the active payload. Observe real-time neural cross-modal degradation.
      </p>

      {/* Switches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ATTACK_DEFINITIONS.map((attack) => {
          const isEnabled = !!activeAttacks[attack.id];
          const penalty = caseAttackWeights[attack.id] || -attack.defaultPenalty;

          return (
            <div
              key={attack.id}
              onClick={() => onToggleAttack(attack.id)}
              className={`p-3.5 rounded-xl border cursor-pointer select-none transition-all duration-200 relative group flex items-start justify-between gap-3 ${
                isEnabled
                  ? 'bg-purple-950/20 border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                  : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white group-hover:text-purple-300 transition-colors">
                      {attack.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      {attack.category}
                    </span>
                  </div>

                  {/* Penalty indicator */}
                  <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                    isEnabled ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-slate-500'
                  }`}>
                    {penalty} pts
                  </span>
                </div>

                <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2">
                  {attack.description}
                </p>

                {/* Detection signals */}
                <div className="flex flex-wrap gap-1 mt-2 text-[10px] font-mono text-slate-500">
                  <span className="text-slate-400">Triggers:</span>
                  {attack.detectionSignals.slice(0, 2).map((sig, i) => (
                    <span key={i} className="px-1.5 py-0.2 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {sig}
                    </span>
                  ))}
                </div>
              </div>

              {/* iOS / Cyber Style Toggle Switch */}
              <div className="pt-0.5 shrink-0">
                <div
                  className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
                    isEnabled ? 'bg-cyber-purple shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                      isEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
