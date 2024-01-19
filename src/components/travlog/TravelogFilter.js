import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import axios from 'axios';
import { UserContext } from '../user/UserContext';   
import { Link } from 'react-router-dom';

import '../trips/TripTravFilter.css'

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
  const [filterClicked, setFilterClicked] = useState(false);
  const bottomRef = useRef(null);

  const fetchTravelogs = useCallback(async (filterType) => {
    const url = `${API_BASE_URL}/travelog/api/travelogs/filter?filterType=${filterType}&userId=${user.user_id}`;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {  
        return response.data;
      } else {
        console.error(`Error fetching ${filterType}:`, response.statusText);
        return [];
      }
    } catch (error) {
      console.error(`Error fetching ${filterType}:`, error);
      return [];
    }
  }, [user.user_id]); 

  useEffect(() => {
    if (filterClicked && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" }); 
    }
  }, [travelogs, filterClicked]);

  useEffect(() => {
    const fetchAndSetYourTravelogs = async () => {
      let newTravelogs = [];
      let travelogIds = new Set();

      

      const fetchData = async (filterType) => {
        const data = await fetchTravelogs(filterType);
        for (const travelog of data) {
          if (!travelogIds.has(travelog.travelogId)) {   
            newTravelogs.push(travelog);
            travelogIds.add(travelog.travelogId);   
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
 
      newTravelogs.sort((a, b) => {
        switch (sortBy) {
          case 'username':  
            return a.userId - b.userId;
            
          case 'country':
            return a.country.localeCompare(b.country);
          case 'createdAt':
          default:
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });

      setTravelogs(newTravelogs);
      // console.log('newTravelogs: ', newTravelogs)
    };
    
    fetchAndSetYourTravelogs();
  }, [filters, user, sortBy, fetchTravelogs]);

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: checked }));
    setFilterClicked(true);
  };



  return (
    <div>
      <h2 className='filter-heading'>Travelogs In Your Feed</h2>

      <div className='sorting-divs'>

        <div className="userhub-selection">
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
        </div>

      </div>

      <div>
        
        {travelogs.map((travelog, index) => (
          <Link key={travelog.travelogId} to={`/trav_det/${travelog.travelogId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="hub-trip-trav-card">
                <div className="hub-mini-img-div"> 
                {travelog.Images[0] && (  
                    <img 
                        className='hub-mini-img'
                        src={travelog.Images[0].image_url} 
                        alt={`First Associated Index`}
                    />
                )}
                </div>
                <div className='hub-trip-trav-card-text'>
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
                  {travelog.isPrivate ? <p>(Private Entry)</p> : null}
                </div>
            </div>
          </Link>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default TravelogFilter;

 