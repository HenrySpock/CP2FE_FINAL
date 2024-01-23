import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ImageLikes from './TravImageLikes'
import './TravDet.css'
import TravDetFullScreen from './TravDetFullScreen'

function TravDetImageEdit({ user, travelogId, fetchTravelog, initialImages, username ='', profileUser, userData }) {
    const [images, setImages] = useState(initialImages || []); 
    const [isEditImagesMode, setIsEditImagesMode] = useState(false);
    const [fullscreenImageUrl, setFullscreenImageUrl] = useState(null);
    const [imageInfo, setImageInfo] = useState([]);
    const [currentTitle, setCurrentTitle] = useState([]);
    const [currentDescription, setCurrentDescription] = useState([]); 

    const [deletedImageIds, setDeletedImageIds] = useState([]);

    // console.log('on TravDetImageEdit username: ', username, 'profileuser: ', profileUser, 'images: ', images)
 

  const openFullscreenModal = (image_url, image_id, title, description) => {
    // console.log("Opening fullscreen for:", image_url, 'image_id: ', image_id, 'title', title, 'description', description);
    setFullscreenImageUrl(image_url); 
    setCurrentTitle(title);
    setCurrentDescription(description);
 
    if (username && profileUser && username !== profileUser) {
      incrementImageViewCount(image_id); 
    } else {
      // console.log('Condition not met, and incrementImageViewCount not called');
    }
    };

    const closeFullscreenModal = () => {    
      setFullscreenImageUrl(null);
      resetToInitialImages();
    };

    const resetToInitialImages = () => {
      setImages(initialImages);
      const initialImageInfo = initialImages.map(img => ({
          title: img.title || '',
          description: img.description || ''
      }));
      setImageInfo(initialImageInfo);
    };

    const incrementImageViewCount = async (image_id) => {
        try {
          const response = await fetch(`https://lgcbe.onrender.com/viewcount/api/image/increment-view-count/${image_id}`, {
            method: 'PATCH',
          });
      
          if (!response.ok) {
            throw new Error('Failed to increment image view count');
          }
        } catch (error) {
          console.error('Error incrementing image view count:', error);
        }
      }; 

    const updateImageUrl = (index, url) => {
        const updatedImages = [...images];
        updatedImages[index].image_url = url;
     
        const updatedImageInfo = [...imageInfo];
        if (!updatedImageInfo[index]) {
            updatedImageInfo[index] = {};
        }
    
        // Update title and description in the image object
        updatedImages[index].title = updatedImageInfo[index].title;
        updatedImages[index].description = updatedImageInfo[index].description;
    
        setImages(updatedImages);
        setImageInfo(updatedImageInfo); // Update the imageInfo state
    };

    const updateImageInfo = (index, key, value) => {
        const updatedImageInfo = [...imageInfo];
        if (!updatedImageInfo[index]) {
          updatedImageInfo[index] = {};
        }
        updatedImageInfo[index][key] = value;
        // console.log('imageinfo (title and description): ', imageInfo)
        setImageInfo(updatedImageInfo);
      };


    useEffect(() => {
      // console.log('Initial images loaded: ', initialImages)
      setImages(initialImages);

      const initialImageInfo = initialImages.map(img => ({
        title: img.title || '',
        description: img.description || ''
      }));
      setImageInfo(initialImageInfo);
    }, [initialImages]);   

    const removeImage = (index) => {
      if (images.length > 1) {
          const updatedImages = [...images];
          const imageToDelete = updatedImages.splice(index, 1)[0]; // Remove the image at the specified index
          
          setImages(updatedImages);
  
          const updatedImageInfo = [...imageInfo];
          updatedImageInfo.splice(index, 1); // Remove the corresponding image info
  
          setImageInfo(updatedImageInfo); 
  
          // Add the ID of the deleted image to the deletedImageIds state
          if (imageToDelete.image_id) {
              setDeletedImageIds(prevIds => [...prevIds, imageToDelete.image_id]);
          }
      }
    };
   
    const addImage = () => {
        setImages([...images, { image_url: '' }]);
        setImageInfo([...imageInfo, {}]);  
    };
   
    const saveImages = async () => {
      try {
          // First, delete the images marked for deletion
          if (deletedImageIds.length > 0) {
              await axios.post(`https://lgcbe.onrender.com/travelog/api/travelog/${travelogId}/delete-images`, {
                  imageIds: deletedImageIds,
                  user_id: user.user_id,
              });
          }
  
          // Then, save the remaining images
          const response = await axios.patch(`https://lgcbe.onrender.com/travelog/api/travelog/${travelogId}/images`, {
              images: images,
              user_id: user.user_id,
              imageInfo: imageInfo,
          });
  
          if (response.status === 200) {
              // console.log('Save images response:', response.data);
              await fetchTravelog();
              setIsEditImagesMode(false);
              setDeletedImageIds([]); // Reset the deletedImageIds state
          }
      } catch (error) {
          console.error('Error saving images:', error);
      }
    };
  
    const moveImageLeft = (index) => {
        if (index > 0) {
            const newImages = [...images];
            [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
            setImages(newImages);
    
            const newImageInfo = [...imageInfo];
            [newImageInfo[index - 1], newImageInfo[index]] = [newImageInfo[index], newImageInfo[index - 1]];
            setImageInfo(newImageInfo);
        }
    };
    
    const moveImageRight = (index) => {
        if (index < images.length - 1) {
            const newImages = [...images];
            [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
            setImages(newImages);
    
            const newImageInfo = [...imageInfo];
            [newImageInfo[index], newImageInfo[index + 1]] = [newImageInfo[index + 1], newImageInfo[index]];
            setImageInfo(newImageInfo);
        }
    }; 

    const editImagesView = (
        <div className="trav-image-gallery"> 
              {images.filter(image => !image.delete).map((image, index) => (
                <div key={index} className="image-edit-container">
                    <input
                        type="text"
                        placeholder="Image-URL"
                        value={image.image_url}
                        onChange={(e) => updateImageUrl(index, e.target.value)}
                        className="image-url-input"
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        value={(imageInfo[index] && imageInfo[index].title) || ''}
                        onChange={(e) => updateImageInfo(index, 'title', e.target.value)}
                        maxLength={107}
                        className="image-title-input"
                    />
                        <textarea
                        placeholder="Description"
                        value={(imageInfo[index] && imageInfo[index].description) || ''}
                        onChange={(e) => updateImageInfo(index, 'description', e.target.value)}
                        maxLength={404}
                        className="image-description-textarea"
                    />  

                    {images.length > 1 && !image.delete && (
                        <button onClick={() => removeImage(index)} className="delete-image-button">
                            Delete
                        </button>
                    )}

                    { (images.length === 1 || image.delete) && (
                        <button disabled className="delete-image-button-disabled">
                            Delete
                        </button>
                    )}


                    {index > 0 && (
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="image-move-left"
                            onClick={() => moveImageLeft(index)}
                        />
                    )}
                    {image.image_url && (
                        <img src={image.image_url} alt={`Gallery ${index + 1}`} className="trav-gallery-image" />
                    )}

                    {index < images.length - 1 && (
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className="image-move-right"
                            onClick={() => moveImageRight(index)}
                        />
                    )}
                    
                </div>
            ))}
            <div className='gallery-edit-buttons-container'>
                <button onClick={addImage} className="gallery-edit-button">
                    Add Image
                </button>
                <button onClick={saveImages} className="gallery-edit-button">
                    Save Images
                </button>
                <button onClick={() => { 
                  setIsEditImagesMode(false);
                  resetToInitialImages();
                  setDeletedImageIds([]);
                  }} className="gallery-edit-button">
                    Cancel
                </button> 
            </div>
        </div>
    );

    const displayImagesView = (
        <div className="trav-image-gallery">
          {initialImages.map((image, index) => (
            <div key={index} className="gallery-image">
              <div className="image-info">
                <p className="title-area"><i>Title:</i> <strong>{image.title || 'No title'}</strong></p>
                <p className="description-area"><i>Description:</i> {image.description || 'No description'}</p>
              </div>
              <img src={image.image_url} alt={`Gallery ${index + 1}`} className="trav-gallery-image" onClick={() => openFullscreenModal(image.image_url, image.image_id, image.title, image.description)} />
              <br></br>
              <ImageLikes
                currentUser={username}
                profileUser={profileUser}
                userData={userData}
                contextUser={user}
                travelog_id={travelogId}
                image_id={image.image_id} 
              />


            </div>
            
          ))}
        {username === profileUser && (
            <button onClick={() => setIsEditImagesMode(true)} className="gallery-edit-button">
            Edit Images
            </button>
        )}
        {fullscreenImageUrl && ( 
            <TravDetFullScreen 
              image_url={fullscreenImageUrl}
              title={currentTitle}
              description={currentDescription} 
              onClose={closeFullscreenModal} 
            />
        )}
        </div>
      );
      

    return <div>{isEditImagesMode ? editImagesView : displayImagesView}</div>;
}

export default TravDetImageEdit;
