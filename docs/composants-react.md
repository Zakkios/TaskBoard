# 🧩 Composants React – TaskBoard

Ce document recense les composants React prévus pour l’application TaskBoard. Il est basé sur les maquettes Figma et la structure fonctionnelle de l'application.

---

## 📁 Arborescence des composants

```bash
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Modal.tsx
│   │   └── Notification.tsx
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── HeaderUser.tsx
│   │   └── PageWrapper.tsx
│   ├── taskboard/
│   │   ├── KanbanBoard.tsx
│   │   ├── KanbanColumn.tsx
│   │   └── TaskCard.tsx
│   ├── tags/
│   │   └── Tag.tsx
│   ├── stats/
│   │   ├── PieChart.tsx
│   │   └── BarChart.tsx
│   └── auth/
│       ├── LoginForm.tsx
│       ├── RegisterForm.tsx
│       └── AuthRedirectLink.tsx
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
