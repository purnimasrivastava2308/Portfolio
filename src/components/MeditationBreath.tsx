import { useEffect, useState, useRef } from 'react';
// Breathing cycle component

export default function MeditationBreath() {
  const [cycle, setCycle] = useState(0);
  const cycleRef = useRef(0);

  useEffect(() => {
    let animationId: number;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      // 8 second breathing cycle (4s expand, 4s contract)
      const normalizedTime = (elapsed % 8) / 8;
      cycleRef.current = normalizedTime;
      setCycle(normalizedTime);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Get the current phase
  const getPhase = () => {
    if (cycle < 0.25) return 'expand';
    if (cycle < 0.5) return 'hold-expand';
    if (cycle < 0.75) return 'contract';
    return 'hold-contract';
  };

  // Calculate scale based on cycle
  const getScale = () => {
    if (cycle < 0.5) {
      // Expand phase
      return 1 + cycle * 0.2; // Max 1.1x at 0.5
    } else {
      // Contract phase
      return 1.1 - (cycle - 0.5) * 0.2; // Back to 1.0 at 1.0
    }
  };

  const phase = getPhase();
  const scale = getScale();

  return (
    <>
      {/* Subtle expanding/contracting overlay */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(
            circle at center,
            rgba(6, 182, 212, ${0.1 * scale}) 0%,
            transparent 70%
          )`,
          transform: `scale(${scale})`,
          transition: 'transform 0.1s ease-in-out',
        }}
      />

      {/* Phase indicator (hidden, for debugging) */}
      {typeof globalThis !== 'undefined' && globalThis.location && (
        <div
          className="fixed top-4 right-4 text-xs text-cosmic-cyan z-50 bg-cosmic-black/50 px-2 py-1 rounded pointer-events-auto"
          style={{ opacity: 0.5 }}
        >
          {phase} ({Math.round(scale * 100)}%)
        </div>
      )}
    </>
  );
}
