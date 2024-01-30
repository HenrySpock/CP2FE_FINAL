import React, { useState, useEffect, useContext, useCallback } from 'react'; 
import { useParams } from 'react-router-dom';  
import axios from 'axios';
import { UserContext } from '../user/UserContext';
import { Link, useNavigate } from 'react-router-dom';
 
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet'; 

import AdminDelete from './AdminDelete';
import DetermineLatLong from './DetermineLatLong';
import Comments from './Comments';
import ReportModal from '../interactions/ReportModal'
import TipTapReadOnly from '../tiptap/TipTapReadOnly';
import TravLikes from './TravLikes' 
import TravDetMarker from './TravDetMarker';
import './TravDet.css' 
import moment from 'moment';
import TravDetImageEdit from './TravDetImageEdit';


// COMMENTONCOMMENT 

function TravDet() {
  const { is_admin, user, isLoading } = useContext(UserContext);
  const [travelog, setTravelog] = useState(null);  
  const { travelog_id } = useParams();   
  console.log("Travelog ID from URL:", travelog_id);
  
  const { user: currentUser } = useContext(UserContext);    
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTravelog, setEditedTravelog] = useState(null);

  const [images, setImages] = useState([]);  
  
  const [associatedTrip, setAssociatedTrip] = useState(null); 

  const [isCoordinatePickerVisible, setIsCoordinatePickerVisible] = useState(false);

  const [currentLat, setCurrentLat] = useState(null);
  const [currentLng, setCurrentLng] = useState(null);

  const [formErrors, setFormErrors] = useState({ latitude: '', longitude: '' });
 
  const [username, setUsername] = useState(null); 
 
  const navigate = useNavigate();  

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const [userData, setUserData] = useState(null);

  const [profileUser, setProfileUser] = useState(null); 

  const [formattedDateVisited, setFormattedDateVisited] = useState("");

  const [isAccessCheckComplete, setIsAccessCheckComplete] = useState(false);
 
  const [showDeleteModal, setShowDeleteModal] = useState(false); 

  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (travelog) {
      setProfileUser(travelog.username);
      // console.log('profileUser set: ', profileUser)
    } else {
      setProfileUser(null);
    }
  }, [travelog]); 

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
      }, 1000); 
    }
  }, []);


  // Function to handle opening the report modal
  const openReportModal = () => {
    // console.log('travelog_id: ', travelog.travelog_id, 'user_id: ', user.user_id, 'username: ', user.username, 'email: ', user.email) 
    setIsReportModalOpen(true);
  };

  const validateForm = () => {
    let errors = {};
    if (!editedTravelog.latitude) errors.latitude = 'Latitude is required';
    if (!editedTravelog.longitude) errors.longitude = 'Longitude is required';
    return errors;
  }; 

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
  
  const worldBounds = [
    [-90, -180], 
    [90, 180]    
  ];   

  const handleDeleteTravelog = async () => { 
    try {
      if (travelog && travelog.Trip) {  
        setError('This travelog is part of a trip. You must remove it from the trip or delete the trip to delete the travelog.');
        return;  
      }
  
      const user_id = user.user_id; 
      await axios.delete(`https://lgcbe.onrender.com/travelog/api/travelog/${travelog_id}?user_id=${user_id}`);
      navigate('/hub'); 
    } catch (error) {
      console.error('Error deleting travelog:', error);
      setError('An error occurred while deleting the travelog.');
    }
  };
  

  const confirmDelete = () => {
    setShowDeleteModal(true);  
  };

  const cancelDelete = () => {
    setError('')
    setShowDeleteModal(false); 
  };

  // submitreport
  const submitReport = async (complaint) => {
    try { 
      const reportPayload = { 
        user_id: user.user_id,
        complaint_text: complaint,
        reported_travelog_id: travelog.travelog_id,
        username: user.username,  
        email: user.email,  
      };

      const response = await fetch(`https://lgcbe.onrender.com/feedback/api/travelog/${travelog_id}/report`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportPayload),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      // console.log('Travelog reported successfully');
    } catch (error) {
      console.error('Error reporting travelog:', error);
    }
  };


  const onCoordinateSelected = (coordinates) => {
    setCurrentLat(coordinates[0]);
    setCurrentLng(coordinates[1]);

    setEditedTravelog({ ...editedTravelog, latitude: coordinates[0], longitude: coordinates[1] });
    setIsCoordinatePickerVisible(false);
  };

  const onCancelCoordinateSelection = () => {
    setIsCoordinatePickerVisible(false);
  }; 


  // useEffect(() => {

  //   const checkAccess = async () => {
  //     if (!user) {
  //       console.log('User not available yet');
  //       return;
  //     }

  //     console.log('user is: ', currentUser)

  //     if (travelog && currentUser){
  //       if (travelog.username === currentUser.username){
  //         // console.log('travelog.username', travelog.username, 'currentUser.username', currentUser.username) 
  //         setIsAccessCheckComplete(true);
  //         return;
  //       }
  //     }

  //     if (travelog && currentUser) { 
  //       try {
  //         // Check block status
  //         const blockResponse = await fetch(`https://lgcbe.onrender.com/travelog/api/users/${travelog.user_id}/block-status/${currentUser.user_id}`);
  //         if (!blockResponse.ok) throw new Error('Error checking block status');
  //         const blockData = await blockResponse.json();
  //         if (blockData.isBlocked) {
  //           navigate('/');
  //           return; // Exit early if user is blocked
  //         }
  
  //         // Check permissions if travelog is private
  //         // if (travelog.is_private) {
  //         //   const permissionUrl = `https://lgcbe.onrender.com/permissions/check?travelog_id=${travelog.travelog_id}&grantee_id=${currentUser.user_id}`;
  //         //   const permissionResponse = await fetch(permissionUrl);
          
  //         console.log('travelog.travelog_id, currentUser.user_id: ', travelog.travelog_id, currentUser.user_id)

  //         if (travelog.is_private) {
  //           const permissionUrl = `https://lgcbe.onrender.com/api/permissions/specific/${currentUser.user_id}?entityId=${travelog.travelog_id}&entityType=travelog&grantee_id=${currentUser.user_id}`;
  //           const permissionResponse = await fetch(permissionUrl);
          

  //           if (!permissionResponse.ok) throw new Error('Error checking permissions');
  //           const permissionData = await permissionResponse.json();
  //           if (!permissionData.hasAccess) {
  //             navigate('/'); // Redirect if no access
  //             return;
  //           }
  //         }


 
  //         setIsAccessCheckComplete(true);
  //       } catch (error) {
  //         console.error('Error in access checks:', error);
  //         navigate('/');  // Redirect on error
  //       }
  //     }
  //   };
  
  //   checkAccess();
  // }, [travelog, currentUser, navigate]); 

  useEffect(() => {
    const checkAccess = async () => {
      if (!currentUser || !travelog) {
        console.log('User or travelog not available yet');
        return;
      }
  
      console.log('user is, currentUser.user_id, travelog.travelog_id: ', user, currentUser.user_id, travelog.travelog_id );
  
      if (travelog.username === currentUser.username) {
        setIsAccessCheckComplete(true);
        return;
      }
  
      if (travelog.is_private) { 
        console.log('checking permissions specific')
        try {
          const permissionUrl = `https://lgcbe.onrender.com/api/permissions/specific/${currentUser.user_id}?entityId=${travelog.travelog_id}&entityType=travelog`;
          
          const permissionResponse = await fetch(permissionUrl);
  
          if (!permissionResponse.ok) throw new Error('Error checking permissions');
          const permissionData = await permissionResponse.json();
          
          if (!permissionData.hasAccess) {
            navigate('/'); // Redirect if no access
            return;
          }
        } catch (error) {
          console.error('Error in access checks:', error);
          navigate('/');  // Redirect on error
        }
      }
  
      setIsAccessCheckComplete(true);
    };
  
    checkAccess();
  }, [travelog, currentUser, navigate]);
  
  
  
  
  useEffect(() => {
    // console.log('travelog prop changed:', travelog);
  }, [travelog]); 

  // Fetch current travelog data 
  const fetchTravelog = useCallback(async () => {
    try {
      // console.log('********WTF travelog_id: ', travelog_id)
      const response = await axios.get(`https://lgcbe.onrender.com/travelog/api/travelog/${travelog_id}`);
      console.log('response.data.date_visited: ', response.data.date_visited)
      // if (response.data.date_visited) {
      //   const localDateVisited = moment.utc(response.data.date_visited).local();
      //   setFormattedDateVisited(localDateVisited.format('MMMM Do YYYY, h:mm a'));
      //   // setFormattedDateVisited(moment(response.data.date_visited).format('MMMM Do YYYY, h:mm a'));  
 

      //   // Keep the ISO format for editing
      //   response.data.date_visited = moment(response.data.date_visited).format('YYYY-MM-DDTHH:mm');   
      // }

      if (response.data.date_visited) {
        setFormattedDateVisited(moment.utc(response.data.date_visited).format('MMMM Do YYYY, h:mm a'));  
        // Keep the ISO format for editing
        response.data.date_visited = moment.utc(response.data.date_visited).format('YYYY-MM-DDTHH:mm');
      }

    
      console.log('travelog: ', response.data)
      setTravelog(response.data);
      setImages(response.data.Images); 
      // console.log('RESPONSE.DATA.IMAGES: ', response.data.Images)
      setAssociatedTrip(response.data.Trip || null);
      // console.log('Travelog Id Fetch on TravDet: ', response.data)
      setCurrentLat(response.data.latitude);
      setCurrentLng(response.data.longitude); 
      console.log('current travelog: ', response.data)


    } catch (error) {
      console.error('Error fetching travelog:', error);
    }
  }, [travelog_id]); 

  const incrementViewCount = useCallback(async () => {
    // console.log('currentUser & profileUser: ', currentUser, profileUser) 
    try {
      
      // Send a request to the backend to increment the view count
      const response = await fetch(`https://lgcbe.onrender.com/viewcount/api/travelog/increment-view-count/${travelog_id}`, {
        method: 'PATCH', 
      });

      if (!response.ok) {
        throw new Error('Failed to increment view count');
      }

      // console.log('View count incremented for travelog_id:', travelog_id);
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  }, [travelog_id, 
    // currentUser, profileUser
  ]);

  useEffect(() => {
    fetchTravelog();  
  
    // Convert currentUser.username to a string
    let username = currentUser?.username ? String(currentUser.username) : null;
  
    // Check if both currentUser and profileUser are available and different
    if (username && profileUser && username !== profileUser) {
      // console.log('currentUser & profileUser: ', username, profileUser); 
      incrementViewCount(travelog_id);
    } else {
      // console.log('Condition not met, and incrementViewCount not called');
    }
  }, [travelog_id, currentUser, profileUser, fetchTravelog, incrementViewCount]);
   
  useEffect(() => {
    if (travelog) {
        setEditedTravelog({ ...travelog });
    }
  }, [travelog]);

  const handleUpdate = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return; 
    }

    // Clear any previous errors
    setFormErrors('');

    try {
      console.log('editedTravelog', editedTravelog)
      // const response = await axios.patch(`https://lgcbe.onrender.com/travelog/api/travelog/${travelog_id}`, editedTravelog);
      await axios.patch(`https://lgcbe.onrender.com/travelog/api/travelog/${travelog_id}`, editedTravelog);
      // console.log('Update successful:', response.data - I removed const response from the await because it compiled as an unused variable once logging was turned off.);
      setTravelog(editedTravelog);  // Update the displayed travelog data.
      setFormattedDateVisited(moment(editedTravelog.date_visited).format('MMMM Do YYYY, h:mm a'));
      setIsEditMode(false);  // Exit edit mode.
    } catch (error) {
      console.error('Error updating travelog:', error);
    }
  };

  const cancelEdit = () => {
      setEditedTravelog({ ...travelog });
      setIsEditMode(false);
  };
  
  const handleWriteEntryClick = () => {
    navigate(`/travtiptap/${travelog_id}`);
  }; 

  if (!isAccessCheckComplete) {
    return <div>Loading...</div>;
  }

  // console.log('ON TRAVDET USERDATA: ', userData)
  return (
    <div>  
 
        {travelog ? (
            <>
              {isEditMode ? (
                
                <div className='edit-slate'>
                  <h2>Edit Travelog</h2>
                  
                  <p className='edit-notice'>Adding and removing from trips can be done on your Trip page.</p>

                  <div className="form-group">
                    <label >Title:</label>
                    <input 
                      type="text"
                      value={editedTravelog.title}
                      onChange={e => setEditedTravelog({ ...editedTravelog, title: e.target.value })}
                    />
                  </div> 
                  
                  <div className="form-group">
                    <label>Site:</label>
                    <input
                      type="text"
                      value={editedTravelog.site}
                      onChange={e => setEditedTravelog({ ...editedTravelog, site: e.target.value })}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Country:</label>
                    <input
                      type="text"
                      value={editedTravelog.country}
                      onChange={e => setEditedTravelog({ ...editedTravelog, country: e.target.value })}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>State:</label>
                    <input
                      type="text"
                      value={editedTravelog.state}
                      onChange={e => setEditedTravelog({ ...editedTravelog, state: e.target.value })}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>City:</label>
                    <input
                      type="text"
                      value={editedTravelog.city}
                      onChange={e => setEditedTravelog({ ...editedTravelog, city: e.target.value })}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Address:</label>
                    <input
                      type="text"
                      value={editedTravelog.address}
                      onChange={e => setEditedTravelog({ ...editedTravelog, address: e.target.value })}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                      type="text"
                      value={editedTravelog.phone_number}
                      onChange={e => setEditedTravelog({ ...editedTravelog, phone_number: e.target.value })}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Date Visited:</label>
                    <input
                      type="datetime-local"
                      value={editedTravelog.date_visited}
                      onChange={e => setEditedTravelog({ ...editedTravelog, date_visited: e.target.value })}
                    />
                  </div> 
                  
                  <div className="form-group">
                    <label>Is Private:</label>
                    <input
                      type="checkbox"
                      checked={editedTravelog.is_private}
                      onChange={e => setEditedTravelog({ ...editedTravelog, is_private: e.target.checked })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Unesco Site:</label>
                    <input
                      type="checkbox"
                      checked={editedTravelog.unesco}
                      onChange={e => setEditedTravelog({ ...editedTravelog, unesco: e.target.checked })}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>I have visited this site:</label>
                    <input
                      type="checkbox"
                      checked={editedTravelog.have_visited}
                      onChange={e => setEditedTravelog({ ...editedTravelog, have_visited: e.target.checked })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Filming Location(s):</label>
                    <textarea className='edit-filming'
                      type="text"
                      value={editedTravelog.film_location}
                      onChange={e => setEditedTravelog({ ...editedTravelog, film_location: e.target.value })}
                      maxLength={1000}
                      placeholder='Limit to 1000 characters'
                    />
                  </div>

                  <div className="form-group">
                    <label>Video Game Location(s):</label>
                    <textarea className='edit-video-game'
                      type="text"
                      value={editedTravelog.video_game_location}
                      onChange={e => setEditedTravelog({ ...editedTravelog, video_game_location: e.target.value })}
                      maxLength={1000}
                      placeholder='Limit to 1000 characters'
                    />
                  </div>


                  <div className="form-group">
                    <label>Category:</label>
                    <select
                      value={editedTravelog.category}
                      onChange={e => setEditedTravelog({ ...editedTravelog, category: e.target.value })}
                    > 

    <option value="">None</option>
    <option value="">𝗠𝗲𝗱𝗶𝗲𝘃𝗮𝗹 𝗦𝗶𝘁𝗲𝘀</option>
    <option value="Ancient">Ancient</option>
    <option value="Battlefield">Battlefield</option>
    <option value="Bazaar / Market">Bazaar / Market</option>
    <option value="Blacksmith / Tradesmith / Guild Shop / Factory">Blacksmith / Tradesmith / Guild Shop / Factory</option>
    <option value="Castle / Fortress / Palace">Castle / Fortress / Palace</option>
    <option value="Cathedral / Basilica">Cathedral / Basilica</option>
    <option value="Cemetery / Columbarium / Mausoleum / Tomb / Undercroft">Cemetery / Columbarium / Mausoleum / Tomb / Undercroft</option>
    <option value="Church / Shrine / Synagogue / Temple">Church / Shrine / Synagogue / Temple</option>
    <option value="City Gate / City Wall / Gate House">City Gate / City Wall / Gate House</option>
    <option value="Commons / Plaza / Square">Commons / Plaza / Square</option>
    <option value="Guildhall">Guildhall</option>
    <option value="Historical Marker / Memorial">Historical Marker / Memorial</option>
    <option value="Library">Library</option>
    <option value="Monastery / Abbey / Priory / Convent">Monastery / Abbey / Priory / Convent</option>
    <option value="Monument / Wall">Monument / Wall</option>
    <option value="Museum">Museum</option>
    <option value="Tower">Tower</option>
    <option value="Town Hall">Town Hall</option>
    <option value="Walled City / Star Fortress">Walled City / Star Fortress</option>
    <option value="Other Medieval Site">Other Medieval Site</option> 
   


    <option value="">𝗡𝗼𝗻-𝗠𝗲𝗱𝗶𝗲𝘃𝗮𝗹 𝗦𝗶𝘁𝗲𝘀</option>
    <option value="(ancient) Acropolis / Necropolis">(ancient) Acropolis / Necropolis </option>
    <option value="(ancient) Aqueduct">(ancient) Aqueduct </option>
    <option value="(ancient) Amphitheatre / Theater">(ancient) Amphitheatre / Theater </option>
    <option value="(ancient) Catacombs">(ancient) Catacombs </option>
    <option value="(ancient) Colosseum">(ancient) Colosseum </option>
    <option value="(ancient) City">(ancient) City </option>
    <option value="(ancient) Forum">(ancient) Forum </option>
    <option value="(ancient) Citadel / Fortress">(ancient) Citadel / Fortress </option>
    <option value="(ancient) Mausoleum">(ancient) Mausoleum </option>
    <option value="(ancient) Monolith / Monument / Obelisk">(ancient) Monolith / Monument / Obelisk </option>
    <option value="(ancient) Palace">(ancient) Palace </option>
    <option value="(ancient) Pyramid">(ancient) Pyramid </option>
    <option value="(ancient) Stone Circle">(ancient) Stone Circle </option>
    <option value="(ancient) Temple">(ancient) Temple </option>
    <option value="(ancient) Thermae">(ancient) Thermae </option>
    <option value="(ancient) Ziggurat">(ancient) Ziggurat </option>
    <option value="Other Ancient Site">Other Ancient Site </option>

    <option value="AirBnB / Bed and Breakfast / Hotel / Resort">AirBnB / Bed and Breakfast / Hotel / Resort</option>
    <option value="Airport / Bus Station / Port / Train Station">Airport / Bus Station / Port / Train Station</option>
    <option value="Amusement Park / Theme Park / Water Park">Amusement Park / Theme Park / Water Park</option>
    <option value="Aquarium / Zoo">Aquarium / Zoo</option>
    <option value="Arboretum / Botanical Garden / Japanese Garden / Park">Arboretum / Botanical Garden / Japanese Garden / Park</option>
    <option value="Athletic Event / Game / Gym / Pool / Sport / Studio">Athletic Event / Game / Gym / Pool / Sport / Studio</option>
    <option value="Auditorium / Music Venue / Performance Hall">Auditorium / Music Venue / Performance Hall</option>
    <option value="Bakery / Desert / Gelato / Ice Cream / Patisserie">Bakery / Desert / Gelato / Ice Cream / Patisserie</option>
    <option value="Bistro / Restaurant">Bistro / Restaurant</option>
    <option value="Boat Ride / Boat Rental / Ferry">Boat Ride / Boat Rental / Ferry</option>
    <option value="Bookshop / Library">Bookshop / Library</option>
    <option value="Historical Marker / Memorial (non-medieval)">Historical Marker / Memorial (non-medieval)</option>
    <option value="Boutique / Mall / Shopping Center / Store">Boutique / Mall / Shopping Center / Store</option>
    <option value="Brewery / Vineyard / Winery / Pub / Bar">Brewery / Vineyard / Winery / Pub / Bar</option>
    <option value="Camping Site / Cycling / Hiking">Camping Site / Cycling / Hiking</option>
    <option value="Cemetery / Columbarium / Mausoleum (non-medieval)">Cemetery / Columbarium / Mausoleum (non-medieval)</option>
    <option value="Commons / Plaza / Square (non-medieval)">Commons / Plaza / Square (non-medieval)</option>
    <option value="Cinema / Theater">Cinema / Theater</option>
    <option value="Educational Workshop">Educational Workshop</option>
    <option value="Farm / Orchard">Farm / Orchard</option>
    <option value="Festival / State Fair (non-musical)">Festival / State Fair (non-musical)</option>
    <option value="Ghost Tour / Haunted Site">Ghost Tour / Haunted Site</option>
    <option value="Hike / Walk / Walking Tour">Hike / Walk / Walking Tour</option>
    <option value="Home / Private Residence">Home / Private Residence</option>
    <option value="Indoor Playground / Outdoor Playground">Indoor Playground / Outdoor Playground</option>
    <option value="Lighthouse / Tower View">Lighthouse / Tower View</option>
    <option value="Luxury Train Ride / Vehicular Sightseeing Tour">Luxury Train Ride / Vehicular Sightseeing Tour</option>
    <option value="Museum (non-medieval) / Art Gallery">Museum (non-medieval) / Art Gallery</option>
    <option value="National Park / Retreat">National Park / Retreat</option>
    <option value="Observatory / Planetarium">Observatory / Planetarium</option>
    <option value="River Cruise">River Cruise</option>
    <option value="School / University">School / University</option>
    <option value="Scuba Diving / Snorkeling / Water Skiing / Beach">Scuba Diving / Snorkeling / Water Skiing / Beach</option>
    <option value="Snow Skiing">Snow Skiing</option>
    <option value="Spa / Hot Spring">Spa / Hot Spring</option>
    <option value="Tavern">Tavern</option>
    <option value="Train Musuem / Transportation Museum">Train Musuem / Transportation Museum</option>

                    </select>
                  </div>

                  <div className="form-group">
                    {formErrors.latitude && <div className="error-message">{formErrors.latitude}</div>}
                    <label>Latitude:</label>
                    <input
                      type="number"
                      step="0.000001"
                      value={editedTravelog.latitude}
                      onChange={e => setEditedTravelog({ ...editedTravelog, latitude: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    {formErrors.longitude && <div className="error-message">{formErrors.longitude}</div>}
                    <label>Longitude:</label>
                    <input
                      type="number"
                      step="0.000001"
                      value={editedTravelog.longitude}
                      onChange={e => setEditedTravelog({ ...editedTravelog, longitude: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className='edit-mode-buttons'>
                    {isEditMode && !isCoordinatePickerVisible && (
                      <>
                      <button className='edit-mode-btn' type="button" onClick={() => setIsCoordinatePickerVisible(true)}>New Coordinates</button>
                      <div className='tooltip'>
                        
                        {currentUser.tooltips && (
                          <div className='trav-det-coordinate'>
                                          <span className='tooltip-icon'>?</span> 
                                          <span className='tooltip-text'>
                                          You can click / drag and zoom this map like normal. Once you click / release, the point where you clicked determines the latitude and longitude.
                                          </span>
                          </div>
                        )}
                      </div>
                      </>
                     )}

                    

 

                    
                    
                    {isCoordinatePickerVisible && (
                      <div className='move-picker'>
                      <DetermineLatLong
                        onCoordinateSelected={onCoordinateSelected}
                        onCancel={onCancelCoordinateSelection}
                        currentLat={currentLat}
                        currentLng={currentLng}
                        markerImageUrl={travelog.Images[0]?.image_url} 
                      />
                       </div>
                    )}
                   
                  
                    {isEditMode && !isCoordinatePickerVisible && (
                      <button className='edit-mode-btn' onClick={handleUpdate}>Save Changes</button>
                      // <button className='edit-mode-btn' onClick={cancelEdit}>Cancel</button>
                    )}
                    {isEditMode && !isCoordinatePickerVisible && (
                      // <button className='edit-mode-btn' onClick={handleUpdate}>Save Changes</button>
                      <button className='edit-mode-btn' onClick={cancelEdit}>Cancel</button>
                    )}


                  </div>
                </div>
              )  : (
                  <div>
                    <h2 className='travelog-title'>Travelog Details for "{travelog.title}".</h2>
                    <div className="trav-det-upper">                      
                      {images.length > 0 && (
                        <div className="trav-det-cover-container">
                          <img src={images[0].image_url} alt={`First Associated Index`} className="large-gallery-image" />
                        </div>

                      )}                      
                      <div className="trav-det-map">
                        {travelog ? (
                          <MapContainer 
                            center={[travelog.latitude, travelog.longitude]} 
                            zoom={13} 
                            minZoom={2} 
                            maxZoom={18} 
                            worldCopyJump={true} 
                            maxBounds={worldBounds}
                          >
                            <TileLayer
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <TravDetMarker entry={travelog} />
                          </MapContainer>
                        ) : null}
                      </div>

                      <div className="travelog-details"> 
                          <h2>{travelog.title}</h2>
                          <p>Site: {travelog.site}</p> 
                          <div>
                            <span>by </span>
                            <Link to={`/public_profile/${travelog.User.username}`}>
                              {travelog.User.username}
                            </Link>
                          </div>
                          {
                            associatedTrip ? (
                              <p>Part of my trip:<span> </span> 
                                <Link to={`/trip_det/${associatedTrip.trip_id}`}>
                                  {associatedTrip.title}
                                </Link> 

                              </p>
                            ) : (
                              <p>This visit was not part of a larger trip.</p>
                            )
                          }
                          <p>Date Visited: {formattedDateVisited}</p>
                          <p>I have visited here: {travelog.have_visited ? 'Yes' : 'No'}</p>
                          <p>Category: {travelog.category}</p>
                          <p>Unesco Site: {travelog.unesco ? 'Yes' : 'No'}</p> 

                          <p>Country: {travelog.country}</p>
                          <p>State: {travelog.state}</p> 
                          <p>City: {travelog.city}</p>
                          <p>Address: {travelog.address}</p>
                          <p>Phone: {travelog.phone_number}</p> 
 

 
                        <div className='trav-details-buttons'>
                          {currentUser && currentUser.username === travelog.User.username && (
                            <button className='trav-det-btn trav-edit-btn' onClick={() => travelog && setIsEditMode(!isEditMode)}>Edit Travelog</button>
                          )} 
                        </div>
                      </div> 
                    </div>

                    <div className='undermap-slate'>

                      <div className='filming-location'>
                        <p className='location-header'>Filming Location(s)</p>
                        <p>{travelog.film_location}</p>
                      </div>

                      <div className='lat-long-display'>
                        <p className='location-header'>Latitude: {travelog.latitude}</p>
                        <p className='location-header'>Longitude: {travelog.longitude}</p> 
                      </div>
                      
                      <div className='video-game-location'>
                        <p className='location-header'>Video Game Location(s)</p>
                        <p>{travelog.video_game_location}</p>
                      </div>

                    </div>

                  <div className='trav-det-slate'>
                    <div className="travelog-div">
                      <TravLikes
                        currentUser={username}
                        profileUser={profileUser}
                        userData={userData}
                        contextUser={user}
                        travelog_id={travelog_id}
                      />
 
                      <div className="tooltip">
                        <h2 className="travelog-heading">Travelog Entry</h2>
                        <span className="tooltip-icon travelog-entry-tooltip">?</span>
                        <span className="tooltip-text">Images in log entries cannot be made fullscreen. Only images in the gallery at the bottom of travelogs can be clicked to become fullscreen.</span>
                      </div>
                      <div className="travelog">{travelog.textBody}</div>

                      <div className="readOnlyTravTipTap">
                        <TipTapReadOnly content={travelog.traventry} />
                      </div> 

                      <div className='trav-btn-row'>
                          {username === profileUser && (
                            <button type='button' className="trav-det-btn user" onClick={handleWriteEntryClick}>
                              {travelog.traventry ? 'Edit Entry Log?' : 'Write Entry Log?'}
                            </button>
                          )}

                          {
                            travelog && ( travelog.is_private === true ) && currentUser && travelog.user_id === currentUser.user_id && (
                              <button className="trav-det-btn width-narrow" onClick={() => navigate(`/permissions?entity=travelog&id=${travelog.travelog_id}`)}>
                                Grant Permissions
                              </button>
                            )
                          }

                          {currentUser && currentUser.username === travelog.User.username && ( 
                          <>
                            {showDeleteModal && (
                              <div className="modal">
                                <p>Are you sure you want to delete this travelog?</p>
                                <button onClick={handleDeleteTravelog} className="delete-trav-btn">Delete Travelog</button>
                                <button onClick={cancelDelete} className="delete-trav-btn">Cancel</button>
                                {error && <div className="error-message">{error}</div>}
                              </div>
                            )}                            

                            {currentUser && currentUser.username === travelog.User.username && (
                              <button className="trav-det-btn width-narrow" onClick={confirmDelete}>Delete Travelog?</button>
                            )}
                          </>
                          )}

                          <div>
                          {user && (currentUser.username !== profileUser) && ( 
                            <button className="trav-det-btn non-user" onClick={openReportModal}>Report Travelog</button>
                          )}
                          </div>
 
                          <ReportModal
                            isOpen={isReportModalOpen}
                            onClose={() => setIsReportModalOpen(false)}
                            onSubmit={submitReport}
                          />

                          {is_admin && ( 
                            <AdminDelete travelog_id={travelog_id} navigate={navigate} />
                          )}

                      </div>
                    </div>   
                    {username === profileUser && (
                      <p>One image must remain.</p>
                    )}
 
                    <div> 
                        <TravDetImageEdit 
                            user={user}
                            travelog_id={travelog_id}
                            fetchTravelog={fetchTravelog}
                            initialImages={travelog?.Images || []}
                            username={username}
                            profileUser={profileUser}
                            userData={userData}
                        />
                        
                    </div>

                    <div className='report-delete'>
                      

                    </div>

                    <br/>

                    {travelog && <Comments 
                    travelog={travelog}     
                    profileUser={profileUser}
                    userData={userData}
                    contextUser={user}
                    />}

                  </div>
                </div>
                    
                )}
            </>
        ) : (
            <p>Loading...</p>
        )}
    </div>
);

}

export default TravDet;