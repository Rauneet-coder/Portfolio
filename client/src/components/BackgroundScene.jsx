import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function ParticleField(props) {
  const ref = useRef();
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }), []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00ff80"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const BackgroundScene = ({ theme }) => {
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
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField color={accentColor} />
      </Canvas>
    </div>
  );
};

export default BackgroundScene;
