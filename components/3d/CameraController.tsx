"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function CameraController() {
  const target = useRef(new THREE.Vector3());

  useFrame(({ camera, clock }, delta) => {
    const t = clock.getElapsedTime();
    target.current.set(
      Math.sin(t * 0.18) * 1.5,
      Math.cos(t * 0.13) * 0.8,
      0,
    );

    camera.position.x += (target.current.x - camera.position.x) * delta * 0.5;
    camera.position.y += (target.current.y - camera.position.y) * delta * 0.5;
    camera.position.z += ((18 + Math.sin(t * 0.08) * 1.5) - camera.position.z) * delta * 0.25;
    camera.lookAt(0, 0, -10);
  });

  return null;
}
