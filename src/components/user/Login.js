// Login Component 
import React, { useContext } from 'react';

function Login() { 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.target; 
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        formElement.reset();
        const { token, user } = await response.json();
        // Store user data and token in localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user)); // Store user data as JSON string

        alert('Login successful');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button> 
    </form>
  );
}

export default Login;

 
   