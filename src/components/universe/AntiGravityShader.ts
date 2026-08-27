import * as THREE from 'three';

/**
 * GLSL Simplex 3D Noise & Anti-Gravity Shaders for Micro-Dust Particle Cloud
 */

export const AntiGravityVertexShader = /* glsl */ `
  uniform float u_time;
  uniform float u_speed;
  uniform float u_antiGravity;
  uniform float u_turbulence;
  uniform vec2 u_mouse;
  uniform float u_mouseStrength;
  uniform float u_mouseRadius;
  uniform float u_pixelRatio;
  uniform float u_boundY;
  uniform float u_boundX;
  uniform float u_boundZ;

  attribute float a_size;
  attribute float a_phase;
  attribute float a_speed;
  attribute vec3 a_home;
  attribute float a_colorType; // 0: neutral, 1: tech/cyan, 2: cosmic/lavender, 3: warm

  varying float v_life;
  varying float v_colorType;
  varying float v_distToMouse;

  // --- Simplex 3D Noise Functions ---
  vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    v_colorType = a_colorType;
    vec3 pos = a_home;

    // Upward anti-gravity drift with smooth looping bounds
    float totalTime = u_time * u_speed * a_speed;
    float upwardOffset = totalTime * u_antiGravity * 1.8 + a_phase * u_boundY;
    pos.y = mod(pos.y + upwardOffset + u_boundY * 0.5, u_boundY) - u_boundY * 0.5;

    // Vertical life factor (soft fade near top/bottom bounds)
    float normalizedY = (pos.y + u_boundY * 0.5) / u_boundY;
    v_life = smoothstep(0.0, 0.15, normalizedY) * (1.0 - smoothstep(0.85, 1.0, normalizedY));

    // 3D Simplex noise turbulence
    vec3 noiseCoord = pos * 0.22 + vec3(u_time * 0.08 * u_speed, u_time * 0.05 * u_speed, 0.0);
    float noiseX = snoise(noiseCoord);
    float noiseY = snoise(noiseCoord + vec3(43.12, 11.5, 9.2));
    float noiseZ = snoise(noiseCoord + vec3(12.7, 78.3, 31.4));

    pos += vec3(noiseX, noiseY, noiseZ) * u_turbulence * 0.35;

    // Inverse-square cursor gravity
    vec3 mousePos3D = vec3(u_mouse.x * u_boundX * 0.5, u_mouse.y * u_boundY * 0.5, 0.0);
    vec3 toMouse = mousePos3D - pos;
    float dist = length(toMouse);
    v_distToMouse = dist;

    if (dist < u_mouseRadius && u_mouseStrength > 0.0) {
      float attractFactor = (1.0 - dist / u_mouseRadius);
      float force = (attractFactor * attractFactor) / (dist * dist + 0.25) * u_mouseStrength * 1.2;
      pos += normalize(toMouse) * min(force, 0.8);
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Dynamic point size with depth attenuation
    float sizeFactor = (0.7 + 0.6 * v_life);
    if (dist < u_mouseRadius) {
      sizeFactor += (1.0 - dist / u_mouseRadius) * 0.8;
    }

    gl_PointSize = u_pixelRatio * a_size * sizeFactor * (320.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 1.0, 32.0);
  }
`;

export const AntiGravityFragmentShader = /* glsl */ `
  uniform vec3 u_colorCore;
  uniform vec3 u_colorTech;
  uniform vec3 u_colorCosmic;
  uniform vec3 u_colorWarm;
  uniform float u_opacity;
  uniform float u_warmth;

  varying float v_life;
  varying float v_colorType;
  varying float v_distToMouse;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.0, dist);
    float coreGlow = smoothstep(0.2, 0.0, dist);

    vec3 baseColor = u_colorCore;
    if (v_colorType > 0.5 && v_colorType <= 1.5) {
      baseColor = u_colorTech; // Cyan / Electric Blue
    } else if (v_colorType > 1.5 && v_colorType <= 2.5) {
      baseColor = u_colorCosmic; // Soft Lavender
    } else if (v_colorType > 2.5) {
      baseColor = u_colorWarm; // Warm Sand
    }

    vec3 blendedColor = mix(baseColor, u_colorWarm, u_warmth * 0.25);
    vec3 finalColor = mix(blendedColor, u_colorCore, coreGlow * 0.6);

    gl_FragColor = vec4(finalColor, alpha * v_life * u_opacity);
  }
`;

export function createAntiGravityUniforms() {
  return {
    u_time: { value: 0 },
    u_speed: { value: 1.0 },
    u_antiGravity: { value: 1.0 },
    u_turbulence: { value: 0.6 },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_mouseStrength: { value: 0.6 },
    u_mouseRadius: { value: 2.2 },
    u_pixelRatio: { value: 1.0 },
    u_boundY: { value: 12.0 },
    u_boundX: { value: 18.0 },
    u_boundZ: { value: 6.0 },
    u_colorCore: { value: new THREE.Color('#F2F0EA') },
    u_colorTech: { value: new THREE.Color('#8FA8FF') },
    u_colorCosmic: { value: new THREE.Color('#B6A1D9') },
    u_colorWarm: { value: new THREE.Color('#D8C7B5') },
    u_opacity: { value: 0.9 },
    u_warmth: { value: 0.16 },
  };
}
