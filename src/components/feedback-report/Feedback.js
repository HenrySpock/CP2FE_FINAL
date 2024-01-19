// Feedback.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./About.css"

function Feedback() { 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      name: name,
      email: email,
      comment: comment
    };
  
    try {
      const response = await fetch('https://lgcbe.onrender.com/feedback/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
  
      // const data = await response.text();  
      // console.log('Feedback submitted successfully:', data);
 
      navigate('/about');
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  const handleCancel = () => {
    navigate('/about');
  };

  return (
    <form onSubmit={handleSubmit} className='feedback-slate'>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment" required></textarea>
      <div className='feedback-buttons'>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default Feedback; 