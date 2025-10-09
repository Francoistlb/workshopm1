import { useState, useEffect } from 'react'
import './Pharmacie.css'
import PorteOuverte from '../../plateau/PorteOuverte'
import PaperModal from '../../modals/PaperModal'
import Pictogrames from '../../enigmes/pictogrames/pictogrames'

function Pharmacie({ playerPosition, setPlayerPosition, onReturnToAccueil, validateObjective }) {
  const [showComputer, setShowComputer] = useState(false)
  const [showBalance, setShowBalance] = useState(false)
  const [showRefrigerator, setShowRefrigerator] = useState(false)
  const [showMortar, setShowMortar] = useState(false)
  const [showLeftShelf, setShowLeftShelf] = useState(false)
  const [showRightShelf, setShowRightShelf] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [showChemicalBoxes, setShowChemicalBoxes] = useState(false)
  const [selectedBoxes, setSelectedBoxes] = useState([])
  const [validationMessage, setValidationMessage] = useState('')

  // Données des boîtes d'agents chimiques
  const chemicalBoxes = [
    {
      id: 1,
      name: 'Acétone',
      symbol: '🔥',
      number: 1,
      dangerous: true
    },
    {
      id: 2,
      name: 'Chloroforme',
      symbol: '⚠️',
      number: 6,
      dangerous: true
    },
    {
      id: 3,
      name: 'Acide chlorhydrique',
      symbol: '🧪',
      number: 9,
      dangerous: true
    },
    {
      id: 4,
      name: 'Peroxyde d\'hydrogène',
      symbol: '💥',
      number: 7,
      dangerous: true
    },
    {
      id: 5,
      name: 'Éthanol',
      symbol: '🔥',
      number: 3,
      dangerous: true
    },
    {
      id: 6,
      name: 'Paracétamol (poudre brute)',
      symbol: '🌿',
      number: 4,
      dangerous: false
    }
  ]

  // Solution : Acétone (1), Éthanol (3), Paracétamol (4) = code 134
  const correctSolution = [1, 3, 4]

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
    console.log('Système d\'analyse chimique activé !')
    setShowChemicalBoxes(true)
  }

  const handleBoxClick = (boxNumber) => {
    if (selectedBoxes.includes(boxNumber)) {
      setSelectedBoxes(selectedBoxes.filter(num => num !== boxNumber))
    } else if (selectedBoxes.length < 3) {
      setSelectedBoxes([...selectedBoxes, boxNumber])
    }
  }

  const validateSolution = () => {
    if (selectedBoxes.length !== 3) {
      setValidationMessage('❌ Vous devez sélectionner exactement 3 boîtes !')
      return
    }

    const sortedSelection = [...selectedBoxes].sort((a, b) => a - b)
    const isCorrect = JSON.stringify(sortedSelection) === JSON.stringify(correctSolution)

    if (isCorrect) {
      const code = selectedBoxes.sort((a, b) => a - b).join('')
      setValidationMessage(`✅ Excellent ! Code de validation : ${code}`)
      
      // Valider l'objectif pharmacie
      if (validateObjective) {
        validateObjective('pharmacy')
      }
      
      // Fermer le modal après un délai
      setTimeout(() => {
        setShowChemicalBoxes(false)
        setSelectedBoxes([])
        setValidationMessage('')
      }, 3000)
    } else {
      setValidationMessage('❌ Mauvaise combinaison ! Consultez les symboles de danger.')
    }
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
    console.log('Instructions de sécurité consultées !')
    console.log('Avant:', showInstructions)
    setShowInstructions(true)
    console.log('Après setShowInstructions(true)')
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
        title="Système d'analyse chimique - Cliquez pour analyser les boîtes"
      >
        <div className="computer-screen"></div>
      </div>
      
      {/* Balance de précision */}
      <div 
        className={`precision-balance ${isPlayerNear(215, 167.5) ? 'interactive' : 'non-interactive'}`}
        onClick={handleBalanceClick}
        title={isPlayerNear(215, 167.5) ? "Balance de précision - Cliquez pour peser" : "Approchez-vous pour utiliser"}
      >
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
        title="Instructions de sécurité - Cliquez pour consulter les consignes"
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

      {/* Modal Instructions */}
      {showInstructions && (
        <div className="instructions-modal">
          <div className="instructions-modal-content">
            <button 
              onClick={() => setShowInstructions(false)} 
              className="instructions-modal-close"
            >
              ✕
            </button>
            <div className="instructions-warning-box">
              <p><strong>⚠️ Instructions du personnel médical :</strong></p>
              <p><em>"Ne conservez que les substances qui ne présentent aucun risque explosif, dangereux pour la santé ou corrosif. Le bon ordre suivra toujours l'alphabet."</em></p>
            </div>
          </div>
        </div>
      )}

      {/* Modal Boîtes Chimiques */}
      {showChemicalBoxes && (
        <PaperModal
          isOpen={showChemicalBoxes}
          onClose={() => setShowChemicalBoxes(false)}
          paperType="game"
          title="Système d'Analyse Chimique"
        >
          <div className="chemical-modal-content">
            <h3 className="chemical-modal-title">🧪 Sélectionnez les 3 boîtes sûres</h3>
            <p className="chemical-modal-description">
              Cliquez sur les boîtes pour les sélectionner. Évitez les substances explosives, dangereuses pour la santé ou corrosives.
            </p>

            <div className="chemical-boxes-grid">
              {chemicalBoxes.map((box) => (
                <div
                  key={box.id}
                  onClick={() => handleBoxClick(box.number)}
                  className={`chemical-box ${selectedBoxes.includes(box.number) ? 'selected' : ''}`}
                >
                  <div className="chemical-box-symbol">
                    {box.symbol}
                  </div>
                  <h4 className="chemical-box-name">
                    {box.name}
                  </h4>
                  <p className="chemical-box-danger">
                    {box.symbolName}
                  </p>
                  <div className="chemical-box-number">
                    N° {box.number}
                  </div>
                </div>
              ))}
            </div>

            <div className="chemical-selection-info">
              <p>Boîtes sélectionnées : {selectedBoxes.length}/3</p>
              {selectedBoxes.length > 0 && (
                <p>Numéros : {selectedBoxes.sort((a, b) => a - b).join(', ')}</p>
              )}
            </div>

            <div className="chemical-button-container">
              <button
                onClick={validateSolution}
                disabled={selectedBoxes.length !== 3}
                className="chemical-validate-button"
              >
                Valider la sélection
              </button>
            </div>

            {validationMessage && (
              <div className={`chemical-validation-message ${validationMessage.includes('✅') ? 'success' : 'error'}`}>
                {validationMessage}
              </div>
            )}

            <div className="chemical-pictogrammes-container">
              <Pictogrames />
            </div>
          </div>
        </PaperModal>
      )}
    </div>
  )
}

export default Pharmacie