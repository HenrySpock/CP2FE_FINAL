import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../user/UserContext'; 
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
 
import CustomMarkers from '../travlog/CustomMarkers';

import useOffsetLogic from '../travlog/MarkerOffset';

function AdminPanel() {
  const { isAdmin } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [reportedEntries, setReportedEntries] = useState([]);

  const offsetReportedEntries = useOffsetLogic(reportedEntries);
  
  useEffect(() => {
    async function fetchReportedEntries() {
      try {
        const response = await axios.get('http://localhost:5000/api/reported-travelogs');
        setReportedEntries(response.data);
      } catch (error) {
        console.error('Error fetching reported entries:', error);
      }
    }

    fetchReportedEntries();
  }, []);

  if (!isAdmin) {
    return <div>You do not have permission to view this page.</div>;
  }

  const capitalizedUsername = user.username.charAt(0).toUpperCase() + user.username.slice(1);

  

  return (
    <div>
      <div>
        <div>Welcome, Administrator <strong>{capitalizedUsername}</strong>.</div>
        {/* Admin-only content here */}
        {reportedEntries.length > 0 && (
          <MapContainer 
            center={[reportedEntries[0].latitude, reportedEntries[0].longitude]}  // Center based on reported entry
            zoom={4}
            minZoom={2}
            maxZoom={18}
            style={{ height: "300px", width: "30%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />  
            {/* <CustomMarkers entries={reportedEntries} /> */}
            <CustomMarkers entries={offsetReportedEntries} />
          </MapContainer>
        )}
      </div>
      
      <div>
        <h2>Reported Travel Logs</h2>
        {reportedEntries.map((entry, index) => (
          <Link key={index} to={`/trav_det/${entry.travelogId}`} style={{ textDecoration: 'none', color: 'inherit' }}> 
          <div className="hub-mini-card">
            <div className="hub-mini-img-div"> 
              {entry.Images[0] && (  
                  <img 
                      className='hub-mini-img'
                      src={entry.Images[0].image_url} 
                      alt={`Travelog Image 1`}
                  />
              )}
            </div>
            <div className='hub-mini-card-text'>
              <h3>{entry.title}</h3>
              <p>{entry.site}</p>
              <p>Visited On {new Date(entry.dateVisited).toLocaleDateString('en-CA')}</p>
              <p>In {entry.city}, {entry.country}</p> 
            </div>
          </div>
        </Link>
        ))}
      </div>
    </div>
  );
  
}

export default AdminPanel;

