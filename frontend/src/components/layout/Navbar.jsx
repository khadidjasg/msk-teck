import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from '../../assets/Logo.jsx'
import ThemeToggle from '../ui/ThemeToggle.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { navLinks } from '../../data/navLinks.js'


function CircuitDivider() {
    return (
        <div className="relative h-[2px] w-full overflow-hidden">
            <span className="absolute inset-0 bg-ember-gradient opacity-80" />

            <motion.span
                aria-hidden="true"
                className="absolute inset-0 bg-ember-500 blur-[3px]"
                animate={{ opacity: [0.2, 0.55, 0.2] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.span
                aria-hidden="true"
                className="absolute top-1/2 h-2 w-24 -translate-y-1/2 rounded-full"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)',
                    filter: 'blur(1.5px)',
                }}
                animate={{ left: ['-15%', '115%'] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    )
}


function LogoPowerOn() {
    return (
        <span className="relative inline-flex">
            <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <Logo />
            </motion.span>
            <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{ background: 'linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.85) 50%, transparent 70%)' }}
                initial={{ x: '-120%', opacity: 0.9 }}
                animate={{ x: '120%', opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut', delay: 0.15 }}
            />
        </span>
    )
}


function NavLed({ active }) {
    return (
        <span
            aria-hidden="true"
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                active
                    ? 'bg-ember-gradient shadow-[0_0_6px_rgba(255,122,26,0.9)]'
                    : 'bg-ink-800/25 dark:bg-paper-100/25 group-hover:bg-ember-gradient group-hover:shadow-[0_0_6px_rgba(255,122,26,0.9)]'
            }`}
        />
    )
}

export default function Navbar() {
    const { t } = useTranslation()
    const { pathname } = useLocation()
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-paper-50/80 dark:bg-ink-950/75">
            <nav className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-5 sm:px-8 h-14 lg:h-18">
                <NavLink to="/" onClick={() => setOpen(false)} aria-label="MSK TECH — accueil" className="shrink-0">
                    <LogoPowerOn />
                </NavLink>


                <ul className="hidden lg:flex items-center gap-7 font-display text-sm">
                    {navLinks.map(({ key, path }) => {
                        const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path)
                        return (
                            <li key={key} className="relative py-2">
                                <NavLink
                                    to={path}
                                    end={path === '/'}
                                    className={`group relative flex items-center gap-2 transition-colors whitespace-nowrap ${
                                        isActive ? 'text-ember-500' : 'text-ink-800 dark:text-paper-100 hover:text-ember-500'
                                    }`}
                                >
                                    <NavLed active={isActive} />
                                    {t(`nav.${key}`)}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>

                <div className="hidden lg:flex items-center gap-3">
                    <LanguageSwitcher />
                    <ThemeToggle />
                    <NavLink
                        to="/contact"
                        className="px-4 py-2 rounded-full bg-ember-gradient text-white text-sm font-display whitespace-nowrap shadow-md shadow-ember-600/25 hover:shadow-lg hover:shadow-ember-600/40 hover:-translate-y-0.5 transition-all"
                    >
                        {t('nav.cta')}
                    </NavLink>
                </div>


                <div className="flex items-center gap-3 lg:hidden shrink-0">
                    <ThemeToggle />
                    <button
                        type="button"
                        className="text-ink-900 dark:text-paper-100"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Menu"
                        aria-expanded={open}
                    >
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="lg:hidden overflow-hidden"
                    >
                        <ul className="flex flex-col gap-1 px-5 sm:px-8 py-4 font-display">
                            {navLinks.map(({ key, path }, i) => (
                                <motion.li
                                    key={key}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <NavLink
                                        to={path}
                                        end={path === '/'}
                                        onClick={() => setOpen(false)}
                                        className={({ isActive }) =>
                                            `block py-2 ${isActive ? 'text-ember-500' : 'text-ink-800 dark:text-paper-100'}`
                                        }
                                    >
                                        {t(`nav.${key}`)}
                                    </NavLink>
                                </motion.li>
                            ))}
                            <li className="pt-1">
                                <NavLink
                                    to="/contact"
                                    onClick={() => setOpen(false)}
                                    className="inline-block px-4 py-2 rounded-full bg-ember-gradient text-white text-sm"
                                >
                                    {t('nav.cta')}
                                </NavLink>
                            </li>
                        </ul>
                        <div className="flex items-center justify-center px-5 sm:px-8 pb-5">
                            <LanguageSwitcher />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <CircuitDivider />
        </header>
    )
}