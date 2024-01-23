import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

import './ScheduleMaint.css'

const ScheduleMaint = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maintenance_key, setMaintenance_key] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [newEndTime, setNewEndTime] = useState('');
  const [isInMaintenance, setIsInMaintenance] = useState(false);
  const [showExtendMaintenance, setShowExtendMaintenance] = useState(false);
  const [extendMaintenanceKey, setExtendMaintenanceKey] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCancel = () => {
    navigate('/admin');  
  };

  const initiateExtendMaintenance = () => {
    setShowExtendMaintenance(true);  
  };
 
  const handleSchedule = async () => { 
    if (!startDate || !endDate || !maintenance_key ) { 
      setErrorMessage('Please enter start / end dates and maintenance key.');
      return;
    }

    // Validate user data
    if (!user || !user.user_id) { 
      setErrorMessage('User information is not available.');
      return;
    }

    // Post request to schedule maintenance
    try {
      const response = await fetch('https://lgcbe.onrender.com/api/schedule_maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate, endDate, maintenance_key, admin_id: user.user_id })
      });

      if (response.ok) { 
        setSuccessMessage('Maintenance scheduled successfully.'); 
      } else { 
        setErrorMessage('Failed to schedule maintenance');
      }
    } catch (error) {
      console.error('Error scheduling maintenance:', error);
    }
  };


  useEffect(() => {
    // Fetch maintenance status when the component mounts
    const checkMaintenanceStatus = async () => {
      try {
        const response = await fetch('https://lgcbe.onrender.com/api/maintenance/status');
        const data = await response.json();
  
        // Set empty values to empty strings if they are null or undefined
        setStartDate(data.maintenanceInfo.timestamp_start || '');
        setEndDate(data.maintenanceInfo.timestamp_end || '');
  
        // Check if maintenance is active and handle accordingly
        if (data.maintenanceActive) {
          // console.log('Maintenance is active:', data.maintenanceInfo);
  
          // Check if the current time is within the maintenance period
          const currentTime = new Date();
          if (
            currentTime >= new Date(data.maintenanceInfo.timestamp_start) &&
            currentTime <= new Date(data.maintenanceInfo.timestamp_end)
          ) {
            setIsInMaintenance(true); // Set state to true if in maintenance
          } else {
            setIsInMaintenance(false); // Set state to false if not in maintenance
          }
  
          // Automatically populate startDate and endDate fields
          setStartDate(
            new Date(data.maintenanceInfo.timestamp_start).toLocaleString('en-US', { timeZone: 'UTC' })
          );
          setEndDate(
            new Date(data.maintenanceInfo.timestamp_end).toLocaleString('en-US', { timeZone: 'UTC' })
          );
        } else {
          setIsInMaintenance(false); // Set state to false if not in maintenance
        }
      } catch (error) {
        console.error('Error fetching maintenance status:', error);
      }
    };
  
    // Call the function to check maintenance status on mount
    checkMaintenanceStatus();
  }, []);
  
  


  const handleExtendMaintenance = async () => {
    // Validate input data (e.g., new end time)
    if (!newEndTime || !extendMaintenanceKey) { 
      setErrorMessage('Please enter start / end dates and maintenance key.');
      return;
    }
  
    try {
      const response = await fetch('https://lgcbe.onrender.com/api/extend_maintenance', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ extendMaintenanceKey, newEndTime })
      });
  
      if (response.ok) { 
        setSuccessMessage('Maintenance period updated successfully');
        setNewEndTime('');
        setExtendMaintenanceKey('');
        setShowExtendMaintenance(false);
      } else { 
        setErrorMessage('Failed to update maintenance period');
      }
    } catch (error) {
      console.error('Error extending maintenance period:', error);
    }
  };

  return (
    <div>

      <h1>Schedule Maintenance</h1>

      <div className='schedule-slate'>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        {successMessage && <p className='success-message'>{successMessage}</p>}
          <div>

            <div>
              <div className='schedule-form'>
                <label htmlFor="startDate">Start Date and Time:</label>
                <input
                  type="datetime-local"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className='schedule-form'>
                <label htmlFor="endDate">Expected End Date and Time:</label>
                <input
                  type="datetime-local"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className='schedule-form'>
                <label htmlFor="maintenance_key">Maintenance Key:</label>
                <input
                  type="text"
                  id="maintenance_key"
                  value={maintenance_key}
                  onChange={(e) => setMaintenance_key(e.target.value)}
                />
              </div>
            </div>

            <button className='schedule-btn' onClick={handleSchedule}>Confirm</button>
            <button className='schedule-btn' onClick={handleCancel}>Back</button>

          </div>
          <div>

            {isInMaintenance && (
                <button className='schedule-btn' onClick={initiateExtendMaintenance}>Extend or Shorten</button>
              )}
                {/* Conditional rendering of Extend Maintenance button */}
                {showExtendMaintenance && (
                <>
                  {/* Extend Maintenance Inputs */}
                  <div className='schedule-form'>
                    <label htmlFor="newEndTime">New End Time:</label>
                    <input
                      type="datetime-local"
                      id="newEndTime"
                      value={newEndTime}
                      onChange={(e) => setNewEndTime(e.target.value)}
                    />
                  </div> 
                  <div className='schedule-form'>
                    <label htmlFor="extendMaintenanceKey">Maintenance Key for New Endtime:</label>
                    <input
                      type="text"
                      id="extendMaintenanceKey"
                      value={extendMaintenanceKey}
                      onChange={(e) => setExtendMaintenanceKey(e.target.value)}  
                    />
                  </div>

                  <button className='schedule-btn' onClick={handleExtendMaintenance}>Submit Extension</button>
                  <button className='schedule-btn' onClick={() => setShowExtendMaintenance(false)}>Cancel</button>
                </>
              )}

          </div>

      </div>

    </div>

  );

};

export default ScheduleMaint;



