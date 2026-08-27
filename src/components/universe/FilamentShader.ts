import * as THREE from 'three';

/**
 * GLSL Shaders for Luminous Energy Filaments & Tendrils with Sine Wave Signal Pulses
 */

export const FilamentVertexShader = /* glsl */ `
  attribute float a_curveU; // 0.0 to 1.0 along line/spline
  attribute float a_alpha;

  varying float v_curveU;
  varying float v_alpha;

  void main() {
    v_curveU = a_curveU;
    v_alpha = a_alpha;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const FilamentFragmentShader = /* glsl */ `
  uniform float u_time;
  uniform float u_frequency;
  uniform float u_pulseSpeed;
  uniform float u_opacity;
  uniform vec3 u_colorCore;
  uniform vec3 u_colorFilament;
  uniform vec3 u_colorGlow;
  uniform float u_warmth;

  varying float v_curveU;
  varying float v_alpha;

  void main() {
    // Traveling sine-wave energy pulse along curve length U
    float wave = sin(v_curveU * u_frequency - u_time * u_pulseSpeed);
    float pulse = 0.28 + 0.72 * max(0.0, wave);

    // Blend filament colors
    vec3 baseColor = mix(u_colorFilament, u_colorGlow, wave * 0.5 + 0.5);
    baseColor = mix(baseColor, vec3(0.85, 0.78, 0.71), u_warmth * 0.25); // Warm sand shift
    vec3 finalColor = mix(baseColor, u_colorCore, max(0.0, wave * wave * 0.45));

    gl_FragColor = vec4(finalColor, v_alpha * pulse * u_opacity);
  }
`;

export function createFilamentUniforms() {
  return {
    u_time: { value: 0 },
    u_frequency: { value: 12.0 },
    u_pulseSpeed: { value: 2.2 },
    u_opacity: { value: 0.6 },
    u_colorCore: { value: new THREE.Color('#F2F0EA') },
    u_colorFilament: { value: new THREE.Color('#8FA8FF') },
    u_colorGlow: { value: new THREE.Color('#B6A1D9') },
    u_warmth: { value: 0.16 },
  };
}

