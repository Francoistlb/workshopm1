import React, { useState } from 'react'
import PorteOuverte from '../../plateau/PorteOuverte'
import './Operation.css'

function SalleOperation({ playerPosition, setPlayerPosition, onReturnToAccueil }) {
  // États pour les différents éléments interactifs
  const [showOperatingTable, setShowOperatingTable] = useState(false)
  const [showScialytic, setShowScialytic] = useState(false)
  const [showMonitoring, setShowMonitoring] = useState(false)
  const [showAnesthesia, setShowAnesthesia] = useState(false)
  const [showElectroBistoury, setShowElectroBistoury] = useState(false)
  const [showSurgicalSink, setShowSurgicalSink] = useState(false)
  const [showGloveDispenser, setShowGloveDispenser] = useState(false)

  // Fonction pour vérifier si le joueur est proche d'un élément
  const isPlayerNear = (elementX, elementY, threshold = 60) => {
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - elementX, 2) + Math.pow(playerPosition.y - elementY, 2)
    )
    return distance <= threshold
  }

  // Handlers pour les différents équipements
  const handleOperatingTableClick = () => {
    if (!isPlayerNear(250, 250)) {
      console.log('Vous devez vous approcher de la table d\'opération pour l\'utiliser !')
      return
    }
    console.log('Table d\'opération activée !')
    setShowOperatingTable(!showOperatingTable)
  }

  const handleScialyticClick = () => {
    if (!isPlayerNear(250, 180)) {
      console.log('Vous devez vous approcher du scialytique pour l\'utiliser !')
      return
    }
    console.log('Scialytique activé !')
    setShowScialytic(!showScialytic)
  }

  const handleMonitoringClick = () => {
    if (!isPlayerNear(350, 200)) {
      console.log('Vous devez vous approcher du monitoring pour l\'utiliser !')
      return
    }
    console.log('Monitoring patient activé !')
    setShowMonitoring(!showMonitoring)
  }

  const handleAnesthesiaClick = () => {
    if (!isPlayerNear(145, 235)) {
      console.log('Vous devez vous approcher du chariot d\'anesthésie pour l\'utiliser !')
      return
    }
    console.log('Chariot d\'anesthésie activé !')
    setShowAnesthesia(!showAnesthesia)
  }

  const handleElectroBistouryClick = () => {
    if (!isPlayerNear(370, 295)) {
      console.log('Vous devez vous approcher de l\'électro-bistouri pour l\'utiliser !')
      return
    }
    console.log('Électro-bistouri activé !')
    setShowElectroBistoury(!showElectroBistoury)
  }

  const handleSurgicalSinkClick = () => {
    if (!isPlayerNear(60, 115)) {
      console.log('Vous devez vous approcher du lavabo chirurgical pour l\'utiliser !')
      return
    }
    console.log('Lavabo chirurgical activé !')
    setShowSurgicalSink(!showSurgicalSink)
  }

  const handleGloveDispenserClick = () => {
    if (!isPlayerNear(435, 100)) {
      console.log('Vous devez vous approcher du distributeur de gants pour l\'utiliser !')
      return
    }
    console.log('Distributeur de gants activé !')
    setShowGloveDispenser(!showGloveDispenser)
  }

  const handleExitDoorClick = () => {
    if (!isPlayerNear(250, 440)) {
      console.log('Vous devez vous approcher de la porte pour sortir !')
      return
    }
    console.log('Retour au couloir depuis la salle d\'opération')
    onReturnToAccueil()
  }

  // Ajouter ce handler pour le corps
  const handleCorpsClick = () => {
    if (!isPlayerNear(250, 275)) {
      console.log('Vous devez vous approcher du patient pour l\'examiner !')
      return
    }
    console.log('Examen du patient en cours...')
    // Ajouter ici votre logique d'interaction avec le corps
  }

  return (
    <div className="salle-operation-zone">
      {/* Background SVG */}
      <div 
        className="salle-operation-background"
        style={{
          backgroundImage: `url(${new URL('../../../assets/hospital_operating_room.svg', import.meta.url).href})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Table d'opération */}
      <div 
        className={`operating-table ${isPlayerNear(250, 250) ? 'interactive' : 'non-interactive'}`}
        onClick={handleOperatingTableClick}
        title={isPlayerNear(250, 250) ? "Table d'opération - Cliquez pour utiliser" : "Approchez-vous pour utiliser"}
      >
      </div>

      {/* Scialytique */}
      <div 
        className={`scialytic ${isPlayerNear(250, 180) ? 'interactive' : 'non-interactive'}`}
        onClick={handleScialyticClick}
        title={isPlayerNear(250, 180) ? "Scialytique - Cliquez pour allumer" : "Approchez-vous pour allumer"}
      >
      </div>

      {/* Monitoring patient */}
      <div 
        className={`monitoring ${isPlayerNear(350, 200) ? 'interactive' : 'non-interactive'}`}
        onClick={handleMonitoringClick}
        title={isPlayerNear(350, 200,) ? "Monitoring patient - Cliquez pour consulter" : "Approchez-vous pour consulter"}
      >
      </div>

      {/* Chariot d'anesthésie */}
      <div 
        className={`anesthesia-cart ${isPlayerNear(145, 235) ? 'interactive' : 'non-interactive'}`}
        onClick={handleAnesthesiaClick}
        title={isPlayerNear(145, 235) ? "Chariot d'anesthésie - Cliquez pour utiliser" : "Approchez-vous pour utiliser"}
      >
      </div>

     {/* corps sur la table */}
      <div 
        className={`corps-operation-on-table ${isPlayerNear(250, 275, 100) ? 'interactive' : 'non-interactive'}`}
        onClick={handleCorpsClick}
        title={isPlayerNear(250, 275) ? "Patient - Cliquez pour examiner" : "Approchez-vous pour examiner"}
      >
        <img 
          src={new URL('./assets/corps.png', import.meta.url).href} 
          alt="Corps sur table d'opération" 
          className="corps-image"
        />
      </div>
      

      {/* Lavabo chirurgical */}
      <div 
        className={`surgical-sink ${isPlayerNear(60, 115) ? 'interactive' : 'non-interactive'}`}
        onClick={handleSurgicalSinkClick}
        title={isPlayerNear(60, 115) ? "Lavabo chirurgical - Cliquez pour vous laver" : "Approchez-vous pour vous laver"}
      >
      </div>

      {/* Distributeur de gants */}
      <div 
        className={`glove-dispenser ${isPlayerNear(435, 100) ? 'interactive' : 'non-interactive'}`}
        onClick={handleGloveDispenserClick}
        title={isPlayerNear(435, 100) ? "Distributeur de gants - Cliquez pour prendre des gants" : "Approchez-vous pour prendre des gants"}
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
      <div className="collision-operating-table"></div>
      <div className="collision-equipment-left"></div>
      <div className="collision-equipment-right"></div>
      <div className="collision-sinks"></div>
    </div>
  )
}

export default SalleOperation