import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, useTexture } from '@react-three/drei';
import { Monitor } from './room/Monitor';
import { DigitalClock } from './room/DigitalClock';
import * as THREE from 'three';

export function Room(props: any) {
  const group = useRef<THREE.Group>();
  const spaceTexture = useTexture('https://images.unsplash.com/photo-1534841090574-cba2d662b62e?q=80&w=2787&auto=format&fit=crop');
  const posterTexture = useTexture('https://upload.wikimedia.org/wikipedia/en/9/9f/PerfectTimingNavMetroBoomin.jpg');
  
  // Create RGB shader material
  const rgbMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          vec3 color1 = vec3(1.0, 0.0, 0.0);
          vec3 color2 = vec3(0.0, 1.0, 0.0);
          vec3 color3 = vec3(0.0, 0.0, 1.0);
          
          float t = time * 0.5;
          vec3 color = 0.5 + 0.5 * cos(t + vUv.x * 2.0 + vec3(0.0, 2.0, 4.0));
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });
  }, []);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        (-state.mouse.x * Math.PI) / 20,
        0.1
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        (state.mouse.y * Math.PI) / 60,
        0.1
      );
    }
  });
  
  // Update shader time uniform
  useFrame(({ clock }) => {
    rgbMaterial.uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <group ref={group} {...props}>
      {/* Room walls */}
      <mesh position={[0, 2, -3]} receiveShadow>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#2c2c2c" />
        {/* Poster */}
        <mesh position={[1.5, 0.5, 0.01]} castShadow>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={posterTexture} />
        </mesh>
      </mesh>
      <mesh position={[-3, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>

      {/* Floor */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Window */}
      <mesh position={[-2.9, 2, -1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial map={spaceTexture} />
      </mesh>

      {/* Desk */}
      <mesh position={[0, 0, -1]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.1, 1.2]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>

      {/* Desk legs */}
      <mesh position={[-1.4, -0.5, -1]} castShadow>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>
      <mesh position={[1.4, -0.5, -1]} castShadow>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>

      {/* Keyboard Base */}
      <group position={[0, 0.15, -0.7]} rotation={[0.1, 0, 0]}>
        {/* Sides */}
        <mesh castShadow position={[0.4, 0, 0]}>
          <boxGeometry args={[0.01, 0.05, 0.3]} />
          <primitive object={rgbMaterial} />
        </mesh>
        <mesh castShadow position={[-0.4, 0, 0]}>
          <boxGeometry args={[0.01, 0.05, 0.3]} />
          <primitive object={rgbMaterial} />
        </mesh>
        <mesh castShadow position={[0, 0, 0.15]}>
          <boxGeometry args={[0.8, 0.05, 0.01]} />
          <primitive object={rgbMaterial} />
        </mesh>
        <mesh castShadow position={[0, 0, -0.15]}>
          <boxGeometry args={[0.8, 0.05, 0.01]} />
          <primitive object={rgbMaterial} />
        </mesh>
        {/* Top */}
        <mesh castShadow position={[0, 0.01, 0]}>
          <boxGeometry args={[0.8, 0.01, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>

      {/* Mouse Base */}
      <group position={[0.6, 0.15, -0.7]}>
        {/* Sides */}
        <mesh castShadow position={[0.05, 0, 0]}>
          <boxGeometry args={[0.01, 0.03, 0.2]} />
          <primitive object={rgbMaterial} />
        </mesh>
        <mesh castShadow position={[-0.05, 0, 0]}>
          <boxGeometry args={[0.01, 0.03, 0.2]} />
          <primitive object={rgbMaterial} />
        </mesh>
        <mesh castShadow position={[0, 0, 0.1]}>
          <boxGeometry args={[0.1, 0.03, 0.01]} />
          <primitive object={rgbMaterial} />
        </mesh>
        <mesh castShadow position={[0, 0, -0.1]}>
          <boxGeometry args={[0.1, 0.03, 0.01]} />
          <primitive object={rgbMaterial} />
        </mesh>
        {/* Top */}
        <mesh castShadow position={[0, 0.01, 0]}>
          <boxGeometry args={[0.1, 0.01, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>

      {/* Environment and shadows */}
      <Environment preset="city" />
      <ContactShadows
        position={[0, -0.99, 0]}
        opacity={0.7}
        scale={10}
        blur={2}
        far={4}
      />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
      
      {/* Digital Clock */}
      <DigitalClock />
      
      {/* Monitors */}
      <group position={[0, 0.6, -1.2]}>
        {/* Monitor 1 */}
        <Monitor 
          position={[-0.7, 0.5, 0]} 
          links={{
            github: "https://github.com/atipre",
            linkedin: "https://www.linkedin.com/in/aditya-tipre/"
          }}
        />
        {/* Monitor 2 */}
        <Monitor 
          position={[0.7, 0.5, 0]}
          links={{
            resume: "/resume.pdf"
          }}
        />
      </group>
    </group>
  );
}