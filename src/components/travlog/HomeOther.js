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
 
    const [secondarySortBy, setSecondarySortBy] = useState('created_at');

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
        const response = await fetch(`https://lgcbe.onrender.com/travelog/api/travelog-entries?user_id=${user.user_id}`);
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
      console.log(displayedTravelogs)
  }, [
    // user, 
    fetchTravelogEntries]); // Depend on user object to refetch if it changes
  
    const handleTypeChange = (filteredTravelogs) => {
        setDisplayedTravelogs(filteredTravelogs);
        console.log("Displayed Travelogs after filtering from home other:", displayedTravelogs);
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
    
    // Apply secondary sorting
    const sortedCurrentItems = currentItems.sort((a, b) => {
      switch (secondarySortBy) {
        case 'site':
          return a.site.localeCompare(b.site);
        case 'username':
          return a.User.username.localeCompare(b.User.username);
        case 'country':
          return a.country.localeCompare(b.country);
        case 'oldest_first':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'created_at':
        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });

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
                <div className="sort-by-selection">
                  <label htmlFor="secondary-sort-by">Sort Travelogs by: </label>
                  <select
                    id="secondary-sort-by"
                    value={secondarySortBy}
                    onChange={(e) => setSecondarySortBy(e.target.value)}
                  >
                    <option value="site">Site</option>
                    <option value="country">Country</option>
                    <option value="username">Username</option>
                    <option value="created_at">Newest First</option>
                    <option value="oldest_first">Oldest First</option>
                  </select>
                </div>
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
                  {sortedCurrentItems.map(travelog => (                   
                        <TravelogCard key={travelog.travelog_id} travelog={travelog} />                  
                  ))}
              </div>
            </div>

        </div>
    );
}

export default HomeOther;
