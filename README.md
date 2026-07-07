# MSK TECH

🔗 **Site en ligne :** [msk-teck.vercel.app](https://msk-teck.vercel.app)

**Plateforme vitrine officielle de MSK TECH** — un espace dédié à l'apprentissage des métiers tech à travers des projets concrets et une expérience pratique.

> Learn. Build. Grow.

---

## À propos

MSK TECH accompagne étudiants, développeurs et passionnés de technologie dans leur montée en compétences via des formations pratiques couvrant le développement web, mobile, l'UI/UX, l'intelligence artificielle et la data science.

Ce dépôt contient le code source du site vitrine : présentation de la plateforme, réalisations, équipe et prise de contact.

---

## Fonctionnalités

- **Design responsive** — expérience optimisée sur mobile, tablette et desktop
- **Multilingue** — Français, Anglais et Arabe (support RTL complet)
- **Thème clair / sombre** — préférence utilisateur persistée
- **Formulaire de contact** — connecté à une API dédiée avec stockage et notification par e-mail

---

## Architecture technique

Le projet est structuré en monorepo, séparant clairement frontend et backend :

msk-tech/
├── frontend/          Application React (Vite + Tailwind CSS)
├── backend/           API FastAPI (formulaire de contact)
├── docs/              Documentation technique et décisions d'architecture
└── .github/workflows/ Intégration continue

### Stack technique

| Couche          | Technologie                          |
|-----------------|---------------------------------------|
| Frontend        | React, Vite, Tailwind CSS, React Router, i18next |
| Backend          | FastAPI, SQLAlchemy                  |
| Base de données  | PostgreSQL (Supabase)                |
| Déploiement      | Vercel (frontend), Render (backend)  |

---

## Installation locale

### Prérequis
- Node.js ≥ 18
- Python ≥ 3.10

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## Documentation

Les décisions techniques et notes d'architecture sont consultables dans le dossier [`docs/`](./docs).

---

## Équipe

Projet développé et maintenu par l'équipe MSK TECH.

---

## Licence

Tous droits réservés © MSK TECH.
