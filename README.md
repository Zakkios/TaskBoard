# TaskBoard

# Tests backend (Symfony + API)

Le dossier tests contiens les tests **fonctionnels** et **unitaires** :
- Authentification (JWT via `/api/login_check`)
- CRUD Tasks + validations + cohérence en base
- CRUD Tags + validations
- Cloisonnement des données (un utilisateur ne peut pas accéder aux ressources d'un autre)
- Enum `StatusEnum` (unit tests)

## Arborescence
```
tests/
  Functional/
    AuthenticationTest.php
    TaskTest.php
    TagTest.php
    SecurityTest.php
  Unit/
    StatusEnumTest.php
  Traits/
    AuthClientTrait.php
```