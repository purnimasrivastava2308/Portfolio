import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

interface ConstellationNode {
  id: string;
  position: [number, number, number];
  label: string;
  active: boolean;
}

interface ConstellationProps {
  nodes?: ConstellationNode[];
  particleCount?: number;
  connectionDistance?: number;
  onNodeHover?: (nodeId: string | null) => void;
}

function ConstellationVisualization({
  nodes = [],
  particleCount = 1000,
  connectionDistance = 300,
}: ConstellationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodePointsRef = useRef<THREE.Points>(null);
  const [hoveredNode] = useState<string | null>(null);

  // Create background particles
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 1500;
      pos[i + 1] = (Math.random() - 0.5) * 1500;
      pos[i + 2] = (Math.random() - 0.5) * 1500;
    }
    return pos;
  }, [particleCount]);

  // Create node positions
  const nodePositions = useMemo(() => {
    return nodes.length > 0
      ? new Float32Array(nodes.flatMap((n) => n.position))
      : new Float32Array();
  }, [nodes]);

  // Create connection lines between nearby nodes
  const linePositions = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const [x1, y1, z1] = nodes[i].position;
        const [x2, y2, z2] = nodes[j].position;
        const distance = Math.sqrt(
          Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
        );

        if (distance < connectionDistance) {
          lines.push(x1, y1, z1, x2, y2, z2);
        }
      }
    }
    return lines.length > 0 ? lines : [];
  }, [nodes, connectionDistance]);

  // Handle mouse movement for node interaction
  // This would require raycasting which is complex in this context
  // For now, we'll use simple state management

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.0001;
      groupRef.current.rotation.y += 0.00015;
    }

    // Subtle node pulsing for active nodes
    if (nodePointsRef.current) {
      nodes.forEach((node) => {
        if (node.active) {
          // Pulse handled via PointMaterial scale
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Background cosmic particles */}
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.8}
          sizeAttenuation={true}
          opacity={0.4}
          depthWrite={false}
        />
      </Points>

      {/* Node points */}
      {nodes.length > 0 && (
        <Points ref={nodePointsRef} positions={nodePositions} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            color={hoveredNode ? '#06b6d4' : '#7c3aed'}
            size={hoveredNode ? 6 : 4}
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
          opacity={hoveredNode ? 0.6 : 0.3}
          fog={false}
        />
      )}
    </group>
  );
}

interface DataConstellationProps {
  nodes?: ConstellationNode[];
  particleCount?: number;
  title?: string;
}

export default function DataConstellation({
  nodes = [],
  particleCount = 1000,
  title,
}: DataConstellationProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="relative w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 800], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'transparent',
        }}
      >
        <color attach="background" args={['#0a0e27']} />
        <ConstellationVisualization
          nodes={nodes}
          particleCount={particleCount}
          connectionDistance={350}
          onNodeHover={setHoveredNode}
        />
        <ambientLight intensity={0.3} />
        <pointLight position={[400, 400, 400]} intensity={0.4} />
      </Canvas>

      {/* Title overlay */}
      {title && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="text-4xl md:text-6xl font-bold text-cosmic-white text-center">
            {title}
          </h2>
        </div>
      )}

      {/* Node info overlay */}
      {hoveredNode && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-cosmic-black/80 backdrop-blur px-6 py-3 rounded-lg border border-cosmic-violet/50 pointer-events-none">
          <p className="text-cosmic-cyan">{hoveredNode}</p>
        </div>
      )}
    </div>
  );
}
