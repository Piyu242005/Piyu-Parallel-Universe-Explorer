"use client";

import { useMemo } from "react";
import * as THREE from "three";

const NEBULA_COUNT = 1200;

export function Nebula() {
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(NEBULA_COUNT * 3);
    const colors = new Float32Array(NEBULA_COUNT * 3);
    const color = new THREE.Color();

    for (let i = 0; i < NEBULA_COUNT; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 10 + Math.pow(Math.random(), 2) * 24;
      const spread = (Math.random() - 0.5) * 7;
      const index = i * 3;

      positions[index] = Math.cos(angle) * radius;
      positions[index + 1] = spread + Math.sin(angle * 3) * 1.5;
      positions[index + 2] = Math.sin(angle) * radius - 12;

      color.setHSL(0.69 + Math.random() * 0.08, 0.85, 0.4 + Math.random() * 0.25);
      colors[index] = color.r;
      colors[index + 1] = color.g;
      colors[index + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  return (
    <points rotation={[0.25, 0, -0.35]} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.7}
        sizeAttenuation
        transparent
        opacity={0.16}
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
