// About.js 
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../user/UserContext';
import './About.css' 

  
function About() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(user);
  }, [user]);

  const goToDocumentation = () => {
    navigate('/documentation');
  };

  return (
    <div className="about-page">
      <h1 className='heading'>LET'S GO CASTLING!</h1>
      <h3 className='heading'>(Well, what's that mean?)</h3>
      <p>
        Welcome traveler! This is 'Let's go castling!', an app I've been thinking about for quite some time. My original goal was to simply log various places I have been, 
        which expanded from castles to cathedrals to medieval buildings to musuems - and so on. But, to make it useful to others, it needed to have as many options as possible,
        even beyond the medieval / Renaissance sites I most enjoy. So, here we have a light social-media app with blogging functionality which is tied to trips or places you've either
        visited or would like to visited. There's no other form of post (but there's also no spam and no data collection.) Whether you're a seasoned traveler or a dreamer planning 
        your first adventure, Castle Tracker provides a platform to explore, share, and connect over the historical marvels scattered across the globe - and also share the best hotel
        you slept in, the best gelatto you found, the best stadium you've ever seen, the best cup of coffee or glass of wine - the only limit is how much you like talking about travel!
      </p>
      
      <h2 className='heading'>Features</h2>
      <ul>
        <li><strong>Integrated Yelp searches:</strong> The way this site works is taking in details about a place you visited and then displaying that entry on a map. One of the ways this is facilitated is by using Yelp! for travelog entries. If your searching for locations in countries where Yelp! operates, this speeds up filling in the details a great deal.</li>
        <li><strong>Interactive Leaflet Maps:</strong> All entries for places visited are shown on interactive maps.</li>
        <li><strong>Discover Medieval Points of Interest:</strong> Search for castles, cathedrals and other points of interest by name or country, and explore user-submitted points of interest.</li>
        <li><strong>Create Travelogs:</strong> Share your own experiences by adding a new point of interest. You can provide personalized comments, share URLs of photos from platforms like Instagram, Pinterest, or Flickr, and choose whether to keep your submissions private or share them with the Castle Tracker community.</li>
        <li><strong>Create Trips:</strong> 'Trips' are groups of travelogs, which are viewed on a Trips page that links to all associated travelogs. It also displays them on a map ordered by the date and time you visited them.</li>
        <li><strong>Surprise Me:</strong> The "Surprise Me!" button will lead you to a random travelogue with the goal of showing you something new and wonderful.</li>
        <li><strong>Manage Your Own Travel History:</strong> All users have a User Hub page which displays their trips and travelogs. All blog entries for trips and travelogs have rich text formatting via TipTap.</li>
        <li><strong>The Social Media Experience:</strong> First of all, you are displayed by your username, and other users do not see your email. They cannot access other personal details, because we don't collect them. Beyond that, you have friending, following, blocking, and messaginc friends directly, along with several specifica 'like' types for users, trips, travelogs, comments and images.</li>
        <li><strong>User Interactions:</strong> Connect with other castle enthusiasts by leaving comments on points of interest or messaging friended users directly. You can also simply follow people you enjoy. Have a question or feedback? You can message the admins directly on this page.</li>
        <li><strong>Moderated Content:</strong> Our dedicated admin team ensures a respectful and informative community by reviewing flagged content, managing user submissions and preventing egregious posts to the best of their ability. Rest assured, I don't want drama, so I don't want you to have drama either.</li>
        <li><strong>Please note, this is not an image hosting site:</strong> For the time being, this is an unfunded site hosted freely. As such, we do not have the ability to host your iamages. When posting images, you need to use urls from another site, such as Flickr. Less than ideal, but functional for a free site that does as much as it does.</li>
      </ul>
      
      <h2 className='heading'>Get Involved</h2>
      <p>
        We value your feedback and suggestions to improve our little site. Share your thoughts through our <Link to="/feedback">Feedback Form</Link>. Stay tuned as we continually enhance our platform with more features and detailed documentation.
      </p>
      
      <p>
        Thank you for going castling with us! Happy exploring!
      </p>
     
    {user &&
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={goToDocumentation} className="explicit-doc-btn heading">
          Explicit Documentation
        </button>
      </div>
    }

    </div>
  );
}

export default About;
