# Plan de Tests

---

## 1) Objet & Périmètre

- **Application** : TaskBoard (Frontend React/TS, Backend Symfony 7 + API custom, MySQL).
- **Périmètre** :
  - Authentification : **/api/register**, **/api/login_check**, **/api/me**, **/api/logout**.
  - Tâches (CRUD + sécurité d’accès) : **/api/tasks** (GET, POST), **/api/tasks/{taskId}** (PUT/DELETE).
  - Tags (CRUD) : **/api/tags** (GET, POST), **/api/tags/{tagId}** (PUT/DELETE).

**Objectifs** : conformité fonctionnelle, **sécurité d’accès** (isolement des données), **validation** des entrées, reproductibilité (migrations/fixtures).

---

## 2) Environnement & Données de test

- **Docker** : services `frontend-taskBoard`, `backend-taskBoard`, `mysql`, `phpmyadmin`.
- **Base** : `taskboard_test` ; migrations + fixtures chargées (au moins 2 users, tâches & tags).
- **Variables** : `.env.test` avec clés JWT et cookies (`jwt`, `refresh_token`) configurés (httpOnly / SameSite / secure selon env).

---

## 3) Niveaux / Types de tests

- **Unitaires** : enums, services (PHPUnit).
- **Intégration/API** : endpoints REST (PHPUnit + Postman/cURL).
- **Fonctionnels/UI** : parcours Register → Login → CRUD tâches/tags → Logout.
- **Sécurité** : *authZ* (un user ne lit pas la donnée d’autrui), XSS (rendu neutralisé côté UI), logout (cookies nettoyés).

---

## 4) Critères d’entrée / sortie

- **Entrée** : conteneurs OK, migrations OK, fixtures chargées, endpoints accessibles.
- **Sortie** : 100% des tests **critiques** PASS (auth, isolation, CRUD), anomalies majeures = 0, évidences collectées (captures/logs).

---

## 5) Jeux d’essai (tables **réalistes**)

### 5.1 Authentification

#### Register — `POST /api/register`
| ID | Entrées (JSON) | Attendus (HTTP/Body) | Obtenus | Statut |
|---|---|---|---|---|
| AU-REG-01 | `{ "email":"test@example.com", "username":"Test", "password":"Password1!" }` | **201** ; body: `{"message":"Utilisateur créé avec succès."}` |  |  |
| AU-REG-02 | `email` invalide | **400** ; message de validation (`Assert`) |  |  |
| AU-REG-03 | `password` faible | **400** ; message de validation |  |  |
| AU-REG-04 | `email` déjà utilisé | **400/409** ; message d’erreur |  |  |

#### Login — `POST /api/login_check`
> ⚠️ Le champ d’identifiant attendu par le backend est **`username`** (valeur = email).

| ID | Entrées | Attendus | Obtenus | Statut |
|---|---|---|---|---|
| AU-LOG-01 | `{ "username":"test@example.com", "password":"password" }` | **200** ; cookies **httpOnly**: `jwt`, `refresh_token` présents |  |  |
| AU-LOG-02 | mauvais mot de passe | **401** |  |  |

#### Me — `GET /api/me`
| ID | Pré-req | Attendus | Obtenus | Statut |
|---|---|---|---|---|
| AU-ME-01 | connecté (cookies valides) | **200** ; body avec `id`, `username`, `email` |  |  |
| AU-ME-02 | non connecté | **401** ; `{"error":"Utilisateur non authentifié"}` |  |  |

#### Logout — `POST /api/logout`
| ID | Pré-req | Attendus | Obtenus | Statut |
|---|---|---|---|---|
| AU-OUT-01 | connecté (cookies présents) | **204** ; body `{"message":"Déconnexion réussie"}` ; cookies `jwt` & `refresh_token` **supprimés** |  |  |

---

### 5.2 Tâches (CRUD + sécurité)

#### Liste — `GET /api/tasks`
| ID | Contexte | Attendus | Obtenus | Statut |
|---|---|---|---|---|
| TA-LS-01 | connecté (Test) | **200** ; liste **uniquement** des tâches de l'utilisateur Test (tableau d’objets) |  |  |
| TA-LS-02 | non connecté | **401** |  |  |

#### Création — `POST /api/tasks`
Payload type attendu : `{ title: string, description?: string, status?: "TODO"|"IN_PROGRESS"|"DONE", tags?: number[] }`  
| ID | Entrées | Attendus | Obtenus | Statut |
|---|---|---|---|---|
| TA-CR-01 | `{"title":"Acheter lait","description":"...","status":"TODO","tags":[]}` | **200/201** ; body: `{"message":"La tâche a bien été ajouté."}`, ressource retournée (id, title, status, tags) |  |  |
| TA-CR-02 | `title` vide | **400** ; premier message de validation (DTO/Assert) |  |  |
| TA-CR-03 | `status` invalide | **400** ; message de validation |  |  |
| TA-CR-04 | `tags` contient un id inexistant | **400** ; `{"message":"Le tag n'existe pas."}` |  |  |

#### Mise à jour — `PUT /api/tasks/{taskId}`
| ID | Contexte | Attendus | Obtenus | Statut |
|---|---|---|---|---|
| TA-UP-01 | owner modifie titre/statut/tags | **200** ; `{"message":"La tâche a bien été modifié."}` + ressource à jour |  |  |
| TA-UP-02 | `taskId` inexistant | **404** ; `{"message":"La tâche n'existe pas."}` |  |  |
| TA-UP-03 | non-owner tente update | **403** ; `{"message":"Accès interdit à cette tâche."}` |  |  |

#### Suppression — `DELETE /api/tasks/{taskId}`
| ID | Contexte | Attendus | Obtenus | Statut |
|---|---|---|---|---|
| TA-DEL-01 | owner supprime | **200** ; `{"message":"La tâche a bien été supprimé."}` |  |  |
| TA-DEL-02 | `taskId` inexistant | **404** ; `{"message":"La tâche n'existe pas."}` |  |  |
| TA-DEL-03 | non-owner supprime | **403** ; `{"message":"Accès interdit à cette tâche."}` |  |  |

> **Note** : ces messages sont issus du code `TaskController`/`TaskFactory`.

---

### 5.3 Tags (CRUD)

#### Liste — `GET /api/tags`
| ID | Contexte | Attendus | Obtenus | Statut |
|---|---|---|---|---|
| TG-LS-01 | connecté | **200** ; liste des tags du user |  |  |
| TG-LS-02 | non connecté | **401** |  |  |

#### Création — `POST /api/tags`
Payload type attendu : `{ name: string, color: string }`  
| ID | Entrées | Attendus | Obtenus | Statut |
|---|---|---|---|---|
| TG-CR-01 | `{"name":"Urgent","color":"#FF0000"}` | **200/201** ; `{"message":"Tag créé"}` + ressource (id, name, color) |  |  |
| TG-CR-02 | `name`/`color` manquants | **400** ; `{"message":"Données JSON invalides ou incomplètes"}` |  |  |

#### Mise à jour — `PUT /api/tags/{tagId}`
| ID | Contexte | Attendus | Obtenus | Statut |
|---|---|---|---|---|
| TG-UP-01 | update `name`/`color` | **200** ; `{"message":"Tag mis à jour."}` |  |  |
| TG-UP-02 | `tagId` inexistant | **404** ; `{"message":"Tag non trouvé."}` |  |  |

#### Suppression — `DELETE /api/tags/{tagId}`
| ID | Contexte | Attendus | Obtenus | Statut |
|---|---|---|---|---|
| TG-DEL-01 | suppression OK | **200** ; `{"message":"Tag supprimé."}` |  |  |
| TG-DEL-02 | `tagId` inexistant | **404** ; `{"message":"Tag non trouvé."}` |  |  |

