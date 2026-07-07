export function InstagramIcon({ size = 16, strokeWidth = 1.75, className = '' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
    )
}

export function LinkedinIcon({ size = 16, strokeWidth = 1.75, className = '' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <line x1="7.5" y1="10.5" x2="7.5" y2="16.5" />
            <circle cx="7.5" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
            <path d="M11.5 16.5v-4a2.2 2.2 0 0 1 4.4 0v4" />
            <line x1="11.5" y1="10.5" x2="11.5" y2="16.5" />
        </svg>
    )
}

export function FacebookIcon({ size = 16, strokeWidth = 1.75, className = '' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <path d="M14 8.5h-1.5A1.5 1.5 0 0 0 11 10v2M9.5 12H14" />
            <path d="M12.5 12v9" />
        </svg>
    )
}

