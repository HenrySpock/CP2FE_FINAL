import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from './UserContext';  
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment'; 

function PrivateLogs() {
  const { user_id } = useParams(); // Get user_id from URL
  const { user } = useContext(UserContext);
  const [privateData, setPrivateData] = useState({ trips: [], travelogs: [] });

  useEffect(() => { 
    if (user && user.user_id.toString() === user_id) { 
      const fetchPrivateData = async () => {

        try {
          // Fetch trips and travelogs the user has access to
          const tripsResponse = await axios.get(`https://lgcbe.onrender.com/permissions/trips/${user_id}`);
          const travelogsResponse = await axios.get(`https://lgcbe.onrender.com/permissions/travelogs/${user_id}`);
          // console.log('tripsResponse', tripsResponse);
          // console.log('travelogsResponse', travelogsResponse);
          setPrivateData({
            trips: tripsResponse.data,
            travelogs: travelogsResponse.data
          });
  
        } catch (error) {
          console.error('Error fetching private data:', error);
        }
      };
  
      fetchPrivateData();
    }
  }, [user, user_id]);
  
 
  return (  
  <div>    
  <h2>Private Travelogs</h2>
  <div>
    {privateData.travelogs.map(travelog => (
      <Link key={travelog.travelog_id} to={`/trav_det/${travelog.travelog_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="hub-mini-card">
            <div className="hub-mini-img-div"> 
            {travelog.Images[0] && (
                <img 
                    className='hub-mini-img'
                    src={travelog.Images[0].image_url} 
                    alt={`First Associated Index`}
                />
            )}
            </div>
            <div className='hub-mini-card-text'>
              <h3>{travelog.title}</h3>
              <p>{travelog.site}</p>
              <p>Visited On {moment(travelog.date_visited).format('LL')}</p> 
              {travelog.User && (
                <p>by <Link to={`/public_profile/${travelog.User.username}`}>{travelog.User.username}</Link></p>
              )}
              <p>In {travelog.city}, {travelog.country}</p> 
              {travelog.is_private ? <p>(Private Entry)</p> : null}
            </div>
        </div>
      </Link>
    ))}
  </div>

  <h2>Private Trips</h2>
  <div>
    {privateData.trips.map(trip => (
      <Link key={trip.trip_id} to={`/trip_det/${trip.trip_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="hub-mini-card">
          <div className="hub-mini-img-div"> 
            {trip.image_url && (
              <img 
                className='hub-mini-img'
                src={trip.image_url} 
                alt={`First Associated Travelog Index of First Associated Travelog`}
              />
            )}
          </div>
          <div className='hub-mini-card-text'>
            <h3>{trip.title}</h3>
            <p>{trip.description}</p>
            <p>From {moment(trip.date_of_departure).format('LL')} 
               to {moment(trip.date_of_return).format('LL')}</p>
            {trip.is_private ? <p>(Private Entry)</p> : null}
          </div>
        </div>
      </Link>
    ))}
  </div>

</div>
);
} 

export default PrivateLogs;
