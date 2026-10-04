import React, { useState } from 'react';
import { GitCommit, CheckCircle2, AlertTriangle, AlertCircle, Copy, Check, Clock, Shield, Key } from 'lucide-react';

export function ProvenanceTimeline({ provenanceChain }) {
  const [copiedHash, setCopiedHash] = useState(null);

  const handleCopy = (hash) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="cyber-card p-5 rounded-2xl border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-cyber-cyan" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Cryptographic Content Provenance Timeline (Trust Chain)
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          C2PA ISO-Compliant Merkle DAG Chain of Custody
        </span>
      </div>

      {/* Horizontal Step Line Summary on Desktop */}
      <div className="hidden lg:flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 mb-6 font-mono text-xs overflow-x-auto">
        {provenanceChain.map((step, idx) => {
          const isVerified = step.status === "verified";
          const isWarning = step.status === "warning";
          const isTampered = step.status === "tampered";

          const dotColor = isVerified ? "bg-emerald-400" : (isWarning ? "bg-amber-400" : "bg-red-500");
          const textColor = isVerified ? "text-emerald-300" : (isWarning ? "text-amber-300" : "text-red-400");

          return (
            <React.Fragment key={step.step}>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`w-2.5 h-2.5 rounded-full ${dotColor} shadow-[0_0_8px_currentColor]`} />
                <span className={`font-semibold ${textColor}`}>
                  {step.title}
                </span>
              </div>
              {idx < provenanceChain.length - 1 && (
                <div className="w-8 h-[2px] bg-slate-800 mx-2 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Vertical Detailed Timeline Flow */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
        {provenanceChain.map((item) => {
          const isVerified = item.status === "verified";
          const isWarning = item.status === "warning";
          const isTampered = item.status === "tampered";

          const theme = isVerified
            ? {
                dot: "bg-emerald-500 text-emerald-950 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]",
                card: "bg-emerald-950/10 border-emerald-500/30",
                badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
                title: "text-emerald-300",
                icon: CheckCircle2,
                label: "VERIFIED"
              }
            : isWarning
            ? {
                dot: "bg-amber-500 text-amber-950 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]",
                card: "bg-amber-950/10 border-amber-500/30",
                badge: "bg-amber-500/15 text-amber-300 border-amber-500/40",
                title: "text-amber-300",
                icon: AlertTriangle,
                label: "WARNING / COMPRESSION"
              }
            : {
                dot: "bg-red-500 text-red-950 border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.5)]",
                card: "bg-red-950/15 border-red-500/40",
                badge: "bg-red-500/15 text-red-300 border-red-500/40",
                title: "text-red-400",
                icon: AlertCircle,
                label: "TAMPERED / MANIPULATED"
              };

          const StatusIcon = theme.icon;

          return (
            <div key={item.step} className="relative group">
              {/* Stepper Dot on the timeline axis */}
              <div className={`absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center font-mono text-[10px] font-bold z-10 ${theme.dot}`}>
                {item.step}
              </div>

              {/* Step Card */}
              <div className={`p-4 rounded-xl border transition-all ${theme.card}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <StatusIcon className="w-4 h-4 shrink-0 inline" />
                    <h4 className={`text-xs font-mono font-bold tracking-wide ${theme.title}`}>
                      {item.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${theme.badge}`}>
                      {theme.label}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {item.timestamp}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 font-sans mb-2">
                  <strong className="text-slate-400 font-mono text-[11px] mr-1">Actor / Infrastructure:</strong>
                  {item.entity}
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs font-mono text-slate-300">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-0.5">
                    Forensic Observation:
                  </span>
                  {item.notes}
                </div>

                {/* Cryptographic Hash row */}
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800/60">
                  <div className="flex items-center gap-1.5 truncate max-w-[85%]">
                    <Key className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="text-slate-400">SHA-256:</span>
                    <span className="text-slate-300 truncate">
                      {item.hash}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(item.hash)}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    title="Copy Block Hash"
                  >
                    {copiedHash === item.hash ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
