import { useEffect, useState } from 'react'
import './GameOverModal.css'

function GameOverModal({ isOpen, onReturnHome, onRestart }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Son de game over (optionnel)
      // new Audio('/sounds/game-over.mp3').play().catch(() => {})
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={`game-over-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="game-over-modal">
        <div className="game-over-header">
          <div className="game-over-icon">💀</div>
          <h1 className="game-over-title">GAME OVER</h1>
          <div className="game-over-subtitle">Le temps est écoulé !</div>
        </div>

        <div className="game-over-content">
          <div className="game-over-message">
            <p>⏰ <strong>Temps écoulé !</strong></p>
            <p>L'épidémie s'est propagée dans tout l'hôpital...</p>
            <p>Votre équipe n'a pas réussi à trouver l'antidote à temps.</p>
          </div>

          <div className="game-over-stats">
            <div className="stat-box">
              <div className="stat-icon">🧩</div>
              <div className="stat-text">
                <span className="stat-label">Énigmes résolues</span>
                <span className="stat-value">2/4</span>
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon">⏱️</div>
              <div className="stat-text">
                <span className="stat-label">Temps de jeu</span>
                <span className="stat-value">30:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="game-over-actions">
          <button 
            className="game-over-button restart-button"
            onClick={onRestart}
          >
            🔄 Recommencer
          </button>
          <button 
            className="game-over-button home-button"
            onClick={onReturnHome}
          >
            🏠 Menu Principal
          </button>
        </div>

        <div className="game-over-footer">
          <p>💡 <em>Conseil : Explorez toutes les salles et communiquez en équipe !</em></p>
        </div>
      </div>
    </div>
  )
}

export default GameOverModal