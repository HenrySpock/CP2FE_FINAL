import React, { useContext, useState, useEffect, useRef} from 'react';
import { UserContext } from '../user/UserContext';
import axios from 'axios';

import { countryCodeMapping } from './CountryCodeMapping';

const convertCountryCodeToName = (countryCode) => {
  return countryCodeMapping[countryCode] || countryCode;
};

const initialFormData = { 
  site: '',
  country: '', 
  state: '',
  city: '',
  latitude: '',
  longitude: '',
  dateVisited: '',
  title: '',
  textBody: '',
  imageUrls: [''],
  address: '',
  phoneNumber: '',
  isPrivate: false,
}; 

function Modal({ show, onClose, onConfirm }) {
  return (
    <>
      {show && (
        <div className="overlay" onClick={onClose}></div>  // Allows closing the modal when overlay is clicked.
      )}
      <div style={{ display: show ? 'block' : 'none' }} className="modal">
        <p>Use details for this location?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </>
  );
}

function LogEntry() {
  const { user } = useContext(UserContext);
  const [searchCountry, setSearchCountry] = useState('');
  const [searchState, setSearchState] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchPOI, setSearchPOI] = useState('');
  const [yelpData, setYelpData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  // const [selectedAdress, setSelectedAdress] = useState(null);
  // const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null); 
  const handlePrivacyChange = (event) => {
    const isPrivate = event.target.checked;
    console.log(isPrivate);
    setFormData(prevState => ({
      ...prevState,
      isPrivate: isPrivate,
    }));
  };

  const [formData, setFormData] = useState({ 
    site: '',
    country: '',
    state: '',
    city: '',
    latitude: '',
    longitude: '',
    dateVisited: '',
    title: '',
    textBody: '',
    imageUrls: [''],
    address: '',
    phoneNumber: '',
    isPrivate: false,
  });

  const addImageUrlField = () => {
    setFormData(prevState => ({
      ...prevState,
      imageUrls: [...prevState.imageUrls, ''],
    }));
  };

  const isValidImageUrl = (url, callback) => {
      const img = new Image();
      img.onload = () => callback(true);
      img.onerror = () => callback(false);
      img.src = url;
  };

  const updateImageUrl = (index, url) => {
    const updatedImageUrls = [...formData.imageUrls];
    updatedImageUrls[index] = url;
    setFormData(prevState => ({
      ...prevState,
      imageUrls: updatedImageUrls,
    }));
  };

  const removeImageUrl = (index) => {
    const updatedImageUrls = [...formData.imageUrls];
    updatedImageUrls.splice(index, 1);
    setFormData(prevState => ({
      ...prevState,
      imageUrls: updatedImageUrls,
    }));
  };

  const populateForm = (country, state, city, poi, latitude, longitude, address, phoneNumber) => {
    country = convertCountryCodeToName(country);
    setFormData(prevState => ({
      ...prevState,
      country,
      state,
      city,
      site: poi,
      latitude,
      longitude,
      address, 
      phoneNumber
    }));
    setShowModal(true);
  };

  const handleCardClick = (business) => {
    setSelectedBusiness(business);  // Store the clicked business details
    setShowModal(true);            // Display the modal
  };

  const searchYelp = async (country, state, city, poi) => {
      // Validate input
      if (!country) {
        setError('Country is required for search.');
        return;
      }

    try {
      setError(null); // Clear any previous errors
      const response = await axios.get('http://localhost:5000/yelp-search', {
        params: {
          country,
          state,
          city,
          poi,
        },
      });
      setYelpData(response.data.businesses);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(<span>No locations found. You might check your spelling or limit key words. Additionally, Yelp! only operates in certain countries - <a href="https://www.yelp.com/locations" target="_blank" rel="noopener noreferrer">https://www.yelp.com/locations</a> this doesn't mean you can't log your visit, it just means you have to do it manually.</span>);
      // TODO: Add user-friendly error handling here.
    }

    setSearchCountry('');
    setSearchState('');
    setSearchCity('');
    setSearchPOI('');
  };
  
  const resetForm = () => {
    // Reset the form data state to its initial values
    setFormData(initialFormData);
    setYelpData([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Clear any previous errors
    setError(null);

    // Check the validity of each image URL
    const areImageUrlsValid = await Promise.all(
      formData.imageUrls.map((url) =>
        new Promise((resolve) => {
          isValidImageUrl(url, resolve);
        })
      )
    );
  
    if (areImageUrlsValid.every((isValid) => isValid)) {
      // All image URLs are valid, proceed with form submission
      console.log("Form submitted");
      console.log('User ID in handleSubmit: ', user.user_id);
  
      const dataToSend = {
        ...formData,
        user_id: user.user_id, // <-- access user_id from user object
      };
  
      try {
        // Submit the travelog data and the image URLs together
        const response = await axios.post('http://localhost:5000/api/travelog', dataToSend);
        console.log('All data saved successfully', response.data);
        resetForm();
        setIsPrivate(false);
      } catch (error) {
        console.error('Error submitting the data:', error);
      }
    } else {
      // Display an error message because some image URLs are invalid
      setError('One or more image URLs are invalid. Please check and try again.');
    }
  };
  

  return (
    
    <div>

      <Modal 
        show={showModal} 
        onClose={() => {
          setSelectedBusiness(null);  // Clear the selected business when closing the modal
          setShowModal(false);
        }}
 
        onConfirm={() => {
          // Populate the form details with the selected business
          // populateForm(selectedBusiness.location.country, selectedBusiness.location.city, selectedBusiness.name, selectedBusiness.coordinates.latitude, selectedBusiness.coordinates.longitude);
          populateForm(selectedBusiness.location.country, selectedBusiness.location.state, selectedBusiness.location.city, selectedBusiness.name, selectedBusiness.coordinates.latitude, selectedBusiness.coordinates.longitude, selectedBusiness.location.display_address, selectedBusiness.display_phone);
          const addressString = selectedBusiness.location.display_address.join(' ');
          setFormData(prevData => ({ ...prevData, imageUrls: [selectedBusiness.image_url, ...prevData.imageUrls.slice(1)], address: addressString }));
          
          // Update the yelpData to only have the selected business
          setYelpData([selectedBusiness]);
  
          setSelectedBusiness(null);  // Clear the selected business after confirming
          setShowModal(false);       // Close the modal
        }}
      >
        {/* Any additional content inside the modal, if needed. */}
      </Modal>

        

      <h1>Log Your Visit</h1>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <input type="text" value={searchCountry} onChange={e => setSearchCountry(e.target.value)} placeholder="Country" />
      <input type="text" value={searchState} onChange={e => setSearchState(e.target.value)} placeholder="State" />
      <input type="text" value={searchCity} onChange={e => setSearchCity(e.target.value)} placeholder="City" />
      <input type="text" value={searchPOI} onChange={e => setSearchPOI(e.target.value)} placeholder="POI" />
      <button onClick={() => searchYelp(searchCountry, searchState, searchCity, searchPOI)}>Search Yelp</button>
      
      <div className="image-response-row">
        {yelpData.map(business => (
          <div className="image-response-div" key={business.id} onClick={() => handleCardClick(business)}>            
            <img src={business.image_url} alt={business.name} onError={(e)=>{e.target.onerror = null; e.target.src="/not_found.jpg"}} />
            <p className="image-response-p">Name: {business.name}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}> 
        <label>
          Site:
          <input type="text" value={formData.site} onChange={e => setFormData({ ...formData, site: e.target.value })} />
        </label>
        <label>
          Country:
          <input type="text" value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} />
        </label>
        <label>
          State:
          <input type="text" value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} />
        </label>
        <label>
          City:
          <input type="text" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
        </label>

        <label>
          Latitude:
          <input
            type="text"
            value={formData.latitude.toString()} // Ensure it's a string representation
            onChange={e =>
              setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })
            }
          />
        </label>
        <label>
          Longitude:
          <input
            type="text"
            value={formData.longitude.toString()} // Ensure it's a string representation
            onChange={e =>
              setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })
            }
          />
        </label>
        <label>
          Date Visited:
          <input type="date" value={formData.dateVisited} onChange={e => setFormData({ ...formData, dateVisited: e.target.value })} required/>
        </label> 
        <label>
          Title:
          <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
        </label>
        <label>
          Entry:
          <textarea value={formData.textBody} onChange={e => setFormData({ ...formData, textBody: e.target.value })} 
          maxLength={10000}
          placeholder="Limit is 10,000 characters."
          ></textarea>
        </label>
        <label>
          Address:
          <input type="text" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
        </label>
        <label>
          Phone Number:
          <input type="text" value={formData.phoneNumber} onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })} />
        </label>
        <label>
          Private:
          <input type="checkbox" name="isPrivate" checked={formData.isPrivate} onChange={handlePrivacyChange} />
        </label>
        <div>
          Image URLs:
          {formData.imageUrls.map((url, index) => (
            <div key={index}>
              <input type="text" value={url} onChange={e => updateImageUrl(index, e.target.value)} />
              {index > 0 && <button type="button" onClick={() => removeImageUrl(index)}>Delete</button>}
            </div>
          ))}
          <button type="button" onClick={addImageUrlField}>Add another image?</button>
        </div>
        <br/>
        <button type="submit">Submit Entry</button>
      </form>
    </div>
  );
}

export default LogEntry;

 