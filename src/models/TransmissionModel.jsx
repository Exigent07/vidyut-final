import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

export default function RippleText() {
  const textRef = useRef()

  const uniforms = useMemo(() => ({
    uTime: { value: 0.01 },
    uMouse: { value: new THREE.Vector2(0.3, 0.5) },
    uRippleStrength: { value: 0.5 },
    uRippleProgress: { value: 0.5 }
  }), [])

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()

    if (uniforms.uRippleProgress.value > 0.0) {
      uniforms.uRippleProgress.value -= 0.005
    } else {
      uniforms.uRippleProgress.value = 0.0
    }
  })

  const onPointerMove = (e) => {
    uniforms.uMouse.value = e.uv
    uniforms.uRippleProgress.value = 1.0
  }

  return (
    <Text
      ref={textRef}
      font="/fonts/OpenSans.ttf"
      fontSize={3.5}
      color="white"
      onPointerMove={onPointerMove}
      position={[0, 0, 0]}
    >
      VIDYUT
      <shaderMaterial
        attach="material"
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform vec2 uMouse;
          uniform float uRippleStrength;
          uniform float uRippleProgress;

          varying vec2 vUv;

          void main() {
            vUv = uv;
            vec3 pos = position;

            float dist = distance(uv, uMouse);

            float ripple = sin(12.0 * dist - uTime * 2.5) * exp(-3.0 * dist);
            ripple *= smoothstep(0.9, 0.0, dist);
            pos.xy += normalize(uv - uMouse) * ripple * uRippleStrength * uRippleProgress;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          void main() {
            gl_FragColor = vec4(1.0);
          }
        `}
        transparent
      />
    </Text>
  )
}
