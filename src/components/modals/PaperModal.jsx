import React from 'react'
import './PaperModal.css'

function PaperModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  paperType = 'document' // 'document', 'folder', 'terminal'
}) {
  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="paper-modal" onClick={handleBackdropClick}>
      <div className={`paper-modal-content ${paperType}`} onClick={handleModalClick}>
        <div className="paper-modal-header">
          <h3>{title}</h3>
          <button 
            className="paper-modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="paper-modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default PaperModal