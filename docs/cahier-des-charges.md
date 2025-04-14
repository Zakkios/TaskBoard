# 📄 Cahier des charges – DevTaskBoard

## 🧠 1. Objectif

Créer une application web fullstack permettant aux utilisateurs de gérer leurs tâches personnelles via un tableau de bord, avec des rôles différenciés (utilisateur/admin), une visualisation statistique, et une interface responsive.

## 👥 2. Utilisateurs

### Utilisateur (User)
- Créer un compte
- Se connecter / se déconnecter
- Voir ses propres tâches
- Créer une tâche
- Modifier ou supprimer ses tâches
- Changer le statut d'une tâche (To Do / Doing / Done)
- Ajouter, modifier ou supprimer une étiquettes
- Filtrer par étiquettes
- Voir ses statistiques personnelles

### Administrateur (Admin)
- Toutes les actions utilisateur
- Voir les tâches de tous les utilisateurs
- Supprimer un compte utilisateur
- Voir les statistiques globales

## ✅ 3. Fonctionnalités principales

- Authentification sécurisée avec JWT (login/register)
- Gestion des rôles (User/Admin)
- CRUD complet sur les tâches
- Filtres par statut et par utilisateur
- Statistiques dynamiques (graphique tâches par statut)
- Interface intuitive et responsive (React + Tailwind)
- Dockerisation pour développement et déploiement


## 🛠️ 4. Contraintes techniques

- **Backend** : Symfony + API Platform
- **Frontend** : React (Vite) + Tailwind CSS
- **Base de données** : MySQL
- **Conteneurisation** : Docker + Docker Compose
- **Déploiement** : Render (Backend), Netlify ou Vercel (Frontend)
- **Authentification** : LexikJWTAuthenticationBundle

## 📦 5. Livrables attendus

- Code source versionné (GitHub)
- Documentation technique (installation, endpoints, architecture)
- Maquettes UI (Figma – basse et haute fidélité)
- Application déployer et accessible en ligne
