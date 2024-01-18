// About.js 
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../user/UserContext';
import './About.css' 

  
function Documentation() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(user);
  }, [user]);

  const goToAbout = () => {
    navigate('/about');
  };

  return (
    <div className="documentation-slate"> 
      <h1 className='heading-main'>DOCUMENTATION</h1>
      <h3 className='heading'>In which we give a bit more thorough description of how this site works and how to interact with it.</h3>

      <h3 className='heading'>Site Vocabulary</h3> 

      Let's Go Castling! is the app I made based on being told 'make something you're passionate about.' I love castles, cathedrals, architecture and art of the middle ages 
      through the Renaissance, in any country that has something akin to a stone fortress. This site catersto that for travelers, tallying up user appreciation for which
      log entries they like the best, which photos, which trips, which countries, which cities, etc. etc. etc. 

      So, to understand how this site 'talks':

      <h3 className='heading'>Trips</h3> 
      Trips are groups of travelogs, and there must be at least two travelogs to have a trip. On the trip details page, you will see map that shows everywhere you visited
      on that trip, ordered by date/time visited - if you went multiple places in one day, they are ordered by time of day. Your trips provide space to write a log entry 
      which includes images. This log entry can be liked for simply being fanastic, for having great writing, or for being eduactional (or all 3). There is no limit to 
      travelogs in a trip, and there is no limit to trips you can post. In addition, if you want to use the site for planning, simply uncheck the 'Have Visited' box when creating a trip
      and people will know this is either something you plan to do, or dream to do. You do not add images to trips, you add them to travelogs - the image used for the trip 
      map marker is the first image of the earliest travelog associated with it.

      <h3 className='heading'>Travelogs</h3> 
      Travelogs are entries for visiting a single site (whereas trips are groupings of entries for multiple sites). Travelogs can be liked, can be like for a user also 
      visited the site, for having visited more than once, for having great writing, or for having educational writing (or all 5.) I added different types of likes 
      specifically for the purpose of adding leaderboards to see what people like the most, and also so new users can look at those leaderboards to possibly find posters 
      they want to follow.

      <h3 className='heading'>Comments</h3> 
      You can comment on trips and travelogs alike, and have conversations with other users there are well. Keep it civil. I made it very easy for admins to ban people 
      who abuse the app. Commens can be liked.

      <h3 className='heading'>Images</h3> 
      It bears repeating that this is not an image hosting app. That would require funding. Currently, it allows you to enter urls from sites where you host images - 
      I like Flickr a lot for the purpose. Not ideal, but without funding, this is how the site works. Images can be liked.

      <h3 className='heading'>User Hub</h3> 
      This is your 'dashboard' (not the same as your Public Profile.) The map you see on this page will only be your trips and travelogs, and the feed at the bottom of the page will display trips and travelogs 
      of and friends / followers / followings you may have. 

      <h3 className='heading'>Public Profile</h3> 
      This is the page everyone who looks at your profile will see (not the same as your User Hub.) Here people will only see trips and travelogs that you have not marked 
      private. People can like you on your public profile for great writing and great photography.

      <h3 className='heading'>About Reporting</h3> 
      If you are reported for your conent, you may be notified or communicated with directly. Reports will have decisive action made within 3 days. If it's about content, 
      then the content needs to be modified per the Admin description, but if it's about harassment in any way, you will be blocked. This is not Twitter.

      <h3 className='heading'>About Blocking</h3> 
      <p>Blocking on this app works differently. I despise blocking obnoxious people or bots on other sites and having their comments still visible to all my other contacts. </p>
      <p>On this site, when you block someone, you cannot see them, they cannot see you, *period.* That means any page or content you have created will not be seeable by them,
      and vice versa. Any comments made by you or your blocker / blockee will simply not show up on your content any more. You stop existing for each other, unless the 
      blocker chooses to unblock the person on their Disconnections page (assuming they weren't banned). The caveat to this is if you are involved in conversations on 
      someone else's content and then one of you blocks the other, you will not be able to see each other's comments any more, but EVERYONE can still see the whole 
      conversation, so you may want to consider deleting comments if they are simply muddying up someone else's page. To be fair, you should consider not doing that in the 
      first place.</p>
    

      <h1 className='heading'>Now Let's Look At The Pages</h1> 
      <h2 className='heading'>For a logged out viewer</h2>
      The navbar has 3 links: 'Let's Go Castling!' is the home page, 'About' is the information page that linked you here, and 'Register and Login' is the auth page for joining.

      <h3 className='heading'>Let's Go Castling!</h3> 

      This is the main page. From here, you can see a map showing the 5 most recent travelogs. You also see clickable cards for the most recent traveler (user), most 
      recent trip, and most recent travelog. The sorting also works as expected. If you click any of the cards, you will be sent to the auth page to register and login. 

      <h3 className='heading'>About</h3> 

      But this is the site description (you are here), and also allows users who are not logged in to send feedback or qusetions to the admins.

      <h3 className='heading'>Register and Login</h3> 

      <p>This is the auth page, where you register as a new user and / or login. When you register, you will have to check your email from their will be redirected to the page
      to login. I should state here: this app is not affiliated with any parent company by the author and I do not collect your data. However, the host site, Render.com,
      may have different policies, and if that is concerning to you, do check with Render.com for there terms of service to see if they have a data collection policy. As 
      for the app itself, your actual name is never shown to anyone, only your username, so if you wish to remain anonymous, make your username different than your real name. </p>
      <p>If you have registered and cannot locate your username / passowrd, you can also reset it from this page based on your email and security question.</p>
       
      <h2 className='heading'>For A Logged In User</h2>  

      In your navbar, if you have notifications or messages, these will appear as badges next to your User Hub link - blue for messages, orange for notifactions. There are 
      now additional links once you log in.

      <h3 className='heading'>Let's Go Castling!</h3> 

      Now this page will display all trips and travelogs, and the cards for trips, travelogs, and most recent will all work as expected. In addition, there are two new 
      buttons at the top:
      <h3 className='heading'>Surprise Me!</h3> 
        This will take you to a random travelog to show you something may not normally see. 
      <h3 className='heading'>Other Views:</h3> 
        This page allows sorting based on UNESCO sites, Video Game Locations and Filming Locations, if thsoe are of interest to you.

      <h3 className='heading'>Abaci</h3> 
      Abaci is the plural of abacus. This is the leaderboard page. This is hear to help direct users to posts that are most appreciated, and provide that touch of fun 
      associated with being in a top 5. However, this is not intended as a competitive site. I could update this to show complete lists in addition to just the top 5
      if user's ask for it.
            
      <h3 className='heading'>Search</h3> 
      Once you login, you get a search bar. You can search for users, trips, travelogs and images. The searches are based on usernames, countries, cities, and sites. There 
      is currently very little 'intelligence' in the search parser, so your spelling does have to match entries in the database for them to be found. The search returns 
      are clickable and will send you to profiles / details just like the Home page does.

      <h3 className='heading'>User Hub</h3> 
      <p>Your page! Let's take a look.</p>
      <p>On the left you see sorting for your trips and travelogs. Note that Trips do not have categories, so if you click on 'trips', the categories button disappears.</p>
      <p>Below this, you see notifications. You may have many but only see 2 - have no fear! Click 'See All' and they will be shown in the middle of the screen. This was
      done to keep the view generally tidy. </p>

      On the right side you see your avatar, your basic details and 3 or 4 buttons. Everyone will see:
      <h3 className='heading'>See Connections</h3> 
        This page displays clickable user cards for your friends, your followers and your followings (people you follow.)
        
      <h3 className='heading'>See Public Profile</h3> 
        <p>On the left, users will see your avatar and the sorting for your map. When you are on someone else's profile, you will see an 'Interact' button which will display 
        buttons for befriending, following, blocking or reporting. You can easily unfriend and unfollow. You can unblock on the Disconnections page found from your 
        Edit Profile page. Reporting sends a notice to the admins about content and you can add a message to describe the issue.</p>
        <p>On the right, users will see your online indicator (green if you have been active in the last hour, yellow if not acdtive in the last hour but active in the last 
        12 hours, red if not active in the last 12 hours). Below the indicator you will see the bio - if the bio is longer than the space allotted, you can click 
        'see full bio' just like you do for notifications to see the full bio in the middle of the screen.</p>

        <h3 className='heading'>Edit Profile</h3> 
        <p>This takes you to a page where you can edit your name, email, avatar, security question / answer, and bio. If you are given the admin key, you can enter it here to
        update your profile to admin status. Note that if you are already an admin, this field is absent. </p>
        <p>At the bottom of the page, you have buttons to: </p>
          <p>Return to User Hub </p>
          <p>Toggle Tooltips </p>
          <p>Save Details (update your profile)</p>
          <p>Edit Password:</p>
            <p>You will need to enter your old password to do this. If you don't have it / forgot it, you can go tot he login page to reset it.</p>
          <p>Disconnections: </p>
            <p>From here, you can unblock users you have blocked or accept friend requests from users you have dismissed.</p>
          <p>Delete Profile </p>

      If a user grants you access to a private entry, you will have a button for 'Private Logs'.

      Underneath this whole section, users will see any trips and travelogs (the same as represented on the map) that are not marked private.

      <h3 className='heading'>Log An Entry</h3> 
      <p>Now let's walk through creating a travelog. This part of the site uses Yelp - you do not have to use Yelp, but it can make things faster. To check if Yelp is 
      available in the country you visited, you can go here: <a href="https://www.yelp.com/locations" target="blank">Yelp Locations</a> or simply try a search and see if 
      you get a return.</p>
      <p>You only need a country and a site, but adding a city helps, especially if there's room for confusion. Once you click search, you'll be shown five
      possible options to use for collecting details - if one of them looks correct, click it and you'll be prompted to use the details from that site. Do doublecheck
      that it looks correct. Using the Yelp search will automatically fill the site, latitude, longitude, country, state, city, address, phone number, and default url.</p>
      <p>The required fields are: </p>
      <p>Title - this is the title you want to give your travelog, not necessarily the name of the site (though it can be.) This is required so that your travelog will show
      up properly on map markers. </p>
      <p>The date - The date and a time are required for sorting purposes. Having an exact time has no bearing on the site, but if you plan to create a trip for multiple
      sites on a given day, at least guestimate a time so they will be ordered properly. </p>
      <p>Image URL - this is required so that map markers will display properly.</p>
      <p>Latitude and Longitude - Required so that markers will display properly. Yelp fills these in automatically. If Yelp doesn't work for your site, you can either
      search for the coordinates online or use the picker to place the marker where you want it - it does not have to be on the site, but if it's not near the site, people 
      will be confused by it on the map.  </p>
      <p>The rest of the details are all optional and up to how much information you want to display. </p>
      <p>After you click submit, you will be taken to the details page for your travelog and can add images or edit title and description for images, or write a formatted 
      log entry for your travelog. </p>

      <h3 className='heading'>Travelog Details Page</h3>         
          <p>On the left, you see the first image assocaited with the travelog. </p>
          <p>In the middle is the map showing the location of the site. </p>
          <p>On the right is the travelog details, which you can edit if you are the author.</p>
          <p>Below this you will see a section for Filiming Locations, Latitude and Longitude, and Video Game Locations.</p>
          <p>Next you will see the like buttons. </p>
          <p>Below this are buttons where you can write or edit an entry if you are the author or report if you are not the author.</p>
          <p>Next is the area provided for a log entry. </p>
          <p>Below this is the area for images. </p>
          <p>At the bottom is the comments section.</p>
      
      <h3 className='heading'>Create Trip</h3> 
      <p>Now let's walk through creating a trip.</p>
      <p>Your trip needs at least two travelogs, otherwise it's just a parent for a travelog.</p>
      <p>You do not need to enter any other data to create a trip. Once you click on two (or more) travelogs, the image url is the first image of the earliest travelog
      you add to the trip. The latitude and longitude are set as the center of the fathers distances between the entered travelogs. You do not have to enter a date.  </p>
      <p>You can choose whether to toggle the Have Visited or Is Private checkboxes. And that's it.</p>
      
      <h3 className='heading'>Trip Details Page</h3> 
          <p>On this page, you will see a map of all related travelogs on the left, displayed with numbers in order of when they were visited and a dashed line connecting them.</p>
          <p>There are buttons for hiding the numbering and lines.</p>
          <p>On the right you will see trip details. </p>
          <p>If you are the autheor, you will have buttons for editing trips details or granting permission for other users to see if it's a private trip. </p>
          <p>Below this are the like buttons. </p>
          <p>Below this are buttons where you can write or edit an entry if you are the author or report if you are not the author.</p>
          <p>Next is the log entry. </p>
          <p>Next is the list of associated travelog cards for the trip.</p>
          <p>At the bottom is the comments section.</p>

      <h3 className='heading'>Messaging</h3> 
      This pages displays cards for any / all of your friends. Clicking a friend card will open a conversation with them. If you delete the conversation, it will still exist 
      unless the other user deletes it also, but if either of you messages the other again, you will only see the new messages. The only people you can messages are your 
      friends in the app. If you have reported content, you may recieve messages from an admin that will appear at the top of the page. These should be handled as soon 
      as possible to prevent account consequences. If a friend is an admin and they have to communicate with you about a report on your content, their friend card moves to 
      an admin section until such time as that report is cleared. 

      <h2 className='heading'>For A Logged In Admind</h2> 
      (needs a check against user object for isAdmin=true)
      <h3 className='heading'>Admin Panel</h3> 
      <p>First off, in your navbar, if you have uncleared reports or messages from reported users, these will appear as badges next to your Admin Panel link - blue for messages
      and orange for reports.  </p>
      <p>On your admin panel, the top of the page has a button for scheduling site maintenance. When you schedule site maintenance, you will set a maintenance key that will
      allow you (and anyone who has the key - which should only be other admins) to log in during maintenance and also extend the maintenance period.  </p>
      <p>Below this, there are 4 areas for reports: </p>
      <p>Reported Users</p>
      <p>Reported Trips</p>
      <p>Reported Travelogs</p>
      <p>Reported Comments </p>
      <p>Each of these reports (when one is sent) provides options for the admin: </p>

      <p>View: </p>
          <p>This displays the complaint text if any. </p>
      <p>Communicate: </p>
          <p>This allows the admin to message the reported user directly. </p>
      <p>Notify: </p>
          <p>This sends a notification to the reported user that their account is under review.</p>
      <p>Clear: </p>
          <p>This clears the report once the reported issue has been addressed satisfactorily. </p>
      <p>Suspend User: </p>
          <p>Suspensions are for 3 days and prevent login. </p>
      <p>Ban User: </p>
          <p>Banning is permanent, delets any content related to the user and adds their email to the database whether it is prevented from being used again.</p>

      <p>If a report is older 3 days, it turns red, indicating some decision should be made.</p>

     
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={goToAbout} className="explicit-doc-btn heading">
          Back to About
        </button>
      </div>

    </div>
  );
}

export default Documentation;
