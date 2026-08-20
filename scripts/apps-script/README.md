# Backend RSVP — Google Sheets + Apps Script

Les réponses au formulaire RSVP sont enregistrées dans une feuille Google Sheets,
via une petite application web Apps Script. C'est gratuit, sans quota gênant, et
les réponses restent consultables comme un tableur classique.

## 1. Créer la feuille de calcul

1. Ouvrez [sheets.new](https://sheets.new) et nommez le document, par exemple
   « Mariage — Réponses RSVP ».
2. Laissez la feuille vide : les en-têtes sont créés automatiquement à la première
   réponse.

## 2. Ajouter le script

1. Dans la feuille, menu **Extensions → Apps Script**.
2. Supprimez le contenu du fichier `Code.gs` affiché.
3. Copiez-collez l'intégralité du fichier [`Code.gs`](./Code.gs) de ce dossier.
4. (Facultatif) renseignez `NOTIFICATION_EMAIL` en haut du fichier pour recevoir
   un e-mail à chaque nouvelle réponse.
5. Enregistrez (Ctrl + S).

## 3. Déployer l'application web

1. Bouton **Déployer → Nouveau déploiement**.
2. Type de déploiement : **Application web**.
3. Paramètres — **ils sont critiques** :
   - *Exécuter en tant que* : **Moi** (votre compte)
   - *Qui a accès* : **Tout le monde**
4. Cliquez sur **Déployer**, puis autorisez le script (Google affiche un
   avertissement « Application non validée » : *Paramètres avancés* →
   *Accéder à … (non sécurisé)*, c'est normal pour un script personnel).
5. Copiez l'**URL de l'application web** ; elle ressemble à
   `https://script.google.com/macros/s/AKfycb.../exec`.

## 4. Brancher le site

En local, créez un fichier `.env` à la racine du projet :

```
PUBLIC_RSVP_ENDPOINT=https://script.google.com/macros/s/AKfycb.../exec
```

Pour le site déployé, ajoutez la même valeur dans GitHub :
**Settings → Secrets and variables → Actions → Variables → New repository variable**,
nom `PUBLIC_RSVP_ENDPOINT`.

## 5. Vérifier

- Ouvrez l'URL `/exec` dans un navigateur : elle doit répondre
  `{"status":"ok","message":"RSVP endpoint ready"}`.
- Envoyez une réponse de test depuis le site : une ligne doit apparaître dans la
  feuille.

## Notes techniques

- **CORS** : le site envoie le JSON avec `Content-Type: text/plain`, ce qui évite
  la requête de contrôle préalable (`preflight`) qu'Apps Script ne sait pas
  traiter. Si la lecture de la réponse est tout de même bloquée par le
  navigateur, le site rejoue automatiquement l'envoi en `no-cors` : la réponse
  est bien enregistrée, seule la confirmation détaillée est perdue.
- **Anti-spam** : un champ caché (`website`) sert de piège à robots. Les
  soumissions qui le remplissent sont ignorées silencieusement.
- **Concurrence** : `LockService` garantit qu'aucune réponse n'est écrasée si
  plusieurs invités répondent en même temps.
- **Confidentialité** : la feuille reste privée. L'application web écrit
  uniquement, elle n'expose jamais les réponses en lecture.
- **Mise à jour du script** : après toute modification du code, il faut faire
  **Déployer → Gérer les déploiements → Modifier → Version : Nouvelle version**,
  sinon l'ancienne version reste servie.
