// TripDetMarker.js
import React, { useEffect, useState } from 'react';
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

function TripDetMarker({ entry, order, showNumbers }) {
  const map = useMap();
  const [iconSize, setIconSize] = useState(calculateIconSize(map.getZoom()));

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

  const image_url = entry.Images[0]?.image_url; 

  const customIcon = new L.DivIcon({ 

    html: `
    <div style="position: relative; width: ${iconSize}px; height: ${iconSize}px;">
        <img src="${image_url}" style="width: 25px; height: 25px;">
        ${showNumbers ? `<div style="position: absolute; top: 0; right: 0; transform: translate(100%, -50%);">
            <div style="background-color: rgba(0, 170, 255, 0.5); border-radius: 50%; width: 15px; height: 15px; display: flex; align-items: center; justify-content: center; font-size: ${iconSize / 8}px;">
                ${order}
            </div>
        </div>` : ''}
    </div>
    `,
    className: 'custom-numbered-icon',
    iconSize: iconSize,
  });

  return (
    <Marker position={[entry.latitude, entry.longitude]} icon={customIcon}>
      <Popup>
        <Link to={`/trav_det/${entry.travelog_id}`} className="custom-popup">
          <Link to={`/public_profile/${entry.username}`}>{entry.username}</Link> <br />
          Travelog: {entry.title} <br />
          Site: {entry.site} <br />
          In {entry.country} <br /> 
          <img src={image_url} alt="Travelog" width="100" className="trav-pop-img"/>
        </Link>
      </Popup>
    </Marker>
  );
}

export default TripDetMarker;

  