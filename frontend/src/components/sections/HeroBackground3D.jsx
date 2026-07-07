import { useMemo, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
    )
    useEffect(() => {
        const update = () => setIsMobile(window.innerWidth < breakpoint)
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [breakpoint])
    return isMobile
}


function mulberry32(seed) {
    return function () {
        seed |= 0
        seed = (seed + 0x6d2b79f5) | 0
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

function buildTraces(count) {
    const rand = mulberry32(1337)
    const traces = []
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (rand() - 0.5) * 0.6
        const radiusStart = 0.6 + rand() * 0.4
        const radiusEnd = 3.4 + rand() * 2.2

        const points = []
        const segments = 3 + Math.floor(rand() * 2)
        for (let s = 0; s <= segments; s++) {
            const t = s / segments
            const r = THREE.MathUtils.lerp(radiusStart, radiusEnd, t)
            const wobble = (rand() - 0.5) * 0.9 * t
            const a = angle + wobble
            points.push(
                new THREE.Vector3(
                    Math.cos(a) * r,
                    Math.sin(a) * r * 0.62 + (rand() - 0.5) * 0.4,
                    (rand() - 0.5) * 0.8
                )
            )
        }
        const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.35)
        const sampled = curve.getPoints(24)
        traces.push({
            points: sampled,
            delay: rand() * 1.6,
            speed: 0.55 + rand() * 0.5,
            width: rand() > 0.75 ? 2.2 : 1.2,
            node: sampled[sampled.length - 1],
        })
    }
    return traces
}

function CircuitTrace({ trace }) {
    const lineRef = useRef()

    useFrame(({ clock }) => {
        const mat = lineRef.current?.material
        if (!mat) return
        const on = clock.elapsedTime > trace.delay
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, on ? 0.85 : 0, 0.04)
        mat.dashOffset -= 0.006 * trace.speed
    })

    return (
        <Line
            ref={lineRef}
            points={trace.points}
            color="#FF8A2E"
            lineWidth={trace.width}
            dashed
            dashScale={6}
            dashSize={0.55}
            gapSize={0.35}
            transparent
            opacity={0}
            toneMapped={false}
        />
    )
}

function Node({ position, delay }) {
    const ref = useRef()
    useFrame(({ clock }) => {
        if (!ref.current) return
        const on = clock.elapsedTime > delay
        const s = THREE.MathUtils.lerp(ref.current.scale.x || 0.001, on ? 1 : 0.001, 0.06)
        ref.current.scale.setScalar(s)
        const pulse = 0.6 + Math.sin(clock.elapsedTime * 2.4 + delay * 8) * 0.4
        ref.current.material.opacity = THREE.MathUtils.lerp(
            ref.current.material.opacity,
            on ? pulse : 0,
            0.05
        )
    })
    return (
        <mesh ref={ref} position={position} scale={0.001}>
            <sphereGeometry args={[0.065, 12, 12]} />
            <meshBasicMaterial color="#FFB84D" transparent opacity={0} toneMapped={false} />
        </mesh>
    )
}

function CentralPulse() {
    const ref = useRef()
    useFrame(({ clock }) => {
        if (!ref.current) return
        const pulse = 1 + Math.sin(clock.elapsedTime * 1.6) * 0.15
        ref.current.scale.setScalar(pulse * 0.14)
        ref.current.material.opacity = 0.9
    })
    return (
        <mesh ref={ref}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color="#FFD9A8" transparent opacity={0.9} toneMapped={false} />
        </mesh>
    )
}

function Scene({ isMobile }) {
    const traceCount = isMobile ? 8 : 16
    const traces = useMemo(() => buildTraces(traceCount), [traceCount])
    const groupRef = useRef()
    const scale = isMobile ? 0.55 : 1


    useFrame(({ clock }) => {
        if (!groupRef.current) return
        groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.18
        groupRef.current.rotation.x = Math.cos(clock.elapsedTime * 0.06) * 0.08
    })

    return (
        <group ref={groupRef} scale={scale}>
            <CentralPulse />
            {traces.map((trace, i) => (
                <group key={i}>
                    <CircuitTrace trace={trace} />
                    <Node position={trace.node} delay={trace.delay + 0.35} />
                </group>
            ))}
        </group>
    )
}

function useResponsiveCamera() {
    const [camera, setCamera] = useState({ position: [0, 0, 6], fov: 45 })

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth
            if (w < 480) {
                setCamera({ position: [0, 0, 7], fov: 48 })
            } else if (w < 768) {
                setCamera({ position: [0, 0, 6.5], fov: 47 })
            } else if (w < 1024) {
                setCamera({ position: [0, 0, 7], fov: 46 })
            } else {
                setCamera({ position: [0, 0, 6], fov: 45 })
            }
        }
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    return camera
}

export default function HeroBackground3D() {
    const camera = useResponsiveCamera()
    const isMobile = useIsMobile()

    return (
        <div className="absolute inset-0" aria-hidden="true">
            <div
                className="absolute inset-0 pointer-events-none hidden dark:block"
                style={{
                    background:
                        'radial-gradient(circle at 32% 28%, rgba(255,138,46,0.55) 0%, rgba(230,51,18,0.28) 32%, rgba(10,10,11,0.85) 68%, #0A0A0B 100%)',
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none dark:hidden"
                style={{
                    background:
                        'radial-gradient(circle at 32% 28%, rgba(255,148,66,0.4) 0%, rgba(255,122,26,0.16) 32%, rgba(250,249,247,0.5) 68%, #FAF9F7 100%)',
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none hidden dark:block"
                style={{
                    background:
                        'radial-gradient(circle at 68% 72%, rgba(255,118,26,0.25) 0%, transparent 55%)',
                }}
            />

            <div className="absolute inset-0 pointer-events-none">
                <Canvas
                    camera={camera}
                    gl={{ alpha: true, antialias: !isMobile }}
                    dpr={isMobile ? 1 : [1, 1.5]}
                >
                    <Scene isMobile={isMobile} />
                    {!isMobile && (
                        <EffectComposer>
                            <Bloom
                                intensity={0.9}
                                luminanceThreshold={0.15}
                                luminanceSmoothing={0.4}
                                mipmapBlur
                                radius={0.6}
                            />
                        </EffectComposer>
                    )}
                </Canvas>
            </div>
        </div>
    )
}