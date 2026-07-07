# MSK TECH — Frontend

Site vitrine de **MSK TECH**, plateforme qui aide étudiants et futurs professionnels à apprendre la
technologie à travers des projets pratiques (développement web, mobile, UI/UX, prototypage MVP, IA &
data science).

> **Learn. Build. Grow.** — de la salle de classe à la carrière.

---

## Sommaire

- [Aperçu](#aperçu)
- [Stack technique](#stack-technique)
- [Fonctionnalités](#fonctionnalités)
- [Structure du projet](#structure-du-projet)
- [Démarrage rapide](#démarrage-rapide)
- [Variables d'environnement](#variables-denvironnement)
- [Scripts disponibles](#scripts-disponibles)
- [Système de design](#système-de-design)
- [Internationalisation (i18n)](#internationalisation-i18n)
- [Thème clair / sombre](#thème-clair--sombre)
- [Données dynamiques (Supabase)](#données-dynamiques-supabase)
- [Formulaire de contact](#formulaire-de-contact)
- [Icônes & assets](#icônes--assets)
- [Convention Git](#convention-git)
- [État d'avancement](#état-davancement)

---

## Aperçu

Le site est composé de 4 pages, connectées via React Router :

| Route | Page | Description |
|---|---|---|
| `/` | **Landing** | Page d'accueil — Hero animé (fond 3D), présentation de l'offre, arguments clés |
| `/our-work` | **Our Work** | Portfolio des réalisations, filtrable par catégorie, données chargées depuis Supabase |
| `/our-work/:slug` | **Project Detail** | Page détaillée d'un projet du portfolio |
| `/our-team` | **Our Team** | Présentation de l'équipe et des domaines d'expertise |
| `/contact` | **Contact Us** | Formulaire de contact connecté au backend FastAPI |

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | React + Vite |
| Style | Tailwind CSS (`darkMode: 'class'`) |
| Animations 2D | Framer Motion |
| Animations 3D | Three.js + `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing` |
| Routing | React Router (`BrowserRouter`) |
| Internationalisation | react-i18next (fr / en / ar, avec support RTL) |
| Données portfolio | Supabase (PostgreSQL) via `@supabase/supabase-js` |
| Icônes | lucide-react + icônes SVG custom |
| Backend (hors dépôt frontend) | FastAPI — endpoint `/contact` uniquement |

---

## Fonctionnalités

- ✅ **Responsive mobile-first** — testé de 320px à 1920px
- ✅ **Dark mode / Light mode** — persistant (`localStorage`), avec détection automatique de la préférence système au premier chargement
- ✅ **3 langues (FR / EN / AR)** — bascule RTL automatique et complète (mise en page + texte) sur l'arabe
- ✅ **Animations soignées** — scroll reveal, micro-interactions Framer Motion, fond 3D animé sur le Hero
- ✅ **Portfolio dynamique** — projets chargés depuis Supabase, classés par catégorie, grille type "bento"
- ✅ **Formulaire de contact fonctionnel** — validation, honeypot anti-spam, connecté à l'API backend

---

## Structure du projet

```
frontend/
├── public/                        Favicons, manifest.json, icônes PWA
├── src/
│   ├── assets/
│   │   ├── Logo.jsx                Logo SVG réutilisable (wordmark MSK TECH)
│   │   └── logo.png
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          Responsive + menu mobile animé
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx          Wrapper Navbar + contenu + Footer
│   │   │   └── LanguageSwitcher.jsx
│   │   ├── ui/
│   │   │   └── ThemeToggle.jsx     Toggle dark/light animé
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── HeroBackground3D.jsx   Fond 3D (Three.js)
│   │   │   ├── WhoAreWe.jsx
│   │   │   ├── Whatweoffer.jsx        Cartes avec interactions au survol
│   │   │   └── WhatYouGain.jsx
│   │   └── icons/
│   │       └── SocialIcons.jsx     Icônes réseaux sociaux custom (SVG)
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── OurWork.jsx
│   │   ├── ProjectDetail.jsx
│   │   ├── OurTeam.jsx
│   │   └── ContactUs.jsx
│   ├── context/
│   │   └── ThemeContext.jsx        Dark/light + persistance localStorage
│   ├── data/
│   │   ├── navLinks.js             Source unique des liens de navigation
│   │   ├── socialLinks.js          Source unique des réseaux sociaux
│   │   ├── footerContact.js        Coordonnées affichées dans le footer
│   │   └── teamDomains.js          Domaines d'expertise (page Our Team)
│   ├── i18n/
│   │   ├── i18n.js
│   │   └── locales/
│   │       ├── fr.json
│   │       ├── en.json
│   │       └── ar.json
│   ├── lib/
│   │   └── supabaseClient.js       Client Supabase (lecture des projets)
│   ├── App.jsx                     Déclaration des routes + gestion RTL
│   ├── main.jsx                    ThemeProvider + BrowserRouter + i18n
│   └── index.css                   Tailwind + polices + styles de base
├── .env                            Variables d'environnement (non commité)
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## Démarrage rapide

**Prérequis** : Node.js ≥ 18, npm

```bash
# 1. Cloner le dépôt
git clone https://github.com/khadidjasg/msk-teck.git
cd msk-teck/frontend

# 2. Installer les dépendances
npm install

# 3. Créer le fichier .env (voir section suivante)

# 4. Lancer le serveur de développement
npm run dev
```

Le site est alors disponible sur `http://localhost:5173`.

---

## Variables d'environnement

Créer un fichier `.env` à la racine de `frontend/` :

```env
# URL de l'API backend (formulaire de contact)
VITE_API_URL=http://localhost:8000

# Supabase — lecture des projets du portfolio (Our Work)
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> ⚠️ Si `VITE_API_URL` n'est pas défini, le formulaire de contact simule un envoi réussi (utile en
> développement sans backend lancé) et logue le payload dans la console.
> Si les identifiants Supabase sont manquants, un avertissement s'affiche dans la console et le
> portfolio ne pourra pas charger les projets.

---

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Lance le serveur de développement Vite |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Prévisualise le build de production en local |
| `npm run lint` | Analyse statique du code (si ESLint configuré) |

> Toujours vérifier que `npm run build` compile sans erreur avant de livrer une étape.

---

## Système de design

Les tokens Tailwind ci-dessous sont définis dans `tailwind.config.js` et doivent être réutilisés
systématiquement — **ne pas introduire de nouvelles couleurs en dur**.

| Token | Valeur | Usage |
|---|---|---|
| `ink-950` / `900` / `800` | `#0A0A0B` / `#141416` / `#1E1E21` | Fonds mode sombre |
| `paper-50` / `100` / `200` | `#FAF9F7` / `#F2F0EC` / `#E5E2DC` | Fonds mode clair |
| `ember-400` → `700` | `#FF9142` → `#E63312` | Couleur de marque (accents, CTA) |
| `bg-ember-gradient` | dégradé linéaire 90deg | Boutons CTA, soulignements actifs |
| `font-display` | Chakra Petch | Titres (`h1`–`h4`) |
| `font-body` | Inter | Texte courant |

Toujours écrire les classes couleur **en paire clair/sombre** :

```jsx
<div className="bg-paper-50 dark:bg-ink-950 text-ink-900 dark:text-paper-50">
```

---

## Internationalisation (i18n)

- Gérée par `react-i18next`, initialisée dans `src/i18n/i18n.js`
- 3 langues supportées : `fr`, `en`, `ar`
- Langue initiale déterminée dans cet ordre de priorité : langue sauvegardée (`localStorage`) →
  langue du navigateur si supportée → `en` par défaut
- L'arabe (`ar`) déclenche automatiquement `dir="rtl"` et `lang="ar"` sur `<html>` (voir `App.jsx`)

**Ajouter un nouveau texte** : ajouter la même clé dans les **3 fichiers** `src/i18n/locales/{fr,en,ar}.json`.
Ne jamais laisser une clé manquante dans une langue.

**Vérifier le RTL** : lors de l'ajout d'un composant, tester en arabe que la mise en page s'inverse
correctement (pas seulement le texte) — utiliser les classes logiques Tailwind (`ms-`, `me-`, `ps-`, `pe-`)
plutôt que `ml-`/`mr-`/`pl-`/`pr-`.

---

## Thème clair / sombre

Géré par `src/context/ThemeContext.jsx` :
- Détection de la préférence système (`prefers-color-scheme`) au premier chargement
- Persistance du choix dans `localStorage` (clé `msk-theme`)
- Application de la classe `dark` sur `<html>`, consommée par Tailwind (`darkMode: 'class'`)

Basculer le thème via le hook `useTheme()` :
```jsx
import { useTheme } from './context/ThemeContext.jsx'
const { theme, toggleTheme } = useTheme()
```

---

## Données dynamiques (Supabase)

La page **Our Work** (`src/pages/OurWork.jsx`) charge la liste des projets depuis une table Supabase
via le client configuré dans `src/lib/supabaseClient.js`. Chaque projet est rattaché à une catégorie
(`web`, `mobile`, `software`, `cyber`, `design`), chacune associée automatiquement à un dégradé de
marque et une icône — pas besoin de les choisir manuellement à l'ajout d'un projet.

---

## Formulaire de contact

La page **Contact Us** (`src/pages/ContactUs.jsx`) :
- Valide les champs côté client (nom, email, message obligatoires ; format d'email vérifié)
- Intègre un **honeypot** anti-spam invisible (champ `company`)
- Envoie les données en `POST` vers `${VITE_API_URL}/contact`
- Affiche un état de chargement, succès ou erreur animé (Framer Motion)

Le backend correspondant (FastAPI, hors dépôt frontend) reçoit la requête et envoie un email de
notification via SMTP Gmail, avec `Reply-To` réglé automatiquement sur l'adresse de l'expéditeur.

---

## Icônes & assets

Le dossier `public/` contient les favicons et icônes PWA générés à partir du logo officiel :

| Fichier | Usage |
|---|---|
| `favicon-16.png`, `favicon-32.png`, `favicon-48.png` | Icône d'onglet navigateur |
| `apple-touch-icon.png` | Icône iOS ("Ajouter à l'écran d'accueil") |
| `icon-192.png`, `icon-512.png` | Icônes PWA / Android |
| `maskable-icon-512.png` | Icône Android adaptative (fond plein, zone sûre respectée) |
| `manifest.json` | Manifeste PWA (nom, couleurs, icônes) |

> Le format **PNG** est utilisé plutôt que `.ico` pour une compatibilité maximale entre navigateurs
> (certains moteurs de rendu — Chrome notamment — sont stricts sur la validité du format `.ico`
> multi-résolutions).

---

## Convention Git

**Dépôt** : monorepo unique — `https://github.com/khadidjasg/msk-teck.git`

| Branche | Rôle |
|---|---|
| `main` | Toujours stable, reflète ce qui est prêt à être déployé |
| `dev` | Branche de travail courante |
| `feature/*` | Optionnel, pour une fonctionnalité isolée fusionnée dans `dev` une fois terminée |

**Convention de commits** :
- `feat:` nouvelle fonctionnalité
- `fix:` correction de bug
- `chore:` configuration, dépendances, structure
- `style:` changement visuel sans logique modifiée
- `docs:` documentation

> ⚠️ Ne jamais commiter directement sur `main`. Le travail se fait sur `dev`, avec des commits
> fréquents et atomiques (un commit = une fonctionnalité cohérente).

---

## État d'avancement

| Élément | Statut |
|---|---|
| Structure du monorepo | ✅ Terminé |
| Setup React + Vite + Tailwind | ✅ Terminé |
| Thème clair/sombre + persistance | ✅ Terminé |
| i18n (fr/en/ar) + RTL automatique | ✅ Terminé |
| Routing (5 routes) | ✅ Terminé |
| Logo officiel + favicons/PWA | ✅ Terminé |
| Navbar responsive + LanguageSwitcher + ThemeToggle | ✅ Terminé |
| Footer | ✅ Terminé |
| Landing Page (Hero 3D, sections animées) | ✅ Terminé |
| Page Our Work (portfolio dynamique Supabase) | ✅ Terminé |
| Page Project Detail | ✅ Terminé |
| Page Our Team | ✅ Terminé |
| Page Contact Us + formulaire | ✅ Terminé |
| Backend FastAPI (`/contact`) | ✅ Terminé |
| Déploiement Vercel (frontend) + Render (backend) | ◻ À faire |

---

## Reprise du projet

Toute personne (ou assistant IA) reprenant ce projet doit respecter les **4 exigences non négociables** :
1. **Responsive absolu** — mobile-first, testé de 320px à 1920px
2. **Dark mode ET light mode** sur chaque élément visuel
3. **3 langues avec RTL fonctionnel** — mise en page ET texte
4. **Niveau visuel "wow"** — animations Framer Motion / Three.js, pas de rendu générique

Livrer systématiquement du code **complet et fonctionnel**, jamais de squelette ou de `TODO`. Réutiliser
les composants existants (`Layout`, `Navbar`, `Footer`, `ThemeToggle`, `LanguageSwitcher`) plutôt que
d'en recréer des variantes. En cas de doute sur une décision de design ou de contenu, poser la question
avant de coder.

---

**MSK TECH** — Learn. Build. Grow.