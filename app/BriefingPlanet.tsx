"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import { buildShip } from "./OrbitScene";

export interface PlanetLabel {
  title: string;
  tools: string[];
  short: string;
}

const BANDS = ["#0a1240", "#1d3fbf", "#2f55d8", "#14287a", "#4462dc", "#1d3fbf", "#0f1b5c", "#3a5fe0", "#0a1240"];
const RADIUS = 2.4;
const EXPLODE_AT = 0.86; // progress where the planet bursts

const cssFont = (v: string, fallback: string) =>
  (getComputedStyle(document.documentElement).getPropertyValue(v).trim() || fallback).replace(/;$/, "");

function wrap(g: CanvasRenderingContext2D, text: string, width: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (g.measureText(next).width > width && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

function planetTexture() {
  const c = document.createElement("canvas");
  c.width = 2048;
  c.height = 1024;
  const g = c.getContext("2d")!;
  BANDS.forEach((col, i) => {
    g.fillStyle = col;
    g.fillRect(0, (i * c.height) / BANDS.length, c.width, c.height / BANDS.length + 1);
  });
  for (let i = 0; i < 1400; i++) {
    g.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`;
    g.fillRect(Math.random() * c.width, Math.random() * c.height, 40 + Math.random() * 160, 1 + Math.random() * 3);
  }
  return c;
}

// One transparent "hologram" sheet per step: text only, soft dark halo for legibility.
const LABEL_W = 1024;
const LABEL_H = 512;
function labelTexture(l: PlanetLabel, i: number, n: number) {
  const c = document.createElement("canvas");
  c.width = LABEL_W;
  c.height = LABEL_H;
  const g = c.getContext("2d")!;
  const halo = g.createRadialGradient(LABEL_W / 2, LABEL_H / 2, 40, LABEL_W / 2, LABEL_H / 2, LABEL_W / 2);
  halo.addColorStop(0, "rgba(5,6,10,0.55)");
  halo.addColorStop(1, "rgba(5,6,10,0)");
  g.fillStyle = halo;
  g.fillRect(0, 0, LABEL_W, LABEL_H);

  const hangul = cssFont("--font-hangul", "sans-serif");
  const mono = cssFont("--font-mono", "monospace");
  const body = '"Pretendard Variable", Pretendard, sans-serif';
  g.textAlign = "center";
  g.shadowColor = "rgba(0,0,0,0.6)";
  g.shadowBlur = 12;

  g.fillStyle = "#ff8a78";
  g.font = `500 28px ${mono}`;
  g.fillText(`${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`, LABEL_W / 2, 96);

  g.fillStyle = "#ffffff";
  g.font = `80px ${hangul}`;
  g.fillText(l.title, LABEL_W / 2, 186);

  g.fillStyle = "rgba(242,241,236,0.8)";
  g.font = `500 26px ${mono}`;
  g.fillText(l.tools.join("  ·  "), LABEL_W / 2, 238);

  g.fillStyle = "#ffffff";
  g.font = `600 40px ${body}`;
  wrap(g, l.short, 820).forEach((line, k) => g.fillText(line, LABEL_W / 2, 318 + k * 56));
  return c;
}

export default function BriefingPlanet({
  progress,
  form,
  labels,
  flash,
}: {
  progress: MotionValue<number>;
  form: MotionValue<number>; // 0→1: debris from the warp burst condenses into the planet
  labels: PlanetLabel[];
  flash: React.RefObject<HTMLDivElement>;
}) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    const fontsReady = Promise.all(
      labels.flatMap((l) => [
        document.fonts.load('600 40px "Pretendard Variable"', l.short),
        document.fonts.load(`64px ${cssFont("--font-hangul", "sans-serif")}`, l.title),
      ]),
    ).catch(() => undefined);

    Promise.all([import("three"), fontsReady]).then(([THREE]) => {
      const el = host.current;
      if (disposed || !el) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);
      scene.add(new THREE.AmbientLight(0x8090c0, 1.1));
      const sun = new THREE.DirectionalLight(0xffffff, 1.6);
      sun.position.set(-3, 2, 8);
      scene.add(sun);

      const tex = new THREE.CanvasTexture(planetTexture());
      tex.colorSpace = THREE.SRGBColorSpace;
      const planetMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9, emissive: new THREE.Color(0xff5a2a), emissiveIntensity: 0 });
      const planet = new THREE.Mesh(new THREE.SphereGeometry(RADIUS, 96, 96), planetMat);
      scene.add(planet);
      const atmo = new THREE.Mesh(
        new THREE.SphereGeometry(RADIUS * 1.07, 64, 64),
        new THREE.MeshBasicMaterial({ color: 0x4f7bff, transparent: true, opacity: 0.15, side: THREE.BackSide }),
      );
      scene.add(atmo);

      // Curved sheets hugging the planet's front face, one per step.
      const n = labels.length;
      const ARC = 1.25;
      const sheets = labels.map((l, i) => {
        const t = new THREE.CanvasTexture(labelTexture(l, i, n));
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = renderer.capabilities.getMaxAnisotropy();
        const r = RADIUS * 1.03;
        const mesh = new THREE.Mesh(
          new THREE.CylinderGeometry(r, r, (r * ARC) / 2, 48, 1, true, -ARC / 2, ARC),
          new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, opacity: 0 }),
        );
        scene.add(mesh);
        return mesh;
      });

      // Shallow orbit: the ship crosses in front of the planet, then disappears behind it.
      const orbit = new THREE.Group();
      orbit.rotation.set(0.3, 0, -0.2);
      scene.add(orbit);
      const R = RADIUS * 1.6;
      const ring = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
          Array.from({ length: 161 }, (_, i) => {
            const a = (i / 160) * Math.PI * 2;
            return new THREE.Vector3(Math.cos(a) * R, 0, Math.sin(a) * R);
          }),
        ),
        new THREE.LineDashedMaterial({ color: 0xf2f1ec, dashSize: 0.12, gapSize: 0.14, transparent: true, opacity: 0.4 }),
      );
      ring.computeLineDistances();
      orbit.add(ring);
      const { ship, flame } = buildShip(THREE);
      orbit.add(ship);
      const ahead = new THREE.Vector3();

      // Debris for the burst, sampled on the sphere surface.
      const COUNT = 6000;
      const dirs = new Float32Array(COUNT * 3);
      const pos = new Float32Array(COUNT * 3);
      const col = new Float32Array(COUNT * 3);
      const palette = ["#f2f1ec", "#ff8a78", "#d4291a", "#4462dc", "#ffb347"].map((h) => new THREE.Color(h));
      for (let i = 0; i < COUNT; i++) {
        const v = new THREE.Vector3().randomDirection();
        dirs.set([v.x, v.y, v.z], i * 3);
        const c = palette[i % palette.length];
        col.set([c.r, c.g, c.b], i * 3);
      }
      const debrisGeo = new THREE.BufferGeometry();
      debrisGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      debrisGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
      const dot = document.createElement("canvas");
      dot.width = dot.height = 64;
      const dg = dot.getContext("2d")!;
      const grad = dg.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.4, "rgba(255,255,255,0.6)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      dg.fillStyle = grad;
      dg.fillRect(0, 0, 64, 64);
      const debrisMat = new THREE.PointsMaterial({
        size: 0.13,
        map: new THREE.CanvasTexture(dot),
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const debris = new THREE.Points(debrisGeo, debrisMat);
      debris.visible = false;
      scene.add(debris);
      const speeds = Float32Array.from({ length: COUNT }, () => 0.4 + Math.random() * 1.6);

      const shock = new THREE.Mesh(
        new THREE.RingGeometry(0.9, 1, 128),
        new THREE.MeshBasicMaterial({ color: 0xffb347, transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }),
      );
      scene.add(shock);

      let baseZ = 9;
      const resize = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // Keep the planet ~68% of the shorter side.
        const fit = (RADIUS * 2) / 0.68 / (2 * Math.tan((camera.fov * Math.PI) / 360));
        baseZ = camera.aspect < 1 ? fit / camera.aspect : fit;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const smooth = (x: number) => x * x * (3 - 2 * x);
      const clamp = (x: number) => Math.min(1, Math.max(0, x));

      let raf = 0;
      let visible = false;
      const tick = (t: number) => {
        const p = progress.get();
        const f = form.get();
        const born = smooth(clamp((f - 0.45) / 0.55)); // planet body fades/grows in once debris has gathered

        // Dwell on each label, turn quickly between them.
        const s = clamp(p / 0.8) * (n - 1);
        const i = Math.min(n - 2, Math.floor(s));
        const step = i + smooth(clamp((s - i - 0.3) / 0.4));
        planet.rotation.y = (-2 * Math.PI * step) / n;

        // Build-up then burst.
        const grow = clamp((p - 0.8) / (EXPLODE_AT - 0.8));
        const burst = clamp((p - EXPLODE_AT) / (1 - EXPLODE_AT));
        const swell = 1 + smooth(grow) * 0.35;
        sheets.forEach((m, k) => {
          const d = k - step;
          (m.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity = burst > 0 ? 0 : Math.max(0, 1 - Math.abs(d) * 2.2) * (1 - grow);
          m.rotation.y = d * 0.9; // slides with the planet's spin
          m.scale.setScalar(swell);
        });
        planet.scale.setScalar(swell * (0.6 + 0.4 * born));
        atmo.scale.setScalar(swell * (0.6 + 0.4 * born));
        planetMat.emissiveIntensity = grow * 0.9 + (1 - born) * (f > 0.45 ? 1.2 : 0);
        planetMat.transparent = born < 1;
        planetMat.opacity = born;
        planet.visible = atmo.visible = burst === 0 && born > 0;
        sheets.forEach((m) => ((m.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity *= born ** 4));

        debris.visible = burst > 0 || (f > 0 && f < 1);
        if (burst === 0 && f < 1) {
          // Reverse burst: debris falls inward from far out and settles on the surface.
          const k = smooth(clamp(f / 0.7));
          for (let j = 0; j < COUNT; j++) {
            const d = RADIUS * (1 + (1 - k) * speeds[j] * 6);
            pos[j * 3] = dirs[j * 3] * d;
            pos[j * 3 + 1] = dirs[j * 3 + 1] * d;
            pos[j * 3 + 2] = dirs[j * 3 + 2] * d;
          }
          debrisGeo.attributes.position.needsUpdate = true;
          debrisMat.opacity = Math.min(1, f * 4) * (1 - born);
        } else if (burst > 0) {
          const k = 1 - Math.pow(1 - burst, 3);
          for (let j = 0; j < COUNT; j++) {
            const d = RADIUS * swell * (1 + k * speeds[j] * 2.4);
            pos[j * 3] = dirs[j * 3] * d;
            pos[j * 3 + 1] = dirs[j * 3 + 1] * d;
            pos[j * 3 + 2] = dirs[j * 3 + 2] * d;
          }
          debrisGeo.attributes.position.needsUpdate = true;
          debrisMat.opacity = 1 - burst * 0.75;
        }
        shock.scale.setScalar(RADIUS * (1 + burst * 7));
        (shock.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity = burst > 0 ? (1 - burst) * 0.8 : 0;
        if (flash.current) flash.current.style.opacity = String(burst > 0 ? Math.max(0, 1 - burst * 2.5) * 0.7 : grow * 0.12);

        const a = Math.PI / 2 + p * Math.PI * 3;
        ship.visible = ring.visible = burst === 0 && born === 1;
        ship.position.set(Math.cos(a) * R, 0, Math.sin(a) * R);
        ahead.set(Math.cos(a + 0.05) * R, 0, Math.sin(a + 0.05) * R);
        ship.lookAt(orbit.localToWorld(ahead.clone()));
        flame.scale.z = 0.8 + Math.sin(t / 60) * 0.2;

        const shake = grow > 0 && burst < 0.3 ? (Math.random() - 0.5) * 0.06 * (grow + burst) : 0;
        camera.position.set(shake, 0.15 + shake, baseZ - grow * 0.8);
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
        if (visible) raf = requestAnimationFrame(tick);
      };
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(tick);
      });
      io.observe(el);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        tex.dispose();
        renderer.dispose();
        el.removeChild(renderer.domElement);
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [progress, form, labels, flash]);

  return <div ref={host} aria-hidden className="absolute inset-0" />;
}
