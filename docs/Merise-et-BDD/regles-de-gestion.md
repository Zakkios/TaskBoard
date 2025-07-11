# 📜 Règles de gestion – DevTaskBoard

| ID   | Règle de gestion                                                                 | Portée         |
|------|-----------------------------------------------------------------------------------|----------------|
| RG01 | Un utilisateur ne peut accéder qu'à ses propres tâches | Sécurité / API |
| RG02 | Un administrateur peut voir toutes les tâches | Sécurité / API |
| RG03 | Une tâche doit obligatoirement avoir un titre | Donnée |
| RG04 | Le champ statut d’une tâche ne peut contenir que : TODO, DOING ou DONE | Donnée / Logique métier |
| RG05 | Les étiquettes sont propres à chaque utilisateur | Donnée |
| RG06 | Un utilisateur ne peut pas modifier ou supprimer une tâche qui ne lui appartient pas | Sécurité |
| RG07 | Une étiquette doit avoir un nom unique par utilisateur | Donnée |
| RG08 | La suppression d’un compte entraîne la suppression de toutes ses tâches et étiquettes | Intégrité |
| RG09 | Une tâche peut avoir 0 à 5 étiquettes associées | Logique métier |
| RG10 | Un utilisateur peut créer de 0 à 10 étiquettes | Logique métier |
| RG11 | Un utilisateur doit être connecté pour accéder à l’espace de gestion | Authentification |
