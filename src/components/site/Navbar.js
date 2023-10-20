import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../user/UserContext';
// import logout from './user/Logout';

function Navbar() {
  const { user, isAdmin, isAuthenticated, logout } = useContext(UserContext);
  const navigate = useNavigate(); // ***

  const handleLogout = () => {
    // Perform logout logic (e.g., call logout function from context)
    logout();

    // Redirect to the homepage ('/')
    navigate('/');
  };

  return (
    <nav>
      <div className="left">
        <NavLink to="/" activeClassName="active">Castle Tracker!</NavLink>
        <NavLink to="/about" activeClassName="active">About</NavLink>
        {isAuthenticated && (
          <>
            <NavLink to="/travelogue" activeClassName="active">Travelogue</NavLink>
            <NavLink to="/tally" activeClassName="active">Tally Stick</NavLink>
            <NavLink to="/log_entry" activeClassName="active">Log An Entry</NavLink>
          </>
        )}
      </div>
      <div className="right">
        {!isAuthenticated ? (
          <NavLink to="/auth" activeClassName="active">Register and Login</NavLink>
        ) : (
          <>
            <NavLink to="/hub" activeClassName="active">User Hub</NavLink>
            {isAdmin && (
              <NavLink to="/admin" activeClassName="active">Admin Panel</NavLink>
            )}
            <NavLink to="/logout" activeClassName="active" onClick={handleLogout}>Logout</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
 
 
