import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Filter, Layers, Clock, Zap, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

export function MismatchFeed({ mismatchFeed }) {
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [expandedItems, setExpandedItems] = useState({ 'm-01': true, 'm-11': true, 'm-21': true });

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFeed = mismatchFeed.filter(item => {
    if (filterSeverity === 'all') return true;
    return item.severity === filterSeverity;
  });

  return (
    <div className="cyber-card p-5 rounded-2xl border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyber-cyan" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Cross-Modal Mismatch Feed & Forensic Evidence
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {filteredFeed.length} Findings
          </span>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
          <Filter className="w-3 h-3 text-slate-500 ml-1.5" />
          {['all', 'danger', 'warning', 'success'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-2 py-0.5 rounded uppercase text-[10px] font-bold transition-colors ${
                filterSeverity === sev
                  ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sev === 'all' ? 'All' : (sev === 'danger' ? 'High Risk' : (sev === 'warning' ? 'Suspicious' : 'Coherent'))}
            </button>
          ))}
        </div>
      </div>

      {/* Mismatch Feed List */}
      <div className="space-y-3">
        {filteredFeed.map((item) => {
          const isDanger = item.severity === "danger";
          const isWarning = item.severity === "warning";
          const isExpanded = !!expandedItems[item.id];

          const theme = isDanger
            ? {
                border: "border-red-500/40 hover:border-red-500/70",
                bg: "bg-red-950/10",
                icon: AlertCircle,
                iconColor: "text-red-400",
                pill: "bg-red-500/15 border-red-500/30 text-red-300"
              }
            : isWarning
            ? {
                border: "border-amber-500/40 hover:border-amber-500/70",
                bg: "bg-amber-950/10",
                icon: AlertTriangle,
                iconColor: "text-amber-400",
                pill: "bg-amber-500/15 border-amber-500/30 text-amber-300"
              }
            : {
                border: "border-emerald-500/40 hover:border-emerald-500/70",
                bg: "bg-emerald-950/10",
                icon: CheckCircle2,
                iconColor: "text-emerald-400",
                pill: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
              };

          const IconComponent = theme.icon;

          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${theme.bg} ${theme.border}`}
            >
              {/* Item Header */}
              <div
                onClick={() => toggleExpand(item.id)}
                className="p-3.5 flex items-start justify-between gap-3 cursor-pointer select-none hover:bg-slate-900/40"
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 p-1 rounded-md bg-slate-900 border border-slate-800 ${theme.iconColor}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-white tracking-wide">
                        {item.title}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${theme.pill}`}>
                        {item.type}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {item.timestamp}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span>
                        Confidence: <strong className="text-white">{item.confidence}</strong>
                      </span>
                      <span className="text-slate-600">•</span>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-500">Vector:</span>
                        {item.modalities.map((m, idx) => (
                          <span key={idx} className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <button className="text-slate-500 hover:text-slate-300 p-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Expanded Forensic Deep-Dive Panel */}
              {isExpanded && (
                <div className="px-4 pb-3.5 pt-2 border-t border-slate-800/80 bg-slate-950/60 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
                    <Zap className="w-3.5 h-3.5 text-cyber-cyan shrink-0 mt-0.5" />
                    <div>
                      <span className="text-cyber-cyan font-bold uppercase text-[10px] tracking-wider block mb-1">
                        Forensic Reasoning Output & Signal Proof:
                      </span>
                      <span className="text-slate-300 leading-relaxed">
                        {item.forensicFinding}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
