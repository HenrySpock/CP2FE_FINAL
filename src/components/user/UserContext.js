import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  isAdmin: false,
  isAuthenticated: false, // Include isAuthenticated state
  login: () => {}, // Include login function
  logout: () => {}, // Include logout function
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchUser() {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      if (token) {
        const response = await fetch('http://localhost:5000/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          console.log('User data:', userData);  // Log the user data
          setUser(userData);
          setIsAuthenticated(true); // Set isAuthenticated to true when user is authenticated
          setIsAdmin(userData.isAdmin);  // Update isAdmin based on user data
        } else {
          console.error('Failed to fetch user:', await response.text());  // Log error message if request fails
        }
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  const login = (userData) => {
    setUser(userData.user);  // Assuming userData has a user property with user data
    setIsAuthenticated(true);
    setIsAdmin(userData.user.isAdmin);  // Update isAdmin based on user data
    localStorage.setItem('token', userData.token); // Store the token in localStorage
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);  // Reset isAdmin to false on logout
    localStorage.removeItem('token'); // Remove the token from localStorage
  };

  useEffect(() => {
    fetchUser().finally(() => setIsLoading(false));  // Set loading to false when fetchUser is done
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isAdmin, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};




// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const isAdmin = user ? user.isAdmin : false;

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // async function fetchUser() {
//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     console.log('Token:', token);
//   //     if (token) {
//   //       const response = await fetch('http://localhost:5000/user', {
//   //         method: 'GET',
//   //         headers: {
//   //           'Authorization': `Bearer ${token}`
//   //         }
//   //       });
//   //       console.log('UserContext Response:', response);  // Log the response
//   //       if (response.ok) {
//   //         const userData = await response.json();
//   //         setUser(userData);
//   //         setIsAuthenticated(true); // Set isAuthenticated to true when user is authenticated
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching user:', error);
//   //   }
//   // }

//   async function fetchUser() {
//     try {
//       const token = localStorage.getItem('token');
//       console.log('Token:', token);
//       if (token) {
//         const response = await fetch('http://localhost:5000/user', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         if (response.ok) {
//           const userData = await response.json();
//           console.log('User data:', userData);  // Log the user data
//           setUser(userData);
//           setIsAuthenticated(true); // Set isAuthenticated to true when user is authenticated
//         } else {
//           console.error('Failed to fetch user:', await response.text());  // Log error message if request fails
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching user:', error);
//     }
//   }

//   // Add a login function
//   // const login = (userData) => {
//   //   setUser(userData);
//   //   setIsAuthenticated(true);
//   //   localStorage.setItem('token', userData.token); // Store the token in localStorage
//   // };

//   const login = (userData) => {
//     setUser(userData.user);  // Assuming userData has a user property with user data
//     setIsAuthenticated(true);
//     setIsAdmin(userData.user.isAdmin);  // Update isAdmin based on user data
//     localStorage.setItem('token', userData.token); // Store the token in localStorage
//   };

//   // Add a logout function
//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem('token'); // Remove the token from localStorage
//   };

//   // useEffect(() => {
//   //   fetchUser();
//   // }, []);

//   useEffect(() => {
//     fetchUser().finally(() => setIsLoading(false));  // Set loading to false when fetchUser is done
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser, isAdmin, isAuthenticated, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };