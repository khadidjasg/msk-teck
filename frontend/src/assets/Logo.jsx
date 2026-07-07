import logoImg from './logo.png'

export default function Logo({ className = '', showText = true }) {
    return (
        <span className={`inline-flex items-center gap-2 select-none ${className}`}>
      <img
          src={logoImg}
          alt="MSK TECH"
          draggable="false"
          className="h-9 sm:h-10 w-auto pointer-events-none"
      />
            {showText && (
                <span className="font-display font-bold text-lg sm:text-xl tracking-wide whitespace-nowrap">
          TECH
        </span>
            )}
    </span>
    )
}