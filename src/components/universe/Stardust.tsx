import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  AntiGravityVertexShader,
  AntiGravityFragmentShader,
  createAntiGravityUniforms,
} from './AntiGravityShader';
import {
  palette,
  scaleForTier,
  generateProceduralStardust,
} from './UniverseConfig';
import type { UniverseConfig, PerformanceTier } from './UniverseTypes';

export interface StardustProps {
  config: UniverseConfig;
  intensity: number;
  viewportTier: PerformanceTier;
  mouse: { x: number; y: number };
  prefersReducedMotion: boolean;
}

export default function Stardust({
  config,
  intensity,
  viewportTier,
  mouse,
  prefersReducedMotion,
}: StardustProps) {
  const particleCount = Math.floor(45000 * scaleForTier(viewportTier));

  // Generate the procedural stardust buffers
  const stardustData = useMemo(() => {
    return generateProceduralStardust(particleCount, config.state);
  }, [particleCount, config.state]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('a_home', new THREE.BufferAttribute(stardustData.positions, 3));
    geo.setAttribute('a_size', new THREE.BufferAttribute(stardustData.sizes, 1));
    geo.setAttribute('a_phase', new THREE.BufferAttribute(stardustData.phases, 1));
    geo.setAttribute('a_speed', new THREE.BufferAttribute(stardustData.speeds, 1));
    geo.setAttribute('a_colorType', new THREE.BufferAttribute(stardustData.colorTypes, 1));
    return geo;
  }, [stardustData]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: AntiGravityVertexShader,
      fragmentShader: AntiGravityFragmentShader,
      uniforms: createAntiGravityUniforms(),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const motion = prefersReducedMotion ? 0 : intensity;
    const currentSpeed = config.speed * Math.max(motion, 0.05);

    const activeMat = pointsRef.current?.material as THREE.ShaderMaterial | undefined;
    if (activeMat?.uniforms) {
      const u = activeMat.uniforms;
      u.u_time.value = elapsed;
      u.u_speed.value = currentSpeed;
      u.u_antiGravity.value = prefersReducedMotion ? 0.0 : config.antiGravityRate;
      u.u_turbulence.value = prefersReducedMotion ? 0.0 : config.turbulence;
      u.u_mouse.value.set(mouse.x, mouse.y);
      u.u_mouseStrength.value = prefersReducedMotion ? 0.0 : config.gravity * 0.65;
      u.u_opacity.value = config.density * 0.95;
      u.u_warmth.value = config.warmth;
      u.u_pixelRatio.value = Math.min(window.devicePixelRatio, 2.0);

      // Core & accent color mapping
      u.u_colorCore.value.set(palette.neutral);
      u.u_colorTech.value.set(palette.data);
      u.u_colorCosmic.value.set(palette.cosmic);
      u.u_colorWarm.value.set(palette.warm);
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
