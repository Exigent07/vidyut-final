import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'

export default function RippleImage({ url = "/images/kerala-bg.png" }) {
  const meshRef = useRef()
  const shaderRef = useRef()
  const texture = useLoader(THREE.TextureLoader, url)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uTexture: { value: texture },
    uRippleStrength: { value: 0.1 },
    uRippleProgress: { value: 0.0 }
  }), [texture])

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()

    if (uniforms.uRippleProgress.value > 0.0) {
      uniforms.uRippleProgress.value -= 0.01
    } else {
      uniforms.uRippleProgress.value = 0.0
    }
  })

  const onPointerMove = (e) => {
    uniforms.uMouse.value = e.uv
    uniforms.uRippleProgress.value = 1.0
  }

  return (
    <mesh
      ref={meshRef}
      onPointerMove={onPointerMove}
    >
      <planeGeometry args={[16, 8]} />
      <shaderMaterial
        ref={shaderRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D uTexture;
          uniform vec2 uMouse;
          uniform float uTime;
          uniform float uRippleStrength;
          uniform float uRippleProgress;

          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;
            float dist = distance(uv, uMouse);

            float ripple = sin(30.0 * dist - uTime * 5.0) * exp(-4.0 * dist);
            ripple *= smoothstep(1.0, 0.0, dist);

            uv += normalize(uv - uMouse) * ripple * uRippleStrength * uRippleProgress;

            gl_FragColor = texture2D(uTexture, uv);
          }
        `}
        transparent
      />
    </mesh>
  )
}
