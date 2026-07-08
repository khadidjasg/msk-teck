import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);

function getInitialTheme() {
    const stored = localStorage.getItem('msk-theme');
    if (stored === 'light' || stored === 'dark') return stored;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

// APPLIQUE IMMÉDIATEMENT — avant tout render
const initialTheme = getInitialTheme();
document.documentElement.classList.remove('light', 'dark');
document.documentElement.classList.add(initialTheme);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(initialTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('msk-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme doit être utilisé à l\'intérieur de <ThemeProvider>');
    }
    return context;
}