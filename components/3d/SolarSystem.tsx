"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PLANETS = [
  { name: "Mercury", radius: 2.1, size: 0.28, color: "#9a8f85", speed: 1.8, phase: 0.2 },
  { name: "Venus", radius: 3.2, size: 0.42, color: "#d7aa6a", speed: 1.35, phase: 1.1 },
  { name: "Earth", radius: 4.5, size: 0.48, color: "#4e78d7", speed: 1.05, phase: 2.2 },
  { name: "Mars", radius: 5.8, size: 0.36, color: "#b7553d", speed: 0.82, phase: 2.9 },
  { name: "Jupiter", radius: 8.0, size: 0.92, color: "#c8a77b", speed: 0.42, phase: 4.1 },
  { name: "Saturn", radius: 10.4, size: 0.78, color: "#d6bf8f", speed: 0.31, phase: 5.0 },
  { name: "Uranus", radius: 12.5, size: 0.62, color: "#7cc6d1", speed: 0.23, phase: 5.8 },
  { name: "Neptune", radius: 14.2, size: 0.6, color: "#4f6fd3", speed: 0.18, phase: 0.8 },
] as const;

function Orbit({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const result: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i += 1) {
      const angle = (i / segments) * Math.PI * 2;
      result.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return result;
  }, [radius]);

  const geometry = useMemo(() => {
    const buffer = new THREE.BufferGeometry().setFromPoints(points);
    return buffer;
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#6d7fb5" transparent opacity={0.18} depthWrite={false} />
    </line>
  );
}

function Planet({
  radius,
  size,
  color,
  speed,
  phase,
  ring,
}: {
  radius: number;
  size: number;
  color: string;
  speed: number;
  phase: number;
  ring?: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * speed * 0.08;
  });

  return (
    <group ref={group}>
      <mesh position={[radius * Math.cos(phase), 0, radius * Math.sin(phase)]} castShadow>
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.72} metalness={0.05} />
      </mesh>
      {ring ? (
        <mesh
          position={[radius * Math.cos(phase), 0, radius * Math.sin(phase)]}
          rotation={[Math.PI / 2.35, 0, 0.4]}
        >
          <ringGeometry args={[size * 1.25, size * 1.85, 48]} />
          <meshBasicMaterial
            color="#cfc2a7"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ) : null}
    </group>
  );
}

function Sun() {
  const sun = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!sun.current) return;
    sun.current.rotation.y += delta * 0.08;
  });

  return (
    <group>
      <mesh ref={sun}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color="#ffd36a" />
      </mesh>
      <mesh scale={1.8}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color="#ff9f43" transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight intensity={18} distance={100} decay={2} color="#ffd27c" />
    </group>
  );
}

export function SolarSystem() {
  return (
    <group position={[0, -1.5, -26]} rotation={[0.08, -0.18, 0]}>
      <Sun />
      {PLANETS.map((planet) => (
        <group key={planet.name}>
          <Orbit radius={planet.radius} />
          <Planet
            radius={planet.radius}
            size={planet.size}
            color={planet.color}
            speed={planet.speed}
            phase={planet.phase}
            ring={planet.name === "Saturn"}
          />
        </group>
      ))}
      <ambientLight intensity={0.06} />
    </group>
  );
}
