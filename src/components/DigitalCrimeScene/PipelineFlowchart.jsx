import React, { useState } from 'react';
import { Database, Split, GitCompare, Cpu, CheckSquare, AlertCircle, AlertTriangle, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

export function PipelineFlowchart({ pipelineNodes }) {
  const [selectedNodeId, setSelectedNodeId] = useState("p3");

  const nodeIcons = {
    p1: Database,
    p2: Split,
    p3: GitCompare,
    p4: Cpu,
    p5: CheckSquare
  };

  const selectedNode = pipelineNodes.find(n => n.id === selectedNodeId) || pipelineNodes[2];

  return (
    <div className="cyber-card p-5 rounded-2xl border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyber-cyan" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Visual Investigation Pipeline Flowchart
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          Click any stage node for tensor telemetry & execution traces
        </span>
      </div>

      {/* Pipeline Nodes Flow */}
      <div className="relative py-2">
        {/* Horizontal Connector Line for Desktop */}
        <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[2px] bg-slate-800 -translate-y-1/2 z-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative z-10">
          {pipelineNodes.map((node, index) => {
            const Icon = nodeIcons[node.id] || Cpu;
            const isSelected = node.id === selectedNodeId;
            const isDanger = node.status === "danger";
            const isWarning = node.status === "warning";
            const isSuccess = node.status === "success";

            // Node colors & glows
            const statusTheme = isDanger
              ? {
                  border: isSelected ? "border-red-500 ring-2 ring-red-500/40" : "border-red-500/50 hover:border-red-400",
                  bg: "bg-red-950/20",
                  iconBg: "bg-red-950/80 text-red-400 border border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.4)]",
                  statusIcon: AlertCircle,
                  statusText: "FAIL / ANOMALY",
                  textColor: "text-red-400"
                }
              : isWarning
              ? {
                  border: isSelected ? "border-amber-500 ring-2 ring-amber-500/40" : "border-amber-500/50 hover:border-amber-400",
                  bg: "bg-amber-950/20",
                  iconBg: "bg-amber-950/80 text-amber-400 border border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.4)]",
                  statusIcon: AlertTriangle,
                  statusText: "UNCERTAIN / WARN",
                  textColor: "text-amber-400"
                }
              : {
                  border: isSelected ? "border-emerald-500 ring-2 ring-emerald-500/40" : "border-emerald-500/40 hover:border-emerald-400",
                  bg: "bg-emerald-950/15",
                  iconBg: "bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]",
                  statusIcon: CheckCircle2,
                  statusText: "PASS / VERIFIED",
                  textColor: "text-emerald-400"
                };

            const StatusIconComponent = statusTheme.statusIcon;

            return (
              <button
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 relative group flex flex-col justify-between ${statusTheme.bg} ${statusTheme.border} ${
                  isSelected ? 'bg-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'hover:bg-slate-900/60'
                }`}
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500 group-hover:text-cyber-cyan transition-colors">
                    STAGE 0{index + 1}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">
                    {node.duration}
                  </span>
                </div>

                {/* Node icon & glowing marker */}
                <div className="flex items-center gap-2.5 my-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${statusTheme.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 line-clamp-1 font-sans">
                      {node.name}
                    </h4>
                  </div>
                </div>

                {/* Status indicator pill */}
                <div className="mt-2.5 pt-2 border-t border-slate-800/70 flex items-center justify-between text-[10px] font-mono">
                  <span className={`font-semibold flex items-center gap-1 ${statusTheme.textColor}`}>
                    <StatusIconComponent className="w-3 h-3 inline" />
                    {statusTheme.statusText}
                  </span>
                  <ChevronRight className={`w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform ${isSelected ? 'text-cyber-cyan' : ''}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Node Detailed Forensic Trace */}
      {selectedNode && (
        <div className="mt-4 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2.5">
            <span className="px-2 py-0.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-[11px] font-bold shrink-0">
              TRACE LOG
            </span>
            <span className="text-slate-300">
              <strong className="text-white mr-1.5">{selectedNode.name}:</strong>
              {selectedNode.detail}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0 text-slate-400 text-[11px]">
            <span>Latency: <strong className="text-cyber-cyan">{selectedNode.duration}</strong></span>
            <span className="text-slate-700">|</span>
            <span>Kernel: <strong className="text-slate-300">TensorRT-LLM</strong></span>
          </div>
        </div>
      )}
    </div>
  );
}
