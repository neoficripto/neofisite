import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import SpinningModel from './SpinningModel';

export default function ProductCard({ background, modelPath }) {
    const viewRef = useRef();

    return (
        <div 
            className="card-container" 
            ref={viewRef} 
            style={{
                width: '100%', 
                height: '100%', 
                padding: '0px', 
                border: '1px solid rgba(255, 255, 255, 0.14)',
                boxSizing: 'border-box', 
                borderRadius: '20px', 
                textAlign: 'center',
                overflow: 'hidden',
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div style={{ height: '100%', width: '100%', padding: '10px', boxSizing: 'border-box'}}>
                <Canvas
                    shadows
                    dpr={[1, 2]}
                    camera={{ fov: 30, position: [0, 0, 5] }}
                    gl={{ alpha: true, antialias: true }}
                    onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
                    style={{ background: 'transparent' }}
                >
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.75} />
                        <directionalLight position={[6, 8, 10]} intensity={1.05} />
                        <directionalLight position={[-6, -4, 8]} intensity={0.55} />
                        <SpinningModel modelPath={modelPath} />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}
