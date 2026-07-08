import { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'

const STAR_META = [
    { color: '#8B5CF6', glow: 'rgba(139,92,246,0.3)' },
    { color: '#3B82F6', glow: 'rgba(59,130,246,0.3)' },
    { color: '#06B6D4', glow: 'rgba(6,182,212,0.3)' },
    { color: '#10B981', glow: 'rgba(16,185,129,0.3)' },
    { color: '#F59E0B', glow: 'rgba(245,158,11,0.3)' },
    { color: '#EC4899', glow: 'rgba(236,72,153,0.3)' },
]

const ICONS = [
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3 8 9l4 13 4-13-3-6z"/><path d="m2 9 20 0"/></svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
]


function TimelineItem({ item, index, meta, icon, isDark, isLast, isRTL }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const isLeft = isRTL ? index % 2 === 1 : index % 2 === 0

    return (
        <div ref={ref} className="relative flex items-center w-full">
            <div className="flex w-full items-center md:justify-center">
                <div className={`hidden md:flex w-[calc(50%-40px)] ${isLeft ? 'justify-end pr-12' : 'justify-start opacity-0'}`}>
                    {isLeft && (
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative max-w-sm"
                        >
                            <Card item={item} meta={meta} icon={icon} isDark={isDark} index={index} />
                        </motion.div>
                    )}
                </div>

                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative z-10 flex-shrink-0"
                >
                    <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-500"
                        style={{
                            background: isInView ? `${meta.color}20` : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'),
                            border: `2px solid ${isInView ? meta.color : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')}`,
                            boxShadow: isInView ? `0 0 24px ${meta.glow}, inset 0 0 12px ${meta.glow}` : 'none',
                        }}
                    >
                        <span style={{ color: isInView ? meta.color : (isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)') }}>
                            {icon}
                        </span>
                    </div>

                    {isInView && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute inset-0 rounded-full"
                            style={{ border: `2px solid ${meta.color}`, boxShadow: `0 0 20px ${meta.glow}` }}
                        />
                    )}
                </motion.div>

                <div className={`hidden md:flex w-[calc(50%-40px)] ${!isLeft ? 'justify-start pl-12' : 'justify-end opacity-0'}`}>
                    {!isLeft && (
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative max-w-sm"
                        >
                            <Card item={item} meta={meta} icon={icon} isDark={isDark} index={index} />
                        </motion.div>
                    )}
                </div>

                <div className={`flex md:hidden flex-1 ${isRTL ? 'mr-6' : 'ml-6'}`}>
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative w-full max-w-sm"
                    >
                        <Card item={item} meta={meta} icon={icon} isDark={isDark} index={index} />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}


function Card({ item, meta, icon, isDark, index }) {
    return (
        <div
            className="relative p-6 sm:p-7 rounded-2xl transition-all duration-500 overflow-hidden"
            style={{
                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                backdropFilter: 'blur(12px)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${meta.color}40`
                e.currentTarget.style.boxShadow = `0 8px 40px ${meta.glow}, 0 0 60px ${meta.glow}40`
                e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
            }}
        >
            <div
                className="absolute top-0 left-6 right-6 h-[2px] rounded-full transition-all duration-500 group-hover:left-4 group-hover:right-4"
                style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }}
            />

            <div
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg mb-4 text-xs font-bold font-display"
                style={{
                    background: `${meta.color}15`,
                    color: meta.color,
                    border: `1px solid ${meta.color}30`,
                }}
            >
                {String(index + 1).padStart(2, '0')}
            </div>

            <p
                className="text-[15px] sm:text-base leading-relaxed font-body font-medium"
                style={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(10,10,11,0.85)' }}
            >
                {item}
            </p>

            <div
                className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${meta.color}60, transparent)` }}
            />
        </div>
    )
}


function TimelineLine({ items, isDark, isRTL }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, margin: '-200px' })

    return (
        <div ref={ref} className={`absolute ${isRTL ? 'right-5 md:right-1/2 md:translate-x-px' : 'left-5 md:left-1/2 md:-translate-x-px'} top-0 bottom-0 w-[2px]`}>
            <div
                className="absolute inset-0 w-full"
                style={{
                    background: isDark
                        ? 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.05))'
                        : 'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.05))',
                }}
            />
            <motion.div
                className="absolute top-0 left-0 w-full origin-top"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 2, ease: 'easeOut' }}
                style={{
                    height: '100%',
                    background: 'linear-gradient(to bottom, #FF9142, #FF7A1A, #E63312, #FF9142)',
                    boxShadow: '0 0 20px rgba(255,145,66,0.4)',
                }}
            />
            {items.map((_, i) => (
                <div
                    key={i}
                    className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                    style={{
                        top: `${(i / (items.length - 1)) * 100}%`,
                        background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    }}
                />
            ))}
        </div>
    )
}

export default function WhatYouGain() {
    const { t, i18n } = useTranslation()
    const [isDark, setIsDark] = useState(true)
    const isRTL = i18n.language === 'ar'

    useEffect(() => {
        const html = document.documentElement
        const observer = new MutationObserver(() => {
            setIsDark(html.classList.contains('dark'))
        })
        observer.observe(html, { attributes: true, attributeFilter: ['class'] })
        setIsDark(html.classList.contains('dark'))
        return () => observer.disconnect()
    }, [])

    const items = t('whatYouGain.items', { returnObjects: true }) || []
    const currentLang = i18n.language || 'fr'

    if (items.length === 0) {
        return (
            <section className="relative py-24 sm:py-32 bg-paper-50 dark:bg-ink-950">
                <div className="max-w-5xl mx-auto px-5 text-center">
                    <p className="text-ink-800/40 dark:text-paper-100/40">Loading...</p>
                </div>
            </section>
        )
    }

    return (
        <section className="relative py-24 sm:py-32 overflow-hidden bg-paper-50 dark:bg-ink-950 transition-colors duration-500">
            <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 sm:mb-24"
                >
                    <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-ember-500 font-medium mb-4">
                        {currentLang === 'ar' ? 'مستقبلك' : currentLang === 'en' ? 'Your Future' : 'Votre Avenir'}
                    </span>
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
                        {t('whatYouGain.title')}
                    </h2>
                </motion.div>

                <div className="relative">
                    <TimelineLine items={items} isDark={isDark} isRTL={isRTL} />

                    <div className="relative flex flex-col gap-12 sm:gap-16 md:gap-20 py-4">
                        {items.map((item, i) => (
                            <TimelineItem
                                key={i}
                                item={item}
                                index={i}
                                meta={STAR_META[i % STAR_META.length]}
                                icon={ICONS[i % ICONS.length]}
                                isDark={isDark}
                                isLast={i === items.length - 1}
                                isRTL={isRTL}
                            />
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl mx-auto text-center mt-20 sm:mt-28"
                >
                    <span
                        aria-hidden="true"
                        className="block font-display italic text-5xl sm:text-7xl leading-none mb-3 select-none"
                        style={{
                            background: 'linear-gradient(135deg, #FF9142 0%, #E63312 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            opacity: 0.25,
                        }}
                    >
                        "
                    </span>
                    <motion.p
                        animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
                        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                        className="font-display italic font-semibold text-xl sm:text-3xl leading-relaxed"
                        style={{
                            backgroundImage: 'linear-gradient(90deg, #FF9142, #FFD166, #E63312, #FF9142)',
                            backgroundSize: '300% 100%',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        {t('whatYouGain.quote')}
                    </motion.p>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="mx-auto mt-8 h-[2px] w-16 rounded-full"
                        style={{
                            background: 'linear-gradient(90deg, transparent, #FF9142, transparent)',
                        }}
                    />
                </motion.div>
            </div>
        </section>
    )
}