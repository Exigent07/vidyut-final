import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function RotatingModel({ mousePosition, color, mobile, modelPath }) {
  const modelRef = useRef();
  const lastMouseMoveRef = useRef(Date.now());
  const isMouseActiveRef = useRef(false);
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (!scene) return;

    const clonedScene = scene.clone();

    clonedScene.traverse((child) => {
      if (child.isMesh) {
        if (child.name === 'mesh_0') {
          child.visible = false;
        }
    
        if (
          modelPath.includes('guitar') &&
          child.geometry?.type === 'PlaneGeometry'
        ) {
          child.visible = false;
        }
    
        child.geometry = child.geometry.clone();
    
        child.material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          wireframe: true,
        });
      }
    });
    

    modelRef.current = clonedScene;
  }, [scene, color, modelPath]);

  useFrame(() => {
    if (modelRef.current) {
      const now = Date.now();

      if (mousePosition.x !== 0) {
        lastMouseMoveRef.current = now;
        isMouseActiveRef.current = true;
        modelRef.current.rotation.y += mousePosition.x * 0.5;
      } else if (now - lastMouseMoveRef.current > 100 || !isMouseActiveRef.current) {
        modelRef.current.rotation.y +=  0.05;
      }
    }
  });

  let scale;
  if (modelPath.includes("guitar")) {
    scale = mobile ? (mobile === "sm" ? 1.5 : 2) : 6;
  } else {
    scale = mobile ? (mobile === "sm" ? 1 : 1.5) : 1.7;
  }
  

  return modelRef.current ? (
    <primitive
      object={modelRef.current}
      scale={scale}
      position={modelPath.includes('guitar') ? [0, -1, 0] : [0, 0, 0]}
    />
  ) : null;  
}

export default function ThreeDModel({ color = "#f2f2f2" }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mobile, setMobile] = useState(false);
  const [modelPath, setModelPath] = useState('/models/car.glb');
  const mouseTimerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setMobile(window.innerWidth < 768 ? (window.innerWidth < 640 ? "sm" : "md") : false);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const handleDoubleClick = () => {
    setModelPath((prev) =>
      prev === '/models/car.glb' ? '/models/guitar.glb' : '/models/car.glb'
    );
  };

  return (
    <div className="flex justify-center w-full items-center require-pointer" require-text="2 Click">
      <div className="w-full h-28 md:h-52" onDoubleClick={handleDoubleClick}>
        <Canvas style={{ width: "100%" }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <Suspense fallback={null}>
            <RotatingModel
              mousePosition={mousePosition}
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
