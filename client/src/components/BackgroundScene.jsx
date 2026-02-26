import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Edges } from '@react-three/drei';

import { useSpring, a } from '@react-spring/three';
import { useEffect, useState } from 'react';

function CyberCore({ color, cpuUsage }) {
  const ref = useRef();
  
  // Track dragging position
  const [targetRot, setTargetRot] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleDrag = (e) => {
      // Map screen coordinates to rotation targets
      const { x, y } = e.detail;
      const rotY = (x / window.innerWidth) * Math.PI - Math.PI / 2;
      const rotX = (y / window.innerHeight) * Math.PI - Math.PI / 2;
      setTargetRot({ x: rotX, y: rotY });
    };

    window.addEventListener('window-drag', handleDrag);
    return () => window.removeEventListener('window-drag', handleDrag);
  }, []);

  // Smooth interpolation using react-spring
  const { rotation, scaleSpring } = useSpring({
    rotation: [targetRot.x, targetRot.y, 0],
    scaleSpring: cpuUsage > 50 ? 1.4 : 1.2,
    config: { mass: 2, tension: 170, friction: 50 }
  });

  // Base rotation speed based on CPU usage
  const speed = (cpuUsage / 100) * 1.5 + 0.2;

  useFrame((state, delta) => {
    // Add constant rotation on top of the dragged target rotation
    if (ref.current) {
      ref.current.rotation.z += delta * speed * 0.3; // Constantly spin around Z
      ref.current.rotation.y += delta * speed * 0.1;
      
      const intensity = cpuUsage > 50 ? (cpuUsage - 50) / 10 : 1; 
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.05 * intensity;
      
      // We apply the spring scale base, then add the frame-by-frame pulse manually
      const currentScale = scaleSpring.get() + pulse;
      ref.current.scale.set(currentScale, currentScale, currentScale);
    }
  });

  return (
    <a.group rotation={rotation}>
      <Icosahedron args={[1, 1]} ref={ref}>
        <meshBasicMaterial color={color} transparent opacity={0.1} wireframe={false} />
        <Edges scale={1.05} threshold={15} color={color} />
      </Icosahedron>
    </a.group>
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
