function drawVisualization(ctx, width, height, params, time, utils) {
  // Load parameters with new pattern
  const p = utils.params.load(params, ctx, width, height, time, { parameters });
  
  // Extract parameters
  const centerX = width / 2;
  const centerY = height / 2;
  const latticeTypeNum = Math.round(p.latticeType);
  const symmetryLevel = Math.round(p.symmetryLevel);
  const facetCount = Math.round(p.facetCount);
  const materialTypeNum = Math.round(p.materialType);

  // Crystal scaling with precision
  const baseScale = Math.min(width, height) / 340;
  const scaledAmplitude = p.amplitude * baseScale;
  
  // Crystalline growth with precise timing
  const crystalPhase = time * p.frequency * 0.7;
  const geometricPulse = 1 + Math.sin(crystalPhase) * 0.03; // Very subtle, precise

  // Generate crystal lattice structure
  const crystalStructure = generateCrystalLattice(
    latticeTypeNum, centerX, centerY, scaledAmplitude * geometricPulse,
    p.crystallineOrder, p.facetPrecision, symmetryLevel, facetCount, crystalPhase
  );

  // Crystal color system
  const crystalColors = generateCrystalColors(p.crystalHue, p.purity, p.transparency, materialTypeNum);

  // Render light dispersion (background effect)
  if (p.dispersion > 0.1) {
    renderSpectralDispersion(ctx, crystalStructure, crystalColors, p.dispersion, time, scaledAmplitude);
  }

  // Render internal reflections
  if (p.internalReflection > 0.1) {
    renderInternalReflections(ctx, crystalStructure, crystalColors, p.internalReflection, p.brilliance);
  }

  // Render main crystal body with universal controls
  renderCrystalBody(ctx, crystalStructure, crystalColors, p.transparency, p.surfaceRoughness, p);

  // Render crystal facets
  renderCrystalFacets(ctx, crystalStructure, crystalColors, p.facetPrecision, p.brilliance);

  // Render light refraction
  if (p.lightRefraction > 0.1) {
    renderLightRefraction(ctx, crystalStructure, crystalColors, p.lightRefraction, centerX, centerY);
  }

  // Render spectral fire
  if (p.fire > 0.1) {
    renderSpectralFire(ctx, crystalStructure, crystalColors, p.fire, time, scaledAmplitude);
  }

  // Render crystalline flaws and inclusions
  if (p.crystallineFlaws > 0.01) {
    renderCrystallineFlaws(ctx, crystalStructure, crystalColors, p.crystallineFlaws, time);
  }

  function generateCrystalLattice(latticeType, centerX, centerY, radius, order, precision, symmetry, facets, phase) {
    const points = [];
    const basePoints = facets;
    
    for (let i = 0; i < basePoints; i++) {
      const t = i / basePoints;
      const angle = t * Math.PI * 2;
      
      let crystallineRadius = radius;
      
      // Generate lattice-specific geometry
      switch (latticeType) {
        case 0: // Cubic - regular polygonal structure
          const cubicSegments = 8;
          const cubicAngle = Math.floor(angle / (Math.PI * 2 / cubicSegments)) * (Math.PI * 2 / cubicSegments);
          const cubic1 = Math.sin(cubicAngle * 2 + phase) * (1 - order) * 0.1;
          crystallineRadius = radius * (0.9 + cubic1);
          break;
          
        case 1: // Hexagonal - six-fold symmetry
          const hexagonal1 = Math.sin(angle * 6 + phase) * (1 - order) * 0.15;
          const hexagonal2 = Math.sin(angle * symmetry + phase * 0.7) * precision * 0.08;
          crystallineRadius = radius * (0.85 + hexagonal1 + hexagonal2);
          break;
          
        case 2: // Diamond - brilliant cut inspired
          const diamond1 = Math.sin(angle * 8 + phase) * (1 - order) * 0.12;
          const diamond2 = Math.sin(angle * 16 + phase * 1.5) * precision * 0.06;
          const diamond3 = Math.sin(angle * symmetry + phase) * order * 0.05;
          crystallineRadius = radius * (0.88 + diamond1 + diamond2 + diamond3);
          break;
          
        case 3: // Prismatic - elongated crystal form
          const prismatic1 = Math.sin(angle * 3 + phase) * (1 - order) * 0.2;
          const prismatic2 = Math.sin(angle * symmetry + phase * 0.5) * precision * 0.1;
          crystallineRadius = radius * (0.8 + prismatic1 + prismatic2);
          break;
          
        case 4: // Fractal - self-similar crystal growth
          const fractal1 = Math.sin(angle * 7 + phase) * (1 - order) * 0.25;
          const fractal2 = Math.sin(angle * 13 + phase * 2) * precision * 0.12;
          const fractal3 = Math.sin(angle * 19 + phase * 1.3) * order * 0.08;
          crystallineRadius = radius * (0.75 + fractal1 + fractal2 + fractal3);
          break;
      }
      
      // Add crystalline precision
      const orderEffect = 1 + Math.sin(angle * symmetry + phase) * (1 - order) * 0.03;
      const precisionEffect = 1 + Math.sin(angle * facets + phase * precision) * (1 - precision) * 0.02;
      
      const finalRadius = crystallineRadius * orderEffect * precisionEffect;
      
      points.push({
        x: centerX + Math.cos(angle) * finalRadius,
        y: centerY + Math.sin(angle) * finalRadius,
        angle: angle,
        radius: finalRadius,
        facetIntensity: 0.3 + Math.sin(angle * symmetry + phase) * 0.7,
        orderLevel: order + Math.sin(angle * 2) * 0.1,
        lightDirection: Math.sin(angle * 3 + phase * 0.3)
      });
    }
    
    return points;
  }

  function generateCrystalColors(hue, purity, transparency, materialType) {
    const baseSaturation = purity * 60;
    const baseLightness = 70 + purity * 20;
    const alpha = transparency;
    
    // Material type affects color characteristics
    const materialAdjustments = [
      { hueShift: 0, satMult: 0.5, lightMult: 1.1 },   // Quartz - clear, neutral
      { hueShift: -10, satMult: 0.3, lightMult: 1.3 }, // Diamond - brilliant, cool
      { hueShift: 15, satMult: 1.2, lightMult: 0.9 },  // Sapphire - rich, deep
      { hueShift: 25, satMult: 1.5, lightMult: 0.8 },  // Emerald - vivid, natural
      { hueShift: 45, satMult: 1.8, lightMult: 1.0 }   // Opal - iridescent, varied
    ];
    
    const adjustment = materialAdjustments[materialType] || materialAdjustments[0];
    const adjustedHue = hue + adjustment.hueShift;
    const adjustedSat = baseSaturation * adjustment.satMult;
    const adjustedLight = baseLightness * adjustment.lightMult;
    
    return {
      primary: `hsla(${adjustedHue}, ${adjustedSat}%, ${adjustedLight}%, ${alpha})`,
      light: `hsla(${adjustedHue}, ${adjustedSat * 0.6}%, ${Math.min(adjustedLight + 25, 95)}%, ${alpha * 0.8})`,
      dark: `hsla(${adjustedHue}, ${adjustedSat * 1.3}%, ${adjustedLight - 20}%, ${alpha})`,
      brilliant: `hsla(${adjustedHue + 10}, ${adjustedSat * 0.4}%, 98%, ${alpha * 0.9})`,
      fire: `hsla(${adjustedHue + 60}, ${adjustedSat * 1.8}%, ${adjustedLight + 15}%, 0.4)`,
      dispersion: `hsla(${adjustedHue - 30}, ${adjustedSat * 2}%, ${adjustedLight + 10}%, 0.3)`
    };
  }

  function renderSpectralDispersion(ctx, structure, colors, dispersion, time, scale) {
    ctx.save();
    ctx.globalAlpha = dispersion * 0.3;
    
    const bounds = getBounds(structure);
    const dispersionCount = Math.floor(dispersion * 8);
    
    for (let i = 0; i < dispersionCount; i++) {
      const dispersionPhase = time * 1.5 + i * 0.8;
      const dispersionX = bounds.centerX + Math.sin(dispersionPhase) * scale * 0.4;
      const dispersionY = bounds.centerY + Math.cos(dispersionPhase * 1.2) * scale * 0.3;
      const dispersionSize = scale * (0.08 + Math.sin(dispersionPhase * 2) * 0.05);
      
      const dispersionGradient = ctx.createRadialGradient(
        dispersionX, dispersionY, 0,
        dispersionX, dispersionY, dispersionSize
      );
      dispersionGradient.addColorStop(0, colors.dispersion);
      dispersionGradient.addColorStop(0.6, colors.fire);
      dispersionGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = dispersionGradient;
      ctx.beginPath();
      ctx.arc(dispersionX, dispersionY, dispersionSize, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }

  function renderInternalReflections(ctx, structure, colors, reflection, brilliance) {
    ctx.save();
    ctx.globalAlpha = reflection * brilliance * 0.6;
    
    for (let i = 0; i < structure.length; i++) {
      const point = structure[i];
      const next = structure[(i + 1) % structure.length];
      
      if (point.facetIntensity > 0.5) {
        // Internal reflection line
        const midX = (point.x + next.x) / 2;
        const midY = (point.y + next.y) / 2;
        const reflectionLength = brilliance * 15;
        
        ctx.strokeStyle = colors.brilliant;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(midX, midY);
        ctx.lineTo(
          midX + Math.cos(point.angle + Math.PI/2) * reflectionLength,
          midY + Math.sin(point.angle + Math.PI/2) * reflectionLength
        );
        ctx.stroke();
      }
    }
    
    ctx.restore();
  }

  function renderCrystalBody(ctx, structure, colors, transparency, roughness, params) {
    ctx.save();
    
    // Main crystal body with sophisticated gradient
    const bounds = getBounds(structure);
    
    // Use crystal-specific gradient logic, but honor universal fill opacity
    const crystalGradient = ctx.createRadialGradient(
      bounds.centerX - bounds.width * 0.3, bounds.centerY - bounds.height * 0.3, 0,
      bounds.centerX, bounds.centerY, Math.max(bounds.width, bounds.height) * 0.6
    );
    
    crystalGradient.addColorStop(0, colors.brilliant);
    crystalGradient.addColorStop(0.3, colors.light);
    crystalGradient.addColorStop(0.7, colors.primary);
    crystalGradient.addColorStop(1, colors.dark);
    ctx.fillStyle = crystalGradient;
    
    if (params.fillOpacity > 0) {
      ctx.globalAlpha = params.fillOpacity;
      drawCrystalPath(ctx, structure);
      ctx.fill();
    }
    
    // Crystal edge with precision
    if (params.strokeOpacity > 0) {
      ctx.strokeStyle = params.strokeColor || colors.dark;
      ctx.lineWidth = params.strokeWidth || (1 + roughness * 2);
      ctx.globalAlpha = params.strokeOpacity;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      drawCrystalPath(ctx, structure);
      ctx.stroke();
    }
    
    ctx.restore();
  }

  function renderCrystalFacets(ctx, structure, colors, precision, brilliance) {
    ctx.save();
    
    for (let i = 0; i < structure.length; i++) {
      const current = structure[i];
      const next = structure[(i + 1) % structure.length];
      
      if (current.facetIntensity > 0.4) {
        ctx.globalAlpha = current.facetIntensity * brilliance * 0.4;
        
        // Facet highlight
        const facetGradient = ctx.createLinearGradient(
          current.x, current.y, next.x, next.y
        );
        facetGradient.addColorStop(0, colors.brilliant);
        facetGradient.addColorStop(0.5, colors.light);
        facetGradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = facetGradient;
        ctx.lineWidth = precision * 2;
        ctx.beginPath();
        ctx.moveTo(current.x, current.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();
      }
    }
    
    ctx.restore();
  }

  function renderLightRefraction(ctx, structure, colors, refraction, centerX, centerY) {
    ctx.save();
    ctx.globalAlpha = refraction * 0.5;
    
    // Light refraction highlights
    const refractionGradient = ctx.createLinearGradient(
      centerX - 40, centerY - 40,
      centerX + 25, centerY + 25
    );
    refractionGradient.addColorStop(0, colors.brilliant);
    refractionGradient.addColorStop(0.8, 'transparent');
    
    ctx.fillStyle = refractionGradient;
    
    // Apply refraction to top portion
    const topPoints = structure.filter(p => p.y < centerY + 15);
    if (topPoints.length > 2) {
      ctx.beginPath();
      ctx.moveTo(topPoints[0].x, topPoints[0].y);
      topPoints.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fill();
    }
    
    ctx.restore();
  }

  function renderSpectralFire(ctx, structure, colors, fire, time, scale) {
    ctx.save();
    
    const fireCount = Math.floor(fire * 6);
    
    for (let f = 0; f < fireCount; f++) {
      const firePhase = time * 2 + f * 1.2;
      const fireLife = (Math.sin(firePhase) + 1) / 2;
      
      if (fireLife > 0.3) {
        const angle = (f / fireCount) * Math.PI * 2 + time * 0.3;
        const distance = scale * (0.7 + Math.sin(firePhase * 1.5) * 0.2);
        const fireX = structure[0].x + Math.cos(angle) * distance;
        const fireY = structure[0].y + Math.sin(angle) * distance;
        const fireSize = scale * 0.04 * fireLife;
        
        ctx.globalAlpha = fire * fireLife * 0.8;
        
        // Fire gradient
        const fireGradient = ctx.createRadialGradient(
          fireX - fireSize * 0.3, fireY - fireSize * 0.3, 0,
          fireX, fireY, fireSize * 2
        );
        fireGradient.addColorStop(0, colors.brilliant);
        fireGradient.addColorStop(0.5, colors.fire);
        fireGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = fireGradient;
        ctx.beginPath();
        ctx.arc(fireX, fireY, fireSize * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Fire core
        ctx.fillStyle = colors.light;
        ctx.globalAlpha = fire * fireLife;
        ctx.beginPath();
        ctx.arc(fireX, fireY, fireSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    ctx.restore();
  }

  function renderCrystallineFlaws(ctx, structure, colors, flaws, time) {
    ctx.save();
    ctx.globalAlpha = flaws * 0.6;
    
    const bounds = getBounds(structure);
    const flawCount = Math.floor(flaws * 20);
    
    for (let i = 0; i < flawCount; i++) {
      const flawPhase = time * 0.5 + i * 0.7;
      const flawX = bounds.centerX + (Math.random() - 0.5) * bounds.width * 0.6;
      const flawY = bounds.centerY + (Math.random() - 0.5) * bounds.height * 0.6;
      const flawSize = Math.random() * 2 + 0.5;
      
      // Natural inclusion
      ctx.fillStyle = colors.dark;
      ctx.globalAlpha = flaws * 0.3;
      ctx.beginPath();
      ctx.arc(flawX, flawY, flawSize, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }

  function drawCrystalPath(ctx, points) {
    if (points.length < 3) return;
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    // Ultra-precise crystal edges
    for (let i = 1; i < points.length; i++) {
      const current = points[i];
      const previous = points[i - 1];
      const next = points[(i + 1) % points.length];
      
      // Crystalline precision with minimal smoothing
      const precision = current.orderLevel || 0.9;
      const cp1x = previous.x + (current.x - (points[i - 2] || previous).x) * precision * 0.1;
      const cp1y = previous.y + (current.y - (points[i - 2] || previous).y) * precision * 0.1;
      const cp2x = current.x - (next.x - previous.x) * precision * 0.1;
      const cp2y = current.y - (next.y - previous.y) * precision * 0.1;
      
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, current.x, current.y);
    }
    
    // Close the crystal shape with precision
    const first = points[0];
    const last = points[points.length - 1];
    const secondLast = points[points.length - 2];
    const second = points[1];
    
    const precision = 0.9;
    const cp1x = last.x + (first.x - secondLast.x) * precision * 0.1;
    const cp1y = last.y + (first.y - secondLast.y) * precision * 0.1;
    const cp2x = first.x - (second.x - last.x) * precision * 0.1;
    const cp2y = first.y - (second.y - last.y) * precision * 0.1;
    
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, first.x, first.y);
    ctx.closePath();
  }

  function getBounds(points) {
    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    
    return {
      minX, maxX, minY, maxY,
      width: maxX - minX,
      height: maxY - minY,
      centerX: (minX + maxX) / 2,
      centerY: (minY + maxY) / 2
    };
  }
}

// Helper functions
const slider = (def, min, max, step, label, unit, opts = {}) => ({ 
  type: "slider", default: def, min, max, step, label, unit, ...opts 
});
const select = (def, options, label, opts = {}) => ({ 
  type: "select", default: def, options, label, ...opts 
});

export const parameters = {
  latticeType: select(2, [
    { value: 0, label: '⬜ Cubic' },
    { value: 1, label: '⬡ Hexagonal' },
    { value: 2, label: '💎 Diamond' },
    { value: 3, label: '🔷 Prismatic' },
    { value: 4, label: '❄️ Fractal' }
  ], 'Lattice Type', { category: 'Structure' }),
  materialType: select(1, [
    { value: 0, label: '🔮 Quartz' },
    { value: 1, label: '💍 Diamond' },
    { value: 2, label: '🔵 Sapphire' },
    { value: 3, label: '🟢 Emerald' },
    { value: 4, label: '🌈 Opal' }
  ], 'Material Type', { category: 'Material' }),
  frequency: slider(0.8, 0.3, 1.5, 0.05, 'Growth Speed', '', { category: 'Animation' }),
  amplitude: slider(120, 70, 180, 5, 'Crystal Size', '', { category: 'Geometry' }),
  crystallineOrder: slider(0.9, 0.7, 1, 0.02, 'Crystalline Order', '', { category: 'Structure' }),
  facetPrecision: slider(0.95, 0.8, 1, 0.01, 'Facet Precision', '', { category: 'Structure' }),
  symmetryLevel: slider(6, 2, 8, 1, 'Symmetry Level', '', { category: 'Structure' }),
  facetCount: slider(12, 6, 24, 2, 'Facet Count', '', { category: 'Structure' }),
  lightRefraction: slider(0.7, 0.3, 1, 0.05, 'Light Refraction', '', { category: 'Optics' }),
  internalReflection: slider(0.5, 0.2, 0.8, 0.05, 'Internal Reflection', '', { category: 'Optics' }),
  dispersion: slider(0.3, 0, 0.6, 0.05, 'Spectral Dispersion', '', { category: 'Optics' }),
  brilliance: slider(0.8, 0.5, 1, 0.05, 'Brilliance', '', { category: 'Optics' }),
  fire: slider(0.4, 0.2, 0.8, 0.05, 'Fire Effect', '', { category: 'Optics' }),
  transparency: slider(0.7, 0.4, 0.9, 0.05, 'Transparency', '', { category: 'Material' }),
  purity: slider(0.9, 0.6, 1, 0.02, 'Crystal Purity', '', { category: 'Material' }),
  crystalHue: slider(210, 0, 360, 10, 'Crystal Hue', '', { category: 'Color' }),
  surfaceRoughness: slider(0.05, 0, 0.3, 0.02, 'Surface Roughness', '', { category: 'Material' }),
  crystallineFlaws: slider(0.03, 0, 0.2, 0.01, 'Crystal Flaws', '', { category: 'Material' })
};

export const metadata = {
  name: "💎 Crystal Lattice",
  description: "Crystalline structures with light refraction",
  category: "geometric",
  tags: ["crystal", "lattice", "geometric", "3d", "refraction"],
  author: "ReFlow",
  version: "1.0.0"
};