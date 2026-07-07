import { useEffect, useMemo, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Globe,
    Smartphone,
    Cpu,
    ShieldCheck,
    Palette,
    ArrowUpRight,
    ImagePlus,
    Loader2,
    FolderOpen,
    AlertCircle,
    Sparkles,
} from 'lucide-react'

import { supabase } from '../lib/supabaseClient.js'

const CATEGORIES = ['web', 'mobile', 'software', 'cyber', 'design']

const CATEGORY_ICONS = {
    web: Globe,
    mobile: Smartphone,
    software: Cpu,
    cyber: ShieldCheck,
    design: Palette,
}

const CATEGORY_GRADIENTS = {
    web: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
    mobile: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
    software: 'linear-gradient(135deg, #10B981 0%, #06FFA5 100%)',
    cyber: 'linear-gradient(135deg, #F59E0B 0%, #FF9142 100%)',
    design: 'linear-gradient(135deg, #EC4899 0%, #FF7A1A 100%)',
}

const CATEGORY_COLORS = {
    web: '#8B5CF6',
    mobile: '#3B82F6',
    software: '#10B981',
    cyber: '#F59E0B',
    design: '#EC4899',
}

function getGridClass(count, index) {
    if (count === 1) return 'col-span-full row-span-2'
    if (count === 2) return index === 0 ? 'col-span-full sm:col-span-2 row-span-2' : 'col-span-full sm:col-span-1'
    if (count === 3) return index === 0 ? 'col-span-full sm:col-span-2 row-span-2' : 'col-span-1'
    if (count === 4) return index < 2 ? 'col-span-1 row-span-2' : 'col-span-1'
    if (count === 5) return index === 0 ? 'col-span-full sm:col-span-2 row-span-2' : 'col-span-1'
    const patterns = [
        'col-span-full sm:col-span-2 row-span-2',
        'col-span-1',
        'col-span-1',
        'col-span-1 row-span-2',
        'col-span-1',
        'col-span-1',
    ]
    return patterns[index % patterns.length]
}

function AnimatedCounter({ value, duration = 2 }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let start = 0
        const end = value
        const incrementTime = (duration * 1000) / end
        const timer = setInterval(() => {
            start += 1
            setCount(start)
            if (start >= end) clearInterval(timer)
        }, incrementTime)
        return () => clearInterval(timer)
    }, [value, duration])

    return <span className="font-display font-bold tabular-nums">{count}</span>
}

function ProjectImage({ src, gradient, Icon }) {
    const [failed, setFailed] = useState(false)

    if (!src || failed) {
        return (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: gradient }}>
                <Icon size={48} strokeWidth={1.2} className="text-white/40" />
            </div>
        )
    }
    return (
        <img
            src={src}
            alt=""
            onError={() => setFailed(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
        />
    )
}

function ProjectCard({ project, index, count }) {
    const Icon = CATEGORY_ICONS[project.category] || Globe
    const gradient = CATEGORY_GRADIENTS[project.category]
    const color = CATEGORY_COLORS[project.category]
    const { i18n, t } = useTranslation()
    const lang = i18n.language?.split('-')[0] || 'fr'

    const gridClass = getGridClass(count, index)
    const techList = (project.tech_stack || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)

    const description = project.description?.[lang] || project.description?.fr || project.description || ''

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative ${gridClass}`}
        >
            <Link
                to={`/our-work/${project.slug}`}
                className="relative flex flex-col h-full min-h-[240px] rounded-2xl overflow-hidden bg-ink-900/50"
            >
                <div className="absolute inset-0">
                    <ProjectImage src={project.cover_image_url} gradient={gradient} Icon={Icon} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)` }}
                    />
                </div>

                <div className="relative mt-auto p-5 sm:p-6 flex flex-col gap-3 z-10">
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 + 0.2 }}
                        className="inline-flex items-center gap-1.5 w-fit text-[11px] font-display font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-white backdrop-blur-md"
                        style={{ background: `${color}30`, border: `1px solid ${color}50` }}
                    >
                        <Icon size={12} strokeWidth={2.5} />
                        {t(`ourWork.categories.${project.category}`)}
                    </motion.span>

                    <h3 className="font-display text-lg sm:text-xl lg:text-2xl text-white font-bold leading-tight group-hover:text-amber-100 transition-colors duration-300">
                        {project.title}
                    </h3>

                    <p className="text-sm text-white/60 line-clamp-2 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-1">
                        {techList.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-white/10 text-white/70 backdrop-blur-sm border border-white/5"
                            >
                                {tech}
                            </span>
                        ))}
                        {techList.length > 4 && (
                            <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-white/10 text-white/70">
                                +{techList.length - 4}
                            </span>
                        )}
                    </div>
                </div>

                <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowUpRight size={18} strokeWidth={2.5} />
                    </div>
                </div>

                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="font-display text-6xl sm:text-7xl font-bold" style={{ color: `${color}15` }}>
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>
            </Link>
        </motion.div>
    )
}

function SkeletonCard({ className = '' }) {
    return (
        <div className={`relative rounded-2xl overflow-hidden bg-ink-900/30 animate-pulse ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
                <div className="h-5 w-20 rounded-full bg-white/10" />
                <div className="h-7 w-3/4 rounded-lg bg-white/10" />
                <div className="h-4 w-full rounded bg-white/5" />
            </div>
        </div>
    )
}

function EmptyState({ isFiltered, onClear }) {
    const { t } = useTranslation()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 sm:py-32 text-center"
        >
            <div className="relative mb-6">
                <div
                    className="w-24 h-24 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #FF914220, #E6331220)' }}
                >
                    <FolderOpen size={40} strokeWidth={1.2} className="text-ember-500/60" />
                </div>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-3 rounded-full border border-dashed border-ember-500/20"
                />
            </div>
            <h3 className="font-display text-xl sm:text-2xl text-ink-900 dark:text-paper-50 font-bold mb-2">
                {isFiltered ? t('ourWork.noResults') || 'Aucun résultat' : t('ourWork.noProjects') || 'Projets à venir'}
            </h3>
            <p className="text-sm text-ink-800/50 dark:text-paper-100/40 max-w-sm mb-6">
                {isFiltered
                    ? t('ourWork.tryAnotherFilter') || 'Essayez une autre catégorie'
                    : t('ourWork.comingSoon') || 'Nos premiers projets seront bientôt disponibles.'}
            </p>
            {isFiltered && (
                <button
                    onClick={onClear}
                    className="px-5 py-2.5 rounded-full text-sm font-display font-semibold text-white bg-ember-gradient shadow-lg shadow-ember-600/25 hover:shadow-ember-600/40 transition-shadow"
                >
                    {t('ourWork.showAll') || 'Voir tout'}
                </button>
            )}
        </motion.div>
    )
}

function ErrorState({ onRetry }) {
    const { t } = useTranslation()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 sm:py-32 text-center"
        >
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                <AlertCircle size={36} className="text-red-500/60" />
            </div>
            <h3 className="font-display text-xl text-ink-900 dark:text-paper-50 font-bold mb-2">
                {t('ourWork.errorTitle') || 'Oups, un problème'}
            </h3>
            <p className="text-sm text-ink-800/50 dark:text-paper-100/40 max-w-sm mb-6">
                {t('ourWork.errorDesc') || 'Impossible de charger les projets. Vérifiez votre connexion.'}
            </p>
            <button
                onClick={onRetry}
                className="px-5 py-2.5 rounded-full text-sm font-display font-semibold text-white bg-ember-gradient shadow-lg shadow-ember-600/25 hover:shadow-ember-600/40 transition-all flex items-center gap-2"
            >
                <Loader2 size={16} className="animate-spin" />
                {t('ourWork.retry') || 'Réessayer'}
            </button>
        </motion.div>
    )
}

export default function OurWork() {
    const { t, i18n } = useTranslation()
    const [active, setActive] = useState('all')
    const [projects, setProjects] = useState([])
    const [status, setStatus] = useState('loading')

    const loadProjects = useCallback(async () => {
        setStatus('loading')
        try {
            if (!supabase) throw new Error('Supabase client non configuré (vérifie .env)')

            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error

            setProjects(data || [])
            setStatus('ready')
        } catch (err) {
            console.error('[OurWork] Error:', err)
            setStatus('error')
        }
    }, [])

    useEffect(() => {
        loadProjects()
    }, [loadProjects])

    const filtered = useMemo(
        () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
        [active, projects]
    )

    const tabs = ['all', ...CATEGORIES]

    return (
        <section className="relative min-h-screen py-20 sm:py-28 overflow-hidden bg-paper-50 dark:bg-ink-950 transition-colors duration-500">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(circle at 80% 10%, rgba(255,145,66,0.12), transparent 45%),
                        radial-gradient(circle at 20% 80%, rgba(230,51,18,0.08), transparent 45%)
                    `,
                }}
            />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 mb-6"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ember-500" />
                        </span>
                        <span className="text-[11px] sm:text-xs font-display font-bold uppercase tracking-[0.2em] text-ember-500">
                            {t('ourWork.badge')}
                        </span>
                    </motion.div>

                    <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-ink-900 dark:text-paper-50 mb-4 leading-tight">
                        {t('ourWork.heading')}
                    </h1>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base text-ink-800/60 dark:text-paper-100/50">
                        <p>{t('ourWork.subtitle')}</p>
                        {status === 'ready' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ember-500/10 text-ember-500 text-xs font-display font-bold">
                                <Sparkles size={12} />
                                <AnimatedCounter value={projects.length} /> projets
                            </span>
                        )}
                    </div>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-14">
                    {tabs.map((cat) => {
                        const isActive = active === cat
                        return (
                            <button
                                key={cat}
                                onClick={() => setActive(cat)}
                                className="relative px-5 py-2.5 rounded-full text-sm font-display transition-all duration-300"
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="ourwork-filter-pill"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        className="absolute inset-0 rounded-full bg-ember-gradient shadow-lg shadow-ember-600/25"
                                    />
                                )}
                                <span className={`relative z-10 ${isActive ? 'text-white font-semibold' : 'text-ink-800/60 dark:text-paper-100/50 hover:text-ember-500'}`}>
                                    {t(`ourWork.categories.${cat}`)}
                                </span>
                            </button>
                        )
                    })}
                </div>

                <AnimatePresence mode="wait">
                    {status === 'loading' && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
                        >
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <SkeletonCard key={i} className={getGridClass(6, i - 1)} />
                            ))}
                        </motion.div>
                    )}

                    {status === 'error' && <ErrorState key="error" onRetry={loadProjects} />}

                    {status === 'ready' && filtered.length === 0 && (
                        <EmptyState key="empty" isFiltered={active !== 'all'} onClear={() => setActive('all')} />
                    )}

                    {status === 'ready' && filtered.length > 0 && (
                        <motion.div
                            key="grid"
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] sm:auto-rows-[240px] gap-4 sm:gap-5"
                        >
                            <AnimatePresence mode="popLayout">
                                {filtered.map((project, i) => (
                                    <ProjectCard key={project.slug} project={project} index={i} count={filtered.length} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}