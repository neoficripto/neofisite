import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TrackballControls, Center, Html, Points, PointMaterial } from '@react-three/drei'; // <-- Added Points, PointMaterial
import * as THREE from 'three'; // <-- Added THREE import for utilities

import styles from './LogoInterativo.module.css'
import { assetUrl } from '../../lib/assetUrl';

// --- Particle Generation Component ---
function Particles({ count = 5000, rotationSpeed = 0.005 }) {
    const meshRef = useRef();
    
    // Generate star coordinates once
    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Distribute particles in a large sphere (e.g., radius 100)
            const r = 100 * Math.sqrt(Math.random()); 
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            
            // Convert spherical to Cartesian coordinates (x, y, z)
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        return positions;
    }, [count]);

    // Use useFrame to apply rotation to the particle system for movement effect
    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed;
        }
    });

    return (
        <Points ref={meshRef} positions={positions} stride={3} frustumCulled>
            <PointMaterial 
                transparent
                color="#00FFFF" // Cyan color for high-tech look
                size={0.05} // Small size for distant stars
                sizeAttenuation={true} // Size decreases with distance
                depthWrite={false}
            />
        </Points>
    );
}

// --- Background Blur Component (The Nebula) ---
function BackgroundNebula() {
    return (
        <mesh scale={150}> {/* Large scale to surround the entire scene */}
            <sphereGeometry args={[1, 64, 64]} />
            <meshBasicMaterial 
                color={new THREE.Color('#020114')} // Deep dark blue color
                side={THREE.BackSide} // Render only the inside of the sphere
                // Optional: For a more advanced glow, you might use a shader material 
                // or a gradient map, but this simple color is a good start.
            />
        </mesh>
    );
}

// --- Logo Component (Unchanged, except for removing unnecessary comments) ---
function LogoModel({ modelPath, autoRotateSpeed = 0.5, scale = 2.0, enableControls = true }) {
    const gltf = useLoader(GLTFLoader, modelPath);
    const meshRef = useRef();
    
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += autoRotateSpeed * delta;
        }
    });

    return (
        <group ref={meshRef}> 
            <Center>
                <primitive 
                    object={gltf.scene} 
                    scale={scale} 
                />
            </Center>
            <TrackballControls 
                noPan={true} 
                noZoom={true} 
                rotateSpeed={1} 
                staticMoving={true} 
                enabled={enableControls} 
            />
        </group>
    );
}

// --- Main Export Component ---
export default function NeoFiLogo({
    containerClassName,
    containerStyle,
    canvasClassName,
    canvasStyle,
    modelPath,
    dpr,
    particleCount,
    particleRotationSpeed,
    autoRotateSpeed,
    modelScale,
    enableControls,
}) {
    const resolvedModelPath = modelPath || assetUrl('blue_test3.glb');
    return (
        <div
            className={[styles.logoContainer, containerClassName].filter(Boolean).join(' ')}
            style={containerStyle}
        >
            <Canvas
                className={[styles.canvasStyle, canvasClassName].filter(Boolean).join(' ')}
                style={canvasStyle}
                camera={{ position: [0, 0, 10], fov: 30 }}
                gl={{ alpha: true, antialias: true }}
                onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
                dpr={dpr}
            >
                
                {/* --- BACKGROUND EFFECTS --- */}
                {/* <BackgroundNebula />  */}
                <Particles count={particleCount} rotationSpeed={particleRotationSpeed} />
                
                {/* Lighting setup - Fixed and external to the model */}
                <ambientLight intensity={2.0} /> 
                <directionalLight position={[1, 0, 0]} intensity={4.5} color="#ffffffff" />
                <directionalLight position={[0, 1, 0]} intensity={4.5} color="#ffffffff" />
                <directionalLight position={[0, 0, 1]} intensity={4.5} color="#ffffffff" />
                
                {/* The Model Component */}
                <Suspense fallback={null}>
                  <LogoModel
                    modelPath={resolvedModelPath}
                    autoRotateSpeed={autoRotateSpeed}
                    scale={modelScale}
                    enableControls={enableControls}
                  />
                </Suspense>
                
            </Canvas>
            
        </div>
    );
}
