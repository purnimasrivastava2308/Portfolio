import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useMousePosition from '../../hooks/useMousePosition';
import useReducedMotion from '../../hooks/useReducedMotion';
import Stardust from './Stardust';
import {
  FilamentVertexShader,
  FilamentFragmentShader,
  createFilamentUniforms,
} from './FilamentShader';
import {
  MAX_FILAMENTS,
  MAX_GEOMETRY,
  palette,
  universeStates,
  stateByRoute,
  scaleForTier,
  targetFor,
  specialPointTargets,
} from './UniverseConfig';
import type {
  BackgroundType,
  UniverseState,
  UniverseConfig,
  PerformanceTier,
} from './UniverseTypes';

export interface LivingDataUniverseProps {
  type?: BackgroundType;
  intensity?: number;
  state?: UniverseState;
}

function useViewportTier(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>(() => {
    if (typeof window === 'undefined') return 'desktop';
    if (window.innerWidth < 680) return 'mobile';
    if (window.innerWidth < 1024) return 'tablet';
    return 'desktop';
  });

  useEffect(() => {
    const updateTier = () => {
      if (window.innerWidth < 680) setTier('mobile');
      else if (window.innerWidth < 1024) setTier('tablet');
      else setTier('desktop');
    };

    window.addEventListener('resize', updateTier);
    return () => window.removeEventListener('resize', updateTier);
  }, []);

  return tier;
}

/**
 * Generates dynamic energy filament line geometry
 */
function createFilamentGeometry(count: number) {
  const positions = new Float32Array(count * 6);
  const curveUs = new Float32Array(count * 2);
  const alphas = new Float32Array(count * 2);

  for (let i = 0; i < count; i++) {
    const i6 = i * 6;
    const i2 = i * 2;

    curveUs[i2] = 0.0;
    curveUs[i2 + 1] = 1.0;

    alphas[i2] = 1.0;
    alphas[i2 + 1] = 1.0;

    positions[i6] = 0;
    positions[i6 + 1] = 0;
    positions[i6 + 2] = 0;
    positions[i6 + 3] = 0;
    positions[i6 + 4] = 0;
    positions[i6 + 5] = 0;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('a_curveU', new THREE.BufferAttribute(curveUs, 1));
  geometry.setAttribute('a_alpha', new THREE.BufferAttribute(alphas, 1));

  return geometry;
}

function UniverseCanvasScene({
  config,
  intensity,
  viewportTier,
}: {
  config: UniverseConfig;
  intensity: number;
  viewportTier: PerformanceTier;
}) {
  const mouse = useMousePosition();
  const prefersReducedMotion = useReducedMotion();

  // 1. Luminous Energy Filaments
  const filamentCount = Math.floor(MAX_FILAMENTS * scaleForTier(viewportTier));
  const filamentGeometry = useMemo(() => createFilamentGeometry(filamentCount), [filamentCount]);
  const filamentMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: FilamentVertexShader,
      fragmentShader: FilamentFragmentShader,
      uniforms: createFilamentUniforms(),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // 2. Mathematical Geometry structures
  const geometryLines = useMemo(() => {
    return Array.from({ length: MAX_GEOMETRY }, (_, index) => {
      const radius = 1.15 + index * 0.46;
      const segments = index % 2 === 0 ? 96 : 6 + (index % 6);
      const points = Array.from({ length: segments + 1 }, (_, pointIndex) => {
        const angle = (pointIndex / segments) * Math.PI * 2;
        const wave = Math.sin(angle * (index + 2)) * 0.035;
        return new THREE.Vector3(
          Math.cos(angle) * (radius + wave),
          Math.sin(angle) * (radius * 0.54 + wave),
          -0.85 - index * 0.05,
        );
      });

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: index % 3 === 0 ? palette.data : palette.cosmic,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });

      return new THREE.Line(lineGeometry, lineMaterial);
    });
  }, []);

  // Refs
  const filamentRef = useRef<THREE.LineSegments>(null);
  const geometryRef = useRef<THREE.Group>(null);
  const specialRef = useRef<THREE.Group>(null);
  const sceneRef = useRef<THREE.Group>(null);

  // Smooth State Interpolation Reference
  const transitionRef = useRef({
    speed: config.speed,
    antiGravityRate: config.antiGravityRate,
    turbulence: config.turbulence,
    density: config.density,
    warmth: config.warmth,
    gravity: config.gravity,
    geometryOpacity: config.geometryOpacity,
    fieldOpacity: config.fieldOpacity,
    activeFilaments: config.activeFilaments,
    activeGeometry: config.activeGeometry,
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      filamentGeometry.dispose();
      filamentMaterial.dispose();
      geometryLines.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
    };
  }, [filamentGeometry, filamentMaterial, geometryLines]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const motion = prefersReducedMotion ? 0 : intensity;
    const ease = prefersReducedMotion ? 1 : 0.025;
    const tierScale = scaleForTier(viewportTier);

    const tr = transitionRef.current;
    tr.speed += (config.speed - tr.speed) * ease;
    tr.antiGravityRate += (config.antiGravityRate - tr.antiGravityRate) * ease;
    tr.turbulence += (config.turbulence - tr.turbulence) * ease;
    tr.density += (config.density - tr.density) * ease;
    tr.warmth += (config.warmth - tr.warmth) * ease;
    tr.gravity += (config.gravity - tr.gravity) * ease;
    tr.geometryOpacity += (config.geometryOpacity - tr.geometryOpacity) * ease;
    tr.fieldOpacity += (config.fieldOpacity - tr.fieldOpacity) * ease;
    tr.activeFilaments += (config.activeFilaments * tierScale - tr.activeFilaments) * ease;
    tr.activeGeometry += (config.activeGeometry * tierScale - tr.activeGeometry) * ease;

    const currentSpeed = tr.speed * Math.max(motion, 0.05);

    // 1. Update Luminous Energy Filaments Uniforms
    const activeFilMat = filamentRef.current?.material as THREE.ShaderMaterial | undefined;
    if (activeFilMat?.uniforms) {
      const fU = activeFilMat.uniforms;
      fU.u_time.value = elapsed;
      fU.u_pulseSpeed.value = 2.4 * currentSpeed;
      fU.u_opacity.value = tr.density * 0.65;
      fU.u_warmth.value = tr.warmth;
      fU.u_colorCore.value.set(palette.neutral);
      fU.u_colorFilament.value.set(palette.data);
      fU.u_colorGlow.value.set(palette.cosmic);
    }

    if (filamentRef.current?.geometry) {
      const activeLines = Math.min(filamentCount, Math.floor(tr.activeFilaments));
      const filamentPositions = filamentRef.current.geometry.attributes.position.array as Float32Array;
      const filamentAlphas = filamentRef.current.geometry.attributes.a_alpha.array as Float32Array;

      for (let i = 0; i < filamentCount; i++) {
        const i6 = i * 6;
        const i2 = i * 2;
        const isVisible = i < activeLines;

        if (isVisible) {
          const fromTarget = targetFor(i % 120, config.state);
          const step = 1 + (i % 7);
          const toTarget = targetFor((i + step) % 120, config.state);

          const upwardDrift = prefersReducedMotion
            ? 0
            : Math.sin(elapsed * 0.25 * currentSpeed + i * 0.2) * 0.12;

          filamentPositions[i6] = fromTarget.x;
          filamentPositions[i6 + 1] = fromTarget.y + upwardDrift;
          filamentPositions[i6 + 2] = fromTarget.z;

          filamentPositions[i6 + 3] = toTarget.x;
          filamentPositions[i6 + 4] = toTarget.y + upwardDrift;
          filamentPositions[i6 + 5] = toTarget.z;

          filamentAlphas[i2] = 1.0;
          filamentAlphas[i2 + 1] = 1.0;
        } else {
          filamentAlphas[i2] = 0.0;
          filamentAlphas[i2 + 1] = 0.0;
        }
      }

      filamentRef.current.geometry.attributes.position.needsUpdate = true;
      filamentRef.current.geometry.attributes.a_alpha.needsUpdate = true;
    }

    // 2. Mathematical Geometry
    if (geometryRef.current) {
      geometryRef.current.rotation.z += 0.00035 * currentSpeed;
      geometryRef.current.children.forEach((child: THREE.Object3D, index: number) => {
        const material = (child as THREE.Line).material as THREE.LineBasicMaterial;
        material.opacity =
          index < tr.activeGeometry
            ? tr.geometryOpacity * (0.55 + Math.sin(elapsed * 0.15 + index) * 0.15)
            : 0;
      });
    }

    // 3. Milestone Nodes & Traveling PersonalPoint
    if (specialRef.current) {
      const targets = specialPointTargets(config.state);
      specialRef.current.children.forEach((child: THREE.Object3D, index: number) => {
        const target = targets[index];
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshBasicMaterial;

        if (!target) {
          mesh.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), 0.08);
          material.opacity += (0 - material.opacity) * 0.08;
          return;
        }

        const pulseFactor = target.isCurrent ? 0.3 : 0.15;
        const pulse = 1 + Math.sin(elapsed * 1.35 + index) * pulseFactor * target.active;
        mesh.position.lerp(target.position, prefersReducedMotion ? 1 : 0.045);
        mesh.scale.lerp(
          new THREE.Vector3(target.scale, target.scale, target.scale).multiplyScalar(pulse),
          0.07,
        );

        const targetOpacity = (0.45 + target.active * 0.45) * Math.max(0.3, tr.density);
        material.opacity += (targetOpacity - material.opacity) * 0.08;

        const targetColor = target.isCurrent
          ? new THREE.Color(palette.cosmic)
          : target.active > 0.85
            ? new THREE.Color(palette.warm)
            : new THREE.Color(palette.data);

        material.color.lerp(targetColor, 0.08);
      });
    }

    // 4. Scene Parallax
    if (sceneRef.current) {
      sceneRef.current.position.x += (mouse.x * 0.07 * motion - sceneRef.current.position.x) * 0.02;
      sceneRef.current.position.y += (mouse.y * 0.05 * motion - sceneRef.current.position.y) * 0.02;
      sceneRef.current.rotation.z = Math.sin(elapsed * 0.018 * currentSpeed) * 0.008;
    }
  });

  return (
    <group ref={sceneRef}>
      {/* Primary Procedural Stardust System */}
      <Stardust
        config={config}
        intensity={intensity}
        viewportTier={viewportTier}
        mouse={mouse}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* Luminous Energy Filaments & Tendrils */}
      <lineSegments
        ref={filamentRef}
        geometry={filamentGeometry}
        material={filamentMaterial}
      />

      {/* Mathematical Geometry Orbitals */}
      <group ref={geometryRef}>
        {geometryLines.map((line, index) => (
          <primitive key={index} object={line} />
        ))}
      </group>

      {/* Milestone Nodes & Traveling PersonalPoint */}
      <group ref={specialRef}>
        {Array.from({ length: 8 }, (_, index) => (
          <mesh key={index} position={[0, 0, 0]} scale={0.001}>
            <sphereGeometry args={[1, 24, 16]} />
            <meshBasicMaterial
              color={palette.warm}
              transparent
              opacity={0}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function LivingDataUniverse({
  type = 'home',
  intensity = 1,
  state: explicitState,
}: LivingDataUniverseProps) {
  const viewportTier = useViewportTier();
  const activeState: UniverseState = explicitState || stateByRoute[type] || 'home';
  const config = universeStates[activeState] ?? universeStates.home;
  const tierScale = scaleForTier(viewportTier);
  const glowStrength = Math.max(0.5, config.fieldOpacity * tierScale);

  // Atmospheric Deep Space Background Gradients (#070812 base with dynamic tech/cosmic/warm radial glows)
  const aura = `radial-gradient(circle at 18% 22%, ${palette.warm}${Math.round(16 * config.warmth).toString(16).padStart(2, '0')}, transparent 32%),
    radial-gradient(circle at 78% 16%, ${palette.data}${Math.round(26 * config.density).toString(16).padStart(2, '0')}, transparent 34%),
    radial-gradient(circle at 50% 65%, ${palette.cosmic}${Math.round(20 * glowStrength).toString(16).padStart(2, '0')}, transparent 38%),
    radial-gradient(circle at 50% 40%, rgba(56,189,248,0.038), transparent 55%),
    linear-gradient(180deg, ${palette.base} 0%, #070812 55%, ${palette.deep} 100%)`;

  return (
    <div
      className="living-data-universe fixed inset-0 -z-10 pointer-events-none"
      style={
        {
          background: aura,
          '--field-opacity': config.fieldOpacity,
          '--field-warmth': config.warmth,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <Canvas
        camera={{
          position: [0, 0, viewportTier === 'mobile' ? 8.8 : 7.8],
          fov: viewportTier === 'mobile' ? 64 : 58,
        }}
        dpr={viewportTier === 'mobile' ? [1, 1.2] : [1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <color attach="background" args={[palette.base]} />
        <fog attach="fog" args={[palette.base, 6.2, 12.8]} />
        <UniverseCanvasScene
          config={config}
          intensity={intensity}
          viewportTier={viewportTier}
        />
      </Canvas>

      <div className="living-data-universe__field" />
      <div className="living-data-universe__vignette" />
    </div>
  );
}
export { Stardust };
