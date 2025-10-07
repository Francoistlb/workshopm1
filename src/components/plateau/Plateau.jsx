import { useState, useEffect } from 'react'
import './Plateau.css'
import Accueil from '../zones/accueil/Accueil'
import Couloir from '../zones/couloir/Couloir'
import Pharmacie from '../zones/pharmacie/Pharmacie'

function Plateau({ players = [], sessionCode = '', currentPlayer = 'Joueur 1', onReturnHome }) {
  const [playerPosition, setPlayerPosition] = useState({ x: 250, y: 400 }) // Position initiale dans l'accueil
  const [currentRoom, setCurrentRoom] = useState('accueil') // accueil en premier, puis couloir, hospital-shop, etc.
  
  // Définition des portes et leurs positions dans le couloir vertical
  const doors = [
    { id: 'accueil', name: 'Hall d\'Accueil', x: 250, y: 420, emoji: '🏥' },
    { id: 'pharmacie', name: 'Pharmacie', x: 80, y: 60, emoji: '💊' },
    { id: 'orthopedics', name: 'Orthopedics', x: 420, y: 60, emoji: '🦴' },
    { id: 'pediatrics', name: 'Pediatrics', x: 80, y: 160, emoji: '👶' },
    { id: 'radiology', name: 'Radiology', x: 420, y: 160, emoji: '📡' },
    { id: 'reception', name: 'Outpatient Reception', x: 80, y: 260, emoji: '🏥' },
    { id: 'internal-medicine', name: 'Internal Medicine', x: 420, y: 260, emoji: '🦴' },
  ]

  // Données par défaut pour les tests
  const defaultPlayers = players.length > 0 ? players : [
    { id: 1, name: 'Vous', isHost: true },
    { id: 2, name: 'Dr. Smith', isHost: false },
    { id: 3, name: 'Nurse Kelly', isHost: false }
  ]

  // Vérification de proximité avec les portes
  const isPlayerNearDoor = (door, threshold = 50) => {
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - door.x, 2) + 
      Math.pow(playerPosition.y - door.y, 2)
    )
    return distance <= threshold
  }

  // Vérification des collisions selon la zone actuelle
  const checkCollision = (x, y, playerSize = 40) => {
    const playerRadius = playerSize / 2
    
    if (currentRoom === 'couloir') {
      // Murs gauche et droite du couloir (limites à 50px des bords)
      if (x - playerRadius < 50 || x + playerRadius > 450) {
        return true
      }
      return false
    } else if (currentRoom === 'accueil') {
      // Collisions pour la zone accueil - coordonnées EXACTES du CSS
      
      // Zone réception (left: 90px, top: 180px, width: 320px, height: 70px)
      if (x + playerRadius > 90 && x - playerRadius < 90 + 320 && 
          y + playerRadius > 180 && y - playerRadius < 180 + 70) {
        return true
      }
      
      // Zone couloir (left: 180px, top: 24px, width: 140px, height: 56px)
      if (x + playerRadius > 180 && x - playerRadius < 180 + 140 && 
          y + playerRadius > 24 && y - playerRadius < 24 + 56) {
        return true
      }
      
      // Banc gauche (left: 40px, top: 260px, width: 150px, height: 56px)
      if (x + playerRadius > 40 && x - playerRadius < 40 + 150 && 
          y + playerRadius > 260 && y - playerRadius < 260 + 56) {
        return true
      }
      
      // Banc droite (left: 310px, top: 260px, width: 150px, height: 56px)
      if (x + playerRadius > 310 && x - playerRadius < 310 + 150 && 
          y + playerRadius > 260 && y - playerRadius < 260 + 56) {
        return true
      }
      
      return false
    } else if (currentRoom === 'pharmacie') {
      // Collisions pour la zone pharmacie - coordonnées du CSS
      
      // Comptoir central (left: 180px, top: 200px, width: 140px, height: 80px)
      if (x + playerRadius > 180 && x - playerRadius < 180 + 140 && 
          y + playerRadius > 200 && y - playerRadius < 200 + 80) {
        return true
      }
      
      // Étagères gauche (left: 40px, top: 80px, width: 25px, height: 260px)
      if (x + playerRadius > 40 && x - playerRadius < 40 + 25 && 
          y + playerRadius > 80 && y - playerRadius < 80 + 260) {
        return true
      }
      
      // Étagères droite (left: 435px, top: 80px, width: 25px, height: 260px)
      if (x + playerRadius > 435 && x - playerRadius < 435 + 25 && 
          y + playerRadius > 80 && y - playerRadius < 80 + 260) {
        return true
      }
      
      // Réfrigérateur (left: 80px, top: 380px, width: 60px, height: 80px)
      if (x + playerRadius > 80 && x - playerRadius < 80 + 60 && 
          y + playerRadius > 380 && y - playerRadius < 380 + 80) {
        return true
      }
      
      return false
    }
    
    // Pas de collision par défaut
    return false
  }

  const handleDoorClick = (door) => {
    if (!isPlayerNearDoor(door)) {
      console.log(`Vous devez vous approcher de la porte ${door.name} !`)
      return
    }
    console.log(`Entrée dans ${door.name}`)
    handleEnterRoom(door.id)
  }

  const handleEnterRoom = (roomId) => {
    setCurrentRoom(roomId)
    // Repositionner le joueur selon la salle
    if (roomId === 'accueil') {
      setPlayerPosition({ x: 250, y: 400 })
    } else if (roomId === 'couloir') {
      setPlayerPosition({ x: 250, y: 450 })
    } else {
      setPlayerPosition({ x: 250, y: 250 }) // Position par défaut pour les autres salles
    }
  }

  const handleReturnToAccueil = () => {
    setCurrentRoom('accueil')
    setPlayerPosition({ x: 250, y: 400 })
  }

  const returnToAccueil = () => {
    setCurrentRoom('accueil')
    setPlayerPosition({ x: 250, y: 400 }) // Retour au centre de l'accueil
  }

  // Handle keyboard input for player movement
  useEffect(() => {
    const handleKeyPress = (event) => {
      const moveSpeed = 20
      const gameAreaBounds = { width: 500, height: 500 }
      const playerSize = 40
      
      setPlayerPosition(prev => {
        let newX = prev.x
        let newY = prev.y
        
        switch (event.key.toLowerCase()) {
          case 'w':
          case 'arrowup':
            newY = Math.max(playerSize / 2, prev.y - moveSpeed)
            break
          case 's':
          case 'arrowdown':
            newY = Math.min(gameAreaBounds.height - playerSize / 2, prev.y + moveSpeed)
            break
          case 'a':
          case 'arrowleft':
            newX = Math.max(playerSize / 2, prev.x - moveSpeed)
            break
          case 'd':
          case 'arrowright':
            newX = Math.min(gameAreaBounds.width - playerSize / 2, prev.x + moveSpeed)
            break
          default:
            return prev
        }
        
        // Vérifier les collisions selon la zone actuelle (logique inline)
        const playerRadius = playerSize / 2
        let hasCollision = false
        
        if (currentRoom === 'accueil') {
          console.log(`Vérification collision accueil à (${newX}, ${newY})`)
          
          // Zone réception (left: 90px, top: 180px, width: 320px, height: 70px)
          if (newX + playerRadius > 90 && newX - playerRadius < 410 && 
              newY + playerRadius > 180 && newY - playerRadius < 250) {
            hasCollision = true
            console.log('Collision avec la réception')
          }
          
          // Zone couloir (left: 180px, top: 24px, width: 140px, height: 56px)
          if (newX + playerRadius > 180 && newX - playerRadius < 320 && 
              newY + playerRadius > 24 && newY - playerRadius < 80) {
            hasCollision = true
            console.log('Collision avec l\'entrée couloir')
          }
          
          // Banc gauche (left: 40px, top: 260px, width: 150px, height: 56px)
          if (newX + playerRadius > 40 && newX - playerRadius < 190 && 
              newY + playerRadius > 260 && newY - playerRadius < 316) {
            hasCollision = true
            console.log('Collision avec le banc gauche')
          }
          
          // Banc droite (left: 310px, top: 260px, width: 150px, height: 56px)
          if (newX + playerRadius > 310 && newX - playerRadius < 460 && 
              newY + playerRadius > 260 && newY - playerRadius < 316) {
            hasCollision = true
            console.log('Collision avec le banc droite')
          }
        } else if (currentRoom === 'couloir') {
          // Murs gauche et droite du couloir
          if (newX - playerRadius < 50 || newX + playerRadius > 450) {
            hasCollision = true
            console.log('Collision avec les murs du couloir')
          }
        } else if (currentRoom === 'pharmacie') {
          console.log(`Vérification collision pharmacie à (${newX}, ${newY})`)
          
          // Comptoir central (left: 180px, top: 200px, width: 140px, height: 80px)
          if (newX + playerRadius > 180 && newX - playerRadius < 320 && 
              newY + playerRadius > 200 && newY - playerRadius < 280) {
            hasCollision = true
            console.log('Collision avec le comptoir')
          }
          
          // Étagères gauche (left: 40px, top: 80px, width: 25px, height: 260px)
          if (newX + playerRadius > 40 && newX - playerRadius < 65 && 
              newY + playerRadius > 80 && newY - playerRadius < 340) {
            hasCollision = true
            console.log('Collision avec les étagères gauche')
          }
          
          // Étagères droite (left: 435px, top: 80px, width: 25px, height: 260px)
          if (newX + playerRadius > 435 && newX - playerRadius < 460 && 
              newY + playerRadius > 80 && newY - playerRadius < 340) {
            hasCollision = true
            console.log('Collision avec les étagères droite')
          }
          
          // Réfrigérateur (left: 80px, top: 380px, width: 60px, height: 80px)
          if (newX + playerRadius > 80 && newX - playerRadius < 140 && 
              newY + playerRadius > 380 && newY - playerRadius < 460) {
            hasCollision = true
            console.log('Collision avec le réfrigérateur')
          }
        }
        
        if (hasCollision) {
          console.log(`Collision détectée à (${newX}, ${newY}) dans la zone ${currentRoom}`)
          return prev // Pas de mouvement si collision
        }
        
        return { x: newX, y: newY }
      })
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentRoom])

  // Fonction pour rendre la zone courante
  const renderCurrentZone = () => {
    if (currentRoom === 'accueil') {
      return (
        <Accueil 
          playerPosition={playerPosition}
          setPlayerPosition={setPlayerPosition}
          onGoToCorridor={() => setCurrentRoom('couloir')}
        />
      )
    } else if (currentRoom === 'couloir') {
      return (
        <Couloir 
          playerPosition={playerPosition}
          onEnterRoom={(roomId) => {
            setCurrentRoom(roomId)
            if (roomId === 'accueil') setPlayerPosition({ x: 250, y: 400 })
            else if (roomId === 'pharmacie') setPlayerPosition({ x: 250, y: 400 })
          }}
        />
      )
    } else if (currentRoom === 'pharmacie') {
      return (
        <Pharmacie 
          playerPosition={playerPosition}
          setPlayerPosition={setPlayerPosition}
          onReturnToAccueil={() => {
            setCurrentRoom('couloir')
            setPlayerPosition({ x: 250, y: 300 })
          }}
        />
      )
    } else {
      // Vue par défaut pour les autres salles
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>🚧 {currentRoom}</h2>
          <p>Cette salle n'est pas encore implémentée</p>
          <button onClick={() => setCurrentRoom('accueil')}>← Retour à l'accueil</button>
        </div>
      )
    }
  }

  return (
    <div className="plateau-container">
      {/* Sidebar Gauche - Carte et Stats */}
      <div className="sidebar-left">
        {/* Section Joueurs */}
        <div className="interface-section">
          <h3>👥 Équipe ({defaultPlayers.length}/4)</h3>
          {sessionCode && (
            <div className="session-info">
              <span className="session-code-small">🔑 {sessionCode}</span>
            </div>
          )}
          <div className="players-sidebar">
            {defaultPlayers.map((player) => (
              <div key={player.id} className="player-sidebar-item">
                <span className="player-sidebar-name">
                  {player.isHost && ' '}
                  {player.name}
                </span>
                <span className="player-sidebar-status">
                  {player.name === currentPlayer ? '🟢' : '🟡'}
                </span>
              </div>
            ))}
            {/* Slots vides */}
            {Array.from({ length: 4 - defaultPlayers.length }, (_, index) => (
              <div key={`empty-${index}`} className="player-sidebar-item empty">
                <span className="player-sidebar-name">🔒 Slot libre</span>
                <span className="player-sidebar-status">⚫</span>
              </div>
            ))}
          </div>
        </div>

        <div className="interface-section">
          <h3> 🗺️ Carte de l'Hôpital</h3>
          <div className="hospital-map">
            <img
              src={new URL('../../assets/hospital_floorplan_topdown.svg', import.meta.url).href}
              alt="Minimap - Plan de l'hôpital"
              style={{ width: '100%', borderRadius: 8, border: '1px solid #dee2e6' }}
            />
          </div>
        </div>
        
        <div className="interface-section">
          <h3>📊 Progression</h3>
          <div className="game-stats">
            <div className="stat-item">
              <span className="stat-label">👥 Joueurs:</span>
              <span className="stat-value">{defaultPlayers.length}/4</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">🧩 Énigmes résolues:</span>
              <span className="stat-value">0/4</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">⏱️ Temps:</span>
              <span className="stat-value">00:45</span>
            </div>
          </div>
        </div>
      </div>

      {/* Zone de Jeu Centrale */}
      <div className="game-area">
        <div className="game-grid">
          <div className="game-header">
            <h2 className="room-title">
              {currentRoom === 'couloir' ? '🚪 COULOIR PRINCIPAL' :
               currentRoom === 'accueil' ? '🏥 HALL D\'ACCUEIL' :
               `🏥 ${currentRoom.toUpperCase()}`}
            </h2>
            {onReturnHome && (
              <button className="return-home-button" onClick={onReturnHome}>
                ← Menu Principal
              </button>
            )}
          </div>
          <p className="room-subtitle">
            {currentRoom === 'couloir' ? 'Naviguez dans le couloir et approchez-vous des portes pour entrer dans les salles' :
             currentRoom === 'accueil' ? 'Hall principal de l\'hôpital - Explorez et interagissez avec les éléments' :
             'Explorez cette zone et trouvez les indices'}
          </p>
          <div className="room-container">
            <div className="game-world">
              {renderCurrentZone()}
              
              {/* Joueur - affiché par-dessus toutes les zones */}
              <div 
                className="player" 
                style={{ 
                  position: 'absolute',
                  left: `${playerPosition.x - 20}px`, 
                  top: `${playerPosition.y - 20}px`,
                  zIndex: 100
                }}
              >
                🧑‍⚕️
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Droite - Informations */}
      <div className="sidebar-right">
        <div className="interface-section">
          <h3>🗺️ Mini-carte</h3>
          <div className="minimap">
            <div className="minimap-room current-room">Accueil</div>
            <div className="minimap-room">Labo</div>
            <div className="minimap-room">Pharmacie</div>
            <div className="minimap-room">Urgences</div>
          </div>
        </div>
        
        <div className="interface-section">
          <h3>🎯 Objectifs</h3>
          <div className="objectives">
            <div className="objective">✅ Rétablir l'électricité</div>
            <div className="objective">🔒 Trouver la clé du laboratoire</div>
            <div className="objective">🔒 Trouver la clé de la pharmacie</div>
            <div className="objective">🔒 Trouver la clé de la salle d'opération</div>
            <div className="objective">🔒 Reconstituer l'antidote</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plateau