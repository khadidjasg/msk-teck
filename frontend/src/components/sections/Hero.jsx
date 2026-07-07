import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import HeroBackground3D from './HeroBackground3D.jsx'
import HeroModel3D from './HeroModel3D.jsx'


function RewireWord({ words, interval = 2600 }) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
        return () => clearInterval(id)
    }, [words.length, interval])

    const letters = words[index].split('')

    return (
        <span className="relative inline-flex flex-wrap text-gradient-ember">
      <AnimatePresence mode="wait">
        <motion.span key={index} className="inline-flex">
          {letters.map((char, i) => (
              <motion.span
                  key={i}
                  initial={{ opacity: 0, y: i % 2 === 0 ? 10 : -10, scale: 0.4, rotate: i % 2 === 0 ? -14 : 14 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, y: i % 2 === 0 ? -8 : 8, scale: 0.4, rotate: i % 2 === 0 ? 12 : -12 }}
                  transition={{
                      duration: 0.36,
                      delay: i * 0.022,
                      ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="inline-block"
              >
                  {char === ' ' ? '\u00A0' : char}
              </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
    )
}


function GrainOverlay() {
    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-[0.035]"
            aria-hidden="true"
        >
            <filter id="hero-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#hero-grain)" />
        </svg>
    )
}


function CTA({ to, children }) {
    return (
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <Link
                to={to}
                className="inline-block px-6 py-3 rounded-full bg-ember-gradient text-white font-display text-sm sm:text-base shadow-lg shadow-ember-600/25 hover:shadow-xl hover:shadow-ember-600/40 transition-shadow"
            >
                {children}
            </Link>
        </motion.div>
    )
}

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
    const { t } = useTranslation()
    const rotatingWords = t('hero.rotatingWords', { returnObjects: true })
    const steps = t('hero.steps', { returnObjects: true })
    const spotlightRef = useRef(null)
    const sectionRef = useRef(null)

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
    const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])
    const contentY = useTransform(scrollYProgress, [0, 0.9], [0, 50])

    const updateSpotlight = (clientX, clientY, rect) => {
        const xPct = ((clientX - rect.left) / rect.width) * 100
        const yPct = ((clientY - rect.top) / rect.height) * 100
        spotlightRef.current?.style.setProperty('--mx', `${xPct}%`)
        spotlightRef.current?.style.setProperty('--my', `${yPct}%`)
    }
    const handleMouseMove = (e) => updateSpotlight(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect())
    const handleTouchMove = (e) => {
        const touch = e.touches[0]
        if (!touch) return
        updateSpotlight(touch.clientX, touch.clientY, e.currentTarget.getBoundingClientRect())
    }

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative overflow-hidden min-h-[92vh] flex items-center"
        >

            <HeroBackground3D />

            <div
                ref={spotlightRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(calc(48vmax) circle at var(--mx,50%) var(--my,40%), rgba(255,145,66,0.24), rgba(255,145,66,0.08) 45%, transparent 78%)',
                }}
                aria-hidden="true"
            />

            <GrainOverlay />

            <div className="absolute inset-0 bg-gradient-to-b from-paper-50/10 via-paper-50/40 to-paper-50 dark:from-ink-950/10 dark:via-ink-950/50 dark:to-ink-950 pointer-events-none" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                style={{ opacity: contentOpacity, y: contentY }}className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 w-full grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center"

            >
                <div className="flex flex-col items-start gap-6">
                    <motion.h1
                        variants={itemVariants}
                        className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] max-w-3xl"
                    >
                        <span className="block text-ink-900 dark:text-paper-50">{t('hero.titlePrefix')}</span>
                        <span className="block mt-1">
            <RewireWord words={rotatingWords} />
          </span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg max-w-xl text-ink-800/80 dark:text-paper-100/75"
                    >
                        {t('hero.subtitle')}
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
                        <CTA to="/contact">{t('hero.cta')}</CTA>
                    </motion.div>

                    <motion.ol variants={itemVariants} className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4 font-display text-xs sm:text-sm">
                        {steps.map((step, i) => (
                            <li key={step} className="flex items-center gap-2 sm:gap-3">
                                {i > 0 && <span className="w-4 sm:w-6 h-px bg-ember-500/40" aria-hidden="true" />}
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.9 + i * 0.15, duration: 0.4 }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ember-500/25 text-ink-800 dark:text-paper-100"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-ember-gradient shadow-[0_0_6px_rgba(255,122,26,0.8)]" />
                                    {step}
                                </motion.span>
                            </li>
                        ))}
                    </motion.ol>
                </div>

                <motion.div
                    variants={itemVariants}
                    className="relative w-full h-[280px] sm:h-[360px] lg:h-[560px]"
                >
                    <HeroModel3D />
                </motion.div>
            </motion.div>
        </section>
    )
}