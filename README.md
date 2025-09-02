# TaskBoard — README (Onboarding, Déploiement & Exploitation)

Application **TaskBoard** : front **React + TypeScript (Vite)**, back **Symfony 7 (PHP 8.3)**, **MySQL 8**. Projet **Docker Compose** avec scripts à la racine pour dev, QA et ops.

> Ce document décrit **l’installation locale**, le **plan de déploiement** (pas à pas), les **scripts d’exploitation**, la **sécurité** (Nginx/CORS/cookies), et les **bonnes pratiques RGPD/RGAA & éco-conception**.

---

## Sommaire

- [1. Aperçu](#1-apercu)
- [2. Architecture & ports](#2-architecture--ports)
- [3. Prérequis](#3-prerequis)
- [4. Configuration (env)](#4-configuration-env)
- [5. Démarrage local](#5-demarrage-local)
- [6. Tests & Qualité](#6-tests--qualite)
- [7. Plan de déploiement — Production](#7-plan-de-deploiement--production)
- [8. Sécurité (Nginx, CORS, cookies)](#8-securite-nginx-cors-cookies)
- [9. RGPD, Accessibilité (RGAA), Éco-conception](#9-rgpd-accessibilite-rgaa-eco-conception)
- [10. Exploitation (runbook)](#10-exploitation-runbook)
- [11. Dépannage](#11-depannage)
- [Annexes (exemples à adapter)](#annexes-exemples-a-adapter)

---

## 1. Aperçu

- Auth **JWT** par cookies httpOnly (+ refresh). Isolation stricte des données par utilisateur.
- CRUD **tâches** et **tags** avec filtrage côté UI.
- Outillage CI/QA : **PHPUnit**, **PHPStan**, **PHP-CS-Fixer**, **ESLint**.

---

## 2. Architecture & ports

```
TaskBoard/
├─ app/
│  ├─ backend/    # Symfony API (controllers, entities, migrations, tests)
│  └─ frontend/   # React + TS (Vite, composants UI)
├─ docker/        # Dockerfiles front/back + scripts backup/restore
├─ compose.yml    # Environnement Docker (dev)
└─ package.json   # Scripts utilitaires (Docker & QA)
```

**Ports par défaut**

- Frontend : http://localhost:3000
- API : http://localhost:8000
- phpMyAdmin : http://localhost:8080
- MySQL : 3306 (local)

---

## 3. Prérequis

- **Docker** & **Docker Compose**
- **Node.js 20+**
- **OpenSSL** (génération des clés JWT en local si besoin)

---

## 4. Configuration (env)

- **Racine `/.env`** : variables utilisées par `compose.yml` (MySQL, etc.).
- **Backend `app/backend/.env*`** : `APP_ENV`, `DATABASE_URL`, `JWT_*`.
- Cookies : paramètres par environnement dans `app/backend/config/packages/*/parameters.yaml`.

**Matrice (extraits)**

| Clé            | dev/test    | prod          |
| -------------- | ----------- | ------------- |
| `jwt_domain`   | `localhost` | `.zakkios.fr` |
| `jwt_samesite` | `strict`    | `none`        |
| `jwt_secure`   | `false`     | `true`        |

> Générer les clés JWT une fois : `php bin/console lexik:jwt:generate-keypair --overwrite -n` (dans le conteneur backend).

---

## 5. Démarrage local

```bash
npm install
npm run build       # docker compose up --build -d
npm run back        # shell backend
php bin/console doctrine:migrations:migrate --no-interaction
php bin/console doctrine:fixtures:load --no-interaction
```

Scripts utiles (racine) :

```bash
npm run up          # docker compose up -d
npm run down        # docker compose down
npm run phpunit     # migrations + fixtures + tests backend
npm run phpstan     # analyse statique PHP
npm run phpcs       # style PHP
npm run eslint      # lint front
npm run eslint-fix  # lint + fix front
npm run sql         # client mysql dans le conteneur DB
```

---

## 6. Tests & Qualité

- **Backend** : PHPUnit (fonctionnels), PHPStan (analyse), PHP-CS-Fixer (style).
- **Frontend** : ESLint.
- **Jeux d’essai** : fixtures Doctrine ; base de test reconstruite automatiquement dans le job PHPUnit.

---

## 7. Plan de déploiement — Production

> Exemple VPS + Docker + **reverse proxy Nginx/Nginx Proxy Manager**. Adapter domaines & secrets.

### 7.1 Préparer le serveur

1. Installer Docker & Compose.
2. Créer `/srv/taskboard/{app,env,backups,logs}` et un **utilisateur non-root** membre du groupe docker.
3. Copier `docker-compose.prod.yml` (cf. annexe A) dans `/srv/taskboard/`.

### 7.2 Secrets & variables

- Créer `/srv/taskboard/env/.env` (mots de passe DB, `JWT_PASSPHRASE`, etc.).
- Déployer les clés JWT dans `/srv/taskboard/app/backend/config/jwt/` (**chmod 600**).
- Ne pas commiter de secrets ; utiliser **secrets CI/CD**.

### 7.3 Build & push d’images

- Idéalement via **GitHub Actions** : build images `back` et `front`, **tag daté + SHA**, push vers un **registry** privé.
- Alternative manuelle (local) : `docker build -t registry.example.com/taskboard-back:TAG app/backend` (cf. annexe E).

### 7.4 Déployer

```bash
cd /srv/taskboard
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

### 7.5 Migrations & données

```bash
docker exec backend-taskBoard php bin/console doctrine:migrations:migrate --no-interaction --env=prod
```

### 7.6 Sauvegardes & restauration

- Planifier `docker/scripts/backup_db.sh` quotidien (rétention 7j).
- Utiliser `docker/scripts/restore_db.sh` documenté (voir annexes C).

### 7.7 Rollback

1. Identifier le **tag** stable précédent.
2. `docker compose -f docker-compose.prod.yml pull` avec ce tag, puis `up -d`.
3. Refaire les smoke tests.
   > Si migration cassante : **restore** la dernière sauvegarde DB.

### 7.8 Checklist post-déploiement

- [ ] `docker ps` OK ; logs sans erreurs bloquantes.
- [ ] **/health** renvoie 200.
- [ ] Parcours **login → créer une tâche → lister** OK.
- [ ] Sauvegardes planifiées opérationnelles.

---

## 8. Sécurité (Nginx, CORS, cookies)

- **En-têtes HTTP** (HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy).
- **CORS** : restreindre aux origines front connues ; `credentials: true`.
- **Cookies JWT** : `httpOnly`, `secure` (prod), `SameSite=None`, domaine explicite.
- **Gestion erreurs** : réponses JSON normalisées (codes HTTP 4xx/5xx), pas de stacktrace en prod.

> Exemple Nginx en annexe B.

---

## 9. RGPD, Accessibilité (RGAA), Éco-conception

- **Mentions légales & vie privée** : page dédiée (propriétaire, contact, finalités, droits d’accès/rectification/suppression, durée de conservation).
- **Collecte minimale** : email, username ; **mots de passe** hachés (backend).
- **Droits utilisateurs** : endpoint ou mail de contact pour **export/suppression** de compte.
- **RGAA** : labels de formulaire, ordre de tabulation, focus visible, alternatives textuelles, contrastes suffisants.
- **Éco-conception** : assets statiques minifiés, cache HTTP, pagination côté API/UI, requêtes API évitées si inchangées.

---

## 10. Exploitation (runbook)

**Démarrer / Arrêter**

```bash
docker compose -f docker-compose.prod.yml up -d
docker compose -f docker-compose.prod.yml down
```

**Logs**

```bash
docker logs -f backend-taskBoard
docker logs -f frontend-taskBoard
```

**DB**

```bash
docker exec -it db-mysql-taskBoard mysql -uroot -p
```

**Renouveler certificats** (NPM/Let’s Encrypt) : via interface.  
**Rotation des clés JWT** : regénérer les paires, redémarrer l’API, invalider sessions si besoin.

---

## 11. Dépannage

- **Boucle login** → vérifier `jwt_domain`, `jwt_samesite`, `jwt_secure`.
- **CORS** bloqué → valider `Access-Control-Allow-Origin` (origine unique) + `credentials=true`.
- **Ports occupés** → modifier `ports:` dans le compose.
- **Migrations** échouées → restaurer backup, corriger, rejouer.

---

## Annexes (exemples à adapter)

### A. docker-compose.prod.yml

```yaml
version: "3.9"

services:
  backend:
    container_name: backend-taskBoard
    image: registry.example.com/taskboard-back:YYYY.MM.DD-<sha>
    env_file:
      - ./env/.env
    environment:
      APP_ENV: prod
      APP_DEBUG: "0"
    depends_on:
      - db
    ports:
      - "8000:8000"
    restart: always

  frontend:
    container_name: frontend-taskBoard
    image: registry.example.com/taskboard-front:YYYY.MM.DD-<sha>
    depends_on:
      - backend
    ports:
      - "3000:80"
    restart: always

  db:
    container_name: db-mysql-taskBoard
    image: mysql:8.4
    env_file:
      - ./env/.env
    volumes:
      - ./data/mysql:/var/lib/mysql
    ports:
      - "3306:3306"
    restart: always

  phpmyadmin:
    container_name: phpmyadmin-taskBoard
    image: phpmyadmin:latest
    environment:
      PMA_HOST: db
      PMA_PORT: 3306
    depends_on:
      - db
    ports:
      - "8080:80"
    restart: always
```

### B. Nginx (reverse proxy) — extrait

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "no-referrer" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' https://api.votre-domaine.fr; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" always;
```

### C. Scripts backup/restore

`docker/scripts/backup_db.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

DATE=$(date +"%Y-%m-%d_%H-%M")
OUT_DIR="/var/backups/taskboard"
mkdir -p "$OUT_DIR"

mysqldump -h "db" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" --single-transaction "db-taskBoard" \
  | gzip > "$OUT_DIR/db-taskBoard_${DATE}.sql.gz"

# Rétention 7 jours
find "$OUT_DIR" -type f -name "*.sql.gz" -mtime +7 -delete

echo "Backup OK: $OUT_DIR/db-taskBoard_${DATE}.sql.gz"
```

`docker/scripts/restore_db.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

FILE="${1:-}"
if [ -z "$FILE" ] || [ ! -f "$FILE" ]; then
  echo "Usage: $0 /chemin/vers/dump.sql.gz"
  exit 1
fi

gunzip -c "$FILE" | mysql -h "db" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "db-taskBoard"
echo "Restore OK from $FILE"
```

### D. Health-check script

```bash
#!/usr/bin/env bash
set -e

API_URL="${API_URL:-https://api.votre-domaine.fr}"
APP_URL="${APP_URL:-https://app.votre-domaine.fr}"

curl -fsS "$API_URL/health"
curl -fsS "$APP_URL/" | grep -qi "<title>TaskBoard"
echo "Smoke tests OK"
```

### E. CI/CD (extraits YAML)

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  backend:
    runs-on: ubuntu-latest
    services:
      mysql:
        image: mysql:8
        env:
          MYSQL_DATABASE: taskboard_test
          MYSQL_ROOT_PASSWORD: root
        ports: ["3306:3306"]
    steps:
      - uses: actions/checkout@v4
      - uses: shivammathur/setup-php@v2
        with:
          php-version: "8.3"
      - run: |
          cd app/backend
          composer install --no-interaction --prefer-dist
          php bin/console doctrine:migrations:migrate --no-interaction --env=test
          php bin/console doctrine:fixtures:load -n --env=test
          vendor/bin/phpstan analyse --no-progress
          vendor/bin/php-cs-fixer fix --dry-run --using-cache=no
          ./vendor/bin/phpunit

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: |
          cd app/frontend
          npm ci
          npm run lint
          npm run build
```
