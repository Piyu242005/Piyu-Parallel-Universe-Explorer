"use client";

import { useMemo } from "react";
import * as THREE from "three";

const STAR_COUNT = 7000;

export function StarField() {
  const positions = useMemo(() => {
    const data = new Float32Array(STAR_COUNT * 3);
    const radius = 90;

    for (let i = 0; i < STAR_COUNT; i += 1) {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const index = i * 3;

      data[index] = r * Math.sin(phi) * Math.cos(theta);
      data[index + 1] = r * Math.cos(phi);
      data[index + 2] = r * Math.sin(phi) * Math.sin(theta);
    }

    return data;
  }, []);

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={STAR_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        vertexColors={false}
        color={new THREE.Color("#ffffff")}
      />
    </points>
  );
}
