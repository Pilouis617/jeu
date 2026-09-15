# RICOCHET

Un jeu de tir et de réflexion : trouver le bon angle pour éliminer des robots avec un minimum de balles. Les murs deviennent des alliés, et les robots blindés imposent au moins un ricochet avant l’impact.

## Jouer

Télécharger le dossier et ouvrir **index.html** dans un navigateur récent. Aucun serveur, compte, téléchargement de dépendances ni installation nécessaire. Le jeu fonctionne hors ligne.

## Commandes

| Action | Ordinateur | Mobile |
| --- | --- | --- |
| Viser | Souris ou flèches gauche / droite | Glisser dans l’arène |
| Visée fine | Maj + flèches | Ajuster le doigt |
| Tirer | Clic gauche, Espace ou bouton Tirer | Bouton Tirer |
| Recommencer | R ou Rejouer | Rejouer |
| Pause | P, Échap ou bouton pause | Bouton pause |

## Règles

- 12 secteurs à débloquer, avec des obstacles et des robots blindés.
- Chaque balle traverse les robots et peut effectuer **6 rebonds**.
- L’aperçu affiche les **2 premiers rebonds**.
- Les robots orange acceptent un tir direct. Les bleus nécessitent au moins un rebond.
- Détruire toutes les cibles avant d’épuiser les munitions.
- **3 étoiles** : atteindre l’objectif de tirs, sans indice ; **2** : un tir supplémentaire ou un indice ; **1** : terminer avec davantage de tirs.
- L’indice positionne le canon sur une trajectoire utile. Il limite le score du secteur à deux étoiles pour cet essai.
- Progression enregistrée dans le navigateur via `localStorage`, lorsqu’il est disponible. Effacer les données du navigateur supprime les scores. Les scores peuvent différer entre le fichier local et une version hébergée.

## Technique

HTML, CSS, JavaScript et Canvas 2D, sans dépendance externe. La visée et les projectiles partagent le même calcul d’intersection rayon/segment. Les collisions avec les robots sont calculées sur la trajectoire complète, indépendamment du nombre d’images par seconde. Les sons sont synthétisés avec Web Audio et désactivés par défaut.

Les cibles sont placées de façon déterministe sur des trajectoires de référence pour rendre chaque secteur résoluble. Les trajectoires de référence sont aussi utilisées par l’indice.

## Fichiers

- `index.html` : jeu autonome, styles, niveaux et moteur.
- `tests.cjs` : vérification de la géométrie et des solutions, avec Node.js, sans dépendance.

Lancer les tests : `node tests.cjs`.
