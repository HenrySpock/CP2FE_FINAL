// UserHubMarkers.js
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
 
function UserHubMarkers({ travelogs, trips }) {
  // console.log('Travelogs in UserHubMarkers: ', travelogs, 'Trips in UserHubMarkers:', trips);
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

  // console.log('travelogs: ', travelogs);

  return (
    <>
      {/* Render markers for travelogs */}
      {/* {console.log('travelogs in jsx of userhubmarkers: ', travelogs)} */}
      {travelogs.map(travelog => {
        const imageUrl = travelog.Images[0]?.image_url;  
        const customIcon = new L.Icon({
          iconUrl: imageUrl,
          iconSize: iconSize,          
        });

        return (
          <Marker position={[travelog.latitude, travelog.longitude]} icon={customIcon} key={travelog.travelog_id}>
             <Popup className="travelog-popup">
               <Link to={`/trav_det/${travelog.travelog_id}`} className="custom-popup">
                 <Link to={`/public_profile/${travelog.username}`}>
                   <span>{travelog.username}</span>
                 </Link> <br /> 
                 <span>Travelog: {travelog.title}</span> <br />
                 <span>In {travelog.country}</span> <br />  

                 <img src={imageUrl} alt="Travelog" width="100" className="trav-pop-img" />
               </Link>
             </Popup>
          </Marker>
        );
      })}

      {/* Render markers for trips */}
      {trips.map(trip => {
        const imageUrl = trip.image_url; 
        const tripIcon = new L.Icon({
          iconUrl: imageUrl,
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

                 <img src={imageUrl} alt="Trip" width="100" className="trip-pop-img" />
              </Link> 
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default UserHubMarkers;

