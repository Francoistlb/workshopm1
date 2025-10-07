import React from 'react';
import porteOuverteImg from './assets/porteouverte.png';
import './PorteOuverte.css';

function PorteOuverte({ 
  position = { x: 0, y: 0 }, 
  size = { width: 60, height: 80 }, 
  onClick = null,
  isVisible = true,
  className = ''
}) {
  if (!isVisible) return null;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`porte-ouverte ${className}`}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        zIndex: 10
      }}
      onClick={handleClick}
    >
      <img 
        src={porteOuverteImg} 
        alt="Porte ouverte"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: onClick ? 'brightness(1)' : 'brightness(0.8)',
          transition: 'filter 0.2s ease'
        }}
        onMouseEnter={(e) => {
          if (onClick) {
            e.target.style.filter = 'brightness(1.2) drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))';
          }
        }}
        onMouseLeave={(e) => {
          if (onClick) {
            e.target.style.filter = 'brightness(1)';
          }
        }}
      />
    </div>
  );
}

export default PorteOuverte;