import LivingDataUniverse, { type LivingDataUniverseProps } from './universe/LivingDataUniverse';

export type AdvancedCosmicBackgroundProps = LivingDataUniverseProps;

/**
 * AdvancedCosmicBackground provides backward compatibility alias for LivingDataUniverse.
 */
export default function AdvancedCosmicBackground(props: AdvancedCosmicBackgroundProps) {
  return <LivingDataUniverse {...props} />;
}
