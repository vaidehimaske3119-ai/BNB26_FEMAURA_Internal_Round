import React from 'react';
import { Search, Zap, GitBranch, AlertCircle, ShieldAlert, Cpu } from 'lucide-react';

export function CoreTabs({ activeTab, onSelectTab, anomalyCount, activeAttackCount, missingEvidenceCount }) {
  const tabs = [
    {
      id: "dcs",
      label: "Digital Crime Scene",
      sublabel: "DCS Investigation",
      icon: Search,
      badgeText: `${anomalyCount} Anomaly${anomalyCount === 1 ? '' : 'ies'}`,
      badgeColor: anomalyCount > 0 ? "bg-red-500/20 text-red-300 border-red-500/40" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
    },
    {
      id: "simulator",
      label: '"What-If?" Attack Simulator',
      sublabel: "Red Team Engine",
      icon: Zap,
      badgeText: `${activeAttackCount} Vector${activeAttackCount === 1 ? '' : 's'} Active`,
      badgeColor: activeAttackCount > 0 ? "bg-purple-500/20 text-purple-300 border-purple-500/40" : "bg-slate-700/40 text-slate-400 border-slate-600/40"
    },
    {
      id: "evidence",
      label: "Minimum Evidence & Trust Chain",
      sublabel: "Provenance & Custody",
      icon: GitBranch,
      badgeText: `${missingEvidenceCount} Missing Req`,
      badgeColor: missingEvidenceCount > 0 ? "bg-amber-500/20 text-amber-300 border-amber-500/40" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-800 bg-[#0c121e]/80 p-1.5 rounded-xl border">
        <div className="flex items-center gap-2 w-full overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex-1 min-w-[220px] flex items-center justify-between px-4 py-2.5 rounded-lg font-mono text-xs transition-all duration-200 ${
                  isActive
                    ? "bg-slate-800/90 text-white border border-cyber-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-850 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-md ${isActive ? 'bg-cyber-cyan/20 text-cyber-cyan' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold tracking-wide font-sans text-xs sm:text-sm text-slate-100">
                      {tab.label}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
                      {tab.sublabel}
                    </div>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ml-2 ${tab.badgeColor}`}>
                  {tab.badgeText}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
