import React, { useRef, useEffect } from 'react';

export interface MedicalAnimationCanvasProps {
  animationType: 'action-potential' | 'atherosclerosis' | 'coronary-circulation' | 'nitrate-mechanism' | 'heart-failure' | 'cabg-surgery' | 'cardiac-cycle' | string;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  className?: string;
}

export const MedicalAnimationCanvas: React.FC<MedicalAnimationCanvasProps> = ({
  animationType,
  currentTime,
  duration,
  isPlaying,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 832;
    const height = rect.height || 468;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Calculate normalized progress (0 to 1) based on currentTime and duration
    const effectiveDuration = duration > 0 ? duration : 18;
    const progress = Math.min(Math.max(currentTime / effectiveDuration, 0), 1);
    const timeMs = currentTime * 1000;

    // Clear background
    ctx.fillStyle = '#030712'; // Slate 950 deep dark background
    ctx.fillRect(0, 0, width, height);

    switch (animationType) {
      case 'action-potential':
        renderActionPotential(ctx, width, height, progress, timeMs);
        break;
      case 'atherosclerosis':
        renderAtherosclerosis(ctx, width, height, progress, timeMs);
        break;
      case 'nitrate-mechanism':
        renderNitrateMechanism(ctx, width, height, progress, timeMs);
        break;
      case 'coronary-circulation':
        renderCoronaryCirculation(ctx, width, height, progress, timeMs);
        break;
      case 'heart-failure':
        renderHeartFailure(ctx, width, height, progress, timeMs);
        break;
      case 'cabg-surgery':
        renderCabgSurgery(ctx, width, height, progress, timeMs);
        break;
      case 'cardiac-cycle':
      default:
        renderCardiacCycle(ctx, width, height, progress, timeMs);
        break;
    }

    ctx.restore();
  }, [animationType, currentTime, duration, isPlaying]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center bg-slate-950 overflow-hidden select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-contain"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

// ==========================================
// 1. ACTION POTENTIAL (Electrophysiology)
// ==========================================
function renderActionPotential(ctx: CanvasRenderingContext2D, w: number, h: number, p: number, t: number) {
  // Grid lines
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
  ctx.lineWidth = 1;
  const gridStep = 40;
  for (let x = 0; x < w; x += gridStep) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += gridStep) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Oscilloscope axes & voltage marks
  const leftMargin = 70;
  const bottomMargin = 80;
  const plotW = w - leftMargin - 40;
  const plotH = h - bottomMargin - 60;
  const zeroY = plotH * 0.4 + 40;
  const baseRestY = plotH * 0.88 + 40; // -90 mV
  const peakY = plotH * 0.15 + 40; // +25 mV

  ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
  ctx.lineWidth = 1.5;
  // Voltage baseline (-90mV)
  ctx.beginPath();
  ctx.moveTo(leftMargin, baseRestY);
  ctx.lineTo(w - 30, baseRestY);
  ctx.stroke();

  // Voltage marks
  ctx.font = '10px monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('+30 mV', 16, peakY - 8);
  ctx.fillText('  0 mV', 16, zeroY + 4);
  ctx.fillText('-70 mV (Threshold)', 8, baseRestY - (baseRestY - zeroY) * 0.22);
  ctx.fillText('-90 mV (Resting)', 8, baseRestY + 4);

  // Dashed threshold line
  ctx.strokeStyle = 'rgba(234, 179, 8, 0.3)';
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(leftMargin, baseRestY - (baseRestY - zeroY) * 0.22);
  ctx.lineTo(w - 30, baseRestY - (baseRestY - zeroY) * 0.22);
  ctx.stroke();
  ctx.setLineDash([]);

  // Generate full AP curve
  const points: { x: number; y: number }[] = [];
  const numSteps = 200;
  for (let i = 0; i <= numSteps; i++) {
    const fraction = i / numSteps;
    const x = leftMargin + fraction * plotW;
    let y = baseRestY;

    if (fraction < 0.08) {
      y = baseRestY;
    } else if (fraction < 0.16) {
      // Phase 0: Rapid depolarization spike
      const f = (fraction - 0.08) / 0.08;
      y = baseRestY - f * (baseRestY - peakY);
    } else if (fraction < 0.22) {
      // Phase 1: Notch
      const f = (fraction - 0.16) / 0.06;
      y = peakY + f * 24;
    } else if (fraction < 0.62) {
      // Phase 2: Plateau
      const f = (fraction - 0.22) / 0.40;
      y = peakY + 24 + f * 35;
    } else if (fraction < 0.85) {
      // Phase 3: Rapid repolarization
      const f = (fraction - 0.62) / 0.23;
      const startY = peakY + 59;
      y = startY + f * (baseRestY - startY);
    } else {
      // Phase 4: Resting
      y = baseRestY;
    }
    points.push({ x, y });
  }

  // Draw full faded AP path
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  points.forEach((pt, idx) => {
    if (idx === 0) ctx.moveTo(pt.x, pt.y);
    else ctx.lineTo(pt.x, pt.y);
  });
  ctx.stroke();

  // Draw active traced curve up to progress `p`
  const activeCount = Math.floor(p * points.length);
  if (activeCount > 0) {
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    for (let i = 0; i <= activeCount && i < points.length; i++) {
      if (i === 0) ctx.moveTo(points[i].x, points[i].y);
      else ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Glowing Cursor head
    const curPt = points[Math.min(activeCount, points.length - 1)];
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(curPt.x, curPt.y, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.beginPath();
    ctx.arc(curPt.x, curPt.y, 11, 0, Math.PI * 2);
    ctx.fill();
  }

  // Phase badges & ion channels status along top
  let currentPhase = 'Phase 4: Resting Membrane Potential (-90 mV)';
  let activeIon = 'Na+/K+ ATPase Pump maintain resting gradient';
  let badgeColor = '#64748b';

  if (p >= 0.08 && p < 0.16) {
    currentPhase = 'Phase 0: Rapid Upstroke Depolarization';
    activeIon = 'Fast Voltage-Gated Na+ (Nav1.5) Influx';
    badgeColor = '#10b981';
  } else if (p >= 0.16 && p < 0.22) {
    currentPhase = 'Phase 1: Early Transient Repolarization Notch';
    activeIon = 'Transient Outward K+ (Ito) Efflux';
    badgeColor = '#f59e0b';
  } else if (p >= 0.22 && p < 0.62) {
    currentPhase = 'Phase 2: Sustained Plateau Phase';
    activeIon = 'L-Type Ca2+ (Cav1.2) Inward Current vs Delayed K+ Outward';
    badgeColor = '#3b82f6';
  } else if (p >= 0.62 && p < 0.85) {
    currentPhase = 'Phase 3: Rapid Repolarization';
    activeIon = 'Delayed Rectifier K+ (IKr / IKs) Efflux';
    badgeColor = '#8b5cf6';
  }

  // Draw HUD Banner
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.strokeStyle = badgeColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(leftMargin, 16, plotW, 36, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText(currentPhase, leftMargin + 14, 34);

  ctx.fillStyle = badgeColor;
  ctx.font = '11px monospace';
  ctx.fillText(`• ${activeIon}`, leftMargin + 14, 46);

  // Bottom Refractory Period Bar
  const arpW = plotW * 0.58;
  const rrpW = plotW * 0.23;
  ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
  ctx.fillRect(leftMargin + plotW * 0.08, h - 34, arpW, 18);
  ctx.fillStyle = '#ef4444';
  ctx.font = '10px sans-serif';
  ctx.fillText('Absolute Refractory Period (ARP) - Cannot be tetanized', leftMargin + plotW * 0.10, h - 21);

  ctx.fillStyle = 'rgba(234, 179, 8, 0.15)';
  ctx.fillRect(leftMargin + plotW * 0.08 + arpW, h - 34, rrpW, 18);
  ctx.fillStyle = '#eab308';
  ctx.fillText('Relative (RRP)', leftMargin + plotW * 0.08 + arpW + 8, h - 21);
}

// ==========================================
// 2. ATHEROSCLEROSIS & CORONARY THROMBOSIS
// ==========================================
function renderAtherosclerosis(ctx: CanvasRenderingContext2D, w: number, h: number, p: number, t: number) {
  const midY = h * 0.48;
  const lumenHalfHeight = h * 0.24;
  const topWallY = midY - lumenHalfHeight;
  const botWallY = midY + lumenHalfHeight;

  // Artery outer layers (Adventitia / Media)
  ctx.fillStyle = '#3f1d1d';
  ctx.fillRect(0, 0, w, topWallY);
  ctx.fillRect(0, botWallY, w, h - botWallY);

  // Endothelium lines
  ctx.strokeStyle = '#e11d48';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, topWallY);
  ctx.lineTo(w, topWallY);
  ctx.stroke();

  // Lumen background (flowing blood stream)
  ctx.fillStyle = '#1c0505';
  ctx.fillRect(0, topWallY, w, botWallY - topWallY);

  // Plaque growth curve on bottom wall
  // Stage 1 (0-0.3): Endothelial breach & lipid pool
  // Stage 2 (0.3-0.65): Foam cell atheroma & necrotic core expansion (70% stenosis)
  // Stage 3 (0.65-1.0): Fibrous cap rupture & occlusive platelet thrombus (95% occlusion)
  const maxPlaqueHeight = lumenHalfHeight * 1.55 * Math.min(p * 1.3, 1);
  const plaqueCenterX = w * 0.52;
  const plaqueRadiusX = w * 0.32;

  // Draw Atheroma Plaque Bump
  ctx.beginPath();
  ctx.moveTo(plaqueCenterX - plaqueRadiusX, botWallY);
  ctx.bezierCurveTo(
    plaqueCenterX - plaqueRadiusX * 0.5, botWallY - maxPlaqueHeight * 1.1,
    plaqueCenterX + plaqueRadiusX * 0.5, botWallY - maxPlaqueHeight * 1.1,
    plaqueCenterX + plaqueRadiusX, botWallY
  );
  ctx.closePath();

  // Plaque internal color gradient (lipid necrotic core + fibrous cap)
  const plaqueGrad = ctx.createLinearGradient(0, botWallY - maxPlaqueHeight, 0, botWallY);
  plaqueGrad.addColorStop(0, '#fef08a'); // yellow fibrous cap
  plaqueGrad.addColorStop(0.35, '#ca8a04'); // foam cells
  plaqueGrad.addColorStop(0.85, '#713f12'); // necrotic lipid core
  ctx.fillStyle = plaqueGrad;
  ctx.fill();

  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Flowing Red Blood Cells
  const rbcCount = 35;
  const speed = (t * 0.15) % w;
  ctx.fillStyle = '#dc2626';
  for (let i = 0; i < rbcCount; i++) {
    const rx = (i * (w / rbcCount) + speed) % w;
    // Compress cells over plaque bottleneck
    const distFromCenter = Math.abs(rx - plaqueCenterX);
    let cellY = topWallY + 20 + ((i * 37) % (botWallY - topWallY - 40));
    if (distFromCenter < plaqueRadiusX) {
      const heightFactor = 1 - (distFromCenter / plaqueRadiusX);
      const localPlaqueY = botWallY - maxPlaqueHeight * heightFactor;
      if (cellY > localPlaqueY - 10) {
        cellY = localPlaqueY - 14 - ((i * 11) % 18);
      }
    }

    ctx.beginPath();
    ctx.ellipse(rx, cellY, 8, 5, 0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Stage 3 Rupture & Platelet Thrombus
  if (p > 0.6) {
    const ruptureIntensity = (p - 0.6) / 0.4;
    const apexY = botWallY - maxPlaqueHeight;

    // Fissure in cap
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(plaqueCenterX - 15, apexY);
    ctx.lineTo(plaqueCenterX + 10, apexY + 12);
    ctx.stroke();

    // Growing dark red platelet thrombus
    const thrombusRadius = 24 * ruptureIntensity + 8;
    const thrombusGrad = ctx.createRadialGradient(
      plaqueCenterX, apexY - 8, 2,
      plaqueCenterX, apexY - 8, thrombusRadius
    );
    thrombusGrad.addColorStop(0, '#881337');
    thrombusGrad.addColorStop(0.6, '#4c0519');
    thrombusGrad.addColorStop(1, 'rgba(76, 5, 25, 0)');

    ctx.fillStyle = thrombusGrad;
    ctx.beginPath();
    ctx.arc(plaqueCenterX, apexY - 8, thrombusRadius, 0, Math.PI * 2);
    ctx.fill();

    // Fibrin mesh strands
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1;
    for (let f = 0; f < 6; f++) {
      ctx.beginPath();
      ctx.moveTo(plaqueCenterX - 15 + f * 5, apexY - 4);
      ctx.lineTo(plaqueCenterX - 10 + f * 6, apexY - thrombusRadius * 0.7);
      ctx.stroke();
    }
  }

  // HUD Panels
  const stenosisPct = Math.min(Math.round(25 + p * 72), 97);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.strokeStyle = p > 0.6 ? '#ef4444' : '#f59e0b';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(24, 18, w - 48, 42, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('Coronary Atherosclerosis & Acute Thrombosis', 38, 36);

  ctx.fillStyle = p > 0.6 ? '#f87171' : '#fbbf24';
  ctx.font = '11px monospace';
  const statusTxt = p < 0.35 
    ? `Luminal Stenosis: ${stenosisPct}% • Subendothelial oxLDL Infiltration`
    : p < 0.65 
      ? `Luminal Stenosis: ${stenosisPct}% • Thin-Cap Fibroatheroma Vulnerability`
      : `CRITICAL OCCLUSION: ${stenosisPct}% • Acute Plaque Rupture & Occlusive Thrombus (STEMI)`;
  ctx.fillText(statusTxt, 38, 50);
}

// ==========================================
// 3. NITRATE MECHANISM (Pharmacology)
// ==========================================
function renderNitrateMechanism(ctx: CanvasRenderingContext2D, w: number, h: number, p: number, t: number) {
  // Split visual: Left side Cellular Smooth Muscle biochemistry, Right side Vessel Dilation
  const splitX = w * 0.52;

  // Left background: Vascular Smooth Muscle Cytoplasm
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, splitX, h);

  // Right background: Systemic Capacitance Vein
  ctx.fillStyle = '#020617';
  ctx.fillRect(splitX, 0, w - splitX, h);

  // Divider line
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(splitX, 0);
  ctx.lineTo(splitX, h);
  ctx.stroke();

  // LEFT PANEL: Biochemical Cascade
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('VASCULAR SMOOTH MUSCLE CELL', 24, 28);

  // Step 1: GTN -> NO (0 - 0.33)
  const gtnActive = p >= 0.05;
  ctx.fillStyle = gtnActive ? '#3b82f6' : '#64748b';
  ctx.beginPath();
  ctx.roundRect(24, 46, splitX - 48, 38, 8);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('1. GTN Denitration by ALDH-2', 36, 64);
  ctx.font = '10px monospace';
  ctx.fillStyle = '#93c5fd';
  ctx.fillText('Releases active Nitric Oxide (•NO)', 36, 76);

  // Step 2: sGC Activation & cGMP Synthesis (0.33 - 0.66)
  const cGMPActive = p >= 0.33;
  ctx.fillStyle = cGMPActive ? '#059669' : '#334155';
  ctx.beginPath();
  ctx.roundRect(24, 96, splitX - 48, 42, 8);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('2. Soluble Guanylyl Cyclase (sGC)', 36, 114);
  ctx.font = '10px monospace';
  ctx.fillStyle = '#6ee7b7';
  ctx.fillText('GTP → cyclic GMP (cGMP) Surge ↑↑', 36, 128);

  // Floating cGMP particles
  if (cGMPActive) {
    ctx.fillStyle = '#34d399';
    for (let i = 0; i < 14; i++) {
      const cx = 35 + ((i * 31 + t * 0.04) % (splitX - 70));
      const cy = 100 + ((i * 17) % 32);
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Step 3: PKG & Myosin Light Chain Dephosphorylation (0.66 - 1.0)
  const mlcpActive = p >= 0.66;
  ctx.fillStyle = mlcpActive ? '#7c3aed' : '#334155';
  ctx.beginPath();
  ctx.roundRect(24, 150, splitX - 48, 44, 8);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('3. PKG & MLCP Dephosphorylation', 36, 168);
  ctx.font = '10px monospace';
  ctx.fillStyle = '#c4b5fd';
  ctx.fillText('Intracellular Ca2+ Sequestration → Relaxation', 36, 184);

  // RIGHT PANEL: Capacitance Vein Cross Section Dilation
  const rightCenterX = splitX + (w - splitX) * 0.5;
  const rightCenterY = h * 0.44;

  // Dilation transition: radius expands smoothly from 38px to 80px
  const initialRadius = 38;
  const targetRadius = 82;
  const currentRadius = initialRadius + (targetRadius - initialRadius) * Math.min(p * 1.25, 1);

  // Outer Vessel Wall (Smooth Muscle Media)
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(rightCenterX, rightCenterY, currentRadius + 8, 0, Math.PI * 2);
  ctx.stroke();

  // Dilating Venous Lumen
  const lumenGrad = ctx.createRadialGradient(
    rightCenterX, rightCenterY, 5,
    rightCenterX, rightCenterY, currentRadius
  );
  lumenGrad.addColorStop(0, '#991b1b');
  lumenGrad.addColorStop(1, '#450a0a');
  ctx.fillStyle = lumenGrad;
  ctx.beginPath();
  ctx.arc(rightCenterX, rightCenterY, currentRadius, 0, Math.PI * 2);
  ctx.fill();

  // Vessel label
  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SYSTEMIC CAPACITANCE VEIN', rightCenterX, 28);
  ctx.fillStyle = '#38bdf8';
  ctx.font = '10px monospace';
  ctx.fillText(`Lumen Diameter: ${(currentRadius * 2).toFixed(0)} μm (Dilated)`, rightCenterX, h * 0.72);
  ctx.textAlign = 'left';

  // Bottom Clinical Hemodynamic Indicators
  ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(16, h - 56, w - 32, 44, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('Primary Hemodynamic Consequence:', 28, h - 38);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '10px monospace';
  const preloadDrop = Math.round(p * 38);
  ctx.fillText(`Venous Pooling → Preload Drop: -${preloadDrop}% • Ventricular Wall Tension: Markedly Reduced • Angina Relieved`, 28, h - 22);
}

// ==========================================
// 4. CORONARY CIRCULATION (Anatomy)
// ==========================================
function renderCoronaryCirculation(ctx: CanvasRenderingContext2D, w: number, h: number, p: number, t: number) {
  // Beating Heart Silhouette & Glowing Coronary Tree
  const cx = w * 0.48;
  const cy = h * 0.48;
  const beatScale = 1 + Math.sin(t * 0.006) * 0.035;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(beatScale, beatScale);
  ctx.translate(-cx, -cy);

  // Myocardial Outline
  ctx.fillStyle = '#450a0a';
  ctx.strokeStyle = '#b91c1c';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 110); // Base of aorta
  ctx.bezierCurveTo(cx + 120, cy - 90, cx + 130, cy + 50, cx, cy + 130); // Apex
  ctx.bezierCurveTo(cx - 130, cy + 50, cx - 120, cy - 90, cx, cy - 110);
  ctx.fill();
  ctx.stroke();

  // Aortic Root at top
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(cx - 24, cy - 145, 48, 45);

  // Coronary Tree Paths
  // 1. Left Anterior Descending (LAD) down the interventricular groove
  ctx.strokeStyle = '#f87171';
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 8;
  ctx.lineWidth = 3.5;

  ctx.beginPath();
  ctx.moveTo(cx + 6, cy - 105);
  ctx.quadraticCurveTo(cx + 25, cy - 30, cx + 10, cy + 120); // LAD to apex
  ctx.stroke();

  // LAD Diagonals
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx + 18, cy - 40);
  ctx.lineTo(cx + 65, cy - 10);
  ctx.moveTo(cx + 16, cy + 15);
  ctx.lineTo(cx + 55, cy + 45);
  ctx.stroke();

  // 2. Left Circumflex (LCx) curving laterally
  ctx.beginPath();
  ctx.moveTo(cx + 6, cy - 105);
  ctx.quadraticCurveTo(cx + 75, cy - 85, cx + 95, cy - 20);
  ctx.stroke();

  // 3. Right Coronary Artery (RCA)
  ctx.strokeStyle = '#fb923c';
  ctx.shadowColor = '#f97316';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 12, cy - 105);
  ctx.quadraticCurveTo(cx - 85, cy - 65, cx - 75, cy + 25);
  ctx.quadraticCurveTo(cx - 50, cy + 85, cx - 10, cy + 110); // PDA
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.restore();

  // Pulsating Perfusion Waves along vessels
  const wavePos = (t * 0.08) % 120;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx + 12 + wavePos * 0.05, cy - 90 + wavePos * 1.6, 4, 0, Math.PI * 2);
  ctx.fill();

  // Anatomy Labels
  ctx.font = '10px monospace';
  ctx.fillStyle = '#fca5a5';
  ctx.fillText('LAD (Anterior 2/3 Septum & Apex) →', cx - 220, cy - 10);
  ctx.fillText('← LCx (Lateral LV)', cx + 110, cy - 50);
  ctx.fillStyle = '#fdba74';
  ctx.fillText('← RCA (SA/AV Nodes, Inferior Wall)', cx - 240, cy + 40);

  // Top Title HUD
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(24, 18, w - 48, 44, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('3D Coronary Circulation & Myocardial Perfusion Architecture', 38, 36);

  ctx.fillStyle = '#67e8f9';
  ctx.font = '11px monospace';
  ctx.fillText(`Phase: ${p < 0.35 ? 'Aortic Sinuses & Coronary Ostia' : p < 0.7 ? 'LAD & LCx Perfusion (Diastolic Inflow)' : 'RCA Nodal & PDA Diaphragmatic Supply'}`, 38, 50);
}

// ==========================================
// 5. HEART FAILURE & REMODELING (Medicine)
// ==========================================
function renderHeartFailure(ctx: CanvasRenderingContext2D, w: number, h: number, p: number, t: number) {
  const cx = w * 0.44;
  const cy = h * 0.48;

  // Sluggish, hypokinetic contraction scale
  const slowBeat = 1 + Math.sin(t * 0.004) * 0.015;

  // Dilated, thin-walled Left Ventricle
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(slowBeat, slowBeat);
  ctx.translate(-cx, -cy);

  // Thin, attenuated myocardium (dilated cardiomyopathy)
  ctx.strokeStyle = '#831843';
  ctx.lineWidth = 6; // Thin wall compared to normal 15px!
  ctx.fillStyle = '#1e1b4b'; // Volume-overloaded cavity

  ctx.beginPath();
  ctx.ellipse(cx, cy, 115, 125, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Mitral valve annulus dilatation with central regurgitant gap
  const valveY = cy - 80;
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  // Left leaflet
  ctx.beginPath();
  ctx.moveTo(cx - 55, valveY);
  ctx.lineTo(cx - 14, valveY + 22);
  ctx.stroke();
  // Right leaflet (incomplete coaptation gap)
  ctx.beginPath();
  ctx.moveTo(cx + 55, valveY);
  ctx.lineTo(cx + 14, valveY + 22);
  ctx.stroke();

  // Regurgitant Jet (swirling backwards during systole)
  const isSystole = Math.sin(t * 0.004) > 0;
  if (isSystole) {
    const jetGrad = ctx.createLinearGradient(cx, valveY + 20, cx, valveY - 55);
    jetGrad.addColorStop(0, 'rgba(56, 189, 248, 0.8)');
    jetGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = jetGrad;
    ctx.beginPath();
    ctx.moveTo(cx - 10, valveY + 20);
    ctx.lineTo(cx + 10, valveY + 20);
    ctx.lineTo(cx + 35, valveY - 55);
    ctx.lineTo(cx - 35, valveY - 55);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '10px monospace';
    ctx.fillText('Functional Mitral Regurgitation', cx + 60, valveY - 20);
  }

  ctx.restore();

  // Hemodynamic Gauge Sidebar
  const sideX = w * 0.74;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
  ctx.strokeStyle = '#e11d48';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(sideX, 80, w - sideX - 24, h - 140, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('HEMODYNAMICS (HFrEF)', sideX + 12, 104);

  ctx.font = '10px monospace';
  ctx.fillStyle = '#f43f5e';
  ctx.fillText('EF: 26% (Severely Low)', sideX + 12, 128);
  ctx.fillStyle = '#fbbf24';
  ctx.fillText('LVEDP: 28 mmHg (High)', sideX + 12, 150);
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Wall: Thin & Attenuated', sideX + 12, 172);
  ctx.fillText('Chamber: Eccentric Dilation', sideX + 12, 194);
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('Auscultation: S3 Gallop', sideX + 12, 216);

  // Bottom Title Banner
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(24, 18, w - 48, 44, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('Heart Failure with Reduced Ejection Fraction (HFrEF) & Remodeling', 38, 36);

  ctx.fillStyle = '#fca5a5';
  ctx.font = '11px monospace';
  ctx.fillText(`Phase: ${p < 0.35 ? 'Eccentric LV Chamber Dilatation & Wall Thinning' : p < 0.7 ? 'Elevated LVEDP & Secondary Mitral Incompetence' : 'Pulmonary Venous Congestion & S3 Gallop Resonance'}`, 38, 50);
}

// ==========================================
// 6. CABG SURGERY (Surgery)
// ==========================================
function renderCabgSurgery(ctx: CanvasRenderingContext2D, w: number, h: number, p: number, t: number) {
  const cx = w * 0.44;
  const cy = h * 0.50;

  // Heart silhouette
  ctx.fillStyle = '#3b0764'; // purple ischemic hue transitioning to healthy red with flow
  const ischemiaHue = p > 0.4 ? '#450a0a' : '#2e1065';
  ctx.fillStyle = ischemiaHue;
  ctx.strokeStyle = '#9333ea';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(cx, cy, 110, 118, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Obstructed Native LAD with black blockage
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 15, cy - 90);
  ctx.lineTo(cx - 5, cy - 30);
  ctx.stroke();

  // Plaque blockage spot
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx - 5, cy - 30, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Distal LAD
  ctx.strokeStyle = p > 0.3 ? '#ef4444' : '#6b21a8'; // restored flow turns it bright red!
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 5, cy - 24);
  ctx.lineTo(cx + 8, cy + 90);
  ctx.stroke();

  // SURGICAL BYPASS: Left Internal Mammary Artery (LIMA) Pedicle
  ctx.strokeStyle = '#10b981'; // Green conduit
  ctx.shadowColor = '#10b981';
  ctx.shadowBlur = 8;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(cx - 160, cy - 80); // Mobilized from internal chest wall
  ctx.bezierCurveTo(cx - 100, cy - 110, cx - 40, cy - 20, cx - 2, cy + 10);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Anastomosis suture mark
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(cx - 2, cy + 10, 4, 0, Math.PI * 2);
  ctx.fill();

  // Flow animation inside LIMA conduit
  const pulse = (t * 0.1) % 80;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx - 110 + pulse * 1.3, cy - 70 + pulse * 0.9, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // Surgical HUD & labels
  ctx.font = 'bold 11px sans-serif';
  ctx.fillStyle = '#34d399';
  ctx.fillText('In-Situ LIMA Conduit (Gold Standard)', cx - 220, cy - 90);
  ctx.fillStyle = '#f87171';
  ctx.fillText('99% Stenotic Native LAD Blockage', cx - 220, cy - 25);
  ctx.fillStyle = '#fbbf24';
  ctx.fillText('End-to-Side Anastomosis →', cx - 180, cy + 14);

  // Stats Box on right
  const statX = w * 0.72;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(statX, 80, w - statX - 24, h - 140, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('SURGICAL GRAFT STATUS', statX + 12, 104);

  ctx.font = '10px monospace';
  ctx.fillStyle = '#34d399';
  ctx.fillText('LIMA-LAD: 10-Yr Patency >90%', statX + 12, 130);
  ctx.fillStyle = '#60a5fa';
  ctx.fillText('Reversed SVG: Aortocoronary', statX + 12, 154);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText('Distal Perfusion: RESTORED', statX + 12, 178);
  ctx.fillStyle = '#a7f3d0';
  ctx.fillText('Ischemia: Resolved', statX + 12, 202);

  // Header Banner
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(24, 18, w - 48, 44, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('Coronary Artery Bypass Grafting (CABG) Technique & Graft Geometry', 38, 36);

  ctx.fillStyle = '#a7f3d0';
  ctx.font = '11px monospace';
  ctx.fillText(`Phase: ${p < 0.35 ? 'Conduit Mobilization & Exposure' : p < 0.7 ? 'LIMA-to-LAD End-to-Side Anastomosis' : 'Aortocoronary Saphenous Vein Bridge & Revascularization'}`, 38, 50);
}

// ==========================================
// 7. CARDIAC CYCLE & WIGGERS (Physiology)
// ==========================================
function renderCardiacCycle(ctx: CanvasRenderingContext2D, w: number, h: number, p: number, t: number) {
  // Visual Left: Ventricle & Valves Cross-section | Visual Right: Wiggers Pressure Curves
  const splitX = w * 0.44;

  // Split Divider
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(splitX, 0);
  ctx.lineTo(splitX, h);
  ctx.stroke();

  // LEFT: Ventricular Chamber & Valves
  const cx = splitX * 0.5;
  const cy = h * 0.52;

  // Cycle phase (0-0.33 Isovolumetric, 0.33-0.66 Ejection, 0.66-1.0 Diastole/Relaxation)
  const isEjection = p >= 0.30 && p < 0.70;
  const isSystole = p < 0.70;

  // Thick Myocardium contracting
  const contractScale = isSystole ? 0.88 : 1.05;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(contractScale, contractScale);
  ctx.translate(-cx, -cy);

  // Myocardium Wall
  ctx.strokeStyle = '#e11d48';
  ctx.lineWidth = 14;
  ctx.fillStyle = '#7f1d1d';
  ctx.beginPath();
  ctx.ellipse(cx, cy, 55, 68, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Mitral Valve (AV Valve) - Closed during systole (S1)
  const mvY = cy - 48;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  if (isSystole) {
    // Tightly closed leaflets meeting in center
    ctx.beginPath();
    ctx.moveTo(cx - 30, mvY);
    ctx.lineTo(cx - 8, mvY + 8);
    ctx.moveTo(cx + 30, mvY);
    ctx.lineTo(cx + 8, mvY + 8);
    ctx.stroke();
  } else {
    // Open leaflets
    ctx.beginPath();
    ctx.moveTo(cx - 30, mvY);
    ctx.lineTo(cx - 20, mvY + 22);
    ctx.moveTo(cx + 30, mvY);
    ctx.lineTo(cx + 20, mvY + 22);
    ctx.stroke();
  }

  // Aortic Valve (Semilunar) - Opens during rapid ejection
  const avY = cy - 65;
  if (isEjection) {
    // High velocity blood jet into aorta
    ctx.fillStyle = 'rgba(239, 68, 68, 0.7)';
    ctx.beginPath();
    ctx.moveTo(cx - 16, avY);
    ctx.lineTo(cx + 16, avY);
    ctx.lineTo(cx + 22, avY - 45);
    ctx.lineTo(cx - 22, avY - 45);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();

  // Label valves
  ctx.font = '10px monospace';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('Mitral Valve: ' + (isSystole ? 'CLOSED (S1)' : 'OPEN'), 20, h - 50);
  ctx.fillStyle = '#f87171';
  ctx.fillText('Aortic Valve: ' + (isEjection ? 'OPEN (Ejection)' : 'CLOSED (S2)'), 20, h - 34);

  // RIGHT: Wiggers Diagram Curves
  const graphL = splitX + 30;
  const graphR = w - 30;
  const graphW = graphR - graphL;
  const graphT = 80;
  const graphB = h - 50;
  const graphH = graphB - graphT;

  // Pressure Scale (0 to 120 mmHg)
  ctx.font = '10px monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('120 mmHg', splitX + 6, graphT + 6);
  ctx.fillText(' 80 mmHg', splitX + 6, graphT + graphH * 0.35 + 4);
  ctx.fillText('  0 mmHg', splitX + 6, graphB);

  // Draw LV Pressure Curve
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  const stepCount = 80;
  for (let i = 0; i <= stepCount; i++) {
    const frac = i / stepCount;
    const x = graphL + frac * graphW;
    let val = 0.08; // resting 10 mmHg
    if (frac > 0.15 && frac < 0.75) {
      // Systolic pressure bell curve reaching 120 mmHg
      const bellFrac = (frac - 0.15) / 0.60;
      val = 0.08 + Math.sin(bellFrac * Math.PI) * 0.88;
    }
    const y = graphB - val * graphH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Draw Aortic Pressure Curve (Dips to 80, rises to 120, dicrotic notch at S2)
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  for (let i = 0; i <= stepCount; i++) {
    const frac = i / stepCount;
    const x = graphL + frac * graphW;
    let val = 0.68; // resting 80 mmHg
    if (frac > 0.30 && frac < 0.70) {
      const bellFrac = (frac - 0.30) / 0.40;
      val = 0.68 + Math.sin(bellFrac * Math.PI) * 0.28;
    } else if (frac >= 0.70 && frac < 0.76) {
      val = 0.65; // Incisura / Dicrotic notch
    } else if (frac >= 0.76) {
      val = 0.68 - (frac - 0.76) * 0.15;
    }
    const y = graphB - val * graphH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Active Time Cursor in Wiggers graph
  const cursorX = graphL + p * graphW;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(cursorX, graphT);
  ctx.lineTo(cursorX, graphB);
  ctx.stroke();
  ctx.setLineDash([]);

  // Legend
  ctx.font = '10px monospace';
  ctx.fillStyle = '#ef4444';
  ctx.fillText('— Left Ventricular Pressure', graphL + 10, graphT - 10);
  ctx.fillStyle = '#fbbf24';
  ctx.fillText('— Aortic Pressure (Incisura S2)', graphL + 180, graphT - 10);

  // Top Header HUD
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(24, 18, w - 48, 44, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('Wiggers Diagram & Left Ventricular Pressure-Volume Hemodynamics', 38, 36);

  ctx.fillStyle = '#67e8f9';
  ctx.font = '11px monospace';
  ctx.fillText(`Phase: ${p < 0.30 ? 'Isovolumetric Contraction (S1 Closure)' : p < 0.70 ? 'Rapid Systolic Ejection (Aortic Valve Open)' : 'Isovolumetric Relaxation & Protodiastole (S2 Closure)'}`, 38, 50);
}
