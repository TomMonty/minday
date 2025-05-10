# Min.day

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
