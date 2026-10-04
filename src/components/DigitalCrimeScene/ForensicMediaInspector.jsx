import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Eye, ShieldAlert, Cpu, CheckCircle2, Sliders, Scan, Crosshair, Sparkles, Flame, Layers } from 'lucide-react';

export function ForensicMediaInspector({ 
  caseData,
  showHeatmapProp,
  onToggleHeatmapProp
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(4.2); // Default in the anomaly zone
  const [showWireframe, setShowWireframe] = useState(true);
  const [showElaHeatmap, setShowElaHeatmap] = useState(true);
  
  // Local state or controlled from parent
  const [localShowHeatmap, setLocalShowHeatmap] = useState(true);
  const showManipulationHeatmap = showHeatmapProp !== undefined ? showHeatmapProp : localShowHeatmap;
  const toggleHeatmap = onToggleHeatmapProp || (() => setLocalShowHeatmap(prev => !prev));

  // Play animation timer
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 14.5) return 0;
          return Number((prev + 0.1).toFixed(1));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const isVideoCase = caseData.id === "TL-1024";
  const isDocCase = caseData.id === "TL-1025";
  const isAuthenticCase = caseData.id === "TL-1026";

  const isInAnomalyZone = isVideoCase && currentTime >= 3.0 && currentTime <= 8.2;

  return (
    <div className="cyber-card p-5 rounded-2xl border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Scan className="w-4 h-4 text-cyber-cyan" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Interactive Forensic Media Scrubber & Neural Heatmap
          </h3>
        </div>

        {/* Global Controls & Manipulation Heatmap Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Prominent Manipulation Heatmap Toggle Switch */}
          <button
            onClick={toggleHeatmap}
            className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-md ${
              showManipulationHeatmap
                ? 'bg-gradient-to-r from-red-500/20 via-purple-500/20 to-red-500/20 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${showManipulationHeatmap ? 'text-red-400 animate-pulse' : 'text-slate-500'}`} />
            <span>Show Manipulation Heatmap</span>
            <span className={`w-2 h-2 rounded-full ml-1 ${showManipulationHeatmap ? 'bg-red-400 animate-ping' : 'bg-slate-600'}`} />
          </button>

          <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hidden sm:inline">
            Res: {caseData.fileDetails.resolution}
          </span>
        </div>
      </div>

      {/* Main Forensic Canvas Viewer */}
      <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video flex flex-col justify-between p-4 shadow-inner">
        {/* Subtle grid background */}
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

        {/* Viewport Top Bar */}
        <div className="relative z-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700/60 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>REC 00:0{Math.floor(currentTime)}:{(currentTime % 1).toFixed(2).substring(2)}</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyber-cyan">CH-01 MASTER</span>
          </div>

          {/* Sub-view toggle controls */}
          <div className="flex items-center gap-2">
            {isVideoCase && (
              <button
                onClick={() => setShowWireframe(!showWireframe)}
                className={`text-[10px] font-mono px-2 py-1 rounded border transition-colors flex items-center gap-1.5 ${
                  showWireframe
                    ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan'
                    : 'bg-black/60 border-slate-700 text-slate-400'
                }`}
              >
                <Crosshair className="w-3 h-3" />
                Facial 468-Mesh {showWireframe ? 'ON' : 'OFF'}
              </button>
            )}

            {isDocCase && (
              <button
                onClick={() => setShowElaHeatmap(!showElaHeatmap)}
                className={`text-[10px] font-mono px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 ${
                  showElaHeatmap
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-black/60 border-slate-700 text-slate-400'
                }`}
              >
                <Sliders className="w-3 h-3" />
                ELA Luminescence Filter {showElaHeatmap ? 'ACTIVE' : 'RAW'}
              </button>
            )}

            {isAuthenticCase && (
              <div className="text-[10px] font-mono px-2.5 py-1 rounded border bg-emerald-500/20 border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                C2PA ISO 22158 Seal Intact
              </div>
            )}
          </div>
        </div>

        {/* Viewport Center: Forensic Simulation Content with Interactive Manipulation Heatmap */}
        <div className="relative z-10 flex-1 flex items-center justify-center my-3">
          
          {/* CASE 1: Video Face Morph Simulation */}
          {isVideoCase && (
            <div className="relative flex flex-col items-center">
              
              {/* Simulated Subject Head & Mesh */}
              <div className="relative w-56 h-60 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 flex flex-col items-center justify-center p-3 shadow-2xl overflow-hidden">
                
                {/* Facial Mesh Lines Overlay */}
                {showWireframe && (
                  <div className="absolute inset-0 pointer-events-none opacity-40">
                    <svg className="w-full h-full text-cyber-cyan" viewBox="0 0 100 120">
                      <ellipse cx="50" cy="50" rx="35" ry="42" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
                      <line x1="25" y1="42" x2="45" y2="42" stroke="currentColor" strokeWidth="1" />
                      <line x1="55" y1="42" x2="75" y2="42" stroke="currentColor" strokeWidth="1" />
                      <polygon points="50,45 46,65 54,65" fill="none" stroke="currentColor" strokeWidth="0.8" />
                      <ellipse cx="50" cy="78" rx="16" ry="6" fill="none" stroke={isInAnomalyZone ? '#ef4444' : 'currentColor'} strokeWidth={isInAnomalyZone ? '1.8' : '0.8'} />
                    </svg>
                  </div>
                )}

                {/* THERMAL / ANOMALY HEATMAP OVERLAY GRADIENT */}
                {showManipulationHeatmap && (
                  <div className="absolute inset-0 pointer-events-none z-10 mix-blend-screen opacity-70">
                    {/* Hotspot over mouth */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-28 h-20 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 blur-xl opacity-80 animate-pulse" />
                    {/* Secondary hotspot over jaw edge */}
                    <div className="absolute bottom-12 left-4 w-12 h-16 rounded-full bg-purple-600 blur-lg opacity-60" />
                    <div className="absolute bottom-12 right-4 w-12 h-16 rounded-full bg-purple-600 blur-lg opacity-60" />
                  </div>
                )}

                {/* Eyes */}
                <div className="flex gap-10 mb-4 z-10 relative">
                  <div className="w-5 h-3 rounded-full bg-slate-300 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-900" />
                  </div>
                  <div className="w-5 h-3 rounded-full bg-slate-300 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-900" />
                  </div>

                  {/* Bounding Box on Eye Blink Asymmetry when Heatmap Active */}
                  {showManipulationHeatmap && (
                    <div className="absolute -top-3 -left-3 -right-3 -bottom-2 border border-cyan-400/60 rounded border-dashed pointer-events-none">
                      <span className="absolute -top-4 left-0 text-[8px] font-mono text-cyan-300 bg-slate-950/90 px-1 rounded border border-cyan-500/40">
                        Ocular Blink Asymmetry: 0.12Hz
                      </span>
                    </div>
                  )}
                </div>

                {/* Mouth & Phoneme Visualizer */}
                <div className={`z-10 px-3 py-1.5 rounded-lg border transition-all ${
                  isInAnomalyZone 
                    ? 'bg-red-500/30 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse' 
                    : 'bg-slate-800/80 border-slate-700 text-slate-300'
                }`}>
                  <div className="w-14 h-3.5 border border-current rounded-full flex items-center justify-center">
                    <span className="text-[9px] font-mono font-bold">
                      {isInAnomalyZone ? 'LAG: 148ms' : 'SYNC OK'}
                    </span>
                  </div>
                </div>

                {/* MANIPULATION HEATMAP BOUNDING BOX 1: LIP-SYNC DELTA */}
                {showManipulationHeatmap && (
                  <div className="absolute bottom-4 left-6 right-6 h-14 border-2 border-red-500 rounded-lg pointer-events-none z-20 shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse">
                    {/* Corner Crosshairs */}
                    <span className="absolute -top-1 -left-1 w-2 h-2 bg-red-400" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-400" />
                    <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-400" />
                    <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-red-400" />

                    {/* High-Impact Anomaly Callout Badge */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-950/95 border border-red-500 text-red-300 font-mono text-[9px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap flex items-center gap-1">
                      <Flame className="w-2.5 h-2.5 text-red-400" />
                      <span>Deepfake Lip-Sync Delta: +14%</span>
                    </div>

                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black/90 text-cyan-300 font-mono text-[8px] px-1.5 rounded whitespace-nowrap">
                      SyncNet Conf: 1.82 (Anomaly)
                    </div>
                  </div>
                )}

                {/* MANIPULATION HEATMAP BOUNDING BOX 2: FACIAL BLENDING BOUNDARY */}
                {showManipulationHeatmap && (
                  <div className="absolute top-2 bottom-2 left-2 right-2 border border-purple-500/70 border-dashed rounded-xl pointer-events-none z-10">
                    <span className="absolute top-1 right-2 text-[8px] font-mono text-purple-300 bg-slate-950/90 px-1 rounded border border-purple-500/40">
                      Facial Blending Boundary: 92% Anomaly
                    </span>
                  </div>
                )}

              </div>

              {/* Status Banner under subject */}
              <div className="mt-2 text-center">
                {showManipulationHeatmap ? (
                  <span className="text-[11px] font-mono text-red-300 font-bold bg-red-950/90 px-3 py-1 rounded-full border border-red-500/60 inline-flex items-center gap-1.5 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                    <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                    <span>MANIPULATION HEATMAP: Lip-Sync Delta (+14%) & Boundary Blend Confirmed</span>
                  </span>
                ) : isInAnomalyZone ? (
                  <span className="text-[11px] font-mono text-red-400 font-bold bg-red-950/80 px-2.5 py-0.5 rounded border border-red-500/50 inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    CRITICAL PHONEME MISMATCH (00:03s – 00:08s)
                  </span>
                ) : null}
              </div>
            </div>
          )}

          {/* CASE 2: Document ELA Inspection */}
          {isDocCase && (
            <div className="relative w-80 sm:w-96 h-48 rounded-lg bg-slate-900 border border-slate-700 p-3 shadow-xl overflow-hidden flex flex-col justify-between">
              <div>
                <div className="h-2 w-32 bg-slate-600 rounded mb-2" />
                <div className="space-y-1.5">
                  <div className="h-1.5 w-full bg-slate-700/80 rounded" />
                  <div className="h-1.5 w-5/6 bg-slate-700/80 rounded" />
                  <div className="h-1.5 w-4/6 bg-slate-700/80 rounded" />
                </div>
              </div>

              {/* Spliced Signature Block with Bounding Box Overlay */}
              <div className={`p-2.5 rounded border relative transition-all ${
                showElaHeatmap || showManipulationHeatmap
                  ? 'bg-amber-500/20 border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.5)]' 
                  : 'bg-slate-800/80 border-slate-700'
              }`}>
                {/* Bounding Box Callout */}
                {showManipulationHeatmap && (
                  <div className="absolute -inset-1 border-2 border-red-500 rounded pointer-events-none shadow-[0_0_15px_rgba(239,68,68,0.7)] animate-pulse">
                    <span className="absolute -top-5 left-2 bg-red-950 border border-red-500 text-red-300 font-mono text-[9px] font-bold px-1.5 rounded">
                      Deepfake / Spliced Signature: +14dB ELA Residual
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400">EXECUTIVE ENDORSEMENT:</span>
                  <span className="text-amber-400 font-bold bg-amber-950/80 px-1 rounded border border-amber-500/40">
                    ELA +14dB RESIDUAL
                  </span>
                </div>
                <div className="font-serif italic text-sm text-slate-200 tracking-wider">
                  Signature: J. R. Kensington, Director
                </div>
                {(showElaHeatmap || showManipulationHeatmap) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/20 to-red-500/30 rounded pointer-events-none mix-blend-screen" />
                )}
              </div>
            </div>
          )}

          {/* CASE 3: Authentic C2PA Stream */}
          {isAuthenticCase && (
            <div className="text-center p-5 rounded-xl bg-slate-900/80 border border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.2)] max-w-md relative">
              {showManipulationHeatmap && (
                <div className="absolute -inset-1 border-2 border-emerald-500/60 rounded-xl pointer-events-none">
                  <span className="absolute -top-3.5 left-4 bg-emerald-950 border border-emerald-500 text-emerald-300 font-mono text-[9px] font-bold px-2 rounded">
                    Tamper Proof: CMOS Sensor PRNU 97.4% Match
                  </span>
                </div>
              )}

              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto mb-2.5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white font-mono">
                C2PA Hardware Cryptographic Root Valid
              </h4>
              <p className="text-xs text-slate-300 font-mono mt-1">
                CMOS Sensor PRNU Noise Fingerprint correlates at 97.4% with registered ARRI Alexa 35 Camera #SN-35-081.
              </p>
              <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 py-1 px-3 rounded border border-emerald-500/30">
                <span>HSM Signer: NIST P-384</span>
                <span>•</span>
                <span>0 Tampering Vectors Detected</span>
              </div>
            </div>
          )}

        </div>

        {/* Viewport Bottom: Waveform & Playback Scrubber */}
        <div className="relative z-20 bg-slate-900/90 backdrop-blur-md p-3 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-md bg-cyber-cyan/20 hover:bg-cyber-cyan/30 text-cyber-cyan border border-cyber-cyan/40 transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => { setIsPlaying(false); setCurrentTime(0); }}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors"
                title="Reset Scrubber"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono text-slate-200">
                {currentTime.toFixed(1)}s / 15.0s
              </span>
            </div>

            {isVideoCase && (
              <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                <span>
                  {showManipulationHeatmap ? 'Heatmap: Lip-Sync Delta +14% (00:03s - 00:08s)' : 'Lip-sync Anomaly Window: 00:03s - 00:08s'}
                </span>
              </div>
            )}
          </div>

          {/* Interactive Scrub Bar with Anomaly Highlight Zone */}
          <div className="relative w-full h-5 bg-slate-950 rounded border border-slate-800 flex items-center overflow-hidden">
            {/* Highlight Anomaly Region (3.0s to 8.2s of 15s is 20% to 54.6%) */}
            {isVideoCase && (
              <div 
                className={`absolute h-full border-x transition-all ${
                  showManipulationHeatmap
                    ? 'bg-red-500/40 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                    : 'bg-red-500/25 border-red-500/60'
                }`}
                style={{ left: '20%', width: '34.6%' }}
              >
                {showManipulationHeatmap && (
                  <span className="absolute -top-0.5 left-1 text-[8px] font-mono font-bold text-red-200">
                    Acoustic Discontinuity @ 3.2kHz
                  </span>
                )}
              </div>
            )}

            {/* Playhead Marker */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-cyber-cyan shadow-[0_0_8px_#06b6d4] z-20 transition-all pointer-events-none"
              style={{ left: `${(currentTime / 15) * 100}%` }}
            />

            {/* Simulated Audio Waveform Bars */}
            <div className="w-full flex items-center justify-between px-1 h-3 opacity-50">
              {Array.from({ length: 48 }).map((_, i) => {
                const height = Math.sin(i * 0.4) * 6 + 7;
                const isAnomalyBar = isVideoCase && i >= 10 && i <= 26;
                return (
                  <div
                    key={i}
                    className={`w-0.5 rounded-full ${
                      isAnomalyBar 
                        ? (showManipulationHeatmap ? 'bg-red-400' : 'bg-red-500') 
                        : 'bg-cyan-500'
                    }`}
                    style={{ height: `${height}px` }}
                  />
                );
              })}
            </div>

            {/* Native range input overlay for scrubbing */}
            <input
              type="range"
              min="0"
              max="15"
              step="0.1"
              value={currentTime}
              onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full z-30"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
