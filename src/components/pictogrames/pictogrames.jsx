import { useState } from 'react'

function Pictogrames() {
  return (
    <div style={{ marginTop: '20px' }}>
      <h4 style={{ marginBottom: '15px', color: '#2c3e50' }}>
        📋 Légende des Pictogrammes de Sécurité
      </h4>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '10px',
        fontSize: '0.8em'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.5em' }}>💥</span>
          <span><strong>Explosif</strong> - Danger d'explosion</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.5em' }}>🔥</span>
          <span><strong>Inflammable</strong> - Danger d'incendie</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.5em' }}>🧪</span>
          <span><strong>Corrosif</strong> - Peut être corrosif</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.5em' }}>☠️</span>
          <span><strong>Toxique</strong> - Danger mortel</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.5em' }}>⚠️</span>
          <span><strong>Irritant</strong> - Danger pour la santé</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.5em' }}>🌿</span>
          <span><strong>Environnement</strong> - Danger environnemental</span>
        </div>
      </div>
    </div>
  )
}

export default Pictogrames
