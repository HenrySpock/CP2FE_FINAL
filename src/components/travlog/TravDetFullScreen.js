import React, { useEffect } from 'react';
import './TravDet.css'

function TravDetFullScreen({ imageUrl, title, description, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!imageUrl) return null;

  return (
    <div className="fullscreen-modal" onClick={onClose}>
      {(title || description) && (
        <div className="image-text">
          <p>{title}</p>
          <p>{description}</p>
        </div>
      )}
      <img src={imageUrl} alt="Fullscreen" className="fullscreen-image" />
    </div>
  );
}

export default TravDetFullScreen;