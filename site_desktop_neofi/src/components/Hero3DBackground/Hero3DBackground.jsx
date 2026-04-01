import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Center, Points, PointMaterial } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { assetUrl } from '../../lib/assetUrl';

function Particles({ count = 2600 }) {
  const meshRef = useRef();

  const positions = useMemo(() => {
    const next = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 90 * Math.sqrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      next[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      next[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      next[i * 3 + 2] = r * Math.cos(phi);
    }
    return next;
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.0045;
  });

  return (
    <Points ref={meshRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#3c52ed"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function LogoModel({ modelPath = assetUrl('blue_test3.glb') }) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const ref = useRef();

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.35 * delta;
  });

  return (
    <group ref={ref}>
      <Center>
        <primitive object={gltf.scene} scale={2.35} />
      </Center>
    </group>
  );
}

export default function Hero3DBackground({ modelPath = '/blue_test3.glb' }) {
  const resolvedModelPath = modelPath?.startsWith('/') ? assetUrl(modelPath) : modelPath;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 30 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={2.0} />
        <directionalLight position={[1, 0.2, 0.2]} intensity={4.2} color="#ffffffff" />
        <directionalLight position={[0, 1, 0]} intensity={3.2} color="#ffffffff" />
        <directionalLight position={[0, 0, 1]} intensity={2.8} color="#ffffffff" />
        <Particles />
        <Suspense fallback={null}>
          <LogoModel modelPath={resolvedModelPath} />
        </Suspense>
      </Canvas>
    </div>
  );
}
