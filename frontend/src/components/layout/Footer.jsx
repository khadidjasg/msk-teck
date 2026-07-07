import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import Logo from '../../assets/Logo.jsx'
import { socialLinks } from '../../data/socialLinks.js'
import { footerContact } from '../../data/footerContact.js'

export default function Footer() {
    const { t } = useTranslation()

    return (
        <footer className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-ember-gradient opacity-40" aria-hidden="true" />

            <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] gap-10">
                <div className="flex flex-col gap-4">
                    <Logo />
                    <p className="text-sm leading-relaxed text-ink-700 dark:text-paper-200 max-w-sm">
                        {t('footer.description')}
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                        {socialLinks.map(({ name, url, icon: Icon, hoverBg }, i) => (
                            <motion.a
                                key={name}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={name}
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                whileHover={{ y: -3, scale: 1.06 }}
                                style={{ '--brand': hoverBg }}
                                className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-ember-400/10 border border-ember-500/30 overflow-hidden transition-colors"
                            >
                <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'var(--brand)' }}
                />
                                <Icon
                                    size={17}
                                    strokeWidth={1.8}
                                    className="relative z-10 text-ink-900 dark:text-paper-50 group-hover:text-white transition-colors duration-300"
                                />
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="font-display text-sm font-semibold text-ink-900 dark:text-paper-50 tracking-wide">
                        {t('footer.contactTitle')}
                    </h3>
                    <ul className="flex flex-col gap-3 text-sm text-ink-700 dark:text-paper-200">
                        <li className="flex items-center gap-2.5">
                            <Mail size={15} className="text-ember-500 shrink-0" />
                            <a href={`mailto:${footerContact.email}`} className="hover:text-ember-500 transition-colors">
                                {footerContact.email}
                            </a>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <Phone size={15} className="text-ember-500 shrink-0" />
                            <a href={`tel:${footerContact.phone.replace(/\s/g, '')}`} className="hover:text-ember-500 transition-colors">
                                {footerContact.phone}
                            </a>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <MapPin size={15} className="text-ember-500 shrink-0" />
                            <span>{footerContact.location}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-ember-500/10 py-4 text-center text-xs text-ink-600 dark:text-paper-300">
                © {new Date().getFullYear()} MSK TECH — {t('footer.rights')}
            </div>
        </footer>
    )
}