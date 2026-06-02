export const DropVertexShader = /* glsl */ `
uniform float uTime;
uniform float uBlobbiness;
uniform float uScale;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPos;
varying float vDistort;

// Simplex noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  vec3 pos = position;
  float t = uTime * 0.4;

  float n1 = snoise(pos * 1.5 + t) * uBlobbiness;
  float n2 = snoise(pos * 2.8 - t * 0.7) * uBlobbiness * 0.5;
  float n3 = snoise(pos * 4.0 + t * 1.2) * uBlobbiness * 0.25;

  float distort = n1 + n2 + n3;
  pos += normal * distort * 0.15;

  vec4 worldPos = modelMatrix * vec4(pos, 1.0);
  vWorldPos = worldPos.xyz;
  vNormal = normalize(normalMatrix * (normal + distort * 0.3));
  vViewDir = normalize(cameraPosition - worldPos.xyz);
  vDistort = distort;

  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

export const DropFragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
uniform float uOpacity;
uniform float uFresnelPower;
uniform float uGlowIntensity;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPos;
varying float vDistort;

void main() {
  float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), uFresnelPower);

  vec3 baseColor = uColor;
  vec3 highlightColor = vec3(0.4, 0.7, 1.0);
  vec3 rimColor = vec3(0.5, 0.8, 1.0);

  float breathing = sin(uTime * 0.8) * 0.5 + 0.5;
  float edgeGlow = fresnel * uGlowIntensity * (0.8 + breathing * 0.4);

  vec3 color = mix(baseColor * 0.15, highlightColor, fresnel * 0.6);
  color += rimColor * edgeGlow;
  color += vec3(0.3, 0.6, 1.0) * max(vDistort, 0.0) * 0.3;

  float alpha = mix(uOpacity * 0.3, uOpacity, fresnel);
  alpha = clamp(alpha, 0.0, 1.0);

  gl_FragColor = vec4(color, alpha);
}
`;

export const DeepSpaceVertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const DeepSpaceFragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uStarDensity;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  vec2 uv = vUv;
  float t = uTime * 0.02;

  float n1 = noise(uv * 3.0 + t);
  float n2 = noise(uv * 6.0 - t * 0.5);
  float n3 = noise(uv * 12.0 + t * 0.3);

  float nebula = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;

  float star = step(1.0 - uStarDensity, hash(uv * 500.0 + t * 10.0));
  star *= hash(uv * 500.0 + 1.0) * 0.8 + 0.2;

  vec3 color = mix(uColor1, uColor2, nebula);
  color = mix(color, uColor3, n3 * 0.3);
  color += vec3(1.0) * star * 0.6;

  gl_FragColor = vec4(color, 1.0);
}
`;

export const FlowVertexShader = /* glsl */ `
uniform float uTime;
uniform float uFlowSpeed;
attribute float aOffset;
attribute float aSize;
varying float vAlpha;
varying float vSize;

void main() {
  float t = uTime * uFlowSpeed + aOffset;
  vec3 pos = position;

  pos.x += sin(t * 2.0 + aOffset * 10.0) * 0.3;
  pos.y += cos(t * 1.5 + aOffset * 7.0) * 0.2;
  pos.z += sin(t * 1.0 + aOffset * 5.0) * 0.4;

  vAlpha = 0.3 + 0.7 * sin(t * 3.0 + aOffset * 20.0);
  vSize = aSize;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const FlowFragmentShader = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
varying float vSize;

void main() {
  float dist = length(gl_PointCoord - 0.5);
  float alpha = smoothstep(0.5, 0.0, dist) * vAlpha * 0.8;
  vec3 color = uColor + vec3(0.2, 0.4, 0.6) * (1.0 - dist);
  gl_FragColor = vec4(color, alpha);
}
`;

export const OceanVertexShader = /* glsl */ `
uniform float uTime;
attribute vec3 aVelocity;
varying float vHeight;

void main() {
  vec3 pos = position;
  float t = uTime;
  pos.y += sin(pos.x * 2.0 + t) * 0.1;
  pos.y += cos(pos.z * 1.5 + t * 0.7) * 0.08;
  pos.y += sin(pos.x * 5.0 + pos.z * 3.0 + t * 1.3) * 0.04;
  vHeight = pos.y;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const OceanFragmentShader = /* glsl */ `
uniform vec3 uColorDeep;
uniform vec3 uColorSurface;
uniform float uOpacity;
varying float vHeight;

void main() {
  vec3 color = mix(uColorDeep, uColorSurface, vHeight * 4.0 + 0.5);
  float alpha = uOpacity * (0.5 + vHeight * 2.0);
  gl_FragColor = vec4(color, alpha);
}
`;
