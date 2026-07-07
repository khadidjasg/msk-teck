import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { teamDomains } from '../data/teamDomains.js'
import { socialLinks } from '../data/socialLinks.js'


function VerticalSpine({ side }) {
    return (
        <div
            className={`absolute inset-y-0 ${side === 'right' ? 'right-4' : 'left-4'} w-px`}
            aria-hidden="true"
        >
            <span className="absolute inset-0 bg-ember-gradient opacity-30" />
            <motion.span
                className="absolute left-1/2 -translate-x-1/2 w-2 h-16 rounded-full"
                style={{
                    background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.9), transparent)',
                    filter: 'blur(1.5px)',
                }}
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    )
}

export default function OurTeam() {
    const { t, i18n } = useTranslation()
    const domains = t('ourTeam.domains', { returnObjects: true })
    const isRTL = i18n.dir() === 'rtl'
    const followLinks = socialLinks.filter((s) => s.name === 'Instagram' || s.name === 'Facebook')

    return (
        <div className="bg-paper-50 dark:bg-ink-950 text-ink-900 dark:text-paper-100 transition-colors">
            <section className="max-w-3xl mx-auto px-5 sm:px-8 pt-20 pb-10 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 rounded-full border border-ember-500/30 text-xs font-display text-ember-500 mb-4"
                >
                    {t('ourTeam.badge')}
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-5"
                >
                    {t('ourTeam.heading')}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-ink-700 dark:text-paper-200 leading-relaxed"
                >
                    {t('ourTeam.description')}
                </motion.p>
            </section>

            <section className="relative max-w-2xl mx-auto px-5 sm:px-8 py-10">
                <VerticalSpine side={isRTL ? 'right' : 'left'} />

                <ol className="relative flex flex-col gap-8">
                    {domains.map((domain, i) => {
                        const Icon = teamDomains[i]?.icon
                        return (
                            <motion.li
                                key={domain.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className="relative ps-12"
                            >
                                <span
                                    className={`absolute top-2 ${isRTL ? 'right-4 translate-x-1/2' : 'left-4 -translate-x-1/2'} w-3 h-3 rounded-full bg-ember-gradient shadow-[0_0_8px_rgba(255,122,26,0.7)]`}
                                    aria-hidden="true"
                                />

                                <div className="p-5 rounded-2xl border border-ember-500/15 bg-ink-900/[0.02] dark:bg-paper-100/[0.03] hover:border-ember-500/40 hover:shadow-lg hover:shadow-ember-600/10 transition-all">
                                    <div className="flex items-center gap-3 mb-2">
                    <span className="w-10 h-10 shrink-0 rounded-xl bg-ember-400/10 border border-ember-500/25 flex items-center justify-center text-ember-500">
                      {Icon && <Icon size={19} strokeWidth={1.8} />}
                    </span>
                                        <h3 className="font-display font-semibold text-base sm:text-lg">{domain.title}</h3>
                                    </div>
                                    <p className="text-sm text-ink-700 dark:text-paper-200 leading-relaxed">
                                        {domain.description}
                                    </p>
                                </div>
                            </motion.li>
                        )
                    })}
                </ol>
            </section>

            <section className="max-w-2xl mx-auto px-5 sm:px-8 py-16 text-center">
                <h2 className="font-display font-semibold text-xl sm:text-2xl mb-2">
                    {t('ourTeam.followTitle')}
                </h2>
                <p className="text-ink-700 dark:text-paper-200 mb-6">{t('ourTeam.followSubtitle')}</p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    {followLinks.map(({ name, url, icon: Icon }) => (
                        <a
                            key={name}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-ember-500/30 hover:bg-ember-gradient hover:text-white hover:border-transparent transition-colors font-display text-sm"
                        >
                            <Icon size={16} />
                            {name}
                        </a>
                    ))}
                </div>
            </section>

            <section className="max-w-2xl mx-auto px-5 sm:px-8 pb-24 text-center">
                <div className="rounded-3xl border border-ember-500/20 bg-ember-400/5 p-8 sm:p-10">
                    <h2 className="font-display font-bold text-xl sm:text-2xl mb-2">{t('ourTeam.ctaTitle')}</h2>
                    <p className="text-ink-700 dark:text-paper-200 mb-6">{t('ourTeam.ctaSubtitle')}</p>
                    <Link
                        to="/contact"
                        className="inline-block px-6 py-3 rounded-full bg-ember-gradient text-white font-display text-sm sm:text-base shadow-lg shadow-ember-600/25 hover:shadow-xl hover:shadow-ember-600/40 hover:-translate-y-0.5 transition-all"
                    >
                        {t('ourTeam.ctaButton')}
                    </Link>
                </div>
            </section>
        </div>
    )
}