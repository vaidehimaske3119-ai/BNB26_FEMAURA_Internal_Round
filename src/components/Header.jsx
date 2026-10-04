import React from 'react';
import { Shield, Activity, FileCheck, Terminal, Cpu, Download, UploadCloud, Play, Sparkles, Award } from 'lucide-react';

export function Header({ 
  onOpenReport, 
  onOpenScanner,
  isPresentationActive,
  onTogglePresentation,
  activeCase 
}) {
  return (
    <header className="border-b border-cyber-border bg-[#0b101c]/90 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        
        {/* Brand & Identity */}
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/30 border border-cyber-cyan/50 flex items-center justify-center text-cyber-cyan shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Shield className="w-5 h-5 text-cyber-cyan" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-cyan"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-wider text-white font-sans flex items-center gap-1.5">
                TRUST<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple">LAYER</span>
              </h1>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
                v2.0 PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono tracking-tight hidden sm:block">
              AI-Powered Digital Forensics & Authenticity Engine
            </p>
          </div>
        </div>

        {/* Status Pill & Actions */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Neural Engine Status Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-mono shadow-inner hidden lg:flex">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">Engine:</span>
            <span className="text-emerald-400 font-semibold tracking-wide flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-cyber-cyan inline" />
              Neural Engine Active
            </span>
            <span className="text-slate-500 text-[10px] border-l border-slate-700 pl-2">
              18ms
            </span>
          </div>

          {/* 1. Scan New Media Button */}
          <button
            onClick={onOpenScanner}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-850 border border-cyber-cyan/40 hover:border-cyber-cyan text-cyber-cyan hover:text-white text-xs font-semibold tracking-wider font-mono uppercase transition-all duration-200 shadow-[0_0_12px_rgba(6,182,212,0.15)] group active:scale-[0.98]"
          >
            <UploadCloud className="w-4 h-4 text-cyber-cyan group-hover:scale-110 transition-transform" />
            <span>Scan New Media</span>
          </button>

          {/* 2. Live Judge Presentation Mode Button */}
          <button
            onClick={onTogglePresentation}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wider font-mono uppercase transition-all duration-200 border ${
              isPresentationActive
                ? 'bg-gradient-to-r from-cyber-purple/30 via-cyber-cyan/30 to-cyber-purple/30 border-cyber-cyan text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] animate-pulse'
                : 'bg-cyber-purple/15 hover:bg-cyber-purple/25 border-cyber-purple/50 text-purple-200 hover:text-white shadow-[0_0_12px_rgba(168,85,247,0.2)]'
            }`}
          >
            <Award className="w-4 h-4 text-cyber-purple" />
            <span>{isPresentationActive ? 'Tour Active' : 'Judge Demo Mode'}</span>
          </button>

          {/* 3. Export Forensic Audit Report Button */}
          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyber-cyan/15 via-cyber-purple/20 to-cyber-cyan/15 hover:from-cyber-cyan/25 hover:to-cyber-purple/30 border border-cyber-cyan/40 hover:border-cyber-cyan text-white text-xs font-semibold tracking-wider font-mono uppercase transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] group active:scale-[0.98]"
          >
            <Download className="w-4 h-4 text-cyber-cyan group-hover:translate-y-0.5 transition-transform" />
            <span className="hidden sm:inline">Export Audit Report</span>
            <span className="sm:hidden">Report</span>
          </button>
        </div>

      </div>
    </header>
  );
}
