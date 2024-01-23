// ProfileMarkers.js
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

function ProfileMarkers({ travelogs, trips }) {
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

  return (
    <>
      {/* Render markers for profile user's travelogs */}
      {travelogs.map(travelog => {
        const image_url = travelog.Images[0]?.image_url;  
        const customIcon = new L.Icon({
          iconUrl: image_url || 'default-icon.png',  
          iconSize: iconSize,          
        });

        return (
          <Marker position={[travelog.latitude, travelog.longitude]} icon={customIcon} key={travelog.travelog_id}>
             <Popup>
               <Link to={`/trav_det/${travelog.travelogId}`} className="custom-popup">
                 <Link to={`/public_profile/${travelog.username}`}>
                   <span>{travelog.username}</span>
                 </Link> <br /> 
                 <span>Travelog: {travelog.title}</span> <br />
                 <span>In {travelog.country}</span> <br />
                 {image_url && <img src={image_url} alt="Travelog" width="100" className="trav-pop-img" />}
               </Link>
             </Popup>
          </Marker>
        );
      })}

      {/* Render markers for profile user's trips */}
      {trips.map(trip => {
        const image_url = trip.image_url; 
        const tripIcon = new L.Icon({
          iconUrl: image_url || 'default-icon.png', 
          iconSize: iconSize,
        });

        return (
          <Marker position={[trip.latitude, trip.longitude]} icon={tripIcon} key={trip.trip_id}>
            <Popup>
              <Link to={`/trip_det/${trip.trip_id}`} className="custom-popup">
                <Link to={`/public_profile/${trip.username}`}>
                  <span>{trip.username}</span>
                </Link> <br /> 
                <span>Trip: {trip.title}</span> <br />
                {image_url && <img src={image_url} alt="Trip" width="100" className="trip-pop-img" />}
              </Link>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default ProfileMarkers;
