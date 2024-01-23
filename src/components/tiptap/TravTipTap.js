// TravTipTap.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import { UserContext } from '../user/UserContext'
import TipTap from './TipTap'

import checkForbiddenWords from '../travlog/CheckForbiddenWords';

import './TipTap.css' 

const TravTipTap = () => {
  const navigate = useNavigate();
  const { id: travelog_id } = useParams(); // Get the travelog ID from the URL
  const { user } = useContext(UserContext);  
  const [formattedText, setFormattedText] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const fetchTraventry = async () => {
      try {
        const response = await fetch(`https://lgcbe.onrender.com/travelog/get_traventry/${travelog_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch traventry');
        }
        const data = await response.json();
        if (data.traventry) { 
          setFormattedText(data.traventry); 
        }
      } catch (error) {
        console.error('Error fetching traventry:', error);
      } finally {
        setIsLoading(false);  
      }
    };
  
    fetchTraventry();
  }, [travelog_id]);

  useEffect(() => {
    // console.log('Formatted text after update:', formattedText);
  }, [formattedText]);

   // Function to handle the formatted text from TipTap
   const handleFormattedText = (text) => {
    setFormattedText(text);
    // console.log('Formatted text received in TravTipTap:', text);
  }; 
 
  const handleSaveEntryClick = async () => {
    try {  

      const cleanText = formattedText;  

      // console.log('Saving entry with content:', cleanText); 

      const forbiddenWordsFound = await checkForbiddenWords(cleanText);
  
      if (forbiddenWordsFound.length > 0) {
        setError(`Let's change our message. Forbidden words found: ${forbiddenWordsFound.join(', ')}`);
        return; // Stop the function here as forbidden words are found
      }

      const response = await fetch(`https://lgcbe.onrender.com/travelog/update_traventry/${travelog_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ traventry: formattedText, user_id: user.user_id }),
      });
  
      if (response.ok) {
        // console.log("Entry saved successfully");
        navigate(`/trav_det/${travelog_id}`);
      } else {
        throw new Error("Failed to save entry");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteEntryClick = async () => {
    try {
      const response = await fetch(`https://lgcbe.onrender.com/travelog/delete_traventry/${travelog_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.user_id }),
      });
  
      if (response.ok) {
        // console.log("Entry deleted successfully");
        navigate(`/trav_det/${travelog_id}`);
      } else {
        throw new Error("Failed to delete entry");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleCancelClick = () => {
    navigate(`/trav_det/${travelog_id}`); // Navigate back to the travelog details page
  };
  
  return (
    <div className='trav-tip-tap'>
      {error && <div className="error-message">{error}</div>}  
      <div>      

        {isLoading ? (
          <p>Loading editor...</p>
        ) : (
          <TipTap maxLength={10000} postFormattedText={handleFormattedText} initialContent={formattedText} />
        )}

        <div className='trav-tip-tap-save'> 
          {/* ... TipTap editor setup ... */}
          <button className='tiptap-format-btn bottom-btn' type='button' onClick={handleSaveEntryClick}>Save Entry</button>
          <button className='tiptap-format-btn bottom-btn' type='button' onClick={handleDeleteEntryClick}>Delete Entry</button>
          <button className='tiptap-format-btn bottom-btn' type='button' onClick={handleCancelClick}>Cancel</button>  
        </div>
        
      </div>
    </div>
  );
};

export default TravTipTap;