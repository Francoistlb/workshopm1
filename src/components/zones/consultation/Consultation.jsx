import React, { useState, useEffect } from 'react'
import PorteOuverte from '../../plateau/PorteOuverte'
import './Consultation.css'

function Consultation({ playerPosition, setPlayerPosition, onReturnToAccueil }) {
  // États pour les différents éléments interactifs
  const [showDoctorDesk, setShowDoctorDesk] = useState(false)
  const [showMedicalCabinet, setShowMedicalCabinet] = useState(false)
  const [showComputer, setShowComputer] = useState(false)
  const [showExaminationTable, setShowExaminationTable] = useState(false)
  const [showSink, setShowSink] = useState(false)
  const [showTensiometer, setShowTensiometer] = useState(false)
  const [showMedicalScale, setShowMedicalScale] = useState(false)

  // Fonction pour vérifier si le joueur est proche d'un élément
  const isPlayerNear = (elementX, elementY, threshold = 60) => {
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - elementX, 2) + Math.pow(playerPosition.y - elementY, 2)
    )
    return distance <= threshold
  }

  // Handlers pour les différents équipements
  const handleDoctorDeskClick = () => {
    if (!isPlayerNear(250, 190)) {
      console.log('Vous devez vous approcher du bureau du médecin pour l\'utiliser !')
      return
    }
    console.log('Bureau du médecin consulté !')
    setShowDoctorDesk(!showDoctorDesk)
  }

  const handleMedicalCabinetClick = () => {
    if (!isPlayerNear(60, 160)) {
      console.log('Vous devez vous approcher de l\'armoire médicale pour l\'utiliser !')
      return
    }
    console.log('Armoire médicale ouverte !')
    setShowMedicalCabinet(!showMedicalCabinet)
  }

  const handleComputerClick = () => {
    if (!isPlayerNear(230, 180, 100)) { // ✅ Ajuster la position
      console.log('Vous devez vous approcher de l\'ordinateur pour l\'utiliser !')
      return
    }
    console.log('Ordinateur médical activé !')
    setShowComputer(!showComputer)
  }

  const handleExaminationTableClick = () => {
    if (!isPlayerNear(400, 230)) {
      console.log('Vous devez vous approcher de la table d\'examen pour l\'utiliser !')
      return
    }
    console.log('Table d\'examen préparée !')
    setShowExaminationTable(!showExaminationTable)
  }

  const handleSinkClick = () => {
    if (!isPlayerNear(465, 90)) {
      console.log('Vous devez vous approcher du lavabo pour l\'utiliser !')
      return
    }
    console.log('Lavage des mains effectué !')
    setShowSink(!showSink)
  }

  const handleTensiometerClick = () => {
    if (!isPlayerNear(120, 295)) {
      console.log('Vous devez vous approcher du tensiomètre pour l\'utiliser !')
      return
    }
    console.log('Tensiomètre activé !')
    setShowTensiometer(!showTensiometer)
  }

  const handleMedicalScaleClick = () => {
    if (!isPlayerNear(420, 355)) {
      console.log('Vous devez vous approcher de la balance pour l\'utiliser !')
      return
    }
    console.log('Balance médicale utilisée !')
    setShowMedicalScale(!showMedicalScale)
  }

  const handleExitDoorClick = () => {
    if (!isPlayerNear(250, 440)) {
      console.log('Vous devez vous approcher de la porte pour sortir !')
      return
    }
    console.log('Retour au couloir depuis la salle de consultation')
    onReturnToAccueil()
  }

  return (
    <div className="consultation-zone">
      {/* Background SVG */}
      <div 
        className="consultation-background"
        style={{
          backgroundImage: `url(${new URL('../../../assets/hospital_consultation_room.svg', import.meta.url).href})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Bureau du médecin */}
      <div 
        className={`doctor-desk ${isPlayerNear(250, 190) ? 'interactive' : 'non-interactive'}`}
        onClick={handleDoctorDeskClick}
        title={isPlayerNear(250, 190) ? "Bureau du médecin - Cliquez pour consulter" : "Approchez-vous pour consulter"}
      >
      </div>

      {/* Armoire médicale */}
      <div 
        className={`medical-cabinet ${isPlayerNear(60, 160) ? 'interactive' : 'non-interactive'}`}
        onClick={handleMedicalCabinetClick}
        title={isPlayerNear(60, 160) ? "Armoire médicale - Cliquez pour ouvrir" : "Approchez-vous pour ouvrir"}
      >
      </div>

      {/* Ordinateur */}
      <div 
        className={`computer ${isPlayerNear(230, 180, 100) ? 'interactive' : 'non-interactive'}`}
        onClick={handleComputerClick}
        title={isPlayerNear(230, 180, 100) ? "Ordinateur médical - Cliquez pour utiliser" : "Approchez-vous pour utiliser"}
      >
      </div>

      {/* Table d'examen */}
      <div 
        className={`examination-table ${isPlayerNear(400, 230) ? 'interactive' : 'non-interactive'}`}
        onClick={handleExaminationTableClick}
        title={isPlayerNear(400, 230) ? "Table d'examen - Cliquez pour préparer" : "Approchez-vous pour préparer"}
      >
      </div>

      {/* Lavabo */}
      <div 
        className={`sink ${isPlayerNear(465, 90) ? 'interactive' : 'non-interactive'}`}
        onClick={handleSinkClick}
        title={isPlayerNear(465, 90) ? "Lavabo - Cliquez pour vous laver" : "Approchez-vous pour vous laver"}
      >
      </div>

      {/* Tensiomètre */}
      <div 
        className={`tensiometer ${isPlayerNear(120, 295) ? 'interactive' : 'non-interactive'}`}
        onClick={handleTensiometerClick}
        title={isPlayerNear(120, 295) ? "Tensiomètre - Cliquez pour utiliser" : "Approchez-vous pour utiliser"}
      >
      </div>

      {/* Balance médicale */}
      <div 
        className={`medical-scale ${isPlayerNear(420, 355) ? 'interactive' : 'non-interactive'}`}
        onClick={handleMedicalScaleClick}
        title={isPlayerNear(420, 355) ? "Balance médicale - Cliquez pour utiliser" : "Approchez-vous pour utiliser"}
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
      <div className="collision-desk"></div>
      <div className="collision-cabinet"></div>
      <div className="collision-examination-table"></div>
      <div className="collision-equipment"></div>
    </div>
  )
}

export default Consultation