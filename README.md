# Trello Story Point Tracker Power-Up

Ce Power-Up permet de gérer les Story Points sur une carte Trello avec un suivi de l'évolution (consommation) durant un sprint.

## Fonctionnalités
- **Définition initiale** : Choix du nombre de points initial (suite de Fibonacci).
- **Décrémentation** : Saisie manuelle des points consommés avec possibilité d'ajouter une note.
- **Badge de carte** : Affiche les points restants sur le recto de la carte.
- **Badge détaillé** : Affiche "Reste / Initial" au dos de la carte.
- **Historique** : Section dédiée au dos de la carte listant toutes les modifications (date, action, note, reste).

## Installation et Test

Pour tester ce Power-Up localement :

1. **Hébergement local** :
   Vous devez servir les fichiers de ce répertoire via HTTPS. La méthode la plus simple est d'utiliser un serveur Python combiné à `localtunnel`.

   Dans un premier terminal, lancez le serveur :
   ```bash
   python3 -m http.server 8000
   ```

   Dans un second terminal, créez le tunnel HTTPS :
   ```bash
   npx localtunnel --port 8000
   ```
   Notez l'URL HTTPS fournie (ex: `https://XXXX.loca.lt`).

   **IMPORTANT : Bypass de sécurité**
   Avant d'utiliser le Power-Up dans Trello, ouvrez l'URL `https://XXXX.loca.lt` dans un nouvel onglet de votre navigateur. Si une page de confirmation ("Click to Continue" ou demande d'IP) s'affiche, validez-la. Tant que cette page s'affiche, Trello ne pourra pas charger le plugin dans son iframe.

2. **Enregistrement sur Trello** :
   - Allez sur le [Trello Developer Portal](https://trello.com/power-ups/admin).
   - Créez un nouveau Power-Up.
   - Dans le champ **Iframe Connector URL**, saisissez l'URL de votre `index.html` (ex: `https://XXXX.loca.lt/index.html`).
   - Activez les capacités suivantes dans "Capabilities" :
     - Card Badges
     - Card Detail Badges
     - Card Buttons
     - Card Back Section

3. **Utilisation** :
   - Allez sur un tableau Trello.
   - Activez votre Power-Up (via le bouton "Power-Ups").
   - Ouvrez une carte et cliquez sur le bouton "Story Points" pour commencer.

## Structure du Code
- `manifest.json` : Configuration Trello.
- `index.html` : Point d'entrée.
- `js/client.js` : Logique principale d'intégration Trello.
- `popup.html` / `js/popup.js` : Gestion de la saisie des points.
- `section.html` / `js/section.js` : Affichage de l'historique.

## Publication et Mise en Production

Pour rendre ce Power-Up accessible de manière permanente (sans localtunnel) :

### 1. Hébergement Permanent
Vous devez héberger les fichiers sur un serveur HTTPS statique. Les options recommandées sont :
- **GitHub Pages** (Gratuit et simple) : Poussez le code sur un dépôt GitHub et activez les Pages.
- **Netlify / Vercel** : Déposez simplement le dossier pour obtenir une URL HTTPS stable.

### 2. Mise à jour de l'URL sur Trello
Une fois hébergé (ex: `https://votre-projet.github.io/trello-plugin/`) :
1. Allez sur le [Trello Developer Portal](https://trello.com/power-ups/admin).
2. Sélectionnez votre Power-Up.
3. Remplacez l'URL `localtunnel` par l'URL permanente de votre `index.html`.
4. Enregistrez les modifications.

### 3. Partage du Power-Up
Il existe deux manières de partager le Power-Up :

- **Usage Privé (ou Interne)** : 
  Le Power-Up est immédiatement utilisable par vous et les membres des tableaux sur lesquels il est activé, tant qu'il reste en mode "Custom" (personnalisé).
  
- **Publication sur le Trello Power-Up Directory (Public)** :
  Si vous souhaitez que tout le monde puisse le trouver dans le catalogue Trello :
  1. Complétez les informations requises dans l'onglet **Listing** (icônes, descriptions, captures d'écran).
  2. Allez dans l'onglet **Submission**.
  3. Cliquez sur **Submit for Approval**. Trello effectuera une revue de sécurité et de conformité avant de le rendre public.
