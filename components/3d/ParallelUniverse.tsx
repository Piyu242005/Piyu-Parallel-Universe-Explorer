"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const STAR_COUNT = 2600;
const GALAXY_COUNT = 7;

function AlternateStars() {
  const positions = useMemo(() => {
    const data = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i += 1) {
      const r = 22 + Math.random() * 70;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const index = i * 3;
      data[index] = r * Math.sin(phi) * Math.cos(theta);
      data[index + 1] = r * Math.cos(phi);
      data[index + 2] = r * Math.sin(phi) * Math.sin(theta) - 70;
    }
    return data;
  }, []);

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.11} sizeAttenuation transparent opacity={0.75} color="#d9e4ff" depthWrite={false} />
    </points>
  );
}

function UniverseGalaxy({ index }: { index: number }) {
  const ref = useRef<THREE.Group>(null);
  const position = useMemo(() => {
    const angle = (index / GALAXY_COUNT) * Math.PI * 2;
    const distance = 13 + (index % 3) * 7;
    return [Math.cos(angle) * distance, Math.sin(index * 1.7) * 7, -55 - Math.sin(angle) * distance] as const;
  }, [index]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * (0.025 + index * 0.003);
    ref.current.rotation.y += delta * 0.012;
  });

  const points = useMemo(() => {
    const data = new Float32Array(380 * 3);
    for (let i = 0; i < 380; i += 1) {
      const p = Math.random();
      const radius = Math.pow(p, 0.7) * 4.5;
      const angle = p * Math.PI * 5.5 + (Math.random() - 0.5) * 0.7;
      const j = i * 3;
      data[j] = Math.cos(angle) * radius;
      data[j + 1] = (Math.random() - 0.5) * (0.35 + radius * 0.08);
      data[j + 2] = Math.sin(angle) * radius;
    }
    return data;
  }, []);

  return (
    <group ref={ref} position={position} scale={0.35 + (index % 3) * 0.12} rotation={[0.4, index * 0.6, 0.2]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.16} sizeAttenuation transparent opacity={0.7} color={index % 2 ? "#8d7cff" : "#63d8ff"} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color="#f4eaff" transparent opacity={0.65} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function DimensionalLens() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
    ref.current.scale.setScalar(pulse);
    ref.current.rotation.z = state.clock.elapsedTime * 0.08;
  });

  return (
    <mesh ref={ref} position={[0, 0, -30]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[7.5, 0.045, 16, 160]} />
      <meshBasicMaterial color="#7b6cff" transparent opacity={0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

export function ParallelUniverse() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.008;
    ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.8;
  });

  return (
    <group ref={ref}>
      <AlternateStars />
      <DimensionalLens />
      {Array.from({ length: GALAXY_COUNT }, (_, index) => <UniverseGalaxy key={index} index={index} />)}
      <pointLight color="#756bff" intensity={3} distance={80} decay={2} position={[0, 2, -38]} />
      <pointLight color="#58d5ff" intensity={2} distance={55} decay={2} position={[10, -4, -52]} />
    </group>
  );
}
