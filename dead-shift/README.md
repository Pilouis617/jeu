# DEAD SHIFT

FPS de survie rétro en première personne, dans un laboratoire en quarantaine. Cinq vagues de sujets hostiles, une boutique entre les vagues et un Gardien à éliminer lors de la dernière vague.

## Jouer

Télécharger **index.html** et l'ouvrir dans un navigateur de bureau récent (Chrome, Edge ou Firefox). Tout tient dans ce fichier : aucune installation, aucun serveur et aucune connexion nécessaires pour jouer. Cliquer sur **Commencer la garde** pour capturer la souris.

Conçu pour ordinateur avec clavier et souris. La visée est horizontale, comme dans les premiers FPS. Si la capture de la souris est indisponible, utiliser les flèches gauche et droite ou cliquer-glisser dans l'arène.

| Action | Commande |
| --- | --- |
| Avancer / reculer / déplacements latéraux | ZQSD ou WASD |
| Regarder à gauche / droite | Souris ou flèches gauche / droite |
| Tirer | Clic gauche maintenu ou Espace |
| Recharger | R |
| Pistolet / fusil à pompe / mitraillette | 1 / 2 / 3 |
| Dash (3 secondes de récupération) | Maj + déplacement |
| Afficher la carte | M |
| Pause | P ou Échap |
| Plein écran / sons / aide | Boutons en haut |

## Règles

- Éliminer tous les ennemis de chaque vague pour ouvrir la boutique.
- Les ennemis se déplacent dans les couloirs pour atteindre le joueur. La carte aide à retrouver les derniers hostiles.
- Chaque élimination rapporte des crédits : acheter des armes, des munitions, des soins, une armure ou jusqu'à trois améliorations de dégâts.
- Le pistolet dispose de munitions de réserve illimitées, mais son chargeur doit être rechargé. Les autres armes utilisent une réserve limitée.
- Marcher sur les caisses pour ramasser des soins ou des munitions.
- Le dash permet de se déplacer rapidement et offre une brève invulnérabilité.
- 15 points de vie sont rendus au début de chaque vague (maximum 100).
- La victoire exige de terminer la vague 5, Gardien compris.
- Le meilleur score est conservé localement lorsque le navigateur autorise `localStorage`. La partie en cours n'est pas sauvegardée.

## Technique

HTML, CSS et JavaScript sans dépendance. Rendu Canvas 2D à 640 × 360 par raycasting, avec correction de perspective, tampon de profondeur et sprites procéduraux. Les collisions des tirs utilisent des intersections rayon/cercle et les murs arrêtent les balles. Les ennemis utilisent une carte de distances calculée par parcours en largeur. Les sons sont synthétisés avec Web Audio.

Les effets de recul visuel sont réduits si la préférence système « réduire les animations » est active. Le jeu se met en pause quand la fenêtre perd le focus ou que la capture de la souris est libérée.

## Vérifier le moteur

Avec Node.js :

```sh
node tests.cjs
```

Les tests couvrent l'accessibilité de la carte, les murs, les tirs, le rechargement, les achats, les crédits, l'apparition du boss, la victoire et la défaite. Les commandes et l'interface ont également été vérifiées dans Chromium.

## Fichiers

- `index.html` : jeu autonome.
- `tests.cjs` : tests du moteur, sans dépendance.
- `README.md` : présentation et commandes.
