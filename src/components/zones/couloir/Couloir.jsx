import { useState } from 'react'
import './Couloir.css'

function Couloir({ playerPosition, onEnterRoom }) {
  const [lockedMessage, setLockedMessage] = useState(null)

  // Définition des portes et leurs positions dans le couloir vertical
  const doors = [
    { id: 'accueil', name: 'Hall d\'Accueil', x: 250, y: 420, emoji: '🏥' },
    { id: 'pharmacie', name: 'Pharmacie', x: 80, y: 60, emoji: '💊' },
    { id: 'morgue', name: 'Morgue', x: 420, y: 60, emoji: '⚰️' }, 
    { id: 'stockage', name: 'Stockage', x: 250, y: 30, emoji: '📦' }, // Nouvelle porte en haut
    { id: 'pediatrics', name: 'Pediatrie', x: 80, y: 160, emoji: '👶', locked: true },
    { id: 'radiology', name: 'Radiologie', x: 420, y: 160, emoji: '📡', locked: true },
    { id: 'reception', name: 'Consultation', x: 80, y: 260, emoji: '🏥' },
    { id: 'operation', name: 'Opération', x: 420, y: 260, emoji: '⚕️' },
  ]

  // Vérification de proximité avec les portes
  const isPlayerNearDoor = (door, threshold = 50) => {
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - door.x, 2) + 
      Math.pow(playerPosition.y - door.y, 2)
    )
    return distance <= threshold
  }

  const handleDoorClick = (door) => {
    // Vérifier si la porte est verrouillée
    if (door.locked) {
      setLockedMessage({
        text: '🔒 La porte est verrouillée',
        x: door.x,
        y: door.y - 80
      })
      // Faire disparaître le message après 2 secondes
      setTimeout(() => setLockedMessage(null), 2000)
      return
    }

    if (!isPlayerNearDoor(door)) {
      console.log(`Vous devez vous approcher de la porte ${door.name} !`)
      return
    }
    console.log(`Entrée dans ${door.name}`)
    onEnterRoom(door.id)
  }

  return (
    <div className="couloir-zone">
      {/* Fond du couloir */}
      <div className="couloir-background">
        <div className="corridor-floor"></div>
      </div>

      {/* Portes du couloir */}
      {doors.map(door => (
        <div 
          key={door.id}
          className={`door ${isPlayerNearDoor(door) ? 'interactive' : 'non-interactive'} ${door.locked ? 'locked' : ''}`}
          style={{ 
            left: door.x < 200 ? `${door.x - 70}px` : door.x > 300 ? `${door.x - 10}px` : `${door.x - 40}px`,
            top: `${door.y - 50}px` 
          }}
          onClick={() => handleDoorClick(door)}
          title={door.locked ? 'Porte verrouillée' : 
                 isPlayerNearDoor(door) ? `Entrer dans ${door.name}` : `Approchez-vous pour entrer dans ${door.name}`}
        >
          <div className="door-frame">
            <div className="door-emoji">{door.emoji}</div>
            <div className="door-label">{door.name}</div>
            {door.locked && <div className="door-lock">🔒</div>}
          </div>
        </div>
      ))}

      {/* Message de porte verrouillée */}
      {lockedMessage && (
        <div 
          className="locked-message"
          style={{
            position: 'absolute',
            left: `${lockedMessage.x - 60}px`,
            top: `${lockedMessage.y}px`,
            background: '#ff6b6b',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            animation: 'fadeInOut 2s ease-in-out',
            zIndex: 1000
          }}
        >
          {lockedMessage.text}
        </div>
      )}

      {/* Murs du couloir */}
      <div className="corridor-wall-left"></div>
      <div className="corridor-wall-right"></div>
      
      {/* Éléments décoratifs du couloir */}
      <div className="corridor-decorations">
        <div className="floor-tiles"></div>
        <div className="ceiling-lights"></div>
      </div>
    </div>
  )
}

export default Couloir