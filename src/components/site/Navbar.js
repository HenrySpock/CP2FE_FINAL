import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../user/UserContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'

function Navbar() {
  const { is_admin, isAuthenticated, logout,  

  //TALLYING 09
  unreadUserNotifications,
  unreadUserMessages,
  unreadAdminUserMessages,
  unreadAdminReports,

} = useContext(UserContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/results?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(''); 
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }; 

   // Function to render badge
   const renderBadge = (count, className) => {
    return count > 0 ? (
      <span className={className}>
        <span className="badge-text">{count}</span>
      </span>
    ) : null;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-custom">
      <div className="navbar-container">
        <div className="left">
          <NavLink to="/" className="active nav-link">Let's Go Castling!</NavLink>
          <NavLink to="/about" className="active nav-link">About</NavLink>
          {isAuthenticated && ( 
              <NavLink to="/abaci" className="active nav-link">Abaci</NavLink> 
          )}

        {isAuthenticated && (
          <div className="navbar-search">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyDown}
            />
            <button className="search-button" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        )}

        </div>
        <div className="right">
          {!isAuthenticated ? (
            <NavLink to="/auth" className="active nav-link">Register and Login</NavLink>
          ) : (
            <> 
              <NavLink to="/hub" className="active nav-link"> 
                User Hub {renderBadge(unreadUserNotifications, "badge badge-orange")}
              </NavLink>
              <NavLink to="/log_entry" className="active nav-link">Log An Entry</NavLink>
              <NavLink to="/create_trip" className="active nav-link">Create Trip</NavLink>
              {is_admin && (
                <> 
                  <NavLink to="/admin" className="active nav-link">
                    <div>
                      Admin Panel
                    </div>
                    <div className="admin-badge-container">
                      {renderBadge(unreadAdminUserMessages, "badge badge-blue")}
                      {renderBadge(unreadAdminReports, "badge badge-orange")}
                    </div>
                  </NavLink>
                </>
              )} 
              <NavLink to="/messaging" className="active nav-link"> 
                Messaging {renderBadge(unreadUserMessages, "badge badge-blue")}
              </NavLink>

              <NavLink to="/auth" className="active nav-link" onClick={handleLogout} >Logout</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
 