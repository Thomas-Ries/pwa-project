# PWA Course

## Manifest documentation

<https://web.dev/add-manifest/>

## Google Doc PWA

<https://developers.google.com/web/ilt/pwa?hl=en>

## Cycles de vie

<https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle?hl=en>

Lorsque l'on charge la page pour la toute première fois, le service worker va lancer un processus d'installation.

Une fois installé il va devenir actif mais ne pas fonctionner sur la page courante, ne pas la controller. Si on réactualise la page il va controller les choses et du coup, et le fetch va agir et nous pourrons intercepter les choses.

A chaque fois que je charge la page en étant connecté, le navigateur va essayer de charger la nouvelle version de sw.js.

* Si pas de changements, il ne fais rien
* Si changement, il va déclencher une nouvelle installation (cf cont PREFIX dans ./sw.js)

=> Si nouvelle installation, il ne s'activera que lorsque le précédent aura fini de fonctionner. C'est à dire, pour le précédent, quand on aura par exemple fermé tous les onglets ou changé de page pendant plusieurs secondes. Quand on va recharger la page, le nouveau va s'installer -> voir const PREFIX dans /sw.js

=> Si on veut skipper cet attente et remplacer l'ancien sw de suite -> voir /sw.js dans l'eventListener install
