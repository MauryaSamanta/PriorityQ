// Wave.js
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';

const Wave = () => {
  const waveRef = useRef();
  const clock = new THREE.Clock();

  useFrame(() => {
    if (waveRef.current) {
      const elapsed = clock.getElapsedTime();
      waveRef.current.geometry.vertices.forEach((vertex, i) => {
        vertex.z = Math.sin(i / 5 + (elapsed * 2)) * 0.5;
      });
      waveRef.current.geometry.verticesNeedUpdate = true;
    }
  });

  return (
    <Plane ref={waveRef} args={[10, 10, 100, 100]} rotation={[-Math.PI / 2, 0, 0]}>
      <meshPhongMaterial color="#00aaff" />
    </Plane>
  );
};

const WaveAnimation = () => {
  return (
    <Canvas
      camera={{ position: [0, 5, 10], fov: 50 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <Wave />
    </Canvas>
  );
};

export default WaveAnimation;
