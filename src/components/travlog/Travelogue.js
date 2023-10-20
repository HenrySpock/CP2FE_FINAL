// TheTour.js
import React, { useContext } from 'react';
import { UserContext } from '../user/UserContext';

function TheTour() {
  const { user } = useContext(UserContext);
  if (!user) {
    return <div>You need to be logged in to view this page.</div>;
  } 

  return (
    <div> 
      <div className="recent-posts">
        <h2>Recent Entries</h2>
        {/* Logic to fetch and display the most recent 4 posts */}
      </div>
      <div className="countries">
        {['Afghanistan', 'Albania', 'Argentina', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Brazil', 'Bulgaria', 'Canada', 'China', 'Colombia', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Dominican Republic', 'Egypt', 'Estonia', 'Ethiopia', 'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Guernsey', 'Hungary', 'India', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Japan', 'Jersey', 'Jordan', 'Kenya', 'Korea', 'Latvia', 'Lebanon', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Mexico', 'Moldova', 'Mongolia', 'Namibia', 'Netherlands', 'New Zealand', 'North Macedonia', 'Norway', 'Pakistan', 'Poland', 'Portugal', 'Romania', 'Russia', 'Saudi Arabia', 'Serbia', 'Slovakia', 'Slovenia', 'South Africa', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Syria', 'Tibet', 'Turkey', 'Ukraine', 'United Kingdom', 'United States', 'Venezuela', 'Yemen'].map(country => (
          <div className="country-card" key={country}>
            {country}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TheTour;
 
 