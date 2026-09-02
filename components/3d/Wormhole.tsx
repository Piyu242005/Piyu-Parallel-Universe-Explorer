"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 1800;
const RING_COUNT = 9;

function WormholeParticles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const data = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const progress = Math.random();
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.8 + progress * 8 + (Math.random() - 0.5) * 1.2;
      const depth = (Math.random() - 0.5) * 30;
      const index = i * 3;

      data[index] = Math.cos(angle) * radius;
      data[index + 1] = Math.sin(angle) * radius;
      data[index + 2] = depth;
    }

    return data;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z -= delta * 0.16;
    ref.current.rotation.y += delta * 0.025;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.5}
        color="#b8c7ff"
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function EventHorizon() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.035;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <group>
      <mesh ref={ref} rotation={[0, 0, 0]}>
        <torusGeometry args={[2.35, 0.14, 24, 128]} />
        <meshBasicMaterial
          color="#d8ddff"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <circleGeometry args={[2.35, 96]} />
        <meshBasicMaterial color="#010107" transparent opacity={0.96} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function AccretionRing({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const radius = 3.1 + index * 0.72;
  const tilt = -0.18 + index * 0.035;

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * (0.16 - index * 0.008);
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2 + tilt, tilt * 0.5, index * 0.22]}>
      <torusGeometry args={[radius, 0.075 + (RING_COUNT - index) * 0.006, 12, 128]} />
      <meshBasicMaterial
        color={index % 2 === 0 ? "#8f7cff" : "#5cc8ff"}
        transparent
        opacity={0.18 + (RING_COUNT - index) * 0.018}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export function Wormhole() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.025;
    group.current.position.z = -44 + Math.sin(state.clock.elapsedTime * 0.35) * 0.5;
  });

  return (
    <group ref={group} position={[0, 0, -44]} rotation={[0.18, 0, 0.08]}>
      <pointLight color="#8f7cff" intensity={7} distance={30} decay={2} />
      <pointLight color="#55c9ff" intensity={5} distance={22} decay={2} />
      <EventHorizon />
      {Array.from({ length: RING_COUNT }, (_, index) => (
        <AccretionRing key={index} index={index} />
      ))}
      <WormholeParticles />
    </group>
  );
}
