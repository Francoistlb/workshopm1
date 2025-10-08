import React, { useState } from 'react'
import PorteOuverte from '../../plateau/PorteOuverte'
import './Stockage.css'

function Stockage({ playerPosition, setPlayerPosition, onReturnToAccueil }) {
  const [showRemedyBox, setShowRemedyBox] = useState(false)
  const [showSafe, setShowSafe] = useState(false)
  const [showLeftShelves, setShowLeftShelves] = useState(false)
  const [showRightShelves, setShowRightShelves] = useState(false)
  const [showPreparationTable, setShowPreparationTable] = useState(false)
  const [remedyCollected, setRemedyCollected] = useState(false)

  // Fonction pour vérifier si le joueur est proche d'un élément
  const isPlayerNear = (elementX, elementY, threshold = 60) => {
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - elementX, 2) + Math.pow(playerPosition.y - elementY, 2)
    )
    return distance <= threshold
  }

  // Handler pour le coffre-fort (remède principal)
  const handleSafeClick = () => {
    if (!isPlayerNear(250, 360)) {
      console.log('Vous devez vous approcher du coffre-fort pour l\'ouvrir !')
      return
    }
    console.log('Coffre-fort médical ouvert !')
    setShowSafe(!showSafe)
    if (!remedyCollected) {
      setRemedyCollected(true)
      alert('🎉 Félicitations ! Vous avez trouvé le remède final ! 💊✨')
    }
  }

  // Handler pour les étagères gauches
  const handleLeftShelvesClick = () => {
    if (!isPlayerNear(100, 150)) {
      console.log('Vous devez vous approcher des étagères pour les examiner !')
      return
    }
    console.log('Étagères de gauche examinées !')
    setShowLeftShelves(!showLeftShelves)
  }

  // Handler pour les étagères droites
  const handleRightShelvesClick = () => {
    if (!isPlayerNear(400, 150)) {
      console.log('Vous devez vous approcher des étagères pour les examiner !')
      return
    }
    console.log('Étagères de droite examinées !')
    setShowRightShelves(!showRightShelves)
  }

  // Handler pour la table de préparation
  const handlePreparationTableClick = () => {
    if (!isPlayerNear(250, 230)) {
      console.log('Vous devez vous approcher de la table de préparation !')
      return
    }
    console.log('Table de préparation utilisée !')
    setShowPreparationTable(!showPreparationTable)
  }

  // Handler pour la sortie
  const handleExitDoorClick = () => {
    if (!isPlayerNear(250, 440)) {
      console.log('Vous devez vous approcher de la porte pour sortir !')
      return
    }
    console.log('Retour au couloir depuis le stockage')
    onReturnToAccueil()
  }

  return (
    <div className="stockage-zone">
      {/* Background SVG */}
      <div 
        className="stockage-background"
        style={{
          backgroundImage: `url(${new URL('../../../assets/hospital_storage_room.svg', import.meta.url).href})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Coffre-fort médical (remède principal) */}
      <div 
        className={`medical-safe ${isPlayerNear(250, 360) ? 'interactive glow-gold' : 'non-interactive'}`}
        onClick={handleSafeClick}
        title={isPlayerNear(250, 360) ? "Coffre-fort médical - Le remède est ici !" : "Approchez-vous pour ouvrir le coffre"}
        style={{
          position: 'absolute',
          left: '200px',
          top: '320px',
          width: '100px',
          height: '80px',
          cursor: isPlayerNear(250, 360) ? 'pointer' : 'default'
        }}
      >
      </div>

      {/* Étagères gauches */}
      <div 
        className={`left-shelves ${isPlayerNear(100, 150) ? 'interactive' : 'non-interactive'}`}
        onClick={handleLeftShelvesClick}
        title={isPlayerNear(100, 150) ? "Étagères de stockage - Examiner" : "Approchez-vous pour examiner"}
        style={{
          position: 'absolute',
          left: '40px',
          top: '60px',
          width: '120px',
          height: '220px',
          cursor: isPlayerNear(100, 150) ? 'pointer' : 'default'
        }}
      >
      </div>

      {/* Étagères droites */}
      <div 
        className={`right-shelves ${isPlayerNear(400, 150) ? 'interactive' : 'non-interactive'}`}
        onClick={handleRightShelvesClick}
        title={isPlayerNear(400, 150) ? "Étagères de stockage - Examiner" : "Approchez-vous pour examiner"}
        style={{
          position: 'absolute',
          left: '340px',
          top: '60px',
          width: '120px',
          height: '220px',
          cursor: isPlayerNear(400, 150) ? 'pointer' : 'default'
        }}
      >
      </div>

      {/* Table de préparation */}
      <div 
        className={`preparation-table ${isPlayerNear(250, 230) ? 'interactive' : 'non-interactive'}`}
        onClick={handlePreparationTableClick}
        title={isPlayerNear(250, 230) ? "Table de préparation - Utiliser" : "Approchez-vous pour utiliser"}
        style={{
          position: 'absolute',
          left: '180px',
          top: '200px',
          width: '140px',
          height: '60px',
          cursor: isPlayerNear(250, 230) ? 'pointer' : 'default'
        }}
      >
      </div>

      {/* Porte de sortie */}
      <PorteOuverte 
        position={{ x: 220, y: 400 }}
        size={{ width: 60, height: 80 }}
        onClick={handleExitDoorClick}
        className={`${isPlayerNear(250, 440) ? 'interactive glow-green' : 'non-interactive'}`}
        isVisible={true}
      />

      {/* Message de succès si remède collecté */}
      {remedyCollected && (
        <div className="success-message" style={{
          position: 'absolute',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#28a745',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '10px',
          fontSize: '18px',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 1000
        }}>
          🎉 REMÈDE TROUVÉ ! Mission accomplie ! 🎉
        </div>
      )}
    </div>
  )
}

export default Stockage