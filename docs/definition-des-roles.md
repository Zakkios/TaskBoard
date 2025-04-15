# 🔐 Définition des rôles

Ce tableau définit les actions possibles pour chaque rôle dans l’application DevTaskBoard.

## 🧾 **Authentification**

| Action                         | Utilisateur | Administrateur |
|---    |:-:    |:-:    |
| S’inscrire / Se connecter      | ✅          | ✅             |

## 🗂️ **Gestion des tâches**

| Action                                       | Utilisateur | Administrateur |
|---    |:-:    |:-:    |
| Voir ses propres tâches                     | ✅          | ✅             |
| Créer une tâche                              | ✅          | ✅             |
| Modifier ses propres tâches                  | ✅          | ✅             |
| Supprimer ses propres tâches                 | ✅          | ✅             |
| Ajouter / Modifier / Supprimer une étiquette| ✅          | ✅             |
| Filtrer les tâches par étiquette ou statut   | ✅          | ✅             |
| Voir les tâches de tous les utilisateurs     | ❌          | ✅             |
| Supprimer une tâche d’un autre utilisateur   | ❌          | ✅             |

## 🧑‍💼 **Administration**

| Action                                | Utilisateur | Administrateur |
|---    |:-:    |:-:    |
| Gérer les comptes utilisateurs       | ❌          | ✅             |
| Accéder aux statistiques personnelles| ✅          | ✅             |
