# Site de mariage — Camille & Antoine

Site vitrine statique pour un mariage : présentation du lieu, déroulé de la
journée et formulaire de réponse (RSVP). Construit avec **Astro** et
**Tailwind CSS**, hébergé gratuitement sur **GitHub Pages**.

> Le contenu affiché est en **français** ; le code (composants, variables,
> commentaires) est en **anglais**.

## Aperçu des fonctionnalités

- Page unique élégante, responsive et accessible.
- Compte à rebours jusqu'au jour J.
- Section **Lieu** avec carte Google Maps **chargée uniquement au clic**
  (aucun cookie tiers avant action → pas de bandeau RGPD) et liens
  Google Maps / Waze.
- **Programme** de la journée sous forme de timeline.
- Formulaire **RSVP** enregistré dans une feuille **Google Sheets**.
- Sections optionnelles **Liste de mariage / cagnotte** et **Playlist
  collaborative** (désactivées par défaut).

## Modifier le contenu

Tout le contenu est centralisé dans un seul fichier :

```
src/config/wedding.config.ts
```

Vous y trouverez les prénoms, la date, le lieu, le programme, les textes du
RSVP, l'e-mail de contact, etc. **Il ne devrait jamais être nécessaire de
toucher aux composants.**

Pour activer une section optionnelle, passez son drapeau `enabled` à `true` :

```ts
giftRegistry: {
  enabled: true, // affiche la liste de mariage et son entrée de menu
  // ...
},
playlist: {
  enabled: true, // affiche la playlist collaborative
  // ...
},
```

### Images

Déposez vos photos dans `public/images/` puis mettez à jour les chemins
correspondants dans la config (par ex. `hero.backgroundImage`). Une image de
fond décorative par défaut est fournie (`public/images/hero.svg`).

### Carte

Dans `venue.mapEmbedUrl`, `googleMapsUrl` et `wazeUrl`, remplacez l'adresse par
la vôtre. L'URL d'intégration utilise la forme gratuite `?q=...&output=embed`
de Google Maps, sans clé API.

## Recevoir les réponses RSVP (Google Sheets)

Les réponses sont stockées dans une feuille Google Sheets via une petite
application Google Apps Script. La procédure complète, pas à pas, est décrite
dans :

```
scripts/apps-script/README.md
```

Une fois l'application web déployée, renseignez son URL :

- **En local** : créez un fichier `.env` (voir `.env.example`) contenant
  `PUBLIC_RSVP_ENDPOINT=...`.
- **Sur GitHub** : Settings → Secrets and variables → Actions → **Variables** →
  nouvelle variable `PUBLIC_RSVP_ENDPOINT`.

Sans cette URL, le formulaire s'affiche mais invite l'invité à écrire à
l'adresse de contact.

## Développement local

```sh
npm install
npm run dev      # http://localhost:4321
```

Autres commandes :

| Commande          | Action                                    |
| :---------------- | :---------------------------------------- |
| `npm run build`   | Génère le site de production dans `dist/` |
| `npm run preview` | Prévisualise le build local               |

## Déploiement sur GitHub Pages

Le dépôt contient un workflow GitHub Actions
(`.github/workflows/deploy.yml`) qui construit et publie le site à chaque
push sur `main`.

1. Poussez le projet sur un dépôt GitHub.
2. Dans **Settings → Pages**, choisissez **Source : GitHub Actions**.
3. (RSVP) Ajoutez la variable de dépôt `PUBLIC_RSVP_ENDPOINT`.
4. Poussez sur `main` : le site se déploie automatiquement.

Le workflow détecte l'URL et le **chemin de base** corrects, que le dépôt soit
une *user page* (`compte.github.io`) ou une *project page*
(`compte.github.io/nom-du-depot`). Aucune configuration manuelle du `base`
n'est nécessaire.

### Domaine personnalisé (optionnel)

Ajoutez un fichier `public/CNAME` contenant votre domaine (ex. `notre-mariage.fr`)
et configurez-le dans **Settings → Pages**.

## Structure du projet

```
src/
├── config/          # Contenu éditable (wedding.config.ts) + types + nav
├── layouts/         # Layout de base (SEO, en-tête, pied de page)
├── components/      # Sections et composants d'interface
├── scripts/         # Logique client (compte à rebours, RSVP, animations)
├── styles/          # Design system (global.css)
└── pages/           # index.astro (page unique)
scripts/apps-script/ # Backend Google Apps Script + guide de déploiement
```
