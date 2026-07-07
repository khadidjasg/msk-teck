import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RTL_LANGUAGES } from './i18n/i18n.js';
import Layout from './components/layout/Layout.jsx';

import Landing from './pages/Landing.jsx';
import OurWork from './pages/OurWork.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import OurTeam from './pages/OurTeam.jsx';
import ContactUs from './pages/ContactUs.jsx';

function App() {
    const { i18n } = useTranslation();

    useEffect(() => {
        const isRtl = RTL_LANGUAGES.includes(i18n.language);
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/our-work" element={<OurWork />} />
                <Route path="/our-work/:slug" element={<ProjectDetail />} />
                <Route path="/our-team" element={<OurTeam />} />
                <Route path="/contact" element={<ContactUs />} />
            </Routes>
        </Layout>
    );
}

export default App;