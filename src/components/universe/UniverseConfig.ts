import * as THREE from 'three';
import type {
  UniverseState,
  BackgroundType,
  UniverseConfig,
  SpecialNodeTarget,
  PerformanceTier,
} from './UniverseTypes';

export const MAX_MICRO_DUST = 48000;
export const MAX_FILAMENTS = 260;
export const MAX_GEOMETRY = 8;

export const palette = {
  base: '#070812',
  deep: '#04050a',
  data: '#8FA8FF', // Technology / Cyan-Blue
  techCyan: '#38bdf8', // Electric Cyan
  cosmic: '#B6A1D9', // Cosmic Lavender
  warm: '#D8C7B5', // Human Warm Sand
  neutral: '#F2F0EA',
  dimNeutral: '#4A4D68',
};

export const stateByRoute: Record<BackgroundType, UniverseState> = {
  home: 'home',
  about: 'human',
  journey: 'journey',
  skills: 'skills',
  projects: 'projects',
  analytics: 'analytics',
  ai: 'ai',
  education: 'education',
  philosophy: 'philosophy',
  contact: 'contact',
};

export const universeStates: Record<UniverseState, UniverseConfig> = {
  home: {
    state: 'home',
    activeMicroDust: 42000,
    activeFilaments: 24,
    activeGeometry: 5,
    speed: 0.70,
    antiGravityRate: 1.0,
    turbulence: 0.65,
    density: 0.75,
    warmth: 0.15,
    gravity: 0.60,
    geometryOpacity: 0.18,
    fieldOpacity: 0.52,
    cosmicStrength: 0.50,
    neuralStrength: 0.20,
    organicStrength: 0.55,
  },
  human: {
    state: 'human',
    activeMicroDust: 36000,
    activeFilaments: 160,
    activeGeometry: 3,
    speed: 0.50,
    antiGravityRate: 0.80,
    turbulence: 0.85,
    density: 0.58,
    warmth: 0.52,
    gravity: 0.50,
    geometryOpacity: 0.10,
    fieldOpacity: 0.65,
    cosmicStrength: 0.45,
    neuralStrength: 0.15,
    organicStrength: 0.85,
  },
  journey: {
    state: 'journey',
    activeMicroDust: 38000,
    activeFilaments: 150,
    activeGeometry: 4,
    speed: 0.55,
    antiGravityRate: 0.85,
    turbulence: 0.60,
    density: 0.65,
    warmth: 0.35,
    gravity: 0.55,
    geometryOpacity: 0.15,
    fieldOpacity: 0.50,
    cosmicStrength: 0.60,
    neuralStrength: 0.20,
    organicStrength: 0.50,
  },
  skills: {
    state: 'skills',
    activeMicroDust: 46000,
    activeFilaments: 220,
    activeGeometry: 7,
    speed: 0.60,
    antiGravityRate: 0.90,
    turbulence: 0.50,
    density: 0.88,
    warmth: 0.16,
    gravity: 0.65,
    geometryOpacity: 0.28,
    fieldOpacity: 0.48,
    cosmicStrength: 0.35,
    neuralStrength: 0.60,
    organicStrength: 0.40,
  },
  projects: {
    state: 'projects',
    activeMicroDust: 44000,
    activeFilaments: 200,
    activeGeometry: 7,
    speed: 0.62,
    antiGravityRate: 0.95,
    turbulence: 0.45,
    density: 0.82,
    warmth: 0.18,
    gravity: 0.60,
    geometryOpacity: 0.26,
    fieldOpacity: 0.44,
    cosmicStrength: 0.30,
    neuralStrength: 0.55,
    organicStrength: 0.35,
  },
  analytics: {
    state: 'analytics',
    activeMicroDust: 48000,
    activeFilaments: 240,
    activeGeometry: 6,
    speed: 0.65,
    antiGravityRate: 1.00,
    turbulence: 0.55,
    density: 0.86,
    warmth: 0.12,
    gravity: 0.68,
    geometryOpacity: 0.28,
    fieldOpacity: 0.46,
    cosmicStrength: 0.40,
    neuralStrength: 0.50,
    organicStrength: 0.42,
  },
  ai: {
    state: 'ai',
    activeMicroDust: 48000,
    activeFilaments: 260,
    activeGeometry: 8,
    speed: 0.75,
    antiGravityRate: 1.15,
    turbulence: 0.70,
    density: 0.98,
    warmth: 0.08,
    gravity: 0.72,
    geometryOpacity: 0.26,
    fieldOpacity: 0.54,
    cosmicStrength: 0.70,
    neuralStrength: 0.95,
    organicStrength: 0.48,
  },
  education: {
    state: 'education',
    activeMicroDust: 32000,
    activeFilaments: 110,
    activeGeometry: 3,
    speed: 0.45,
    antiGravityRate: 0.70,
    turbulence: 0.50,
    density: 0.50,
    warmth: 0.28,
    gravity: 0.48,
    geometryOpacity: 0.12,
    fieldOpacity: 0.44,
    cosmicStrength: 0.50,
    neuralStrength: 0.30,
    organicStrength: 0.45,
  },
  philosophy: {
    state: 'philosophy',
    activeMicroDust: 14000,
    activeFilaments: 12,
    activeGeometry: 1,
    speed: 0.15,
    antiGravityRate: 0.20,
    turbulence: 0.15,
    density: 0.18,
    warmth: 0.30,
    gravity: 0.20,
    geometryOpacity: 0.04,
    fieldOpacity: 0.30,
    cosmicStrength: 0.85,
    neuralStrength: 0.05,
    organicStrength: 0.18,
  },
  contact: {
    state: 'contact',
    activeMicroDust: 28000,
    activeFilaments: 80,
    activeGeometry: 2,
    speed: 0.38,
    antiGravityRate: 0.60,
    turbulence: 0.70,
    density: 0.45,
    warmth: 0.62,
    gravity: 0.45,
    geometryOpacity: 0.08,
    fieldOpacity: 0.58,
    cosmicStrength: 0.40,
    neuralStrength: 0.20,
    organicStrength: 0.65,
  },
};

export function seededRandom(seed: number): number {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export function scaleForTier(tier: PerformanceTier): number {
  if (tier === 'mobile') return 0.35;
  if (tier === 'tablet') return 0.65;
  return 1;
}

export function targetFor(index: number, state: UniverseState): THREE.Vector3 {
  const t = index / Math.max(1, 260 - 1);
  const angle = t * Math.PI * 2;
  const jitterX = (seededRandom(index + 11) - 0.5) * 0.16;
  const jitterY = (seededRandom(index + 41) - 0.5) * 0.16;
  const jitterZ = (seededRandom(index + 71) - 0.5) * 0.20;

  if (state === 'journey') {
    if (index === 0) return new THREE.Vector3(-3.2, 2.2, 0.4);
    if (index === 1) return new THREE.Vector3(0.5, 0.2, 0.3);
    if (index === 2) return new THREE.Vector3(3.6, -1.9, 0.1);

    const pathT = t * 3.4;
    const curveX = -3.8 + pathT * 2.2 + Math.sin(pathT * 1.8) * 0.4 + jitterX;
    const curveY = 2.4 - pathT * 1.3 + Math.cos(pathT * 1.4) * 0.3 + jitterY;
    const curveZ = (seededRandom(index + 18) - 0.5) * 0.6;
    return new THREE.Vector3(curveX, curveY, curveZ);
  }

  if (state === 'skills') {
    if (index === 0) return new THREE.Vector3(0, 0, 0.45);

    const clusterCenters = [
      new THREE.Vector3(-3.8, 1.2, 0.15),
      new THREE.Vector3(0.0, -1.8, 0.25),
      new THREE.Vector3(3.8, 1.3, 0.05),
    ];

    const clusterIdx = index % 3;
    const center = clusterCenters[clusterIdx];
    const clusterRadius = 0.25 + seededRandom(index + 88) * 0.35;
    const clusterAngle = angle * 3.5 + seededRandom(index + 12);

    return new THREE.Vector3(
      center.x + Math.cos(clusterAngle) * clusterRadius * 4.2 + jitterX,
      center.y + Math.sin(clusterAngle) * clusterRadius * 3.4 + jitterY,
      center.z + Math.sin(clusterAngle * 1.5) * 0.3 + jitterZ,
    );
  }

  if (state === 'projects') {
    const stage = index % 6;
    const row = Math.floor(index / 6) % 7;
    const x = (stage / 5 - 0.5) * 7.8;
    const y = (row / 6 - 0.5) * 3.6 + Math.sin(stage * 1.2) * 0.15;
    const z = (seededRandom(index + 5) - 0.5) * 0.7;
    return new THREE.Vector3(x + jitterX * 0.8, y + jitterY * 0.5, z);
  }

  if (state === 'analytics') {
    if (index === 0) return new THREE.Vector3(4.4, -2.4, 0.35);

    const isTrend = index % 5 === 0;
    if (isTrend) {
      const trendX = (t - 0.5) * 7.5;
      const trendY = (t - 0.5) * 3.8 + Math.sin(t * Math.PI * 2) * 0.15;
      return new THREE.Vector3(trendX + jitterX * 0.4, trendY + jitterY * 0.4, 0.1);
    }

    const clusterPoints = [
      new THREE.Vector3(-4.2, 1.8, 0),
      new THREE.Vector3(-1.2, -0.6, 0.2),
      new THREE.Vector3(2.0, 1.4, -0.1),
      new THREE.Vector3(3.8, -1.2, 0.1),
    ];
    const cluster = clusterPoints[index % 4];
    const r = 0.2 + seededRandom(index + 32) * 0.4;
    return new THREE.Vector3(
      cluster.x + Math.cos(angle * 2.8) * r * 3.6 + jitterX,
      cluster.y + Math.sin(angle * 2.2) * r * 2.8 + jitterY,
      cluster.z + (seededRandom(index + 44) - 0.5) * 0.4,
    );
  }

  if (state === 'ai') {
    const layer = index % 6;
    const layerPos = Math.floor(index / 6) % 15;
    const spiral = layerPos * 0.22 + layer * 0.15;
    const galaxyRadius = 1.0 + Math.sin(t * Math.PI) * 2.8;

    return new THREE.Vector3(
      (layer / 5 - 0.5) * 7.2 + Math.cos(spiral) * galaxyRadius * 0.5 + jitterX,
      (layerPos / 14 - 0.5) * 4.4 + Math.sin(spiral) * galaxyRadius * 0.35 + jitterY,
      Math.sin(spiral + layer * 0.8) * 0.9 + jitterZ,
    );
  }

  if (state === 'education') {
    if (index < 4) {
      const nodes = [
        new THREE.Vector3(-4.2, 1.6, 0.2),
        new THREE.Vector3(-1.4, 0.6, 0.1),
        new THREE.Vector3(1.4, -0.5, 0.25),
        new THREE.Vector3(4.2, -1.6, 0.35),
      ];
      return nodes[index];
    }

    const pathProgress = t * 8.4 - 4.2;
    return new THREE.Vector3(
      pathProgress + jitterX,
      -pathProgress * 0.38 + Math.sin(t * Math.PI * 3.2) * 0.25 + jitterY,
      (seededRandom(index + 9) - 0.5) * 0.4,
    );
  }

  if (state === 'philosophy') {
    if (index === 0) return new THREE.Vector3(0.0, 0.1, 0.3);

    const stillRadius = 1.2 + (index % 6) * 0.35;
    return new THREE.Vector3(
      Math.cos(angle) * stillRadius * 2.6 + jitterX * 0.5,
      Math.sin(angle * 0.8) * stillRadius * 1.5 + jitterY * 0.5,
      (seededRandom(index + 95) - 0.5) * 0.3 - 0.5,
    );
  }

  if (state === 'contact') {
    if (index < 4) {
      const contactPoints = [
        new THREE.Vector3(-2.8, 1.4, 0.2),
        new THREE.Vector3(2.4, 1.8, 0.15),
        new THREE.Vector3(3.0, -1.2, 0.25),
        new THREE.Vector3(-2.2, -1.6, 0.1),
      ];
      return contactPoints[index];
    }
  }

  if (state === 'human') {
    const organicRadius = 0.3 + seededRandom(index + 7) * 0.7;
    return new THREE.Vector3(
      Math.cos(angle * 2.2 + (index % 5)) * organicRadius * 6.5 + jitterX,
      Math.sin(angle * 1.8 + (index % 7) * 0.4) * organicRadius * 4.2 + jitterY,
      (seededRandom(index + 23) - 0.5) * 0.6,
    );
  }

  const homeRadius = 0.35 + seededRandom(index + 13) * 0.75;
  const isCluster = index % 5 === 0;
  const clusterOffset = isCluster ? Math.sin(index) * 0.4 : 0;

  return new THREE.Vector3(
    Math.cos(angle * 2.4 + (index % 6)) * (homeRadius + clusterOffset) * 6.8 + jitterX,
    Math.sin(angle * 1.9 + (index % 4) * 0.3) * (homeRadius + clusterOffset) * 4.4 + jitterY,
    (seededRandom(index + 31) - 0.5) * 0.9,
  );
}

export function specialPointTargets(state: UniverseState): SpecialNodeTarget[] {
  if (state === 'journey') {
    return [
      { position: targetFor(0, 'journey'), scale: 0.10, active: 0.65, label: 'Lead Teacher' },
      { position: targetFor(1, 'journey'), scale: 0.11, active: 0.75, label: 'Senior Lead Teacher' },
      {
        position: targetFor(2, 'journey'),
        scale: 0.18,
        active: 1.0,
        label: 'Senior Relationship Manager (Current)',
        isCurrent: true,
      },
    ];
  }

  if (state === 'skills') {
    return [
      { position: new THREE.Vector3(0, 0, 0.45), scale: 0.16, active: 1.0, label: 'Problem Solving' },
      { position: new THREE.Vector3(-3.8, 1.2, 0.15), scale: 0.10, active: 0.7, label: 'People' },
      { position: new THREE.Vector3(0.0, -1.8, 0.25), scale: 0.10, active: 0.7, label: 'Data' },
      { position: new THREE.Vector3(3.8, 1.3, 0.05), scale: 0.10, active: 0.7, label: 'Intelligence' },
    ];
  }

  if (state === 'projects') {
    return Array.from({ length: 6 }, (_, index) => ({
      position: new THREE.Vector3((index / 5 - 0.5) * 7.8, -0.2 + Math.sin(index * 1.2) * 0.2, 0.35),
      scale: index === 2 || index === 5 ? 0.13 : 0.08,
      active: index === 2 || index === 5 ? 1.0 : 0.6,
    }));
  }

  if (state === 'analytics') {
    return [
      { position: targetFor(0, 'analytics'), scale: 0.15, active: 1.0, label: 'Insight Outlier' },
      { position: new THREE.Vector3(-1.2, -0.6, 0.2), scale: 0.09, active: 0.65 },
    ];
  }

  if (state === 'ai') {
    return [
      { position: new THREE.Vector3(0.2, 0.1, 0.4), scale: 0.15, active: 1.0, label: 'Neural Nexus' },
    ];
  }

  if (state === 'education') {
    return [
      { position: targetFor(0, 'education'), scale: 0.09, active: 0.6, label: 'Mathematics' },
      { position: targetFor(1, 'education'), scale: 0.09, active: 0.65, label: 'Computer Science' },
      { position: targetFor(2, 'education'), scale: 0.10, active: 0.75, label: 'Business Analytics' },
      { position: targetFor(3, 'education'), scale: 0.14, active: 1.0, label: 'AI + Data' },
    ];
  }

  if (state === 'philosophy') {
    return [
      { position: targetFor(0, 'philosophy'), scale: 0.12, active: 1.0, label: 'Point of Clarity' },
    ];
  }

  if (state === 'contact') {
    return Array.from({ length: 4 }, (_, index) => ({
      position: targetFor(index, 'contact'),
      scale: 0.10,
      active: index === 0 ? 1.0 : 0.7,
    }));
  }

  if (state === 'human') {
    return [
      { position: new THREE.Vector3(0.2, -0.15, 0.35), scale: 0.13, active: 0.9, label: 'Human Connection' },
    ];
  }

  return [
    { position: new THREE.Vector3(0.35, -0.2, 0.3), scale: 0.12, active: 0.75, label: 'Data Universe' },
  ];
}

/**
 * Procedural Stardust Field Generator
 */
export function generateProceduralStardust(count: number, state: UniverseState) {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);
  const colorTypes = new Float32Array(count);

  const clusterCenters = [
    new THREE.Vector3(-4.5, 2.0, 0.2),
    new THREE.Vector3(3.8, 2.4, -0.5),
    new THREE.Vector3(-1.5, -2.2, 0.8),
    new THREE.Vector3(4.2, -1.8, 0.1),
    new THREE.Vector3(-3.8, -0.5, -0.6),
    new THREE.Vector3(0.5, 0.8, 0.5),
  ];

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const categoryRoll = seededRandom(i * 5 + 1);

    let x = 0;
    let y = 0;
    let z = 0;
    let size = 0.5;
    let colorType = 0;

    if (categoryRoll < 0.38) {
      const clusterIdx = Math.floor(seededRandom(i * 3 + 7) * clusterCenters.length);
      const center = clusterCenters[clusterIdx];
      const radius = Math.pow(seededRandom(i * 4 + 13), 2.2) * 2.8;
      const angle = seededRandom(i * 2 + 19) * Math.PI * 2;
      const elevation = (seededRandom(i * 6 + 23) - 0.5) * Math.PI;

      x = center.x + Math.cos(angle) * Math.cos(elevation) * radius;
      y = center.y + Math.sin(angle) * Math.cos(elevation) * radius * 0.85;
      z = center.z + Math.sin(elevation) * radius * 0.6;
      size = 0.45 + seededRandom(i + 37) * 0.85;
      colorType = seededRandom(i + 41) > 0.6 ? 1.0 : seededRandom(i + 43) > 0.85 ? 2.0 : 0.0;
    } else if (categoryRoll < 0.65) {
      const streamT = seededRandom(i * 7 + 29) * 16.0 - 8.0;
      const wave = Math.sin(streamT * 0.45) * 1.8;
      const spread = (seededRandom(i * 2 + 33) - 0.5) * 1.2;

      x = streamT + spread * 0.5;
      y = wave + (seededRandom(i * 3 + 47) - 0.5) * 2.4;
      z = Math.cos(streamT * 0.4) * 1.2 + (seededRandom(i * 4 + 51) - 0.5) * 1.5;
      size = 0.4 + seededRandom(i + 53) * 0.7;
      colorType = seededRandom(i + 67) > 0.5 ? 2.0 : 1.0;
    } else if (categoryRoll < 0.94) {
      const rawX = (seededRandom(i * 3 + 1) - 0.5) * 18.0;
      const rawY = (seededRandom(i * 3 + 2) - 0.5) * 12.0;
      const rawZ = (seededRandom(i * 3 + 3) - 0.5) * 6.0;

      const distFromVoid1 = Math.hypot(rawX - 1.5, rawY - 2.5);
      const distFromVoid2 = Math.hypot(rawX + 3.0, rawY + 1.5);
      if (distFromVoid1 < 1.8 || distFromVoid2 < 2.0) {
        x = rawX * 1.35;
        y = rawY * 1.35;
      } else {
        x = rawX;
        y = rawY;
      }
      z = rawZ;
      size = 0.35 + seededRandom(i + 71) * 0.65;
      colorType = seededRandom(i + 79) > 0.92 ? 1.0 : 0.0;
    } else {
      const target = targetFor(i % 120, state);
      x = target.x + (seededRandom(i * 2 + 83) - 0.5) * 0.4;
      y = target.y + (seededRandom(i * 2 + 89) - 0.5) * 0.4;
      z = target.z + (seededRandom(i * 2 + 97) - 0.5) * 0.3;
      size = 1.3 + seededRandom(i + 103) * 1.6;
      colorType = seededRandom(i + 107) > 0.7 ? 3.0 : 2.0;
    }

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;
    sizes[i] = size;
    phases[i] = seededRandom(i + 113) * Math.PI * 2;
    speeds[i] = 0.55 + seededRandom(i + 127) * 0.75;
    colorTypes[i] = colorType;
  }

  return { positions, sizes, phases, speeds, colorTypes };
}
