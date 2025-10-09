import { useState, useEffect } from 'react'
import './Accueil.css'
import Electricity from '../../enigmes/electricite/electricite'
import PaperModal from '../../modals/PaperModal'

function Accueil({ playerPosition, setPlayerPosition, onGoToCorridor, validateObjective }) {
  const [showTerminal, setShowTerminal] = useState(false)
  const [showWhiteboard, setShowWhiteboard] = useState(false)
  const [showFolder1, setShowFolder1] = useState(false)
  const [showFolder2, setShowFolder2] = useState(false)
  const [showFolder3, setShowFolder3] = useState(false)
  const [showFolder4, setShowFolder4] = useState(false)
  const [terminalCode, setTerminalCode] = useState('')
  const [showDoorOpen, setShowDoorOpen] = useState(false)

  // Données des patients pour chaque dossier
  const patientsData = {
    folder1: { id: 1, nom: 'Marie Lise', gs: 'A-', date_admission: '12/08/25' },
    folder2: { id: 2, nom: 'Mac Gaver', gs: 'B+', date_admission: '20/06/25' },
    folder3: { id: 3, nom: 'Jean Pierre', gs: 'O+', date_admission: '02/05/25' },
    folder4: { id: 4, nom: 'Marie Antoinette', gs: 'AB', date_admission: '19/08/25' }
  }

  // Vérification de proximité - exactement comme dans l'original
  const isPlayerNear = (elementX, elementY, threshold = 60) => {
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - elementX, 2) + 
      Math.pow(playerPosition.y - elementY, 2)
    )
    return distance <= threshold
  }

  const handleTerminalClick = () => {
    if (!isPlayerNear(212.5, 69)) {
      console.log('Vous devez vous approcher du terminal !')
      return
    }
    console.log('Terminal activé !')
    setShowTerminal(true)
    setTerminalCode('')
    setShowDoorOpen(false)
  }

  const handleCodeSubmit = () => {
    if (terminalCode === '5886') {
      console.log('Code correct ! Porte déverrouillée !')
      setShowDoorOpen(true)
      setShowTerminal(false) // Fermer la modale
      // Valider l'objectif électricité
      if (validateObjective) {
        validateObjective('electricity')
      }
      alert('✅ Code correct ! La porte s\'est déverrouillée à côté du terminal !')
    } else {
      console.log('Code incorrect !')
      alert('❌ Code incorrect ! Réessayez...')
      setTerminalCode('')
    }
  }

  const handleDoorClick = () => {
    if (!showDoorOpen) return
    
    if (!isPlayerNear(280, 69)) {
      console.log('Vous devez vous approcher de la porte !')
      return
    }
    
    console.log('Accès au couloir !')
    setShowTerminal(false)
    setShowDoorOpen(false)
    onGoToCorridor()
  }

  const handleWhiteboardClick = () => {
    if (!isPlayerNear(252.5, 227.5)) {
      console.log('Vous devez vous approcher du tableau !')
      return
    }
    console.log('Tableau blanc activé !')
    setShowWhiteboard(!showWhiteboard)
  }

  const handleFolder1Click = () => {
    if (!isPlayerNear(85, 242.5)) {
      console.log('Vous devez vous approcher du dossier !')
      return
    }
    console.log('Dossier 1 activé !')
    setShowFolder1(!showFolder1)
  }

  const handleFolder2Click = () => {
    if (!isPlayerNear(415, 242.5)) {
      console.log('Vous devez vous approcher du dossier !')
      return
    }
    console.log('Dossier 2 activé !')
    setShowFolder2(!showFolder2)
  }

  const handleFolder3Click = () => {
    if (!isPlayerNear(315, 167.5)) {
      console.log('Vous devez vous approcher du dossier !')
      return
    }
    console.log('Dossier 3 activé !')
    setShowFolder3(!showFolder3)
  }

  const handleFolder4Click = () => {
    if (!isPlayerNear(175, 167.5)) {
      console.log('Vous devez vous approcher du dossier !')
      return
    }
    console.log('Dossier 4 activé !')
    setShowFolder4(!showFolder4)
  }

  return (
    <div className="accueil-zone">
      {/* Éléments interactifs - exactement comme dans l'original */}
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

      {/* Porte d'accès au couloir - apparaît après validation du code */}
      {showDoorOpen && (
        <div 
          className={`door-access ${isPlayerNear(280, 69) ? 'interactive' : 'non-interactive'}`}
          onClick={handleDoorClick}
          title={isPlayerNear(280, 69) ? "Porte déverrouillée - Cliquez pour accéder au couloir" : "Approchez-vous de la porte"}
        >
          <img 
            src={new URL('../../plateau/assets/porteouverte.png', import.meta.url).href}
            alt="Porte ouverte vers le couloir"
            draggable={false}
          />
        </div>
      )}
      
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

      {/* Éléments décoratifs */}
      <div className="decorations">
        <div className="decore-crack1">
          <img src={new URL('../../plateau/assets/decorecrack1.png', import.meta.url).href} alt="Fissure 1" draggable={false} />
        </div>
        <div className="decore-crack2">
          <img src={new URL('../../plateau/assets/decorecrack2.png', import.meta.url).href} alt="Fissure 2" draggable={false} />
        </div>
        
        <div className="decore-doc1">
          <img src={new URL('../../plateau/assets/decoredoc1.png', import.meta.url).href} alt="Document 1" draggable={false} />
        </div>
        <div className="decore-doc2">
          <img src={new URL('../../plateau/assets/decoredoc2.png', import.meta.url).href} alt="Document 2" draggable={false} />
        </div>
        <div className="decore-doc3">
          <img src={new URL('../../plateau/assets/decoredoc3.png', import.meta.url).href} alt="Document 3" draggable={false} />
        </div>
        
        <div className="decore-papier1">
          <img src={new URL('../../plateau/assets/decorepapier1.png', import.meta.url).href} alt="Papier 1" draggable={false} />
        </div>
        <div className="decore-papier2">
          <img src={new URL('../../plateau/assets/decorepapier2.png', import.meta.url).href} alt="Papier 2" draggable={false} />
        </div>
        
        <div className="decore-plante1">
          <img src={new URL('../../plateau/assets/decoreplante1.png', import.meta.url).href} alt="Plante 1" draggable={false} />
        </div>
        <div className="decore-plante2">
          <img src={new URL('../../plateau/assets/decoreplante2.png', import.meta.url).href} alt="Plante 2" draggable={false} />
        </div>
        
        <div className="decore-sang1">
          <img src={new URL('../../plateau/assets/decoresang1.png', import.meta.url).href} alt="Tache de sang" draggable={false} />
        </div>
        <div className="decore-sang2">
          <img src={new URL('../../plateau/assets/decoresang1.png', import.meta.url).href} alt="Tache de sang" draggable={false} />
        </div>
      </div>

      {/* Zones de collision invisibles (pour debug) - comme dans l'original */}
      <div className="collision-reception"></div>
      <div className="collision-corridor"></div>
      <div className="collision-bench-left"></div>
      <div className="collision-bench-right"></div>

      {/* Modale Terminal */}
      {showTerminal && (
        <div className="terminal-modal">
          <div className="terminal-modal-content">
            <div className="terminal-header">
              <h3>🖥️ Terminal de Sécurité</h3>
              <button 
                className="terminal-close"
                onClick={() => setShowTerminal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="terminal-interface">
              <div className="terminal-screen">
                <p>SYSTÈME DE SÉCURITÉ ACTIVÉ</p>
                <p>Veuillez saisir le code d'accès :</p>
                <div className="code-input-container">
                  <input
                    type="password"
                    value={terminalCode}
                    onChange={(e) => setTerminalCode(e.target.value)}
                    maxLength={4}
                    placeholder="****"
                    className="code-input"
                    autoFocus
                  />
                  <button 
                    onClick={handleCodeSubmit}
                    className="submit-code-btn"
                  >
                    VALIDER
                  </button>
                </div>
                <div className="terminal-hint">
                  💡 Indice : Cherchez dans les dossiers...
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modale Tableau Blanc - Affiche l'ordre vital */}
      <PaperModal
        isOpen={showWhiteboard}
        onClose={() => setShowWhiteboard(false)}
        title="📋 Tableau Blanc - Ordre Vital"
        paperType="terminal"
      >
        <Electricity showBoard={true} />
      </PaperModal>

      {/* Modale Dossier 1 */}
      <PaperModal
        isOpen={showFolder1}
        onClose={() => setShowFolder1(false)}
        title="📁 Dossier Patient"
        paperType="folder"
      >
        <Electricity showPatient={patientsData.folder1} />
      </PaperModal>

      {/* Modale Dossier 2 */}
      <PaperModal
        isOpen={showFolder2}
        onClose={() => setShowFolder2(false)}
        title="📁 Dossier Patient"
        paperType="folder"
      >
        <Electricity showPatient={patientsData.folder2} />
      </PaperModal>

      {/* Modale Dossier 3 */}
      <PaperModal
        isOpen={showFolder3}
        onClose={() => setShowFolder3(false)}
        title="📁 Dossier Patient"
        paperType="folder"
      >
        <Electricity showPatient={patientsData.folder3} />
      </PaperModal>

      {/* Modale Dossier 4 */}
      <PaperModal
        isOpen={showFolder4}
        onClose={() => setShowFolder4(false)}
        title="📁 Dossier Patient"
        paperType="folder"
      >
        <Electricity showPatient={patientsData.folder4} />
      </PaperModal>
    </div>
  )
}

export default Accueil