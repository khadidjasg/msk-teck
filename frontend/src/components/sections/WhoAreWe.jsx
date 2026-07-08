import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BookOpen, Wrench, Hammer } from 'lucide-react'

const ICONS = [BookOpen, Wrench, Hammer]

export default function WhoAreWe() {
    const { t, i18n } = useTranslation()
    const pillars = t('whoAreWe.pillars', { returnObjects: true })
    const sectionRef = useRef(null)
    const isRTL = i18n.language === 'ar'

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 75%', 'end 55%'],
    })

    return (
        <section ref={sectionRef} className="relative py-24 sm:py-36 bg-paper-50 dark:bg-ink-950 overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(circle at 85% 10%, rgba(255,145,66,0.16), transparent 50%), radial-gradient(circle at 5% 90%, rgba(230,51,18,0.12), transparent 45%)',
                }}
            />
            <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl mb-20 sm:mb-28"
                >
                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-bold tracking-widest uppercase text-white mb-4 px-3 py-1.5 rounded-full bg-ember-gradient shadow-md shadow-ember-600/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
                        {t('whoAreWe.title')}
                    </span>
                    <p className="text-xl sm:text-2xl leading-snug text-ink-900 dark:text-paper-50 font-display">
                        {t('whoAreWe.description')}
                    </p>
                </motion.div>

                <div className={`relative ${isRTL ? 'pr-9 sm:pr-0' : 'pl-9 sm:pl-0'}`}>
                    <div className={`absolute ${isRTL ? 'right-[7px] sm:right-1/2' : 'left-[7px] sm:left-1/2'} top-0 bottom-0 w-px bg-ink-800/10 dark:bg-paper-100/10 sm:-translate-x-1/2`} />

                    <motion.div
                        style={{ scaleY: scrollYProgress }}
                        className={`absolute ${isRTL ? 'right-[7px] sm:right-1/2' : 'left-[7px] sm:left-1/2'} top-0 bottom-0 w-px bg-ember-gradient origin-top sm:-translate-x-1/2`}
                    />

                    <motion.div
                        aria-hidden="true"
                        style={{ top: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
                        className={`absolute ${isRTL ? 'right-[7px] sm:right-1/2' : 'left-[7px] sm:left-1/2'} w-2.5 h-2.5 rounded-full bg-paper-50 dark:bg-ink-950 sm:-translate-x-1/2 -translate-y-1/2`}
                    >
                        <span className="absolute inset-0 rounded-full bg-ember-gradient shadow-[0_0_10px_3px_rgba(255,122,26,0.75)]" />
                    </motion.div>

                    <div className="flex flex-col gap-16 sm:gap-8">
                        {pillars.map((pillar, i) => {
                            const Icon = ICONS[i % ICONS.length]
                            const reverse = isRTL ? i % 2 === 0 : i % 2 === 1
                            return (
                                <motion.div
                                    key={pillar.title}
                                    initial={{ opacity: 0, x: reverse ? 30 : -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-100px' }}
                                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                    className={`relative flex ${reverse ? 'sm:justify-end' : 'sm:justify-start'}`}
                                >
                                    <div
                                        className={`relative w-full sm:w-[46%] flex items-start gap-4 ${
                                            reverse ? 'sm:flex-row-reverse sm:text-right' : ''
                                        }`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`hidden sm:block pointer-events-none select-none absolute -top-10 font-display font-bold text-[7rem] leading-none text-ember-500/20 dark:text-ember-500/15 ${
                                                reverse ? 'right-0 sm:right-2' : 'left-0 sm:left-0'
                                            }`}
                                        >
                                            0{i + 1}
                                        </span>

                                        <span className="relative z-10 flex items-center justify-center w-11 h-11 shrink-0 rounded-full bg-ember-gradient text-white shadow-md shadow-ember-600/25 mt-1">
                                            <Icon size={19} strokeWidth={2} />
                                        </span>
                                        <div className="relative z-10">
                                            <h3 className="font-display text-xl sm:text-2xl text-ink-900 dark:text-paper-50">
                                                {pillar.title}
                                            </h3>
                                            <p className="mt-1 text-sm sm:text-base text-ink-800/70 dark:text-paper-100/65 max-w-xs">
                                                {pillar.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}