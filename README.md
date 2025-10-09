## Spécifications techniques

- Stack frontend: React (JSX) + Vite (dev server)
- Stack backend: Node.js + Express + Socket.IO (simple in-memory session store)
- Ports par défaut:
	- Frontend (Vite dev server): 5173
	- Backend (Socket.IO server): 3001
- CORS: pendant le développement le serveur Socket.IO accepte toutes les origines (origin: '*'). En production, restreindre ceci à la/aux origine(s) autorisée(s).
- Sessions: stockées en mémoire dans une Map (non persistant). Pour la production, utiliser une base de données ou Redis.

## Lancer le projet en développement

1. Installer les dépendances du frontend (depuis la racine du projet):

```bash
npm install
```

2. Lancer le serveur de développement Vite (frontend):

```bash
npm run dev
```

3. Installer les dépendances du serveur et démarrer le serveur Socket.IO (depuis le dossier `server/`):

```bash
cd server
npm install
node server.js
```

Le frontend par défaut écoute sur `http://localhost:5173` et le serveur Socket.IO sur `http://localhost:3001`.

### Options d'environnement utiles

- PORT: changer le port du serveur (ex: `PORT=4000 node server.js`).
- HOST: par défaut le serveur écoute sur `0.0.0.0` pour autoriser l'accès depuis le réseau local. Pour restreindre à localhost: `HOST=127.0.0.1 node server.js`.


