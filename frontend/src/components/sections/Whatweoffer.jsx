import { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const AUTO_DELAY = 4000

const DOMAIN_META = [
    {
        color: '#8B5CF6', // Violet
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
    },
    {
        color: '#3B82F6', // Bleu
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
        ),
    },
    {
        color: '#06B6D4', // Cyan
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="13.5" cy="6.5" r=".5" />
                <circle cx="17.5" cy="10.5" r=".5" />
                <circle cx="8.5" cy="7.5" r=".5" />
                <circle cx="6.5" cy="12.5" r=".5" />
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.01 17.461 2 12 2z" />
            </svg>
        ),
    },
    {
        color: '#10B981', // Vert émeraude
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
            </svg>
        ),
    },
    {
        color: '#F59E0B', // Orange/Or
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
            </svg>
        ),
    },
    {
        color: '#EC4899', // Rose
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        ),
    },
]


function AnimatedBackground({ activeColor, isDark }) {
    const canvasRef = useRef(null)
    const starsRef = useRef([])
    const orbsRef = useRef([])
    const animRef = useRef(null)
    const timeRef = useRef(0)

    const initStars = useCallback((w, h) => {
        const count = Math.floor((w * h) / 3500)
        starsRef.current = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.5 + 0.3,
            opacity: Math.random() * 0.6 + 0.2,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            twinkleOffset: Math.random() * Math.PI * 2,
        }))
    }, [])

    const initOrbs = useCallback((w, h) => {
        orbsRef.current = Array.from({ length: 6 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 200 + 150,
            dx: (Math.random() - 0.5) * 0.3,
            dy: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.12 + 0.06,
        }))
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let w, h

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect()
            const dpr = window.devicePixelRatio || 1
            w = canvas.width = rect.width * dpr
            h = canvas.height = rect.height * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            w = rect.width
            h = rect.height
            initStars(w, h)
            initOrbs(w, h)
        }

        const draw = () => {
            timeRef.current += 0.01
            const time = timeRef.current

            ctx.fillStyle = isDark ? '#0A0A0B' : '#FAF9F7'
            ctx.fillRect(0, 0, w, h)

            const starColor = isDark ? '255,255,255' : '10,10,11'

            starsRef.current.forEach((s) => {
                const twinkle = Math.sin(time * s.twinkleSpeed * 100 + s.twinkleOffset) * 0.3 + 0.7
                ctx.globalAlpha = s.opacity * twinkle
                ctx.fillStyle = `rgba(${starColor},${s.opacity * twinkle})`
                ctx.beginPath()
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
                ctx.fill()
            })

            orbsRef.current.forEach((o, i) => {
                o.x += o.dx
                o.y += o.dy
                if (o.x < -o.r) o.x = w + o.r
                if (o.x > w + o.r) o.x = -o.r
                if (o.y < -o.r) o.y = h + o.r
                if (o.y > h + o.r) o.y = -o.r

                const orbColor = DOMAIN_META[i % DOMAIN_META.length].color
                const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r)
                grad.addColorStop(0, orbColor + '25')
                grad.addColorStop(0.4, orbColor + '10')
                grad.addColorStop(1, 'transparent')

                ctx.globalAlpha = o.opacity
                ctx.fillStyle = grad
                ctx.beginPath()
                ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2)
                ctx.fill()
            })

            const activeGrad = ctx.createRadialGradient(w * 0.7, h * 0.4, 0, w * 0.7, h * 0.4, 350)
            activeGrad.addColorStop(0, activeColor + '20')
            activeGrad.addColorStop(0.5, activeColor + '08')
            activeGrad.addColorStop(1, 'transparent')
            ctx.globalAlpha = 0.8
            ctx.fillStyle = activeGrad
            ctx.beginPath()
            ctx.arc(w * 0.7, h * 0.4, 350, 0, Math.PI * 2)
            ctx.fill()

            ctx.globalAlpha = 1
            animRef.current = requestAnimationFrame(draw)
        }

        resize()
        draw()
        window.addEventListener('resize', resize)

        return () => {
            cancelAnimationFrame(animRef.current)
            window.removeEventListener('resize', resize)
        }
    }, [activeColor, isDark, initStars, initOrbs])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    )
}


export default function WhatWeOffer() {
    const { t, i18n } = useTranslation()
    const [active, setActive] = useState(0)
    const timerRef = useRef(null)
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        const html = document.documentElement
        const observer = new MutationObserver(() => {
            setIsDark(html.classList.contains('dark'))
        })
        observer.observe(html, { attributes: true, attributeFilter: ['class'] })
        setIsDark(html.classList.contains('dark'))
        return () => observer.disconnect()
    }, [])

    const rawItems = t('whatWeTeach.items', { returnObjects: true })
    const items = Array.isArray(rawItems) ? rawItems : []
    const currentLang = i18n.language || 'en'

    const restartTimer = useCallback(() => {
        clearInterval(timerRef.current)
        if (items.length > 1) {
            timerRef.current = setInterval(() => {
                setActive((i) => (i + 1) % items.length)
            }, AUTO_DELAY)
        }
    }, [items.length])

    useEffect(() => {
        restartTimer()
        return () => clearInterval(timerRef.current)
    }, [restartTimer])

    const handleSelect = (i) => {
        if (i === active) return
        setActive(i)
        restartTimer()
    }

    if (items.length === 0) {
        return (
            <section className="relative py-24 sm:py-32 bg-paper-50 dark:bg-ink-950">
                <div className="max-w-6xl mx-auto px-5 text-center">
                    <p className="text-ink-800/40 dark:text-paper-100/40">Loading...</p>
                </div>
            </section>
        )
    }

    const activeMeta = DOMAIN_META[active % DOMAIN_META.length]
    const activeItem = items[active] || {}

    return (
        <section className="relative py-24 sm:py-32 overflow-hidden bg-paper-50 dark:bg-ink-950 transition-colors duration-500">
            <AnimatedBackground activeColor={activeMeta.color} isDark={isDark} />

            <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2
                        className="font-display font-bold text-3xl sm:text-5xl mb-3"
                        style={{
                            background: 'linear-gradient(135deg, #FF9142 0%, #FF7A1A 50%, #E63312 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            letterSpacing: '-0.5px',
                        }}
                    >
                        {t('whatWeTeach.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-ink-800/50 dark:text-paper-100/40">
                        {t('whatWeTeach.subtitle')}
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
                    <div className="flex-shrink-0 w-full lg:w-[340px] flex flex-col gap-2">
                        {items.map((item, i) => {
                            const isActive = i === active
                            const meta = DOMAIN_META[i % DOMAIN_META.length]

                            return (
                                <motion.button
                                    key={`${item.title}-${i}`}
                                    type="button"
                                    onClick={() => handleSelect(i)}
                                    whileHover={{ x: isActive ? 0 : 4 }}
                                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                    className="group relative flex items-center gap-3.5 w-full px-5 py-3.5 rounded-xl text-left transition-all duration-400 overflow-hidden"
                                    style={{
                                        border: isActive ? `1px solid ${meta.color}50` : '1px solid transparent',
                                        background: isActive ? `${meta.color}15` : 'transparent',
                                        boxShadow: isActive ? `0 0 30px ${meta.color}15, inset 0 1px 0 ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.5)'}` : 'none',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'
                                            e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = 'transparent'
                                            e.currentTarget.style.borderColor = 'transparent'
                                        }
                                    }}
                                >
                                    {isActive && (
                                        <span
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 rounded-r-full"
                                            style={{
                                                background: meta.color,
                                                boxShadow: `0 0 12px ${meta.color}, 0 0 24px ${meta.color}60`,
                                            }}
                                        />
                                    )}

                                    <span
                                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-400"
                                        style={{
                                            background: isActive ? meta.color : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'),
                                            boxShadow: isActive ? `0 0 20px ${meta.color}50, 0 0 40px ${meta.color}20` : 'none',
                                        }}
                                    >
                                        <span className={isActive ? 'text-white' : (isDark ? 'text-paper-100/40' : 'text-ink-900/40')}>
                                            {meta.icon}
                                        </span>
                                    </span>

                                    <span
                                        className="font-display text-[15px] transition-all duration-400"
                                        style={{
                                            fontWeight: isActive ? 600 : 400,
                                            color: isActive
                                                ? (isDark ? '#fff' : '#0A0A0B')
                                                : (isDark ? 'rgba(255,255,255,0.5)' : 'rgba(10,10,11,0.5)'),
                                            letterSpacing: '0.3px',
                                        }}
                                    >
                                        {item.title}
                                    </span>
                                </motion.button>
                            )
                        })}
                    </div>

                    <div className="flex-1 w-full lg:w-auto relative min-h-[300px] flex flex-col justify-center">
                        <div
                            className="absolute -inset-6 rounded-[24px] pointer-events-none transition-all duration-1000"
                            style={{
                                background: `radial-gradient(circle at 50% 50%, ${activeMeta.color}25, transparent 70%)`,
                                filter: 'blur(50px)',
                                zIndex: 0,
                            }}
                        />

                        <div
                            className="relative z-10 p-8 sm:p-10 rounded-2xl overflow-hidden transition-all duration-500"
                            style={{
                                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(10,10,11,0.08)'}`,
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
                                backdropFilter: 'blur(24px) saturate(1.3)',
                            }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                >
                                    <div className="flex items-center gap-3 mb-5">
                                        <span
                                            className="w-2.5 h-2.5 rounded-full"
                                            style={{
                                                background: activeMeta.color,
                                                boxShadow: `0 0 16px ${activeMeta.color}, 0 0 32px ${activeMeta.color}50`,
                                            }}
                                        />
                                        <span className="text-[11px] uppercase tracking-[0.2em] text-ink-800/40 dark:text-paper-100/35 font-medium">
                                            {currentLang === 'ar'
                                                ? `${active + 1} / ${items.length}`
                                                : `${active + 1} / ${items.length}`}
                                        </span>
                                    </div>

                                    <h3
                                        className="font-display text-2xl sm:text-[26px] font-bold mb-5"
                                        style={{
                                            color: isDark ? '#fff' : '#0A0A0B',
                                            letterSpacing: '-0.3px',
                                        }}
                                    >
                                        {activeItem.title}
                                    </h3>

                                    <p
                                        className="text-[15.5px] leading-[1.75] font-body"
                                        style={{
                                            color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(10,10,11,0.7)',
                                        }}
                                    >
                                        {activeItem.description}
                                    </p>

                                    <div className="mt-7 flex items-center gap-2">
                                        <div
                                            className="h-0.5 rounded-full flex-1 max-w-[140px]"
                                            style={{
                                                background: `linear-gradient(90deg, ${activeMeta.color} 0%, transparent 100%)`,
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}