"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const CRYSTAL_COUNT = 90;
const PARTICLE_COUNT = 900;

function AlienTerrain() {
  const mesh = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(5.2, 5);
    const position = geo.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < position.count; i += 1) {
      vertex.fromBufferAttribute(position, i);
      const n =
        Math.sin(vertex.x * 1.7) * 0.22 +
        Math.sin(vertex.y * 2.3) * 0.16 +
        Math.cos(vertex.z * 2.1) * 0.2;
      vertex.normalize().multiplyScalar(5.2 + n);
      position.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    position.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.025;
    mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.015;
  });

  return (
    <mesh ref={mesh} geometry={geometry} position={[0, -3.8, -78]} receiveShadow>
      <meshStandardMaterial color="#17252b" roughness={0.92} metalness={0.04} />
    </mesh>
  );
}

function Atmosphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.65) * 0.025;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref} position={[0, -3.8, -78]} scale={1.16}>
      <sphereGeometry args={[5.2, 48, 48]} />
      <meshBasicMaterial
        color="#5fffd2"
        transparent
        opacity={0.09}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function CrystalField() {
  const group = useRef<THREE.Group>(null);

  const crystals = useMemo(() => {
    return Array.from({ length: CRYSTAL_COUNT }, (_, index) => {
      const angle = index * 2.39996;
      const radius = 2.2 + ((index * 1.73) % 18) / 10;
      const height = 0.25 + ((index * 7) % 100) / 120;
      return {
        position: [Math.cos(angle) * radius, -0.2 + Math.sin(index * 1.31) * 0.45, Math.sin(angle) * radius] as const,
        scale: [0.06 + (index % 5) * 0.018, height, 0.06 + (index % 4) * 0.016] as const,
        rotation: [0, angle, (index % 3 - 1) * 0.18] as const,
      };
    });
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
  });

  return (
    <group ref={group} position={[0, -0.2, -78]}>
      {crystals.map((crystal, index) => (
        <mesh key={index} position={crystal.position} rotation={crystal.rotation} scale={crystal.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={index % 3 === 0 ? "#b16cff" : "#55ffe1"}
            transparent
            opacity={0.72}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function AlienParticles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const data = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 12;
      const index = i * 3;
      data[index] = Math.cos(angle) * radius;
      data[index + 1] = (Math.random() - 0.5) * 9;
      data[index + 2] = -78 + Math.sin(angle) * radius;
    }
    return data;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.018;
    ref.current.rotation.x += delta * 0.004;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.45}
        color="#7fffe6"
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function AlienMoon() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const angle = state.clock.elapsedTime * 0.035;
    ref.current.position.set(Math.cos(angle) * 10, 4 + Math.sin(angle * 1.7) * 1.5, -78 + Math.sin(angle) * 10);
    ref.current.rotation.y += 0.0015;
  });

  return (
    <mesh ref={ref} position={[10, 4, -78]}>
      <sphereGeometry args={[1.15, 24, 24]} />
      <meshStandardMaterial color="#6b657e" roughness={1} />
    </mesh>
  );
}

export function AlienPlanet() {
  return (
    <group>
      <AlienTerrain />
      <Atmosphere />
      <CrystalField />
      <AlienParticles />
      <AlienMoon />
      <pointLight position={[-5, 4, -72]} color="#55ffe1" intensity={5} distance={28} decay={2} />
      <pointLight position={[5, -1, -82]} color="#a36cff" intensity={3} distance={22} decay={2} />
    </group>
  );
}
