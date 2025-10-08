import { useState, useEffect } from 'react'
import './Plateau.css'
import Couloir from '../zones/couloir/Couloir'
import Accueil from '../zones/accueil/Accueil'
import Operation from '../zones/operation/Operation'
import Pharmacie from '../zones/pharmacie/Pharmacie'
import Consultation from '../zones/consultation/Consultation'
import Morgue from '../zones/morgue/Morgue'
import Stockage from '../zones/stockage/Stockage' // Ajouter l'import

function Plateau({ players = [], sessionCode = '', currentPlayer = 'Joueur 1', onReturnHome }) {
  const [playerPosition, setPlayerPosition] = useState({ x: 250, y: 400 })
  const [currentRoom, setCurrentRoom] = useState('accueil')

  // Définition des portes et leurs positions dans le couloir vertical
  const doors = [
    { id: 'accueil', name: 'Hall d\'Accueil', x: 250, y: 420, emoji: '🏥' },
    { id: 'pharmacie', name: 'Pharmacie', x: 80, y: 60, emoji: '💊' },
    { id: 'morgue', name: 'Morgue', x: 420, y: 60, emoji: '⚰️' },
    { id: 'radiology', name: 'Radiology', x: 420, y: 160, emoji: '📡' },
    { id: 'reception', name: 'Consultation', x: 80, y: 260, emoji: '🏥' },
    { id: 'operation', name: 'Opération', x: 420, y: 260, emoji: '⚕️' },
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
    } else if (currentRoom === 'stockage') {
      // Collisions pour la zone stockage selon le SVG
      
      // Étagères gauches (x="40" y="60" width="120" height="220")
      if (x + playerRadius > 40 && x - playerRadius < 160 && 
          y + playerRadius > 60 && y - playerRadius < 280) {
        return true
      }
      
      // Étagères droites (x="340" y="60" width="120" height="220")
      if (x + playerRadius > 340 && x - playerRadius < 460 && 
          y + playerRadius > 60 && y - playerRadius < 280) {
        return true
      }
      
      // Étagères centrales (x="200" y="80" width="100" height="30")
      if (x + playerRadius > 200 && x - playerRadius < 300 && 
          y + playerRadius > 80 && y - playerRadius < 110) {
        return true
      }
      
      // Étagères centrales 2 (x="200" y="130" width="100" height="30")
      if (x + playerRadius > 200 && x - playerRadius < 300 && 
          y + playerRadius > 130 && y - playerRadius < 160) {
        return true
      }
      
      // Table de préparation (x="180" y="200" width="140" height="60")
      if (x + playerRadius > 180 && x - playerRadius < 320 && 
          y + playerRadius > 200 && y - playerRadius < 260) {
        return true
      }
      
      // Coffre-fort médical (x="200" y="320" width="100" height="80")
      if (x + playerRadius > 200 && x - playerRadius < 300 && 
          y + playerRadius > 320 && y - playerRadius < 400) {
        return true
      }
      
      // Murs
      if (x - playerRadius < 20 || x + playerRadius > 480 || 
          y - playerRadius < 20 || y + playerRadius > 480) {
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
      
      // Étagères droite (left: 435px, top: 80px, width: 25, height: 260px)
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
    } else if (currentRoom === 'operation') {
      // Collisions pour la zone operation selon le SVG réel
      
      // Table d'opération centrale (x="210" y="200" width="80" height="150")
      if (x + playerRadius > 210 && x - playerRadius < 290 && 
          y + playerRadius > 200 && y - playerRadius < 350) {
        return true
      }
      
      // Chariot d'anesthésie (x="120" y="200" width="50" height="70")
      if (x + playerRadius > 120 && x - playerRadius < 170 && 
          y + playerRadius > 200 && y - playerRadius < 270) {
        return true
      }
      
      // Aspirateur chirurgical (x="80" y="320" width="35" height="50")
      if (x + playerRadius > 80 && x - playerRadius < 115 && 
          y + playerRadius > 320 && y - playerRadius < 370) {
        return true
      }
      
      // Monitoring patient (x="320" y="180" width="60" height="40")
      if (x + playerRadius > 320 && x - playerRadius < 380 && 
          y + playerRadius > 180 && y - playerRadius < 220) {
        return true
      }
      
      // Électro-bistouri (x="300" y="280" width="40" height="30")
      if (x + playerRadius > 300 && x - playerRadius < 340 && 
          y + playerRadius > 280 && y - playerRadius < 310) {
        return true
      }
      
      // Défibrillateur (x="400" y="350" width="50" height="40")
      if (x + playerRadius > 400 && x - playerRadius < 450 && 
          y + playerRadius > 350 && y - playerRadius < 390) {
        return true
      }
      
      // Lavabos chirurgicaux (x="30" y="100" width="60" height="30")
      if (x + playerRadius > 30 && x - playerRadius < 90 && 
          y + playerRadius > 100 && y - playerRadius < 130) {
        return true
      }
      
      // Distributeur de gants (x="420" y="80" width="30" height="40")
      if (x + playerRadius > 420 && x - playerRadius < 450 && 
          y + playerRadius > 80 && y - playerRadius < 120) {
        return true
      }
      
      // Poubelle déchets médicaux (x="450" y="400" width="25" height="30")
      if (x + playerRadius > 450 && x - playerRadius < 475 && 
          y + playerRadius > 400 && y - playerRadius < 430) {
        return true
      }
      
      // Écran mural (x="20" y="30" width="80" height="50")
      if (x + playerRadius > 20 && x - playerRadius < 100 && 
          y + playerRadius > 30 && y - playerRadius < 80) {
        return true
      }
      
      return false
    } else if (currentRoom === 'reception') {
      // Collisions pour la zone consultation selon le SVG réel
      
      // Bureau du médecin (x="180" y="150" width="140" height="80")
      if (x + playerRadius > 180 && x - playerRadius < 320 && 
          y + playerRadius > 150 && y - playerRadius < 230) {
        return true
      }
      
      // Chaise du médecin (x="200" y="240" width="40" height="15" + pieds)
      if (x + playerRadius > 200 && x - playerRadius < 240 && 
          y + playerRadius > 240 && y - playerRadius < 285) {
        return true
      }
      
      // Chaise patient (x="260" y="80" width="40" height="15" + dossier)
      if (x + playerRadius > 260 && x - playerRadius < 300 && 
          y + playerRadius > 50 && y - playerRadius < 95) {
        return true
      }
      
      // Armoire médicale (x="30" y="100" width="60" height="120")
      if (x + playerRadius > 30 && x - playerRadius < 90 && 
          y + playerRadius > 100 && y - playerRadius < 220) {
        return true
      }
      
      // Table d'examen (x="350" y="200" width="100" height="60" + pieds)
      if (x + playerRadius > 350 && x - playerRadius < 450 && 
          y + playerRadius > 200 && y - playerRadius < 280) {
        return true
      }
      
      // Balance médicale (x="400" y="350" width="40" height="15")
      if (x + playerRadius > 400 && x - playerRadius < 440 && 
          y + playerRadius > 340 && y - playerRadius < 368) {
        return true
      }
      
      // Lavabo (x="450" y="80" width="30" height="20")
      if (x + playerRadius > 450 && x - playerRadius < 480 && 
          y + playerRadius > 75 && y - playerRadius < 100) {
        return true
      }
      
      // Distributeur de gants (x="420" y="120" width="25" height="30")
      if (x + playerRadius > 420 && x - playerRadius < 445 && 
          y + playerRadius > 120 && y - playerRadius < 150) {
        return true
      }
      
      // Tensiomètre (x="100" y="280" width="40" height="30")
      if (x + playerRadius > 100 && x - playerRadius < 140 && 
          y + playerRadius > 280 && y - playerRadius < 318) {
        return true
      }
      
      // Murs
      if (x - playerRadius < 20 || x + playerRadius > 480 || 
          y - playerRadius < 20 || y + playerRadius > 480) {
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
          
          // Étagères droite (left: 435px, top: 80px, width: 25, height: 260px)
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
        } else if (currentRoom === 'operation') {
          console.log(`Vérification collision operation à (${newX}, ${newY})`)
          
          // Table d'opération centrale
          if (newX + playerRadius > 210 && newX - playerRadius < 290 && 
              newY + playerRadius > 200 && newY - playerRadius < 350) {
            hasCollision = true
            console.log('Collision avec la table d\'opération')
          }
          
          // Chariot d'anesthésie
          if (newX + playerRadius > 120 && newX - playerRadius < 170 && 
              newY + playerRadius > 200 && newY - playerRadius < 270) {
            hasCollision = true
            console.log('Collision avec le chariot d\'anesthésie')
          }
          
          // Aspirateur chirurgical
          if (newX + playerRadius > 80 && newX - playerRadius < 115 && 
              newY + playerRadius > 320 && newY - playerRadius < 370) {
            hasCollision = true
            console.log('Collision avec l\'aspirateur chirurgical')
          }
          
          // Monitoring patient
          if (newX + playerRadius > 320 && newX - playerRadius < 380 && 
              newY + playerRadius > 180 && newY - playerRadius < 220) {
            hasCollision = true
            console.log('Collision avec le monitoring patient')
          }
          
          // Électro-bistouri
          if (newX + playerRadius > 300 && newX - playerRadius < 340 && 
              newY + playerRadius > 280 && newY - playerRadius < 310) {
            hasCollision = true
            console.log('Collision avec l\'électro-bistouri')
          }
          
          // Défibrillateur
          if (newX + playerRadius > 400 && newX - playerRadius < 450 && 
              newY + playerRadius > 350 && newY - playerRadius < 390) {
            hasCollision = true
            console.log('Collision avec le défibrillateur')
          }
          
          // Lavabos chirurgicaux
          if (newX + playerRadius > 30 && newX - playerRadius < 90 && 
              newY + playerRadius > 100 && newY - playerRadius < 130) {
            hasCollision = true
            console.log('Collision avec les lavabos chirurgicaux')
          }
          
          // Distributeur de gants
          if (newX + playerRadius > 420 && newX - playerRadius < 450 && 
              newY + playerRadius > 80 && newY - playerRadius < 120) {
            hasCollision = true
            console.log('Collision avec le distributeur de gants')
          }
        } else if (currentRoom === 'reception') {
          console.log(`Vérification collision consultation à (${newX}, ${newY})`)
          
          // Bureau du médecin (x="180" y="150" width="140" height="80")
          if (newX + playerRadius > 180 && newX - playerRadius < 320 && 
              newY + playerRadius > 150 && newY - playerRadius < 230) {
            hasCollision = true
            console.log('Collision avec le bureau du médecin')
          }
          
          // Chaise du médecin (x="200" y="240" width="40" height="15" + pieds)
          if (newX + playerRadius > 200 && newX - playerRadius < 240 && 
              newY + playerRadius > 240 && newY - playerRadius < 285) {
            hasCollision = true
            console.log('Collision avec la chaise du médecin')
          }
          
          // Chaise patient (x="260" y="80" width="40" height="15" + dossier)
          if (newX + playerRadius > 260 && newX - playerRadius < 300 && 
              newY + playerRadius > 50 && newY - playerRadius < 95) {
            hasCollision = true
            console.log('Collision avec la chaise patient')
          }
          
          // Armoire médicale (x="30" y="100" width="60" height="120")
          if (newX + playerRadius > 30 && newX - playerRadius < 90 && 
              newY + playerRadius > 100 && newY - playerRadius < 220) {
            hasCollision = true
            console.log('Collision avec l\'armoire médicale')
          }
          
          // Table d'examen (x="350" y="200" width="100" height="60" + pieds)
          if (newX + playerRadius > 350 && newX - playerRadius < 450 && 
              newY + playerRadius > 200 && newY - playerRadius < 280) {
            hasCollision = true
            console.log('Collision avec la table d\'examen')
          }
          
          // Balance médicale (x="400" y="350" width="40" height="15")
          if (newX + playerRadius > 400 && newX - playerRadius < 440 && 
              newY + playerRadius > 340 && newY - playerRadius < 368) {
            hasCollision = true
            console.log('Collision avec la balance médicale')
          }
          
          // Lavabo (x="450" y="80" width="30" height="20")
          if (newX + playerRadius > 450 && newX - playerRadius < 480 && 
              newY + playerRadius > 75 && newY - playerRadius < 100) {
            hasCollision = true
            console.log('Collision avec le lavabo')
          }
          
          // Distributeur de gants (x="420" y="120" width="25" height="30")
          if (newX + playerRadius > 420 && newX - playerRadius < 445 && 
              newY + playerRadius > 120 && newY - playerRadius < 150) {
            hasCollision = true
            console.log('Collision avec le distributeur de gants')
          }
          
          // Tensiomètre (x="100" y="280" width="40" height="30")
          if (newX + playerRadius > 100 && newX - playerRadius < 140 && 
              newY + playerRadius > 280 && newY - playerRadius < 318) {
            hasCollision = true
            console.log('Collision avec le tensiomètre')
          }
          
          // Thermomètre digital (x="150" y="285" width="20" height="8")
          if (newX + playerRadius > 150 && newX - playerRadius < 170 && 
              newY + playerRadius > 285 && newY - playerRadius < 293) {
            hasCollision = true
            console.log('Collision avec le thermomètre digital')
          }
          
          // Otoscope (x="180" y="290" width="15" height="25")
          if (newX + playerRadius > 180 && newX - playerRadius < 195 && 
              newY + playerRadius > 275 && newY - playerRadius < 315) {
            hasCollision = true
            console.log('Collision avec l\'otoscope')
          }
          
          // Diplômes au mur (x="30" y="30" width="60" height="40")
          if (newX + playerRadius > 30 && newX - playerRadius < 90 && 
              newY + playerRadius > 30 && newY - playerRadius < 70) {
            hasCollision = true
            console.log('Collision avec les diplômes (gauche)')
          }
          
          // Diplôme droite (x="100" y="30" width="60" height="40")
          if (newX + playerRadius > 100 && newX - playerRadius < 160 && 
              newY + playerRadius > 30 && newY - playerRadius < 70) {
            hasCollision = true
            console.log('Collision avec les diplômes (droite)')
          }
          
          // Horloge murale (cx="400" cy="50" r="20")
          if (newX + playerRadius > 380 && newX - playerRadius < 420 && 
              newY + playerRadius > 30 && newY - playerRadius < 70) {
            hasCollision = true
            console.log('Collision avec l\'horloge murale')
          }
          
          // Poubelle (x="460" y="420" width="20" height="25")
          if (newX + playerRadius > 460 && newX - playerRadius < 480 && 
              newY + playerRadius > 415 && newY - playerRadius < 445) {
            hasCollision = true
            console.log('Collision avec la poubelle')
          }
          
          // Murs (limites de la pièce)
          if (newX - playerRadius < 20 || newX + playerRadius > 480 || 
              newY - playerRadius < 20 || newY + playerRadius > 480) {
            hasCollision = true
            console.log('Collision avec les murs')
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

  // Gestion des salles
  const handleRoomChange = (roomId) => {
    console.log(`Changement de salle vers: ${roomId}`)
    setCurrentRoom(roomId)
    
    // Position initiale dans chaque salle
    switch(roomId) {
      case 'accueil':
        setPlayerPosition({ x: 250, y: 400 })
        break
      case 'couloir':
        setPlayerPosition({ x: 250, y: 350 })
        break
      case 'operation':
        setPlayerPosition({ x: 250, y: 400 })
        break
      case 'reception':
        setPlayerPosition({ x: 250, y: 400 })
        break
      case 'morgue':
        setPlayerPosition({ x: 250, y: 400 })
        break
      case 'pharmacie':
        setPlayerPosition({ x: 250, y: 400 })
        break
      case 'stockage': // Ajouter le cas stockage
        setPlayerPosition({ x: 250, y: 400 })
        break
      default:
        setPlayerPosition({ x: 250, y: 400 })
    }
  }

  // Rendu conditionnel des salles
  const renderCurrentRoom = () => {
    switch(currentRoom) {
      case 'accueil':
        return (
          <Accueil 
            playerPosition={playerPosition}
            setPlayerPosition={setPlayerPosition}
            onGoToCorridor={() => handleRoomChange('couloir')}
          />
        )
      case 'couloir':
        return (
          <Couloir 
            playerPosition={playerPosition}
            onEnterRoom={handleRoomChange}
          />
        )
      case 'operation':
        return (
          <Operation 
            playerPosition={playerPosition}
            setPlayerPosition={setPlayerPosition}
            onReturnToAccueil={() => handleRoomChange('couloir')}
          />
        )
      case 'reception':
        return (
          <Consultation 
            playerPosition={playerPosition}
            setPlayerPosition={setPlayerPosition}
            onReturnToAccueil={() => handleRoomChange('couloir')}
          />
        )
      case 'morgue':
        return (
          <Morgue 
            playerPosition={playerPosition}
            setPlayerPosition={setPlayerPosition}
            onReturnToAccueil={() => handleRoomChange('couloir')}
          />
        )
      case 'pharmacie':
        return (
          <Pharmacie 
            playerPosition={playerPosition}
            setPlayerPosition={setPlayerPosition}
            onReturnToAccueil={() => handleRoomChange('couloir')}
          />
        )
      case 'stockage': // Ajouter le cas stockage
        return (
          <Stockage 
            playerPosition={playerPosition}
            setPlayerPosition={setPlayerPosition}
            onReturnToAccueil={() => handleRoomChange('couloir')}
          />
        )
      default:
        return <div>Salle non trouvée</div>
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
              {renderCurrentRoom()}
              
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