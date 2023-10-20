// About.js
// import React from 'react';
import { Link } from 'react-router-dom';

import React, { useContext, useEffect } from 'react';
import { UserContext } from '../user/UserContext';

function About() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="about-page">
      <h1>About Castle Tracker</h1>
      <p>
        Welcome to Castle Tracker, a Medieval themed travelogue app. Whether you're a seasoned traveler or a dreamer planning your next adventure, Castle Tracker provides a platform to explore, share, and connect over the historical marvels scattered across the globe.
      </p>
      
      <h2>Features:</h2>
      <ul>
        <li><strong>Discover Medieval Points of Interest:</strong> Search for castles, cathedrals and other points of interest by name or country, and explore user-submitted points of interest.</li>
        <li><strong>Create Travelogues:</strong> Share your own experiences by adding a new point of interest. You can provide personalized comments, share URLs of photos from platforms like Instagram, Pinterest, or Flickr, and choose whether to keep your submissions private or share them with the Castle Tracker community.</li>
        <li><strong>Surprise Me:</strong> The "Surprise Me!" button will lead you to a random travelogue with the goal of showing you something new and wonderful.</li>
        <li><strong>User Interactions:</strong> Connect with other castle enthusiasts by leaving comments on points of interest or messaging users directly. Have a question or feedback? You can message the admins directly.</li>
        <li><strong>Moderated Content:</strong> Our dedicated admin team ensures a respectful and informative community by reviewing flagged content, managing user submissions and preventing egregious content to the best of their ability..</li>
      </ul>
      
      <h2>Get Involved:</h2>
      <p>
        We value your feedback and suggestions to improve Castle Tracker. Share your thoughts through our <Link to="/feedback">Feedback Form</Link>. Stay tuned as we continually enhance our platform with more features and detailed documentation.
      </p>
      
      <p>
        Thank you for being a part of Castle Tracker. Happy exploring!
      </p>
    </div>
  );
}

export default About;
