import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  // State variables to hold the joke and loading state
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to fetch a random joke from the JokeAPI
  const fetchJoke = async () => {
    setLoading(true); // Set loading state to true while fetching
    try {
      const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');
      setJoke(response.data.joke); // Set the joke from the API response
    } catch (error) {
      setJoke('Sorry, could not fetch a joke at the moment.');
    } finally {
      setLoading(false); // Set loading state to false after fetching
    }
  };

  // Fetch a joke when the component mounts
  useEffect(() => {
    fetchJoke();
  }, []); // Empty dependency array means this effect runs only once on component mount

  return (
    <div className="App">
      <h1>Random Joke Generator</h1>
      <div className="joke-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>{joke || "Click the button to get a joke!"}</p>
        )}
        <button onClick={fetchJoke}>Get Another Joke</button>
      </div>
    </div>
  );
}

export default App;
