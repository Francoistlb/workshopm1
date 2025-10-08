import React, { useState } from 'react'
import PorteOuverte from '../../plateau/PorteOuverte'
import './Morgue.css'

function Morgue({ playerPosition, setPlayerPosition, onReturnToAccueil }) {
  // États pour les différents éléments interactifs
  const [showMortuary1, setShowMortuary1] = useState(false)
  const [showMortuary2, setShowMortuary2] = useState(false)
  const [showMortuary3, setShowMortuary3] = useState(false)
  const [showAutopsyTable, setShowAutopsyTable] = useState(false)
  const [showInstrumentCart, setShowInstrumentCart] = useState(false)
  const [showRefrigerator, setShowRefrigerator] = useState(false)
  const [showComputer, setShowComputer] = useState(false)

  // Fonction pour vérifier si le joueur est proche d'un élément
  const isPlayerNear = (elementX, elementY, threshold = 60) => {
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - elementX, 2) + Math.pow(playerPosition.y - elementY, 2)
    )
    return distance <= threshold
  }

  // Handlers pour les différents équipements
  const handleMortuary1Click = () => {
    if (!isPlayerNear(335, 55)) {
      console.log('Vous devez vous approcher du tiroir mortuaire pour l\'utiliser !')
      return
    }
    console.log('Tiroir mortuaire 1 ouvert !')
    setShowMortuary1(!showMortuary1)
  }

  const handleMortuary2Click = () => {
    if (!isPlayerNear(395, 55)) {
      console.log('Vous devez vous approcher du tiroir mortuaire pour l\'utiliser !')
      return
    }
    console.log('Tiroir mortuaire 2 ouvert !')
    setShowMortuary2(!showMortuary2)
  }

  const handleMortuary3Click = () => {
    if (!isPlayerNear(455, 55)) {
      console.log('Vous devez vous approcher du tiroir mortuaire pour l\'utiliser !')
      return
    }
    console.log('Tiroir mortuaire 3 ouvert !')
    setShowMortuary3(!showMortuary3)
  }

  const handleAutopsyTableClick = () => {
    if (!isPlayerNear(240, 230)) {
      console.log('Vous devez vous approcher de la table d\'autopsie pour l\'utiliser !')
      return
    }
    console.log('Table d\'autopsie activée !')
    setShowAutopsyTable(!showAutopsyTable)
  }

  const handleInstrumentCartClick = () => {
    if (!isPlayerNear(110, 200)) {
      console.log('Vous devez vous approcher du chariot d\'instruments pour l\'utiliser !')
      return
    }
    console.log('Chariot d\'instruments consulté !')
    setShowInstrumentCart(!showInstrumentCart)
  }

  const handleRefrigeratorClick = () => {
    if (!isPlayerNear(80, 175)) {
      console.log('Vous devez vous approcher de l\'armoire réfrigérée pour l\'utiliser !')
      return
    }
    console.log('Armoire réfrigérée ouverte !')
    setShowRefrigerator(!showRefrigerator)
  }

  const handleComputerClick = () => {
    if (!isPlayerNear(410, 420)) {
      console.log('Vous devez vous approcher de l\'ordinateur pour l\'utiliser !')
      return
    }
    console.log('Ordinateur de gestion activé !')
    setShowComputer(!showComputer)
  }

  const handleExitDoorClick = () => {
    if (!isPlayerNear(250, 440)) {
      console.log('Vous devez vous approcher de la porte pour sortir !')
      return
    }
    console.log('Retour au couloir depuis la morgue')
    onReturnToAccueil()
  }

  return (
    <div className="morgue-zone">
      {/* Background SVG */}
      <div 
        className="morgue-background"
        style={{
          backgroundImage: `url(${new URL('../../../assets/hospital_morgue_room.svg', import.meta.url).href})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Tiroir mortuaire 1 */}
      <div 
        className={`mortuary-drawer-1 ${isPlayerNear(335, 55) ? 'interactive' : 'non-interactive'}`}
        onClick={handleMortuary1Click}
        title={isPlayerNear(335, 55) ? "Tiroir mortuaire 1 - Cliquez pour ouvrir" : "Approchez-vous pour ouvrir"}
      >
      </div>

      {/* Tiroir mortuaire 2 */}
      <div 
        className={`mortuary-drawer-2 ${isPlayerNear(395, 55) ? 'interactive' : 'non-interactive'}`}
        onClick={handleMortuary2Click}
        title={isPlayerNear(395, 55) ? "Tiroir mortuaire 2 - Cliquez pour ouvrir" : "Approchez-vous pour ouvrir"}
      >
      </div>

      {/* Tiroir mortuaire 3 */}
      <div 
        className={`mortuary-drawer-3 ${isPlayerNear(455, 55) ? 'interactive' : 'non-interactive'}`}
        onClick={handleMortuary3Click}
        title={isPlayerNear(455, 55) ? "Tiroir mortuaire 3 - Cliquez pour ouvrir" : "Approchez-vous pour ouvrir"}
      >
      </div>

      {/* Table d'autopsie */}
      <div 
        className={`autopsy-table ${isPlayerNear(240, 230) ? 'interactive' : 'non-interactive'}`}
        onClick={handleAutopsyTableClick}
        title={isPlayerNear(240, 230) ? "Table d'autopsie - Cliquez pour utiliser" : "Approchez-vous pour utiliser"}
      >
      </div>

      {/* Chariot d'instruments */}
      <div 
        className={`instrument-cart ${isPlayerNear(110, 200) ? 'interactive' : 'non-interactive'}`}
        onClick={handleInstrumentCartClick}
        title={isPlayerNear(110, 200) ? "Chariot d'instruments - Cliquez pour consulter" : "Approchez-vous pour consulter"}
      >
      </div>

      {/* Armoire réfrigérée */}
      <div 
        className={`refrigerator ${isPlayerNear(80, 175) ? 'interactive' : 'non-interactive'}`}
        onClick={handleRefrigeratorClick}
        title={isPlayerNear(80, 175) ? "Armoire réfrigérée - Cliquez pour ouvrir" : "Approchez-vous pour ouvrir"}
      >
      </div>

      {/* Ordinateur de gestion */}
      <div 
        className={`computer ${isPlayerNear(410, 420) ? 'interactive' : 'non-interactive'}`}
        onClick={handleComputerClick}
        title={isPlayerNear(410, 420) ? "Ordinateur de gestion - Cliquez pour utiliser" : "Approchez-vous pour utiliser"}
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

      {/* Zones de collision invisibles */}
      <div className="collision-morgue-wall"></div>
      <div className="collision-equipment"></div>
      <div className="collision-autopsy-area"></div>
    </div>
  )
}

export default Morgue