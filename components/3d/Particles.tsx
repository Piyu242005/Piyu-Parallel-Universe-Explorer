"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 900;

export function Particles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const data = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const index = i * 3;
      data[index] = (Math.random() - 0.5) * 70;
      data[index + 1] = (Math.random() - 0.5) * 45;
      data[index + 2] = (Math.random() - 0.5) * 80;
    }

    return data;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.006;
    ref.current.rotation.x += delta * 0.002;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.3}
        color="#9ec9ff"
        depthWrite={false}
      />
    </points>
  );
}
