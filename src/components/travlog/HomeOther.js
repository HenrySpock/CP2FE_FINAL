import React, { useState, useEffect, useContext, useCallback } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapSortingOther from '../user/MapSortingOther';  
import './Home.css';
import HomeOtherMarkers from './HomeOtherMarkers'
import { UserContext } from '../user/UserContext';
import { useNavigate } from 'react-router-dom';
import { applyMarkerOffset } from '../travlog/MarkerOffset'

function HomeOther() {
    const [travelogEntries, setTravelogEntries] = useState([]);
    const [displayedTravelogs, setDisplayedTravelogs] = useState([]);
    
    const { user } = useContext(UserContext); 
    const navigate = useNavigate();
 
    // Pagination states
    const itemsPerPage = 64;  
    const [currentPage, setCurrentPage] = useState(1); 
    const totalPages = Math.ceil(displayedTravelogs.length / itemsPerPage);

    // Function to change page
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }; 

  const fetchTravelogEntries = useCallback(async () => { 
    if (!user || !user.user_id) return;

    try {
        const response = await fetch(`https://lgcbe.onrender.com/travelog/api/travelog-entries?userId=${user.user_id}`);
        const data = await response.json();
        const offsetTravelogs = applyMarkerOffset(data);

        setTravelogEntries(offsetTravelogs); 
        setDisplayedTravelogs(offsetTravelogs); 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}, [user]);

    useEffect(() => {  
      fetchTravelogEntries();
      // console.log(displayedTravelogs)
  }, [
    // user, 
    fetchTravelogEntries]); // Depend on user object to refetch if it changes
  

    const handleTypeChange = (filteredTravelogs) => {
        setDisplayedTravelogs(filteredTravelogs);
    };

    const mapOptions = {
        center: [49.6322, 12.4628],
        zoom: 4,
        minZoom: 2,
        maxZoom: 18,
    };

    if (!user) {
      // console.log('Waiting for user data...');
      return <div>Loading...</div>;   
    }

    // Get current items for the page 
    const currentItems = displayedTravelogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    function TravelogCard({ travelog }) { 
  
    return (
      <div className="other-trav-card" onClick={() => {
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

    return (
        <div className="Home">
          <h1 className='other-title'>Other Travelog Views</h1>
          <div className='other-sort-row'>
            <div className='other-sort-div'>
              <h2>Sorting Criteria</h2>
              <MapSortingOther onTypeChange={handleTypeChange} travelogs={travelogEntries} />
            </div>

            <div className='other-views'>
              <MapContainer {...mapOptions} style={{ height: '400px', width: '100%' }}>
                  <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  /> 
                  <HomeOtherMarkers travelogEntries={displayedTravelogs} />
              </MapContainer>
            </div>
          </div>

            <div className='other-view-container'>
                <h2 className='other-title'>Sorted Travelogs</h2>
                {/* Pagination Controls */}
                <div className="other-pagination-controls">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                      Previous
                  </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                      Next
                  </button>
                </div> 

              {/* Render Travelog Cards */}
              <div className="other-travelogs-list">
                  {currentItems.map(travelog => (                   
                        <TravelogCard key={travelog.travelog_id} travelog={travelog} />                  
                  ))}
              </div>
            </div>

        </div>
    );
}

export default HomeOther;
