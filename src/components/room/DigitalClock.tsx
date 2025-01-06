import { Html } from '@react-three/drei';
import { useState, useEffect } from 'react';

export function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <group position={[0, 1.7, -1.2]}>
      {/* Clock Base */}
      <mesh castShadow>
        <boxGeometry args={[0.8, 0.2, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Digital Display */}
      <Html transform position={[0, 0, 0.03]} scale={0.15}>
        <div className="bg-black px-6 py-3 rounded-lg">
          <span className="font-mono text-red-500 text-3xl tracking-wider">
            {formatTime(time)}
          </span>
        </div>
      </Html>
    </group>
  );
}