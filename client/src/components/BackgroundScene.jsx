import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Edges } from '@react-three/drei';

function CyberCore({ color, cpuUsage }) {
  const ref = useRef();
  
  // Base rotation speed based on CPU usage (e.g. 5% to 100% -> scale to rotation speed)
  const speed = (cpuUsage / 100) * 1.5 + 0.2;

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * speed * 0.5;
    ref.current.rotation.y += delta * speed * 0.7;
    
    // Slight pulse based on time and cpu intensity
    const intensity = cpuUsage > 50 ? (cpuUsage - 50) / 10 : 1; 
    const scale = 1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.03 * intensity;
    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <Icosahedron args={[1, 1]} ref={ref}>
      <meshBasicMaterial color={color} transparent opacity={0.1} wireframe={false} />
      <Edges scale={1.05} threshold={15} color={color} />
    </Icosahedron>
  );
}

const BackgroundScene = ({ theme, cpuUsage = 10 }) => {
  const accentColor = theme === 'light' ? '#0066cc' : '#00ff80';
  const bgColor = theme === 'light' ? '#f5f5f7' : '#050505';

  return (
    <div className="scene-background" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: -1,
      background: bgColor,
      transition: 'background 0.5s ease'
    }}>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <CyberCore color={accentColor} cpuUsage={cpuUsage} />
      </Canvas>
    </div>
  );
};

export default BackgroundScene;
