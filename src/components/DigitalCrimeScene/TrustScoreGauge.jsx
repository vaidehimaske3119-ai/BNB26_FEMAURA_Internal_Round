import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Shield, Eye, Volume2, Film, FileText, Binary, Info } from 'lucide-react';

export function TrustScoreGauge({ caseData }) {
  const { initialScore, threatLevel, threatBadgeType, modalBreakdown, fileDetails } = caseData;

  // Determine colors based on score
  const isDanger = threatBadgeType === "danger";
  const isWarning = threatBadgeType === "warning";
  const isSuccess = threatBadgeType === "success";

  const primaryColor = isDanger ? "#ef4444" : (isWarning ? "#f59e0b" : "#10b981");
  const glowClass = isDanger ? "shadow-[0_0_30px_rgba(239,68,68,0.25)]" : (isWarning ? "shadow-[0_0_30px_rgba(245,158,11,0.25)]" : "shadow-[0_0_30px_rgba(16,185,129,0.25)]");

  // SVG Gauge calculations (circumference for radius 58 is ~364.4)
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (initialScore / 100) * circumference;

  const modalIcons = {
    image: Eye,
    audio: Volume2,
    video: Film,
    text: FileText,
    metadata: Binary
  };

  return (
    <div className={`cyber-card p-5 sm:p-6 rounded-2xl relative overflow-hidden ${glowClass} border-slate-800`}>
      {/* Background ambient gradient */}
      <div 
        className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Overall Trust Score Circular Gauge */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row items-center gap-5 border-b lg:border-b-0 lg:border-r border-slate-800/80 pb-5 lg:pb-0 lg:pr-6">
          <div className="relative flex items-center justify-center">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke={primaryColor}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
                style={{ filter: `drop-shadow(0 0 8px ${primaryColor})` }}
              />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold font-mono text-white tracking-tighter">
                {initialScore}
                <span className="text-xs text-slate-500 font-sans font-normal">/100</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mt-0.5">
                Trust Score
              </span>
            </div>
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1.5">
              {isDanger && <AlertCircle className="w-4 h-4 text-red-400 animate-pulse" />}
              {isWarning && <AlertTriangle className="w-4 h-4 text-amber-400" />}
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              <span className="text-xs font-mono font-semibold tracking-wider text-slate-400">
                THREAT LEVEL
              </span>
            </div>

            <div className={`inline-block px-3 py-1 rounded-md text-xs font-mono font-extrabold tracking-wide uppercase border ${
              isDanger ? "bg-red-500/15 border-red-500/40 text-red-400" :
              (isWarning ? "bg-amber-500/15 border-amber-500/40 text-amber-400" : "bg-emerald-500/15 border-emerald-500/40 text-emerald-400")
            }`}>
              {threatLevel}
            </div>

            <p className="text-xs text-slate-400 mt-2 font-mono line-clamp-2">
              {caseData.classification}
            </p>
          </div>
        </div>

        {/* Right: Multi-Modal Forensic Breakdown Badges */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyber-cyan" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Multi-Modal Neural Assessment Vectors
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              Confidence Calibrated (Bayesian Prior)
            </span>
          </div>

          {/* 5 Modality Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {Object.entries(modalBreakdown).map(([key, item]) => {
              const Icon = modalIcons[key] || Shield;
              const isItemDanger = item.status === "danger";
              const isItemWarning = item.status === "warning";
              const isItemSuccess = item.status === "emerald";

              const badgeColor = isItemDanger 
                ? "bg-red-950/40 border-red-500/40 text-red-300 hover:border-red-500" 
                : (isItemWarning 
                    ? "bg-amber-950/40 border-amber-500/40 text-amber-300 hover:border-amber-500" 
                    : "bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:border-emerald-500");

              const dotColor = isItemDanger ? "bg-red-400" : (isItemWarning ? "bg-amber-400" : "bg-emerald-400");

              return (
                <div 
                  key={key} 
                  className={`p-2.5 rounded-xl border transition-all duration-200 ${badgeColor} group relative flex flex-col justify-between`}
                  title={item.note}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium text-slate-300 truncate font-sans">
                      {item.label}
                    </span>
                    <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                  </div>

                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-base font-bold font-mono text-white">
                      {item.score}%
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-mono">
                      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
                      {isItemDanger ? "FAIL" : (isItemWarning ? "WARN" : "PASS")}
                    </span>
                  </div>

                  {/* Micro Progress Bar */}
                  <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        isItemDanger ? 'bg-red-500' : (isItemWarning ? 'bg-amber-500' : 'bg-emerald-500')
                      }`} 
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Forensic Metadata Strip */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-y-1">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">File:</span>
              <span className="text-slate-200">{fileDetails.filename}</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-200">{fileDetails.codec}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">SHA-256:</span>
              <span className="text-cyber-cyan truncate max-w-[140px] sm:max-w-[200px]" title={fileDetails.sha256}>
                {fileDetails.sha256.substring(0, 16)}...
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
