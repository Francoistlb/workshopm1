const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Vite dev server
    methods: ["GET", "POST"]
  }
});

// Stockage des sessions en mémoire (en production, utiliser une base de données)
const gameSessions = new Map();

// Génération d'un code de session aléatoire
function generateSessionCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

io.on('connection', (socket) => {
  console.log(`🔌 Joueur connecté: ${socket.id}`);

  // Créer une nouvelle session
  socket.on('createSession', (data) => {
    const sessionCode = generateSessionCode();
    const player = {
      id: socket.id,
      name: data.playerName,
      isHost: true,
      joinedAt: new Date().toLocaleTimeString(),
      lastSeen: Date.now()
    };

    const session = {
      code: sessionCode,
      players: [player],
      createdAt: Date.now(),
      maxPlayers: 4,
      gameStarted: false
    };

    gameSessions.set(sessionCode, session);
    socket.join(sessionCode);
    socket.sessionCode = sessionCode;
    socket.playerId = socket.id;

    console.log(`✅ Session créée: ${sessionCode} par ${data.playerName}`);

    socket.emit('sessionCreated', {
      sessionCode,
      players: session.players,
      player: player
    });

    // Informer tous les clients de la session de la mise à jour
    socket.to(sessionCode).emit('playersUpdated', session.players);
  });

  // Rejoindre une session existante
  socket.on('joinSession', (data) => {
    const { sessionCode, playerName } = data;
    const session = gameSessions.get(sessionCode);

    if (!session) {
      socket.emit('error', { message: 'Code de partie invalide !' });
      return;
    }

    if (session.players.length >= session.maxPlayers) {
      socket.emit('error', { message: 'Cette partie est complète !' });
      return;
    }

    if (session.gameStarted) {
      socket.emit('error', { message: 'Cette partie a déjà commencé !' });
      return;
    }

    // Vérifier si le nom est déjà pris
    if (session.players.some(p => p.name === playerName)) {
      socket.emit('error', { message: 'Ce nom est déjà utilisé dans cette partie !' });
      return;
    }

    const player = {
      id: socket.id,
      name: playerName,
      isHost: false,
      joinedAt: new Date().toLocaleTimeString(),
      lastSeen: Date.now()
    };

    session.players.push(player);
    socket.join(sessionCode);
    socket.sessionCode = sessionCode;
    socket.playerId = socket.id;

    console.log(`👥 ${playerName} a rejoint la session ${sessionCode}`);

    socket.emit('sessionJoined', {
      sessionCode,
      players: session.players,
      player: player
    });

    // Informer tous les clients de la session de la mise à jour
    io.to(sessionCode).emit('playersUpdated', session.players);
  });

  // Démarrer la partie
  socket.on('startGame', (data) => {
    const session = gameSessions.get(socket.sessionCode);
    if (!session) return;

    const player = session.players.find(p => p.id === socket.id);
    if (!player || !player.isHost) {
      socket.emit('error', { message: 'Seul l\'hôte peut démarrer la partie !' });
      return;
    }

    // Pas de minimum de joueurs requis

    session.gameStarted = true;
    console.log(`🎮 Partie démarrée pour la session ${socket.sessionCode}`);

    // Informer tous les joueurs que la partie commence
    io.to(socket.sessionCode).emit('gameStarted', {
      players: session.players,
      sessionCode: socket.sessionCode
    });
  });

  // Mise à jour de la position du joueur
  socket.on('updatePosition', (data) => {
    const session = gameSessions.get(socket.sessionCode);
    if (!session) return;

    const playerIndex = session.players.findIndex(p => p.id === socket.id);
    if (playerIndex !== -1) {
      session.players[playerIndex].position = data.position;
      session.players[playerIndex].lastSeen = Date.now();

      // Diffuser la nouvelle position aux autres joueurs
      socket.to(socket.sessionCode).emit('playerMoved', {
        playerId: socket.id,
        position: data.position
      });
    }
  });

  // Heartbeat pour maintenir la connexion
  socket.on('heartbeat', () => {
    const session = gameSessions.get(socket.sessionCode);
    if (!session) return;

    const playerIndex = session.players.findIndex(p => p.id === socket.id);
    if (playerIndex !== -1) {
      session.players[playerIndex].lastSeen = Date.now();
    }
  });

  // Gestion de la déconnexion
  socket.on('disconnect', () => {
    console.log(`❌ Joueur déconnecté: ${socket.id}`);

    if (socket.sessionCode) {
      const session = gameSessions.get(socket.sessionCode);
      if (session) {
        // Retirer le joueur de la session
        session.players = session.players.filter(p => p.id !== socket.id);

        if (session.players.length === 0) {
          // Supprimer la session si plus de joueurs
          gameSessions.delete(socket.sessionCode);
          console.log(`🗑️ Session ${socket.sessionCode} supprimée (aucun joueur)`);
        } else {
          // Si l'hôte quitte, promouvoir le premier joueur
          if (!session.players.some(p => p.isHost)) {
            session.players[0].isHost = true;
            console.log(`👑 ${session.players[0].name} est maintenant l'hôte de ${socket.sessionCode}`);
          }

          // Informer les autres joueurs
          socket.to(socket.sessionCode).emit('playersUpdated', session.players);
        }
      }
    }
  });
});

// Nettoyage automatique des joueurs inactifs
setInterval(() => {
  const now = Date.now();
  const timeout = 30000; // 30 secondes d'inactivité

  gameSessions.forEach((session, sessionCode) => {
    const activePlayers = session.players.filter(player => (now - player.lastSeen) < timeout);
    
    if (activePlayers.length !== session.players.length) {
      session.players = activePlayers;
      
      if (session.players.length === 0) {
        gameSessions.delete(sessionCode);
        console.log(`🗑️ Session ${sessionCode} supprimée (inactivité)`);
      } else {
        // Assurer qu'il y a toujours un hôte
        if (!session.players.some(p => p.isHost)) {
          session.players[0].isHost = true;
        }
        
        // Informer les joueurs actifs
        io.to(sessionCode).emit('playersUpdated', session.players);
      }
    }
  });
}, 10000); // Vérification toutes les 10 secondes

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Serveur Socket.IO démarré sur le port ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
});