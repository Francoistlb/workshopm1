import React, { useState } from "react";
import io from 'socket.io-client';
import './home.css'

function Home({ onStartGame }){
    const [showModal, setShowModal] = useState(false);
    const [sessionCode, setSessionCode] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [gameMode, setGameMode] = useState(''); // 'create' ou 'join'
    const [isConnecting, setIsConnecting] = useState(false);
    const [socket, setSocket] = useState(null);
    const [currentStep, setCurrentStep] = useState('choice'); // 'choice', 'create', 'join', 'lobby'
    const [players, setPlayers] = useState([]); // Liste des joueurs connectés
    const [maxPlayers] = useState(4); // Maximum 4 joueurs

    const handleLaunchGame = () => {
        setShowModal(true);
        setCurrentStep('choice');
    };

    const handleChooseCreate = () => {
        setCurrentStep('create');
        setGameMode('create');
    };

    const handleChooseJoin = () => {
        setCurrentStep('join');
        setGameMode('join');
    };

    const handleCreateSession = () => {
        if (!playerName.trim()) {
            alert('Veuillez entrer votre nom !');
            return;
        }
        setIsConnecting(true);
        connectToServer('create');
    };

    const handleJoinSession = () => {
        if (!sessionCode.trim()) {
            alert('Veuillez entrer un code de partie !');
            return;
        }
        if (!playerName.trim()) {
            alert('Veuillez entrer votre nom !');
            return;
        }
        setIsConnecting(true);
        connectToServer('join');
    };

    const connectToServer = (mode) => {
        // Connexion au serveur Socket.IO
        const newSocket = io('http://localhost:3001');

        newSocket.on('connect', () => {
            console.log('✅ Connecté au serveur !');
            setSocket(newSocket);
            
            if (mode === 'create') {
                newSocket.emit('createSession', { playerName });
            } else {
                newSocket.emit('joinSession', { sessionCode, playerName });
            }
        });

        newSocket.on('sessionCreated', (data) => {
            setSessionCode(data.sessionCode);
            setPlayers(data.players);
            console.log('🎉 Session créée :', data.sessionCode);
            setCurrentStep('lobby');
            setIsConnecting(false);
        });

        newSocket.on('sessionJoined', (data) => {
            setSessionCode(data.sessionCode);
            setPlayers(data.players);
            console.log('🎉 Session rejointe :', data.sessionCode);
            setCurrentStep('lobby');
            setIsConnecting(false);
        });

        newSocket.on('playersUpdated', (updatedPlayers) => {
            setPlayers(updatedPlayers);
            console.log('👥 Joueurs mis à jour :', updatedPlayers);
        });

        newSocket.on('gameStarted', (data) => {
            console.log('🎮 Partie démarrée !');
            const currentPlayerData = data.players.find(p => p.name === playerName);
            closeModal();
            
            if (onStartGame) {
                onStartGame(data.players, data.sessionCode, currentPlayerData.name);
            }
        });

        newSocket.on('error', (error) => {
            alert('❌ Erreur : ' + error.message);
            setIsConnecting(false);
        });

        newSocket.on('disconnect', () => {
            console.log('❌ Déconnecté du serveur');
            setSocket(null);
        });
    };

    // Simuler l'arrivée d'autres joueurs supprimée

    const closeModal = () => {
        // Déconnecter du serveur si connecté
        if (socket) {
            socket.disconnect();
            setSocket(null);
        }
        
        setShowModal(false);
        setSessionCode('');
        setPlayerName('');
        setGameMode('');
        setCurrentStep('choice');
        setIsConnecting(false);
        setPlayers([]);
    };

    const generateRandomCode = () => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        setSessionCode(code);
    };

    const startGame = () => {
        // Pas de minimum de joueurs requis - on peut jouer seul
        
        // Vérifier si c'est l'hôte
        const currentPlayer = players.find(p => p.name === playerName);
        console.log('Debug startGame - playerName:', playerName);
        console.log('Debug startGame - players:', players);
        console.log('Debug startGame - currentPlayer:', currentPlayer);
        
        if (!currentPlayer || !currentPlayer.isHost) {
            alert('⚠️ Seul l\'hôte peut démarrer la partie !');
            console.log('Debug: Non autorisé - currentPlayer:', currentPlayer);
            return;
        }
        
        // Démarrer la partie via Socket.IO
        if (socket) {
            socket.emit('startGame', {});
        }
    };

    return(
        <div>
            <h1 className="home_header">Hopital Escape</h1>
            <div className="home_container">
                <p className="home_intro">
                    Une épidémie fulgurante, inconnue et hautement contagieuse, ravage la population. 
                    En moins de 72 heures, les communications chutent, les villes se vident, et les systèmes médicaux s'effondrent.
                    Les rares laboratoires capables de fabriquer un antidote ont été contaminés… sauf un : l'Hôpital Saint-Vital, isolé mais encore fonctionnel.
                </p>
                <p className="home_intro">
                    Cet hôpital détient les ressources nécessaires à la fabrication d'un antidote, mais les protocoles d'urgence ont verrouillé l'accès aux ingrédients.
                    Selon les dernières données, 4 ou 5 composés essentiels sont encore disséminés dans différents services de l'hôpital. Ils portent chacun un nom de code et ne peuvent être trouvés qu'en résolvant des énigmes ou en collectant des indices laissés par le personnel avant l'évacuation.
                </p> 
                <button className="game-button" onClick={handleLaunchGame}>
                    LANCER LE JEU
                </button>
            </div>

            {/* Modal de session multijoueur */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={closeModal}>✕</button>
                        
                        <h2 className="modal-title">🏥 MULTIJOUEUR</h2>
                        
                        {/* Étape 1: Choix du mode */}
                        {currentStep === 'choice' && (
                            <div className="mode-choice">
                                <p className="modal-description">
                                    Jouez seul ou en équipe pour échapper à l'hôpital infecté !
                                </p>
                                <div className="choice-buttons">
                                    <button 
                                        className="choice-button create"
                                        onClick={handleChooseCreate}
                                    >
                                        🆕 COMMENCER UNE PARTIE
                                        <span className="choice-subtitle">Créer un nouveau lobby</span>
                                    </button>
                                    
                                    <button 
                                        className="choice-button join"
                                        onClick={handleChooseJoin}
                                    >
                                        🚪 REJOINDRE UNE PARTIE
                                        <span className="choice-subtitle">Entrer avec un code</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Étape 2a: Créer une partie */}
                        {currentStep === 'create' && (
                            <div className="create-session">
                                <h3>🆕 Nouvelle Partie</h3>
                                <div className="modal-section">
                                    <label className="modal-label">👤 Votre nom :</label>
                                    <input
                                        type="text"
                                        className="modal-input"
                                        value={playerName}
                                        onChange={(e) => setPlayerName(e.target.value)}
                                        placeholder="Entrez votre pseudo"
                                        maxLength={15}
                                    />
                                </div>
                                <button 
                                    className="modal-button create"
                                    onClick={handleCreateSession}
                                    disabled={!playerName.trim() || isConnecting}
                                >
                                    {isConnecting ? '⏳ Création...' : '� CRÉER LA PARTIE'}
                                </button>
                                <button 
                                    className="back-button"
                                    onClick={() => setCurrentStep('choice')}
                                >
                                    ← Retour
                                </button>
                            </div>
                        )}

                        {/* Étape 2b: Rejoindre une partie */}
                        {currentStep === 'join' && (
                            <div className="join-session">
                                <h3>🚪 Rejoindre une Partie</h3>
                                <div className="modal-section">
                                    <label className="modal-label">� Votre nom :</label>
                                    <input
                                        type="text"
                                        className="modal-input"
                                        value={playerName}
                                        onChange={(e) => setPlayerName(e.target.value)}
                                        placeholder="Entrez votre pseudo"
                                        maxLength={15}
                                    />
                                </div>
                                <div className="modal-section">
                                    <label className="modal-label">🔑 Code de la partie :</label>
                                    <input
                                        type="text"
                                        className="modal-input code-input"
                                        value={sessionCode}
                                        onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
                                        placeholder="Ex: ABC123"
                                        maxLength={6}
                                    />
                                </div>
                                <button 
                                    className="modal-button join"
                                    onClick={handleJoinSession}
                                    disabled={!playerName.trim() || !sessionCode.trim() || isConnecting}
                                >
                                    {isConnecting ? '⏳ Connexion...' : '🎯 REJOINDRE'}
                                </button>
                                <button 
                                    className="back-button"
                                    onClick={() => setCurrentStep('choice')}
                                >
                                    ← Retour
                                </button>
                            </div>
                        )}

                        {/* Étape 3: Lobby (partie créée ou rejointe) */}
                        {currentStep === 'lobby' && (
                            <div className="lobby">
                                <h3>
                                    {gameMode === 'create' ? '✅ Partie Créée !' : '✅ Partie Rejointe !'}
                                </h3>
                                
                                <div className="lobby-info">
                                    <div className="session-code-display">
                                        <span className="session-code">{sessionCode}</span>
                                        <button 
                                            className="copy-button"
                                            onClick={() => navigator.clipboard.writeText(sessionCode)}
                                        >
                                            📋 Copier
                                        </button>
                                    </div>
                                    
                                    {gameMode === 'create' && (
                                        <p className="lobby-text">
                                            Partagez ce code avec vos coéquipiers pour qu'ils rejoignent la partie !
                                        </p>
                                    )}
                                    
                                    {/* Compteur de joueurs */}
                                    <div className="player-count">
                                        <h4>� Joueurs connectés ({players.length}/{maxPlayers})</h4>
                                        {players.length >= 2 && players.length < maxPlayers && (
                                            <p className="status-ready">✅ Prêt à jouer !</p>
                                        )}
                                        {players.length < 2 && (
                                            <p className="status-waiting">⏳ En attente de joueurs ou prêt à jouer</p>
                                        )}
                                        {players.length === maxPlayers && (
                                            <p className="status-full">🔥 Lobby complet !</p>
                                        )}
                                    </div>

                                    {/* Liste des joueurs */}
                                    <div className="players-list">
                                        {players.map((player) => (
                                            <div key={player.id} className="player-item">
                                                <div className="player-info-line">
                                                    <span className="player-name">
                                                        {player.isHost && '👑 '}
                                                        {player.name}
                                                        {player.name === playerName && ' (vous)'}
                                                    </span>
                                                    <span className="player-joined">
                                                        {player.joinedAt}
                                                    </span>
                                                </div>
                                                <div className="player-status">
                                                    {player.isHost ? 'Hôte de la partie' : 'Survivant'}
                                                </div>
                                            </div>
                                        ))}
                                        
                                        {/* Slots vides */}
                                        {Array.from({ length: maxPlayers - players.length }, (_, index) => (
                                            <div key={`empty-${index}`} className="player-item empty">
                                                <div className="player-info-line">
                                                    <span className="player-name">🔒 En attente...</span>
                                                </div>
                                                <div className="player-status">Slot libre</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button 
                                    className="start-game-button"
                                    onClick={startGame}
                                >
                                    🎮 LANCER L'ESCAPE GAME (${players.length} joueur${players.length > 1 ? 's' : ''})
                                </button>
                                
                                <button 
                                    className="back-button"
                                    onClick={() => setCurrentStep('choice')}
                                >
                                    ← Nouvelle partie
                                </button>
                            </div>
                        )}

                        {/* Indicateur de chargement */}
                        {isConnecting && (
                            <div className="loading-overlay">
                                <div className="spinner"></div>
                                <p>
                                    {gameMode === 'create' ? 'Création de la partie...' : 'Connexion à la partie...'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home