// Service Worker
// Ce qui permet de rendre l'application focntionnelle offline
// Il est intégré au index.html au sein d'une balise script chargeant le navigator
// C'est un Worker séparé, le js n'est pas chargé dans la page donc pas d'accès aux objets du DOM 

// Const qui sert à définir la version du sw pour réinstallation par le navigateur si nouveautés. cf Readme section Cycles de vie)
const PREFIX = 'V2';
// const PREFIX = 'V1';

// Le système n'écoute que le second chargement de la page
self.addEventListener('install', () => {
    //SlipWaiting permet de ne pas attendre pour charger une nouvelle version du sw
    self.skipWaiting();
    console.log(`${PREFIX} Install`);
});

self.addEventListener('activate', () => {
    // clients.claim() permet de controller automatiquement la page quand le SW s'active.
    clients.claim();
    console.log(`${PREFIX} Active`);
})


// Traitement du offline requiert un handler sur "fetch"
// Fetch se compare à un proxy qui permet de rajouer des comportements particuliers quand on essaye d'accéder à une ressource -> si ressource pas dispo alors on fait quelque chose de particulier
self.addEventListener('fetch', (event) => {
    // Permet de récupérer la requête demandée actuellement : l'url et le mode
    console.log(
        `${PREFIX} Fetching : ${event.request.url}, Mode : ${event.request.mode}`
    );

    if(event.request.mode === 'navigate') {
        // respondWith: attend une promesse et pas une function qui renvoie une promesse. On l'appelle de suite avec ()
        event.respondWith(
            (async () => {
                try {
                // Le navigateur preload la réponse que l'on récupère via un event
                const preloadResponse = await event.preloadResponse;
                if(preloadResponse) {
                    return preloadResponse;
                }

                // On accède à la ressource par le réseau qui devient notre réponse que l'on retourne directement
                return await fetch(event.request)
                }
                catch(e) {
                    // Si pas de réseau alors on exécute ce code
                    return new Response("Bonjour les gens");
                }
        })()
        );
    }

});



