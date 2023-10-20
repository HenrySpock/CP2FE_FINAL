import React, { useContext } from 'react';
import { UserContext } from '../user/UserContext';

function TallyStick() {
  const { user, isAuthenticated } = useContext(UserContext);

  // Check if the user is authenticated, and if not, show a message or redirect
  if (!isAuthenticated) {
    // You can redirect to the login page or show a message here
    return <p>Please log in to access the Tally Stick.</p>;
  }

  return (
    <div>
      <h2>Tally Stick</h2>
      <section>
        <h3>Top 5 Travelers</h3>
        {/* Add content for this section */}
      </section>
      <section>
        <h3>Top 5 Most Visited Sites</h3>
        {/* Add content for this section */}
      </section>
      <section>
        <h3>Top 5 Most Visited Countries</h3>
        {/* Add content for this section */}
      </section>
      <section>
        <h3>Top 5 Places People Have Visited</h3>
        {/* Add content for this section */}
      </section>
      <section>
        <h3>Top 5 Places People Most Want to Visit</h3>
        {/* Add content for this section */}
      </section>
      <section>
        <h3>Top 5 Places People Most Want to Revisit</h3>
        {/* Add content for this section */}
      </section>
    </div>
  );
}

export default TallyStick;
