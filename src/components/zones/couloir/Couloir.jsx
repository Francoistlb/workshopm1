import { useState } from 'react'
import './Couloir.css'

function Couloir({ playerPosition, onEnterRoom }) {
  // Définition des portes et leurs positions dans le couloir vertical
  const doors = [
    { id: 'accueil', name: 'Hall d\'Accueil', x: 250, y: 420, emoji: '🏥' },
    { id: 'pharmacie', name: 'Pharmacie', x: 80, y: 60, emoji: '💊' },
    { id: 'orthopedics', name: 'Orthopedics', x: 420, y: 60, emoji: '🦴' },
    { id: 'pediatrics', name: 'Pediatrics', x: 80, y: 160, emoji: '👶' },
    { id: 'radiology', name: 'Radiology', x: 420, y: 160, emoji: '📡' },
    { id: 'reception', name: 'Outpatient Reception', x: 80, y: 260, emoji: '🏥' },
    { id: 'internal-medicine', name: 'Internal Medicine', x: 420, y: 260, emoji: '🦴' }
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
          className={`door ${isPlayerNearDoor(door) ? 'interactive' : 'non-interactive'}`}
          style={{ 
            left: door.x < 200 ? `${door.x - 70}px` : door.x > 300 ? `${door.x - 10}px` : `${door.x - 40}px`,
            top: `${door.y - 50}px` 
          }}
          onClick={() => handleDoorClick(door)}
          title={isPlayerNearDoor(door) ? `Entrer dans ${door.name}` : `Approchez-vous pour entrer dans ${door.name}`}
        >
          <div className="door-frame">
            <div className="door-emoji">{door.emoji}</div>
            <div className="door-label">{door.name}</div>
          </div>
        </div>
      ))}

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