"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { PARAMS, ELEV, lerp, smoothstep } from "@/lib/signalStates";
import { buildScore, sampleScore, type Score } from "@/lib/signalScore";

// -----------------------------------------------------------------------------
// The signal field. One luminous line is the spine of the page, and its motion
// is the narration: it holds a calm horizon through the media years, climbs
// the real 7K->100K curve through the growth act, steps down the enterprise
// pipeline, resolves into one steady system wave, then settles to a quiet
// floor. The choreography is driven by which tagged section sits under the
// viewport anchor (lib/signalScore), never by the mouse. Raw three.js, one
// shared buffer for line + points, restrained UnrealBloom for the glow.
// -----------------------------------------------------------------------------

const N = 220; // points along the signal

export default function SignalFieldGL() {
  const mountRef = useRef<HTMLDivElement>(null);

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
      positions[i * 3 + 1] = PARAMS[0].base;
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
      opacity: PARAMS[0].opacity,
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

    // --- still dust for depth; it does not move, it is not the story ---
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
      opacity: 0.3,
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
      PARAMS[0].bloom, // strength, lerped per state
      0.5, // radius
      0.35 // threshold
    );
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    // --- the score: which shape belongs at which scroll position ---
    let score: Score = [];
    const remeasure = () => {
      score = buildScore();
    };
    remeasure();
    // content height changes (act reveals do not affect layout, but route
    // back-navigation, font swaps, and viewport changes all do)
    const bodyRo = new ResizeObserver(remeasure);
    bodyRo.observe(document.body);
    window.addEventListener("resize", remeasure, { passive: true });
    if (document.fonts?.ready) {
      document.fonts.ready.then(remeasure).catch(() => undefined);
    }

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
    // smoothed scroll position: Lenis already smooths wheel input, this only
    // absorbs anchor-link teleports so the line glides instead of snapping
    let smoothY = window.scrollY;

    const compute = () => {
      const t = clock.getElapsedTime();
      smoothY += (window.scrollY - smoothY) * 0.14;

      const { s0, s1, e } = sampleScore(score, smoothY);
      const A = PARAMS[s0];
      const B = PARAMS[s1];

      const base = lerp(A.base, B.base, e);
      const amp = lerp(A.amp, B.amp, e);
      const f0 = lerp(A.focal[0], B.focal[0], e);
      const f1 = lerp(A.focal[1], B.focal[1], e);

      lineMat.opacity = lerp(A.opacity, B.opacity, e);
      dotMat.opacity = lerp(A.opacity, B.opacity, e) + 0.4;
      bloom.strength = lerp(A.bloom, B.bloom, e);

      for (let i = 0; i < N; i++) {
        const u = i / (N - 1);
        const eA = ELEV[s0](u, t);
        const eB = ELEV[s1](u, t);
        const elev = eA + (eB - eA) * e;
        positions[i * 3 + 1] = base + (elev - 0.5) * 2 * amp;

        // one travelling accent region with soft edges; its endpoints lerp
        // with the same ease as the shape, so the highlight rides the story
        const acc =
          smoothstep(f0 - 0.04, f0, u) * (1 - smoothstep(f1, f1 + 0.04, u));
        tmp.copy(bone).lerp(accent, acc);
        tmp.toArray(colors, i * 3);
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
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
      window.removeEventListener("resize", remeasure);
      bodyRo.disconnect();
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

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
