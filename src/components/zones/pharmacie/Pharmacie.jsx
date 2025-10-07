import { useState, useEffect } from 'react'
import './Pharmacie.css'
import PorteOuverte from '../../plateau/PorteOuverte'

function Pharmacie({ playerPosition, setPlayerPosition, onReturnToAccueil }) {
  const [showComputer, setShowComputer] = useState(false)
  const [showBalance, setShowBalance] = useState(false)
  const [showRefrigerator, setShowRefrigerator] = useState(false)
  const [showMortar, setShowMortar] = useState(false)
  const [showLeftShelf, setShowLeftShelf] = useState(false)
  const [showRightShelf, setShowRightShelf] = useState(false)

  // Fonction pour gérer la porte de sortie
  const handleExitDoorClick = () => {
    if (!isPlayerNear(250, 440)) {
      console.log('Vous devez vous approcher de la porte de sortie !')
      return
    }
    
    console.log('Retour au couloir !')
    onReturnToAccueil()
  }

  // Vérification de proximité - exactement comme dans l'original
  const isPlayerNear = (elementX, elementY, threshold = 60) => {
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - elementX, 2) + 
      Math.pow(playerPosition.y - elementY, 2)
    )
    return distance <= threshold
  }

  const handleComputerClick = () => {
    if (!isPlayerNear(297.5, 172.5)) {
      console.log('Vous devez vous approcher de l\'ordinateur !')
      return
    }
    console.log('Terminal de pharmacie activé !')
    setShowComputer(!showComputer)
  }

  const handleBalanceClick = () => {
    if (!isPlayerNear(215, 167.5)) {
      console.log('Vous devez vous approcher de la balance !')
      return
    }
    console.log('Balance de précision activée !')
    setShowBalance(!showBalance)
  }

  const handleRefrigeratorClick = () => {
    if (!isPlayerNear(110, 420)) {
      console.log('Vous devez vous approcher du réfrigérateur !')
      return
    }
    console.log('Réfrigérateur médical ouvert !')
    setShowRefrigerator(!showRefrigerator)
  }

  const handleMortarClick = () => {
    if (!isPlayerNear(330, 170)) {
      console.log('Vous devez vous approcher du mortier !')
      return
    }
    console.log('Mortier et pilon utilisés !')
    setShowMortar(!showMortar)
  }

  const handleLeftShelfClick = () => {
    if (!isPlayerNear(52.5, 150)) {
      console.log('Vous devez vous approcher des étagères !')
      return
    }
    console.log('Étagère de médicaments consultée !')
    setShowLeftShelf(!showLeftShelf)
  }

  const handleRightShelfClick = () => {
    if (!isPlayerNear(447.5, 150)) {
      console.log('Vous devez vous approcher des étagères !')
      return
    }
    console.log('Étagère de médicaments consultée !')
    setShowRightShelf(!showRightShelf)
  }

  return (
    <div className="pharmacie-zone">
      {/* Background SVG */}
      <div 
        className="pharmacie-background"
        style={{
          backgroundImage: `url(${new URL('../../../assets/hospital_pharmacy_room.svg', import.meta.url).href})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Éléments interactifs */}
      
      {/* Terminal informatique */}
      <div 
        className={`computer-terminal ${isPlayerNear(297.5, 172.5) ? 'interactive' : 'non-interactive'}`}
        onClick={handleComputerClick}
        title={isPlayerNear(297.5, 172.5) ? "Terminal de pharmacie - Cliquez pour interagir" : "Approchez-vous pour interagir"}
      >
        <div className="computer-screen"></div>
      </div>
      
      {/* Balance de précision */}
      <div 
        className={`precision-balance ${isPlayerNear(215, 167.5) ? 'interactive' : 'non-interactive'}`}
        onClick={handleBalanceClick}
        title={isPlayerNear(215, 167.5) ? "Balance de précision - Cliquez pour peser" : "Approchez-vous pour utiliser"}
      >
        <div className="balance-plate"></div>
      </div>

      {/* Réfrigérateur médical */}
      <div 
        className={`medical-fridge ${isPlayerNear(110, 420) ? 'interactive' : 'non-interactive'}`}
        onClick={handleRefrigeratorClick}
        title={isPlayerNear(110, 420) ? "Réfrigérateur médical - Cliquez pour ouvrir" : "Approchez-vous pour ouvrir"}
      >
        <div className="fridge-door"></div>
      </div>

      {/* Mortier et pilon */}
      <div 
        className={`mortar-pestle ${isPlayerNear(330, 170) ? 'interactive' : 'non-interactive'}`}
        onClick={handleMortarClick}
        title={isPlayerNear(330, 170) ? "Mortier et pilon - Cliquez pour utiliser" : "Approchez-vous pour utiliser"}
      >
        <div className="mortar-bowl"></div>
      </div>

      {/* Étagères gauche */}
      <div 
        className={`left-shelf ${isPlayerNear(52.5, 150) ? 'interactive' : 'non-interactive'}`}
        onClick={handleLeftShelfClick}
        title={isPlayerNear(52.5, 150) ? "Étagères de médicaments - Cliquez pour consulter" : "Approchez-vous pour consulter"}
      >
        <div className="shelf-medicines"></div>
      </div>

      {/* Étagères droite */}
      <div 
        className={`right-shelf ${isPlayerNear(447.5, 150) ? 'interactive' : 'non-interactive'}`}
        onClick={handleRightShelfClick}
        title={isPlayerNear(447.5, 150) ? "Étagères de médicaments - Cliquez pour consulter" : "Approchez-vous pour consulter"}
      >
        <div className="shelf-medicines"></div>
      </div>

      {/* Porte de sortie vers le couloir */}
      <PorteOuverte 
        position={{ x: 220, y: 400 }}
        size={{ width: 60, height: 80 }}
        onClick={handleExitDoorClick}
        className={`${isPlayerNear(250, 440) ? 'interactive glow-green' : 'non-interactive'}`}
        isVisible={true}
      />

      {/* Zones de collision pour les meubles */}
      <div className="collision-counter"></div>
      <div className="collision-left-shelves"></div>
      <div className="collision-right-shelves"></div>
      <div className="collision-fridge"></div>
    </div>
  )
}

export default Pharmacie