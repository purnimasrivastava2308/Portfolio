import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import useMousePosition from '../hooks/useMousePosition';
import useReducedMotion from '../hooks/useReducedMotion';

interface DataPlanetProps {
  particleCount?: number;
  radius?: number;
  autoRotate?: boolean;
}

function PlanetParticles({
  particleCount = 3000,
  radius = 200,
  autoRotate = true,
}: DataPlanetProps) {
  const ref = useRef<THREE.Points>(null);
  const mousePosition = useMousePosition();
  const prefersReducedMotion = useReducedMotion();

  // Create particles in a sphere shape
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = radius + (Math.random() - 0.5) * 50;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    return positions;
  }, [particleCount, radius]);

  useFrame(() => {
    if (!ref.current) return;

    if (!prefersReducedMotion && autoRotate) {
      ref.current.rotation.x += 0.0003;
      ref.current.rotation.y += 0.0005;
    }

    // Mouse interaction
    if (mousePosition.x !== 0 || mousePosition.y !== 0) {
      ref.current.rotation.x += mousePosition.y * 0.0005;
      ref.current.rotation.y += mousePosition.x * 0.0005;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#06b6d4"
        size={2.5}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

interface DataSphereProps {
  particleCount?: number;
  radius?: number;
  scale?: number;
}

export default function DataSphere({
  particleCount = 3000,
  radius = 200,
}: DataSphereProps) {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 600], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute', inset: 0, background: 'transparent' }}
      >
        <color attach="background" args={['#0a0e27']} />
        <PlanetParticles
          particleCount={particleCount}
          radius={radius}
          autoRotate={true}
        />
        {/* Optional: Add a subtle glow effect */}
        <pointLight position={[300, 300, 300]} intensity={0.5} />
      </Canvas>
    </div>
  );
}
