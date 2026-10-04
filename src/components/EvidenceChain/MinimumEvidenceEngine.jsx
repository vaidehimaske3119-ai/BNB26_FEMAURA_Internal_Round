import React, { useState } from 'react';
import { HelpCircle, PlusCircle, CheckCircle2, Shield, ArrowUpRight, Sparkles, RefreshCw, UploadCloud, FileCheck2, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

export function MinimumEvidenceEngine({ 
  caseData, 
  attachedEvidence, 
  onToggleEvidence, 
  onSimulateAllAttachment, 
  onResetEvidence,
  effectiveScore
}) {
  const [isSimulating, setIsSimulating] = useState(false);

  const missingItems = caseData.missingEvidence || [];
  const allAttached = missingItems.length > 0 && missingItems.every(item => attachedEvidence[item.id]);

  const handleSimulateAll = () => {
    setIsSimulating(true);
    setTimeout(() => {
      onSimulateAllAttachment();
      setIsSimulating(false);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#a855f7', '#10b981']
        });
      } catch (e) {
        // Safe fallback
      }
    }, 600);
  };

  // Calculate potential confidence gain
  const totalPotentialGain = missingItems.reduce((acc, item) => acc + item.confidenceGain, 0);

  return (
    <div className="cyber-card p-5 sm:p-6 rounded-2xl border-slate-800 shadow-[0_0_25px_rgba(6,182,212,0.15)] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-cyber-cyan blur-3xl opacity-10 pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HelpCircle className="w-4 h-4 text-cyber-cyan" />
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-100">
              Minimum Evidence Engine
            </h3>
          </div>
          <p className="text-xs text-cyber-cyan font-mono italic">
            "What Additional Evidence Is Needed To Confirm Authenticity?"
          </p>
        </div>

        {/* Global Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateAll}
            disabled={isSimulating || allAttached}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              allAttached
                ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 cursor-default'
                : 'bg-gradient-to-r from-cyber-cyan via-teal-500 to-cyber-cyan text-slate-950 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-95'
            }`}
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Injecting Cryptographic Proofs...</span>
              </>
            ) : allAttached ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>All Evidence Attached</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>[Simulate Source Attachment]</span>
              </>
            )}
          </button>

          {allAttached && (
            <button
              onClick={onResetEvidence}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              title="Reset Evidence Simulation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Resolution Banner */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-5">
        <div>
          <span className="text-xs font-mono text-slate-400 block mb-0.5">
            Dynamic Score Projection with Evidence Resolution:
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Current Projected Trust Score:</span>
            <span className={`text-xl font-mono font-extrabold ${
              effectiveScore >= 80 ? 'text-emerald-400' : (effectiveScore >= 50 ? 'text-amber-400' : 'text-red-400')
            }`}>
              {effectiveScore} / 100
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
              +{effectiveScore - caseData.initialScore}% Delta Resolved
            </span>
          </div>
        </div>

        <p className="text-[11px] font-mono text-slate-400 max-w-sm">
          Fulfilling the missing evidence requirements shifts Bayesian posterior from hypothesis ambiguity to cryptographic certainty.
        </p>
      </div>

      {/* Missing Items List */}
      <div className="space-y-3">
        {missingItems.length === 0 ? (
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Complete chain of custody. Zero critical missing evidence requirements.</span>
          </div>
        ) : (
          missingItems.map((item) => {
            const isAttached = !!attachedEvidence[item.id];

            return (
              <div
                key={item.id}
                onClick={() => onToggleEvidence(item.id)}
                className={`p-3.5 rounded-xl border cursor-pointer select-none transition-all duration-200 relative group flex items-start justify-between gap-3 ${
                  isAttached
                    ? 'bg-emerald-950/25 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 p-1.5 rounded-lg border ${
                    isAttached 
                      ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400' 
                      : 'bg-amber-950/80 border-amber-500/50 text-amber-400'
                  }`}>
                    {isAttached ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-xs font-mono font-bold ${isAttached ? 'text-emerald-300' : 'text-white'}`}>
                        {item.title}
                      </span>
                      {item.required && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-red-950/80 text-red-300 border border-red-500/40 uppercase font-semibold">
                          Required
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-slate-500">
                        Source: {item.sourceType}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Right: Confidence Gain Badge & Interactive Checkbox */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${
                    isAttached
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan/30'
                  }`}>
                    +{item.confidenceGain}%
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleEvidence(item.id);
                    }}
                    className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-colors flex items-center gap-1 ${
                      isAttached
                        ? 'bg-emerald-900/60 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-cyber-cyan'
                    }`}
                  >
                    {isAttached ? 'Attached ✓' : 'Attach +'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
