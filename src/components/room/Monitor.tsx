import { Html } from '@react-three/drei';
import { Github, Linkedin, FileText } from 'lucide-react';

interface MonitorProps {
  position: [number, number, number];
  links?: {
    github?: string;
    linkedin?: string;
    resume?: string;
  };
}

export function Monitor({ position, links }: MonitorProps) {
  return (
    <group position={position}>
      {/* Monitor Frame */}
      <mesh castShadow>
        <boxGeometry args={[1.2, 0.8, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Red LED Accent */}
      <mesh position={[0, -0.4, 0.01]}>
        <planeGeometry args={[0.2, 0.01]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>

      {/* Screen Content */}
      {links && (
        <Html transform position={[0, 0, 0.03]} scale={0.15} style={{ pointerEvents: 'auto' }}>
          <div className="flex gap-6 bg-black/80 p-6 rounded-lg">
            {links.github && (
              <a href={links.github} target="_blank" rel="noopener noreferrer" 
                 className="text-white hover:text-red-500 transition-colors">
                <Github size={48} />
              </a>
            )}
            {links.linkedin && (
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer"
                 className="text-white hover:text-red-500 transition-colors">
                <Linkedin size={48} />
              </a>
            )}
            {links.resume && (
              <a href={links.resume} target="_blank" rel="noopener noreferrer"
                 className="text-white hover:text-red-500 transition-colors">
                <FileText size={48} />
              </a>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}