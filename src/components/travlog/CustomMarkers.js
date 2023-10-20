// CustomMarkers.js
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

function CustomMarkers({ entries }) {
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

  console.log('entries: ', entries);

  return (
    <>
      {entries.map(entry => {
        const imageUrl = entry.Images[0]?.image_url;
        const customIcon = new L.Icon({
          iconUrl: imageUrl,
          iconSize: iconSize,          
        });

        return (
          <Marker position={[entry.latitude, entry.longitude]} icon={customIcon} key={entry.travelog_id}>
            {/* <Popup>
              {entry.title} <br />
              In {entry.country} <br />
              Visited by {entry.User.username} <br />
              On {new Date(entry.date_visited).toISOString().split('T')[0]} <br />
              <img src={imageUrl} alt="Travelog" width="100" />
            </Popup> */}
            <Popup>
              <Link to={`/trav_det/${entry.travelogId}`} className="custom-popup">
                <Link to={`/public_profile/${entry.User.username}`}>
                  <span>{entry.User.username}</span>
                </Link> <br /> 
                <span>{entry.title}</span> <br />
                <span>In {entry.country}</span> <br /> 
                {/* Visited by {entry.User.username} <br /> */}

                <img src={imageUrl} alt="Travelog" width="100" />
              </Link>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default CustomMarkers;
