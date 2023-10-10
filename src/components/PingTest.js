import React, { useEffect } from 'react';

function PingTest() {
  useEffect(() => {
    // Define the URL of your backend's ping endpoint
    const backendPingUrl = 'http://localhost:5000/ping'; // Replace with your actual backend URL and endpoint

    // Make a GET request to the backend's ping endpoint
    fetch(backendPingUrl)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Backend is not reachable');
        }
      })
      .then((data) => {
        console.log(data); // Should log "pong" if the backend is running properly
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return null; // This component doesn't render any UI elements
}

export default PingTest;
