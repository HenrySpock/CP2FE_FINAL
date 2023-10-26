import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../user/UserContext';  // Adjust the import path accordingly
import { Link } from 'react-router-dom';

function TravelogFilter() {
  const { user } = useContext(UserContext);
  const [filters, setFilters] = useState({
    yourTravelogs: true,
    friendsTravelogs: false,
    followingTravelogs: false,
    followedTravelogs: false
  });
  const [travelogs, setTravelogs] = useState([]); 

  const [sortBy, setSortBy] = useState('createdAt'); 

  const fetchTravelogs = async (filterType) => {
    const url = `http://localhost:5000/api/travelogs/filter?filterType=${filterType}&userId=${user.user_id}`;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {  // Check HTTP status code
        return response.data;
      } else {
        console.error(`Error fetching ${filterType}:`, response.statusText);
        return [];
      }
    } catch (error) {
      console.error(`Error fetching ${filterType}:`, error);
      return [];
    }
  }; 

  useEffect(() => {
    const fetchAndSetYourTravelogs = async () => {
      let newTravelogs = [];
      let travelogIds = new Set();

      const fetchData = async (filterType) => {
        const data = await fetchTravelogs(filterType);
        for (const travelog of data) {
          if (!travelogIds.has(travelog.travelogId)) {  // Check if travelog ID is already in the Set
            newTravelogs.push(travelog);
            travelogIds.add(travelog.travelogId);  // Add travelog ID to the Set
          }
        }
      };

      if (filters.yourTravelogs) {
        await fetchData('yourTravelogs');
      }
      if (filters.friendsTravelogs) {
        await fetchData('friendsTravelogs');
      }
      if (filters.followingTravelogs) {
        await fetchData('followingsTravelogs');
      }
      if (filters.followedTravelogs) {
        await fetchData('followersTravelogs');
      }

      // if (filters.yourTravelogs) {
      //   const yourData = await fetchTravelogs('yourTravelogs');
      //   newTravelogs = [...newTravelogs, ...yourData];
      // }
      // if (filters.friendsTravelogs) {
      //   const friendsData = await fetchTravelogs('friendsTravelogs');
      //   newTravelogs = [...newTravelogs, ...friendsData];
      // }
      // if (filters.followingTravelogs) {
      //   const followingData = await fetchTravelogs('followingsTravelogs');  
      //   newTravelogs = [...newTravelogs, ...followingData];
      // }
      // if (filters.followedTravelogs) {
      //   const followedData = await fetchTravelogs('followersTravelogs'); 
      //   newTravelogs = [...newTravelogs, ...followedData];
      // }

      // newTravelogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      // switch (sortBy) {
      //   case 'username':
      //     newTravelogs = [...travelogs].sort((a, b) => a.userId - b.userId);
      //     break;
      //   case 'country':
      //     newTravelogs.sort((a, b) => a.country.localeCompare(b.country));
      //     break;
      //   case 'createdAt':
      //   default:
      //     newTravelogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      // }
      newTravelogs.sort((a, b) => {
        switch (sortBy) {
          case 'username':
            // Assuming you have a username property on each travelog
            // return a.userId.localeCompare(b.userId);
            return a.userId - b.userId;
            
          case 'country':
            return a.country.localeCompare(b.country);
          case 'createdAt':
          default:
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });

      setTravelogs(newTravelogs);
    };

    fetchAndSetYourTravelogs();
  }, [filters, user, sortBy]);

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: checked }));
  };

  return (
    <div>
      <h2>Travel Logs</h2>
      <div className="sort-by-selection">
        <label htmlFor="sort-by">Sort by: </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="createdAt">Newest First</option>
          <option value="username">Username</option>
          <option value="country">Country</option>
        </select>
      </div>
      {/* Checkbox rendering... */}
      <div className="filter-checkboxes">
        <label>
          <input
            type="checkbox"
            name="yourTravelogs"
            checked={filters.yourTravelogs}
            onChange={handleFilterChange}
          />
          Your Travelogs
        </label>
        <label>
          <input
            type="checkbox"
            name="friendsTravelogs"
            checked={filters.friendsTravelogs}
            onChange={handleFilterChange}
          />
          Friend's Travelogs
        </label>
        <label>
          <input
            type="checkbox"
            name="followingTravelogs"
            checked={filters.followingTravelogs}
            onChange={handleFilterChange}
          />
          Following Travelogs
        </label>
        <label>
          <input
            type="checkbox"
            name="followedTravelogs"
            checked={filters.followedTravelogs}
            onChange={handleFilterChange}
          />
          Followed Travelogs
        </label>
        {/* ... other checkboxes */}
      </div>
      <div>
        
        {travelogs.map((travelog, index) => (
          <Link key={travelog.travelogId} to={`/trav_det/${travelog.travelogId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="hub-mini-card">
                <div className="hub-mini-img-div"> 
                {travelog.Images[0] && (  
                    <img 
                        className='hub-mini-img'
                        src={travelog.Images[0].image_url} 
                        alt={`Travelog Image 1`}
                    />
                )}
                </div>
                <div className='hub-mini-card-text'>
                  <h3>{travelog.title}</h3>
                  <p>{travelog.site}</p>
                  <p>Visited On {new Date(travelog.dateVisited).toLocaleDateString('en-CA')}</p>
                  {travelog.User && travelog.userId !== user.user_id && (
                    <p>by <Link to={`/public_profile/${travelog.User.username}`}>{travelog.User.username}</Link></p>
                  )}
                  {travelog.userId === user.user_id && (
                    <p>by <Link to={`/public_profile/${user.username}`}>{user.username}</Link></p>
                  )}
                  <p>In {travelog.city}, {travelog.country}</p> 
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TravelogFilter;

 