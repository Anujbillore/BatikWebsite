"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { pointer, scrollProgress } from "@/lib/store";

const galleryMaps = [
  "/images/batik/saffron-suit.jpg",
  "/images/batik/crimson-suit.webp",
  "/images/batik/teal-night.jpg",
  "/images/batik/maroon-crackle.jpg",
  "/images/batik/burgundy-paisley.jpg",
  "/images/batik/rose-floral.jpg",
  "/images/batik/bandhani-sunburst.jpg",
  "/images/batik/chocolate-panel.jpg",
];

const DARK = new THREE.Color("#0b0706");
const LIGHT = new THREE.Color("#f7f1e6");

function useBatikTexture(url: string) {
  return useMemo(() => {
    const t = new THREE.TextureLoader().load(url);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    return t;
  }, [url]);
}

function HangPanel({ url, side, index }: { url: string; side: -1 | 1; index: number }) {
  const group = useRef<THREE.Group>(null);
  const geo = useMemo(() => new THREE.PlaneGeometry(1.85, 3.4, 24, 40), []);
  const texture = useBatikTexture(url);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      const hang = (1.7 - y) / 3.4;
      pos.setZ(i, Math.sin(t * 1.1 + index + y * 1.6) * 0.08 * hang + x * 0.02);
    }
    pos.needsUpdate = true;
    if (!group.current) return;
    group.current.rotation.y = side * 0.18 + Math.sin(t * 0.4 + index) * 0.06 + pointer.x * 0.08;
  });

  const z = 3.2 - index * 3.15;
  return (
    <group ref={group} position={[side * 2.35, 0.55, z]}>
      <mesh position={[0, 1.85, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2.05, 8]} />
        <meshStandardMaterial color="#c9a227" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh geometry={geo} position={[0, 0.05, 0]}>
        <meshStandardMaterial
          map={texture}
          side={THREE.DoubleSide}
          roughness={0.45}
          metalness={0.1}
          emissive={new THREE.Color("#3a1808")}
          emissiveIntensity={0.16}
        />
      </mesh>
    </group>
  );
}

function RunwayFloor() {
  return (
    <group position={[0, -1.35, -4]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9, 22]} />
        <meshStandardMaterial color="#120c09" roughness={0.85} metalness={0.15} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[0.28, 22]} />
        <meshStandardMaterial color="#e8c547" metalness={0.9} roughness={0.2} emissive="#8a5a10" emissiveIntensity={0.45} />
      </mesh>
    </group>
  );
}

function Atmosphere() {
  const { scene } = useThree();
  const bg = useMemo(() => new THREE.Color("#0b0706"), []);
  const fog = useMemo(() => new THREE.Fog("#0b0706", 8, 18), []);

  useFrame(() => {
    const t = THREE.MathUtils.smoothstep(scrollProgress.value, 0.06, 0.2);
    bg.copy(DARK).lerp(LIGHT, t);
    fog.color.copy(bg);
    scene.background = bg;
    scene.fog = fog;
  });

  return null;
}

function Rig() {
  useFrame((state) => {
    const s = scrollProgress.value;
    const targetZ = 7.2 - s * 11;
    const targetX = pointer.x * 0.55;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.06);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.06);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.55, 0.06);
    state.camera.lookAt(0, 0.35, targetZ - 8);
  });
  return null;
}

export default function Scene() {
  return (
    <Canvas
      className="canvas-fixed"
      camera={{ position: [0, 0.55, 7.2], fov: 48 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Atmosphere />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.45} color="#fff1d6" />
      <pointLight position={[-3.2, 2.2, 2.4]} intensity={1.55} color="#2ec4b6" />
      <pointLight position={[3.4, -1, 3]} intensity={1.25} color="#ee9b00" />
      <RunwayFloor />
      {galleryMaps.map((url, i) => (
        <HangPanel key={url} url={url} side={i % 2 === 0 ? -1 : 1} index={Math.floor(i / 2)} />
      ))}
      <spotLight position={[0, 4.2, 4]} angle={0.35} penumbra={0.5} intensity={2.2} color="#ffe7c2" />
      <spotLight position={[0, 4.2, -2]} angle={0.4} penumbra={0.6} intensity={1.6} color="#2ec4b6" />
      <spotLight position={[0, 4.2, -8]} angle={0.4} penumbra={0.6} intensity={1.4} color="#ee9b00" />
      <Sparkles count={90} scale={[14, 8, 8]} size={2.6} speed={0.38} color="#e8c547" opacity={0.5} />
      <Rig />
    </Canvas>
  );
}
