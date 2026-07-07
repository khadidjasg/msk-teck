import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext.jsx'

const STAR_POSITIONS = [
    { top: '3px', left: '5px' },
    { top: '7px', right: '3px' },
    { bottom: '5px', left: '3px' },
    { bottom: '3px', right: '7px' },
]

const SUN_RAYS = [0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => ({ deg, long: i % 2 === 0 }))

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()
    const { t } = useTranslation()
    const isLight = theme === 'light'

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={isLight}
            aria-label={isLight ? t('theme.toggleToDark') : t('theme.toggleToLight')}
            className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ember-500 rounded-full"
            style={{ perspective: '240px' }}
        >
            {STAR_POSITIONS.map((pos, i) => (
                <motion.span
                    key={i}
                    aria-hidden="true"
                    className="absolute z-0 w-[3px] h-[3px] rounded-full bg-paper-100 pointer-events-none"
                    style={pos}
                    animate={{ opacity: isLight ? 0 : [0.15, 1, 0.15] }}
                    transition={{ duration: 1.5 + i * 0.3, repeat: isLight ? 0 : Infinity, ease: 'easeInOut' }}
                />
            ))}

            <motion.div
                className="relative z-10 w-full h-full rounded-full"
                style={{
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                }}
                animate={{
                    rotateY: isLight ? 0 : 180,
                    boxShadow: isLight
                        ? '0 0 14px 1px rgba(255,122,26,0.45)'
                        : '0 0 10px 1px rgba(59,91,255,0.35)',
                }}
                transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
            >
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg) translateZ(0.5px)',
                        WebkitTransform: 'rotateY(0deg) translateZ(0.5px)',
                        background: 'radial-gradient(circle at 38% 32%, #FFF6E0 0%, #FFD9A8 22%, #FF9142 55%, #E63312 100%)',
                        boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.65), inset 0 0 6px rgba(255,255,255,0.35)',
                    }}
                >
                    <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full"
                        style={{ boxShadow: '0 0 0 0 rgba(255,145,66,0.55)' }}
                        animate={isLight ? { boxShadow: ['0 0 0 0 rgba(255,145,66,0.5)', '0 0 0 5px rgba(255,145,66,0)'] } : {}}
                        transition={{ duration: 1.8, repeat: isLight ? Infinity : 0, ease: 'easeOut' }}
                    />
                    <motion.div
                        className="absolute inset-0"
                        animate={isLight ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 14, repeat: isLight ? Infinity : 0, ease: 'linear' }}
                    >
                        {SUN_RAYS.map(({ deg, long }) => (
                            <span
                                key={deg}
                                className="absolute left-1/2 top-1/2 rounded-full bg-paper-50"
                                style={{
                                    width: '1.6px',
                                    height: long ? '5.5px' : '3.5px',
                                    opacity: 0.95,
                                    boxShadow: '0 0 2px rgba(255,255,255,0.8)',
                                    transform: `translate(-50%,-50%) rotate(${deg}deg) translateY(-15px)`,
                                }}
                            />
                        ))}
                    </motion.div>
                </div>

                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg) translateZ(0.5px)',
                        WebkitTransform: 'rotateY(180deg) translateZ(0.5px)',
                        background: 'radial-gradient(circle at 35% 30%, #E7E7EA, #A8ACB4 55%, #6C7078 100%)',
                        boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.35)',
                    }}
                >
                    <span className="absolute w-1.5 h-1.5 rounded-full bg-black/10" style={{ top: '30%', left: '55%' }} />
                    <span className="absolute w-1 h-1 rounded-full bg-black/10" style={{ top: '55%', left: '35%' }} />
                    <span className="absolute w-[3px] h-[3px] rounded-full bg-black/10" style={{ top: '65%', left: '60%' }} />
                </div>
            </motion.div>
        </button>
    )
}