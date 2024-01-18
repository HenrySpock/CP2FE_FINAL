// ProfileMap.js
import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ProfileMarkers from './ProfileMarkers';  



function ProfileMap({ travelogs, trips, userZoom }) {
  const [mapOptions] = useState({
    center: [ 49, 12 ],
    zoom: userZoom, 
    minZoom: 2,
    maxZoom: 18,
  }); 

  return (
      <div className="profile-map">
        <MapContainer {...mapOptions} style={{ height: '420px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          /> 
          <ProfileMarkers travelogs={travelogs} trips={trips} />
        </MapContainer>
      </div>
  );
}

export default ProfileMap;
