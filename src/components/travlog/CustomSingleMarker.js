// // CustomSingleMarker.js
// import React from 'react';
// import { Marker, Popup } from 'react-leaflet';

// function CustomSingleMarker({ entry }) {
//   return (
//     <Marker position={[entry.latitude, entry.longitude]}>
//       <Popup>
//         {entry.title}
//       </Popup>
//     </Marker>
//   );
// }

// export default CustomSingleMarker;


// CustomSingleMarker.js
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

function CustomSingleMarker({ entry }) {
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

  const imageUrl = entry.Images[0]?.image_url;
  const customIcon = new L.Icon({
    iconUrl: imageUrl,
    iconSize: iconSize,
  });

  return (
    <Marker position={[entry.latitude, entry.longitude]} icon={customIcon}>
      <Popup>
        {entry.title} <br />
        In {entry.country} <br /> 
        <img src={imageUrl} alt="Travelog" width="100" />
      </Popup>
    </Marker>
  );
}

export default CustomSingleMarker;
