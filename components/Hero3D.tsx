"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { youtubeSeries, instagramSeries, pipeline } from "@/lib/data";

// -----------------------------------------------------------------------------
// The 3D data instrument, in raw three.js (no React reconciler in the loop).
// A single row of matte, hard-edged bars encoding Asher's real numbers, morphing
// between three states: 0 YouTube 7K->100K, 1 Instagram 10K->107K, 2 $1M pipeline.
// Slow auto-float + cursor parallax. Capped DPR, ~12 meshes: cheap anywhere.
// -----------------------------------------------------------------------------

const COUNT = 12;
const GAP = 0.56;
const BAR_W = 0.4;
const BAR_D = 0.4;
const MAX_H = 2.7;
const BASE_H = 0.08;

const pipelineBars: number[] = pipeline.flatMap((d) => [d.w, d.w, d.w]);
const STATES: number[][] = [youtubeSeries, instagramSeries, pipelineBars];
const ACCENTS: boolean[][] = [
  Array.from({ length: COUNT }, (_, i) => i >= COUNT - 2),
  Array.from({ length: COUNT }, (_, i) => i >= COUNT - 2),
  Array.from({ length: COUNT }, (_, i) => i < 3),
];

export default function Hero3D({ view }: { view: number }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef(view);
  viewRef.current = view;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 1.45, 6.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    mount.appendChild(canvas);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(5, 9, 6);
    scene.add(key);
    const warm = new THREE.DirectionalLight(0xff7a5c, 0.45);
    warm.position.set(-6, 3, -4);
    scene.add(warm);

    const grid = new THREE.GridHelper(16, 16, 0x4a463a, 0x2a2820);
    grid.position.y = -1.05;
    scene.add(grid);

    const group = new THREE.Group();
    group.position.y = -1.05;
    scene.add(group);

    const geo = new THREE.BoxGeometry(BAR_W, 1, BAR_D);
    const edgeGeo = new THREE.EdgesGeometry(geo);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x0b0b0b });
    const paper = new THREE.Color("#e7e3d8");
    const accent = new THREE.Color("#ff3b12");
    const emAccent = new THREE.Color("#ff3b12").multiplyScalar(0.4);
    const emOff = new THREE.Color(0x000000);

    const bars: THREE.Mesh[] = [];
    const mats: THREE.MeshStandardMaterial[] = [];
    for (let i = 0; i < COUNT; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: paper.clone(),
        roughness: 0.82,
        metalness: 0.08,
      });
      // pre-tint the focal bars so the very first paint already shows the accent
      if (ACCENTS[0][i]) {
        mat.color.copy(accent);
        mat.emissive.copy(emAccent);
      }
      const m = new THREE.Mesh(geo, mat);
      const x = (i - (COUNT - 1) / 2) * GAP;
      const initH = BASE_H + STATES[0][i] * MAX_H;
      m.position.set(x, initH / 2, 0);
      m.scale.y = initH;
      m.add(new THREE.LineSegments(edgeGeo, edgeMat));
      group.add(m);
      bars.push(m);
      mats.push(mat);
    }

    let px = 0;
    let py = 0;
    const onPointer = (e: PointerEvent) => {
      px = (e.clientX / window.innerWidth) * 2 - 1;
      py = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const resize = () => {
      const r = mount.getBoundingClientRect();
      const w = Math.max(1, Math.floor(r.width));
      const h = Math.max(1, Math.floor(r.height));
      renderer.setSize(w, h, false);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Paint one frame synchronously so the instrument is visible immediately,
    // even if the tab loads in the background (where rAF is paused).
    renderer.render(scene, camera);

    const tmp = new THREE.Color();
    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      const t = clock.getElapsedTime();
      group.rotation.y = Math.sin(t * 0.18) * 0.32 + px * 0.3;
      group.rotation.x = -0.14 + -py * 0.07;
      const heights = STATES[viewRef.current];
      const acc = ACCENTS[viewRef.current];
      for (let i = 0; i < bars.length; i++) {
        const m = bars[i];
        const target = BASE_H + heights[i] * MAX_H;
        const next = m.scale.y + (target - m.scale.y) * 0.09;
        m.scale.y = next;
        m.position.y = next / 2;
        const mat = mats[i];
        mat.color.lerp(acc[i] ? accent : paper, 0.09);
        tmp.copy(acc[i] ? emAccent : emOff);
        mat.emissive.lerp(tmp, 0.09);
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      ro.disconnect();
      mats.forEach((m) => m.dispose());
      edgeMat.dispose();
      edgeGeo.dispose();
      geo.dispose();
      renderer.dispose();
      if (canvas.parentElement) canvas.parentElement.removeChild(canvas);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
