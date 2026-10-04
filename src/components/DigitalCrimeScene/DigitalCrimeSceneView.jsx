import React from 'react';
import { TrustScoreGauge } from './TrustScoreGauge';
import { PipelineFlowchart } from './PipelineFlowchart';
import { MismatchFeed } from './MismatchFeed';
import { ForensicMediaInspector } from './ForensicMediaInspector';

export function DigitalCrimeSceneView({ 
  caseData,
  showHeatmap,
  onToggleHeatmap
}) {
  return (
    <div className="space-y-6">
      {/* 1. Top Summary Card: Overall Trust Score Gauge + Multi-Modal Badges */}
      <TrustScoreGauge caseData={caseData} />

      {/* 2. Visual Media Inspector & Neural Anomaly Scrubber with Manipulation Heatmap */}
      <ForensicMediaInspector 
        caseData={caseData} 
        showHeatmapProp={showHeatmap}
        onToggleHeatmapProp={onToggleHeatmap}
      />

      {/* 3. Visual Investigation Pipeline Flowchart */}
      <PipelineFlowchart pipelineNodes={caseData.pipelineNodes} />

      {/* 4. Cross-Modal Mismatch Feed */}
      <MismatchFeed mismatchFeed={caseData.mismatchFeed} />
    </div>
  );
}
