import React, { createContext, useState, useEffect } from 'react'; 

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  is_admin: false,
  isAuthenticated: false, 
  login: () => {}, 
  logout: () => {}, 



  //TALLYING 01
  unreadUserNotifications: 0, 
  setUnreadUserNotifications: () => {},
  unreadUserMessages: 0,
  setUnreadUserMessages: () => {},
  unreadAdminUserMessages: 0,
  setUnreadAdminUserMessages: () => {}, 
  unreadAdminReports: 0,
  setUnreadAdminReports: () => {}, 
});

export const UserProvider = ({ children }) => { 
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [is_admin, setIs_admin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
 
  //TALLYING 02
  const [unreadUserNotifications, setUnreadUserNotifications] = useState(0);
  const [unreadUserMessages, setUnreadUserMessages] = useState(0);
  const [unreadAdminUserMessages, setUnreadAdminUserMessages] = useState(0);
  const [unreadAdminReports, setUnreadAdminReports] = useState(0);
  
  let fetchUser;
  let logout;

  const login = async (userData) => {
    setUser(userData.user);   
    setIsAuthenticated(true);
    setIs_admin(userData.user.is_admin);  // Update is_admin based on user data
    localStorage.setItem('token', userData.token); // Store the token in localStorage

    // console.log("Logging in, user data:", userData);
    if (userData.user && userData.user.user_id) {
      try {
        // Attempt to create an indicator if it doesn't exist 
        await fetch('https://lgcbe.onrender.com/user/api/indicator', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userData.user.user_id })
        });
  
        // Then update the login status
        await fetch('https://lgcbe.onrender.com/user/api/indicator/login', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userData.user.user_id })
        });
      } catch (error) {
        console.error('Error updating login status:', error);
      }
    }
  };

  logout = async () => {
    // console.log('LOGGING OUT - USER_ID: ', user.user_id)
    setUser(null);
    setIsAuthenticated(false);
    setIs_admin(false);  // Reset is_admin to false on logout
    localStorage.removeItem('token'); // Remove the token from localStorage
    
    
    // console.log("Logging out, user data:", user);
    if (user && user.user_id) {
      try {
        await fetch('https://lgcbe.onrender.com/user/api/indicator/logout', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: user.user_id })
        });
      } catch (error) {
        console.error('Error updating logout status:', error);
      }
    } 
  }; 

  useEffect(() => { 
    const fetchData = async () => {
      await fetchUser();
      setIsLoading(false);
    };
    fetchData();
  }, [fetchUser]);

  fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      // console.log('Token:', token);
      if (token) {
        const response = await fetch('https://lgcbe.onrender.com/user/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          // console.log('User data:', userData);  
          setUser(userData);
          setIsAuthenticated(true);  
          setIs_admin(userData.is_admin);  

          // Check for suspension
          const suspensionResponse = await fetch(`https://lgcbe.onrender.com/feedback/api/check-suspension?userEmail=${encodeURIComponent(userData.email)}`);
          // console.log('suspensionResponse: ', suspensionResponse)
          if (suspensionResponse.ok) {
            const suspensionData = await suspensionResponse.json();
            // console.log('suspensionData: ', suspensionData)
            if (suspensionData.isSuspended) {
              logout(); // Logout the user if they are suspended
            }
          }

        } else {
          console.error('Failed to fetch user:', await response.text());  // Log error message if request fails
        }
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }; 

  return (
    <UserContext.Provider value={{ user, setUser, is_admin, isAuthenticated, login, logout, isLoading,

      //TALLYING 03
      unreadUserNotifications, setUnreadUserNotifications,
      unreadUserMessages, setUnreadUserMessages,
      unreadAdminUserMessages, setUnreadAdminUserMessages,
      unreadAdminReports, setUnreadAdminReports,

    }}>
      {children}
    </UserContext.Provider>
  );
}; 