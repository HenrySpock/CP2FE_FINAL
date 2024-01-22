
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../user/UserContext';
 
import { MapContainer, TileLayer, Polyline } from 'react-leaflet'; 
import TripDetMarker from './TripDetMarker';

import DetermineLatLong from '../travlog/DetermineLatLong'

import Comments from '../travlog/Comments';

import ReportModal from '../interactions/ReportModal'

import TipTapReadOnly from '../tiptap/TipTapReadOnly';

import TripLikes from './TripLikes'

import './TripDet.css'

function TripDet() { 
  const { user } = useContext(UserContext); 
  const [trip, setTrip] = useState(null);
  const [travelogs, setTravelogs] = useState([]);
  const { trip_id } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTrip, setEditedTrip] = useState(null); 
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [availableTravelogs, setAvailableTravelogs] = useState([]);
  const [selectedTravelogs, setSelectedTravelogs] = useState([]);
  const [error, setError] = useState('');
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const [showMapModal, setShowMapModal] = useState(false);

  const [formErrors, setFormErrors] = useState({ latitude: '', longitude: '' });

  const [showPolyline, setShowPolyline] = useState(true);
  const [showMarkerNumbers, setShowMarkerNumbers] = useState(true);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [userData, setUserData] = useState(null); //User Data for Profile User, ie Trip Author 

  const currentUser = user ? user.username : null; 
  const profileUser = trip ? trip.username : null; 
  const contextUser = user;
  const [isAccessCheckComplete, setIsAccessCheckComplete] = useState(false);
 
  useEffect(() => {
    // Parse the URL to get the comment ID
    const urlSearchParams = new URLSearchParams(window.location.search);
    const comment_id = urlSearchParams.get('comment');
    
    if (comment_id) {
      // Delay the execution of the scroll logic
      setTimeout(() => {
        const commentElement = document.getElementById(`comment: ${comment_id}`);
        // console.log('************COMMENT ELEMENT: ', commentElement)
  
        if (commentElement) {
          commentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 60000); // Delay in milliseconds 
    }
  }, []);     

  // Call the fetchUserDataByUsername function when profileUser is available
  useEffect(() => {
    const fetchUserDataByUsername = async (username) => {
      try {
        const response = await axios.get(`https://lgcbe.onrender.com/user/api/users/${username}`);
        if (response.status === 200) {
          setUserData(response.data); // Set userData state with the fetched user data
        } else if (response.status === 404) {
          // console.log('User not found, redirecting...');
          navigate('/');
        } else {
          throw new Error('Server error');
        }
      } catch (error) {
        console.error('Error fetching user data by username:', error);
      }
    };

    if (profileUser) {
      fetchUserDataByUsername(profileUser);
    }
  }, [profileUser, navigate]);

  // console.log(
  //   'currentUser: ', currentUser, 
  //   'contextUser: ', contextUser,
  //   'profileUser: ', profileUser, 
  //   'userData: ', userData, 
  // ) 

  // Function to handle opening the report modal
  const openReportModal = () => {
    setIsReportModalOpen(true);
  };

  const toggleMarkerNumbers = () => {
    setShowMarkerNumbers(prevShow => !prevShow);
  };

  const togglePolyline = () => {
    setShowPolyline(prevShowPolyline => !prevShowPolyline);
  };

  const validateForm = () => {
    let errors = {};
    if (!editedTrip.latitude) errors.latitude = 'Latitude is required';
    if (!editedTrip.longitude) errors.longitude = 'Longitude is required';
    return errors;
  };

  const [mapOptions, setMapOptions] = useState({
    center: [0, 0],
    zoom: 6, 
    minZoom: 2,
    maxZoom: 18,
  }); 

  const handleCoordinateSelected = (coordinates) => {
    setEditedTrip(prevState => ({
      ...prevState,
      latitude: coordinates[0],
      longitude: coordinates[1],
    }));
    setShowMapModal(false);
  };
  
  const handleCancel = () => {
    setShowMapModal(false);
  };

  // Function to show the modal
  const confirmDelete = () => {
    setShowConfirmModal(true);
  }; 
  
  useEffect(() => {
    const checkUserAndPermissions = async () => {
      if (!user) {
        navigate('/auth');
      }
      if (trip_id) {
        try {
          // First, try to fetch a public trip or a private trip where the user is the author
          const response = await axios.get(`https://lgcbe.onrender.com/trip/api/tripgetnotprivate/${trip_id}`);
          if (response.data) {
            // Trip data is successfully fetched
            setIsLoadingUser(false);
            setIsAccessCheckComplete(true);
            return; // Exit the function as the trip is either public or the user is the author of a private trip
          }
        } catch (error) {
          // Handle the error for private trips without access
          if (error.response && error.response.status === 404) {
            console.log('Trip is private or user does not have access');
          } else {
            console.error('Error in fetching trip:', error);
          }
        }
      }
  
      if (user && trip_id) {
        try {
          // Check if the current user is the author of a private trip
          const authorResponse = await axios.get(`https://lgcbe.onrender.com/trip/api/tripget/${trip_id}`, { params: { user_id: user.user_id } });
          if (authorResponse.data) {
            setIsLoadingUser(false);
            setIsAccessCheckComplete(true);
            return; // User is the author, so they can access the trip
          }
        } catch (error) {
          console.error('Error in author check:', error);
        }
      }
  
      if (user && user.user_id && trip_id) {
        try {
          // Perform the permissions check for other users
          const permissionResponse = await axios.get(`https://lgcbe.onrender.com/permissions/check`, { params: { trip_id: trip_id, grantee_id: user.user_id } });
          const permissionData = permissionResponse.data;
          if (permissionData.hasAccess) {
            setIsLoadingUser(false);
            setIsAccessCheckComplete(true); // User has permissions to access the private trip
          } else {
            navigate('/'); // Redirect if no access
          }
        } catch (error) {
          console.error('Error in permissions check:', error);
          navigate('/');  // Redirect on error
        }
      }
    };
  
    checkUserAndPermissions();
  }, [user, trip_id, navigate]); 

  useEffect(() => {

    const incrementViewCount = async () => {
      // console.log('Incrementing view count for trip_id:', trip_id);
      try {
        const response = await fetch(`https://lgcbe.onrender.com/viewcount/api/trip/increment-view-count/${trip_id}`, { method: 'PATCH' });
        if (!response.ok) throw new Error('Failed to increment view count');
        // console.log('View count incremented for trip:', trip_id);
      } catch (error) {
        console.error('Error incrementing view count:', error);
      }
    };

    if (user) {
      const fetchTrip = async () => {
        try {
          const response = await axios.get(`https://lgcbe.onrender.com/trip/api/tripdet/${trip_id}`);
          setTrip(response.data);
          setEditedTrip(response.data); 
          setMapOptions(currentOptions => ({
            ...currentOptions,
            center: [parseFloat(response.data.latitude), parseFloat(response.data.longitude)],
            zoom: response.data.trip_zoom || 4,
          }));
        } catch (error) {
          console.error('Error fetching trip:', error);
        }
      };
  
      // console.log('viewcount currentuser / profile user: ', currentUser, profileUser)
      fetchTrip(); // Fetch trip details
      if (currentUser && profileUser && currentUser !== profileUser) {
        incrementViewCount(trip_id);  
      } else {
        console.log('Condition not met, and incrementViewCount not called');
      }
    }
  }, [trip_id, user, currentUser, profileUser]);

  // Fetch travelogs for this trip
  useEffect(() => {
    const fetchTravelogs = async () => {
      try {
        const response = await axios.get(`https://lgcbe.onrender.com/trip/api/travelogs/${trip_id}`); 
        
        const sortedTravelogs = response.data.sort((a, b) => new Date(a.date_visited) - new Date(b.date_visited));
        setTravelogs(sortedTravelogs);
        setSelectedTravelogs(sortedTravelogs);
        console.log('returned travelogs for this trip: ', sortedTravelogs);
      } catch (error) {
        console.error('Error fetching travelogs:', error);
      }
    };
    if (trip) {
      fetchTravelogs();
    }
  }, [trip, trip_id]); 

  useEffect(() => {
    const fetchUserTravelogs = async () => { 
      // console.log('user.user_id: ', user.user_id);
      try {
        const response = await axios.get(`https://lgcbe.onrender.com/travelog/api/user/${user.user_id}/travelogs`);
        const userTravelogs = response.data;
        const available = userTravelogs.filter(t => t.trip_id === null);
        setAvailableTravelogs(available);
        
      } catch (error) {
        console.error('Error fetching user travelogs:', error);
        setError('Failed to fetch travelogs.');
      }
    };    
    if (user && user.user_id) {
      setIsLoadingUser(false); 
      fetchUserTravelogs();  
    }
  }, [user, trip_id]);   
  
  // Conditional rendering based on user loading state 
  if (isLoadingUser) {
    return <div>Loading user...</div>;
  }
 
  const selectTravelog = (travelog_id) => {
    const travelog = availableTravelogs.find(t => t.travelog_id === travelog_id);
    if (travelog) {
      setAvailableTravelogs(availableTravelogs.filter(t => t.travelog_id !== travelog_id));
      setSelectedTravelogs([...selectedTravelogs, travelog]);
      setError('');
    }
  };
  
  const deselectTravelog = (travelog_id) => {
    const travelog = selectedTravelogs.find(t => t.travelog_id === travelog_id);
    if (travelog) {
      setSelectedTravelogs(selectedTravelogs.filter(t => t.travelog_id !== travelog_id));
      setAvailableTravelogs([...availableTravelogs, travelog]);
    }
  };
 
  const handleUpdate = async (event) => { 
    event.preventDefault(); 
  
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;   
    }

    // Clear any previous errors
    setFormErrors('');

    // Check if at least two travelogs are selected
    if (selectedTravelogs.length < 2) {
      setError('A trip must have at least two travelogs.');
      return; // Exit the function if the condition is not met
    }
  
    // Clear any previous errors
    setError('');
  
    try {
      // Update the trip itself
      await axios.patch(`https://lgcbe.onrender.com/trip/api/trips/${trip_id}`, editedTrip);
  
      // Make a list of travelog IDs that were initially selected for the trip
      const initiallySelectedTravelogs = travelogs.map(t => t.travelog_id);
  
      // Determine which travelogs to add or remove based on the initial selection
      const travelogsToAdd = selectedTravelogs.filter(t => !initiallySelectedTravelogs.includes(t.travelog_id));
      const travelogsToRemove = travelogs.filter(t => !selectedTravelogs.some(s => s.travelogId === t.travelog_id));
  
      // Send requests to update travelogs that have been selected
      const addPromises = travelogsToAdd.map(travelog =>
        axios.patch(`https://lgcbe.onrender.com/travelog/api/travelog/${travelog.travelog_id}`, { trip_id: trip_id, user_id: user.user_id })
      );
  
      // Send requests to update travelogs that have been deselected
      const removePromises = travelogsToRemove.map(travelog =>
        axios.patch(`https://lgcbe.onrender.com/travelog/api/travelog/${travelog.travelog_id}`, { trip_id: null, user_id: user.user_id })
      );
  
      // Wait for all the update requests to finish
      await Promise.all([...addPromises, ...removePromises]);
  
      // If everything is successful, update the local state and UI
      setTrip(editedTrip);
      setTravelogs(selectedTravelogs);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error updating trip or travelogs:', error);
      setError('Failed to update trip or travelogs.');  
    }
  };

  const cancelEdit = () => {
    setEditedTrip({ ...trip }); // Revert to original trip details
    setIsEditMode(false); // Exit edit mode
    setError('');
  };

    // Delete trip
    const handleDelete = async () => {
      setShowConfirmModal(false);
      try {
        const user_id = user.user_id;
        // console.log('user_id on deleting frontend: ', user_id)
        await axios.delete(`https://lgcbe.onrender.com/trip/api/trips/${trip_id}?user_id=${user_id}`);
        navigate('/hub'); // Navigate back to the hub after deletion
      } catch (error) {
        console.error('Error deleting trip:', error);
      }
    }; 

  // submitreport
  const submitReport = async (complaint) => {

    try { 
      const reportPayload = { 
        user_id: user.user_id,
        complaint_text: complaint,
        reported_trip_id: trip.trip_id,
        username: user.username,  
        email: user.email,
      };

      const response = await fetch(`https://lgcbe.onrender.com/feedback/api/trip/${trip_id}/report`, { 
        method: 'POST', // Use PATCH to update the user table and send the complaint details
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportPayload),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      // console.log('Trip reported successfully');
    } catch (error) {
      console.error('Error reporting user:', error);
    }
  };
  
  const handleWriteEntryClick = () => {
    navigate(`/triptiptap/${trip_id}`);
  };

  if (!isAccessCheckComplete) {
    return <div>Loading...</div>;
  }

return (
  <div>
    {trip ? (
      <div>
        {isEditMode ? (
          // Form for editing trip details
          <form className='trip-edit-slate' onSubmit={handleUpdate}>

            <div className='trip-edit-input-slate'>

            <h2 className='edit-trip-title'>Edit Trip</h2>

              <div className='trip-form-group'>
                <label htmlFor="title">Title:</label>
                <input
                  id="title"
                  type="text"
                  value={editedTrip.title}
                  onChange={(e) => setEditedTrip({ ...editedTrip, title: e.target.value })}
                />
              </div>   
              <div className='trip-form-group depart-return'>
                <label htmlFor="dateOfDeparture">Departure Date:</label>
                <input
                  id="dateOfDeparture"
                  type="date"
                  value={editedTrip.date_of_departure || ''}
                  onChange={(e) => setEditedTrip({ ...editedTrip, date_of_departure: e.target.value })}
                />
              </div>

              <div className='trip-form-group depart-return'>
                <label htmlFor="dateOfReturn">Return Date:</label>
                <input
                  id="dateOfReturn"
                  type="date"
                  value={editedTrip.date_of_return || ''}
                  onChange={(e) => setEditedTrip({ ...editedTrip, date_of_return: e.target.value })}
                />
              </div>

              <div className='trip-form-group'>
                <label htmlFor="image">Image URL:</label>
                <input
                  id="image"
                  type="text"
                  value={editedTrip.image_url}
                  onChange={(e) => setEditedTrip({ ...editedTrip, image_url: e.target.value })}
                />
              </div>

              <div className='trip-form-group'>
                {formErrors.latitude && <div className="error-message">{formErrors.latitude}</div>}
                <label htmlFor="latitude">Latitude:</label>
                <input
                  id="latitude"
                  type="number"
                  step="0.000001"
                  value={editedTrip.latitude}
                  onChange={(e) => setEditedTrip({ ...editedTrip, latitude: parseFloat(e.target.value) })}
                />
              </div>

              <div className='trip-form-group'>              
                {formErrors.longitude && <div className="error-message">{formErrors.longitude}</div>}
                <label htmlFor="longitude">Longitude:</label>
                <input
                  id="longitude"
                  type="number"
                  step="0.000001"
                  value={editedTrip.longitude}
                  onChange={(e) => setEditedTrip({ ...editedTrip, longitude: parseFloat(e.target.value) })}
                />
              </div>
                
                {!showMapModal && ( 
                  <>
                    <button className='trip-edit-mode-btn display-point-btn' type="button" onClick={() => setShowMapModal(true)}>Edit Marker Display Point</button>

                    <div className='tooltip'>
                          
                      {contextUser.tooltips && (
                        <div className='trip-det-coordinate'>
                                        <span className='tooltip-icon'>?</span> 
                                        <span className='tooltip-text'>
                                        You can click / drag and zoom this map like normal. Once you click / release, the point where you clicked determines the latitude and longitude.
                                        </span>
                        </div>
                      )}
                    </div>
                  </>
                )}
               

               



                {showMapModal && (
                  <DetermineLatLong
                    onCoordinateSelected={handleCoordinateSelected}
                    onCancel={handleCancel}
                  />
                )}

              <div className='trip-form-group'>    
                <label htmlFor="tripZoom">Zoom Level:</label>
                <input
                  id="tripZoom"
                  type="number" 
                  min="0" 
                  max="18" 
                  value={editedTrip.trip_zoom || 4} // Default to 4 if tripZoom is not set
                  onChange={(e) => setEditedTrip({ ...editedTrip, trip_zoom: parseInt(e.target.value, 10) })}
                />
              </div>

              <div className='trip-form-group'>  
                <label htmlFor="isPrivate">Private Trip:</label>
                <input
                  id="isPrivate"
                  type="checkbox"
                  checked={editedTrip.is_private}
                  onChange={(e) => setEditedTrip({ ...editedTrip, is_private: e.target.checked })}
                />
              </div>

              <div className='trip-form-group'>  
                <label htmlFor="haveVisited">Have Visited:</label>
                <input
                  id="haveVisited"
                  type="checkbox"
                  checked={editedTrip.have_visited}
                  onChange={(e) => setEditedTrip({ ...editedTrip, have_visited: e.target.checked })}
                />
              </div>

            </div>
            
            {/* Available Travelogs */}
              <h2 className='selecting-titles'>Available Travelogs</h2>
              <div className="travelog-selection-container">
                {availableTravelogs.map((travelog, index) => (
                  <div 
                    key={travelog.travelog_id} 
                    className="trip-edit-mini-card"
                    onClick={() => selectTravelog(travelog.travelog_id)}  
                    style={{ cursor: 'pointer' }} 
                  >
                    <div className="trip-edit-img-div">
                      {travelog.Images[0] && (
                        <img
                          className='trip-edit-img'
                          src={travelog.Images[0].image_url}
                          alt={`Travelog Gallery ${index + 1}`}
                        />
                      )}
                    </div>
                    <div className='trip-edit-mini-card-text'>
                      <h3>{travelog.title}</h3>
                      <p>{travelog.site}</p>
                      <p>&nbsp;Visited On {new Date(travelog.date_visited).toLocaleDateString('en-CA')}</p> 
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Travelogs */}
              <h2 className='selecting-titles'>Selected Travelogs</h2>
              <div className="travelog-selection-container">
                {selectedTravelogs.map((travelog, index) => (
                  <div 
                    key={travelog.travelog_id} 
                    className="trip-edit-mini-card selected"
                    onClick={() => deselectTravelog(travelog.travelog_id)}  
                    style={{ cursor: 'pointer' }}  
                  >
                    <div className="trip-edit-img-div">
                      {travelog.Images[0] && (
                        <img
                          className='trip-edit-img'
                          src={travelog.Images[0].image_url}
                          alt={`Travelog Gallery ${index + 1}`}
                        />
                      )}
                    </div>
                    <div className='trip-edit-mini-card-text'>
                      <h3>{travelog.title}</h3>
                      <p>{travelog.site}</p>
                      <p>&nbsp;Visited On {new Date(travelog.date_visited).toLocaleDateString('en-CA')}</p> 
                    </div>
                  </div>
                ))}
              </div>
            {error && <div className="trip-error">{error}</div>}
            <div className='edit-save-cancel'>
              <button className='trip-edit-mode-btn' type="submit">Save Changes</button>
              <button className='trip-edit-mode-btn' type="button" onClick={cancelEdit}>Cancel</button>
            </div>
          </form>
        ) : (
          
          // Display trip details with Edit and Delete buttons
          <div>
            <h2 className='trip-title'>Trip Details For "{trip.title}"</h2>

            <div className='trip-det-main-row'>
              <div className="trip-map-div">
                <MapContainer {...mapOptions}  style={{ height: '420px',}}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {travelogs.map((entry, index) => ( 
                    <TripDetMarker key={entry.travelog_id} entry={entry} order={index + 1} showNumbers={showMarkerNumbers} />
                  ))}

                  {/* Create polyline based on travelogs */}
                  {selectedTravelogs.length >= 2 && ( 

                    showPolyline && (
                      <Polyline 
                        positions={selectedTravelogs.map(t => [t.latitude, t.longitude])}
                        className="custom-polyline"
                      />
                    )
                    
                  )} 

                </MapContainer>
                <div className='map-btn-container'>
                  <button className='polyline-btn' onClick={togglePolyline}>
                    {showPolyline ? 'Hide Polyline' : 'Show Polyline'}
                  </button>

                  <button className='polyline-btn' onClick={toggleMarkerNumbers}>
                    {showMarkerNumbers ? 'Hide Marker Numbers' : 'Show Marker Numbers'}
                  </button>
                </div>
              </div>

              <div className='spacer'></div>

              <div className='trip-details'>
                <h3>Trip Details</h3>
                <p>Traveler: <Link to={`/Public_Profile/${trip.username}`}>{trip.username}</Link></p>
                <p>Departure Date: {trip.date_of_departure}</p>
                <p>Return Date: {trip.date_of_return}</p>
                <p>Latitude: {trip.latitude}</p>
                <p>Longitude: {trip.longitude}</p>
                <p>Zoom Level: {trip.trip_zoom}</p>
                <p>Private: {trip.is_private ? 'Yes' : 'No'}</p>
                <p>Visited: {trip.have_visited ? 'Yes' : 'No'}</p> 
                {
                  currentUser === profileUser &&
                  <button className='trip-edit-btn' type="button" onClick={() => setIsEditMode(true)}>Edit Trip</button>
                } 
              </div>
            </div>

            <div className='trip-det-slate'>

              <div className='trip-det-likes'>
                <TripLikes
                  currentUser={currentUser}
                  profileUser={profileUser}
                  userData={userData}
                  contextUser={contextUser}
                  trip_id={trip_id}
                />
              </div>            
 
              
              <h2 className='trip-title'>Log entry for "{trip.title}".</h2>

              <div className="readOnlyTripTipTap">
                <TipTapReadOnly content={trip.tripentry} />
              </div>

              {
                currentUser === profileUser &&
                <button className='edit-tripentry' type='button' onClick={handleWriteEntryClick}>
                  {trip.tripentry ? 'Edit Log Entry' : 'Write Log Entry'}
                </button>
              }

              {
                currentUser !== profileUser &&
                <button className='trip-det-btn trip-report-button' onClick={openReportModal}>Report Trip?</button> 
              } 
 
              <div className='trip-buttons'>
 
                {showConfirmModal && (
                  <div className="modal">
                    <p>Are you sure you want to delete this trip?</p>
                    <button className="delete-trip-btn" onClick={handleDelete}>Delete Trip</button>
                    <button className="delete-trip-btn" onClick={() => setShowConfirmModal(false)}>Cancel</button>
                  </div>
                )}

              {currentUser === profileUser &&
                <div className='trip-decisions'>
                  
                    
                    <button className='trip-det-btn' type="button" onClick={confirmDelete}>Delete Trip</button>
                  

                  {
                    trip && user && trip.user_id === user.user_id && (
                      <button className='trip-det-btn' onClick={() => navigate(`/permissions?entity=trip&id=${trip.trip_id}`)}>
                        Grant Permissions
                      </button>
                    )
                  }
                </div>
              }
                
                
                
                <ReportModal
                  isOpen={isReportModalOpen}
                  onClose={() => setIsReportModalOpen(false)}
                  onSubmit={submitReport}
                />
              </div>






            


              <h2 className='trip-heading' >Travelogs For This Trip</h2>
                {travelogs.map((travelog, index) => (
                  <Link key={travelog.travelog_id} to={`/trav_det/${travelog.travelog_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="trip-det-mini-card">
                        <div className="trip-det-mini-img-div"> 
                        {travelog.Images[0] && (  
                            <img 
                                className='trip-det-mini-img'
                                src={travelog.Images[0].image_url} 
                                alt={`Travelog Gallery 1`}
                            />
                        )}
                        </div>
                        <div className='trip-det-mini-card-text'>
                          <h3>{travelog.title}</h3>
                          <p>{travelog.site}</p>
                          <p>&nbsp;Visited On {new Date(travelog.date_visited).toLocaleDateString('en-CA')}</p>
                          {travelog.User && travelog.user_id !== user.user_id && (
                            <p>&nbsp;by <Link to={`/public_profile/${travelog.User.username}`}>{travelog.User.username}</Link></p>
                          )}
                          {travelog.user_id === user.user_id && (
                            <p>&nbsp;by <Link to={`/public_profile/${user.username}`}>{user.username}</Link></p>
                          )}
                          <p>&nbsp;In {travelog.city}, {travelog.country}</p> 
                        </div>
                    </div>
                  </Link>
                ))}

 
              {trip && < Comments 
                trip={trip} 
                profileUser={profileUser} 
                userData={userData} 
                contextUser={contextUser} />}


            </div>

          </div>
        )}
        

        </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
);
}

export default TripDet; 