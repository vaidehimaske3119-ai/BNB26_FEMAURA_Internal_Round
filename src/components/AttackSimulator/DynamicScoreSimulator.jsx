import React from 'react';
import { ArrowDownRight, ArrowRight, ShieldAlert, Zap, TrendingDown, Check, AlertCircle } from 'lucide-react';
import { ATTACK_DEFINITIONS } from '../../data/mockCases';

export function DynamicScoreSimulator({ 
  originalScore, 
  simulatedScore, 
  activeAttacks, 
  caseAttackWeights 
}) {
  const totalDelta = simulatedScore - originalScore; // e.g. -48
  const activeAttackKeys = Object.keys(activeAttacks).filter(k => activeAttacks[k]);

  // Determine post-attack threat level
  const getPostThreat = (score) => {
    if (score < 40) return { label: "CRITICAL BREACH / SYNTHETIC", color: "text-red-400", bg: "bg-red-950/80 border-red-500/40" };
    if (score < 70) return { label: "HEAVY MANIPULATION SUSPECTED", color: "text-amber-400", bg: "bg-amber-950/80 border-amber-500/40" };
    return { label: "HIGH AUTHENTICITY RESILIENCE", color: "text-emerald-400", bg: "bg-emerald-950/80 border-emerald-500/40" };
  };

  const postThreat = getPostThreat(simulatedScore);

  return (
    <div className="cyber-card p-5 sm:p-6 rounded-2xl border-slate-800 shadow-[0_0_25px_rgba(168,85,247,0.15)] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-cyber-purple blur-3xl opacity-10 pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-cyber-purple" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Real-Time Neural Attack Impact Simulator
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Monte Carlo Cross-Modal Simulation (10,000 Perturbations)
        </span>
      </div>

      {/* Comparison Score Boards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        
        {/* 1. Original Score Card */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center flex flex-col justify-between">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Original Baseline Trust Score
          </span>
          <div className="my-2">
            <span className="text-4xl font-extrabold font-mono text-slate-200">
              {originalScore}
            </span>
            <span className="text-sm font-mono text-slate-500">/100</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-slate-400 h-full rounded-full" style={{ width: `${originalScore}%` }} />
          </div>
        </div>

        {/* 2. Middle Delta Pill & Arrow */}
        <div className="flex flex-col items-center justify-center p-2 text-center">
          <div className="text-slate-500 font-mono text-[11px] uppercase mb-1">
            Simulated Attack Delta
          </div>
          <div className={`px-4 py-1.5 rounded-full font-mono font-extrabold text-sm border flex items-center gap-1.5 shadow-lg ${
            totalDelta < 0
              ? 'bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse'
              : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}>
            <ArrowDownRight className="w-4 h-4" />
            <span>{totalDelta === 0 ? '0' : totalDelta} PTS</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-2">
            {activeAttackKeys.length} Vector{activeAttackKeys.length === 1 ? '' : 's'} Injected
          </span>
        </div>

        {/* 3. Simulated Post-Attack Score Card */}
        <div className={`p-4 rounded-xl border text-center flex flex-col justify-between transition-all duration-300 ${
          simulatedScore < 40
            ? 'bg-red-950/20 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.25)]'
            : (simulatedScore < 70 ? 'bg-amber-950/20 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.25)]' : 'bg-emerald-950/20 border-emerald-500/50')
        }`}>
          <span className="text-xs font-mono text-white uppercase tracking-wider font-semibold">
            Post-Attack Simulated Score
          </span>
          <div className="my-2">
            <span className={`text-4xl font-extrabold font-mono ${
              simulatedScore < 40 ? 'text-red-400' : (simulatedScore < 70 ? 'text-amber-400' : 'text-emerald-400')
            }`}>
              {simulatedScore}
            </span>
            <span className="text-sm font-mono text-slate-500">/100</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                simulatedScore < 40 ? 'bg-red-500' : (simulatedScore < 70 ? 'bg-amber-500' : 'bg-emerald-500')
              }`} 
              style={{ width: `${Math.max(simulatedScore, 3)}%` }} 
            />
          </div>
        </div>

      </div>

      {/* Post Attack Threat Level Strip */}
      <div className={`mt-4 p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono ${postThreat.bg}`}>
        <div className="flex items-center gap-2">
          <ShieldAlert className={`w-4 h-4 ${postThreat.color}`} />
          <span className="font-bold text-slate-200">Simulated Classification:</span>
          <span className={`font-bold ${postThreat.color}`}>{postThreat.label}</span>
        </div>
        <span className="text-slate-400 text-[11px]">
          Posterior entropy increased by +{(Math.abs(totalDelta) * 0.042).toFixed(3)} nats
        </span>
      </div>

      {/* Dynamic Impact Delta Breakdown List */}
      <div className="mt-4 pt-3 border-t border-slate-800">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Active Adversarial Vector Traceback:
        </span>

        {activeAttackKeys.length === 0 ? (
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400 text-center">
            No synthetic attacks injected. Baseline model operating under untampered conditions.
          </div>
        ) : (
          <div className="space-y-1.5 font-mono text-xs">
            {activeAttackKeys.map(key => {
              const attackDef = ATTACK_DEFINITIONS.find(a => a.id === key);
              const penalty = caseAttackWeights[key] || -attackDef?.defaultPenalty || -15;

              return (
                <div key={key} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800/90 text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple animate-ping" />
                    <span className="text-white font-medium">{attackDef?.name || key} applied</span>
                    <span className="text-slate-500 text-[11px] hidden sm:inline">➔ {attackDef?.category}</span>
                  </div>
                  <div className="text-red-400 font-bold bg-red-950/60 px-2 py-0.5 rounded border border-red-500/30 text-[11px]">
                    Trust Score dropped by {penalty} points
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
