// MapSorting.js
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './MapSorting.css';

import { applyMarkerOffset } from '../travlog/MarkerOffset'
 
function MapSorting({ onVisibilityChange, travelogs, trips }) {  
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedVisibility, setSelectedVisibility] = useState('ALL');
  const [selectedVisitStatus, setSelectedVisitStatus] = useState('ALL');

  const location = useLocation();
  const isUserHub = location.pathname.includes('/hub');
  // console.log('On Mapsorting, travelogs: ', travelogs, 'trips: ', trips)

  const initialCategoryState = { 
    "No Category": true,

    "Battlefield": true,
    "Bazaar / Market": true,
    "Blacksmith / Tradesmith / Guild Shop / Factory": true,
    "Castle / Fortress / Palace": true,
    "Cathedral / Basilica": true,
    "Cemetery / Columbarium / Mausoleum / Tomb / Undercroft": true,
    "Church / Shrine / Synagogue / Temple": true,
    "City Gate / City Wall / Gate House": true,
    "Commons / Plaza / Square": true, 
    "Fair / Festival (period)": true,
    "Guildhall": true,
    "Historical Marker / Memorial": true,
    "Library": true,
    "Monastery / Abbey / Priory / Convent": true,
    "Monument / Wall": true,
    "Museum": true,
    "Town Hall": true,
    "Tower": true, 
    "Walled City / Star Fortress": true,
    "Other Medieval Site": true, 
 
    "(ancient) Acropolis / Necropolis": true,
    "(ancient) Aqueduct": true,
    "(ancient) Amphitheatre / Theater": true,
    "(ancient) Catacombs": true,
    "(ancient) Colosseum": true,
    "(ancient) City": true,
    "(ancient) Forum": true,
    "(ancient) Citadel / Fortress": true,
    "(ancient) Mausoleum": true,
    "(ancient) Monolith / Monument / Obelisk": true,
    "(ancient) Palace": true,
    "(ancient) Pyramid": true,
    "(ancient) Stone Circle": true,
    "(ancient) Temple": true,
    "(ancient) Thermae": true,
    "(ancient) Ziggurat": true,
    "Other Ancient Site": true,
    
    "AirBnB / Bed and Breakfast / Hotel / Resort": false,
    "Airport / Bus Station / Port / Train Station": false,
    "Amusement Park / Theme Park / Water Park": false,
    "Aquarium / Zoo": false,
    "Arboretum / Botanical Garden / Japanese Garden / Park": false,
    "Area / Block / Neighborhood / Street / Zone": false,
    "Athletic Event / Game / Gym / Pool / Sport / Studio": false,
    "Auditorium / Music Venue / Performance Hall": false,
    "Bakery / Desert / Gelato / Ice Cream / Patisserie": false,
    "Bistro / Restaurant": false,
    "Boat Ride / Boat Rental / Ferry": false,
    "Bookshop / Library (non-medieval)": false,
    "Boutique / Mall / Shopping Center / Store": false,
    "Brewery / Vineyard / Winery / Pub Bar": false,
    "Camping Site / Cycling / Hiking": false,
    "Carnival / Festival / State Fair (non-musical)": false,
    "Cemetery / Columbarium / Mausoleum (non-medieval)": false,
    "Commons / Plaza / Square (non-medieval)": false,
    "Convention": false,
    "Cinema / Theater": false,
    "Educational Workshop": false,
    "Farm / Orchard": false,
    "Ghost Tour / Haunted Site": false,
    "Hike / Walk / Walking Tour": false,
    "Historical Marker / Memorial": false,
    "Home / Private Residence": false,
    "Indoor Playground / Outdoor Playground": false,
    "Lighthouse / Tower View": false,
    "Luxury Train Ride / Vehicular Sightseeing Tour": false,
    "Museum (non-medieval) / Art Gallery": false,
    "National Park / Retreat": false, 
    "Observatory / Planetarium": false,
    "River Cruise": false,
    "School / University": false,
    "Scuba Diving / Snorkeling / Water Skiing / Beach": false,
    "Snow Skiing": false,
    "Spa / Hot Spring": false,
    "Tavern": false,
    "Train Musuem / Transportation Museum": false,
  };

  const [categoryChecked, setCategoryChecked] = useState(initialCategoryState);

  const handleCategoryChange = (e) => {
    setCategoryChecked({
      ...categoryChecked,
      [e.target.value]: e.target.checked,
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setCategoryModalOpen(false);
      }
    };

    // Add keydown listener when modal is open
    if (isCategoryModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    // Clean up the listener when component unmounts or modal closes
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCategoryModalOpen]);

  const handleOverlayClick = () => {
    setCategoryModalOpen(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();  // Prevent click inside the modal from closing it
  };
  
  const categories = [ 
    { label: "Medieval Sites", isHeader: true },
    { value: "Ancient", label: "Ancient" },
    { value: "Battlefield", label: "Battlefield" },
    { value: "Bazaar / Market", label: "Bazaar / Market" },
    { value: "Blacksmith / Tradesmith / Guild Shop / Factory", label: "Blacksmith / Tradesmith / Guild Shop / Factory" },
    { value: "Castle / Fortress / Palace", label: "Castle / Fortress / Palace" },
    { value: "Cathedral / Basilica", label: "Cathedral / Basilica" },
    { value: "Cemetery / Columbarium / Mausoleum / Tomb / Undercroft", label: "Cemetery / Columbarium / Mausoleum / Tomb / Undercroft" },
    { value: "Church / Shrine / Synagogue / Temple", label: "Church / Shrine / Synagogue / Temple" },
    { value: "City Gate / City Wall / Gate House", label: "City Gate / City Wall / Gate House" },
    { value: "Commons / Plaza / Square", label: "Commons / Plaza / Square" }, 
    { value: "Fair / Festival (period)", label: "Fair / Festival (period)" },
    { value: "Guildhall", label: "Guildhall" },
    { value: "Historical Marker / Memorial", label: "Historical Marker / Memorial" },
    { value: "Library", label: "Library" },
    { value: "Monastery / Abbey / Priory / Convent", label: "Monastery / Abbey / Priory / Convent" },
    { value: "Monument / Wall", label: "Monument / Wall" },
    { value: "Museum", label: "Museum" },
    { value: "Town Hall", label: "Town Hall" },
    { value: "Tower", label: "Tower" },
    { value: "Walled City / Star Fortress", label: "Walled City / Star Fortress" },
    { value: "Other Medieval Site", label: "Other Medieval Site" },
    
    { label: "Non-Medieval Sites", isHeader: true },

    { label: "Ancient Sites", isHeader: true },
    { value: "(ancient) Acropolis / Necropolis", label: "(ancient) Acropolis / Necropolis" },
    { value: "(ancient) Aqueduct", label: "(ancient) Aqueduct" },
    { value: "(ancient) Amphitheatre / Theater", label: "(ancient) Amphitheatre / Theater" },
    { value: "(ancient) Catacombs", label: "(ancient) Catacombs" },
    { value: "(ancient) Colosseum", label: "(ancient) Colosseum" },
    { value: "(ancient) City", label: "(ancient) City" },
    { value: "(ancient) Forum", label: "(ancient) Forum" },
    { value: "(ancient) Citadel / Fortress", label: "(ancient) Citadel / Fortress" },
    { value: "(ancient) Mausoleum", label: "(ancient) Mausoleum" },
    { value: "(ancient) Monolith / Monument / Obelisk", label: "(ancient) Monolith / Monument / Obelisk" },
    { value: "(ancient) Palace", label: "(ancient) Palace" },
    { value: "(ancient) Pyramid", label: "(ancient) Pyramid" },
    { value: "(ancient) Stone Circle", label: "(ancient) Stone Circle" },
    { value: "(ancient) Temple", label: "(ancient) Temple" },
    { value: "(ancient) Thermae", label: "(ancient) Thermae" },
    { value: "(ancient) Ziggurat", label: "(ancient) Ziggurat" },
    { value: "Other Ancient Site", label: "Other Ancient Site" },
  
    { value: "AirBnB / Bed and Breakfast / Hotel / Resort", label: "AirBnB / Bed and Breakfast / Hotel / Resort" },
    { value: "Airport / Bus Station / Port / Train Station", label: "Airport / Bus Station / Port / Train Station" },
    { value: "Amusement Park / Theme Park / Water Park", label: "Amusement Park / Theme Park / Water Park" },
    { value: "Aquarium / Zoo", label: "Aquarium / Zoo" },
    { value: "Arboretum / Botanical Garden / Japanese Garden / Park", label: "Arboretum / Botanical Garden / Japanese Garden / Park" },
    { value: "Area / Block / Neighborhood / Street / Zone", label: "Area / Block / Neighborhood / Street / Zone" },
    { value: "Athletic Event / Game / Gym / Pool / Sport / Studio", label: "Athletic Event / Game / Gym / Pool / Sport / Studio" },
    { value: "Auditorium / Music Venue / Performance Hall", label: "Auditorium / Music Venue / Performance Hall" },
    { value: "Bakery / Desert / Gelato / Ice Cream / Patisserie", label: "Bakery / Desert / Gelato / Ice Cream / Patisserie" },
    { value: "Bistro / Restaurant", label: "Bistro / Restaurant" },
    { value: "Boat Ride / Boat Rental / Ferry", label: "Boat Ride / Boat Rental / Ferry" },
    { value: "Bookshop / Library (non-medieval)", label: "Bookshop / Library (non-medieval)" },
    { value: "Boutique / Mall / Shopping Center / Store", label: "Boutique / Mall / Shopping Center / Store" },
    { value: "Brewery / Vineyard / Winery / Pub / Bar", label: "Brewery / Vineyard / Winery / Pub / Bar" },
    { value: "Camping Site / Cycling / Hiking", label: "Camping Site / Cycling / Hiking" },
    { value: "Carnival / Festival / State Fair (non-musical)", label: "Carnival / Festival / State Fair (non-musical)" },
    { value: "Cemetery / Columbarium / Mausoleum (non-medieval)", label: "Cemetery / Columbarium / Mausoleum (non-medieval)" },
    { value: "Commons / Plaza / Square (non-medieval)", label: "Commons / Plaza / Square (non-medieval)" },
    { value: "Convention", label: "Convention" },
    { value: "Cinema / Theater", label: "Cinema / Theater" },
    { value: "Educational Workshop", label: "Educational Workshop" },
    { value: "Farm / Orchard", label: "Farm / Orchard" },
    { value: "Ghost Tour / Haunted Site", label: "Ghost Tour / Haunted Site" },
    { value: "Hike / Walk / Walking Tour", label: "Hike / Walk / Walking Tour" },
    { value: "Historical Marker / Memorial", label: "Historical Marker / Memorial" },
    { value: "Home / Private Residence", label: "Home / Private Residence" },
    { value: "Indoor Playground / Outdoor Playground", label: "Indoor Playground / Outdoor Playground" },
    { value: "Lighthouse / Tower View", label: "Lighthouse / Tower View" },
    { value: "Luxury Train Ride / Vehicular Sightseeing Tour", label: "Luxury Train Ride / Vehicular Sightseeing Tour" },
    { value: "Museum (non-medieval) / Art Gallery", label: "Museum (non-medieval) / Art Gallery" },
    { value: "National Park / Retreat", label: "National Park / Retreat" }, 
    { value: "Observatory / Planetarium", label: "Observatory / Planetarium" },
    { value: "River Cruise", label: "River Cruise" },
    { value: "School / University", label: "School / University" },
    { value: "Scuba Diving / Snorkeling / Water Skiing / Beach", label: "Scuba Diving / Snorkeling / Water Skiing / Beach" },
    { value: "Snow Skiing", label: "Snow Skiing" },
    { value: "Spa / Hot Spring", label: "Spa / Hot Spring" },
    { value: "Tavern", label: "Tavern" },
    { value: "Train Musuem / Transportation Museum", label: "Train Musuem / Transportation Museum" },
  ];

  const medievalCategories = [
    { label: "Medieval Sites", isHeader: true },
    { value: "Ancient", label: "Ancient" },
    { value: "Battlefield", label: "Battlefield" },
    { value: "Bazaar / Market", label: "Bazaar / Market" },
    { value: "Blacksmith / Tradesmith / Guild Shop / Factory", label: "Blacksmith / Tradesmith / Guild Shop / Factory" },
    { value: "Castle / Fortress / Palace", label: "Castle / Fortress / Palace" },
    { value: "Cathedral / Basilica", label: "Cathedral / Basilica" },
    { value: "Cemetery / Columbarium / Mausoleum / Tomb / Undercroft", label: "Cemetery / Columbarium / Mausoleum / Tomb / Undercroft" },
    { value: "Church / Shrine / Synagogue / Temple", label: "Church / Shrine / Synagogue / Temple" },
    { value: "City Gate / City Wall / Gate House", label: "City Gate / City Wall / Gate House" },
    { value: "Commons / Plaza / Square", label: "Commons / Plaza / Square" }, 
    { value: "Fair / Festival (period)", label: "Fair / Festival (period)" },
    { value: "Guildhall", label: "Guildhall" },
    { value: "Historical Marker / Memorial", label: "Historical Marker / Memorial" },
    { value: "Library", label: "Library" },
    { value: "Monastery / Abbey / Priory / Convent", label: "Monastery / Abbey / Priory / Convent" },
    { value: "Monument / Wall", label: "Monument / Wall" },
    { value: "Museum", label: "Museum" },
    { value: "Town Hall", label: "Town Hall" },
    { value: "Tower", label: "Tower" },
    { value: "Walled City / Star Fortress", label: "Walled City / Star Fortress" },
    { value: "Other Medieval Site", label: "Other Medieval Site" }, 
  ];
  
  const nonMedievalCategories = [
    { label: "Non-Medieval Sites", isHeader: true },

    { label: "Ancient Sites", isHeader: true },
    { value: "(ancient) Acropolis / Necropolis", label: "(ancient) Acropolis / Necropolis" },
    { value: "(ancient) Aqueduct", label: "(ancient) Aqueduct" },
    { value: "(ancient) Amphitheatre / Theater", label: "(ancient) Amphitheatre / Theater" },
    { value: "(ancient) Catacombs", label: "(ancient) Catacombs" },
    { value: "(ancient) Colosseum", label: "(ancient) Colosseum" },
    { value: "(ancient) City", label: "(ancient) City" },
    { value: "(ancient) Forum", label: "(ancient) Forum" },
    { value: "(ancient) Citadel / Fortress", label: "(ancient) Citadel / Fortress" },
    { value: "(ancient) Mausoleum", label: "(ancient) Mausoleum" },
    { value: "(ancient) Monolith / Monument / Obelisk", label: "(ancient) Monolith / Monument / Obelisk" },
    { value: "(ancient) Palace", label: "(ancient) Palace" },
    { value: "(ancient) Pyramid", label: "(ancient) Pyramid" },
    { value: "(ancient) Stone Circle", label: "(ancient) Stone Circle" },
    { value: "(ancient) Temple", label: "(ancient) Temple" },
    { value: "(ancient) Thermae", label: "(ancient) Thermae" },
    { value: "(ancient) Ziggurat", label: "(ancient) Ziggurat" },
    { value: "Other Ancient Site", label: "Other Ancient Site" },

    { value: "AirBnB / Bed and Breakfast / Hotel / Resort", label: "AirBnB / Bed and Breakfast / Hotel / Resort" },
    { value: "Airport / Bus Station / Port / Train Station", label: "Airport / Bus Station / Port / Train Station" },
    { value: "Amusement Park / Theme Park / Water Park", label: "Amusement Park / Theme Park / Water Park" },
    { value: "Aquarium / Zoo", label: "Aquarium / Zoo" },
    { value: "Arboretum / Botanical Garden / Japanese Garden / Park", label: "Arboretum / Botanical Garden / Japanese Garden / Park" },
    { value: "Area / Block / Neighborhood / Street / Zone", label: "Area / Block / Neighborhood / Street / Zone" },
    { value: "Athletic Event / Game / Gym / Pool / Sport / Studio", label: "Athletic Event / Game / Gym / Pool / Sport / Studio" },
    { value: "Auditorium / Music Venue / Performance Hall", label: "Auditorium / Music Venue / Performance Hall" },
    { value: "Bakery / Desert / Gelato / Ice Cream / Patisserie", label: "Bakery / Desert / Gelato / Ice Cream / Patisserie" },
    { value: "Bistro / Restaurant", label: "Bistro / Restaurant" },
    { value: "Boat Ride / Boat Rental / Ferry", label: "Boat Ride / Boat Rental / Ferry" },
    { value: "Bookshop / Library (non-medieval)", label: "Bookshop / Library (non-medieval)" },
    { value: "Boutique / Mall / Shopping Center / Store", label: "Boutique / Mall / Shopping Center / Store" },
    { value: "Brewery / Vineyard / Winery / Pub / Bar", label: "Brewery / Vineyard / Winery / Pub / Bar" },
    { value: "Camping Site / Cycling / Hiking", label: "Camping Site / Cycling / Hiking" },
    { value: "Carnival / Festival / State Fair (non-musical)", label: "Carnival / Festival / State Fair (non-musical)" },
    { value: "Cemetery / Columbarium / Mausoleum (non-medieval)", label: "Cemetery / Columbarium / Mausoleum (non-medieval)" },
    { value: "Commons / Plaza / Square (non-medieval)", label: "Commons / Plaza / Square (non-medieval)" },
    { value: "Convention", label: "Convention" },
    { value: "Cinema / Theater", label: "Cinema / Theater" },
    { value: "Educational Workshop", label: "Educational Workshop" },
    { value: "Farm / Orchard", label: "Farm / Orchard" },
    { value: "Ghost Tour / Haunted Site", label: "Ghost Tour / Haunted Site" },
    { value: "Hike / Walk / Walking Tour", label: "Hike / Walk / Walking Tour" },
    { value: "Historical Marker / Memorial", label: "Historical Marker / Memorial" },
    { value: "Home / Private Residence", label: "Home / Private Residence" },
    { value: "Indoor Playground / Outdoor Playground", label: "Indoor Playground / Outdoor Playground" },
    { value: "Lighthouse / Tower View", label: "Lighthouse / Tower View" },
    { value: "Luxury Train Ride / Vehicular Sightseeing Tour", label: "Luxury Train Ride / Vehicular Sightseeing Tour" },
    { value: "Museum (non-medieval) / Art Gallery", label: "Museum (non-medieval) / Art Gallery" },
    { value: "National Park / Retreat", label: "National Park / Retreat" }, 
    { value: "Observatory / Planetarium", label: "Observatory / Planetarium" },
    { value: "River Cruise", label: "River Cruise" },
    { value: "School / University", label: "School / University" },
    { value: "Scuba Diving / Snorkeling / Water Skiing / Beach", label: "Scuba Diving / Snorkeling / Water Skiing / Beach" },
    { value: "Snow Skiing", label: "Snow Skiing" },
    { value: "Spa / Hot Spring", label: "Spa / Hot Spring" },
    { value: "Tavern", label: "Tavern" },
    { value: "Train Musuem / Transportation Museum", label: "Train Musuem / Transportation Museum" },
  ];

  // Function to filter data
  const filterData = useCallback(() => {
    let filteredTravelogs = [...travelogs];
    let filteredTrips = [...trips];
  
    // Filter based on visibility
    if (selectedVisibility !== 'ALL') {
      const is_private = selectedVisibility === 'Private';
      filteredTravelogs = filteredTravelogs.filter(t => t.is_private === is_private);
      filteredTrips = filteredTrips.filter(t => t.is_private === is_private);
    }
    
    // Further filter based on type
    if (selectedType !== 'ALL') {
      if (selectedType === 'Trips') {filteredTravelogs = [];
      } else if (selectedType === 'Travelogs') {filteredTrips = [];
      }
    }
  
    // Filtering based on visit status
    if (selectedVisitStatus !== 'ALL') {
      if (selectedVisitStatus === 'Visited') {
        filteredTravelogs = filteredTravelogs.filter(t => t.have_visited);
        filteredTrips = filteredTrips.filter(t => t.have_visited);
      } else if (selectedVisitStatus === 'Want to Visit') {
        filteredTravelogs = filteredTravelogs.filter(t => !t.have_visited);
        filteredTrips = filteredTrips.filter(t => !t.have_visited);
      }
    }
  
    // Apply category filters
    filteredTravelogs = filteredTravelogs.filter(t => 
      t.category ? categoryChecked[t.category] : categoryChecked["No Category"]
    );
    filteredTrips = filteredTrips.filter(t => 
      t.category ? categoryChecked[t.category] : categoryChecked["No Category"]
    );
  
    // Combine travelogs and trips for offset logic
    const combinedEntries = [...filteredTravelogs, ...filteredTrips];
    const offsetCombinedEntries = applyMarkerOffset(combinedEntries);
 
    // Travelogs have a 'category' property, trips do not
    const offsetFilteredTravelogs = offsetCombinedEntries.filter(entry => 'category' in entry);
    const offsetFilteredTrips = offsetCombinedEntries.filter(entry => !('category' in entry));
 
    onVisibilityChange(offsetFilteredTravelogs, offsetFilteredTrips); 
  }, [
    categoryChecked, 
    travelogs, 
    trips, 
    onVisibilityChange, 
    selectedType, 
    selectedVisibility, 
    selectedVisitStatus, 
  ]);
  

  useEffect(() => {
    filterData();
  }, [
    selectedVisibility, 
    selectedType, 
    selectedVisitStatus, 
    categoryChecked, 
    travelogs, 
    trips, 
    filterData
  ]);

  const handleVisitStatusChange = (e) => {
    setSelectedVisitStatus(e.target.value);
    filterData();
  };

  const handleVisibilitySelect = (e) => {
  setSelectedVisibility(e.target.value);
  filterData(e.target.value);  
  };

  const toggleMedievalCategories = () => {
    setCategoryChecked(prevState => {
      const newState = { ...prevState };
      medievalCategories.forEach(category => {
        newState[category.value] = !newState[category.value];
      });
      return newState;
    });
    filterData(); 
  };
  
  const toggleNonMedievalCategories = () => {
    setCategoryChecked(prevState => {
      const newState = { ...prevState };
      nonMedievalCategories.forEach(category => {
        newState[category.value] = !newState[category.value];
      });
      return newState;
    });
    filterData(); 
  };

  const toggleCategoryModal = () => {
      setCategoryModalOpen(!isCategoryModalOpen);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
    if (newType === 'Trips') {
      setCategoryChecked(prevState => ({
        ...prevState,
        "No Category": true
      }));
    }
    filterData(selectedVisibility, newType);
  };
     
  return (
    <div className="sort-filter-panel">
          {/* Only show this section if not on public profile */}
          {!!isUserHub && (
            <div className="visibility-type-select">
              {/* Radio buttons for All, Public, Private */}
              <input type="radio" id="all-visibility-type" name="visibility-type" value="ALL" checked={selectedVisibility === 'ALL'} onChange={handleVisibilitySelect} />
              <label htmlFor="all-visibility-type">ALL</label>
              <input type="radio" id="public" name="visibility-type" value="Public" checked={selectedVisibility === 'Public'} onChange={handleVisibilitySelect} />
              <label htmlFor="public">PUBLIC</label>
              <input type="radio" id="private" name="visibility-type" value="Private" checked={selectedVisibility === 'Private'} onChange={handleVisibilitySelect} />
              <label htmlFor="private">PRIVATE</label>
            </div>
          )} 

          {/* Radio buttons for All, Trips, Travelogs */} 

          <div className="type-select">
            <input type="radio" id="all" name="type" value="ALL" checked={selectedType === 'ALL'} onChange={handleTypeChange} />
            <label htmlFor="all">ALL</label>
            <input type="radio" id="trips" name="type" value="Trips" checked={selectedType === 'Trips'} onChange={handleTypeChange} />
            <label htmlFor="trips">TRIPS</label>
            <input type="radio" id="travelogs" name="type" value="Travelogs" checked={selectedType === 'Travelogs'} onChange={handleTypeChange} />
            <label htmlFor="travelogs">TRAVELOGS</label>
          </div>

          {/* Radio buttons for All, Visited, Want to visit */}
          <div className="visit-status-select">
            <input type="radio" id="all-visit-status" name="visit-status" value="ALL" checked={selectedVisitStatus === 'ALL'} onChange={handleVisitStatusChange} />
            <label htmlFor="all-visit-status">ALL</label>
            <input type="radio" id="visited" name="visit-status" value="Visited" checked={selectedVisitStatus === 'Visited'} onChange={handleVisitStatusChange} />
            <label htmlFor="visited">VISITED</label>
            <input type="radio" id="want-to-visit" name="visit-status" value="Want to Visit" checked={selectedVisitStatus === 'Want to Visit'} onChange={handleVisitStatusChange} />
            <label htmlFor="want-to-visit">WANT TO VISIT</label>
          </div>

          {/* Category Toggles - Conditionally Rendered */}
          {selectedType !== 'Trips' && (
            <button className='category-btn' onClick={toggleCategoryModal}>Category Toggles</button>
          )}

          {/* Category Modal */}
          {isCategoryModalOpen && ( 

          <div className="category-modal-overlay" onClick={handleOverlayClick}>
                    <div className="category-modal" onClick={handleModalClick}>
                      <button onClick={toggleMedievalCategories}>Toggle All Medieval</button>
                      <button onClick={toggleNonMedievalCategories}>Toggle All Non-Medieval</button>
                <div className="checkbox-left">
                <input
                  type="checkbox"
                  id="no-category"
                  name="category"
                  value="No Category"
                  checked={categoryChecked["No Category"]}
                  onChange={handleCategoryChange}
                />
                <label htmlFor="no-category">No Category</label>
                </div>
                
                {categories.map((category) => (
                  category.isHeader ? (
                    <p key={category.label} className="category-header">{category.label}</p>
                  ) : (
                    <div key={category.value} className="checkbox-left">
                      <input
                        type="checkbox"
                        id={category.value}
                        name="category"
                        value={category.value}
                        checked={categoryChecked[category.value]}
                        onChange={handleCategoryChange}
                      />
                      <label htmlFor={category.value}>{category.label}</label>
                    </div>

                 )
                ))}



              </div>
            </div>
          )}
      </div>
  );
}

export default MapSorting;



 