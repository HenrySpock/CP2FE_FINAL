import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../user/UserContext';
import { useLocation, Link } from 'react-router-dom';
import './Results.css'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Results() {
  const { user, isLoading } = useContext(UserContext);
  const query = useQuery();
  const searchTerm = query.get('query');

  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [travelogs, setTravelogs] = useState([]);
  const [travelogImages, setTravelogImages] = useState([]);

  useEffect(() => {
    if (isLoading || !user) {
      // Wait for user data to be loaded
      return;
    }

    async function fetchUsers() {
      try {
        const response = await fetch(`${API_BASE_URL}/search/users?username=${encodeURIComponent(searchTerm)}&currentUserId=${user.user_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const usersData = await response.json();
        setUsers(usersData); // Update state with the fetched users
        // console.log('usersData: ', usersData)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    // Fetch Trips
    async function fetchTrips() {
      try {
        const response = await fetch(`${API_BASE_URL}/search/trips?title=${encodeURIComponent(searchTerm)}&tripEntry=${encodeURIComponent(searchTerm)}&currentUserId=${user.user_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const tripsData = await response.json();
        setTrips(tripsData); // Update state with the fetched trips
        // console.log('tripsData: ', tripsData)
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    }

    // Fetch Travelogs
    async function fetchTravelogs() {
      try {
        const response = await fetch(`${API_BASE_URL}/search/travelogs?searchTerm=${encodeURIComponent(searchTerm)}&currentUserId=${user.user_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const travelogsData = await response.json();
        setTravelogs(travelogsData); // Update state with the fetched travelogs
        // console.log('travelogsData: ', travelogsData)
      } catch (error) {
        console.error('Error fetching travelogs:', error);
      }
    }

    // Fetch Travelogs 
    async function fetchTravelogImages() {
      try {
        const response = await fetch(`${API_BASE_URL}/search/images/travelogs?searchTerm=${encodeURIComponent(searchTerm)}&currentUserId=${user.user_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const travelogImagesData = await response.json();
        setTravelogImages(travelogImagesData);
        // console.log('travelogImagesData: ', travelogImagesData);
      } catch (error) {
        console.error('Error fetching travelogs:', error);
      }
    }

    if (searchTerm) {
      fetchUsers();
      fetchTrips();
      fetchTravelogs();
      fetchTravelogImages();
    }
  }, [searchTerm, user, isLoading]);

  return (
    <>
    <h1>Search Results for "{searchTerm}"</h1>
    <div className="results">
      

      <section>
        <h2>Users</h2>
          <div className="user-cards-container">
            {users.map(user => (
              <div key={user.user_id} className="user-card" >
                <Link to={`/public_profile/${user.username}`} className="user-username-link">
                  <img src={user.avatar} alt={`${user.username}'s avatar`} />
                </Link>
                <p className='user-username-text'>{user.username}</p>
              </div>
            ))}
          </div>
      </section>

      <section> 
      <h2>Trips</h2>
        <div className="trip-cards-container">
          {trips.map(trip => (
            <div key={trip.trip_id} className="result-trip-card">
              <Link to={`/trip_det/${trip.trip_id}`} className="trip-detail-link">
                <img src={trip.image_url} alt={`Trip titled: ${trip.title}`} />
              </Link>
              <p className='result-trip-title'>{trip.title}</p> 
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Travelogs</h2>
          <div className="result-travelog-cards-container">
            {travelogs.map(travelog => (
              <div key={travelog.travelog_id} className="result-travelog-card">
                <Link to={`/trav_det/${travelog.travelogId}`} className="result-travelog-detail-link">
                  <img src={travelog.Images[0].image_url} alt={`Travelog titled: ${travelog.title}`} />
                </Link>
                <p className='result-travelog-title'>{travelog.title}</p>
                <p className='result-travelog-location'>{travelog.city}, {travelog.country}</p>                
                <p className='result-travelog-title'>{travelog.site}</p>
              </div>
            ))}
          </div>
      </section>

      <section>
        <h2>Images</h2>
        <div className="result-images-cards-container">
          {travelogImages.flatMap(travelog =>
            travelog.Images.map((image, index) => (
              <div key={`${travelog.travelogId}_${index}`} className="result-images-card">
                <Link to={`/trav_det/${travelog.travelogId}`} className="result-images-detail-link">
                  <img src={image.image_url} alt={`First Associated Idnex for ${travelog.title}`} />
                </Link>
                <p className='result-images-title'>{travelog.title}</p>
                <p className='result-images-location'>{travelog.city}, {travelog.country}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
    </>
  );
}



export default Results;
