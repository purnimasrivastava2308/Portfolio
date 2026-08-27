import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import useMousePosition from '../hooks/useMousePosition';
import useReducedMotion from '../hooks/useReducedMotion';

interface ParticlesProps {
  count?: number;
  intensity?: number;
}

function Particles({ count = 5000, intensity = 1 }: ParticlesProps) {
  const ref = useRef<THREE.Points>(null);
  const mousePosition = useMousePosition();
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 2000;
      positions[i + 1] = (Math.random() - 0.5) * 2000;
      positions[i + 2] = (Math.random() - 0.5) * 2000;
    }

    return positions;
  }, [count]);

  useFrame(() => {
    if (!ref.current) return;

    if (!prefersReducedMotion) {
      // Gentle rotation
      ref.current.rotation.x += 0.0001 * intensity;
      ref.current.rotation.y += 0.00015 * intensity;

      // Mouse influence
      ref.current.position.x += (mousePosition.x * 10 - ref.current.position.x) * 0.05;
      ref.current.position.y += (mousePosition.y * 10 - ref.current.position.y) * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#7c3aed"
        size={3}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

interface CosmicBackgroundProps {
  particleCount?: number;
  intensityFactor?: number;
}

export default function CosmicBackground({
  particleCount = 5000,
  intensityFactor = 1,
}: CosmicBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1200], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['#0a0e27']} />
        <Particles count={particleCount} intensity={intensityFactor} />
      </Canvas>
    </div>
  );
}
