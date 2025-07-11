# Dictionnaire de données

## Table : Users

| Attribut   | Type         | Description                          | Contraintes                          |
| ---------- | ------------ | ------------------------------------ | ------------------------------------ |
| id_users   | UUID         | Identifiant unique de l’utilisateur  | Clé primaire, généré automatiquement |
| username   | VARCHAR(100) | Nom d'utilisateur                    | Unique, requis                       |
| email      | VARCHAR(150) | Adresse e-mail                       | Unique, requis                       |
| password   | VARCHAR(255) | Mot de passe (hashé)                 | Requis                               |
| role       | VARCHAR(50)  | Rôle utilisateur (`ROLE_USER`, etc.) | Requis, validé côté backend          |
| created_at | DATETIME     | Date de création                     | Par défaut : now()                   |

---

## Table : Tasks

| Attribut    | Type         | Description                          | Contraintes                 |
| ----------- | ------------ | ------------------------------------ | --------------------------- |
| id_tasks    | UUID         | Identifiant unique de la tâche       | Clé primaire                |
| title       | VARCHAR(150) | Titre de la tâche                    | Requis                      |
| description | TEXT         | Description détaillée de la tâche    | Optionnel                   |
| status      | VARCHAR(50)  | Statut (`TODO`, `DOING`, `DONE`)     | Requis, contrôlé en backend |
| created_at  | DATETIME     | Date de création                     | Par défaut : now()          |
| updated_at  | DATETIME     | Dernière modification                | Mis à jour automatiquement  |
| id_Users    | UUID         | Utilisateur propriétaire de la tâche | Clé étrangère vers Users    |

---

## Table : Tags

| Attribut | Type        | Description                     | Contraintes                                                   |
| -------- | ----------- | ------------------------------- | ------------------------------------------------------------- |
| id_tags  | UUID        | Identifiant unique du tag       | Clé primaire                                                  |
| name     | VARCHAR(50) | Nom du tag                      | Requis, **unique par utilisateur** (index `(name, id_Users)`) |
| color    | VARCHAR(10) | Couleur (format HEX)            | Requis                                                        |
| id_Users | UUID        | Utilisateur propriétaire du tag | Clé étrangère vers Users                                      |

---

## Table : Tasks_Tags

| Attribut | Type | Description             | Contraintes                 |
| -------- | ---- | ----------------------- | --------------------------- |
| id_tasks | UUID | Identifiant de la tâche | FK vers Tasks, PK partielle |
| id_tags  | UUID | Identifiant du tag      | FK vers Tags, PK partielle  |
