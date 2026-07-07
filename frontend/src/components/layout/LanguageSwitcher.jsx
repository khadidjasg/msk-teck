import { useTranslation } from 'react-i18next'

const LANGS = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'AR' },
]

export default function LanguageSwitcher() {
    const { i18n } = useTranslation()

    return (
        <div className="flex items-center gap-1 rounded-full border border-ink-900/10 dark:border-paper-100/10 p-1">
            {LANGS.map(({ code, label }) => (
                <button
                    key={code}
                    type="button"
                    onClick={() => i18n.changeLanguage(code)}
                    aria-current={i18n.language === code}
                    className={`px-2.5 py-1 text-xs font-display rounded-full transition-colors ${
                        i18n.language === code
                            ? 'bg-ember-gradient text-white'
                            : 'text-ink-700 dark:text-paper-200 hover:text-ember-500'
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}