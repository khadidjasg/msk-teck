import Logo from '../assets/Logo.jsx'

export default function LoadingScreen() {
    const isDark = document.documentElement.classList.contains('dark')

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center ${
                isDark ? 'bg-ink-950' : 'bg-paper-50'
            }`}
        >
            <div className="relative flex items-center justify-center w-28 h-28">
                {/* Cercle de fond */}
                <div
                    className={`absolute inset-0 rounded-full ${
                        isDark ? 'bg-ink-900' : 'bg-paper-100'
                    }`}
                />

                {/* Cercle tournant avec dégradé */}
                <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-tr from-ember-500 via-amber-400 to-transparent animate-[spin_1s_linear_infinite]">
                    <div className={`w-full h-full rounded-full ${isDark ? 'bg-ink-950' : 'bg-paper-50'}`} />
                </div>

                {/* Logo centré */}
                <div className="relative z-10">
                    <Logo className="scale-110" showText={false} />
                </div>
            </div>

            {/* Points animés */}
            <div className="flex gap-1.5 mt-8">
                <span className="w-1.5 h-1.5 rounded-full bg-ember-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-ember-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-ember-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
        </div>
    )
}