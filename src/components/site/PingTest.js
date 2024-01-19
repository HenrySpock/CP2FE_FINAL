import { useEffect } from 'react';

function PingTest() {
  useEffect(() => { 
    const backendPingUrl = '${API_BASE_URL}/ping';  

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
        console.log(data);  
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return null;  
}

export default PingTest;
