import { useState, useEffect } from 'react'
import './Plateau.css'

function Plateau() {
  const [playerPosition, setPlayerPosition] = useState({ x: 250, y: 480 })
  const [showTerminal, setShowTerminal] = useState(false)
  const [showWhiteboard, setShowWhiteboard] = useState(false)
  const [showFolder1, setShowFolder1] = useState(false)
  const [showFolder2, setShowFolder2] = useState(false)
  const [showFolder3, setShowFolder3] = useState(false)
  const [showFolder4, setShowFolder4] = useState(false)

  // Vérification de proximité
  const isPlayerNear = (elementX, elementY, threshold = 60) => {
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - elementX, 2) + 
      Math.pow(playerPosition.y - elementY, 2)
    )
    return distance <= threshold
  }

  // Vérification des collisions avec les éléments fixes
  const checkCollision = (x, y, playerSize = 40) => {
    const playerRadius = playerSize / 2
    
    // Zone réception centrale (rectangle)
    if (x + playerRadius > 90 && x - playerRadius < 410 && 
        y + playerRadius > 180 && y - playerRadius < 250) {
      return true
    }
    
    // Zone couloir du haut (rectangle)
    if (x + playerRadius > 180 && x - playerRadius < 320 && 
        y + playerRadius > 24 && y - playerRadius < 80) {
      return true
    }
    
    // Bancs gauche
    if (x + playerRadius > 40 && x - playerRadius < 190 && 
        y + playerRadius > 260 && y - playerRadius < 316) {
      return true
    }
    
    // Bancs droite
    if (x + playerRadius > 310 && x - playerRadius < 460 && 
        y + playerRadius > 260 && y - playerRadius < 316) {
      return true
    }
    
    return false
  }

  const handleTerminalClick = () => {
    if (!isPlayerNear(212.5, 69)) {
      console.log('Vous devez vous approcher du terminal !')
      return
    }
    console.log('Terminal activé !')
    setShowTerminal(!showTerminal)
    // Ici on ajoutera plus tard l'interface de saisie de code
  }

  const handleWhiteboardClick = () => {
    if (!isPlayerNear(252.5, 227.5)) {
      console.log('Vous devez vous approcher du tableau !')
      return
    }
    console.log('Tableau blanc activé !')
    setShowWhiteboard(!showWhiteboard)
    // Ici on ajoutera plus tard l'interface du tableau
  }

  const handleFolder1Click = () => {
    if (!isPlayerNear(85, 242.5)) {
      console.log('Vous devez vous approcher du dossier !')
      return
    }
    console.log('Dossier 1 activé !')
    setShowFolder1(!showFolder1)
    // Énigme dossier principal
  }

  const handleFolder2Click = () => {
    if (!isPlayerNear(415, 242.5)) {
      console.log('Vous devez vous approcher du dossier !')
      return
    }
    console.log('Dossier 2 activé !')
    setShowFolder2(!showFolder2)
    // Énigme dossier (1)
  }

  const handleFolder3Click = () => {
    if (!isPlayerNear(315, 167.5)) {
      console.log('Vous devez vous approcher du dossier !')
      return
    }
    console.log('Dossier 3 activé !')
    setShowFolder3(!showFolder3)
    // Énigme dossier (2)
  }

  const handleFolder4Click = () => {
    if (!isPlayerNear(175, 167.5)) {
      console.log('Vous devez vous approcher du dossier !')
      return
    }
    console.log('Dossier 4 activé !')
    setShowFolder4(!showFolder4)
    // Énigme dossier (3)
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
        
        // Vérifier les collisions avant de bouger
        if (checkCollision(newX, newY, playerSize)) {
          return prev // Pas de mouvement si collision
        }
        
        return { x: newX, y: newY }
      })
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div className="plateau-container">
      {/* Sidebar Gauche - Carte et Stats */}
      <div className="sidebar-left">
        <div className="interface-section">
          <h3>🗺️ Carte de l'Hôpital</h3>
          <div className="hospital-map">
            <img
              src={new URL('../../assets/hospital_floorplan_topdown.svg', import.meta.url).href}
              alt="Minimap - Plan de l'hôpital"
              style={{ width: '100%', borderRadius: 8, border: '1px solid #dee2e6' }}
            />
            {/* Légende des marqueurs */}
            <div style={{ display: 'flex', gap: 8, marginTop: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 14, height: 14, background: '#ff8a00', border: '1px solid #c86100', borderRadius: 2, display: 'inline-block' }} />
                <span style={{ fontSize: 11, color: '#495057' }}>Objets</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 12, background: '#ffffff', border: '1px solid #cfd9e6', borderRadius: 2, display: 'inline-block' }} />
                <span style={{ fontSize: 11, color: '#495057' }}>Petits objets</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 14, height: 14, background: '#3ecf5b', border: '1px solid #1d8f3a', borderRadius: 2, display: 'inline-block' }} />
                <span style={{ fontSize: 11, color: '#495057' }}>Plantes</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="interface-section">
          <h3> Progression</h3>
          <div className="game-stats">
            <div className="stat-item">
              <span className="stat-label">👥 Joueurs:</span>
              <span className="stat-value">1/4</span>
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
          <h2 className="room-title">🏥 ESCAPE TECH</h2>
          <p className="room-subtitle">Hall principal de l'hôpital - Explorez et interagissez avec les éléments</p>
          <div className="room-container">
            {/* Ici sera la grille de jeu 2D */}
            <div className="game-world">
              {/* Calculator Terminal sur la réception */}
              <div 
                className={`terminal-calculator ${isPlayerNear(212.5, 69) ? 'interactive' : 'non-interactive'}`}
                onClick={handleTerminalClick}
                title={isPlayerNear(212.5, 69) ? "Terminal de saisie - Cliquez pour interagir" : "Approchez-vous pour interagir"}
              >
                <img 
                  src={new URL('./assets/terminal.png', import.meta.url).href}
                  alt="Terminal de code"
                  draggable={false}
                />
              </div>
              
              {/* Tableau blanc sur la réception */}
              <div 
                className={`whiteboard-tablet ${isPlayerNear(252.5, 227.5) ? 'interactive' : 'non-interactive'}`}
                onClick={handleWhiteboardClick}
                title={isPlayerNear(252.5, 227.5) ? "Tableau blanc - Cliquez pour interagir" : "Approchez-vous pour interagir"}
              >
                <img 
                  src={new URL('./assets/tableaublanc.png', import.meta.url).href}
                  alt="Tableau blanc"
                  draggable={false}
                />
              </div>
              
              {/* Dossier 1 (principal) */}
              <div 
                className={`folder-1 ${isPlayerNear(85, 242.5) ? 'interactive' : 'non-interactive'}`}
                onClick={handleFolder1Click}
                title={isPlayerNear(85, 242.5) ? "Dossier principal - Cliquez pour consulter" : "Approchez-vous pour consulter"}
              >
                <img 
                  src={new URL('./assets/dossier1.png', import.meta.url).href}
                  alt="Dossier principal"
                  draggable={false}
                />
              </div>
              
              {/* Dossier 2 */}
              <div 
                className={`folder-2 ${isPlayerNear(415, 242.5) ? 'interactive' : 'non-interactive'}`}
                onClick={handleFolder2Click}
                title={isPlayerNear(415, 242.5) ? "Dossier 1 - Cliquez pour consulter" : "Approchez-vous pour consulter"}
              >
                <img 
                  src={new URL('./assets/dossier2.png', import.meta.url).href}
                  alt="Dossier 1"
                  draggable={false}
                />
              </div>
              
              {/* Dossier 3 */}
              <div 
                className={`folder-3 ${isPlayerNear(315, 167.5) ? 'interactive' : 'non-interactive'}`}
                onClick={handleFolder3Click}
                title={isPlayerNear(315, 167.5) ? "Dossier 2 - Cliquez pour consulter" : "Approchez-vous pour consulter"}
              >
                <img 
                  src={new URL('./assets/dossier3.png', import.meta.url).href}
                  alt="Dossier 2"
                  draggable={false}
                />
              </div>
              
              {/* Dossier 4 */}
              <div 
                className={`folder-4 ${isPlayerNear(175, 167.5) ? 'interactive' : 'non-interactive'}`}
                onClick={handleFolder4Click}
                title={isPlayerNear(175, 167.5) ? "Dossier 3 - Cliquez pour consulter" : "Approchez-vous pour consulter"}
              >
                <img 
                  src={new URL('./assets/dossier4.png', import.meta.url).href}
                  alt="Dossier 3"
                  draggable={false}
                />
              </div>
              
              {/* Zones de collision invisibles (pour debug) */}
              <div className="collision-reception"></div>
              <div className="collision-corridor"></div>
              <div className="collision-bench-left"></div>
              <div className="collision-bench-right"></div>
              
              {/* Éléments décoratifs */}
              {/* Fissures */}
              <div className="decore-crack1">
                <img src={new URL('./assets/decorecrack1.png', import.meta.url).href} alt="Fissure 1" draggable={false} />
              </div>
              <div className="decore-crack2">
                <img src={new URL('./assets/decorecrack2.png', import.meta.url).href} alt="Fissure 2" draggable={false} />
              </div>
              
              {/* Documents (avec curseur pointer) */}
              <div className="decore-doc1">
                <img src={new URL('./assets/decoredoc1.png', import.meta.url).href} alt="Document 1" draggable={false} />
              </div>
              <div className="decore-doc2">
                <img src={new URL('./assets/decoredoc2.png', import.meta.url).href} alt="Document 2" draggable={false} />
              </div>
              <div className="decore-doc3">
                <img src={new URL('./assets/decoredoc3.png', import.meta.url).href} alt="Document 3" draggable={false} />
              </div>
              
              {/* Papiers */}
              <div className="decore-papier1">
                <img src={new URL('./assets/decorepapier1.png', import.meta.url).href} alt="Papier 1" draggable={false} />
              </div>
              <div className="decore-papier2">
                <img src={new URL('./assets/decorepapier2.png', import.meta.url).href} alt="Papier 2" draggable={false} />
              </div>
              
              {/* Plantes */}
              <div className="decore-plante1">
                <img src={new URL('./assets/decoreplante1.png', import.meta.url).href} alt="Plante 1" draggable={false} />
              </div>
              <div className="decore-plante2">
                <img src={new URL('./assets/decoreplante2.png', import.meta.url).href} alt="Plante 2" draggable={false} />
              </div>
              <div className="decore-plante3">
                <img src={new URL('./assets/decoreplante2.png', import.meta.url).href} alt="Plante 3" draggable={false} />
              </div>
              
              {/* Sang */}
              <div className="decore-sang1">
                <img src={new URL('./assets/decoresang1.png', import.meta.url).href} alt="Tache de sang" draggable={false} />
              </div>
                <div className="decore-sang2">
                <img src={new URL('./assets/decoresang1.png', import.meta.url).href} alt="Tache de sang" draggable={false} />
              </div>
              
              {/* Player */}
              <div 
                className="player" 
                style={{ 
                  left: `${playerPosition.x - 20}px`, 
                  top: `${playerPosition.y - 20}px` 
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