"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { pointer, scrollProgress, heroProgress } from "@/lib/store";

const DARK = new THREE.Color("#0b0706");
const LIGHT = new THREE.Color("#f7f1e6");

function useBatikTexture(url: string) {
  return useMemo(() => {
    const t = new THREE.TextureLoader().load(url);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    t.wrapS = THREE.MirroredRepeatWrapping;
    t.wrapT = THREE.MirroredRepeatWrapping;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    return t;
  }, [url]);
}

function SilkSheet({
  url,
  width,
  height,
  segs,
  rotation,
  position,
  intensity = 1,
}: {
  url: string;
  width: number;
  height: number;
  segs: [number, number];
  rotation: [number, number, number];
  position: [number, number, number];
  intensity?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.PlaneGeometry(width, height, segs[0], segs[1]), [width, height, segs]);
  const texture = useBatikTexture(url);
  const frame = useRef(0);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const compact = state.size.width < 768;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const px = pointer.x * (compact ? 3.4 : 4.2);
    const py = pointer.y * (compact ? 4.4 : 5.2);
    const touchBoost = pointer.touching || compact ? 1.35 : 1;
    const wave = 0.24 * intensity * touchBoost;
    const rippleAmp = 0.22 * intensity * touchBoost;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dx = x - px;
      const dy = y - py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ripple = Math.sin(dist * 2.55 - t * 3.4) * rippleAmp * Math.exp(-dist * 0.42);
      const swell =
        Math.sin(x * 0.55 + t * 0.75) * wave +
        Math.cos(y * 0.7 + t * 0.52) * (wave * 0.82) +
        Math.sin((x + y) * 0.35 + t * 0.38) * (wave * 0.45);
      const fold = Math.sin(x * 0.9 + t * 0.22) * Math.cos(y * 0.45) * 0.12 * intensity;
      pos.setZ(i, swell + ripple + fold);
    }
    pos.needsUpdate = true;
    frame.current += 1;
    if (!compact || frame.current % 2 === 0) geo.computeVertexNormals();

    if (!mesh.current) return;
    mesh.current.rotation.z = rotation[2] + pointer.x * 0.07;
    mesh.current.rotation.x = rotation[0] + pointer.y * 0.04;
    mesh.current.position.z = position[2] - heroProgress.value * 0.55 - scrollProgress.value * 1.8;
  });

  return (
    <mesh ref={mesh} geometry={geo} rotation={rotation} position={position}>
      <meshPhysicalMaterial
        map={texture}
        side={THREE.DoubleSide}
        roughness={0.22}
        metalness={0.12}
        sheen={1}
        sheenColor={new THREE.Color("#f4d35e")}
        sheenRoughness={0.32}
        clearcoat={0.28}
        clearcoatRoughness={0.38}
        emissive={new THREE.Color("#5a1c08")}
        emissiveIntensity={0.28}
      />
    </mesh>
  );
}

function SilkPour() {
  const { size } = useThree();
  const compact = size.width < 768;
  const mainSegs: [number, number] = compact ? [42, 54] : [72, 90];
  const backSegs: [number, number] = compact ? [24, 32] : [40, 50];

  return (
    <group>
      <SilkSheet
        url="/images/batik/teal-night.jpg"
        width={7.4}
        height={9.2}
        segs={backSegs}
        rotation={[0.1, 0.38, 0.05]}
        position={[1.55, -0.35, -2.55]}
        intensity={0.7}
      />
      <SilkSheet
        url="/images/batik/saffron-suit.jpg"
        width={6.2}
        height={8.4}
        segs={backSegs}
        rotation={[0.12, -0.42, -0.06]}
        position={[-1.7, -0.15, -2.2]}
        intensity={0.75}
      />
      <SilkSheet
        url="/images/batik/maroon-crackle.jpg"
        width={compact ? 8.6 : 9.4}
        height={compact ? 12.2 : 11.6}
        segs={mainSegs}
        rotation={[-0.16, 0, 0]}
        position={[0, 0.05, -1.15]}
        intensity={1}
      />
    </group>
  );
}

function FollowLight() {
  const light = useRef<THREE.SpotLight>(null);
  useFrame(() => {
    if (!light.current) return;
    light.current.position.x = THREE.MathUtils.lerp(light.current.position.x, pointer.x * 2.4, 0.12);
    light.current.position.y = THREE.MathUtils.lerp(light.current.position.y, 1.35 + pointer.y * 1.5, 0.12);
  });
  return (
    <spotLight
      ref={light}
      position={[0, 1.4, 3.1]}
      angle={0.62}
      penumbra={0.85}
      intensity={3.1}
      color="#ffe7c2"
    />
  );
}

function Atmosphere() {
  const { scene } = useThree();
  const bg = useMemo(() => new THREE.Color("#0b0706"), []);
  const fog = useMemo(() => new THREE.Fog("#0b0706", 3.2, 11), []);

  useFrame(() => {
    const t = THREE.MathUtils.smoothstep(scrollProgress.value, 0.06, 0.22);
    bg.copy(DARK).lerp(LIGHT, t);
    fog.color.copy(bg);
    scene.background = bg;
    scene.fog = fog;
  });

  return null;
}

function Rig() {
  useFrame((state) => {
    const compact = state.size.width < 768;
    const t = state.clock.elapsedTime;
    const idleX = compact && !pointer.touching ? Math.sin(t * 0.38) * 0.18 : 0;
    const idleY = compact && !pointer.touching ? Math.cos(t * 0.27) * 0.08 : 0;
    const targetZ = (compact ? 2.55 : 3.05) - heroProgress.value * 0.45 - scrollProgress.value * 0.35;
    const targetX = pointer.x * (compact ? 0.42 : 0.22) + idleX;
    const targetY = 0.04 + pointer.y * (compact ? 0.28 : 0.14) + idleY;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.1);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.1);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.1);
    state.camera.lookAt(pointer.x * 0.35, pointer.y * 0.2, -1.2);
  });
  return null;
}

export default function Scene() {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas
      className="canvas-fixed"
      camera={{ position: [0, 0.05, mobile ? 2.55 : 3.05], fov: mobile ? 54 : 50 }}
      dpr={mobile ? [1, 1.4] : [1, 1.7]}
      gl={{ antialias: true, alpha: true, powerPreference: mobile ? "low-power" : "high-performance" }}
    >
      <Atmosphere />
      <ambientLight intensity={0.42} />
      <directionalLight position={[3.2, 4.2, 4]} intensity={1.35} color="#fff1d6" />
      <pointLight position={[-2.4, 1.6, 2.2]} intensity={1.7} color="#2ec4b6" />
      <pointLight position={[2.6, -0.6, 2.4]} intensity={1.45} color="#ee9b00" />
      <FollowLight />
      <SilkPour />
      <Sparkles
        count={mobile ? 80 : 110}
        scale={[10, 8, 6]}
        size={2.4}
        speed={0.45}
        color="#e8c547"
        opacity={0.55}
      />
      <Rig />
    </Canvas>
  );
}
