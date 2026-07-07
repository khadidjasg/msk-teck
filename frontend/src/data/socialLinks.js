import { Mail } from 'lucide-react'
import { InstagramIcon, LinkedinIcon, FacebookIcon } from '../components/icons/SocialIcons.jsx'

export const socialLinks = [
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/tech.msk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        icon: InstagramIcon,
        hoverBg: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 65%, #285AEB 100%)',
    },
    {
        name: 'Facebook',
        url: 'https://www.facebook.com/profile.php?id=61591511341285&locale=fr_FR',
        icon: FacebookIcon,
        hoverBg: '#1877F2',
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com/company/msktech',
        icon: LinkedinIcon,
        hoverBg: '#0A66C2',
    },
    {
        name: 'Email',
        url: 'msk.tech2500@gmail.com',
        icon: Mail,
        hoverBg: 'linear-gradient(90deg, #FF9142 0%, #E63312 100%)',
    },
]