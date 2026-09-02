"use client";

import { useMemo } from "react";
import * as THREE from "three";

const GALAXY_COUNT = 1800;

export function Galaxy() {
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(GALAXY_COUNT * 3);
    const colors = new Float32Array(GALAXY_COUNT * 3);
    const color = new THREE.Color();

    for (let i = 0; i < GALAXY_COUNT; i += 1) {
      const progress = Math.random();
      const radius = Math.pow(progress, 0.65) * 18;
      const arm = (Math.floor(Math.random() * 4) / 4) * Math.PI * 2;
      const twist = progress * Math.PI * 3.8;
      const angle = arm + twist + (Math.random() - 0.5) * 0.7;
      const index = i * 3;

      positions[index] = Math.cos(angle) * radius;
      positions[index + 1] = (Math.random() - 0.5) * (0.8 + radius * 0.06);
      positions[index + 2] = Math.sin(angle) * radius;

      color.setHSL(0.08 + Math.random() * 0.1, 0.7, 0.45 + Math.random() * 0.4);
      colors[index] = color.r;
      colors[index + 1] = color.g;
      colors[index + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  return (
    <group position={[34, 9, -55]} rotation={[0.4, -0.7, 0.2]} scale={0.65}>
      <points frustumCulled={false}>
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
          size={0.24}
          sizeAttenuation
          transparent
          opacity={0.8}
          vertexColors
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh>
        <sphereGeometry args={[1.8, 24, 24]} />
        <meshBasicMaterial
          color="#fff1dc"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
