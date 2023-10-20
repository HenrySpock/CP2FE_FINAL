// Registration Component 
import React from 'react';  

function Register() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.target;
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    
      if (response.ok) {
        alert('Registration successful, please login');
        formElement.reset();
      } else {
        const errorData = await response.json();  
        if (errorData.error === 'Username exists') {
          alert('Username exists, try another');
        } else {
          alert('Registration failed');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

    return (
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" required />
        <input type="text" name="lastName" placeholder="Last Name" required />
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <input type="password" name="retypedPassword" placeholder="Retype Password" required />
        <input type="text" name="adminKey" placeholder="Admin Key" />
        <select name="securityQuestion" defaultValue="Select a security question" required>
          <option value="What is the name of your first pet?">What is the name of your first pet?</option>
          <option value="What is your mother's maiden name?">What is your mother's maiden name?</option> 
          <option value="What is the worst Star Wars movie?">What is the worst Star Wars movie?</option>
          <option value="What is the best Led Zeppelin album?">What is the best Led Zeppelin album?</option>
        </select>
          <input type="text" name="answer" placeholder="Answer" required />
        <input type="text" name="avatar" placeholder="Avatar URL" />
        <textarea name="bio" placeholder="Bio: 1000 Characters or Less" rows="4" cols="50" maxLength={1000}></textarea >
        <button type="submit">Register</button>  
      </form>
    );
  } 

export default Register;