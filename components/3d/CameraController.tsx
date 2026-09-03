"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type NavigationDetail = {
  position: [number, number, number];
  focus: [number, number, number];
  id?: string;
};

export function CameraController() {
  const destination = useRef(new THREE.Vector3(0, 0, 18));
  const lookTarget = useRef(new THREE.Vector3(0, 0, -10));
  const idleLook = useRef(new THREE.Vector3());

  useEffect(() => {
    const onNavigate = (event: Event) => {
      const detail = (event as CustomEvent<NavigationDetail>).detail;
      if (!detail?.position || !detail?.focus) return;
      destination.current.set(...detail.position);
      lookTarget.current.set(...detail.focus);
    };

    window.addEventListener("explorer:navigate", onNavigate);
    return () => window.removeEventListener("explorer:navigate", onNavigate);
  }, []);

  useFrame(({ camera, clock }, delta) => {
    const t = clock.getElapsedTime();
    idleLook.current.set(
      lookTarget.current.x + Math.sin(t * 0.18) * 1.5,
      lookTarget.current.y + Math.cos(t * 0.13) * 0.8,
      lookTarget.current.z,
    );

    const damping = 1 - Math.exp(-delta * 2.2);
    camera.position.lerp(destination.current, damping);
    camera.lookAt(idleLook.current);
  });

  return null;
}
