"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const CITY_COUNT = 14;
const BEACON_COUNT = 24;
const DRONE_COUNT = 18;

function Spire({ index }: { index: number }) {
  const height = 1.2 + (index % 5) * 0.55;
  const radius = 0.18 + (index % 4) * 0.06;
  const angle = index * 2.39996;
  const distance = 1.2 + (index % 6) * 0.65;

  return (
    <group position={[Math.cos(angle) * distance, 0, Math.sin(angle) * distance]}>
      <mesh position={[0, height / 2, 0]}>
        <coneGeometry args={[radius, height, 6]} />
        <meshStandardMaterial color="#17242a" roughness={0.6} metalness={0.35} />
      </mesh>
      <mesh position={[0, height * 0.72, 0]}>
        <sphereGeometry args={[radius * 1.35, 12, 12]} />
        <meshBasicMaterial color="#62ffe2" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
      </mesh>
      <pointLight color="#5effdf" intensity={0.35} distance={3.5} decay={2} position={[0, height * 0.72, 0]} />
    </group>
  );
}

function AlienCity() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <group ref={ref} position={[0, -1.5, -78]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[5.4, 64]} />
        <meshStandardMaterial color="#101b20" roughness={1} metalness={0.05} />
      </mesh>
      {Array.from({ length: CITY_COUNT }, (_, index) => <Spire key={index} index={index} />)}
      <mesh position={[0, 0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.8, 2.86, 96]} />
        <meshBasicMaterial color="#8c70ff" transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function EnergyBeacons() {
  const group = useRef<THREE.Group>(null);

  const beacons = useMemo(() => Array.from({ length: BEACON_COUNT }, (_, index) => {
    const angle = index * 2.618;
    const radius = 4.5 + (index % 5) * 0.35;
    return [Math.cos(angle) * radius, 0.3 + (index % 3) * 0.35, -78 + Math.sin(angle) * radius] as const;
  }), []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, index) => {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2 + index * 0.6) * 0.18;
      child.scale.setScalar(pulse);
    });
  });

  return (
    <group ref={group}>
      {beacons.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshBasicMaterial color={index % 2 ? "#a77aff" : "#5dffe1"} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

function OrbitalDrones() {
  const ref = useRef<THREE.Group>(null);

  const drones = useMemo(() => Array.from({ length: DRONE_COUNT }, (_, index) => ({
    radius: 3.5 + (index % 6) * 0.55,
    speed: 0.08 + (index % 5) * 0.018,
    phase: index * 0.9,
    height: 1.2 + (index % 4) * 0.55,
  })), []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.children.forEach((child, index) => {
      const drone = drones[index];
      const angle = state.clock.elapsedTime * drone.speed + drone.phase;
      child.position.set(
        Math.cos(angle) * drone.radius,
        drone.height + Math.sin(angle * 1.7) * 0.35,
        -78 + Math.sin(angle) * drone.radius,
      );
      child.rotation.y = angle + Math.PI / 2;
    });
  });

  return (
    <group ref={ref}>
      {drones.map((_, index) => (
        <mesh key={index} position={[0, 1, -78]}>
          <octahedronGeometry args={[0.07, 0]} />
          <meshBasicMaterial color="#d6faff" blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

function SkyBeam() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.scale.x = 0.95 + Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    ref.current.material.opacity = 0.035 + Math.sin(state.clock.elapsedTime * 1.3) * 0.012;
  });

  return (
    <mesh ref={ref} position={[0, 5.5, -78]}>
      <cylinderGeometry args={[0.35, 1.4, 11, 24, 1, true]} />
      <meshBasicMaterial color="#7f6cff" transparent opacity={0.04} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

export function AlienCivilization() {
  return (
    <group>
      <AlienCity />
      <EnergyBeacons />
      <OrbitalDrones />
      <SkyBeam />
      <pointLight color="#5fffe0" intensity={3.5} distance={22} decay={2} position={[-3, 4, -74]} />
      <pointLight color="#9570ff" intensity={3} distance={20} decay={2} position={[4, 2, -82]} />
    </group>
  );
}
