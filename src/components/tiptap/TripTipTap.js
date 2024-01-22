// TripTipTap.js
import React, { useState, useEffect, useContext } from 'react'; 
 
import { useNavigate, useParams } from 'react-router-dom';

import TipTap from './TipTap'

import checkForbiddenWords from '../travlog/CheckForbiddenWords';
import { UserContext } from '../user/UserContext';

import './TipTap.css'

const TripTipTap = () => {
 
  const navigate = useNavigate();
  const { id: trip_id } = useParams(); // Get the travelog ID from the URL
  const { user } = useContext(UserContext);   
  const [formattedText, setFormattedText] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
 
  // console.log('trip id: ', trip_id);

  useEffect(() => {
    const fetchTripentry = async () => {
      try {
        const response = await fetch(`https://lgcbe.onrender.com/trip/get_tripentry/${trip_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tripentry');
        }
        const data = await response.json();
        if (data.tripentry) {
          // console.log('data.tripentry: ', data.tripentry);
          setFormattedText(data.tripentry);
        }
      } catch (error) {
        console.error('Error fetching tripentry:', error);
      } finally {
        setIsLoading(false);  
      }
    };
  
    fetchTripentry();
  }, [trip_id]);

  useEffect(() => {
    // console.log('Formatted text after update:', formattedText);
  }, [formattedText]);

   // Function to handle the formatted text from TipTap
   const handleFormattedText = (text) => {
    setFormattedText(text);
    // console.log('Formatted text received in TripTipTap:', text);
  };  

  const handleSaveEntryClick = async () => {
    try {  

      const cleanText = formattedText;  
      const forbiddenWordsFound = await checkForbiddenWords(cleanText);
  
      if (forbiddenWordsFound.length > 0) {
        setError(`Let's change our message. Forbidden words found: ${forbiddenWordsFound.join(', ')}`);
        return; // Stop the function here as forbidden words are found
      }

      const response = await fetch(`https://lgcbe.onrender.com/trip/update_tripentry/${trip_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tripentry: formattedText, user_id: user.user_id }),
      });
  
      if (response.ok) {
        // console.log("Entry saved successfully");
        navigate(`/trip_det/${trip_id}`); 
      } else {
        throw new Error("Failed to save entry");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteEntryClick = async () => {
    try {
      const response = await fetch(`https://lgcbe.onrender.com/trip/delete_tripentry/${trip_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.user_id }), // If user_id is required for authorization checks
      });
  
      if (response.ok) {
        // console.log("Entry deleted successfully");
        navigate(`/trip_det/${trip_id}`);
      } else {
        throw new Error("Failed to delete entry");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelClick = () => {
    navigate(`/trip_det/${trip_id}`); // Navigate back to the travelog details page
  };

  return (
    <div className='trip-tip-tap'>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      <div>      

        {isLoading ? (
          <p>Loading editor...</p>
        ) : (
          <TipTap maxLength={10000} postFormattedText={handleFormattedText} initialContent={formattedText} />
        )}

        <div className='trip-tip-tap-save'> 
          {/* ... TipTap editor setup ... */}
          <button className='tiptap-format-btn bottom-btn' type='button' onClick={handleSaveEntryClick}>Save Entry</button>
          <button className='tiptap-format-btn bottom-btn' type='button' onClick={handleDeleteEntryClick}>Delete Entry</button>
          <button className='tiptap-format-btn bottom-btn' type='button' onClick={handleCancelClick}>Cancel</button> 
          
        </div>
        
      </div>
    </div>
  );
};

export default TripTipTap;




 