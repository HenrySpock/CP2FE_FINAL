// DetermineLatLong.js
import React from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet' 

import './DetermineLatLong.css'

// function DetermineLatLong({ onCoordinateSelected, onCancel }) {
function DetermineLatLong({ onCoordinateSelected, onCancel, currentLat, currentLng, markerImageUrl }) {
  const mapOptions = {
    center: [49, 12],  // Default center coordinates
    zoom: 4,
    minZoom: 2,
    maxZoom: 18,
  };

  const customIcon = markerImageUrl ? new L.Icon({
    iconUrl: markerImageUrl,
    iconSize: [25, 25],  
    iconAnchor: [12, 25], 
  }) : null;

  function MapEvents() {
    useMapEvents({
      click: (event) => {
        onCoordinateSelected([event.latlng.lat, event.latlng.lng]);  // Update coordinates on map click
      },
    });
    return null;
  }

  // console.log('currentLat: ', currentLat, 'currentLng: ', currentLng)
  return (
    <div className="hublatlong-container">
      <MapContainer {...mapOptions} style={{ height: '420px', }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {currentLat && currentLng && (
          <Marker position={[currentLat, currentLng]} icon={customIcon}>
            <Popup>
              Current Location
            </Popup>
          </Marker>
        )}
        <MapEvents /> 
      </MapContainer>
      
      <button onClick={onCancel} className='cancel'>Cancel</button>
    </div>
  );
}

export default DetermineLatLong;
