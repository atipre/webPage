export function Window() {
  const cityTexture = 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2000&q=80';

  return (
    <group>
      {/* Window Frame */}
      <mesh position={[-2.9, 2, -1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial map={new THREE.TextureLoader().load(cityTexture)} />
      </mesh>
      
      {/* Window Frame Accent */}
      <mesh position={[-2.89, 2, -1]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[3.2, 3.2, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </group>
  );
}