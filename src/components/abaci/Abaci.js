import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../user/UserContext';
import './Abaci.css';

function Abaci() {
  // Context to access the current user
  const { user } = useContext(UserContext);
 
  const [prolificAuthors, setProlificAuthors] = useState([]);
  const [prolificTripAuthors, setProlificTripAuthors] = useState([]);
  const [prolificTravelogAuthors, setProlificTravelogAuthors] = useState([]);

  const [prolificPhotographers, setProlificPhotographers] = useState([]);
  const [mostFollowedTravelers, setMostFollowedTravelers] = useState([]);
  const [mostFollowedAuthors, setMostFollowedAuthors] = useState([]);

  const [mostFollowedPhotographers, setMostFollowedPhotographers] = useState([]);
  const [likedTravelers, setLikedTravelers] = useState([]);
  const [likedAuthors, setLikedAuthors] = useState([]);

  const [likedTripAuthors, setLikedTripAuthors] = useState([]);
  const [likedTravelogAuthors, setLikedTravelogAuthors] = useState([]);
  const [likedPhotographers, setLikedPhotographers] = useState([]);

  const [topTripTravelers, setTopTripTravelers] = useState([]);
  const [topTravelogTravelers, setTopTravelogTravelers] = useState([]);
  const [mostLikedTrips, setMostLikedTrips] = useState([]);

  const [mostLikedTravelogs, setMostLikedTravelogs] = useState([]);
  const [mostDiverseTravelers, setMostDiverseTravelers] = useState([]); 
  const [educationalTrips, setEducationalTrips] = useState([]);

  const [informativeTravelogs, setInformativeTravelogs] = useState([]);
  const [mostEducationalAuthors, setMostEducationalAuthors] = useState([]);  
  const [longestTrips, setLongestTrips] = useState([]);

  const [densestTrips, setDensestTrips] = useState([]);  
  const [diverseTrips, setDiverseTrips] = useState([]);
  const [diverseTravelers, setDiverseTravelers] = useState([]); 

  const [countriesMostVisited, setCountriesMostVisited] = useState([]);
  const [countriesMostWantToVisit, setCountriesMostWantToVisit] = useState([]);
  const [countriesMostWantToRevisit, setCountriesMostWantToRevisit] = useState([]);  

  const [citiesVisited, setCitiesVisited] = useState([]);
  const [citiesMostWantToVisit, setCitiesMostWantToVisit] = useState([]);
  const [citiesMostWantToRevisit, setCitiesMostWantToRevisit] = useState([]);  

  const [sitesVisited, setSitesVisited] = useState([]);
  const [sitesMostWantToVisit, setSitesMostWantToVisit] = useState([]);
  const [sitesMostWantToRevisit, setSitesMostWantToRevisit] = useState([]);

  const [videoGameSitesVisited, setVideoGameSitesVisited] = useState([]);
  const [videoGameSitesMostWantToVisit, setVideoGameSitesMostWantToVisit] = useState([]);
  const [videoGameSitesMostWantToRevisit, setVideoGameSitesMostWantToRevisit] = useState([]);

  const [filmSitesVisited, setFilmSitesVisited] = useState([]);
  const [filmSitesMostWantToVisit, setFilmSitesMostWantToVisit] = useState([]);
  const [filmSitesMostWantToRevisit, setFilmSitesMostWantToRevisit] = useState([]);

  const [unescoSitesVisited, setUNESCOSitesVisited] = useState([]);
  const [unescoSitesMostWantToVisit, setUNESCOSitesMostWantToVisit] = useState([]);
  const [unescoSitesMostWantToRevisit, setUNESCOSitesMostWantToRevisit] = useState([]);  

  const [diverseTripConversations, setDiverseTripConversations] = useState([]);
  const [diverseTravelogConversations, setDiverseTravelogConversations] = useState([]);
  const [longestTripConversations, setLongestTripConversations] = useState([]);

  const [longestTravelogConversations, setLongestTravelogConversations] = useState([]);
  const [mostLikedCommenters, setMostLikedCommenters] = useState([]);
  const [topLikedTripComments, setTopLikedTripComments] = useState([]);

  const [topLikedTravelogComments, setTopLikedTravelogComments] = useState([]);
  const [topLikedImages, setTopLikedImages] = useState([]);   
  const [mostViewedProfiles, setMostViewedProfiles] = useState([]);

  const [mostViewedTrips, setMostViewedTrips] = useState([]);  
  const [mostViewedTravelogs, setMostViewedTravelogs] = useState([]);
  const [mostViewedImages, setMostViewedImages] = useState([]); 
  
  // "Most Prolific Authors"
  const fetchProlificAuthors = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/prolific-authors');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log('Prolific Author data: ', data) 
      setProlificAuthors(data); 
    } catch (error) {
      console.error('Error fetching prolific authors:', error);
    }
  };
  
  useEffect(() => {
    fetchProlificAuthors();
  }, []);

  // "Most Prolific Trip Authors"
  const fetchProlificTripAuthors = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/prolific-trip-authors');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log('Prolific Trip Author data: ', data) 
      setProlificTripAuthors(data); 
    } catch (error) {
      console.error('Error fetching prolific authors:', error);
    }
  };
  
  useEffect(() => {
    fetchProlificTripAuthors();
  }, []);

  // "Most Prolific Travelog Authors"
  const fetchProlificTravelogAuthors = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/prolific-travelog-authors');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log('Prolific Travelog Author data: ', data) 
      setProlificTravelogAuthors(data);  
    } catch (error) {
      console.error('Error fetching prolific authors:', error);
    }
  };
  
  useEffect(() => {
    fetchProlificTravelogAuthors();
  }, []);

  // Fetch function for Most Prolific Photographers
  const fetchProlificPhotographers = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/prolific-photographers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      //  console.log('Prolific Photographers: ', data) 
      setProlificPhotographers(data);  
    } catch (error) {
      console.error('Error fetching prolific photographers:', error);
    }
  };
 
  useEffect(() => {
    fetchProlificPhotographers();
  }, []);

  // Fetch function for Top 5 Followed Users
  const fetchMostFollowedUsers = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/top-followed-users');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log('Most followed: ', data) 
      setMostFollowedTravelers(data); 
    } catch (error) {
      console.error('Error fetching top followed users:', error);
    }
  };
 
  useEffect(() => {
    fetchMostFollowedUsers();
  }, []);
 
  // Fetch function for Most Followed Authors
  const fetchMostFollowedAuthors = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/most-followed-authors');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log('Most followed authors: ', data) 
      setMostFollowedAuthors(data);  
    } catch (error) {
      console.error('Error fetching most followed authors:', error);
    }
  };
 
  useEffect(() => {
    fetchMostFollowedAuthors();
  }, []);

  // Fetch function for Most Followed Photographers
  const fetchMostFollowedPhotographers = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/most-followed-photographers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log('Most followed photographers: ', data) 
      setMostFollowedPhotographers(data); 
    } catch (error) {
      console.error('Error fetching most followed photographers:', error);
    }
  };
 
  useEffect(() => {
    fetchMostFollowedPhotographers();
  }, []);

  // Fetch most liked travelers 
  const fetchLikedTravelers = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/most-liked-travelers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); 
      // console.log('Most liked travelers: ', data) 
      setLikedTravelers(data); 
    } catch (error) {
      console.error('Error fetching most liked travelers:', error);
    }
  };

  useEffect(() => {
    fetchLikedTravelers();
  }, []);

  // Inside your React component
  const fetchLikedAuthors = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/most-liked-authors');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log('Most liked authors: ', data); 
      setLikedAuthors(data);  
    } catch (error) {
      console.error('Error fetching most liked authors:', error);
    }
  };
  
  useEffect(() => {
    fetchLikedAuthors();
  }, []);

  // Fetching most liked trip authors 
  const fetchLikedTripAuthors = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/most-liked-trip-authors');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log('Most liked trip authors: ', data);
      setLikedTripAuthors(data);  
    } catch (error) {
      console.error('Error fetching most liked authors:', error);
    }
  };
  
  useEffect(() => {
    fetchLikedTripAuthors();
  }, []);

  // Fetching most liked trip authors 
  const fetchLikedTravelogAuthors = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/most-liked-travelog-authors');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log('Most liked travelog authors: ', data);
      setLikedTravelogAuthors(data);  
    } catch (error) {
      console.error('Error fetching most liked authors:', error);
    }
  };
  
  useEffect(() => {
    fetchLikedTravelogAuthors();
  }, []);

    // Fetching most liked photographers
  const fetchLikedPhotographers = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/most-liked-photographers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log('Most liked photographers: ', data);
      setLikedPhotographers(data);
    } catch (error) {
      console.error('Error fetching most liked photographers:', error);
    }
  };

  useEffect(() => {
    fetchLikedPhotographers();
  }, []);

    // Fetching users who have taken the most trips
  const fetchTopTripTravelers = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/top-trip-travelers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log('Most Traveled Trip Takers: ', data); 
      setTopTripTravelers(data); 
    } catch (error) {
      console.error('Error fetching top trip users:', error);
    }
  };
   
  useEffect(() => {
    fetchTopTripTravelers();
  }, []);

  // Fetching users who have visited the most sites
  const fetchTopTravelogTravelers = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/top-travelog-travelers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log('Most Traveled Travelog Site Visiters: ', data); 
      setTopTravelogTravelers(data); 
    } catch (error) {
      console.error('Error fetching top trip users:', error);
    }
  };
   
  useEffect(() => {
    fetchTopTravelogTravelers();
  }, []);

  const fetchMostLikedTrips = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/most-liked-trips');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMostLikedTrips(data);
    } catch (error) {
      console.error('Error fetching most liked trips:', error);
    }
  };
  
  useEffect(() => {
    fetchMostLikedTrips();
  }, []);

  const fetchMostLikedTravelogs = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/most-liked-travelogs');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMostLikedTravelogs(data);
    } catch (error) {
      console.error('Error fetching most liked travelogs:', error);
    }
  };
  
  useEffect(() => {
    fetchMostLikedTravelogs();
  }, []);

  const fetchTopUsersByUniqueCountries = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/top-users-by-unique-countries');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMostDiverseTravelers(data);
    } catch (error) {
      console.error('Error fetching top users by unique countries:', error);
    }
  };
  
  useEffect(() => {
    fetchTopUsersByUniqueCountries();
  }, []);
  
  // This is for the process of adding map icons. I wanted to use flag icons, but while they are fine in Firefox, they are not in Chrome.
  const countryNameToCode = {  
    "Albania": "AL",
    "Andorra": "AD",
    "Austria": "AT",
    "Belgium": "BE",
    "Bosnia-Herzegovina": "BA",
    "Bulgaria": "BG",
    "Cambodia": "KH",
    "China": "CN",
    "Croatia": "HR",
    "Cyprus": "CY",
    "Czech Republic": "CZ",
    "Denmark": "DK",
    "Estonia": "EE",
    "Finland": "FI",
    "France": "FR",
    "Germany": "DE",
    "Greece": "GR",
    "Hungary": "HU",
    "Iceland": "IS",
    "India": "IN",
    "Indonesia": "ID",
    "Ireland": "IE",
    "Italy": "IT",
    "Japan": "JP",
    "Jordan": "JO",
    "Latvia": "LV",
    "Liechtenstein": "LI",
    "Lithuania": "LT",
    "Luxembourg": "LU",
    "Macedonia": "MK",
    "Malta": "MT",
    "Moldova": "MD",
    "Monaco": "MC",
    "Montenegro": "ME",
    "Myanmar": "MM",
    "Nepal": "NP",
    "Netherlands": "NL",
    "Norway": "NO",
    "Poland": "PL",
    "Portugal": "PT",
    "Romania": "RO",
    "San Marino": "SM",
    "Scotland": "GB-SCO",
    "Serbia": "RS",
    "Slovakia": "SK",
    "Slovenia": "SI",
    "South Korea": "KR",
    "Spain": "ES",
    "Sweden": "SE",
    "Switzerland": "CH",
    "Thailand": "TH",
    "Turkey": "TR",
    "Ukraine": "UA",
    "United Kingdom": "GB",
    "United States": "US",
    "Vatican City": "VA",
    "Vietnam": "VN",
    "Wales": "GB-WLS",

  };

// Fetch function for Most Visited Countries
const fetchCountriesMostVisited = async () => {
  try {
    const response = await fetch('https://lgcbe.onrender.com/abaci/countries-most-traveled');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setCountriesMostVisited(data.map(country => ({
      ...country,
      flagPath: `/countries/${countryNameToCode[country.country]}.png` // path to the flag image
    })));
  } catch (error) {
    console.error('Error fetching countries most traveled:', error);
  }
};
  
  useEffect(() => {
    fetchCountriesMostVisited();
  });

  const fetchCountriesMostWantToVisit = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/countries-most-want-to-visit');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCountriesMostWantToVisit(data.map(country => ({
        ...country,
        flagPath: `/countries/${countryNameToCode[country.country]}.png`
      })));
    } catch (error) {
      console.error('Error fetching countries most want to visit:', error);
    }
  };
  
  useEffect(() => {
    fetchCountriesMostWantToVisit();
  });

  const fetchCountriesMostWantToRevisit = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/countries-most-want-to-revisit');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCountriesMostWantToRevisit(data.map(country => ({
        ...country,
        flagPath: `/countries/${countryNameToCode[country.country]}.png`
      })));
    } catch (error) {
      console.error('Error fetching countries most want to revisit:', error);
    }
  };
  
  useEffect(() => {
    fetchCountriesMostWantToRevisit();
  });

  const fetchCitiesVisited = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/cities-visited');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCitiesVisited(data.map(city => ({
        ...city,
        link: `/country/${city.country}` 
      })));
    } catch (error) {
      console.error('Error fetching cities visited:', error);
    }
  };
  
  useEffect(() => {
    fetchCitiesVisited();
  }, []);

  const fetchCitiesMostWantToVisit = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/cities-most-want-to-visit');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCitiesMostWantToVisit(data.map(city => ({
        ...city,
        link: `/country/${city.country}` 
      })));
    } catch (error) {
      console.error('Error fetching cities most want to visit:', error);
    }
  };
  
  useEffect(() => {
    fetchCitiesMostWantToVisit();
  }, []);

  const fetchCitiesMostWantToRevisit = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/cities-most-want-to-revisit');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCitiesMostWantToRevisit(data.map(city => ({
        ...city,
        link: `/country/${city.country}`
      })));
    } catch (error) {
      console.error('Error fetching cities most want to revisit:', error);
    }
  };
  
  useEffect(() => {
    fetchCitiesMostWantToRevisit();
  }, []);

  const fetchSitesVisited = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/sites-visited');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSitesVisited(data.map(site => ({
        ...site,
        link: `results?query=${site.site}`,
        flagPath: `/countries/${countryNameToCode[site.country]}.png`
      })));
    } catch (error) {
      console.error('Error fetching sites visited:', error);
    }
  };
  
  useEffect(() => {
    fetchSitesVisited();
  }); 
  
  const fetchSitesMostWantToVisit = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/sites-most-want-to-visit');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSitesMostWantToVisit(data.map(site => ({
        ...site,
        link: `results?query=${site.site}`,
        flagPath: `/countries/${countryNameToCode[site.country]}.png`
      })));
    } catch (error) {
      console.error('Error fetching sites most want to visit:', error);
    }
  };
  
  useEffect(() => {
    fetchSitesMostWantToVisit();
  }); 
  
  const fetchSitesMostWantToRevisit = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/sites-most-want-to-revisit');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSitesMostWantToRevisit(data.map(site => ({
        ...site,
        link: `results?query=${site.site}`,
        flagPath: `/countries/${countryNameToCode[site.country]}.png`
      })));
    } catch (error) {
      console.error('Error fetching sites most want to revisit:', error);
    }
  };
  
  useEffect(() => {
    fetchSitesMostWantToRevisit();
  });

  const fetchVideoGameSitesVisited = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/video-game-sites-visited');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVideoGameSitesVisited(data);
    } catch (error) {
      console.error('Error fetching video game sites visited:', error);
    }
  };
  
  useEffect(() => {
    fetchVideoGameSitesVisited();
  }, []);

  const fetchVideoGameSitesMostWantToVisit = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/video-game-sites-most-want-to-visit');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVideoGameSitesMostWantToVisit(data);
    } catch (error) {
      console.error('Error fetching video game sites most want to visit:', error);
    }
  };
  
  useEffect(() => {
    fetchVideoGameSitesMostWantToVisit();
  }, []);

  const fetchVideoGameSitesMostWantToRevisit = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/video-game-sites-most-want-to-revisit');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVideoGameSitesMostWantToRevisit(data);
    } catch (error) {
      console.error('Error fetching video game sites most want to revisit:', error);
    }
  };
  
  useEffect(() => {
    fetchVideoGameSitesMostWantToRevisit();
  }, []);

  const fetchFilmSitesVisited = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/film-sites-visited');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFilmSitesVisited(data);
    } catch (error) {
      console.error('Error fetching film sites visited:', error);
    }
  };
  
  useEffect(() => {
    fetchFilmSitesVisited();
  }, []);

  const fetchFilmSitesMostWantToVisit = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/film-sites-most-want-to-visit');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFilmSitesMostWantToVisit(data);
    } catch (error) {
      console.error('Error fetching film sites most want to visit:', error);
    }
  };
  
  useEffect(() => {
    fetchFilmSitesMostWantToVisit();
  }, []);

  const fetchFilmSitesMostWantToRevisit = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/film-sites-most-want-to-revisit');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFilmSitesMostWantToRevisit(data);
    } catch (error) {
      console.error('Error fetching film sites most want to revisit:', error);
    }
  };
  
  useEffect(() => {
    fetchFilmSitesMostWantToRevisit();
  }, []);

  const fetchUNESCOSitesVisited = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/unesco-sites-visited');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUNESCOSitesVisited(data);
    } catch (error) {
      console.error('Error fetching UNESCO sites visited:', error);
    }
  };
  
  useEffect(() => {
    fetchUNESCOSitesVisited();
  }, []);

  const fetchUNESCOSitesMostWantToVisit = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/unesco-sites-most-want-to-visit');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUNESCOSitesMostWantToVisit(data);
    } catch (error) {
      console.error('Error fetching UNESCO sites most want to visit:', error);
    }
  };
  
  useEffect(() => {
    fetchUNESCOSitesMostWantToVisit();
  }, []);

  const fetchUNESCOSitesMostWantToRevisit = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/unesco-sites-most-want-to-revisit');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUNESCOSitesMostWantToRevisit(data);
    } catch (error) {
      console.error('Error fetching UNESCO sites most want to revisit:', error);
    }
  };
  
  useEffect(() => {
    fetchUNESCOSitesMostWantToRevisit();
  }, []);

  const fetchEducationalTrips = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/educational-trips');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEducationalTrips(data);
    } catch (error) {
      console.error('Error fetching educational trips:', error);
    }
  };
  
  useEffect(() => {
    fetchEducationalTrips();
  }, []); 
  
  const fetchInformativeTravelogs = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/informative-travelogs');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setInformativeTravelogs(data);
    } catch (error) {
      console.error('Error fetching informative travelogs:', error);
    }
  };
  
  useEffect(() => {
    fetchInformativeTravelogs();
  }, []); 
  
  const fetchMostEducationalAuthors = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/most-educational-authors');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMostEducationalAuthors(data);
    } catch (error) {
      console.error('Error fetching most educational authors:', error);
    }
  };
  
  useEffect(() => {
    fetchMostEducationalAuthors();
  }, []);

  const fetchLongestTrips = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/longest-trips');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLongestTrips(data);
    } catch (error) {
      console.error('Error fetching top 5 longest trips:', error);
    }
  };
  
  useEffect(() => {
    fetchLongestTrips();
  }, []);

  const fetchDensestTrips = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/densest-trips');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDensestTrips(data);
    } catch (error) {
      console.error('Error fetching top 5 densest trips:', error);
    }
  };
  
  useEffect(() => {
    fetchDensestTrips();
  }, []);

  const fetchDiverseTrips = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/diverse-trips');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDiverseTrips(data);
    } catch (error) {
      console.error('Error fetching top 5 most diverse trips:', error);
    }
  };
  
  useEffect(() => {
    fetchDiverseTrips();
  }, []);

  const fetchDiverseTravelers = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/diverse-travelers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDiverseTravelers(data);
    } catch (error) {
      console.error('Error fetching top 5 most diverse travelers:', error);
    }
  };
  
  useEffect(() => {
    fetchDiverseTravelers();
  }, []);

  const fetchDiverseTripConversations = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/diverse-trip-conversations');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDiverseTripConversations(data);
    } catch (error) {
      console.error('Error fetching most diverse trip conversations:', error);
    }
  };
  
  useEffect(() => {
    fetchDiverseTripConversations();
  }, []);

  const fetchDiverseTravelogConversations = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/diverse-travelog-conversations');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDiverseTravelogConversations(data);
    } catch (error) {
      console.error('Error fetching most diverse travelog conversations:', error);
    }
  };
  
  useEffect(() => {
    fetchDiverseTravelogConversations();
  }, []);

  const fetchLongestTripConversations = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/longest-trip-conversations');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLongestTripConversations(data);
    } catch (error) {
      console.error('Error fetching top 5 longest trip conversations:', error);
    }
  };
  
  useEffect(() => {
    fetchLongestTripConversations();
  }, []);

  const fetchLongestTravelogConversations = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/longest-travelog-conversations');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLongestTravelogConversations(data);
    } catch (error) {
      console.error('Error fetching top 5 longest travelog conversations:', error);
    }
  };
  
  useEffect(() => {
    fetchLongestTravelogConversations();
  }, []);

  const fetchMostLikedCommenters = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/most-liked-commenters');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMostLikedCommenters(data);
    } catch (error) {
      console.error('Error fetching most liked commenters:', error);
    }
  };
  
  useEffect(() => {
    fetchMostLikedCommenters();
  }, []);

  const fetchTopLikedTripComments = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/top-liked-trip-comments');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTopLikedTripComments(data);
    } catch (error) {
      console.error('Error fetching top liked trip comments:', error);
    }
  };
  
  useEffect(() => {
    fetchTopLikedTripComments();
  }, []);

  const fetchTopLikedTravelogComments = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/top-liked-travelog-comments');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTopLikedTravelogComments(data);
    } catch (error) {
      console.error('Error fetching top liked travelog comments:', error);
    }
  };
  
  useEffect(() => {
    fetchTopLikedTravelogComments();
  }, []);

  const fetchTopLikedImages = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/top-liked-images');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTopLikedImages(data);  
    } catch (error) {
      console.error('Error fetching top liked images:', error);
    }
  };
  
  useEffect(() => {
    fetchTopLikedImages();
  }, []);

  const fetchMostViewedProfiles = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/most-viewed-profiles');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMostViewedProfiles(data);  
    } catch (error) {
      console.error('Error fetching most viewed profiles:', error);
    }
  };
  
  useEffect(() => {
    fetchMostViewedProfiles();
  }, []);

  const fetchMostViewedTrips = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/most-viewed-trips');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMostViewedTrips(data); 
    } catch (error) {
      console.error('Error fetching most viewed trips:', error);
    }
  };
  
  useEffect(() => {
    fetchMostViewedTrips();
  }, []);

  const fetchMostViewedTravelogs = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/most-viewed-travelogs');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMostViewedTravelogs(data);  
    } catch (error) {
      console.error('Error fetching most viewed travelogs:', error);
    }
  };
  
  useEffect(() => {
    fetchMostViewedTravelogs();
  }, []);

  const fetchMostViewedImages = async () => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/abaci/most-viewed-images');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMostViewedImages(data);  
    } catch (error) {
      console.error('Error fetching most viewed images:', error);
    }
  };
  
  useEffect(() => {
    fetchMostViewedImages();
  }, []);

  // *******************

  const renderLeaderboardCard = (title, data, tooltipText) => {
    return (
      <div className="leaderboard-card">

        <div className="tooltip">
          <h3>{title}</h3>
          {user && user.tooltips === true && 
            <span className="tooltip-text">{tooltipText}</span>
          }
        </div>
      
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <a href={item.link}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
 
  // *******************

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log('Waiting for data...');
      // fetchTopFiveProlificTripTakers();  
      fetchProlificAuthors(); 
      fetchProlificTripAuthors(); 
      fetchProlificTravelogAuthors(); 
      fetchProlificPhotographers(); 
      fetchMostFollowedUsers(); 
      fetchMostFollowedAuthors(); 
      fetchMostFollowedPhotographers(); 
      fetchLikedTravelers(); 
      fetchLikedAuthors(); 
      fetchLikedTripAuthors(); 
      fetchLikedTravelogAuthors(); 
      fetchLikedPhotographers(); 
      fetchTopTripTravelers(); 
      fetchTopTravelogTravelers(); 
      fetchMostLikedTrips(); 
      fetchMostLikedTravelogs(); 
      fetchTopUsersByUniqueCountries(); 
      fetchCountriesMostVisited(); 
      fetchCountriesMostWantToVisit(); 
      fetchCountriesMostWantToRevisit(); 
      fetchCitiesVisited(); 
      fetchCitiesMostWantToVisit(); 
      fetchCitiesMostWantToRevisit(); 
      fetchSitesVisited(); 
      fetchSitesMostWantToVisit(); 
      fetchSitesMostWantToRevisit(); 
      fetchVideoGameSitesVisited(); 
      fetchVideoGameSitesMostWantToVisit(); 
      fetchVideoGameSitesMostWantToRevisit(); 
      fetchFilmSitesVisited(); 
      fetchFilmSitesMostWantToVisit();  
      fetchFilmSitesMostWantToRevisit(); 
      fetchUNESCOSitesVisited(); 
      fetchUNESCOSitesMostWantToVisit(); 
      fetchUNESCOSitesMostWantToRevisit(); 
      fetchEducationalTrips(); 
      fetchInformativeTravelogs(); 
      fetchMostEducationalAuthors(); 
      fetchLongestTrips(); 
      fetchDensestTrips(); 
      fetchDiverseTrips(); 
      fetchDiverseTravelers(); 
      fetchDiverseTripConversations(); 
      fetchLongestTripConversations(); 
      fetchLongestTravelogConversations();
      fetchMostLikedCommenters();
      fetchTopLikedTripComments();
      fetchTopLikedTravelogComments();
      fetchTopLikedImages();
      fetchMostViewedProfiles();
      fetchMostViewedTrips();
      fetchMostViewedTravelogs();
      fetchMostViewedImages();
    }, 20000);

    return () => clearInterval(interval);
  });
  
  return (
<div className="abaci-container">
  
  <div className="leaderboard-row">  

    {renderLeaderboardCard(
      "Most Prolific Authors",
      prolificAuthors.map(author => ({
        link: `/public_profile/${author.username}`,
        name: (
          <div className='details-container'>
            <img className='detail-avatar' src={author.avatar} alt={author.username} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            <div className='detail'>{author.username}</div>
            <div className='detail'>Entries Written: {author.total_entry_count}</div>
          </div>
        )
      })),
      "These users have the most written entries for their trips and travelogs combined."
    )}

    {renderLeaderboardCard(
      "Most Prolific Trip Authors",
      prolificTripAuthors.map(taker => ({
        link: `/public_profile/${taker.username}`,
        name: (
          <div className='details-container'>
            <img className='detail-avatar' src={taker.avatar} alt={taker.username} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            <div className='detail'>{taker.username}</div>
            <div className='detail'>Tripentries written: {taker.tripentry_count}</div>
          </div>
        )
      })),
      "These users have the most written entries for their trips."
    )}
 
    {renderLeaderboardCard(
        "Most Prolific Travelog Authors",
        prolificTravelogAuthors.map(taker => ({
          link: `/public_profile/${taker.username}`,
          name: (
            <div className='details-container'>
              <img className='detail-avatar' src={taker.avatar} alt={taker.username} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
              <div className='detail'>{taker.username}</div>
              <div className='detail'>Traventries written: {taker.traventry_count}</div>
            </div>
          )
        })),
        "These users the most written entries for their travelogs."
      )}

  </div>  
  <div className="leaderboard-row">

    {renderLeaderboardCard(
      "Most Prolific Photographers",
      prolificPhotographers.map(taker => ({
        link: `/public_profile/${taker.username}`,
        name: (
          <div className='details-container'>
            <img className='detail-avatar' src={taker.avatar} alt={taker.username} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            <div className='detail'>{taker.username}</div>
            <div className='detail'>Images: {taker.image_count}</div>
          </div>
        )
      })),
      "These users have uploaded the most photos - this does not includee images inserted into log entries."
    )}
    
    {renderLeaderboardCard(
      "Most Followed Travelers",
      mostFollowedTravelers.map(taker => ({
        link: `/public_profile/${taker.username}`,
        name: (
          <div className='details-container'>
            <img className='detail-avatar' src={taker.avatar} alt={taker.username} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            <div className='detail'>{taker.username}</div>
            <div className='detail'>Followers: {taker.follower_count}</div>
          </div>
        )
      })),
      "These users the most written entries for their travelogs."
    )}

  
    {renderLeaderboardCard(
      "Most Followed Authors",
      mostFollowedAuthors.map(taker => ({
        link: `/public_profile/${taker.username}`,
        name: (
          <div className='details-container'>
            <img className='detail-avatar' src={taker.avatar} alt={taker.username} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            <div className='detail'>{taker.username}</div>
            <div className='detail'>Followers: {taker.follower_count}</div>
          </div>
        )
      })),
      "These users have written at least one tripentry or traventry and are sorted by highest follower count. It is not related to user output."
    )}

  </div>
  <div className="leaderboard-row">

    {renderLeaderboardCard(
      "Most Followed Photographers",
      mostFollowedPhotographers.map(taker => ({
        link: `/public_profile/${taker.username}`,
        name: (
          <div className='details-container'>
            <img className='detail-avatar' src={taker.avatar} alt={taker.username} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            <div className='detail'>{taker.username}</div>
            <div className='detail'>Followers: {taker.follower_count}</div>
          </div>
        )
      })),
      "These users have at least one photograph associated with a travelog (again, not in a written log entry) and are sorted by highest follower count. It is not related to user output."
    )}
  
    {renderLeaderboardCard(
      "Most Liked Travelers",
      likedTravelers.map(taker => ({
        link: `/public_profile/${taker.username}`,
        name: (
          <div className='details-container'>
            <img className='detail-avatar' src={taker.avatar} alt={taker.username} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            <div className='detail'>{taker.username}</div>
            <div className='detail'>Likes: {taker.total_likes}</div>
          </div>
        )
      })),
      "This tallies all the various like per user."
    )}

    {renderLeaderboardCard(
      "Most Liked Writers",
      likedAuthors.map(taker => ({
        link: `/public_profile/${taker.username}`,
        name: (
          <div className='details-container'>
            <img className='detail-avatar' src={taker.avatar} alt={taker.username} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            <div className='detail'>{taker.username}</div>
            <div className='detail'>Likes: {taker.total_likes}</div>
          </div>
        )
      })),
      "This tallies all likes on trips and traevlogs."
    )}

  </div>
  <div className="leaderboard-row"> 

    {renderLeaderboardCard(
      "Most Liked Trip Writers",
      likedTripAuthors.map(taker => ({
        link: `/public_profile/${taker.username}`,
        name: (
          <div className='details-container'>
            <img className='detail-avatar' src={taker.avatar} alt={taker.username} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            <div className='detail'>{taker.username}</div>
            <div className='detail'>Likes: {taker.total_likes}</div>
          </div>
        )
      })),
      "This tallies all likes on trips and traevlogs."
    )}

    {renderLeaderboardCard(
      "Most Liked Travelog Writers",
      likedTravelogAuthors.map(taker => ({
        link: `/public_profile/${taker.username}`,
        name: (
          <div className='details-container'>
            <img className='detail-avatar' src={taker.avatar} alt={taker.username} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            <div className='detail'>{taker.username}</div>
            <div className='detail'>Likes: {taker.total_likes}</div>
          </div>
        )
      })),
      "This tallies all likes on travelogs."
    )}

    {renderLeaderboardCard(
        "Most Liked Photographers",
        likedPhotographers.map(taker => ({
          link: `/public_profile/${taker.username}`,
          name: (
            <div className='details-container'>
              <img className='detail-avatar' src={taker.avatar} alt={taker.username} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
              <div className='detail'>{taker.username}</div>
              <div className='detail'>Likes: {taker.total_likes}</div>
            </div>
          )
        })),
        "This tallies all likes on travelogs."
      )}

  </div>
  <div className="leaderboard-row">

    {renderLeaderboardCard(
        "Most Traveled Trip Takers",
        topTripTravelers.map(taker => ({
          link: `/public_profile/${taker.username}`,
          name: (
            <div className='details-container'>
              <img className='detail-avatar' src={taker.avatar} alt={taker.username} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
              <div className='detail'>{taker.username}</div>
              <div className='detail'>Trips taken: {taker.trip_count}</div>
            </div>
          )
        })),
        "This tallies all likes on travelogs."
      )}

    {renderLeaderboardCard(
        "Most Traveled Travelog Site Visiters",
        topTravelogTravelers.map(taker => ({
          link: `/public_profile/${taker.username}`,
          name: (
            <div className='details-container'>
              <img className='detail-avatar' src={taker.avatar} alt={taker.username} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
              <div className='detail'>{taker.username}</div>
              <div className='detail'>Sites visited: {taker.travelog_count}</div>
            </div>
          )
        })),
        "This tallies all likes on travelogs."
      )} 

    {renderLeaderboardCard(
      "Most Liked Trips",
      mostLikedTrips.map(trip => ({
        link: `/trip_det/${trip.trip_id}`,
        name: (
          <div className='details-container'>
            <img src={trip.image_url} alt={`${trip.title}`} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            <div className='detail'>{trip.title}</div>
            <div className='detail'>Likes: {trip.total_likes}</div>
          </div>
        )
      })),
      "Trips with the highest number of likes."
    )}

  </div> 
  <div className="leaderboard-row">

    {renderLeaderboardCard(
      "Most Liked Travelogs",
      mostLikedTravelogs.map(travelog => ({
        link: `/trav_det/${travelog.travelog_id}`,
        name: (
          <div className='details-container'>
            <img src={travelog.image_url} alt={`${travelog.title}`} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            <div className='detail'>{travelog.title}</div>
            <div className='detail'>Likes: {travelog.total_likes}</div>
          </div>
        )
      })),
      "Travelogs with the highest number of likes."
    )}



    {renderLeaderboardCard(
      "Top Travelers by Unique Countries",
      mostDiverseTravelers.map(user => ({
        link: `/profile/${user.user_id}`,
        name: (
          <div className='details-container'>
            <img className='detail-avatar' src={user.avatar} alt={user.username} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            <div className='detail'>{user.username}</div>
            <div className='detail'>Unique Countries: {user.unique_countries_count}</div>
          </div>
        )
      })),
      "Users who have visited the most unique countries."
    )}
 
    {renderLeaderboardCard(
      "Educational Trips",
      educationalTrips.map(trip => ({
        link: `/trip_det/${trip.trip_id}`,
        name: (
          <div className='details-container'>
            <img src={trip.image_url} alt={trip.title} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{trip.title}</div>
            <div className='detail'>Likes: {trip.like_count}</div>
          </div>
        )
      })),
      "Trips with the most educational content."
    )} 

  </div>    
  <div className="leaderboard-row">

    {renderLeaderboardCard(
      "Informative Travelogs",
      informativeTravelogs.map(travelog => ({
        link: `/trav_det/${travelog.travelog_id}`,
        name: (
          <div className='details-container'>
            <img src={travelog.image_url} alt={travelog.title} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{travelog.title}</div>
            <div className='detail'>Likes: {travelog.like_count}</div>
          </div>
        )
      })),
      "Travelogs with the most informative content."
    )}  

    {renderLeaderboardCard(
      "Most Educational Authors",
      mostEducationalAuthors.map(author => ({
        link: `/public_profile/${author.username}`,
        name: (
          <div className='details-container'>
            <img className='detail-avatar' src={author.avatar} alt={author.username} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{author.username}</div>
            <div className='detail'>Educational Likes: {author.total_likes}</div>
          </div>
        )
      })),
      "Authors who contribute the most educational content."
    )}

    {renderLeaderboardCard(
      "Top 5 Longest Trips",
      longestTrips.map(trip => ({
        link: `/trip_det/${trip.trip_id}`,
        name: (
          <div className='details-container'>
            <img src={trip.image_url} alt={trip.title} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{trip.title}</div>
            <div className='detail'>Duration: {trip.trip_length} days</div>
          </div>
        )
      })),
      "Trips with the longest duration."
    )}
    
  </div>
  <div className="leaderboard-row"> 

    {renderLeaderboardCard(
        "Top 5 Densest Trips",
        densestTrips.map(trip => ({
          link: `/trip_det/${trip.trip_id}`,
          name: (
            <div className='details-container'>
              <img src={trip.image_url} alt={trip.title} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
              <div className='detail'>{trip.title}</div>
              <div className='detail'>Travelog Count: {trip.travelog_count}</div>
            </div>
          )
        })),
        "Trips with the most associated travelogs."
    )}

    {renderLeaderboardCard(
      "Top 5 Most Diverse Trips",
      diverseTrips.map(trip => ({
        link: `/trip_det/${trip.trip_id}`,
        name: (
          <div className='details-container'>
            <img src={trip.image_url} alt={trip.title} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{trip.title}</div>
            <div className='detail'>Unique Countries: {trip.country_count}</div>
          </div>
        )
      })),
      "Trips with travelogs representing the highest number of unique countries."
    )}
    
    {renderLeaderboardCard(
      "Top 5 Most Diverse Travelers",
      diverseTravelers.map(traveler => ({
        link: `/public_profile/${traveler.username}`,
        name: (
          <div className='details-container'>
            <img className='detail-avatar' src={traveler.avatar} alt={traveler.username} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{traveler.username}</div>
            <div className='detail'>Countries Visited: {traveler.country_count}</div>
          </div>
        )
      })),
      "Travelers with travelogs from the highest number of unique countries."
    )}

  </div>
  <div className="leaderboard-row"> 

    {renderLeaderboardCard(
      "Countries Most Visited",
      countriesMostVisited.map(country => ({
        link: `results?query=${country.country}`, // Replace with the actual link if needed
        name: (
          <div className='details-container'>
            <img src={country.flagPath} alt={`${country.country} flag`} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{country.country}</div>
            <div className='detail'>Likes: {country.like_count}</div>
          </div>
        )
      })),
      "Top countries based on user visits."
    )}

    {renderLeaderboardCard(
      "Countries Most Want to Visit",
      countriesMostWantToVisit.map(country => ({
        link: `results?query=${country.country}`,
        name: (
          <div className='details-container'>
            <img src={country.flagPath} alt={`${country.country} flag`} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{country.country}</div>
            <div className='detail'>Likes: {country.like_count}</div>
          </div>
        )
      })),
      "Top countries based on user desire to visit."
    )}

    {renderLeaderboardCard(
      "Countries Most Want to Revisit",
      countriesMostWantToRevisit.map(country => ({
        link: `results?query=${country.country}`,
        name: (
          <div className='details-container'>
            <img src={country.flagPath} alt={`${country.country} flag`} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{country.country}</div>
            <div className='detail'>Likes: {country.like_count}</div>
          </div>
        )
      })),
      "Top countries based on user desire to revisit."
    )}

  </div>  
  <div className="leaderboard-row">  

  {renderLeaderboardCard(
    "Cities Visited",
    citiesVisited.map(city => ({
      link: `results?query=${city.city}`,
      name: (
        <div className='details-container'>
          <img src={`/countries/${countryNameToCode[city.country]}.png`} alt={`${city.country} flag`} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
          <div className='detail'>{city.city}</div>
          <div className='detail'>Visits: {city.like_count}</div>
        </div>
      )
    })),
    "Most visited cities based on user travels."
  )} 

  {renderLeaderboardCard(
    "Cities Most Want to Visit",
    citiesMostWantToVisit.map(city => ({
      link: `results?query=${city.city}`,
      name: (
        <div className='details-container'>
          <img src={`/countries/${countryNameToCode[city.country]}.png`} alt={`${city.country} flag`} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
          <div className='detail'>{city.city}</div>
          <div className='detail'>Want to Visit: {city.like_count}</div>
        </div>
      )
    })),
    "Most desired cities to visit by users."
  )}

  {renderLeaderboardCard(
    "Cities Most Want to Revisit",
    citiesMostWantToRevisit.map(city => ({
      link: `results?query=${city.city}`,
      name: (
        <div className='details-container'>
          <img src={`/countries/${countryNameToCode[city.country]}.png`} alt={`${city.country} flag`} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
          <div className='detail'>{city.city}</div>
          <div className='detail'>Want to Revisit: {city.like_count}</div>
        </div>
      )
    })),
    "Cities users are most interested in revisiting."
  )}

  </div>
  <div className="leaderboard-row">

  {renderLeaderboardCard(
    "Sites Visited",
    sitesVisited.map(site => ({
      link: site.link,
      name: (
        <div className='details-container'>
          <img src={site.flagPath} alt={`${site.country} flag`} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
          <div className='detail'>{site.site}</div>
          <div className='detail'>Visits: {site.like_count}</div>
        </div>
      )
    })),
    "Most visited sites based on user travels."
  )} 

  {renderLeaderboardCard(
    "Sites Most Want to Visit",
    sitesMostWantToVisit.map(site => ({
      link: site.link,
      name: (
        <div className='details-container'>
          <img src={site.flagPath} alt={`${site.country} flag`} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
          <div className='detail'>{site.site}</div>
          <div className='detail'>Want to Visit: {site.like_count}</div>
        </div>
      )
    })),
    "Most desired sites to visit by users."
  )} 

  {renderLeaderboardCard(
    "Sites Most Want to Revisit",
    sitesMostWantToRevisit.map(site => ({
      link: site.link,
      name: (
        <div className='details-container'>
          <img src={site.flagPath} alt={`${site.country} flag`} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
          <div className='detail'>{site.site}</div>
          <div className='detail'>Want to Revisit: {site.like_count}</div>
        </div>
      )
    })),
    "Sites users are most interested in revisiting."
  )}

  </div> 
  <div className="leaderboard-row">

    {renderLeaderboardCard(
      "Video Game Sites Visited",
      videoGameSitesVisited.map(site => ({
        link: `/results?query=${site.site}`,
        name: (
          <div className='details-container'>
            <img src={site.image_url} alt={site.site} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{site.site}</div>
            <div className='detail'>Visits: {site.visit_count}</div>
          </div>
        )
      })),
      "Most visited video game locations."
    )}

    {renderLeaderboardCard(
      "Video Game Sites Most Want to Visit",
      videoGameSitesMostWantToVisit.map(site => ({
        link: `/results?query=${site.site}`,
        name: (
          <div className='details-container'>
            <img src={site.image_url} alt={site.site} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{site.site}</div>
            <div className='detail'>Want to Visit: {site.want_to_visit_count}</div>
          </div>
        )
      })),
      "Video game locations users most want to visit."
    )}

    {renderLeaderboardCard(
      "Video Game Sites Most Want to Revisit",
      videoGameSitesMostWantToRevisit.map(site => ({
        link: `/results?query=${site.site}`,
        name: (
          <div className='details-container'>
            <img src={site.image_url} alt={site.site} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{site.site}</div>
            <div className='detail'>Want to Revisit: {site.want_to_revisit_count}</div>
          </div>
        )
      })),
      "Video game locations users most want to revisit."
    )}

  </div> 
  <div className="leaderboard-row">

    {renderLeaderboardCard(
      "Film Sites Visited",
      filmSitesVisited.map(site => ({
        link: `/results?query=${site.site}`,
        name: (
          <div className='details-container'>
            <img src={site.image_url} alt={site.site} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{site.site}</div>
            <div className='detail'>Visits: {site.visit_count}</div>
          </div>
        )
      })),
      "Most visited film locations."
    )}

    {renderLeaderboardCard(
      "Film Sites Most Want to Visit",
      filmSitesMostWantToVisit.map(site => ({
        link: `/results?query=${site.site}`,
        name: (
          <div className='details-container'>
            <img src={site.image_url} alt={site.site} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{site.site}</div>
            <div className='detail'>Want to Visit: {site.want_to_visit_count}</div>
          </div>
        )
      })),
      "Film locations users most want to visit."
    )}

    {renderLeaderboardCard(
      "Film Sites Most Want to Revisit",
      filmSitesMostWantToRevisit.map(site => ({
        link: `/results?query=${site.site}`,
        name: (
          <div className='details-container'>
            <img src={site.image_url} alt={site.site} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{site.site}</div>
            <div className='detail'>Want to Revisit: {site.want_to_revisit_count}</div>
          </div>
        )
      })),
      "Film locations users most want to revisit."
    )}

  </div> 
  <div className="leaderboard-row">

    {renderLeaderboardCard(
      "UNESCO Sites Visited",
      unescoSitesVisited.map(site => ({
        link: `/results?query=${site.site}`,
        name: (
          <div className='details-container'>
            <img src={site.image_url} alt={site.site} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{site.site}</div>
            <div className='detail'>Visits: {site.visit_count}</div>
          </div>
        )
      })),
      "Most visited UNESCO sites."
    )} 

    {renderLeaderboardCard(
      "UNESCO Sites Most Want to Visit",
      unescoSitesMostWantToVisit.map(site => ({
        link: `/results?query=${site.site}`,
        name: (
          <div className='details-container'>
            <img src={site.image_url} alt={site.site} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{site.site}</div>
            <div className='detail'>Want to Visit: {site.want_to_visit_count}</div>
          </div>
        )
      })),
      "UNESCO sites users most want to visit."
    )} 

    {renderLeaderboardCard(
      "UNESCO Sites Most Want to Revisit",
      unescoSitesMostWantToRevisit.map(site => ({
        link: `/results?query=${site.site}`,
        name: (
          <div className='details-container'>
            <img src={site.image_url} alt={site.site} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{site.site}</div>
            <div className='detail'>Want to Revisit: {site.want_to_revisit_count}</div>
          </div>
        )
      })),
      "UNESCO sites users most want to revisit."
    )}

  </div> 
  <div className="leaderboard-row">

    {renderLeaderboardCard(
      "Most Diverse Trip Conversations",
      diverseTripConversations.map(trip => ({
        link: `/trip_det/${trip.trip_id}`,
        name: (
          <div className='details-container'>
            <img src={trip.image_url} alt={trip.title} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{trip.title}</div>
            <div className='detail'>Commenter Count: {trip.comment_count}</div>
          </div>
        )
      })),
      "Trips with the most unique user comments."
    )}

    {renderLeaderboardCard(
      "Most Diverse Travelog Conversations",
      diverseTravelogConversations.map(travelog => ({
        link: `/trav_det/${travelog.travelog_id}`,
        name: (
          <div className='details-container'>
            <img src={travelog.image_url} alt={travelog.title} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{travelog.title}</div>
            <div className='detail'>Commenter Count: {travelog.comment_count}</div>
          </div>
        )
      })),
      "Travelogs with the most unique user comments."
    )}

    {renderLeaderboardCard(
      "Top 5 Longest Trip Conversations",
      longestTripConversations.map(trip => ({
        link: `/trip_det/${trip.trip_id}`,
        name: (
          <div className='details-container'>
            <img src={trip.image_url} alt={trip.title} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{trip.title}</div>
            <div className='detail'>Comment Count: {trip.comment_count}</div>
          </div>
        )
      })),
      "Trips with the highest number of comments."
    )}

  </div> 
  <div className="leaderboard-row">

    {renderLeaderboardCard(
      "Top 5 Longest Travelog Conversations",
      longestTravelogConversations.map(travelog => ({
        link: `/trav_det/${travelog.travelog_id}`,
        name: (
          <div className='details-container'>
            <img src={travelog.image_url} alt={travelog.title} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{travelog.title}</div>
            <div className='detail'>Comment Count: {travelog.comment_count}</div>
          </div>
        )
      })),
      "Travelogs with the highest number of comments."
    )}

    {renderLeaderboardCard(
      "Most Liked Commenters",
      mostLikedCommenters.map(commenter => ({
        link: `/public_profile/${commenter.username}`,
        name: (
          <div className='details-container'>
            <img src={commenter.avatar} alt={commenter.username} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{commenter.username}</div>
            <div className='detail'>Likes: {commenter.like_count}</div>
          </div>
        )
      })),
      "Users with the most likes on their comments."
    )}
  
    {  renderLeaderboardCard(
      "Top 5 Best Liked Trip Comments",
      topLikedTripComments.map(comment => ({
        link: `/trip_det/${comment.trip_id}`,
        name: (
          <div className='details-container'>
            <img src={comment.image_url} alt="Comment for Trip Details" style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{comment.username} Comment {comment.comment_id}</div>
            <div className='detail'>Likes: {comment.like_count}</div>
          </div>
        )
      })),
      "Trips with the highest liked comments."
    )}

  </div>
  <div className="leaderboard-row">  

    {renderLeaderboardCard(
      "Top 5 Best Liked Travelog Comments",
      topLikedTravelogComments.map(comment => ({
        link: `/trav_det/${comment.travelog_id}`,
        name: (
          <div className='details-container'>
            <img src={comment.image_url} alt="Comment For Travelog" style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{comment.username} Comment {comment.comment_id}</div>
            <div className='detail'>Likes: {comment.like_count}</div>
          </div>
        )
      })),
      "Travelogs with the highest liked comments."
    )} 

    {renderLeaderboardCard(
      "Top 5 Best Liked Images",
      topLikedImages.map(image => ({
        link: `/trav_det/${image.travelog_id}`,
        name: (
          <div className='details-container'>
            <img src={image.image_url} alt="Best Photos" style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{image.travelog_title}</div>
            <div className='detail'>Likes: {image.like_count}</div>
          </div>
        )
      })),
      "Images with the highest number of likes."
    )} 

    {renderLeaderboardCard(
      "Top 5 Most Viewed Public Profiles",
      mostViewedProfiles.map(profile => ({
        link: `/public_profile/${profile.username}`,
        name: (
          <div className='details-container'>
            <img src={profile.avatar} alt="User Avatar" style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{profile.username}</div>
            <div className='detail'>Views: {profile.view_count}</div>
          </div>
        )
      })),
      "Profiles with the highest number of views."
    )}

  </div>
  <div className="leaderboard-row">  

    {renderLeaderboardCard(
      "Top 5 Most Viewed Trips",
      mostViewedTrips.map(trip => ({
        link: `/trip_det/${trip.trip_id}`,
        name: (
          <div className='details-container'>
            <img src={trip.image_url} alt="Index First Associated " style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{trip.title}</div>
            <div className='detail'>Views: {trip.view_count}</div>
          </div>
        )
      })),
      "Trips with the highest number of views."
    )}

    {renderLeaderboardCard(
      "Top 5 Most Viewed Travelogs",
      mostViewedTravelogs.map(travelog => ({
        link: `/trav_det/${travelog.travelog_id}`,
        name: (
          <div className='details-container'>
            <img src={travelog.image_url} alt="Index First Associated " style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{travelog.title}</div>
            <div className='detail'>Views: {travelog.view_count}</div>
          </div>
        )
      })),
      "Travelogs with the highest number of views."
    )} 

    {renderLeaderboardCard(
      "Top 5 Most Viewed Images",
      mostViewedImages.map(image => ({
        link: `/trav_det/${image.travelog_id}`,
        name: (
          <div className='details-container'>
            <img src={image.image_url} alt="Best Photos" style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
            <div className='detail'>{image.title}</div>
            <div className='detail'>Views: {image.view_count}</div>
          </div>
        )
      })),
      "Images with the highest number of views."
    )}

  </div> 

</div>
  );
}

export default Abaci;