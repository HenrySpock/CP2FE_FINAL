
// TravDetMarker.js
import React, { useEffect, useState, useCallback } from 'react';
import L from 'leaflet';
import { Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';

function calculateIconSize(zoom) {
  const minZoom = 2;
  const maxZoom = 18;
  const minSize = 20;
  const maxSize = 40;

  const t = (zoom - minZoom) / (maxZoom - minZoom);
  const iconSize = (1 - t) * minSize + t * maxSize;

  return [iconSize, iconSize];
}

function TravDetMarker({ entry }) {
  const map = useMap();
  const [iconSize, setIconSize] = useState(calculateIconSize(map.getZoom()));

  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = useCallback(() => {
    setIsFullScreen(!isFullScreen);
  }, [isFullScreen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isFullScreen && (event.key === 'Escape' || event.key === 'Enter')) {
        toggleFullScreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullScreen, toggleFullScreen]);

  useEffect(() => {
    function handleZoomEnd() {
      const zoom = map.getZoom();
      setIconSize(calculateIconSize(zoom));
    }

    map.on('zoomend', handleZoomEnd);
    return () => {
      map.off('zoomend', handleZoomEnd);
    };
  }, [map]);

  const imageUrl = entry.Images[0]?.image_url;
  const customIcon = new L.Icon({
    iconUrl: imageUrl,
    iconSize: iconSize,
  });

return (
  <>
    <Marker position={[entry.latitude, entry.longitude]} icon={customIcon}>
      <Popup>
        <Link to={`/trav_det/${entry.travelogId}`} className="custom-popup">
          <Link to={`/public_profile/${entry.username}`}>{entry.username}</Link> <br />
          Travelog: {entry.title} <br />
          In {entry.country} <br />   

          <img 
            src={imageUrl} 
            alt="Travelog" 
            width="100" 
            className="trav-pop-img" 
            onClick={toggleFullScreen} 
          />

        </Link>
      </Popup>
    </Marker>

    {isFullScreen && (
      <div className="fullsize-image">
        <img 
          src={imageUrl} 
          alt="Full screen travelog" 
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%', 
            objectFit: 'contain' 
          }} 
          onClick={toggleFullScreen}  
        />
      </div>
    )}
  </>
);
}

export default TravDetMarker;