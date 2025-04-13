import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RotatingCube({ mousePosition, color }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const lastMouseMoveRef = useRef(Date.now());
  const isMouseActiveRef = useRef(false);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color = new THREE.Color(color);
    }
  }, [color]);

  useFrame(() => {
    if (meshRef.current) {
      const now = Date.now();

      if (mousePosition.x !== 0 || mousePosition.y !== 0) {
        lastMouseMoveRef.current = now;
        isMouseActiveRef.current = true;

        meshRef.current.rotation.x = mousePosition.y * Math.PI;
        meshRef.current.rotation.y = mousePosition.x * Math.PI;
      } else if (now - lastMouseMoveRef.current > 100 || !isMouseActiveRef.current) {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.015;
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3.5, 3.5, 3.5]} />
      <meshBasicMaterial ref={materialRef} wireframe />
    </mesh>
  );
}

export default function Cube({ color = "#f2f2f2" }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseTimerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });

      clearTimeout(mouseTimerRef.current);
      mouseTimerRef.current = setTimeout(() => {
        setMousePosition({ x: 0, y: 0 });
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouseTimerRef.current);
    };
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="w-52 h-52">
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <RotatingCube mousePosition={mousePosition} color={color} />
        </Canvas>
      </div>
    </div>
  );
}
