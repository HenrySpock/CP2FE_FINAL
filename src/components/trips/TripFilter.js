import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../user/UserContext';  
import { Link } from 'react-router-dom';

import './TripTravFilter.css'

function TripFilter() {
  const { user } = useContext(UserContext);
  const [filters, setFilters] = useState({
    yourTrips: true,
    friendsTrips: false,
    followingsTrips: false,
    followersTrips: false
  });
  const [trips, setTrips] = useState([]); 
  const [sortBy, setSortBy] = useState('created_at');  

  useEffect(() => {
    const fetchTrips = async (filterType) => {
      const url = `https://lgcbe.onrender.com/trip/api/trips/sorting/filter?filterType=${filterType}&user_id=${user.user_id}`;
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          // console.log('******** trips from filter component: ', response.data)
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

    const fetchAndSetYourTrips = async () => {
      let newTrips = [];
      let tripIds = new Set();

      const fetchData = async (filterType) => {
        const data = await fetchTrips(filterType);
        for (const trip of data) {
          if (!tripIds.has(trip.trip_id)) {
            newTrips.push(trip);
            tripIds.add(trip.trip_id);
          }
        }
      };

      if (filters.yourTrips) {
        await fetchData('yourTrips');
      }
      if (filters.friendsTrips) {
        await fetchData('friendsTrips');
      }
      if (filters.followingsTrips) {
        await fetchData('followingsTrips');
      }
      if (filters.followersTrips) {
        await fetchData('followersTrips');
      }

      newTrips.sort((a, b) => {
        switch (sortBy) {
          case 'username':
            return a.User.username.localeCompare(b.User.username);
          case 'created_at':
          default:
            return new Date(b.created_at) - new Date(a.created_at);
        }
      });

      setTrips(newTrips);
    };
    
    fetchAndSetYourTrips();
  }, [filters, user, sortBy]);

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: checked }));
  }; 

  // console.log('on TripFilter, Trips: ', trips)

  return (
    <div>
      <h2 className='filter-heading'>Trips In Your Feed</h2>

      <div className='sorting-divs'>

        <div className="userhub-selection">
          <label htmlFor="sort-by">Sort by: </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="created_at">Newest First</option>
            <option value="username">Username</option>
          </select>
        </div>

        <div className="filter-checkboxes">
          <label>
            <input
              type="checkbox"
              name="yourTrips"
              checked={filters.yourTrips}
              onChange={handleFilterChange}
            />
            Your Trips
          </label>
          <label>
            <input
              type="checkbox"
              name="friendsTrips"
              checked={filters.friendsTrips}
              onChange={handleFilterChange}
            />
            Friend's Trips
          </label>
          <label>
            <input
              type="checkbox"
              name="followingsTrips"
              checked={filters.followingsTrips}
              onChange={handleFilterChange}
            />
            Following Trips
          </label>
          <label>
            <input
              type="checkbox"
              name="followersTrips"
              checked={filters.followersTrips}
              onChange={handleFilterChange}
            />
            Followed Trips
          </label>
        </div>

      </div>

      <div>
        {trips.map((trip) => (
          <Link key={trip.trip_id} to={`/trip_det/${trip.trip_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="hub-trip-trav-card">
              <div className="hub-mini-img-div"> 
                {trip.image_url && (
                  <img 
                    className='hub-mini-img'
                    src={trip.image_url} 
                    alt={`First Associated Travelog Index of First Associated Travelog`}
                  />
                )}
              </div>
              <div className='hub-trip-trav-card-text'>
                <h3>{trip.title}</h3>
                <p>{trip.description}</p>
                <p>From {new Date(trip.date_of_departure).toLocaleDateString('en-CA')} 
                  to {new Date(trip.date_of_return).toLocaleDateString('en-CA')}
                </p>
                <p>Explored by<span> </span>
                  <Link to={`/public_profile/${trip.username}`} style={{ color: 'inherit' }}>
                    {trip.username}
                  </Link>
                </p> 
                {trip.is_private === true ? <p>(Private Entry)</p> :  null }
              </div>
              
            </div>
            
          </Link>
          
        ))}
        
      </div>
    </div>
  );
}

export default TripFilter;