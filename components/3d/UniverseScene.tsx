"use client";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { StarField } from "./StarField";
import { Nebula } from "./Nebula";
import { Galaxy } from "./Galaxy";
import { Particles } from "./Particles";
import { SolarSystem } from "./SolarSystem";
import { Wormhole } from "./Wormhole";
import { ParallelUniverse } from "./ParallelUniverse";
import { CameraController } from "./CameraController";

export function UniverseScene() {
  return (
    <Canvas
      className="universe-canvas"
      camera={{ position: [0, 0, 18], fov: 60, near: 0.1, far: 250 }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#000000", 1);
      }}
    >
      <fog attach="fog" args={["#000000", 45, 145]} />
      <ambientLight intensity={0.15} />
      <Stars radius={120} depth={80} count={1600} factor={2} saturation={0} fade speed={0.18} />
      <StarField />
      <Nebula />
      <Galaxy />
      <Particles />
      <SolarSystem />
      <Wormhole />
      <ParallelUniverse />
      <CameraController />
    </Canvas>
  );
}
