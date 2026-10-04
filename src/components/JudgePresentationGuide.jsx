import React, { useEffect, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, X, Sparkles, Award, CheckCircle2, ChevronRight, Zap, ShieldAlert, GitBranch, Download } from 'lucide-react';

export function JudgePresentationGuide({
  isActive,
  onClose,
  currentStep,
  onSetStep,
  isPlaying,
  onTogglePlay,
  totalSecondsRemaining
}) {
  if (!isActive) return null;

  const steps = [
    {
      num: 1,
      title: "Step 1: Case Selection & Ingest",
      badge: "Multimodal Threat",
      icon: ShieldAlert,
      talkingPoint: "Ingesting Case #TL-1024: Viral broadcast video with suspicious synthetic traits. Base trust score drops to 32/100 (Critical Anomaly).",
      actionHint: "Observing multi-modal breakdown: Image, Audio, Video, Text, Metadata."
    },
    {
      num: 2,
      title: "Step 2: Cross-Modal Anomaly & Heatmap",
      badge: "DCS Investigation",
      icon: Sparkles,
      talkingPoint: "Neural Consistency Check detects phoneme-viseme lag (148ms) between 00:03s – 00:08s. Manipulation heatmap isolates mouth & jaw blending boundaries.",
      actionHint: "Manipulation Heatmap active: Deepfake Lip-Sync Delta: +14%."
    },
    {
      num: 3,
      title: "Step 3: 'What-If?' Red Team Injection",
      badge: "Attack Simulator",
      icon: Zap,
      talkingPoint: "Red-team attack injection: Simulating zero-day synthetic voice clone and face swap. Observe real-time drop to 14/100 while evaluating NIST model robustness.",
      actionHint: "Dynamic score simulation with cumulative degradation delta."
    },
    {
      num: 4,
      title: "Step 4: Minimum Evidence Resolution",
      badge: "Trust Chain & Merkle DAG",
      icon: GitBranch,
      talkingPoint: "Engine answers: 'What evidence confirms authenticity?' Attaching raw broadcast source (+35%) and C2PA key (+25%) recovers confidence to 89%+.",
      actionHint: "Simulate Source Attachment resolved missing custody proofs."
    },
    {
      num: 5,
      title: "Step 5: Export Forensic Audit Report",
      badge: "ISO/IEC 27037 Certified",
      icon: Download,
      talkingPoint: "Generates tamper-evident forensic audit certificate with ECDSA P-384 hardware HSM seal, multi-modal evidence matrix, and JSON export.",
      actionHint: "Audit Certificate ready for courtroom and platform moderation."
    }
  ];

  const currentStepData = steps[currentStep - 1] || steps[0];
  const StepIcon = currentStepData.icon;

  return (
    <div className="fixed bottom-5 left-4 right-4 max-w-4xl mx-auto z-50 animate-slide-up">
      <div className="cyber-card bg-[#0b1120]/95 backdrop-blur-xl border border-cyber-cyan/60 rounded-2xl shadow-[0_0_35px_rgba(6,182,212,0.35)] p-4 sm:p-5">
        
        {/* Top Bar: Progress and Timer */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-ping" />
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-white">
              <Award className="w-4 h-4 text-cyber-cyan" />
              <span className="tracking-wider uppercase">Live Judge Presentation Mode</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-cyber-purple/20 text-purple-300 border border-purple-500/40 text-[10px] font-mono font-bold hidden sm:inline">
              45s Auto-Walkthrough
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-400 text-[11px] hidden sm:inline">
              Step {currentStep} of {steps.length}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyber-cyan font-bold">
              {totalSecondsRemaining}s LEFT
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              title="Exit Presentation Mode"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Progress Dots & Bar */}
        <div className="grid grid-cols-5 gap-1.5 mb-3.5">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => onSetStep(s.num)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s.num === currentStep
                  ? 'bg-cyber-cyan shadow-[0_0_10px_#06b6d4]'
                  : (s.num < currentStep ? 'bg-cyber-purple' : 'bg-slate-800 hover:bg-slate-700')
              }`}
              title={s.title}
            />
          ))}
        </div>

        {/* Script Content / Talking Points */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-1">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan shrink-0 mt-0.5">
              <StepIcon className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-white">
                  {currentStepData.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                  {currentStepData.badge}
                </span>
              </div>

              <p className="text-xs font-sans text-slate-200 leading-relaxed font-medium">
                {currentStepData.talkingPoint}
              </p>

              <div className="text-[11px] font-mono text-cyber-cyan/90 mt-1 flex items-center gap-1">
                <span>Action:</span>
                <span>{currentStepData.actionHint}</span>
              </div>
            </div>
          </div>

          {/* Interactive Player Controls */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-center border-t md:border-t-0 pt-2 md:pt-0 w-full md:w-auto justify-end">
            <button
              onClick={() => onSetStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-slate-300 border border-slate-800 transition-colors"
              title="Previous Step"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={onTogglePlay}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-cyan/20 hover:bg-cyber-cyan/30 text-cyber-cyan border border-cyber-cyan/50 text-xs font-mono font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)]"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Resume'}</span>
            </button>

            <button
              onClick={() => onSetStep(Math.min(5, currentStep + 1))}
              disabled={currentStep === 5}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-slate-300 border border-slate-800 transition-colors"
              title="Next Step"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
