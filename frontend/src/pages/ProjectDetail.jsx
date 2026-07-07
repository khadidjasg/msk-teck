import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Globe, Smartphone, Cpu, ShieldCheck, Palette, ImagePlus, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabaseClient.js'

const CATEGORY_ICONS = { web: Globe, mobile: Smartphone, software: Cpu, cyber: ShieldCheck, design: Palette }
const CATEGORY_GRADIENTS = {
    web: 'linear-gradient(135deg, #FFC978 0%, #FF8A2E 55%, #E63312 100%)',
    mobile: 'linear-gradient(135deg, #FFD166 0%, #FF9142 55%, #C71F0B 100%)',
    software: 'linear-gradient(135deg, #FFDD94 0%, #FF9142 55%, #E63312 100%)',
    cyber: 'linear-gradient(135deg, #FF9142 0%, #B81808 100%)',
    design: 'linear-gradient(135deg, #FFE9AD 0%, #FF7A1A 55%, #E63312 100%)',
}

function GalleryImage({ src, gradient, Icon }) {
    const [failed, setFailed] = useState(false)
    if (!src || failed) {
        return (
            <div className="w-full h-full flex items-center justify-center rounded-2xl" style={{ background: gradient }}>
                <Icon size={28} strokeWidth={1.5} className="text-white/70" />
            </div>
        )
    }
    return <img src={src} alt="" onError={() => setFailed(true)} className="w-full h-full object-cover rounded-2xl" />
}

export default function ProjectDetail() {
    const { slug } = useParams()
    const { t, i18n } = useTranslation()
    const lang = i18n.language?.split('-')[0] || 'fr'
    const isRTL = document.documentElement.dir === 'rtl'
    const BackIcon = isRTL ? ArrowRight : ArrowLeft

    const [project, setProject] = useState(null)
    const [status, setStatus] = useState('loading') // loading | ready | notfound | error

    useEffect(() => {
        let cancelled = false
        async function load() {
            setStatus('loading')
            try {
                if (!supabase) throw new Error('Supabase client non configuré (vérifie .env)')

                const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).maybeSingle()
                if (cancelled) return
                if (error) throw error

                if (!data) {
                    setStatus('notfound')
                    return
                }
                setProject(data)
                setStatus('ready')
            } catch (err) {
                if (cancelled) return
                console.error('[ProjectDetail] Supabase error:', err)
                setStatus('error')
            }
        }
        load()
        return () => {
            cancelled = true
        }
    }, [slug])

    if (status === 'notfound') return <Navigate to="/our-work" replace />

    if (status === 'loading') {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-ink-800/50 dark:text-paper-100/45">
                <Loader2 size={26} className="animate-spin" />
            </div>
        )
    }

    if (status === 'error') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-center px-6 text-ink-800/50 dark:text-paper-100/45">
                <ImagePlus size={26} strokeWidth={1.5} />
                <p className="text-sm max-w-md">Impossible de charger ce projet. Vérifie ta connexion Supabase.</p>
                <Link to="/our-work" className="text-sm text-ember-500 hover:underline">
                    {t('ourWork.backToProjects')}
                </Link>
            </div>
        )
    }

    const Icon = CATEGORY_ICONS[project.category] || Globe
    const gradient = CATEGORY_GRADIENTS[project.category]
    const description = project.description?.[lang] || project.description?.fr || ''
    const longText = project.long_description?.[lang] || project.long_description?.fr || ''
    const paragraphs = longText.split('\n\n').filter(Boolean)
    const techList = (project.tech_stack || '').split(',').map((s) => s.trim()).filter(Boolean)
    const galleryUrls = (project.gallery_urls || '').split(',').map((s) => s.trim()).filter(Boolean)

    return (
        <section className="relative py-16 sm:py-24 overflow-hidden bg-paper-50 dark:bg-ink-950">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(circle at 88% 8%, rgba(255,145,66,0.16), transparent 50%), radial-gradient(circle at 8% 92%, rgba(230,51,18,0.12), transparent 50%)',
                }}
            />

            <div className="relative max-w-4xl mx-auto px-5 sm:px-8">
                <motion.div initial={{ opacity: 0, x: isRTL ? 10 : -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                    <Link
                        to="/our-work"
                        className="inline-flex items-center gap-2 text-sm font-display text-ink-800/65 dark:text-paper-100/60 hover:text-ember-500 transition-colors mb-8"
                    >
                        <BackIcon size={16} />
                        {t('ourWork.backToProjects')}
                    </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                    <span
                        className="inline-flex items-center gap-1.5 text-xs font-display font-semibold px-2.5 py-1 rounded-full text-white mb-5"
                        style={{ background: gradient }}
                    >
                        <Icon size={12} strokeWidth={2.2} />
                        {t(`ourWork.categories.${project.category}`)}
                    </span>

                    <h1 className="font-display font-bold text-3xl sm:text-5xl text-ink-900 dark:text-paper-50 mb-4">
                        {project.title}
                    </h1>
                    <p className="text-base sm:text-lg text-ink-800/70 dark:text-paper-100/65 max-w-2xl mb-8">{description}</p>

                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 shadow-2xl">
                        <GalleryImage src={project.cover_image_url} gradient={gradient} Icon={Icon} />
                    </div>

                    {techList.length > 0 && (
                        <>
                            <h2 className="font-display text-sm tracking-widest uppercase text-ember-600 dark:text-ember-400 mb-3">
                                {t('ourWork.techStack')}
                            </h2>
                            <div className="flex flex-wrap gap-2 mb-10">
                                {techList.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-xs sm:text-sm px-3 py-1.5 rounded-full border border-ember-500/25 text-ink-800 dark:text-paper-100"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}

                    {paragraphs.length > 0 && (
                        <div className="flex flex-col gap-4 mb-12 max-w-2xl">
                            {paragraphs.map((p, i) => (
                                <p key={i} className="text-sm sm:text-base leading-relaxed text-ink-800/75 dark:text-paper-100/70">
                                    {p}
                                </p>
                            ))}
                        </div>
                    )}

                    {galleryUrls.length > 0 && (
                        <>
                            <h2 className="font-display text-sm tracking-widest uppercase text-ember-600 dark:text-ember-400 mb-4">
                                {t('ourWork.gallery')}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {galleryUrls.map((url, i) => (
                                    <div key={i} className="aspect-video">
                                        <GalleryImage src={url} gradient={gradient} Icon={ImagePlus} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </section>
    )
}