// // AdminMarkers.js
// import React, { useEffect, useState } from 'react';
// import L from 'leaflet';
// import { Marker, Popup, useMap } from 'react-leaflet';

// function calculateIconSize(zoom) {
//   const minZoom = 2;
//   const maxZoom = 18;
//   const minSize = 20;
//   const maxSize = 40;

//   const t = (zoom - minZoom) / (maxZoom - minZoom);
//   const iconSize = (1 - t) * minSize + t * maxSize;

//   return [iconSize, iconSize];
// }

// function AdminMarkers({ entries }) {
//   // const { map } = useLeaflet();   
//   const map = useMap();
//   const [iconSize, setIconSize] = useState(calculateIconSize(map.getZoom()));

//   useEffect(() => {
//     function handleZoomEnd() {
//       const zoom = map.getZoom();
//       setIconSize(calculateIconSize(zoom));
//     }

//     map.on('zoomend', handleZoomEnd);
//     return () => {
//       map.off('zoomend', handleZoomEnd);
//     };
//   }, [map]);
  
//   console.log('entries: ', entries);

//   return (
//     <>
//       {entries.map(entry => {
//         const imageUrl = entry.Images[0]?.image_url;
//         const customIcon = new L.Icon({
//           iconUrl: imageUrl,
//           iconSize: iconSize,          
//         });

//         return (
//           <Marker position={[entry.latitude, entry.longitude]} icon={customIcon} key={entry.travelog_id}>
//             <Popup>
//               {entry.title} <br />
//               In {entry.country} <br />
//               Visited by {entry.User.username} <br />
//               On {new Date(entry.date_visited).toISOString().split('T')[0]} <br />
//               <img src={imageUrl} alt="Travelog" width="100" />
//             </Popup>
//           </Marker>
//         );
//       })}
//     </>
//   );
// }

// export default AdminMarkers;


// AdminMarkers.js
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { Marker, Popup, useMap } from 'react-leaflet';

function calculateIconSize(zoom) {
  const minZoom = 2;
  const maxZoom = 18;
  const minSize = 20;
  const maxSize = 40;

  const t = (zoom - minZoom) / (maxZoom - minZoom);
  const iconSize = (1 - t) * minSize + t * maxSize;

  return [iconSize, iconSize];
}

function AdminMarkers({ entries }) {
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
      {entries.map(entry => {
        const imageUrl = entry.Images[0]?.image_url;  // Access the image_url from the Images association
        const customIcon = new L.Icon({
          iconUrl: imageUrl,
          iconSize: iconSize,          
        });

        return (
          <Marker position={[entry.latitude, entry.longitude]} icon={customIcon} key={entry.travelog_id}>
            <Popup>
              {entry.title} <br />
              In {entry.country} <br />
              Visited by {entry.User.username} <br />
              On {new Date(entry.date_visited).toISOString().split('T')[0]} <br />
              <img src={imageUrl} alt="Travelog" width="100" />
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default AdminMarkers;
