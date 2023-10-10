// Feedback.js
import React, { useState } from 'react';

function Feedback() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      name: name,
      email: email,
      comment: comment
    };
  
    try {
      const response = await fetch('http://localhost:5000/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
  
      const data = await response.text();  // Adjust this line based on the response format you expect
      console.log('Feedback submitted successfully:', data);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment" required></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Feedback;
