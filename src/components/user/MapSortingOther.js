import React from 'react';
import '../travlog/Home.css'
// import { applyMarkerOffset } from '../travlog/MarkerOffset'

function MapSortingOther({ onTypeChange, travelogs }) {
  const handleRadioChange = (e) => {
    const filterType = e.target.value;
    let filteredTravelogs;
    console.log('filteredTravelogs from mapsortingother: ', filteredTravelogs)

    switch (filterType) {
        case 'All':
            filteredTravelogs = travelogs;
            break;
        case 'Unesco':
            filteredTravelogs = travelogs.filter(entry => entry.unesco === true);
            break;
        case 'Video Game Location':
            filteredTravelogs = travelogs.filter(entry => entry.video_game_location !== "" && entry.video_game_location !== null);
            break;
        case 'Filming Location':
            filteredTravelogs = travelogs.filter(entry => entry.film_location !== "" && entry.film_location !== null);
            break;
        default:
            filteredTravelogs = travelogs;
    }

    onTypeChange(filteredTravelogs);
};


    return (
        <div>
            <form className="other-map-sorting">
                <label>
                    <div className='other-inline'>
                        <input
                            type="radio"
                            value="All"
                            name="travelog-type"
                            onChange={handleRadioChange}
                            defaultChecked
                        />
                        <p>All</p>
                    </div>
                </label>
                <label>
                    <div className='other-inline'>
                    <input
                        type="radio"
                        value="Unesco"
                        name="travelog-type"
                        onChange={handleRadioChange}
                    />
                    <p>Unesco</p>
                    </div>
                </label>
                <label>
                    <div className='other-inline'>
                    <input
                        type="radio"
                        value="Video Game Location"
                        name="travelog-type"
                        onChange={handleRadioChange}
                    />
                    <p>Video Game</p>
                    </div>
                </label>
                <label>
                    <div className='other-inline'>
                    <input
                        type="radio"
                        value="Filming Location"
                        name="travelog-type"
                        onChange={handleRadioChange}
                    />
                    <p>Film</p>
                    </div>
                </label>
            </form>
        </div>
    );
}

export default MapSortingOther;
