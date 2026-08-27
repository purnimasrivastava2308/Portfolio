import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import useReducedMotion from '../hooks/useReducedMotion';

interface Node {
  position: [number, number, number];
  label: string;
  category: string;
}

interface NeuralNetworkProps {
  nodes?: Node[];
  particleCount?: number;
}

function NetworkVisualization({ nodes, particleCount = 1000 }: NeuralNetworkProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 1000;
      positions[i + 1] = (Math.random() - 0.5) * 1000;
      positions[i + 2] = (Math.random() - 0.5) * 1000;
    }
    return positions;
  }, [particleCount]);

  // Create connections between nodes
  const linePositions = useMemo(() => {
    const positions = [];
    if (nodes) {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < Math.min(i + 4, nodes.length); j++) {
          positions.push(
            ...(nodes[i].position as [number, number, number]),
            ...(nodes[j].position as [number, number, number])
          );
        }
      }
    }
    return positions.length > 0 ? positions : [];
  }, [nodes]);

  useFrame(() => {
    if (!groupRef.current) return;

    if (!prefersReducedMotion) {
      groupRef.current.rotation.x += 0.0002;
      groupRef.current.rotation.y += 0.0003;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.00005;
      particlesRef.current.rotation.y += 0.00007;
    }
  });

  return (
    <group ref={groupRef}>
      <Points ref={particlesRef} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#7c3aed"
          size={2}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>

      {/* Node points */}
      {nodes && (
        <Points positions={new Float32Array(nodes.flatMap((n) => n.position))}>
          <PointMaterial
            transparent
            color="#06b6d4"
            size={5}
            sizeAttenuation={true}
            depthWrite={false}
          />
        </Points>
      )}

      {/* Connection lines */}
      {linePositions.length > 0 && (
        <Line
          points={linePositions as any}
          color="#7c3aed"
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      )}
    </group>
  );
}

interface NeuralNetworkCanvasProps {
  nodes?: Node[];
  particleCount?: number;
}

export default function NeuralNetwork({
  nodes,
  particleCount = 1000,
}: NeuralNetworkCanvasProps) {
  return (
    <div className="relative w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 800], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute', inset: 0, background: 'transparent' }}
      >
        <color attach="background" args={['#0a0e27']} />
        <NetworkVisualization nodes={nodes} particleCount={particleCount} />
        <ambientLight intensity={0.3} />
        <pointLight position={[500, 500, 500]} intensity={0.5} />
      </Canvas>
    </div>
  );
}
