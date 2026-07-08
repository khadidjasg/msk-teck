import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './i18n/i18n.js'
import { ThemeProvider } from './context/ThemeContext.jsx'
import App from './App.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'

const originalWarn = console.warn
console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return
    originalWarn.apply(console, args)
}

function Root() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <StrictMode>
            <ThemeProvider>
                <BrowserRouter>
                    {loading && <LoadingScreen />}
                    <div className={loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}>
                        <App />
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </StrictMode>
    )
}

createRoot(document.getElementById('root')).render(<Root />)