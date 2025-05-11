# Min.day

## 1. Cloner le projet

```bash
git clone https://github.com/ton-utilisateur/minday.git
cd minday
```

## 2. Installer les dépendances

```bash
# Backend
cd minday/backend
npm install

# Frontend
cd minday
npm install
```

## 3. Configuration des variables d'environnement

Crée un fichier `.env` dans le dossier `backend` avec le contenu suivant :

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

- Remplace `your_mongodb_connection_string` par l'URI de ta base MongoDB Atlas.

## 4. Création de la base de données

Pas besoin de télécharger quoi que ce soit il faut créer son compte en ligne créer une database minday ou comme vous voulez créer 3 collections : `cards`, `savedcards` et `users` et rentrer ces infos dans la collection `users` :

```

{"_id":{"$oid":"681f6793ad8c711b1fa2fd1b"},"name":"Default User","bio":"Welcome to Minday!","location":"Earth","avatarUrl":"/default-avatar.png","preferences":{"dailyCardCount":{"$numberInt":"5"},"categories":["histoire","sciences","geographie","art"],"notifications":true},"stats":{"cardsLearned":{"$numberInt":"0"},"challengesWon":{"$numberInt":"0"},"dayStreak":{"$numberInt":"0"}},"__v":{"$numberInt":"0"}}
```

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
npm run dev
```

Le backend sera accessible sur [http://localhost:5000](http://localhost:5000).

### Frontend

Dans le dossier du projet `minday` :

```bash
npm run dev
```

## 7. Utilisation

- **Accueil** : Découvre des cartes mélangées de toutes les catégories.
- **Bibliothèque** : Accède à toutes tes cartes sauvegardées, classées par catégorie.
- **Défis** : Lance des défis sur les cartes de ta bibliothèque.
- **Profil** : Consulte tes statistiques et ton profil.

## 8. Astuces & Dépannage

- Si tu veux régénérer toutes les cartes, relance simplement `node generateCards.js` dans le dossier backend.
- Si tu modifies le backend, penses à le redémarrer.
- Pour toute erreur de connexion à MongoDB, vérifie bien la variable `MONGO_URI` dans le `.env`.

## 9. Bonne Chance ....
