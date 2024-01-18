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

function CustomMarkers({ travelogEntries, tripEntries }) {
  // console.log('travelogEntries: ', travelogEntries)
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

  // console.log('travelogEntries: ', travelogEntries);

  return (
    <>
      {travelogEntries && travelogEntries.length > 0 && travelogEntries.map(entry => {
 

          const imageUrl = entry.Images[0]?.image_url;
          const customIcon = new L.Icon({
            iconUrl: imageUrl,
            iconSize: iconSize,          
          });

          return (
            <Marker position={[entry.latitude, entry.longitude]} icon={customIcon} key={entry.travelog_id}> 
              <Popup>
                <Link to={`/trav_det/${entry.travelogId}`} className="custom-popup">
                  <Link to={`/public_profile/${entry.User.username}`}>
                    <span> {entry.User.username}</span>
                  </Link> <br /> 
                  <span>Travelog: {entry.title}</span> <br />
                  <span>In {entry.country}</span> <br />  

                  <img src={imageUrl} alt="Travelog" width="75" className="trav-pop-img" />
                </Link>
              </Popup>
            </Marker>
          );

        // })}

      })}

      {tripEntries && tripEntries.length > 0 && tripEntries.map(trip => { 
 
          
          const imageUrl = trip.image_url;
          const customIcon = new L.Icon({
            iconUrl: imageUrl,
            iconSize: iconSize,
          });

          return (
            <Marker position={[trip.latitude, trip.longitude]} icon={customIcon} key={trip.trip_id}>
              <Popup>
                <Link to={`/trip_det/${trip.trip_id}`} className="custom-popup">
                  <Link to={`/public_profile/${trip.username}`}>
                    <span> {trip.username}</span>
                  </Link> <br />  
                  <span>Trip: {trip.title}</span> <br /> 
                  <img src={imageUrl} alt="Trip" width="75" className="trip-pop-img" />
                </Link>
              </Popup>
            </Marker>
          );
 

      })}

    </>
  );
}

export default CustomMarkers;
