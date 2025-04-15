import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import * as THREE from 'three';

useGLTF.preload('/models/car.glb');
useGLTF.preload('/models/guitar.glb');

function RotatingModel({ mouseDirection, color, mobile, modelPath }) {
  const groupRef = useRef();
  const clonedRef = useRef();
  const { scene } = useGLTF(modelPath, true, undefined, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);
  });

  useEffect(() => {
    if (!scene) return;

    const cacheKey = `${modelPath}_${color}_${mobile}`;
    if (clonedRef.current?.key === cacheKey) return;

    const clonedScene = scene.clone(true);
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.geometry = child.geometry.clone();
        child.material = mobile
          ? new THREE.MeshNormalMaterial()
          : new THREE.MeshBasicMaterial({
              color: new THREE.Color(color),
              wireframe: true,
            });
      }
    });

    clonedRef.current = { object: clonedScene, key: cacheKey };
  }, [scene, color, modelPath, mobile]);

  const scale = useMemo(() => {
    if (modelPath.includes("guitar")) {
      return mobile ? (mobile === "sm" ? 1.5 : 3) : 6;
    }
    return mobile ? (mobile === "sm" ? 1 : 1.5) : 1.7;
  }, [modelPath, mobile]);

  const position = useMemo(() => {
    return modelPath.includes('guitar') ? [0, -1, 0] : [0, 0, 0];
  }, [modelPath]);

  useFrame(() => {
    if (!groupRef.current || !mouseDirection) return;
  
    const { dx } = mouseDirection;
    groupRef.current.rotation.y += dx * 1.5;
  });  

  return clonedRef.current ? (
    <group ref={groupRef} scale={scale} position={position}>
      <primitive object={clonedRef.current.object} />
    </group>
  ) : null;
}

export default function ThreeDModel({ color = "#f2f2f2" }) {
  const [mobile, setMobile] = useState(false);
  const [modelPath, setModelPath] = useState('/models/car.glb');
  const [mouseDirection, setMouseDirection] = useState({ dx: 0, dy: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setMobile(window.innerWidth < 768 ? (window.innerWidth < 640 ? "sm" : "md") : false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let lastX = null;
    let lastY = null;

    const handleMouseMove = (e) => {
      if (mobile) return;

      const x = e.clientX;
      const y = e.clientY;

      if (lastX !== null && lastY !== null) {
        const dx = (x - lastX) / window.innerWidth;
        const dy = (y - lastY) / window.innerHeight;
        setMouseDirection({ dx, dy });
      }

      lastX = x;
      lastY = y;
    };

    const handleMouseLeave = () => {
      setMouseDirection({ dx: 0, dy: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mobile]);

  const handleDoubleClick = () => {
    if (mobile) return;
    setModelPath((prev) =>
      prev === '/models/car.glb' ? '/models/guitar.glb' : '/models/car.glb'
    );
  };

  return (
    <div className="flex justify-center w-full items-center require-pointer" require-text="2 Click">
      <div
        className="w-full h-28 md:h-52 touch-none"
        onDoubleClick={handleDoubleClick}
      >
        <Canvas style={{ width: "100%" }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <Suspense fallback={null}>
            <RotatingModel
              mouseDirection={mouseDirection}
              color={color}
              mobile={mobile}
              modelPath={modelPath}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
