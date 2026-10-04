import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_CASES, ATTACK_DEFINITIONS } from './data/mockCases';
import { Header } from './components/Header';
import { ScenarioBar } from './components/ScenarioBar';
import { CoreTabs } from './components/CoreTabs';
import { DigitalCrimeSceneView } from './components/DigitalCrimeScene/DigitalCrimeSceneView';
import { AttackSimulatorView } from './components/AttackSimulator/AttackSimulatorView';
import { EvidenceChainView } from './components/EvidenceChain/EvidenceChainView';
import { ReportModal } from './components/ReportModal';
import { MediaScannerModal } from './components/MediaScannerModal';
import { JudgePresentationGuide } from './components/JudgePresentationGuide';
import confetti from 'canvas-confetti';

export function App() {
  const [casesList, setCasesList] = useState(MOCK_CASES);
  const [activeCaseId, setActiveCaseId] = useState('TL-1024');
  const [activeTab, setActiveTab] = useState('dcs');
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [showManipulationHeatmap, setShowManipulationHeatmap] = useState(true);

  // Live Judge Presentation Mode State
  const [isPresentationActive, setIsPresentationActive] = useState(false);
  const [presentationStep, setPresentationStep] = useState(1);
  const [isPresentationPlaying, setIsPresentationPlaying] = useState(true);
  const [presentationSecondsRemaining, setPresentationSecondsRemaining] = useState(45);

  // Per-case attack simulator state
  const [attacksState, setAttacksState] = useState({
    'TL-1024': { ...MOCK_CASES[0].simulatorDefaults },
    'TL-1025': { ...MOCK_CASES[1].simulatorDefaults },
    'TL-1026': { ...MOCK_CASES[2].simulatorDefaults },
  });

  // Per-case attached evidence state
  const [evidenceState, setEvidenceState] = useState({
    'TL-1024': { 'ev-1': false, 'ev-2': false, 'ev-3': false },
    'TL-1025': { 'ev-11': false, 'ev-12': false, 'ev-13': false },
    'TL-1026': { 'ev-21': true },
  });

  // Active case data
  const currentCase = useMemo(() => {
    return casesList.find(c => c.id === activeCaseId) || casesList[0];
  }, [casesList, activeCaseId]);

  // Current active attacks for this case
  const currentAttacks = attacksState[activeCaseId] || {};

  // Current attached evidence for this case
  const currentEvidence = evidenceState[activeCaseId] || {};

  // Simulated Score Calculation for Attack Simulator
  const simulatedScore = useMemo(() => {
    let score = currentCase.initialScore;
    const weights = currentCase.attackWeights || {};

    Object.keys(currentAttacks).forEach(attackId => {
      if (currentAttacks[attackId]) {
        const penalty = weights[attackId] || -15;
        score += penalty;
      }
    });

    return Math.max(3, Math.min(99, score));
  }, [currentCase, currentAttacks]);

  // Effective Score with Evidence Attachment (for DCS & Evidence Tab)
  const effectiveEvidenceScore = useMemo(() => {
    let score = currentCase.initialScore;
    const missing = currentCase.missingEvidence || [];

    missing.forEach(item => {
      if (currentEvidence[item.id]) {
        score += item.confidenceGain;
      }
    });

    return Math.max(5, Math.min(99, score));
  }, [currentCase, currentEvidence]);

  // Attack toggling
  const handleToggleAttack = (attackId) => {
    setAttacksState(prev => ({
      ...prev,
      [activeCaseId]: {
        ...prev[activeCaseId],
        [attackId]: !prev[activeCaseId]?.[attackId]
      }
    }));
  };

  // Attack presets
  const handleApplyPreset = (presetType) => {
    setAttacksState(prev => {
      const updated = { ...prev[activeCaseId] };
      if (presetType === 'clear') {
        Object.keys(updated).forEach(k => { updated[k] = false; });
      } else if (presetType === 'audioVisual') {
        Object.keys(updated).forEach(k => { updated[k] = false; });
        updated.faceSwap = true;
        updated.voiceClone = true;
      } else if (presetType === 'fullCascade') {
        Object.keys(updated).forEach(k => { updated[k] = true; });
      }
      return {
        ...prev,
        [activeCaseId]: updated
      };
    });
  };

  // Evidence toggling
  const handleToggleEvidence = (evidenceId) => {
    setEvidenceState(prev => ({
      ...prev,
      [activeCaseId]: {
        ...prev[activeCaseId],
        [evidenceId]: !prev[activeCaseId]?.[evidenceId]
      }
    }));
  };

  // Simulate attaching all evidence at once
  const handleSimulateAllEvidence = () => {
    setEvidenceState(prev => {
      const updated = { ...prev[activeCaseId] };
      const missing = currentCase.missingEvidence || [];
      missing.forEach(item => {
        updated[item.id] = true;
      });
      return {
        ...prev,
        [activeCaseId]: updated
      };
    });
  };

  // Reset evidence
  const handleResetEvidence = () => {
    setEvidenceState(prev => {
      const updated = { ...prev[activeCaseId] };
      const missing = currentCase.missingEvidence || [];
      missing.forEach(item => {
        updated[item.id] = false;
      });
      return {
        ...prev,
        [activeCaseId]: updated
      };
    });
  };

  // Handle newly uploaded case from Media Scanner Modal
  const handleCaseLoadedFromScan = (scanResult) => {
    const raw = scanResult.rawBackendData;
    const newCaseId = raw?.case_id || `TL-${1027 + casesList.length - 3}`;

    // Map backend mismatches
    const backendMismatches = raw?.mismatches || [];
    const mappedMismatches = backendMismatches.length > 0
      ? backendMismatches.map((m, idx) => ({
          id: m.id || `m-scan-${idx}`,
          title: `${m.type}: ${m.severity}`,
          type: m.type,
          severity: m.severity === 'TAMPERED' || m.severity === 'STRIPPED' ? 'danger' : (m.severity === 'VERIFIED' ? 'success' : 'warning'),
          timestamp: m.timestamp,
          confidence: '95.4%',
          modalities: [m.type.includes('Audio') ? 'Audio' : (m.type.includes('Meta') ? 'Metadata' : 'Video')],
          description: m.detail,
          forensicFinding: `Detected by FastAPI neural engine: ${m.detail}`
        }))
      : [
          {
            id: `m-scan-1`,
            title: "Ingested Media Anomaly: Cross-Modal Incongruity",
            type: "Multi-Modal Anomaly",
            severity: scanResult.badgeType,
            timestamp: "00:02s – 00:07s",
            confidence: "95.6%",
            modalities: ["Video", "Audio"],
            description: scanResult.inconsistencies,
            forensicFinding: "Evaluated by TrustLayer real-time neural scanner pipeline."
          }
        ];

    // Map backend provenance chain
    const backendChain = raw?.provenance_chain || [];
    const mappedProvenance = backendChain.length > 0
      ? backendChain.map((p) => ({
          step: p.step,
          title: p.label,
          entity: p.step === 1 ? 'Original Source / Sensor Ingest' : (p.step === 2 ? 'Transcoder / Editing Node' : 'TrustLayer Attestation Service'),
          timestamp: p.timestamp,
          status: p.status.toLowerCase() === 'verified' ? 'verified' : (p.status.toLowerCase() === 'tampered' ? 'tampered' : 'warning'),
          hash: scanResult.sha256,
          notes: `Inspected by TrustLayer 2.0 backend: status is ${p.status}`
        }))
      : [
          {
            step: 1,
            title: "Direct Ingest Capture",
            entity: "TrustLayer Live Scanner Endpoint",
            timestamp: "2026-10-04 00:00:00 UTC",
            status: "verified",
            hash: scanResult.sha256,
            notes: "File payload received and SHA-256 integrity stamp pinned."
          },
          {
            step: 2,
            title: "Neural Cross-Modal Consistency Check",
            entity: "FastAPI PyTorch / OpenCV / Librosa Engine",
            timestamp: "2026-10-04 00:00:03 UTC",
            status: scanResult.badgeType === "danger" ? "tampered" : "warning",
            hash: scanResult.sha256,
            notes: scanResult.inconsistencies
          }
        ];

    const newCase = {
      id: newCaseId,
      title: `${scanResult.filename} (FastAPI Ingested)`,
      classification: scanResult.threatLevel,
      mediaType: scanResult.modality,
      mediaIcon: scanResult.modality.includes('Video') ? 'Video' : (scanResult.modality.includes('Audio') ? 'FileText' : 'ShieldCheck'),
      initialScore: scanResult.evaluatedScore,
      threatLevel: scanResult.threatLevel,
      threatBadgeType: scanResult.badgeType,
      description: scanResult.inconsistencies,
      fileDetails: {
        filename: scanResult.filename,
        fileSize: scanResult.fileSize,
        codec: "FastAPI Ingest / OpenCV / Librosa Stream",
        resolution: "1920x1080 @ 30fps",
        sha256: scanResult.sha256,
        ingestedAt: new Date().toISOString()
      },
      modalBreakdown: {
        image: { score: scanResult.modalBreakdown.image, status: scanResult.modalBreakdown.image < 40 ? "danger" : "warning", label: "Image / Frames", note: "OpenCV ELA residual variance" },
        audio: { score: scanResult.modalBreakdown.audio, status: scanResult.modalBreakdown.audio < 40 ? "danger" : "warning", label: "Acoustic Audio", note: "FFT vocoder spectral centroid" },
        video: { score: scanResult.modalBreakdown.video, status: "warning", label: "Temporal Video", note: "Inter-frame motion flow" },
        text: { score: scanResult.modalBreakdown.text, status: "emerald", label: "Speech Transcript", note: "Phoneme transcription" },
        metadata: { score: scanResult.modalBreakdown.metadata, status: scanResult.modalBreakdown.metadata < 40 ? "danger" : "emerald", label: "Metadata Container", note: "C2PA manifest verification" }
      },
      pipelineNodes: [
        { id: "p1", name: "Media Ingestion", status: "success", detail: "FastAPI multipart parser received payload", duration: "42ms" },
        { id: "p2", name: "Multi-Modal Extraction", status: "success", detail: "OpenCV ELA & SciPy FFT spectrogram extracted", duration: "185ms" },
        { id: "p3", name: "Cross-Modal Consistency Check", status: scanResult.badgeType, detail: scanResult.inconsistencies, duration: "390ms" },
        { id: "p4", name: "Evidence Reasoning", status: scanResult.badgeType, detail: "Bayesian belief evaluation completed", duration: "95ms" },
        { id: "p5", name: "Final Assessment", status: scanResult.badgeType, detail: scanResult.threatLevel, duration: "18ms" }
      ],
      mismatchFeed: mappedMismatches,
      missingEvidence: [
        {
          id: `ev-scan-1`,
          title: "Hardware Original Master Camera Feed",
          description: "Raw source directly from recording sensor.",
          confidenceGain: 35,
          required: true,
          sourceType: "Primary Sensor Server",
          attached: false
        },
        {
          id: `ev-scan-2`,
          title: "Publisher C2PA Verification HSM Key",
          description: "Cryptographic manifest certificate.",
          confidenceGain: 25,
          required: true,
          sourceType: "C2PA Trust Cloud",
          attached: false
        }
      ],
      provenanceChain: mappedProvenance,
      simulatorDefaults: {
        faceSwap: true,
        voiceClone: true,
        transcriptAlteration: false,
        stripC2PA: true,
        adversarialNoise: false,
        videoReplay: false
      },
      robustnessScore: 84,
      robustnessRating: "Strong Resilience to Ingested Synthetic Perturbations",
      attackWeights: {
        faceSwap: -16,
        voiceClone: -22,
        transcriptAlteration: -14,
        stripC2PA: -20,
        adversarialNoise: -10,
        videoReplay: -8
      }
    };

    setCasesList(prev => [newCase, ...prev]);
    setActiveCaseId(newCaseId);
    setActiveTab('dcs');
    setAttacksState(prev => ({ ...prev, [newCaseId]: { ...newCase.simulatorDefaults } }));
    setEvidenceState(prev => ({ ...prev, [newCaseId]: { 'ev-scan-1': false, 'ev-scan-2': false } }));
  };

  // Automated Scripted Walkthrough Actions for Presentation Mode
  const executePresentationStep = (stepNumber) => {
    setPresentationStep(stepNumber);

    if (stepNumber === 1) {
      // Step 1: Case Selection
      setIsReportOpen(false);
      setActiveCaseId('TL-1024');
      setActiveTab('dcs');
    } else if (stepNumber === 2) {
      // Step 2: Cross-Modal Anomaly & Manipulation Heatmap
      setIsReportOpen(false);
      setActiveCaseId('TL-1024');
      setActiveTab('dcs');
      setShowManipulationHeatmap(true);
    } else if (stepNumber === 3) {
      // Step 3: What-If Attack Injection
      setIsReportOpen(false);
      setActiveCaseId('TL-1024');
      setActiveTab('simulator');
      setAttacksState(prev => ({
        ...prev,
        'TL-1024': {
          faceSwap: true,
          voiceClone: true,
          transcriptAlteration: true,
          stripC2PA: true,
          adversarialNoise: false,
          videoReplay: false
        }
      }));
    } else if (stepNumber === 4) {
      // Step 4: Minimum Evidence Resolution
      setIsReportOpen(false);
      setActiveCaseId('TL-1024');
      setActiveTab('evidence');
      setEvidenceState(prev => ({
        ...prev,
        'TL-1024': { 'ev-1': true, 'ev-2': true, 'ev-3': true }
      }));
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#a855f7', '#10b981']
        });
      } catch (e) {}
    } else if (stepNumber === 5) {
      // Step 5: Export Audit Report
      setIsReportOpen(true);
    }
  };

  // Toggle Presentation Mode On/Off
  const handleTogglePresentation = () => {
    if (!isPresentationActive) {
      setIsPresentationActive(true);
      setIsPresentationPlaying(true);
      setPresentationSecondsRemaining(45);
      executePresentationStep(1);
    } else {
      setIsPresentationActive(false);
      setIsPresentationPlaying(false);
      setIsReportOpen(false);
    }
  };

  // Presentation Timer Effect: 45 seconds total, 9s per step
  useEffect(() => {
    let timer;
    if (isPresentationActive && isPresentationPlaying) {
      timer = setInterval(() => {
        setPresentationSecondsRemaining(prev => {
          if (prev <= 1) {
            setIsPresentationActive(false);
            return 45;
          }
          const nextSec = prev - 1;
          const elapsed = 45 - nextSec;
          
          // Switch steps at ~9s intervals:
          // 0-8s: step 1, 9-17s: step 2, 18-26s: step 3, 27-35s: step 4, 36-45s: step 5
          const newStep = Math.min(5, Math.floor(elapsed / 9) + 1);
          if (newStep !== presentationStep) {
            executePresentationStep(newStep);
          }

          return nextSec;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPresentationActive, isPresentationPlaying, presentationStep]);

  // Tab Badge counts
  const anomalyCount = currentCase.mismatchFeed.filter(m => m.severity !== 'success').length;
  const activeAttackCount = Object.values(currentAttacks).filter(Boolean).length;
  const missingEvidenceCount = (currentCase.missingEvidence || []).filter(e => !currentEvidence[e.id]).length;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans pb-16">
      {/* 1. Navigation Header & Branding */}
      <Header
        onOpenReport={() => setIsReportOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
        isPresentationActive={isPresentationActive}
        onTogglePresentation={handleTogglePresentation}
        activeCase={currentCase}
      />

      {/* 2. Top Interactive Scenario Selector Bar */}
      <ScenarioBar
        cases={casesList}
        activeCaseId={activeCaseId}
        onSelectCase={setActiveCaseId}
      />

      {/* 3. Core Tab Sub-Navigation */}
      <CoreTabs
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        anomalyCount={anomalyCount}
        activeAttackCount={activeAttackCount}
        missingEvidenceCount={missingEvidenceCount}
      />

      {/* 4. Active Tab Content Panels */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex-1 w-full">
        {activeTab === 'dcs' && (
          <DigitalCrimeSceneView
            caseData={currentCase}
            showHeatmap={showManipulationHeatmap}
            onToggleHeatmap={() => setShowManipulationHeatmap(prev => !prev)}
          />
        )}

        {activeTab === 'simulator' && (
          <AttackSimulatorView
            caseData={currentCase}
            activeAttacks={currentAttacks}
            onToggleAttack={handleToggleAttack}
            onApplyPreset={handleApplyPreset}
            simulatedScore={simulatedScore}
          />
        )}

        {activeTab === 'evidence' && (
          <EvidenceChainView
            caseData={currentCase}
            attachedEvidence={currentEvidence}
            onToggleEvidence={handleToggleEvidence}
            onSimulateAllAttachment={handleSimulateAllEvidence}
            onResetEvidence={handleResetEvidence}
            effectiveScore={effectiveEvidenceScore}
          />
        )}
      </main>

      {/* 5. Footer / Status Bar */}
      <footer className="border-t border-slate-800/80 bg-[#0b101c] py-4 px-4 lg:px-8 mt-12 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
            <span className="text-slate-400">TrustLayer 2.0 Forensics Engine</span>
            <span className="text-slate-700">|</span>
            <span>Kernel: PyTorch-DirectML / SyncNet v4 / C2PA Manifest Engine</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Payload SHA: <strong className="text-cyber-cyan">{currentCase.fileDetails.sha256.substring(0, 10)}...</strong></span>
            <span className="text-slate-700">|</span>
            <span>Live Session: #TL-HEX-4891</span>
          </div>
        </div>
      </footer>

      {/* 6. Real-Time Media Upload & Forensic Scanner Modal */}
      <MediaScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onCaseLoaded={handleCaseLoadedFromScan}
      />

      {/* 7. Live Judge Presentation Guide HUD */}
      <JudgePresentationGuide
        isActive={isPresentationActive}
        onClose={() => setIsPresentationActive(false)}
        currentStep={presentationStep}
        onSetStep={executePresentationStep}
        isPlaying={isPresentationPlaying}
        onTogglePlay={() => setIsPresentationPlaying(prev => !prev)}
        totalSecondsRemaining={presentationSecondsRemaining}
      />

      {/* 8. Export Forensic Audit Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        caseData={currentCase}
        effectiveScore={effectiveEvidenceScore}
      />
    </div>
  );
}
export default App;
