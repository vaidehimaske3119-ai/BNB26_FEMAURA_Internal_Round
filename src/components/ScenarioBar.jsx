import React from 'react';
import { Video, FileText, ShieldCheck, AlertTriangle, AlertCircle, CheckCircle2, ChevronRight, Hash } from 'lucide-react';

export function ScenarioBar({ cases, activeCaseId, onSelectCase }) {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 pt-5 pb-2">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-cyber-cyan" />
          <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
            Active Forensic Scenarios (Multi-Modal Stream Matrix)
          </h2>
        </div>
        <span className="text-[11px] font-mono text-slate-500 hidden sm:block">
          Select scenario to switch case context instantly
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {cases.map((c) => {
          const isActive = c.id === activeCaseId;
          
          // Badge styling
          const badgeConfig = {
            danger: {
              border: "border-red-500/40",
              bg: "bg-red-500/10",
              text: "text-red-400",
              glow: "shadow-[0_0_20px_rgba(239,68,68,0.25)]",
              pillBg: "bg-red-950/80 border-red-500/50 text-red-300",
              icon: AlertCircle
            },
            warning: {
              border: "border-amber-500/40",
              bg: "bg-amber-500/10",
              text: "text-amber-400",
              glow: "shadow-[0_0_20px_rgba(245,158,11,0.25)]",
              pillBg: "bg-amber-950/80 border-amber-500/50 text-amber-300",
              icon: AlertTriangle
            },
            success: {
              border: "border-emerald-500/40",
              bg: "bg-emerald-500/10",
              text: "text-emerald-400",
              glow: "shadow-[0_0_20px_rgba(16,185,129,0.25)]",
              pillBg: "bg-emerald-950/80 border-emerald-500/50 text-emerald-300",
              icon: CheckCircle2
            }
          }[c.threatBadgeType];

          const IconComponent = c.mediaIcon === "Video" ? Video : (c.mediaIcon === "FileText" ? FileText : ShieldCheck);
          const ThreatIcon = badgeConfig.icon;

          return (
            <button
              key={c.id}
              onClick={() => onSelectCase(c.id)}
              className={`relative text-left p-3.5 rounded-xl border transition-all duration-200 group flex flex-col justify-between ${
                isActive
                  ? `bg-slate-900/95 border-cyber-cyan shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyber-cyan/50`
                  : `bg-[#111827]/80 hover:bg-slate-900/80 border-slate-800 hover:border-slate-700`
              }`}
            >
              {/* Active Marker Indicator */}
              {isActive && (
                <div className="absolute -top-[1px] left-8 right-8 h-[2px] bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-cyan" />
              )}

              <div>
                {/* Header row: Case ID & Score Pill */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-cyber-cyan">
                    <IconComponent className="w-3.5 h-3.5 text-cyber-cyan" />
                    <span>CASE #{c.id}</span>
                  </div>

                  <div className={`px-2.5 py-0.5 rounded-full border text-xs font-mono font-bold flex items-center gap-1.5 ${badgeConfig.pillBg}`}>
                    <ThreatIcon className="w-3 h-3" />
                    <span>{c.initialScore}/100</span>
                  </div>
                </div>

                {/* Scenario Title */}
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors line-clamp-1">
                  {c.title}
                </h3>

                {/* Media Type pill */}
                <p className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-1">
                  <span className="text-slate-500">Payload:</span>
                  <span className="text-slate-300 font-medium">{c.mediaType}</span>
                </p>
              </div>

              {/* Inconsistency snippet */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase ${badgeConfig.bg} ${badgeConfig.text} border ${badgeConfig.border}`}>
                  {c.threatBadgeType === 'danger' ? 'High Risk' : (c.threatBadgeType === 'warning' ? 'Suspicious' : 'Authentic')}
                </span>
                
                <span className="text-slate-400 flex items-center gap-0.5 group-hover:text-cyber-cyan transition-colors">
                  Inspect
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
