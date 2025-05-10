# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## 1. Cloner le projet

```bash
git clone https://github.com/ton-utilisateur/minday.git
cd minday
```

## 2. Installer les dépendances

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## 3. Configuration des variables d'environnement

Crée un fichier `.env` dans le dossier `backend` avec le contenu suivant :

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
GOOGLE_API_KEY=your_google_api_key
```

- Remplace `your_mongodb_connection_string` par l'URI de ta base MongoDB (Atlas ou locale).
- Remplace `your_google_api_key` par ta clé API Google si tu utilises la génération automatique de cartes.

## 4. Création de la base de données

La base de données et les collections seront créées automatiquement au premier lancement du backend et lors de la génération de cartes.

## 5. Génération de cartes (remplir la base)

Pour générer automatiquement des cartes dans la base (collection `cards`), utilise le script suivant :

```bash
cd backend
node generateCards.js
```

- Ce script va générer des cartes thématiques et les insérer dans la collection `cards`.
- Tu peux relancer ce script à tout moment pour régénérer des cartes.

## 6. Lancer le projet

### Backend

Dans le dossier `backend` :

```bash
npm start
# ou
node server.js
```

Le backend sera accessible sur [http://localhost:5000](http://localhost:5000).

### Frontend

Dans le dossier `frontend` :

```bash
npm run dev
```

Le frontend sera accessible sur [http://localhost:5173](http://localhost:5173) (ou le port affiché dans le terminal).

## 7. Utilisation

- **Accueil** : Découvre des cartes mélangées de toutes les catégories.
- **Sauvegarde** : Clique sur l'étoile d'une carte pour la sauvegarder dans ta bibliothèque (elle sera retirée de la Home).
- **Bibliothèque** : Accède à toutes tes cartes sauvegardées, classées par catégorie.
- **Défis** : Lance des défis sur les cartes de ta bibliothèque.
- **Profil** : Consulte tes statistiques et ton profil.

## 8. Astuces & Dépannage

- Si tu veux régénérer toutes les cartes, relance simplement `node generateCards.js` dans le dossier backend.
- Si tu modifies le backend, pense à le redémarrer.
- Pour toute erreur de connexion à MongoDB, vérifie bien la variable `MONGODB_URI` dans le `.env`.

## 9. Structure du projet

```
minday/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── generateCards.js
│   ├── server.js
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
└── README.md
```

---

## 10. Contact

Pour toute question ou problème, contactes l'auteur du projet ou ouvre une issue sur le dépôt GitHub.

Bon test et bonne découverte de Minday !
