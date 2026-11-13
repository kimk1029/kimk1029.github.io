// Fragment shaders for the three cinematic scenes. All share the same uniforms:
// uRes (px), uTime (s), uP (scroll progress 0..1), uCenter (0..1, y up), uSteps (ray steps).

const COMMON = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uP;
uniform vec2 uCenter;
uniform float uSteps;
uniform vec2 uMouse;

mat2 rot(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p) {
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 4; i++) { s += a * vnoise(p); p *= 2.03; a *= 0.5; }
  return s;
}
// Point stars on a 2D grid: one jittered dot in a few of the cells.
float stars2(vec2 p) {
  vec2 id = floor(p), f = fract(p) - 0.5;
  vec2 o = (vec2(hash(id + 3.1), hash(id + 7.7)) - 0.5) * 0.7;
  return smoothstep(0.09, 0.0, length(f - o)) * step(0.82, hash(id)) * (0.5 + 0.5 * hash(id + 1.3));
}
float stars3(vec3 d, float density) {
  return stars2(vec2(atan(d.z, d.x), asin(clamp(d.y, -1.0, 1.0))) * density);
}
`;

// Gargantua: rays are bent by a Schwarzschild-like pull (rs = 1) and pick up the
// accretion disk each time they cross its plane, which gives the lensed arc over the shadow.
export const GARGANTUA = /* glsl */ `${COMMON}
void main() {
  vec2 uv = (gl_FragCoord.xy - uCenter * uRes) / uRes.y;
  // 0..0.82: slow approach while the metrics orbit. 0.84..1: we fall in.
  float p = smoothstep(0.0, 1.0, clamp(uP / 0.82, 0.0, 1.0));
  float k = smoothstep(0.84, 1.0, uP);
  float k2 = k * k;
  float dist = mix(mix(30.0, 13.0, p), 1.6, k2);
  float inc = mix(0.17, 0.075, p) + k * 0.25;
  float yaw = uP * 1.2 + uTime * 0.02 + k2 * 4.0;
  // Space itself winds up around the hole as we cross the horizon.
  uv = rot(k2 * 2.6 / (length(uv) + 0.35)) * uv;
  vec3 ro = dist * vec3(cos(inc) * sin(yaw), sin(inc), cos(inc) * cos(yaw));
  vec3 fw = normalize(-ro);
  vec3 rt = normalize(cross(vec3(0.0, 1.0, 0.0), fw));
  vec3 up = cross(fw, rt);
  float roll = -0.12;
  uv = mat2(cos(roll), -sin(roll), sin(roll), cos(roll)) * uv;
  vec3 rd = normalize(fw * mix(1.6, 0.55, k) + rt * uv.x + up * uv.y);

  vec3 pos = ro, vel = rd;
  vec3 hv = cross(pos, vel);
  float h2 = dot(hv, hv);
  vec3 col = vec3(0.0);
  float tr = 1.0;
  bool captured = false;
  float scale = 96.0 / uSteps;

  for (int i = 0; i < 96; i++) {
    if (float(i) >= uSteps) break;
    float r2 = dot(pos, pos);
    if (r2 < 1.0) { captured = true; break; }
    float r = sqrt(r2);
    float dt = clamp(r * 0.16, 0.05, 1.6) * scale;
    vel += -1.5 * h2 * pos / (r2 * r2 * r) * dt;
    vec3 np = pos + vel * dt;
    if (pos.y * np.y < 0.0) {
      vec3 hit = mix(pos, np, pos.y / (pos.y - np.y));
      float hr = length(hit.xz);
      if (hr > 2.6 && hr < 9.5) {
        float a = atan(hit.z, hit.x) + uTime * 0.9 / hr;
        float streak = fbm(vec2(cos(a), sin(a)) * hr * 0.9 + hr * 1.7);
        float heat = smoothstep(9.5, 2.6, hr);
        float edge = smoothstep(2.6, 3.1, hr);
        vec3 dc = mix(vec3(1.0, 0.33, 0.07), vec3(1.0, 0.93, 0.78), heat * heat);
        // Doppler beaming: the side rotating toward the camera is brighter.
        float dop = 1.0 + 0.7 * dot(normalize(vec3(-hit.z, 0.0, hit.x)), normalize(vel));
        float inten = (0.3 + 1.5 * streak) * heat * edge * dop;
        col += tr * dc * inten * 1.25;
        tr *= 1.0 - clamp(inten, 0.0, 1.0) * 0.85;
      }
    }
    pos = np;
    if (r > 42.0 && dot(pos, vel) > 0.0) break;
  }

  if (!captured) {
    vec3 d = normalize(vel);
    col += tr * vec3(stars3(d, 42.0) + stars3(d, 95.0) * 0.6);
    col += tr * vec3(0.03, 0.04, 0.11) * fbm(d.xy * 3.0 + d.z);
  }
  col = (1.0 - exp(-col * 1.5)) * (1.0 - smoothstep(0.75, 1.0, k));
  gl_FragColor = vec4(col, 1.0);
}
`;

// Wormhole: a lensing sphere showing another galaxy grows until we fall in,
// then a twisting tunnel rushes past toward a bright exit.
export const WORMHOLE = /* glsl */ `${COMMON}
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float p = uP;
  float r = length(uv);
  float a = atan(uv.y, uv.x);

  // Outside: our own stars, pushed outward around the sphere like a lens.
  float R = 0.07 + pow(smoothstep(0.0, 0.5, p), 2.0) * 1.7;
  vec2 luv = uv * (1.0 - 0.45 * R * R / (r * r + 0.02));
  vec3 outside = vec3(stars2(luv * 22.0) + stars2(luv * 47.0 + 9.0) * 0.6);
  outside += vec3(0.02, 0.03, 0.09) * fbm(luv * 2.0);

  // Inside the sphere: the other galaxy, refracted through a ball.
  vec2 n = uv / R;
  float z = sqrt(max(0.0, 1.0 - dot(n, n)));
  vec2 g = n / (z + 0.35) * 1.4 + vec2(uTime * 0.02, p * 2.0);
  vec3 inside = vec3(stars2(g * 13.0) * 1.3 + stars2(g * 29.0 + 4.0) * 0.7);
  inside += fbm(g * 1.8) * vec3(0.16, 0.26, 0.95) * 0.9 + fbm(g * 2.7 + 5.0) * vec3(0.75, 0.2, 0.55) * 0.55;
  inside *= 0.55 + 0.45 * z;

  float mask = smoothstep(R + 0.004, R - 0.004, r);
  float rim = smoothstep(0.05 + R * 0.03, 0.0, abs(r - R));
  vec3 col = mix(outside, inside, mask) + rim * vec3(1.0, 0.82, 0.6) * 0.9;

  // Tunnel takes over once the sphere fills the frame.
  float k = smoothstep(0.42, 0.58, p);
  float depth = 0.4 / (r + 0.05) + uTime * 0.7 + p * 16.0;
  float twist = a + depth * 0.22;
  float n1 = fbm(vec2(cos(twist), sin(twist)) * 2.6 + vec2(0.0, depth * 0.12));
  float n2 = fbm(vec2(cos(twist * 2.0), sin(twist * 2.0)) * 4.0 + depth * 0.3);
  float streaks = pow(n1, 3.0) * 3.2 + pow(n2, 5.0) * 2.0;
  float rings = 0.55 + 0.45 * sin(depth * 5.0);
  vec3 tc = mix(vec3(0.1, 0.22, 0.9), vec3(0.62, 0.2, 0.8), n1) * streaks * rings;
  tc += vec3(1.0, 0.55, 0.3) * pow(n2, 6.0) * 1.5;
  tc *= smoothstep(0.0, 0.3, r) * (0.6 + r);
  col = mix(col, tc, k);

  // Exit light at the far end, then a white-out as we come through.
  float open = smoothstep(0.58, 1.0, p);
  col += exp(-r * mix(11.0, 1.4, open)) * vec3(1.0, 0.9, 0.75) * open * 2.6;
  col = mix(col, vec3(1.0, 0.96, 0.88), smoothstep(0.93, 1.0, p));
  gl_FragColor = vec4(1.0 - exp(-col * 1.4), 1.0);
}
`;

// Tesseract: a lattice of shelf-beams running along all three axes, repeated forever and
// ray-marched, so nearer and farther beams slide past each other with real parallax.
// The camera flies down one channel while rolling; the pointer leans the view.
export const TESSERACT = /* glsl */ `${COMMON}
float bar(vec2 a) { vec2 d = abs(a) - 0.34; return max(d.x, d.y); }
float map(vec3 p) {
  vec3 q = mod(p + 2.0, 4.0) - 2.0;
  return min(bar(q.xy), min(bar(q.yz), bar(q.xz)));
}
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.35 + uP * 30.0;
  vec3 ro = vec3(2.0 + sin(t * 0.13) * 0.55, 2.0 + cos(t * 0.11) * 0.55, t);
  uv = rot(uP * 2.6 + uTime * 0.03) * uv;
  // Very wide lens on entry (still falling), settling as we find our footing.
  vec3 rd = normalize(vec3(uv, mix(0.45, 1.0, smoothstep(0.0, 0.22, uP))));
  rd.yz = rot(cos(uP * 4.0) * 0.28 - uMouse.y * 0.3) * rd.yz;
  rd.xz = rot(sin(uP * 6.283) * 0.55 + uMouse.x * 0.4) * rd.xz;

  float tt = 0.0, d = 1.0, glow = 0.0;
  for (int i = 0; i < 80; i++) {
    if (float(i) >= uSteps) break;
    d = map(ro + rd * tt);
    glow += exp(-tt * 0.09) / (1.0 + d * d * 60.0);
    if (d < 0.002 + tt * 0.0025 || tt > 70.0) break;
    tt += d * 0.92;
  }

  vec3 col = vec3(0.0);
  if (tt < 70.0) {
    vec3 p = ro + rd * tt;
    vec3 q = mod(p + 2.0, 4.0) - 2.0;
    float dxy = bar(q.xy), dyz = bar(q.yz), dxz = bar(q.xz);
    float along; vec2 c2; vec2 lane;
    if (dxy <= dyz && dxy <= dxz) { along = p.z; c2 = q.xy; lane = floor((p.xy + 2.0) / 4.0); }
    else if (dyz <= dxz) { along = p.x; c2 = q.yz; lane = floor((p.yz + 2.0) / 4.0) + 31.0; }
    else { along = p.y; c2 = q.xz; lane = floor((p.xz + 2.0) / 4.0) + 67.0; }
    float face = abs(c2.x) > abs(c2.y) ? sign(c2.x) : 2.0 * sign(c2.y);
    float cellI = floor(along * 5.0);
    float f = fract(along * 5.0);
    float h = hash(vec2(cellI + face * 13.0, lane.x * 7.0 + lane.y * 3.0));
    float spine = smoothstep(0.0, 0.12, f) * smoothstep(1.0, 0.88, f);
    // Position across the face, for the shelf edge lines.
    float across = abs(c2.x) > abs(c2.y) ? c2.y : c2.x;
    float shelf = smoothstep(0.34, 0.3, abs(across));
    vec3 bc = mix(vec3(0.5, 0.24, 0.07), vec3(1.0, 0.72, 0.32), h);
    bc = mix(bc, vec3(0.2, 0.32, 0.95), step(0.9, h));
    bc = mix(bc, vec3(0.9, 0.2, 0.12), step(0.96, h));
    float lit = 0.07 + 0.95 * pow(hash(vec2(cellI * 1.7 + lane.y, face + lane.x)), 3.0);
    lit += 1.2 * smoothstep(0.1, 0.0, abs(fract(along * 0.07 - uTime * 0.12 + h) - 0.5)) * h;
    col = bc * spine * shelf * lit * 1.25;
  }
  col *= exp(-tt * 0.075);
  col += vec3(1.0, 0.7, 0.36) * glow * 0.018;
  // Opens out of the black we fell into.
  col *= smoothstep(0.0, 0.07, uP);
  gl_FragColor = vec4(1.0 - exp(-col * 1.4), 1.0);
}
`;
