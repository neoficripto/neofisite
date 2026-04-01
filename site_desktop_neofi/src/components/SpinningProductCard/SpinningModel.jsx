import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, useGLTF} from '@react-three/drei';

export default function SpinningModel({ modelPath, scale = .4, speed = 0.01 }) {
    const groupRef = useRef();
    const { scene } = useGLTF(modelPath);

    // Clone the scene so we can use it in multiple places
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += speed;
        }
    });

    return (
        <group ref={groupRef}>
            <Center>
                <primitive
                    object={clonedScene} // Use the clone here
                    scale={scale}
                    rotation={[Math.PI / 2, 0, 0]}
                />
            </Center>
        </group>
    );
}