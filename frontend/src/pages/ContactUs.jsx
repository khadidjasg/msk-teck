import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { socialLinks } from '../data/socialLinks.js'

/** Champ à soulignement animé — pas de boîte, juste une ligne qui s'illumine au focus */
function Field({ id, label, type = 'text', textarea, value, onChange, error }) {
    const commonProps = {
        id,
        name: id,
        value,
        onChange,
        placeholder: ' ',
        className:
            'peer w-full bg-transparent text-ink-900 dark:text-paper-50 px-0.5 pt-6 pb-2 border-b-2 border-ink-800/15 dark:border-paper-100/15 focus:border-ember-500 focus:outline-none transition-colors duration-300',
    }

    return (
        <div className="relative">
            {textarea ? (
                <textarea {...commonProps} rows={4} className={`${commonProps.className} resize-none`} />
            ) : (
                <input {...commonProps} type={type} />
            )}
            <label
                htmlFor={id}
                className="absolute left-0.5 rtl:left-auto rtl:right-0.5 top-4 text-base text-ink-800/45 dark:text-paper-100/40 pointer-events-none transition-all duration-200
                    peer-focus:top-0 peer-focus:text-xs peer-focus:text-ember-500
                    peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
            >
                {label}
            </label>
            <AnimatePresence>
                {error && (
                    <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="block mt-1.5 text-xs text-[#E63312]"
                    >
                        {error}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    )
}

/** Bouton réseau social — neutre au repos, le dégradé de marque n'apparaît qu'au survol */
function SocialButton({ href, label, icon: Icon, gradient, delay }) {
    const isExternal = href.startsWith('http')

    return (
        <motion.a
            href={href}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            aria-label={label}
            title={label}
            initial={{ opacity: 0, y: 12, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay }}
            whileHover={{ y: -4, scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-ink-800/12 dark:border-paper-100/12 overflow-hidden"
        >
            {/* couche colorée — cachée au repos, révélée au survol */}
            <span
                aria-hidden="true"
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: gradient }}
            />
            {/* halo qui déborde légèrement au survol, pour un vrai effet "wow" sans être bruyant au repos */}
            <span
                aria-hidden="true"
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-300"
                style={{ background: gradient }}
            />
            <Icon
                size={20}
                strokeWidth={1.75}
                className="relative text-ink-800/70 dark:text-paper-100/70 group-hover:text-white transition-colors duration-300"
            />
        </motion.a>
    )
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactUs() {
    const { t } = useTranslation()
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', company: '' })
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState('idle') // idle | loading | success | error

    const handleChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    }

    const validate = () => {
        const errs = {}
        if (!form.name.trim()) errs.name = t('contact.errors.required')
        if (!form.email.trim()) errs.email = t('contact.errors.required')
        else if (!EMAIL_RE.test(form.email)) errs.email = t('contact.errors.email')
        if (!form.message.trim()) errs.message = t('contact.errors.required')
        return errs
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.company) return // honeypot anti-spam, silencieux

        const errs = validate()
        setErrors(errs)
        if (Object.keys(errs).length > 0) return

        setStatus('loading')
        const payload = {
            name: form.name,
            email: form.email,
            phone: form.phone || null,
            subject: form.subject,
            message: form.message,
        }

        const base = import.meta.env.VITE_API_URL

        try {
            if (!base) {
                throw new Error('VITE_API_URL manquant — backend non configuré côté frontend.')
            }

            const res = await fetch(`${base}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            if (!res.ok) throw new Error('request failed')

            setStatus('success')
            setForm({ name: '', email: '', phone: '', subject: '', message: '', company: '' })
            setTimeout(() => setStatus('idle'), 5000)
        } catch (err) {
            console.error('[Contact] Envoi échoué:', err)
            setStatus('error')
        }
    }

    return (
        <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-paper-50 dark:bg-ink-950">
            {/* halo de couleur permanent, cohérent avec le reste du site */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(circle at 12% 15%, rgba(255,145,66,0.18), transparent 50%), radial-gradient(circle at 92% 85%, rgba(230,51,18,0.14), transparent 50%)',
                }}
            />

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
                {/* colonne info */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col justify-center"
                >
                    <span className="inline-flex items-center gap-2 w-fit text-xs sm:text-sm font-display text-ember-600 dark:text-ember-400 mb-5">
                        <span className="relative flex w-2 h-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-ember-500 opacity-60 animate-ping" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-ember-gradient" />
                        </span>
                        {t('contact.availability')}
                    </span>

                    <h1 className="font-display font-bold text-3xl sm:text-5xl leading-[1.1] text-ink-900 dark:text-paper-50 mb-5">
                        {t('contact.title')}
                    </h1>
                    <p className="text-base sm:text-lg text-ink-800/70 dark:text-paper-100/65 max-w-md mb-10">
                        {t('contact.subtitle')}
                    </p>

                    <a
                        href={`mailto:${t('contact.email')}`}
                        className="group inline-flex items-center gap-3 mb-2 font-display text-lg sm:text-xl text-ink-900 dark:text-paper-50 w-fit"
                    >
                        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-ember-gradient text-white shadow-md shadow-ember-600/25 group-hover:scale-105 transition-transform">
                            <Mail size={18} strokeWidth={2} />
                        </span>
                        <span className="border-b-2 border-transparent group-hover:border-ember-500 transition-colors">
                            {t('contact.email')}
                        </span>
                    </a>
                    <p className="text-xs sm:text-sm text-ink-800/50 dark:text-paper-100/45 pl-14 mb-8">
                        {t('contact.responseNote')}
                    </p>

                    {/* réseaux sociaux — source unique : src/data/socialLinks.js */}
                    <div className="flex items-center gap-3 pl-0.5">
                        {socialLinks.map((social, i) => (
                            <SocialButton
                                key={social.name}
                                href={social.url}
                                label={
                                    social.name === 'Email'
                                        ? t('contact.emailLabel')
                                        : t('contact.social.follow', { name: social.name })
                                }
                                icon={social.icon}
                                gradient={social.hoverBg}
                                delay={0.1 + i * 0.08}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* colonne formulaire */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
                        {/* honeypot — invisible pour les humains, piège les bots */}
                        <input
                            type="text"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            tabIndex={-1}
                            autoComplete="off"
                            className="absolute -left-[9999px] w-px h-px opacity-0"
                            aria-hidden="true"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
                            <Field id="name" label={t('contact.form.name')} value={form.name} onChange={handleChange} error={errors.name} />
                            <Field id="email" label={t('contact.form.email')} type="email" value={form.email} onChange={handleChange} error={errors.email} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
                            <Field id="phone" label={t('contact.form.phone')} type="tel" value={form.phone} onChange={handleChange} />
                            <Field id="subject" label={t('contact.form.subject')} value={form.subject} onChange={handleChange} />
                        </div>

                        <Field id="message" label={t('contact.form.message')} textarea value={form.message} onChange={handleChange} error={errors.message} />

                        <motion.button
                            type="submit"
                            disabled={status === 'loading'}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative mt-2 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-ember-gradient text-white font-display text-sm sm:text-base shadow-lg shadow-ember-600/25 hover:shadow-xl hover:shadow-ember-600/40 transition-shadow disabled:opacity-70 w-full sm:w-fit"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {status === 'loading' && (
                                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                        <Loader2 size={18} className="animate-spin" />
                                        {t('contact.form.sending')}
                                    </motion.span>
                                )}
                                {status !== 'loading' && (
                                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                        <Send size={17} />
                                        {t('contact.form.submit')}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        <AnimatePresence>
                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2 text-sm text-ember-600 dark:text-ember-400"
                                >
                                    <CheckCircle2 size={17} />
                                    {t('contact.form.success')}
                                </motion.div>
                            )}
                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2 text-sm text-[#E63312]"
                                >
                                    <AlertCircle size={17} />
                                    {t('contact.form.error')}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </motion.div>
            </div>
        </section>
    )
}