"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

// Banded gas-giant texture drawn once on a canvas; no image assets to ship.
const PALETTES = {
  blue: ["#0a1240", "#1d3fbf", "#2f55d8", "#14287a", "#6f86ea", "#1d3fbf", "#0f1b5c", "#3a5fe0", "#0a1240"],
  red: ["#3a0a06", "#a3200f", "#d4291a", "#7a1a0c", "#e8653a", "#b8301a", "#5a1208", "#d44a2a", "#3a0a06"],
};

function planetTexture(THREE: typeof import("three"), bands: string[]) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const g = c.getContext("2d")!;
  bands.forEach((col, i) => {
    g.fillStyle = col;
    g.fillRect(0, (i * c.height) / bands.length, c.width, c.height / bands.length + 1);
  });
  for (let i = 0; i < 900; i++) {
    g.fillStyle = `rgba(255,255,255,${Math.random() * 0.06})`;
    g.fillRect(Math.random() * c.width, Math.random() * c.height, 40 + Math.random() * 120, 1 + Math.random() * 3);
  }
  g.fillStyle = "rgba(212,41,26,0.55)";
  g.beginPath();
  g.ellipse(340, 150, 34, 14, 0, 0, Math.PI * 2);
  g.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildShip(THREE: typeof import("three")) {
  const ship = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: 0xf2f1ec, roughness: 0.4, metalness: 0.3 });
  const red = new THREE.MeshStandardMaterial({ color: 0xd4291a, roughness: 0.5 });
  // Built along +Z so Object3D.lookAt points the nose forward.
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 0.8, 20).rotateX(Math.PI / 2), white);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.32, 20).rotateX(Math.PI / 2), red);
  nose.position.z = 0.56;
  ship.add(body, nose);
  for (let i = 0; i < 3; i++) {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.22, 0.24), red);
    const a = (i / 3) * Math.PI * 2;
    fin.position.set(Math.cos(a) * 0.17, Math.sin(a) * 0.17, -0.3);
    fin.rotation.z = a + Math.PI / 2;
    ship.add(fin);
  }
  const flame = new THREE.Mesh(
    new THREE.ConeGeometry(0.11, 0.45, 16).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: 0xffb347, transparent: true, opacity: 0.85 }),
  );
  flame.position.z = -0.62;
  ship.add(flame);
  const glow = new THREE.PointLight(0xff8a3d, 3, 3);
  glow.position.z = -0.7;
  ship.add(glow);
  ship.scale.setScalar(1.25);
  return { ship, flame };
}

export default function OrbitScene({ progress, variant = "orbit" }: { progress: MotionValue<number>; variant?: "orbit" | "descent" }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      const el = host.current;
      if (disposed || !el) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      el.appendChild(renderer.domElement);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      scene.add(new THREE.AmbientLight(0x5060a0, 0.5));
      const sun = new THREE.DirectionalLight(0xffffff, 2.4);
      sun.position.set(-6, 3, 5);
      scene.add(sun);

      const planet = new THREE.Mesh(
        new THREE.SphereGeometry(2, 64, 64),
        new THREE.MeshStandardMaterial({ map: planetTexture(THREE, PALETTES[variant === "orbit" ? "blue" : "red"]), roughness: 0.85 }),
      );
      planet.rotation.z = 0.25;
      scene.add(planet);
      scene.add(
        new THREE.Mesh(
          new THREE.SphereGeometry(2.18, 64, 64),
          new THREE.MeshBasicMaterial({ color: variant === "orbit" ? 0x4f7bff : 0xff6a4a, transparent: true, opacity: 0.16, side: THREE.BackSide }),
        ),
      );
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(2.7, 3.3, 128),
        new THREE.MeshBasicMaterial({ color: 0xff8a78, transparent: true, opacity: 0.22, side: THREE.DoubleSide }),
      );
      ring.rotation.x = Math.PI / 2.25;
      scene.add(ring);

      // Tilted orbit the ship follows.
      const orbit = new THREE.Group();
      orbit.rotation.set(0.38, 0, -0.18);
      scene.add(orbit);
      const R = 4.1;
      const pts = Array.from({ length: 161 }, (_, i) => {
        const a = (i / 160) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(a) * R, 0, Math.sin(a) * R);
      });
      const path = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineDashedMaterial({ color: 0xf2f1ec, dashSize: 0.12, gapSize: 0.14, transparent: true, opacity: 0.45 }),
      );
      path.computeLineDistances();
      orbit.add(path);

      const { ship, flame } = buildShip(THREE);
      orbit.add(ship);
      const ahead = new THREE.Vector3();

      const resize = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      let raf = 0;
      let visible = false;
      const tick = (t: number) => {
        const p = progress.get();
        // orbit: 1.25 laps in front of the planet. descent: spiral in toward the surface.
        const descent = variant === "descent";
        const r = descent ? R + 1.2 - p * 3 : R;
        const lift = descent ? (1 - p) * 1.6 : 0;
        const a = Math.PI / 2 + p * Math.PI * (descent ? 3 : 2.5);
        ship.position.set(Math.cos(a) * r, lift + Math.sin(t / 700) * 0.05, Math.sin(a) * r);
        ahead.set(Math.cos(a + 0.05) * r, lift - (descent ? 0.02 : 0), Math.sin(a + 0.05) * r);
        ship.lookAt(orbit.localToWorld(ahead.clone()));
        ship.rotateZ(Math.sin(t / 500) * 0.2);
        flame.scale.z = 0.8 + Math.sin(t / 60) * 0.2;
        planet.rotation.y = t / 9000 + p * 2;
        if (descent) camera.position.set(Math.sin(p * Math.PI) * 1.5, 2.6 - p * 1.4, 13 - p * 4.5);
        else camera.position.set(Math.sin(p * Math.PI) * 2.2, 1.6 + p * 1, 13 - p * 1.5);
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
        renderer.dispose();
        el.removeChild(renderer.domElement);
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [progress, variant]);

  return <div ref={host} aria-hidden className="absolute inset-0" />;
}
