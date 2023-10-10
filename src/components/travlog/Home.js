import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';  
import '../../App.css';   

function Home() {
  const mapRef = useRef();
  const mapOptions = {
    center: [0, 0],  // Center of the globe
    zoom: 2,  
    minZoom: 2,
    maxZoom: 18,
  };

  // useEffect(() => {
  //   const map = mapRef.current;
  //   if (map != null) {
  //     setTimeout(() => {
  //       map.leafletElement.invalidateSize();
  //     }, 250);
  //   }
  // }, []);

  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user'));
  console.log('userData: ', userData)

  return (
    <div>
      <div>
        <h2>
          Welcome to Castle Tracker
          {userData ? `, ${userData.username}!` : '!'}
        </h2>
        {/* Add other content or links here */}
      </div>
      <div className="map-container">
        <MapContainer {...mapOptions} ref={mapRef}>

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            noWrap={true}
          />
          {/* Add any additional map layers or markers here */}
        </MapContainer>
      </div>
    </div>
  );
}

export default Home;
 
  