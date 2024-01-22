import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../user/UserContext';

import DetermineLatLong from '../travlog/DetermineLatLong'

import './CreateTrip.css'

function CreateTrip() {
  const [title, setTitle] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [availableTravelogs, setAvailableTravelogs] = useState([]);
  const [selectedTravelogs, setSelectedTravelogs] = useState([]);
  
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [imageUrl, setImageUrl] = useState('');
 
  const [error, setError] = useState(''); 

  const [showMapModal, setShowMapModal] = useState(false);

  const [isPrivate, setIsPrivate] = useState(false);
  const [haveVisited, setHaveVisited] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCoordinateSelected = (coordinates) => {
    setLatitude(coordinates[0]);
    setLongitude(coordinates[1]);
    setShowMapModal(false);
  };
  
  const handleCancel = () => {
    setShowMapModal(false);
  };

  // Function to calculate the center of bounds
  const calculateCenterOfBounds = (selectedTravelogs) => {
    if (selectedTravelogs.length === 0) return ['', '']; // Return empty strings if no travelogs

    let minLat = selectedTravelogs[0].latitude;
    let maxLat = selectedTravelogs[0].latitude;
    let minLng = selectedTravelogs[0].longitude;
    let maxLng = selectedTravelogs[0].longitude;

    selectedTravelogs.forEach((log) => {
      if (log.latitude < minLat) minLat = log.latitude;
      if (log.latitude > maxLat) maxLat = log.latitude;
      if (log.longitude < minLng) minLng = log.longitude;
      if (log.longitude > maxLng) maxLng = log.longitude;
    });

    const midLat = (minLat + maxLat) / 2;
    const midLng = (minLng + maxLng) / 2;

    return [midLat.toFixed(4), midLng.toFixed(4)]; // Format to 4 decimal places
  };

// Function to handle selecting a travelog
const handleSelectTravelog = (selectedTravelog) => {
  setAvailableTravelogs(prevTravelogs =>
    prevTravelogs.filter(travelog => travelog.travelogId !== selectedTravelog.travelogId)
  );
  setSelectedTravelogs(prevSelected => {
    const newSelectedTravelogs = [...prevSelected, selectedTravelog];

    // Sort and find the earliest travelog
    const earliestTravelog = newSelectedTravelogs.sort((a, b) => a.travelogId - b.travelogId)[0];

    const [newLat, newLng] = calculateCenterOfBounds(newSelectedTravelogs); 

    setLatitude(newLat);
    setLongitude(newLng);

    updateImageUrl(earliestTravelog);

    return newSelectedTravelogs;
  });
};

 

// Function to handle deselecting a travelog
const handleDeselectTravelog = (deselectedTravelog) => {
  setSelectedTravelogs(prevSelected => {
    const newSelectedTravelogs = prevSelected.filter(travelog => travelog.travelogId !== deselectedTravelog.travelogId);

    if (newSelectedTravelogs.length > 0) {
      // Sort and find the earliest travelog
      const earliestTravelog = newSelectedTravelogs.sort((a, b) => a.travelogId - b.travelogId)[0]; 
      const [newLat, newLng] = calculateCenterOfBounds(newSelectedTravelogs);
      setLatitude(newLat);
      setLongitude(newLng);

      updateImageUrl(earliestTravelog);
    } else {
      setLatitude('');
      setLongitude('');
      setImageUrl(''); // Reset image URL if no travelogs are selected
    }

    return newSelectedTravelogs;
  });
  setAvailableTravelogs(prevTravelogs => [...prevTravelogs, deselectedTravelog]);
}; 

const updateImageUrl = (earliestTravelog) => {
  // Check if there are images and set the URL of the first one
  if (earliestTravelog.Images && earliestTravelog.Images.length > 0) {
    setImageUrl(earliestTravelog.Images[0].image_url);
  } else {
    setImageUrl(''); // Reset or set a default image URL if there are no images
  }
};
 
  useEffect(() => {
    // console.log('Available travelogs after update:', availableTravelogs);
    // console.log('Selected travelogs after update:', selectedTravelogs);
  }, [availableTravelogs, selectedTravelogs]); // This useEffect will run after these states have updated

  useEffect(() => {
    const fetchTravelogs = async () => {
      if (user) {
        try {
          console.log('user.user_id: ', user.user_id)
          // const response = await fetch(`https://lgcbe.onrender.com/trip/api/travelogs?user_id=${user.user_id}&trip_id=null`);
          const response = await fetch(`https://lgcbe.onrender.com/trip/api/travelogs?user_id=${user.user_id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          // console.log('travelogs: ', data);
          setAvailableTravelogs(data);
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
        }
      }
    };
  
    fetchTravelogs();
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    setIsSubmitting(true);

    // Check if at least two travelogs have been selected
    if (selectedTravelogs.length < 2) {
      setError('Please select at least 2 travelogs to include in your trip.');  
      return;  
    }

    // Reset error message if the validation passes
    setError('');
 
    const newTrip = {
      user_id: user.user_id,  
      username: user.username,
      title,
      dateOfDeparture: departureDate,
      dateOfReturn: returnDate,
      latitude, 
      longitude, 
      image_url: imageUrl,
      is_private: isPrivate,
      have_visited: haveVisited,
    };

    // console.log('newTrip: ', newTrip)
    try {
      const response = await fetch('https://lgcbe.onrender.com/trip/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTrip)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const trip = await response.json();
      const trip_id = trip.trip_id;
 
      for (const travelog of selectedTravelogs) {
        // console.log('trying to set trip_id on travelog: ', travelog, 'the tripId is: ', tripId)
        try {
          const travelog_id = travelog.travelog_id; 
          const travelogResponse = await fetch(`https://lgcbe.onrender.com/travelog/api/travelog/${travelog_id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ trip_id: trip_id, user_id: user.user_id }) 
          });
      
          if (!travelogResponse.ok) {
            throw new Error(`Failed to update travelog ${travelog_id}`);
          }
        } catch (error) {
          console.error(`Failed to update travelog ${travelog.travelog_id} with tripId:`, error);
        }
      } 
      setIsSubmitting(false);
      navigate(`/trip_det/${trip.trip_id}`);  
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      setError('An error occurred while submitting the form.');
      setIsSubmitting(false); 
    }
  };

  return (
    <div className='create-trip-container'>
      <h1 className='create-trip-heading'>Create a New Trip</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message if it exists */}
      <form onSubmit={handleSubmit} className="create-trip-form">
        <div className='triple-label'>
          <span></span>
          <span>Date of Departure</span> 
          <span className='date-return'>Date of Return</span>
        </div>
        <div className='triple-label'>
          <label className='create-trip-label'> 
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title'/>
          </label>
          <label className='create-trip-label'> 
            <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)}/>
          </label>
          <label className='create-trip-label'> 
            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
          </label>
        </div>

        <div className='triple-label'>
          <label className='create-trip-label'>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder='Image URL'/>
          </label> 
          <label className='create-trip-label'>
            <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder='Latitude'/>
          </label>
          <label className='create-trip-label'>
            <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder='Longitude'/>
          </label>
        </div>


        <div className='triple-label'>

        <div className='check-container pick-marker'>
          <label>
            <span>Have Visited</span> 
            <input type="checkbox" name="have_visited" checked={haveVisited} onChange={e => setHaveVisited(e.target.checked)}/>
          </label>


          <label>
            <span>Private</span> 
            <input type="checkbox" name="isPrivate" checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} />
          </label>
        </div>
 
          {!showMapModal && (
            <button type="button" onClick={() => setShowMapModal(true)} className='create-trip-submit-btn pick-marker marker-button'> Pick Marker Display Point </button>
          )}


          <label className='submit-entry-label'>

            {/* <button type="submit" className='create-trip-submit-btn pick-marker submit'>Submit Trip</button> */}

            <button type="submit" className='create-trip-submit-btn pick-marker submit' disabled={isSubmitting}>
              Submit Trip
            </button>

            {user && user.tooltips === true &&
              <div className="tooltip tripentry-tooltip"> 
                <span className="tooltip-icon">?</span>
                <span className="tooltip-text">You will be able to add a journal entry with photos after you submit these details.</span>
              </div>
            }
          </label>

        </div>

          <span className='move-map'>
        
          {showMapModal && (
            <DetermineLatLong
              onCoordinateSelected={handleCoordinateSelected}
              onCancel={handleCancel}
            />
          )}
          </span>

        {/* </div> */}
        <h2 className='travelog-header'>Available Travelogs</h2>
          <div className='travelog-container'>

              {availableTravelogs.map(travelog => (
                <div key={travelog.id} onClick={() => handleSelectTravelog(travelog)} className='selectable'>
                  <img src={travelog.Images[0].image_url} alt={travelog.Images} 
                  />
                  <p>Country: {travelog.country}</p>
                  <p>City: {travelog.city}</p>
                  <p>Site: {travelog.site}</p>
                  <p>Title: {travelog.title}</p> 
                </div>
              ))}

          </div>

        <h2 className='travelog-header'>Selected Travelogs</h2>
          <div className='travelog-container'>

              {selectedTravelogs.map(travelog => (
                <div key={travelog.id} onClick={() => handleDeselectTravelog(travelog)} className='selectable'> 
                  <img src={travelog.Images[0].image_url} alt={travelog.Images} 
                  />
                  <p>Country: {travelog.country}</p>
                  <p>City: {travelog.city}</p>
                  <p>Site: {travelog.site}</p>
                  <p>Title: {travelog.title}</p> 
                </div>
              ))}

          </div>



      </form>
    </div>
  );
}

export default CreateTrip;