# 🧩 Composants React – TaskBoard

Ce document recense les composants React prévus pour l’application TaskBoard. Il est basé sur les maquettes Figma et la structure fonctionnelle de l'application.

---

## 📁 Arborescence des composants

### Architecture FSD (Feature-Sliced Design)

```bash
/src/
│
├── app/                 # Initialisation application
│   ├── providers/       # Contexte global (AuthProvider, ThemeProvider, etc.)
│   ├── routes/          # Définition des routes
│   ├── App.tsx          # Composition principale de l'app
│   └── main.tsx         # Entrypoint Vite/React
│
├── shared/              # Éléments totalement réutilisables partout
│   ├── ui/              # Boutons, Inputs, Loaders, Avatars, etc.
│   ├── lib/             # Petites fonctions utilitaires (formatDate, classNames, etc.)
│   ├── config/          # Variables globales, thèmes, etc.
│   ├── api/             # Configuration Axios et helpers généraux
│
├── entities/            # Entités métiers
│   ├── user/            # Données liées au User
│   │   ├── model/       # Typescript types, stores
│   │   ├── ui/          # Petits composants liés à User
│   │   └── api/         # User API
│   ├── task/            # Données liées aux Tâches
│       ├── model/
│       ├── ui/
│       └── api/
│
├── features/            # Actions/fonctionnalités utilisateur
│   ├── auth/            # Login / Register / Logout
│   │   ├── model/       # Stores, hooks liés à Auth
│   │   ├── ui/          # Formulaires LoginForm, RegisterForm
│   │   ├── api/         # Appels login / register
│   ├── taskManagement/  # Ajouter / Modifier / Filtrer des tâches
│       ├── model/
│       ├── ui/
│       ├── api/
│
├── widgets/             # Blocs UI indépendants
│   ├── Header/
│   ├── Sidebar/
│   ├── TaskBoard/       # Composant principal du board
│   ├── StatsBoard/      # Composant de statistiques
│
├── pages/               # Pages réelles
│   ├── login/           # Page de connexion
│   ├── dashboard/       # Page d'accueil après login
│   └── not-found/       # Page 404
│
└── index.css            # Style global
```

---

## 🟣 Composants communs

| Nom           | Rôle                                                   |
|----------------|--------------------------------------------------------|
| `Button`       | Bouton stylisé (submit, cancel, etc.)                  |
| `Input`        | Champ de texte réutilisable                            |
| `Dropdown`     | Menu déroulant pour filtres ou statuts                 |
| `Modal`        | Fenêtre modale générique                               |
| `Notification` | Affiche un toast ou une alerte en cas d'action        |

---

## 🟢 Authentification

| Nom                | Rôle                                                  |
|--------------------|-------------------------------------------------------|
| `RegisterForm`     | Formulaire d’inscription                              |
| `LoginForm`        | Formulaire de connexion                               |
| `AuthRedirectLink` | Lien vers la page opposée (login ou register)         |

---

## 🔵 Tableau de tâches (Kanban)

| Nom             | Rôle                                                       |
|------------------|------------------------------------------------------------|
| `TaskCard`       | Affiche une tâche individuelle avec titre, description... |
| `KanbanColumn`   | Colonne de statut (To Do, Doing, Done)                     |
| `KanbanBoard`    | Regroupe les colonnes de tâches                            |

---

## 🏷️ Étiquettes

| Nom   | Rôle                                 |
|--------|--------------------------------------|
| `Tag` | Affiche une étiquette colorée liée à une tâche |

---

## 📊 Statistiques

| Nom        | Rôle                                         |
|-------------|----------------------------------------------|
| `PieChart`  | Graphe en camembert sur la répartition des statuts |
| `BarChart`  | Histogramme du nombre de tâches par étiquette |

---

## 🧱 Layout

| Nom            | Rôle                                 |
|----------------|--------------------------------------|
| `Sidebar`      | Menu latéral avec navigation         |
| `HeaderUser`   | Barre supérieure avec le nom de l'utilisateur |
| `PageWrapper`  | Conteneur de mise en page générique  |
