export const MOCK_CASES = [
  {
    id: "TL-1024",
    title: "Coordinated Media Attack (Multimodal Fake)",
    classification: "Multimodal Deepfake Synthesis",
    mediaType: "Video + Audio + Metadata",
    mediaIcon: "Video",
    initialScore: 32,
    threatLevel: "CRITICAL ANOMALY DETECTED",
    threatBadgeType: "danger", // danger, warning, success
    description: "Viral broadcast clip allegedly showing a high-ranking official declaring emergency currency measures. Cross-modal analysis reveals asynchronous facial phonemes and deep synthesized voice timbre.",
    fileDetails: {
      filename: "press_conference_leak_08.mp4",
      fileSize: "84.2 MB",
      codec: "H.264 (High Profile) / AAC 48kHz",
      resolution: "1920x1080 @ 29.97 fps",
      sha256: "8f7e2c91b53f608149d5aa4e1834c26ef48473e047f3ec780c102b4d9302e1c9",
      ingestedAt: "2026-10-03 21:14:02 UTC"
    },
    modalBreakdown: {
      image: { score: 28, status: "danger", label: "Image / Frames", note: "Warping artifacts around jaw boundary" },
      audio: { score: 34, status: "danger", label: "Acoustic Audio", note: "Vocoder phase discontinuity at 3.2kHz" },
      video: { score: 52, status: "warning", label: "Temporal Video", note: "Inter-frame motion vector jitter" },
      text: { score: 88, status: "emerald", label: "Speech Transcript", note: "Lexical structure matches political speech corpus" },
      metadata: { score: 15, status: "danger", label: "Container Metadata", note: "Missing camera EXIF & modified atom tables" }
    },
    pipelineNodes: [
      { id: "p1", name: "Media Ingestion", status: "success", detail: "Container parsed, demuxed 3 streams without corruption", duration: "124ms" },
      { id: "p2", name: "Multi-Modal Extraction", status: "success", detail: "Face mesh (468 landmarks), mel-spectrogram, & EXIF atoms isolated", duration: "380ms" },
      { id: "p3", name: "Cross-Modal Consistency Check", status: "danger", detail: "Lip-sync misalignment & pitch vector deviation detected", duration: "840ms" },
      { id: "p4", name: "Evidence Reasoning", status: "danger", detail: "Bayesian belief network computes 94.6% synthetic likelihood", duration: "210ms" },
      { id: "p5", name: "Final Assessment", status: "danger", detail: "Synthetic generation confirmed with high confidence", duration: "45ms" }
    ],
    mismatchFeed: [
      {
        id: "m-01",
        title: "Audio-Visual Inconsistency: Lip-Sync Temporal Lag",
        type: "Temporal Phoneme Mismatch",
        severity: "danger",
        timestamp: "00:03.40s – 00:08.12s",
        confidence: "98.4%",
        modalities: ["Video", "Audio"],
        description: "Viseme trajectory for bilabial plosives (/p/, /b/, /m/) leads acoustic waveform by 148ms. Natural human vocal delay tolerance is <45ms.",
        forensicFinding: "SyncNet confidence metric dropped to 1.82 (normal threshold > 6.50). Indicates audio replacement over pre-recorded video."
      },
      {
        id: "m-02",
        title: "Metadata Anomaly: Camera Hardware Manifest Stripped",
        type: "Provenance Forgery",
        severity: "danger",
        timestamp: "Header Block",
        confidence: "99.1%",
        modalities: ["Metadata"],
        description: "Original device capture EXIF profile missing. MP4 moov atom reordered by FFmpeg proxy at 2026-10-03 10:48 UTC.",
        forensicFinding: "C2PA cryptographic assertion signature missing; hex byte dump reveals re-mux header signature consistent with Telegram desktop bot."
      },
      {
        id: "m-03",
        title: "Acoustic Discrepancy: Neural Vocoder Pitch Drift",
        type: "Acoustic Synthesis",
        severity: "danger",
        timestamp: "00:01.20s – 00:14.50s",
        confidence: "94.2%",
        modalities: ["Audio"],
        description: "Pitch frequency (F0) contour exhibits synthetic quantization artifacts above 2800 Hz. Room impulse response (RIR) fails to reflect press room geometry.",
        forensicFinding: "Diffusion vocoder spectral signature matches open-source RVC (Retrieval-based Voice Conversion) checkpoint."
      },
      {
        id: "m-04",
        title: "Semantic Context Discrepancy: Emergency Decree",
        type: "Contextual Conflict",
        severity: "warning",
        timestamp: "Global Content",
        confidence: "82.0%",
        modalities: ["Text", "External Knowledge Graph"],
        description: "Transcript asserts emergency currency peg effective immediately, conflicting with official Treasury Gazette schedule published 3 hours prior.",
        forensicFinding: "Zero verified wire services corroborating the announcement within official communication channels."
      }
    ],
    missingEvidence: [
      {
        id: "ev-1",
        title: "Original Raw Broadcast Source (.MOV / ProRes)",
        description: "Direct feed recording before transcode allows high-frequency sensor PRNU noise finger-printing.",
        confidenceGain: 35,
        required: true,
        sourceType: "Broadcaster Ingest Server",
        attached: false
      },
      {
        id: "ev-2",
        title: "Verified Publisher C2PA Cryptographic Signature",
        description: "Hardware-anchored C2PA manifest with hardware security module (HSM) signature from certified media outlet.",
        confidenceGain: 25,
        required: true,
        sourceType: "Content Credentials Cloud (Adobe/BBC/Reuters)",
        attached: false
      },
      {
        id: "ev-3",
        title: "Acoustic Room Impulse Telemetry (Microphone Raw Stems)",
        description: "Uncompressed multi-mic acoustic stems to rule out reverberation synthesis and spectral splicing.",
        confidenceGain: 12,
        required: false,
        sourceType: "Studio Sound Board",
        attached: false
      }
    ],
    provenanceChain: [
      {
        step: 1,
        title: "Camera Ingest Capture",
        entity: "Sony FX9 Cinema Engine (Serial #SN-90214)",
        timestamp: "2026-10-03 09:15:20 UTC",
        status: "verified",
        hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        notes: "Hardware root of trust registered. Clean sensor noise fingerprint."
      },
      {
        step: 2,
        title: "C2PA Manifest Signed",
        entity: "Reuters Field Ingestion Gateway v4.2",
        timestamp: "2026-10-03 09:17:05 UTC",
        status: "verified",
        hash: "7d1a54b38d94e22e967a5f118bc2814aef03194a2f3a8b417e1124d9c7921a88",
        notes: "C2PA cryptographic assertion generated with standard media claims."
      },
      {
        step: 3,
        title: "Web Transcoding Node",
        entity: "FastCDN Transcode Pool (FFmpeg 6.1)",
        timestamp: "2026-10-03 10:02:11 UTC",
        status: "warning",
        hash: "4a28f80451a9a83857321e149c9e6bb0c84e1b302193b2a8d11928374e2b01fa",
        notes: "Bitrate reduced from 50Mbps to 6Mbps. Standard compression quantization."
      },
      {
        step: 4,
        title: "Audio Temporal Splice & Neural Deepfake Injection",
        entity: "Unknown Node / Disconnected IP Proxy (185.220.101.4)",
        timestamp: "2026-10-03 11:45:00 UTC",
        status: "tampered",
        hash: "8f7e2c91b53f608149d5aa4e1834c26ef48473e047f3ec780c102b4d9302e1c9",
        notes: "C2PA manifest stripped. Audio track replaced with 24-bit synthesized neural voice."
      },
      {
        step: 5,
        title: "Social Propagation Vector",
        entity: "Automated Telegram Broadcast Network & X Amplifiers",
        timestamp: "2026-10-03 12:30:15 UTC",
        status: "tampered",
        hash: "3b610c1149d50198aa4e1834c26ef4848f7e2c91b53f608173e047f3ec780c10",
        notes: "Cross-platform viral dissemination with sensationalized headline."
      }
    ],
    simulatorDefaults: {
      faceSwap: true,
      voiceClone: true,
      transcriptAlteration: true,
      stripC2PA: true,
      adversarialNoise: false,
      videoReplay: false
    },
    robustnessScore: 88,
    robustnessRating: "Strong Resilience to Combined Multi-Modal Attacks",
    attackWeights: {
      faceSwap: -18,
      voiceClone: -24,
      transcriptAlteration: -15,
      stripC2PA: -22,
      adversarialNoise: -8,
      videoReplay: -10
    }
  },
  {
    id: "TL-1025",
    title: "Document & Image Manipulation (Partial Fake)",
    classification: "Forensic Document Splicing & ELA Anomaly",
    mediaType: "Image + PDF Document",
    mediaIcon: "FileText",
    initialScore: 58,
    threatLevel: "SUSPICIOUS ANOMALY DETECTED",
    threatBadgeType: "warning",
    description: "Leaked internal regulatory sanction document containing high-res executive scan. ELA identifies localized re-compression variance across authorization signature block.",
    fileDetails: {
      filename: "executive_sanction_directive_v3.pdf",
      fileSize: "14.8 MB",
      codec: "PDF 1.7 / Embedded TIFF 300DPI",
      resolution: "2480x3508 (A4 Scan)",
      sha256: "c189b27419ef87b0a3901b22e11893c78091da3c09194e21a48c9038411e741a",
      ingestedAt: "2026-10-03 20:30:18 UTC"
    },
    modalBreakdown: {
      image: { score: 44, status: "warning", label: "Image / Scan", note: "Signature block error level analysis mismatch (+14dB)" },
      audio: { score: 98, status: "emerald", label: "Audio Stems", note: "N/A (Static Document Mode - Non-audio verified)" },
      video: { score: 98, status: "emerald", label: "Video Stream", note: "N/A (Document Mode)" },
      text: { score: 62, status: "warning", label: "Typography & OCR", note: "Kerning deviation detected on paragraph 4" },
      metadata: { score: 38, status: "danger", label: "PDF Object Tree", note: "CreationDate differs from ModDate by 18 days" }
    },
    pipelineNodes: [
      { id: "p1", name: "Media Ingestion", status: "success", detail: "PDF object dictionary extracted and decompressed", duration: "82ms" },
      { id: "p2", name: "Multi-Modal Extraction", status: "success", detail: "Raster images extracted, OCR font metrics mapped", duration: "240ms" },
      { id: "p3", name: "Cross-Modal Consistency Check", status: "warning", detail: "ELA luminescence anomaly & metadata timestamp divergence", duration: "610ms" },
      { id: "p4", name: "Evidence Reasoning", status: "warning", detail: "Partial manipulation hypothesis supported with 64.2% probability", duration: "190ms" },
      { id: "p5", name: "Final Assessment", status: "warning", detail: "Conditional authenticity: Document body original, signature spliced", duration: "40ms" }
    ],
    mismatchFeed: [
      {
        id: "m-11",
        title: "ELA Anomaly: Localized Signature Re-compression",
        type: "Error Level Analysis",
        severity: "danger",
        timestamp: "Page 3 (Offset 820px, 1420px)",
        confidence: "91.8%",
        modalities: ["Image"],
        description: "Error Level Analysis reveals high compression variance on the executive signature stamp relative to the surrounding parchment background.",
        forensicFinding: "Quantization matrix tables differ between base page (JPEG Q85) and signature bounding box (JPEG Q94). Proves copy-paste insertion."
      },
      {
        id: "m-12",
        title: "Metadata Timestamp Skew: Modified Post-Publication",
        type: "Timestamp Inconsistency",
        severity: "warning",
        timestamp: "PDF Info Dictionary",
        confidence: "88.5%",
        modalities: ["Metadata"],
        description: "PDF CreationDate is 2026-09-12 14:10:00, while embedded XMP Metadata records an unsanctioned edit on 2026-09-30 22:18:41 using Ghostscript 10.0.",
        forensicFinding: "Font table contains subset embedded font 'Helvetica-Bold' which is not present in official department templates."
      },
      {
        id: "m-13",
        title: "Typographic Kerning Inconsistency: Micro-Spacing Anomaly",
        type: "OCR & Font Metrics",
        severity: "warning",
        timestamp: "Paragraph 4 (Clause 9B)",
        confidence: "78.2%",
        modalities: ["Text", "Image"],
        description: "Inter-letter kerning in monetary penalty figure ($180,000,000) shows optical misalignment compared to standard digital typesetting.",
        forensicFinding: "Text string was digitally inserted into scanned bitmap raster rather than native vectorized PDF text stream."
      }
    ],
    missingEvidence: [
      {
        id: "ev-11",
        title: "High-Resolution Uncompressed Master TIFF Source",
        description: "Original uncompressed flatbed scan file enables paper fiber microstructure and ink reflectance validation.",
        confidenceGain: 22,
        required: true,
        sourceType: "Department Archive Repository",
        attached: false
      },
      {
        id: "ev-12",
        title: "Government Notary Public Cryptographic Certificate",
        description: "X.509 digital signature token issued by accredited legal attestation authority.",
        confidenceGain: 20,
        required: true,
        sourceType: "National Digital Trust Service",
        attached: false
      },
      {
        id: "ev-13",
        title: "Official Gazette Publication Index Reference",
        description: "Corresponding record entry in the public register ledger with exact date-hash match.",
        confidenceGain: 15,
        required: false,
        sourceType: "Public Regulatory Gazette",
        attached: false
      }
    ],
    provenanceChain: [
      {
        step: 1,
        title: "Document Compilation",
        entity: "Adobe InDesign 19.4 (Windows NT 10.0)",
        timestamp: "2026-09-12 14:10:00 UTC",
        status: "verified",
        hash: "a417e1124d9c7921a887d1a54b38d94e22e967a5f118bc2814aef03194a2f3a8",
        notes: "Authorized internal draft template initiated by Legal Directorate."
      },
      {
        step: 2,
        title: "Scan & Rasterization",
        entity: "Canon imageRUNNER ADVANCE DX C5860i",
        timestamp: "2026-09-12 14:15:30 UTC",
        status: "verified",
        hash: "1834c26ef4848f7e2c91b53f608173e047f3ec780c103b610c1149d50198aa4e",
        notes: "Physical printout scanned to multi-page PDF."
      },
      {
        step: 3,
        title: "Splicing & Text Layer Alteration",
        entity: "Ghostscript 10.04 / PDFtk Mod Engine",
        timestamp: "2026-09-30 22:18:41 UTC",
        status: "tampered",
        hash: "c189b27419ef87b0a3901b22e11893c78091da3c09194e21a48c9038411e741a",
        notes: "Clause 9B text replaced; executive signature copied from public PDF document."
      },
      {
        step: 4,
        title: "Dissemination to Media Outlet",
        entity: "Encrypted Drop via Tor Hidden Service",
        timestamp: "2026-10-03 20:30:18 UTC",
        status: "tampered",
        hash: "93c78091da3c09194e21a48c9038411e741ac189b27419ef87b0a3901b22e118",
        notes: "Marketed as unredacted official regulatory leak."
      }
    ],
    simulatorDefaults: {
      faceSwap: false,
      voiceClone: false,
      transcriptAlteration: true,
      stripC2PA: false,
      adversarialNoise: true,
      videoReplay: false
    },
    robustnessScore: 79,
    robustnessRating: "Moderate Resilience to Document Splicing & Font Morphing",
    attackWeights: {
      faceSwap: -10,
      voiceClone: -8,
      transcriptAlteration: -22,
      stripC2PA: -14,
      adversarialNoise: -16,
      videoReplay: -6
    }
  },
  {
    id: "TL-1026",
    title: "Official News Stream (Verified Authentic)",
    classification: "C2PA-Certified Broadcast Stream",
    mediaType: "Broadcast Video + Embedded C2PA Signature",
    mediaIcon: "ShieldCheck",
    initialScore: 96,
    threatLevel: "FULL AUTHENTICITY CONFIRMED",
    threatBadgeType: "success",
    description: "Live national news broadcast feed with end-to-end Coalition for Content Provenance and Authenticity (C2PA) cryptographic binding. Hardware-level silicon attestation verified.",
    fileDetails: {
      filename: "live_bulletin_c2pa_signed_20261003.mxf",
      fileSize: "412.5 MB",
      codec: "Apple ProRes 422 HQ / Linear PCM 24-bit 96kHz",
      resolution: "3840x2160 UHD @ 59.94 fps",
      sha256: "3182ab91c49e2182046bcdefa810283019284729103948572019482710492831",
      ingestedAt: "2026-10-03 18:01:45 UTC"
    },
    modalBreakdown: {
      image: { score: 97, status: "emerald", label: "Image / Frames", note: "PRNU sensor fingerprint matches registered ARRI Alexa 35" },
      audio: { score: 95, status: "emerald", label: "Acoustic Audio", note: "Acoustic reverberation matches studio room IR exactly" },
      video: { score: 98, status: "emerald", label: "Temporal Video", note: "Continuous micro-motion vectors & natural ocular saccades" },
      text: { score: 96, status: "emerald", label: "Speech Transcript", note: "Real-time closed-caption teleprompter cross-verified" },
      metadata: { score: 99, status: "emerald", label: "C2PA Manifest", note: "Valid hardware root-of-trust signature chain" }
    },
    pipelineNodes: [
      { id: "p1", name: "Media Ingestion", status: "success", detail: "C2PA manifest package extracted & schema verified against ISO 22158", duration: "95ms" },
      { id: "p2", name: "Multi-Modal Extraction", status: "success", detail: "Extracted biometric ocular flow, sensor PRNU, and studio audio stems", duration: "410ms" },
      { id: "p3", name: "Cross-Modal Consistency Check", status: "success", detail: "Acoustic-visual phoneme resonance ratio 99.8% congruent", duration: "520ms" },
      { id: "p4", name: "Evidence Reasoning", status: "success", detail: "Bayesian authenticity probability evaluated at 99.98%", duration: "110ms" },
      { id: "p5", name: "Final Assessment", status: "success", detail: "Certified Untampered: Chain-of-custody sealed and validated", duration: "25ms" }
    ],
    mismatchFeed: [
      {
        id: "m-21",
        title: "Cross-Modal Coherence: Lip-Sync Phase Harmonic Match",
        type: "Acoustic-Visual Coherence",
        severity: "success",
        timestamp: "Entire Stream Duration",
        confidence: "99.8%",
        modalities: ["Video", "Audio"],
        description: "Viseme-phoneme timing delta is 4ms across all speech segments, well within biological human voice production limits.",
        forensicFinding: "SyncNet confidence metric: 9.42 (High Resonance). Zero temporal splicing or neural vocoding detected."
      },
      {
        id: "m-22",
        title: "Cryptographic Attestation: C2PA Root Chain Intact",
        type: "C2PA Authenticity",
        severity: "success",
        timestamp: "Embedded Manifest Block",
        confidence: "100.0%",
        modalities: ["Metadata", "Security"],
        description: "X.509 certificate signed by Global Content Provenance Alliance root CA. Hardware Enclave attestation key verified with ARRI Secure Element.",
        forensicFinding: "SHA-256 hash tree matches all individual audio/video chunk hashes without modification or re-encryption."
      },
      {
        id: "m-23",
        title: "Sensor Noise Fingerprint: Sensor PRNU Verified",
        type: "Physical Sensor Signature",
        severity: "success",
        timestamp: "Continuous Frame Analysis",
        confidence: "97.4%",
        modalities: ["Image", "Hardware"],
        description: "Photo-Response Non-Uniformity (PRNU) noise residual matches the physical silicon CMOS sensor profile of studio camera ARRI-35-081.",
        forensicFinding: "Corroborates camera hardware origin; rules out AI frame interpolation or diffusion generative synthesis."
      }
    ],
    missingEvidence: [
      {
        id: "ev-21",
        title: "Public Immutable Ledger Timestamp Anchor",
        description: "Ethereum/Polygon zero-knowledge proof anchor verifying exact broadcast block inclusion time.",
        confidenceGain: 4,
        required: false,
        sourceType: "Decentralized Provenance Registry",
        attached: true
      }
    ],
    provenanceChain: [
      {
        step: 1,
        title: "Live Camera Capture & Hardware Signing",
        entity: "ARRI Alexa 35 Studio Master (Secure Element HSM)",
        timestamp: "2026-10-03 18:00:00 UTC",
        status: "verified",
        hash: "3182ab91c49e2182046bcdefa810283019284729103948572019482710492831",
        notes: "Hardware cryptographic chip generated initial C2PA assertion upon CMOS exposure."
      },
      {
        step: 2,
        title: "Broadcast Production Switcher",
        entity: "Grass Valley Kayenne Video Production Center",
        timestamp: "2026-10-03 18:00:05 UTC",
        status: "verified",
        hash: "c2pa-cert-reuters-live-9048123901a8ef839210948bca1",
        notes: "Graphics overlay added with secondary C2PA claim assertion."
      },
      {
        step: 3,
        title: "Dual-Key Cryptographic Master Stamp",
        entity: "Reuters Digital Trust Operations Key Manager",
        timestamp: "2026-10-03 18:00:10 UTC",
        status: "verified",
        hash: "e4819038411e741ac189b27419ef87b0a3901b22e11893c78091da3c09194e21",
        notes: "Signed with NIST P-384 public key certificate registered in official C2PA trust list."
      },
      {
        step: 4,
        title: "Primary Satellite Distribution Uplink",
        entity: "Intelsat Galaxy 19 Secure Transponder",
        timestamp: "2026-10-03 18:00:30 UTC",
        status: "verified",
        hash: "93c78091da3c09194e21a48c9038411e741ac189b27419ef87b0a3901b22e118",
        notes: "Direct encrypted transport stream without re-compression or metadata modification."
      },
      {
        step: 5,
        title: "Official CDN Edge Delivery",
        entity: "Fastly Provenance Verified Edge Network",
        timestamp: "2026-10-03 18:01:00 UTC",
        status: "verified",
        hash: "3182ab91c49e2182046bcdefa810283019284729103948572019482710492831",
        notes: "Content served to end users with verifiable Content Credentials badge intact."
      }
    ],
    simulatorDefaults: {
      faceSwap: false,
      voiceClone: false,
      transcriptAlteration: false,
      stripC2PA: false,
      adversarialNoise: false,
      videoReplay: false
    },
    robustnessScore: 97,
    robustnessRating: "Superior Resilience: End-to-End Cryptographic & Biometric Guard",
    attackWeights: {
      faceSwap: -25,
      voiceClone: -20,
      transcriptAlteration: -18,
      stripC2PA: -30,
      adversarialNoise: -12,
      videoReplay: -8
    }
  }
];

export const ATTACK_DEFINITIONS = [
  {
    id: "faceSwap",
    name: "Face Swap Injection",
    category: "Visual Generative Attack",
    description: "Replaces original subject face with target persona using latent diffusion inpainting or SimSwap mesh transfer.",
    defaultPenalty: 20,
    detectionSignals: ["Eye blink rate anomaly", "Boundary blending halo", "Pose jitter at 45° angle"]
  },
  {
    id: "voiceClone",
    name: "Synthetic Voice Clone",
    category: "Acoustic Neural Attack",
    description: "Clones target speech prosody, pitch, and timbre using zero-shot diffusion vocoders (e.g. Tortoise/XTTS).",
    defaultPenalty: 24,
    detectionSignals: ["Phase continuity break", "Zero-crossing rate spike", "Synthetic F0 contour"]
  },
  {
    id: "transcriptAlteration",
    name: "Transcript / Text Splicing",
    category: "Semantic Content Attack",
    description: "Modifies critical dates, monetary sums, or intent phrases while maintaining surrounding font geometry.",
    defaultPenalty: 18,
    detectionSignals: ["Kerning variance", "OCR bounding box skew", "Knowledge graph conflict"]
  },
  {
    id: "stripC2PA",
    name: "Strip C2PA Signature",
    category: "Provenance Stripping Attack",
    description: "Removes cryptographic JUMBF boxes and hardware security signatures to induce claim invalidation.",
    defaultPenalty: 25,
    detectionSignals: ["Missing JUMBF atom", "Broken hash tree", "Missing root CA certificate"]
  },
  {
    id: "adversarialNoise",
    name: "Adversarial Noise Injection",
    category: "Evasion / Perturbation Attack",
    description: "Applies imperceptible high-frequency gradient perturbations designed to deceive CNN/ViT forensic classifiers.",
    defaultPenalty: 12,
    detectionSignals: ["High-frequency gradient residual", "JPEG quantization mismatch", "Sensor PRNU mask failure"]
  },
  {
    id: "videoReplay",
    name: "Screen Replay / Moiré Attack",
    category: "Physical Acquisition Attack",
    description: "Records genuine video played on high-refresh 8K OLED display to forge fresh timestamps.",
    defaultPenalty: 10,
    detectionSignals: ["Moiré optical pattern", "Polarization color fringing", "Double compression artifacts"]
  }
];
