import React, { useState } from 'react';
import { X, Download, Printer, Shield, CheckCircle2, AlertTriangle, AlertCircle, FileText, Lock, QrCode, Terminal, Check } from 'lucide-react';

export function ReportModal({ isOpen, onClose, caseData, effectiveScore }) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const isHighRisk = caseData.threatBadgeType === "danger";
  const isSuspicious = caseData.threatBadgeType === "warning";

  const handleDownloadJSON = () => {
    const reportData = {
      reportId: `REP-TL2-${caseData.id}-${Date.now()}`,
      generatedAt: new Date().toISOString(),
      engineVersion: "TrustLayer 2.0.4 - Cross-Modal Neural Forensics",
      case: {
        id: caseData.id,
        title: caseData.title,
        classification: caseData.classification,
        mediaType: caseData.mediaType,
        baselineScore: caseData.initialScore,
        currentEvaluatedScore: effectiveScore,
        threatLevel: caseData.threatLevel
      },
      payload: caseData.fileDetails,
      multiModalBreakdown: caseData.modalBreakdown,
      mismatchFindings: caseData.mismatchFeed,
      provenanceChain: caseData.provenanceChain,
      cryptographicSignature: {
        algorithm: "ECDSA_P384_SHA384",
        signer: "TrustLayer Root HSM Cert Authority #892",
        signatureHex: "3065023100b48a1...99ef1a"
      }
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TrustLayer_Forensic_Audit_${caseData.id}.json`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="cyber-card w-full max-w-4xl bg-[#0d1424] border-cyber-cyan/50 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyber-cyan/20 border border-cyber-cyan flex items-center justify-center text-cyber-cyan">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-mono text-white">
                  FORENSIC AUDIT CERTIFICATE
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40">
                  ISO/IEC 27037
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Official Digital Evidence Authenticity & Custody Verification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors hidden sm:flex items-center gap-1.5 text-xs font-mono"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownloadJSON}
              className="p-2 px-3 rounded-lg bg-cyber-cyan/20 hover:bg-cyber-cyan/30 text-cyber-cyan border border-cyber-cyan/50 transition-colors flex items-center gap-1.5 text-xs font-mono font-bold"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Exported</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Signed JSON</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 font-mono text-xs text-slate-300">
          
          {/* Certificate Identification Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[11px] text-slate-500 uppercase">Audit Case Reference</div>
              <div className="text-sm font-bold text-white font-sans">
                CASE #{caseData.id}: {caseData.title}
              </div>
              <div className="text-[11px] text-slate-400">
                Classification: <span className="text-cyber-cyan font-bold">{caseData.classification}</span>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <div className="text-[11px] text-slate-500">Report Stamp Hash</div>
              <div className="text-[10px] text-cyber-cyan font-bold truncate max-w-xs">
                SHA-256: {caseData.fileDetails.sha256}
              </div>
              <div className="text-[11px] text-slate-400">
                Timestamp: 2026-10-03 22:40:00 UTC
              </div>
            </div>
          </div>

          {/* Verdict Summary Block */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <span className="text-slate-400 uppercase text-[11px]">Final Trust Metric</span>
              <div className="my-2">
                <span className={`text-4xl font-extrabold ${
                  effectiveScore >= 80 ? 'text-emerald-400' : (effectiveScore >= 50 ? 'text-amber-400' : 'text-red-400')
                }`}>
                  {effectiveScore}
                </span>
                <span className="text-slate-500 text-sm">/100</span>
              </div>
              <span className="text-[11px] text-slate-400">
                Calibrated across 5 neural modalities
              </span>
            </div>

            <div className="md:col-span-2 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <span className="text-slate-400 uppercase text-[11px]">Forensic Executive Verdict</span>
              <div className="my-1.5 flex items-center gap-2">
                {isHighRisk && <AlertCircle className="w-5 h-5 text-red-400" />}
                {isSuspicious && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                {!isHighRisk && !isSuspicious && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                <span className="text-sm font-bold text-white font-sans">
                  {caseData.threatLevel}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {caseData.description}
              </p>
            </div>
          </div>

          {/* Multi-Modal Evidence Breakdown Matrix */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-200 tracking-wider mb-2.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyber-cyan" />
              Multi-Modal Evidence Breakdown Matrix
            </h4>
            <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 text-[11px] uppercase">
                  <tr>
                    <th className="p-3">Modality</th>
                    <th className="p-3">Evaluated Confidence</th>
                    <th className="p-3">Verdict Status</th>
                    <th className="p-3 hidden sm:table-cell">Forensic Signal Trace</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {Object.entries(caseData.modalBreakdown).map(([key, item]) => (
                    <tr key={key} className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">{item.label}</td>
                      <td className="p-3">{item.score}%</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                          item.status === 'danger' ? 'bg-red-500/20 text-red-300 border-red-500/40' :
                          (item.status === 'warning' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40')
                        }`}>
                          {item.status === 'danger' ? 'TAMPERED' : (item.status === 'warning' ? 'ANOMALOUS' : 'AUTHENTIC')}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400 hidden sm:table-cell">{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Forensic Inconsistency Log */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-200 tracking-wider mb-2.5">
              Key Anomaly Proofs (SyncNet & Spectral Analysis)
            </h4>
            <div className="space-y-2">
              {caseData.mismatchFeed.map((m) => (
                <div key={m.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-white font-bold mb-1">
                    <span>{m.title}</span>
                    <span className="text-cyber-cyan text-[11px]">{m.timestamp}</span>
                  </div>
                  <p className="text-slate-300 text-xs font-sans mb-1">{m.description}</p>
                  <p className="text-slate-400 text-[11px] font-mono italic">Trace: {m.forensicFinding}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptographic Seal & Hardware Attestation */}
          <div className="p-4 rounded-xl bg-slate-950 border border-cyber-cyan/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyber-cyan shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-white">TrustLayer HSM Cryptographic Seal</div>
                <div className="text-[11px] text-slate-400">
                  Signed via NIST P-384 / FIPS 140-3 Level 4 Hardware Security Module
                </div>
                <div className="text-[10px] text-cyber-cyan mt-0.5">
                  Certificate Authority: TrustLayer Global Chain #TL-ROOT-2026
                </div>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold text-center">
              TAMPER-EVIDENT MANIFEST VERIFIED
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>TrustLayer 2.0 Forensics Architecture • Hackathon Demonstration</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
