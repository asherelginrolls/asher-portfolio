"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { youtubeSeries, pipeline } from "@/lib/data";

// -----------------------------------------------------------------------------
// The signal field. One luminous line of data is the spine of the whole page.
// Raw three.js, no React reconciler in the loop. A line of points spans the
// viewport and morphs through five states as the page scrolls:
//   0 HORIZON -> 1 GROWTH CURVE -> 2 PIPELINE -> 3 NETWORK -> 4 FLAT
// It breathes on its own and answers the cursor. Bone white, one accent-red
// focal region per state. UnrealBloomPass gives the glow. Capped DPR, one
// connecting line + one points cloud + a dim dust field: cheap anywhere.
// -----------------------------------------------------------------------------

const N = 220; // points along the signal
const AMP = 0.62; // vertical reach in world units
const BASE = -0.06; // resting horizon, a touch below centre

// sample the real youtube 7K->100K series (12 pts) at any u in [0,1]
function sampleSeries(series: number[], u: number): number {
  const x = u * (series.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = series[Math.min(i, series.length - 1)];
  const b = series[Math.min(i + 1, series.length - 1)];
  return a + (b - a) * f;
}

const pipeW = pipeline.map((p) => p.w); // 4 descending stages

// elevation 0..1 for each of the five states at param u in [0,1]
function horizon(u: number, t: number): number {
  return 0.5 + Math.sin(u * 7 + t * 0.6) * 0.012;
}
function curve(u: number): number {
  // real growth shape, eased so the climb reads
  return sampleSeries(youtubeSeries, u);
}
function pipeStep(u: number): number {
  const k = Math.min(pipeW.length - 1, Math.floor(u * pipeW.length));
  return pipeW[k];
}
function network(u: number, t: number): number {
  return (
    0.5 +
    Math.sin(u * Math.PI * 7 + t * 0.9) * 0.16 +
    Math.sin(u * Math.PI * 17 + t * 1.7) * 0.06
  );
}

const STATE_FNS: ((u: number, t: number) => number)[] = [
  horizon,
  (u) => curve(u),
  (u) => pipeStep(u),
  network,
  horizon,
];

// which span of u is the accent focal region, per state
const FOCAL: [number, number][] = [
  [0.97, 1.0], // horizon: far right tip
  [0.86, 1.0], // curve: the 100K summit
  [0.0, 0.25], // pipeline: the lead account
  [0.45, 0.6], // network: the active node
  [0.0, 0.03], // flat: left tip
];

export default function SignalFieldGL() {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    let aspect = mount.clientWidth / Math.max(1, mount.clientHeight);
    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 10);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    mount.appendChild(canvas);

    const bone = new THREE.Color("#edeae0");
    const accent = new THREE.Color("#ff3b12");

    // --- the signal: a connecting line + a points cloud sharing one buffer ---
    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const u = i / (N - 1);
      positions[i * 3] = -aspect + u * 2 * aspect;
      positions[i * 3 + 1] = BASE;
      positions[i * 3 + 2] = 0;
      bone.toArray(colors, i * 3);
    }
    const geo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(positions, 3);
    const colAttr = new THREE.BufferAttribute(colors, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    colAttr.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute("position", posAttr);
    geo.setAttribute("color", colAttr);

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
    });
    const line = new THREE.Line(geo, lineMat);
    scene.add(line);

    const dotMat = new THREE.PointsMaterial({
      vertexColors: true,
      size: 3.2,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dots = new THREE.Points(geo, dotMat);
    scene.add(dots);

    // --- dim dust for depth ---
    const DUST = 220;
    const dustPos = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      dustPos[i * 3] = (Math.random() * 2 - 1) * aspect * 1.1;
      dustPos[i * 3 + 1] = (Math.random() * 2 - 1) * 1.05;
      dustPos[i * 3 + 2] = -0.5;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x6f6c63,
      size: 1.5,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // --- postprocessing: a restrained bloom is the whole "luminous" trick ---
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(mount.clientWidth, mount.clientHeight),
      0.9, // strength
      0.7, // radius
      0.2 // threshold
    );
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    // --- cursor (world x, smoothed) ---
    let cursorX = 0;
    let cursorTargetX = -10; // offscreen until first move
    const onPointer = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      cursorTargetX = nx * aspect;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const resize = () => {
      const w = Math.max(1, mount.clientWidth);
      const h = Math.max(1, mount.clientHeight);
      aspect = w / h;
      camera.left = -aspect;
      camera.right = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
      for (let i = 0; i < N; i++) {
        positions[i * 3] = -aspect + (i / (N - 1)) * 2 * aspect;
      }
      posAttr.needsUpdate = true;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const tmp = new THREE.Color();
    const clock = new THREE.Clock();
    let raf = 0;

    const compute = () => {
      const t = clock.getElapsedTime();
      const p = progressRef.current; // 0..1 down the page
      cursorX += (cursorTargetX - cursorX) * 0.06;

      // pick the two states we are between and the local blend
      const seg = Math.min(3.999, p * 4);
      const s0 = Math.floor(seg);
      const s1 = Math.min(4, s0 + 1);
      const lt = seg - s0;
      const ease = lt * lt * (3 - 2 * lt); // smoothstep

      const [fa0, fa1] = FOCAL[s0];
      const [fb0, fb1] = FOCAL[s1];

      for (let i = 0; i < N; i++) {
        const u = i / (N - 1);
        const eA = STATE_FNS[s0](u, t);
        const eB = STATE_FNS[s1](u, t);
        const e = eA + (eB - eA) * ease;
        let y = BASE + (e - 0.5) * 2 * AMP;

        // cursor displacement: a soft swell that trails the pointer
        const dx = positions[i * 3] - cursorX;
        y += Math.exp(-(dx * dx) / 0.012) * 0.14;

        positions[i * 3 + 1] = y;

        // focal accent: blend membership of the two states' focal spans
        const inA = u >= fa0 && u <= fa1 ? 1 : 0;
        const inB = u >= fb0 && u <= fb1 ? 1 : 0;
        const acc = inA * (1 - ease) + inB * ease;
        tmp.copy(bone).lerp(accent, acc);
        tmp.toArray(colors, i * 3);
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      dust.rotation.z = Math.sin(t * 0.04) * 0.04;
      dustMat.opacity = 0.4 + Math.sin(t * 0.5) * 0.1;
    };

    // paint one frame synchronously so the field is never blank on load
    compute();
    composer.render();

    const loop = () => {
      compute();
      composer.render();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      ro.disconnect();
      geo.dispose();
      dustGeo.dispose();
      lineMat.dispose();
      dotMat.dispose();
      dustMat.dispose();
      bloom.dispose();
      composer.dispose();
      renderer.dispose();
      if (canvas.parentElement) canvas.parentElement.removeChild(canvas);
    };
  }, []);

  // track page scroll progress without re-rendering React
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
