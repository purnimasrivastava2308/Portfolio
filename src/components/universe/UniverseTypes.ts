import type * as THREE from 'three';

export type UniverseState =
  | 'home'
  | 'human'
  | 'journey'
  | 'skills'
  | 'projects'
  | 'analytics'
  | 'ai'
  | 'education'
  | 'philosophy'
  | 'contact';

export type BackgroundType =
  | 'home'
  | 'about'
  | 'journey'
  | 'skills'
  | 'projects'
  | 'analytics'
  | 'ai'
  | 'education'
  | 'philosophy'
  | 'contact';

export type PerformanceTier = 'mobile' | 'tablet' | 'desktop';

export interface UniverseConfig {
  state: UniverseState;
  activeMicroDust: number;
  activeFilaments: number;
  activeGeometry: number;
  speed: number;
  antiGravityRate: number;
  turbulence: number;
  density: number;
  warmth: number;
  gravity: number;
  geometryOpacity: number;
  fieldOpacity: number;
  cosmicStrength: number;
  neuralStrength: number;
  organicStrength: number;
}

export interface MicroDustData {
  positions: Float32Array;
  sizes: Float32Array;
  phases: Float32Array;
  speeds: Float32Array;
  colorTypes: Float32Array;
}

export interface SpecialNodeTarget {
  position: THREE.Vector3;
  scale: number;
  active: number;
  label?: string;
  isCurrent?: boolean;
}
