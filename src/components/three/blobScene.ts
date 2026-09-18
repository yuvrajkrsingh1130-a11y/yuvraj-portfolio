import * as THREE from "three";

/* ============================================================
   PROCEDURAL LIQUID OBJECT
   Simplex-noise displacement on the GPU + facet normals give a
   raw chrome-sculpture look without any texture downloads.
   ============================================================ */

const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
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
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
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
`;

const VERTEX = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
uniform float uVel;
uniform vec2 uMouse;
varying vec3 vWorldPos;
varying float vDisp;

${NOISE_GLSL}

void main() {
  vec3 n = normalize(normal);
  float t = uTime * 0.4;
  float n1 = snoise(n * uFreq + vec3(t * 0.6, t * 0.4, t * 0.5));
  float n2 = 0.5 * snoise(position * (uFreq * 1.9) + vec3(-t * 0.5, t * 0.7, t * 0.3));
  float amp = uAmp * (1.0 + clamp(uVel, 0.0, 1.0) * 1.5);

  vec3 mouseDir = normalize(vec3(uMouse * 1.1, 0.8));
  float facing = smoothstep(0.1, 1.0, dot(n, mouseDir));
  float disp = (n1 + n2) * amp + facing * clamp(uVel, 0.0, 1.0) * 0.35;

  vec3 p = position + n * disp;
  vDisp = disp;
  vec4 world = modelMatrix * vec4(p, 1.0);
  vWorldPos = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const FRAGMENT = /* glsl */ `
precision highp float;
uniform vec3 uLight;
uniform vec3 uDark;
uniform vec3 uAccent;
varying vec3 vWorldPos;
varying float vDisp;

void main() {
  vec3 fdx = dFdx(vWorldPos);
  vec3 fdy = dFdy(vWorldPos);
  vec3 n = normalize(cross(fdx, fdy));
  vec3 viewDir = normalize(cameraPosition - vWorldPos);

  float sky = smoothstep(-0.5, 0.9, n.y);
  float key = pow(max(dot(n, normalize(vec3(0.6, 0.9, 0.5))), 0.0), 2.0);
  float band = clamp(sky * 0.62 + key * 0.55, 0.0, 1.0);

  /* faint banding steps = raw chrome feeling */
  float stepped = floor(band * 6.0) / 6.0;
  float mixv = mix(band, stepped, 0.3);

  vec3 col = mix(uDark, uLight, mixv);
  col += uLight * pow(max(dot(n, normalize(vec3(-0.4, 0.7, 0.65))), 0.0), 24.0) * 0.85;

  float fr = pow(1.0 - max(dot(n, viewDir), 0.0), 3.0);
  col = mix(col, uAccent, fr * 0.42);
  col = mix(col, uAccent, smoothstep(0.3, 0.85, vDisp) * 0.1);

  gl_FragColor = vec4(col, 1.0);
}
`;

export interface BlobHandle {
  dispose: () => void;
  setPaused: (paused: boolean) => void;
  setPointer: (x: number, y: number) => void;
  setVelocity: (v: number) => void;
  resize: (w: number, h: number) => void;
  renderOnce: () => void;
}

export interface BlobOptions {
  detail?: number;
  amp?: number;
  freq?: number;
  reducedMotion?: boolean;
  accent?: string;
  light?: string;
  dark?: string;
}

export function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function createBlobScene(
  canvas: HTMLCanvasElement,
  opts: BlobOptions = {}
): BlobHandle {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
  camera.position.set(0, 0, 4.4);

  const uniforms = {
    uTime: { value: 0 },
    uAmp: { value: opts.amp ?? 0.32 },
    uFreq: { value: opts.freq ?? 1.35 },
    uVel: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uLight: { value: new THREE.Color(opts.light ?? "#ece9e1") },
    uDark: { value: new THREE.Color(opts.dark ?? "#101010") },
    uAccent: { value: new THREE.Color(opts.accent ?? "#ccff00") },
  };

  const detail = opts.detail ?? 5;
  const geometry = new THREE.IcosahedronGeometry(1.28, detail);
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  /* ---------- state ---------- */
  let raf = 0;
  let paused = false;
  let destroyed = false;
  const clock = new THREE.Clock();
  const pointerTarget = new THREE.Vector2(0, 0);
  const pointer = new THREE.Vector2(0, 0);
  let velocityTarget = 0;
  let velocity = 0;

  const staticFrame = !!opts.reducedMotion;

  const render = () => {
    renderer.render(scene, camera);
  };

  const loop = () => {
    if (destroyed) return;
    raf = requestAnimationFrame(loop);
    if (paused || document.hidden) return;

    const dt = Math.min(clock.getDelta(), 0.05);
    uniforms.uTime.value += dt;

    pointer.lerp(pointerTarget, 0.06);
    uniforms.uMouse.value.copy(pointer);
    velocity += (velocityTarget - velocity) * 0.08;
    velocityTarget *= 0.94;
    uniforms.uVel.value = Math.min(Math.abs(velocity), 1);

    mesh.rotation.y += dt * 0.14 + pointer.x * 0.002;
    mesh.rotation.x += (pointer.y * 0.35 - mesh.rotation.x * 0.12) * dt * 2;
    mesh.position.y = Math.sin(uniforms.uTime.value * 0.5) * 0.06;

    render();
  };

  if (staticFrame) {
    uniforms.uTime.value = 4.2;
    render();
  } else {
    raf = requestAnimationFrame(loop);
  }

  return {
    dispose() {
      destroyed = true;
      cancelAnimationFrame(raf);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
    setPaused(p) {
      paused = p;
      if (!p) clock.getDelta(); // discard idle time
    },
    setPointer(x, y) {
      pointerTarget.set(x, y);
    },
    setVelocity(v) {
      velocityTarget = Math.min(Math.abs(v) * 0.16, 1);
    },
    resize(w, h) {
      if (w <= 0 || h <= 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (staticFrame) render();
    },
    renderOnce: render,
  };
}
