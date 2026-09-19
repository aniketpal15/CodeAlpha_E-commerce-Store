import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';
import { useTheme } from '../../context/ThemeContext';

function AnimatedSphere({ isDark }) {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = clock.elapsedTime * 0.25;
    }
  });

  return (
    <Float speed={2.4} rotationIntensity={0.6} floatIntensity={1.8}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color={isDark ? "#9333ea" : "#6366f1"}
          attach="material"
          distort={0.42}
          speed={2.5}
          roughness={isDark ? 0.08 : 0.3}
          metalness={isDark ? 0.85 : 0.2}
          emissive={isDark ? "#6b21a8" : "#a5b4fc"}
          emissiveIntensity={isDark ? 0.65 : 0.3}
          transparent={!isDark}
          opacity={isDark ? 1 : 0.85}
        />
      </Sphere>
    </Float>
  );
}

function FloatingOrbs({ isDark }) {
  const orbsRef = useRef([]);
  const positions = [
    [2.8, 1.2, -1], [-1.5, -1.2, -1], [1.8, -1.8, -2], [-1.2, 1.8, -1.5],
    [3.2, -0.5, -3], [-2.8, 0.5, -2],
  ];
  const colors = isDark 
    ? ['#c084fc', '#38bdf8', '#fbbf24', '#f472b6', '#38bdf8', '#fbbf24']
    : ['#6366f1', '#0891b2', '#d97706', '#8b5cf6', '#0284c7', '#f59e0b'];

  useFrame(({ clock }) => {
    orbsRef.current.forEach((orb, i) => {
      if (orb) {
        orb.position.y = positions[i][1] + Math.sin(clock.elapsedTime * 0.9 + i) * 0.45;
      }
    });
  });

  return (
    <>
      {positions.map((pos, i) => (
        <mesh key={i} ref={el => orbsRef.current[i] = el} position={pos}>
          <sphereGeometry args={[0.13 + (i % 3) * 0.05, 16, 16]} />
          <meshStandardMaterial
            color={colors[i]}
            emissive={colors[i]}
            emissiveIntensity={isDark ? 0.8 : 0.35}
            roughness={0.15}
            metalness={isDark ? 0.9 : 0.3}
          />
        </mesh>
      ))}
    </>
  );
}

export default function Hero3D() {
  const { isDark } = useTheme();

  return (
    <div className="hero3d-canvas">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={isDark ? 0.4 : 1.1} />
        <pointLight position={[10, 10, 10]} intensity={isDark ? 2.2 : 2.5} color={isDark ? "#c084fc" : "#6366f1"} />
        <pointLight position={[-10, -10, -10]} intensity={isDark ? 1.4 : 1.2} color="#38bdf8" />
        <pointLight position={[0, -5, 5]} intensity={isDark ? 0.9 : 0.8} color="#f472b6" />
        
        {isDark && <Stars radius={90} depth={60} count={3500} factor={5} fade speed={1.5} />}
        
        <group position={[1.6, 0, 0]}>
          <AnimatedSphere isDark={isDark} />
          <FloatingOrbs isDark={isDark} />
        </group>
      </Canvas>
    </div>
  );
}

