import React from 'react';
import { MinimumEvidenceEngine } from './MinimumEvidenceEngine';
import { ProvenanceTimeline } from './ProvenanceTimeline';

export function EvidenceChainView({ 
  caseData, 
  attachedEvidence, 
  onToggleEvidence, 
  onSimulateAllAttachment,
  onResetEvidence,
  effectiveScore
}) {
  return (
    <div className="space-y-6">
      {/* 1. Minimum Evidence Engine Panel with Interactive Attachment */}
      <MinimumEvidenceEngine
        caseData={caseData}
        attachedEvidence={attachedEvidence}
        onToggleEvidence={onToggleEvidence}
        onSimulateAllAttachment={onSimulateAllAttachment}
        onResetEvidence={onResetEvidence}
        effectiveScore={effectiveScore}
      />

      {/* 2. Visual Trust Chain (Provenance Timeline) */}
      <ProvenanceTimeline
        provenanceChain={caseData.provenanceChain}
      />
    </div>
  );
}
