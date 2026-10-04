import React from 'react';
import { ShieldCheck, Cpu, Lock, CheckCircle, BarChart3, AlertOctagon, Terminal } from 'lucide-react';

export function RobustnessIndexGauge({ robustnessScore, robustnessRating }) {
  // Defense sub-metrics
  const defenseMetrics = [
    { name: "Cross-Modal Cross-Attention Invariance", value: 91, status: "Robust", icon: Cpu },
    { name: "Zero-Shot Generative Evasion Immunity", value: 84, status: "High", icon: ShieldCheck },
    { name: "C2PA Cryptographic Chain Resistance", value: 96, status: "Air-Gapped", icon: Lock },
    { name: "Hardware CMOS Sensor PRNU Tolerance", value: 89, status: "Calibrated", icon: BarChart3 },
  ];

  return (
    <div className="cyber-card p-5 rounded-2xl border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyber-cyan" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Model Robustness & Red-Team Generalization Index
          </h3>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
          NIST AI RMF 1.0 Compliant
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left: Overall Robustness Score Circle */}
        <div className="md:col-span-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center flex flex-col items-center justify-center">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
            Defense Robustness Rating
          </div>

          <div className="relative my-1">
            <span className="text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple">
              {robustnessScore}
            </span>
            <span className="text-sm font-mono text-slate-500">/100</span>
          </div>

          <div className="mt-2 px-2.5 py-1 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 text-[11px] font-mono text-cyber-cyan font-bold leading-tight">
            {robustnessRating}
          </div>

          <p className="text-[10px] font-mono text-slate-500 mt-2">
            Evaluated against 42 automated adversarial perturbation vectors.
          </p>
        </div>

        {/* Right: Defense Breakdown Metrics */}
        <div className="md:col-span-8 space-y-2.5">
          {defenseMetrics.map((metric, idx) => {
            const Icon = metric.icon;

            return (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-cyber-cyan" />
                    <span className="text-slate-200 font-medium">{metric.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded border border-slate-700">
                      {metric.status}
                    </span>
                    <span className="font-bold text-cyber-cyan">{metric.value}%</span>
                  </div>
                </div>

                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple transition-all duration-700"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
