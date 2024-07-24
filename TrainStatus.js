import React, { useState } from 'react';
import './TrainStatus.css';

const TrainStatus = () => {
  const [trainNumber, setTrainNumber] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [trainStatus, setTrainStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTrainStatus = async () => {
    setLoading(true);
    setError('');
    setTrainStatus(null);
  
    const settings = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '54fd88f945msh0f15430e7f43d30p124d41jsnf9f00286114a',
        'x-rapidapi-host': 'indian-railway-irctc.p.rapidapi.com',
        'x-rapid-api': 'rapid-api-database'
      }
    };
  
    try {
      const response = await fetch(
        `https://indian-railway-irctc.p.rapidapi.com/api/trains/v1/train/status?departure_date=${departureDate}&isH5=true&client=web&train_number=${trainNumber}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.result === "success") {
        setTrainStatus(data.body);
      } else {
        setError(data.message || 'Error fetching train status. Please try again.');
      }
    } catch (error) {
      setError('Error fetching train status. Please try again.');
      console.error('Error fetching train status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTrainStatus();
  };

  return (
    <div className="train-status">
      <h2>Train Status</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={trainNumber}
          onChange={(e) => setTrainNumber(e.target.value)}
          placeholder="Enter Train Number"
          required
        />
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          placeholder="Enter Departure Date"
          required
        />
        <button type="submit">Get Train Status</button>
      </form>
      {loading ? (
        <p>Loading train status...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : trainStatus ? (
        <div>
          <p><strong>Current Station:</strong> {trainStatus.current_station}</p>
          <p><strong>Status Message:</strong> {trainStatus.train_status_message}</p>
          <p><strong>Time of Availability:</strong> {trainStatus.time_of_availability}</p>
          <p><strong>Server Timestamp:</strong> {trainStatus.server_timestamp}</p>
          <p><strong>Terminated:</strong> {trainStatus.terminated ? "Yes" : "No"}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Enter train number and departure date to get the status.</p>
      )}
    </div>
  );
};

export default TrainStatus;
