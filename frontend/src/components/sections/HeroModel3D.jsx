import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Bounds } from '@react-three/drei'

const MODEL_PATH = '/models/laptop.glb'

const SWING_AMPLITUDE = 0.5
const SWING_SPEED = 0.6

function LaptopModel() {
    const { scene } = useGLTF(MODEL_PATH)
    const ref = useRef()

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y = Math.sin(clock.elapsedTime * SWING_SPEED) * SWING_AMPLITUDE
        }
    })

    return <primitive ref={ref} object={scene} />
}
useGLTF.preload(MODEL_PATH)


export default function HeroModel3D() {
    return (
        <div className="w-full h-full pointer-events-none">
            <Canvas camera={{ fov: 32 }} gl={{ alpha: true }} dpr={[1, 1.6]}>
                <ambientLight intensity={0.9} />
                <directionalLight position={[3, 5, 2]} intensity={1.3} />
                <directionalLight position={[-3, 2, -2]} intensity={0.4} />
                <Suspense fallback={null}>
                    <Bounds fit clip margin={1.3}>
                        <LaptopModel />
                    </Bounds>
                </Suspense>
            </Canvas>
        </div>
    )
}