// Registration Component 
// function Register() {
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formElement = event.target;
//     const formData = new FormData(event.target);
//     const data = Object.fromEntries(formData);

//     try {
//       const response = await fetch('http://localhost:5000/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//       });

//       if (response.ok) {
//         alert('Registration successful');
//         formElement.reset();
//       } else {
//         alert('Registration failed');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="firstName" placeholder="First Name" required />
//       <input type="text" name="lastName" placeholder="Last Name" required />
//       <input type="text" name="username" placeholder="Username" required />
//       <input type="email" name="email" placeholder="Email" required />
//       <input type="password" name="password" placeholder="Password" required />
//       <input type="password" name="retypedPassword" placeholder="Retype Password" required />
//       <input type="text" name="adminKey" placeholder="Admin Key" />
//       <button type="submit">Register</button> 
//     </form>
//   );
// }

// export default Register;
  
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  

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
  
      const data = await response.text();
      console.log('Feedback submitted successfully:', data);

      // Navigate to the /about route after successful submission
      navigate('/about');
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
