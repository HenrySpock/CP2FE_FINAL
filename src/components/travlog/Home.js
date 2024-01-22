import React, { useEffect, useState, useContext, useCallback } from 'react';

import '../../App.css';
import { UserContext } from '../user/UserContext';  
 
import 'leaflet/dist/leaflet.css';  
import { MapContainer, TileLayer } from 'react-leaflet';

import CustomMarkers from './CustomMarkers';
import { useNavigate } from 'react-router-dom';
 

import './Home.css'

import MapSorting from '../user/MapSorting'

function Home() { 

  const { user } = useContext(UserContext);  // Access user data from UserContext

  const [sortBy, setSortBy] = useState('created_at');
  const [travelogEntries, setTravelogEntries] = useState([]);
  const [recentTravelogs, setRecentTravelogs] = useState([]);

  const [tripEntries, setTripEntries] = useState([]); 

  const [filteredTravelogs, setFilteredTravelogs] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [newestUser, setNewestUser] = useState(null);
  const [newestTrip, setNewestTrip] = useState(null);
  const [newestTravelog, setNewestTravelog] = useState(null);
  const navigate = useNavigate();

  const [sortByTrip, setSortByTrip] = useState('created_at');

  // PAGINATE
  const itemsPerPage = 64;
  const [currentTravelogPage, setCurrentTravelogPage] = useState(1);
  const [currentTripPage, setCurrentTripPage] = useState(1);
  // PAGINATE
  const totalTravelogPages = Math.ceil(travelogEntries.length / itemsPerPage);
  const totalTripPages = Math.ceil(tripEntries.length / itemsPerPage);

  // PAGINATE 
  const handleTravelogPageChange = (newPage) => {
    setCurrentTravelogPage(newPage);
  };

  // PAGINATE
  const handleTripPageChange = (newPage) => {
    setCurrentTripPage(newPage);
  };
 

  const handleVisibilityChange = useCallback((newFilteredTravelogs, newFilteredTrips) => {
    setFilteredTravelogs(newFilteredTravelogs);
    setFilteredTrips(newFilteredTrips);
  }, []);

  const mapOptions = {
    center: [ 49.6322, 12.4628 ], 
    zoom: 4,  
    minZoom: 2,
    maxZoom: 18,
  };

  const worldBounds = [
    [-90, -180], 
    [90, 180]    
  ];

  const sortedTravelogEntries = [...travelogEntries].sort((a, b) => {
    switch (sortBy) {
      case 'site':
        return a.site.localeCompare(b.site);
      case 'username':
        return a.User.username.localeCompare(b.User.username);
      case 'country':
        return a.country.localeCompare(b.country);
      case 'created_at':
      default:
        return new Date(b.created_at) - new Date(a.created_at);
    }
  });

  const sortedTripEntries = [...tripEntries].sort((a, b) => {
    // console.log('tripEntries: ', tripEntries)
    switch (sortByTrip) { 
      case 'username':
        return a.username.localeCompare(b.username); 
      case 'created_at':
      default:
        return new Date(b.created_at) - new Date(a.created_at);
    }
  });
  
  useEffect(() => {
    async function fetchTravelogEntries() {
      let url = 'https://lgcbe.onrender.com/travelog/api/travelog-entries';
      // Append user ID as a query parameter if the user is logged in
      if (user) {
        url += `?userId=${user.user_id}`;
      }
  
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          // console.log('this is the travelog data response: ', data)
          setTravelogEntries(data);
          if (!user) {
            const recentEntries = data.slice(0, 5);
            setRecentTravelogs(recentEntries);
          }
        }
      } catch (error) {
        console.error('Error fetching travelog entries:', error);
      }
    }
  
    fetchTravelogEntries();
  }, [user]); 

  useEffect(() => {
    const sortTrips = (trips) => {
      return [...trips].sort((a, b) => {
        switch (sortByTrip) {
          case 'username': 
            return (a.User?.username || '').localeCompare(b.User?.username || '');
          case 'created_at':
          default:
            return new Date(b.created_at) - new Date(a.created_at);
        }
      });
    };

    async function fetchTrips() {
      if (user) {
        try {
          const response = await fetch(`https://lgcbe.onrender.com/trip/api/trips?user_id=${user.user_id}`);
          if (response.ok) {
            const tripsData = await response.json();
            // Sort trips immediately after fetching
            const sortedData = sortTrips(tripsData);
            setTripEntries(sortedData); // Sets all sorted trips 
          }
        } catch (error) {
          console.error('Failed to fetch trips:', error);
        }
      }
    }
  
    fetchTrips();
  }, [user, sortByTrip]); 



  function TravelogCard({ travelog }) { 

  return (
    <div className="home-trav-card" onClick={() => {
          if(user) {
              navigate(`/trav_det/${travelog.travelog_id}`);
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
          <p className="travelog-detail">{travelog.site}</p>
          <p className="travelog-detail">in {travelog.country}</p>
          <p className="travelog-detail">by {travelog.User.username}</p> 
          <p className="travelog-detail">on {new Date(travelog.date_visited).toLocaleDateString()}</p>
          <p className="travelog-detail">written {new Date(travelog.created_at).toLocaleDateString()}</p>
      </div>
    );

  } 
 
  
  function TripCard({ trip }) { 
  
    return (
      <div className="home-trip-card" onClick={() => {
            if(user) {
                navigate(`/trip_det/${trip.trip_id}`);
            } else {
                navigate('/auth');
            }
        }}>
            <div className="trip-image-container">
                <img 
                    src={trip.image_url} 
                    alt={trip.title} 
                    className="trip-image" 
                />
            </div>
            <p className="trip-detail">"{trip.title}"</p>
            <p className="trip-detail">by {trip.username}</p>
            <p className="trip-detail">{trip.location}</p> 
            <p className="trip-detail">Departure: {new Date(trip.date_of_departure).toLocaleDateString()}</p>
            <p className="trip-detail">Return: {new Date(trip.date_of_return).toLocaleDateString()}</p>
        </div>
    );
  }

  

  const handleSurpriseMe = () => {
    if (travelogEntries.length > 0) {
      const randomIndex = Math.floor(Math.random() * travelogEntries.length);
      const randomTravelog = travelogEntries[randomIndex];
      navigate(`/trav_det/${randomTravelog.travelog_id}`);
    } else { 
      // console.log('No travelog entries available');
    }
  };

  const handleOtherViews = () => { 
      navigate(`/homeother`); 
  };

  // Fetch newest user 
  const fetchNewestUser = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/recent/api/users/newest');
      if (!response.ok) throw new Error('Network response was not ok');
      const user = await response.json();
      setNewestUser(user); // Update state with the fetched user
    } catch (error) {
      console.error('Error:', error);
    }
  };


  // Fetch newest trip 
  const fetchNewestTrip = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/recent/api/trips/newest');
      if (!response.ok) throw new Error('Network response was not ok');
      const trip = await response.json();
      setNewestTrip(trip); // Update state with the fetched trip
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Navigate to public profile or auth: 
  function handleRecentUserCardClick() {
    if (user) {  
      navigate(`/public_profile/${newestUser.username}`);
    } else {
      navigate('/auth');
    }
  }

  // Fetch newest travelog 
  const fetchNewestTravelog = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/recent/api/travelogs/newest');
      if (!response.ok) throw new Error('Network response was not ok');
      if (response.status === 204) {
        console.log('No travelogs found');
        return;
      }
      const travelog = await response.json();
      setNewestTravelog(travelog); // Update state with the fetched travelog
    } catch (error) {
      console.error('Error:', error);
    }
  }; 

  

  useEffect(() => {
    fetchNewestUser();
    fetchNewestTrip();
    fetchNewestTravelog(); 
  }, []);

  // useEffect(() => {
    // console.log('Newest User:', newestUser);
    // console.log('Newest Trip:', newestTrip);
    // console.log('Newest Travelog:', newestTravelog);
  // }, [newestUser, newestTrip, newestTravelog]);

  return (
    <div className='Home'>
      <div className='home-center'>
        <div>
        <h2>
          {user ? `Let's go Castling, ${user.username}!` : `Let's go Castling!`}
        </h2>
        </div>

        <div className='main-button-container'>
          {user && (
            <button onClick={handleSurpriseMe} className='home-btn'>Surprise Me!</button>
          )} 
          {user && (
            <button onClick={handleOtherViews} className='home-btn'>Other Travelog Views</button>
          )} 
        </div>
      </div>

      <div className="home-map-row">
        <div className="home-map-col hmcl"> 

          <div className='home-col-div'>
            <h2>Newest Traveler</h2>
            {newestUser &&
              <div className="recent-card" onClick={handleRecentUserCardClick}>
                <img src={newestUser.avatar} alt={`${newestUser.username}'s avatar`} />
                <p className='recent-username-text'>{newestUser.username}</p>
              </div>
            }
          </div>
          

          <div className='home-col-div'><h2>Sort Map</h2>
            <div>
              <MapSorting 
                travelogs={travelogEntries} // Pass the original, unfiltered travelogs
                trips={tripEntries}         // Pass the original, unfiltered trips
                onVisibilityChange={handleVisibilityChange} // Function to handle visibility change
              />
            </div>
          </div>

        </div>
          <div className="map-div">
            <MapContainer {...mapOptions} worldCopyJump={true} maxBounds={worldBounds}>
            
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                /> 
                <CustomMarkers travelogEntries={filteredTravelogs} tripEntries={filteredTrips} />
            </MapContainer>
          </div> 
 
        <div className="home-map-col hmcr">
          


          <div className='home-col-div'><h2>Newest Trip</h2>
            <div onClick={() => navigate(`/trip_det/${newestTrip.trip_id}`)}>
              {newestTrip &&
                <div className="recent-card">
                    <img src={newestTrip.image_url} alt={`${newestTrip.title}`} /> 
                  <div>
                    <p className='recent-username-text'>{newestTrip.title}</p> 
                  </div>
                </div>
              }
            </div>
          </div>

          <div className='home-col-div'><h2>Newest Travelog</h2>
            <div onClick={() => navigate(`/trav_det/${newestTravelog.travelog_id}`)}>
            {newestTravelog &&
                <div className="recent-card">
                  <img src={newestTravelog.Images[0].image_url} alt={`${newestTravelog.Images[0].title}`} /> 
                  <div>
                    <p className='recent-username-text'>{newestTravelog.title}</p> 
                  </div>
                </div>
              }
            </div>
          </div>

 

        </div>
      </div>





      {!user && (
        <div className="recent-container">
          <h2 className="recent-trav-title">Recent Travelogs</h2>
          <div className="recent-travelogs">
            {recentTravelogs.map(travelog => (
              <TravelogCard key={travelog.travelog_id} travelog={travelog} />
            ))}
          </div>
        </div>
      )}
       
      {user && (
        <div className="view-container"> 

          <h2 className='home-center home-subheading'>All Trips</h2> 

          <div className='view-controls'>
            <div className="sort-by-selection">
              <label htmlFor="sort-by-trip">Sort trips by: </label>
              <select
                id="sort-by-trip"
                value={sortByTrip}
                onChange={(event) => setSortByTrip(event.target.value)}
              >
                <option value="username">Username</option>
                <option value="created_at">Newest First</option>
              </select>
            </div>

            <div className="pagination-controls">
              <button onClick={() => handleTripPageChange(currentTripPage - 1)} disabled={currentTripPage === 1}>
                Previous
              </button>
              <span>Page {currentTripPage} of {totalTripPages}</span>
              <button onClick={() => handleTripPageChange(currentTripPage + 1)} disabled={currentTripPage === totalTripPages}>
                Next
              </button>
            </div>
          </div>
 
          <div className="home-trips-list">
            {sortedTripEntries.slice((currentTripPage - 1) * itemsPerPage, currentTripPage * itemsPerPage).map(trip => (
              <TripCard key={trip.trip_id} trip={trip} />
            ))}
          </div> 

          <h2 className='home-center home-subheading'>All Travelogs</h2>

          <div className='view-controls'>
            <div className="sort-by-selection">
                <label htmlFor="sort-by">Sort Travelogs by: </label>
                <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                >
                    <option value="site">Site</option>
                    <option value="country">Country</option>
                    <option value="username">Username</option>
                    <option value="created_at">Newest First</option>                                       
                </select>
            </div>

            <div className="pagination-controls">
              <button onClick={() => handleTravelogPageChange(currentTravelogPage - 1)} disabled={currentTravelogPage === 1}>
                Previous
              </button>
              <span>Page {currentTravelogPage} of {totalTravelogPages}</span>
              <button onClick={() => handleTravelogPageChange(currentTravelogPage + 1)} disabled={currentTravelogPage === totalTravelogPages}>
                Next
              </button>
            </div>
          </div>

          <div className="home-travelogs-list">
            {sortedTravelogEntries.slice((currentTravelogPage - 1) * itemsPerPage, currentTravelogPage * itemsPerPage).map(travelog => (
              <TravelogCard key={travelog.travelog_id} travelog={travelog} />
            ))}
          </div>  




        </div>
      )}

    </div>
    
  );
  
}

export default Home;
    