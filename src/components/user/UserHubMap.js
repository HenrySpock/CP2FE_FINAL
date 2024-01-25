// UserHubMap.js 
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext'; 
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import UserHubMarkers from './UserHubMarkers';   
 
import DetermineLatLong from '../travlog/DetermineLatLong';
import './UserHub.css'
 
function UserHubMap({ travelogs, trips }) {
  // console.log('UserHubMap travelogs: ', travelogs, 'trips: ', trips)
  const { user } = useContext(UserContext); 

  const mapOptions = {
    center: user.map_center,
    zoom: 4, 
    minZoom: 2,
    maxZoom: 18,
  }; 

  const [map_center, setMapCenter] = useState(user.map_center);
  const [showMapModal, setShowMapModal] = useState(false);
  const [userZoom, setUserZoom] = useState(mapOptions.zoom);
  const [showZoomInput, setShowZoomInput] = useState(false); 

  function UpdateCenter() {
    const map = useMap();
    useEffect(() => {
      map.flyTo(map_center, userZoom);  
    }, [map]); 
  
    return null;  
  }

  const handleRecenter = async (newLat, newLng) => {
    if (!isNaN(newLat) && !isNaN(newLng)) {
      try {
        const response = await fetch(`https://lgcbe.onrender.com/travelog/api/user/${user.user_id}/map_center`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ map_center: [newLat, newLng] })
        });
        const data = await response.json();
        if (data.success) {
          setMapCenter(data.map_center);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error updating map center:', error);
      }
    }
  };

  const handleZoomChange = async (newZoomLevel) => {
    // Update the user context and database
    try {
      // console.log('newZoomLevel: ', newZoomLevel);
      const response = await fetch(`https://lgcbe.onrender.com/user/api/user/${user.user_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_zoom: newZoomLevel })  
      });
      const data = await response.json();
      if (response.ok) {
        setUserZoom(newZoomLevel);
        setShowZoomInput(false);
      } else {
        console.error('Error updating zoom level:', data.message);
      }
    } catch (error) {
      console.error('Error updating zoom level:', error);
    }
  };

  // This method will be called when coordinates are selected
  const handleCoordinateSelected = (coordinates) => {
    handleRecenter(coordinates[0], coordinates[1]);
    setShowMapModal(false);
  };

  // This method will be called to close the DetermineLatLong component
  const handleCancel = () => {
    setShowMapModal(false);
  };
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://lgcbe.onrender.com/user/api/user/${user.user_id}`);
        const userData = await response.json();
        if (response.ok) {  
          // console.log('User data:', userData);
          setMapCenter(userData.map_center);
          setUserZoom(userData.user_zoom);
        } else {
          console.error('Error fetching user data:', userData.message);
        }
      } catch (error) {
        console.error('Network error when fetching user data:', error);
      }
    };
    fetchUserData();
  }, [user.user_id]);

  return (
    <div>
      <div>
        {!showMapModal && (
          <div className="userhub-map">
            <MapContainer {...mapOptions}  style={{ height: '420px',}}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <UpdateCenter /> 
              <UserHubMarkers travelogs={travelogs} trips={trips} />
            </MapContainer>
          </div>
        )} 

  

      {!showMapModal && (
        <div className='userhubmap-btn-cont'>
          <>
            <div className='tooltip recenter-tooltip'>                            
              {user.tooltips && (
                <div className='trip-det-coordinate'>
                                <span className='tooltip-icon-reverse userhub-recenter-tooltip'>?</span> 
                                <span className='tooltip-text'>
                                You can click / drag and zoom this map like normal. Once you click / release, the point where you clicked determines the latitude and longitude. Default position is lat 45, long 12.
                                </span>
                </div>
              )}
            </div>
            <button onClick={() => setShowMapModal(true)} className='userhubmap-btn'>Recenter Map</button>
          </>
          
          <button 
              onClick={() => handleRecenter(49.24485882196211, 15.113454263731)} 
              className='userhubmap-btn'
            >
              Default Position
          </button>

          <button onClick={() => setShowZoomInput(!showZoomInput)} className='userhubmap-btn'>Set Zoom Level</button>
        </div>
      )} 

      </div>
        {showMapModal && (
          <DetermineLatLong
            onCoordinateSelected={handleCoordinateSelected}
            onCancel={handleCancel} 
          />
        )}

 

      {showZoomInput && (
        <div className='zoomlevel-controls'>
          <p>
            <label htmlFor="userZoom">Magnification:</label>
          </p>
          <input
            id="userZoom"
            type="number"
            step="1"
            min={mapOptions.minZoom}
            max={mapOptions.maxZoom}
            value={userZoom}
            onChange={(e) => setUserZoom(parseInt(e.target.value, 10))}
          />
          <button onClick={() => handleZoomChange(userZoom)} className='zoomlevel-btn'>Update</button>
          <button onClick={() => handleZoomChange(4)} className='zoomlevel-btn'>Default</button>
        </div>
      )} 
    </div>
  );
}

export default UserHubMap;
 
  