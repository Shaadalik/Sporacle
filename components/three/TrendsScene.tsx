import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

function FanBlades() {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.z += delta * 3.2; // spin blades
    }
  });
  const bladeGeom = useMemo(() => new THREE.PlaneGeometry(0.2, 1, 1, 1), []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#10B981', metalness: 0.2, roughness: 0.4 }), []);
  return (
    <group>
      <mesh geometry={new THREE.CylinderGeometry(0.12, 0.12, 0.06, 24)} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#16a34a" metalness={0.5} roughness={0.3} />
      </mesh>
      <group ref={group}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} geometry={bladeGeom} rotation={[0, 0, (i * 2 * Math.PI) / 3]} position={[0, 0, 0.02]}>
            <primitive attach="material" object={mat} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Droplet({ seed }: { seed: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const speed = useMemo(() => 0.3 + (seed % 100) / 200, [seed]);
  const x = useMemo(() => (Math.random() - 0.5) * 3, []);
  const z = useMemo(() => (Math.random() - 0.5) * 2, []);
  const startY = useMemo(() => -1.2 - Math.random(), []);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.position.y += delta * speed;
    if (mesh.current.position.y > 1.4) mesh.current.position.y = startY;
    mesh.current.rotation.y += delta * 0.6;
  });
  return (
    <mesh ref={mesh} position={[x, startY, z]} scale={[0.4, 0.6, 0.4]}>
      <sphereGeometry args={[0.12, 24, 24]} />
      <meshPhysicalMaterial color="#60a5fa" transmission={0.7} thickness={0.4} roughness={0.15} clearcoat={1} clearcoatRoughness={0.1} />
    </mesh>
  );
}

function CO2Bubbles() {
  const group = useRef<THREE.Group>(null!);
  const count = 60;
  const positions = useMemo(() =>
    Array.from({ length: count }, () => new THREE.Vector3((Math.random() - 0.5) * 3.2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 1.6)),
  []);
  const speeds = useMemo(() => positions.map(() => 0.15 + Math.random() * 0.25), [positions]);
  useFrame((_, delta) => {
    group.current.children.forEach((child, i) => {
      child.position.y += delta * speeds[i];
      if (child.position.y > 1.6) child.position.y = -1.6;
    });
  });
  return (
    <group ref={group}>
      {positions.map((p, i) => (
        <mesh key={i} position={p} scale={0.06}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#94a3b8" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function TrendsScene() {
  return (
    <Canvas camera={{ position: [0, 0.6, 3], fov: 60 }} dpr={[1, 2]} gl={{ alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 2]} intensity={0.9} />
      <Environment preset="city" />

      <Stars radius={20} depth={8} count={800} factor={2} saturation={0} fade speed={0.6} />

      <Float rotationIntensity={0.2} floatIntensity={0.6}>
        <group position={[0, 0.1, 0]}>
          <FanBlades />
        </group>
      </Float>

      <Float rotationIntensity={0.1} floatIntensity={0.5}>
        <CO2Bubbles />
      </Float>

      {Array.from({ length: 9 }).map((_, i) => (
        <Droplet key={i} seed={i} />
      ))}
    </Canvas>
  );
}
