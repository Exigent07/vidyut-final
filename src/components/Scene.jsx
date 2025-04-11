import { Canvas } from '@react-three/fiber'
import Model from '@/models/TransmissionModel';
import { Environment } from '@react-three/drei'

export default function Scene() {
  return (
    <Canvas
      style={{
        height: "50%",
        width: "50vw"
      }}
    >
        <Model />
        <directionalLight intensity={2} position={[0, 2, 3]}/>
        <Environment preset="city" />
    </Canvas>
  )
} 