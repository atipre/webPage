import { Canvas } from '@react-three/fiber';
import { Room } from './Room';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';

export function Scene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 5], fov: 75 }}
      className="w-full h-screen"
    >
      <color attach="background" args={['#1a1a1a']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <Suspense fallback={null}>
        <Room />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Suspense>
    </Canvas>
  );
}