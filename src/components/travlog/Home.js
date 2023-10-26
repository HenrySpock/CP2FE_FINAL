import React, { useEffect, useState, useContext } from 'react';

import '../../App.css';
import { UserContext } from '../user/UserContext';  // Adjust the path to your UserContext file accordingly

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';  
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import CustomMarkers from './CustomMarkers';
import { useNavigate } from 'react-router-dom';

import useOffsetLogic from './MarkerOffset';

// Create a TravelogEntryCard component to display individual travelog entries
// function TravelogEntryCard({ travelog }) {
//   const navigate = useNavigate();  // Import useNavigate from 'react-router-dom'

//   const handleTravelogClick = () => { 
//     navigate(`/trav_det/${travelog.travelogId}`);
//   };
  
//   return (
//       <div className="travelog-entry-card" onClick={handleTravelogClick}>
//           <div>{travelog.title}</div>
//           <div>{travelog.User.username}</div>
//           <div>{new Date(travelog.date_visited).toISOString().split('T')[0]}</div>
//       </div>
//   );
// }

// function CountryCard({ country, travelogs, isExpanded, onExpand }) {
//   return (
//       <div className={`country-card ${isExpanded ? 'expanded' : ''}`}>
//           <div className="country-title" onClick={() => onExpand(country)}>{country}</div> {/* Move onClick here */}
//           {isExpanded && travelogs.map(travelog => (
//               <TravelogEntryCard key={travelog.travelogId} travelog={travelog} />
//           ))}
//       </div>
//   );
// }

function Home() {
//   const [isCountryView, setIsCountryView] = useState(true);
//   const handleToggle = () => {
//       setIsCountryView(!isCountryView);
//   };
  
  // const mapRef = useRef();
  const { user } = useContext(UserContext);  // Access user data from UserContext
  const [sortBy, setSortBy] = useState('createdAt');
  const [travelogEntries, setTravelogEntries] = useState([]);
  const mapOptions = {
    center: [ 49.6322, 12.4628], 
    zoom: 4,  
    minZoom: 2,
    maxZoom: 18,
  };

  const worldBounds = [
    [-90, -180], 
    [90, 180]    
  ];

  const [recentTravelogs, setRecentTravelogs] = useState([]);

  const sortedTravelogEntries = [...travelogEntries].sort((a, b) => {
    switch (sortBy) {
      case 'site':
        return a.site.localeCompare(b.site);
      case 'username':
        return a.User.username.localeCompare(b.User.username);
      case 'country':
        return a.country.localeCompare(b.country);
      case 'createdAt':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  useEffect(() => {
      async function fetchTravelogEntries() {
          // your existing fetch logic
          const response = await fetch('http://localhost:5000/api/travelog-entries');
          if (response.ok) {
              const data = await response.json();
              // Assuming entries are sorted by date, take the first 3 entries for the recent list
              const recentEntries = data.slice(0, 5);
              setRecentTravelogs(recentEntries);
              // Use all entries for the map
              setTravelogEntries(data);
          }
      }
      fetchTravelogEntries();
  }, []);

  function TravelogCard({ travelog }) {
    const navigate = useNavigate();

  return (
    <div className="travelog-card" onClick={() => {
          if(user) {
              navigate(`/trav_det/${travelog.travelogId}`);
          } else {
              navigate('/auth');
          }
      }}>
          <div className="travelog-image-container">
              <img 
                  src={travelog.Images[0]?.image_url} 
                  alt={travelog.title} 
                  className="travelog-image" 
              />
          </div>
          <h3 className="travelog-site">{travelog.site}</h3>
          <h3 className="travelog-country">in {travelog.country}</h3>
          <h3 className="travelog-username">by {travelog.User.username}</h3>
          <h3 className="travelog-created">{travelog.created_at}</h3>
      </div>
    );

  }

  // Organize travelog entries by country
//   const travelogsByCountry = {};
//   travelogEntries.forEach(travelog => {
//       if (!travelogsByCountry[travelog.country]) {
//           travelogsByCountry[travelog.country] = [];
//       }
//       travelogsByCountry[travelog.country].push(travelog);
//   });

  // Manage the expanded/contracted state of the CountryCards
//   const [expandedCountry, setExpandedCountry] = useState(null);

//   const handleExpand = (country) => {
//       setExpandedCountry(expandedCountry === country ? null : country);
//   };

  const offsetTravelogEntries = useOffsetLogic(travelogEntries);
  
  return (
    <div className='Home'>
      <h2>
        {user ? `Welcome to Castle Tracker, ${user.firstName}!` : 'Welcome to Castle Tracker!'}
      </h2>
      <div className="recent-travelogs">
          {recentTravelogs.map(travelog => (
              <TravelogCard key={travelog.travelogId} travelog={travelog} />
          ))}
      </div>
      <div className="map-container">
      <MapContainer {...mapOptions} worldCopyJump={true} maxBounds={worldBounds}>
      
          <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* <CustomMarkers entries={travelogEntries} /> */}
          <CustomMarkers entries={offsetTravelogEntries} />
      </MapContainer>
      </div>
      {/* <button onClick={handleToggle}>
          {isCountryView ? 'Switch to List View' : 'Switch to Country View'}
      </button> */}
      <div className="view-container">
    {/* {isCountryView ? (
            <div className="country-cards">
                {Object.keys(travelogsByCountry).sort().map(country => (
                    <CountryCard
                        key={country}
                        country={country}
                        travelogs={travelogsByCountry[country]}
                        isExpanded={expandedCountry === country}
                        onExpand={handleExpand}
                    />
                ))}
            </div>
        ) : 
        ( */}
            <div className="sort-by-selection">
                <label htmlFor="sort-by">Sort by: </label>
                <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                >
                    <option value="site">Site</option>
                    <option value="country">Country</option>
                    <option value="username">Username</option>
                    <option value="createdAt">Newest First</option>
                                       
                </select>
            </div>
            <div className="all-travelogs-list">
                
                {/* {travelogEntries.map(travelog => ( */}
                {sortedTravelogEntries.map(travelog => (
                    <TravelogCard key={travelog.travelogId} travelog={travelog} />
                ))}
            </div>
        {/* )} */}
    </div>
    </div>
    
  );
  
}

export default Home;
   