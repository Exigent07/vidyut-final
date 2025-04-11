import { useRef } from 'react'
import { useGLTF, Text, MeshTransmissionMaterial, PresentationControls } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'

export default function Model() {
  const { nodes } = useGLTF("/models/twisted-torus.gltf");
  const { viewport } = useThree()
  const torus = useRef(null);

  useFrame(() => {
    if (torus.current) torus.current.rotation.x += 0.02;
  });

  return (
    <group scale={viewport.width / 0.5}>
      <Text
        position={[0, 0, -1]}
        font="/fonts/OpenSans.ttf"
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        VIDYUT
      </Text>

      <PresentationControls
        global
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 2, Math.PI / 2]}
        config={{ mass: 1, tension: 170 }}
        snap={true}
      >
        <mesh ref={torus} geometry={nodes.Torus_Knot.geometry}>
          <MeshTransmissionMaterial
            thickness={0.1}
            roughness={0}
            transmission={1}
            ior={1.8}
            chromaticAberration={0.5}
            backside
          />
        </mesh>
      </PresentationControls>
    </group>
  )
}
