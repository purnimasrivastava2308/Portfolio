import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdvancedCosmicBackground from './AdvancedCosmicBackground';

interface SignatureVisualMomentProps {
  onComplete?: () => void;
}

export default function SignatureVisualMoment({ onComplete }: SignatureVisualMomentProps) {
  const [phase, setPhase] = useState<'void' | 'emergence' | 'constellation' | 'final'>(
    'void'
  );

  useEffect(() => {
    const timeline = [
      { time: 1000, phase: 'emergence' as const },
      { time: 4000, phase: 'constellation' as const },
      { time: 6000, phase: 'final' as const },
    ];

    const timers = timeline.map((item) =>
      setTimeout(() => setPhase(item.phase), item.time)
    );

    const completionTimer = setTimeout(() => {
      onComplete?.();
    }, 8000);

    return () => {
      timers.forEach((t) => clearTimeout(t));
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-cosmic-black z-50 overflow-hidden">
      <AdvancedCosmicBackground type="philosophy" intensity={0.3} />

      {/* Void phase - everything disappears */}
      {phase === 'void' && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-cosmic-black"
        />
      )}

      {/* Central point of light */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{
          scale: phase === 'void' ? 0 : phase === 'emergence' ? 1 : 0,
          opacity: 1,
        }}
        transition={{ duration: 1.5 }}
        className="absolute w-2 h-2 rounded-full bg-cosmic-cyan blur-sm"
      />

      {/* Expanding light glow */}
      <motion.div
        initial={{ scale: 0, opacity: 0.6 }}
        animate={{
          scale: phase === 'void' ? 0 : phase === 'emergence' ? 8 : 16,
          opacity: phase === 'void' ? 0 : phase === 'emergence' ? 0.6 : 0.2,
        }}
        transition={{ duration: 2 }}
        className="absolute w-1 h-1 rounded-full bg-cosmic-cyan blur-2xl"
      />

      {/* Main text - first line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: phase === 'constellation' || phase === 'final' ? 1 : 0,
          y: phase === 'constellation' || phase === 'final' ? 0 : 20,
        }}
        transition={{ duration: 1 }}
        className="absolute text-center z-20"
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-cosmic-white mb-6 leading-tight">
          There are patterns everywhere.
        </h1>
        <p className="text-lg md:text-2xl text-cosmic-white/80 max-w-2xl mx-auto">
          The art is learning how to see them.
        </p>
      </motion.div>

      {/* Signature - appears last */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: phase === 'final' ? 1 : 0,
          y: phase === 'final' ? 0 : 30,
        }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-16 z-20 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-cosmic-violet mb-3">
          PURNIMA
        </h2>
        <p className="text-lg text-cosmic-white/70">
          Data × Intelligence × Curiosity
        </p>
        <p className="text-sm text-cosmic-white/50 mt-4">
          Observe deeply. Analyse intelligently. Move peacefully.
        </p>
      </motion.div>

      {/* Particles constellation forming in background */}
      {(phase === 'emergence' || phase === 'constellation' || phase === 'final') && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Animated constellation lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ opacity: phase === 'constellation' ? 0.6 : 0.2 }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Example constellation pattern */}
            <circle cx="50%" cy="35%" r="3" fill="#06b6d4" filter="url(#glow)" />
            <circle cx="45%" cy="45%" r="2" fill="#06b6d4" filter="url(#glow)" />
            <circle cx="55%" cy="45%" r="2" fill="#06b6d4" filter="url(#glow)" />
            <circle cx="50%" cy="55%" r="2" fill="#06b6d4" filter="url(#glow)" />

            <line
              x1="50%"
              y1="35%"
              x2="45%"
              y2="45%"
              stroke="#7c3aed"
              strokeWidth="1"
              opacity="0.6"
            />
            <line
              x1="50%"
              y1="35%"
              x2="55%"
              y2="45%"
              stroke="#7c3aed"
              strokeWidth="1"
              opacity="0.6"
            />
            <line
              x1="45%"
              y1="45%"
              x2="50%"
              y2="55%"
              stroke="#7c3aed"
              strokeWidth="1"
              opacity="0.6"
            />
            <line
              x1="55%"
              y1="45%"
              x2="50%"
              y2="55%"
              stroke="#7c3aed"
              strokeWidth="1"
              opacity="0.6"
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
}
