import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';  
import axios from 'axios';
import { UserContext } from '../user/UserContext';
import { Link, useNavigate } from 'react-router-dom';
 
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import CustomSingleMarker from './CustomSingleMarker';
  
// Comment Code
import CommentModal from './CommentModal'; 
import CommentsList from './CommentsList';

// COMMENTONCOMMENT 

function TravDet() {
  const { isAdmin, user } = useContext(UserContext);
  const [travelog, setTravelog] = useState(null); 
  const { id: travelogId } = useParams();  
  const { user: currentUser } = useContext(UserContext);   
  console.log('Current User for travdet: ', currentUser);  
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTravelog, setEditedTravelog] = useState(null);

  const [images, setImages] = useState([]);
  const [isEditImagesMode, setIsEditImagesMode] = useState(false);
  const [displayImages, setDisplayImages] = useState(images);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false); 
  
  // Comment Code
  const [commentText, setCommentText] = useState('');
  const [modalShow, setModalShow] = useState(false);
  // const handleClose = () => {
  //   setModalShow(false);
  //   setCommentText('');
  // };
  const handleClose = (callback) => {
    setModalShow(false);
    callback && callback();
  };
  const [comments, setComments] = useState([]);

  function onCommentSubmit(newComment) {
    console.log('onCommentSubmitfiring with: ', newComment)
    setComments((prevComments) => [newComment, ...prevComments]);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (travelog && travelog.reported && !isAdmin) {
      navigate('/');
    }
  }, [travelog, isAdmin, navigate]); 

  const mapOptions = {
    center: travelog ? [travelog.latitude, travelog.longitude] : [49.6322, 12.4628],
    zoom: 13,
    minZoom: 2,
    maxZoom: 18,
  };
  
  const worldBounds = [
    [-90, -180], 
    [90, 180]    
  ];

  const updateImageUrl = (index, url) => {
    const updatedImages = [...images];
    updatedImages[index].image_url = url;  
    setImages(updatedImages);
  };
  
  const removeImage = (index) => {
    const updatedImages = images.map((image, i) => {
      if (i === index) {
        return { ...image, delete: true };
      }
      return image;
    });
    setImages(updatedImages);
   
    const updatedDisplayImages = updatedImages.filter(image => !image.delete);
    setDisplayImages(updatedDisplayImages);
  };
 
  const addImage = () => {
    setImages([...images, { image_url: '' }]);
  };

  const saveImages = async () => {
    try {
      console.log('Images data being sent:', JSON.stringify({ images }));  // Log the data being sent
      console.log('Updated images:', JSON.stringify({ images }, null, 2));
      const response = await fetch(`http://localhost:5000/api/travelog/${travelogId}/images`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ images }),
      });
  
      console.log('Raw response:', response);  // Log the raw response
      
      if (!response.ok) {
        throw new Error(`Network response was not ok ${response.statusText}`);
      }
  
      const responseData = await response.json();
      console.log('Parsed response data:', responseData);  // Log the parsed response data
      
      console.log('Images updated successfully:', responseData);
      setIsEditImagesMode(false);  // Optionally reset the edit mode
      fetchTravelog(); 
    } catch (error) {
      console.error('Error saving images:', error);  // Log any errors
    }
  };
  
  const handleDeleteTravelog = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/travelog/${travelogId}`);
      console.log('Delete successful:', response.data);
      navigate('/');  // Navigate back to the home page
    } catch (error) {
      console.error('Error deleting travelog:', error);
    }
  }; 

  const handleAdminDeletion = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/travelog/${travelogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If the deletion is successful, navigate back to the admin panel
        navigate('/admin');  // Adjust this URL to match the route of your admin panel
      } else {
        // Handle error (e.g., show an error message)
        console.error('Error deleting travelog:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting travelog:', error);
    }
  };
 
  const handleToggleReport = async () => {
    const confirmReport = window.confirm('Are you sure you want to do this?');
    try {
      const response = await fetch(`http://localhost:5000/api/travelog/${travelogId}/report`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reported: !travelog.reported }),  // Toggle reported status
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok ${response.statusText}`);
      }
  
      const responseData = await response.json();
      console.log('Report status toggled successfully:', responseData);
      // Optionally, update the local state to reflect the change
      setTravelog(prevTravelog => ({ ...prevTravelog, reported: !prevTravelog.reported }));
  
      // If the travelog was reported before, navigate to /admin
      if (travelog.reported) {
        navigate('/admin');
      }
  
    } catch (error) {
      console.error('Error toggling report status:', error);
    }
  };

  useEffect(() => {
    // Filter out any images marked for deletion
    const updatedDisplayImages = images.filter(image => !image.delete);
    setDisplayImages(updatedDisplayImages);
  }, [images]);

  const fetchTravelog = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/travelog/${travelogId}`);
      setTravelog(response.data);
      setImages(response.data.Images); 
      console.log('Travelog Id Fetch on TravDet: ', response.data)
    } catch (error) {
      console.error('Error fetching travelog:', error);
    }
  };

  useEffect(() => {
    fetchTravelog();  // This will still run whenever travelogId changes
  }, [travelogId]);

  useEffect(() => {
    if (travelog) {
        setEditedTravelog({ ...travelog });
    }
  }, [travelog]);

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/travelog/${travelogId}`, editedTravelog);
      console.log('Update successful:', response.data);
      setTravelog(editedTravelog);  // Update the displayed travelog data.
      setIsEditMode(false);  // Exit edit mode.
    } catch (error) {
      console.error('Error updating travelog:', error);
    }
  };

  const cancelEdit = () => {
      setEditedTravelog({ ...travelog });
      setIsEditMode(false);
  };

  const cancelEditImages = () => {
      setImages(travelog.Images);
      setIsEditImagesMode(false);
  };
 
  return (
    <div> 
      <div className="map-container">
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
            <CustomSingleMarker entry={travelog} />
          </MapContainer>
        ) : null}
      </div>
        {travelog ? (
            <>
                {isEditMode ? (
                    <div>
                        <input
                            type="text"
                            value={editedTravelog.title}
                            onChange={e => setEditedTravelog({ ...editedTravelog, title: e.target.value })}
                        />
                        <input
                            type="text"
                            value={editedTravelog.site}
                            onChange={e => setEditedTravelog({ ...editedTravelog, site: e.target.value })}
                        />
                        <input
                            type="text"
                            value={editedTravelog.country}
                            onChange={e => setEditedTravelog({ ...editedTravelog, country: e.target.value })}
                        />
                        <input
                            type="text"
                            value={editedTravelog.state}
                            onChange={e => setEditedTravelog({ ...editedTravelog, state: e.target.value })}
                        />
                        <input
                            type="text"
                            value={editedTravelog.city}
                            onChange={e => setEditedTravelog({ ...editedTravelog, city: e.target.value })}
                        />
                        <input
                            type="text"
                            value={editedTravelog.address}
                            onChange={e => setEditedTravelog({ ...editedTravelog, address: e.target.value })}
                        />
                        <input
                            type="text"
                            value={editedTravelog.phoneNumber}
                            onChange={e => setEditedTravelog({ ...editedTravelog, phoneNumber: e.target.value })}
                        />
                        <input
                            type="date"
                            value={editedTravelog.dateVisited}
                            onChange={e => setEditedTravelog({ ...editedTravelog, dateVisited: e.target.value })}
                        />
                        <input
                            type="checkbox"
                            checked={editedTravelog.isPrivate}
                            onChange={e => setEditedTravelog({ ...editedTravelog, isPrivate: e.target.checked })}
                        />
                        <input
                          type="number"
                          step="0.000001"
                          value={editedTravelog.latitude}
                          onChange={e => setEditedTravelog({ ...editedTravelog, latitude: e.target.value })}
                          readOnly={!isEditMode}
                        />
                        <input
                          type="number"
                          step="0.000001"
                          value={editedTravelog.longitude}
                          onChange={e => setEditedTravelog({ ...editedTravelog, longitude: e.target.value })}
                          readOnly={!isEditMode}
                        />
                        <textarea
                            value={editedTravelog.textBody}
                            onChange={e => setEditedTravelog({ ...editedTravelog, textBody: e.target.value })}
                        />
                        <button onClick={handleUpdate}>Save Changes</button>
                        <button onClick={cancelEdit}>Cancel</button>  
                    </div>
                ) : (
                    <div>
                        <h1>{travelog.title}</h1>
                        <p>Site: {travelog.site}</p> 
                        <div>
                          <span>visited by </span>
                          <Link to={`/public_profile/${travelog.User.username}`}>
                            {travelog.User.username}
                          </Link>
                        </div>
                        <p>Country: {travelog.country}</p>
                        <p>State: {travelog.state}</p>
                        <p>City: {travelog.city}</p>
                        <p>Address: {travelog.address}</p>
                        <p>Phone: {travelog.phoneNumber}</p>
                        <p>Date Visited: {new Date(travelog.dateVisited).toLocaleDateString('en-CA')}</p>
                        <p>Is Private: {travelog.isPrivate ? 'Yes' : 'No'}</p>
                        <p>Latitude: {travelog.latitude}</p>
                        <p>Longitude: {travelog.longitude}</p> 
                        <div>
                            {isEditImagesMode ? (
                                <div>
                                    {displayImages.map((image, index) => (
                                        <div key={index}>
                                            {/* Input field to update image URL */}
                                            <input
                                                type="text"
                                                value={image.image_url}
                                                onChange={e => updateImageUrl(index, e.target.value)}
                                            />
                                            {/* Delete button */}
                                            <button onClick={() => removeImage(index)}>Delete</button>

                                            {/* Conditionally display the image */}
                                            {image.image_url && (
                                                <img src={image.image_url} alt={`Image ${index + 1}`} />
                                            )}
                                        </div>
                                    ))}
                                    <button onClick={addImage}>Add Image</button>
                                    
                                </div> 
                                
                            ) : (
                                <div>
                                    {travelog.Images.map((image, index) => (
                                        <img key={index} src={image.image_url} alt={`Image ${index + 1}`} />
                                    ))}
                                    
                                </div>
                                
                            )}
                        </div>
 
                        {currentUser && currentUser.username === travelog.User.username && (
                            <>
                                <button onClick={isEditImagesMode ? saveImages : () => setIsEditImagesMode(true)}>
                                    {isEditImagesMode ? 'Save Images' : 'Edit Images'}
                                </button>
                                {isEditImagesMode && (
                                    <button onClick={cancelEditImages}>Cancel</button>  
                                )}
                            </>
                        )}
                        <div>Travelog Entry: {travelog.textBody}</div>  


                        

                        {currentUser && currentUser.username === travelog.User.username && (
                            <button onClick={() => travelog && setIsEditMode(!isEditMode)}>Edit Travelog</button>
                        )}
                        {currentUser && currentUser.username === travelog.User.username && (
                          <>
                            <button onClick={() => setIsDeleteConfirmVisible(true)}>Delete Travelog</button>
                            {isDeleteConfirmVisible && (
                              <div>
                                <p>Are you sure you want to delete this travelog?</p>
                                <button onClick={handleDeleteTravelog}>Yes, Delete</button>
                                <button onClick={() => setIsDeleteConfirmVisible(false)}>Cancel</button>
                              </div>
                            )}
                          </>
                        )}
                        {/* <button onClick={handleReport}>Report Travelog?</button> */}
                        {travelog.reported ? (
                          <button onClick={handleToggleReport}>Clear Report?</button>
                        ) : (
                          <button onClick={handleToggleReport}>Report Travelog?</button>
                        )}
 
                        {isAdmin && (
                          <button onClick={handleAdminDeletion}>Administrative Deletion</button>
                        )}
                        <br/>
                        {/* Comment Code  */}
                        <CommentModal 
                        show={modalShow} 
                        handleClose={handleClose} 
                        travelog={travelog} 
                        onCommentSubmit={onCommentSubmit}
                        comments={comments} 
                        setComments={setComments}
                        /> 
                        <button onClick={() => setModalShow(true)}>Comment</button>
                        {/* {travelog && <CommentsList travelog={travelog} />} */}
                        {travelog && <CommentsList travelog={travelog} comments={comments} setComments={setComments}/>}
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